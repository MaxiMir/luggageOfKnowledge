<?

################## SQL ##################

"C:\Server\usr\local\mysql-5.1\bin\mysqld" --install "mysqld" --defaults-file="C:\Server\usr\local\mysql-5.1\my.cnf" // уставновка службы, в "" название;--defaults-file - путь до файла настроек; my.cnf - файл настроек сервера MySQL (или my.ini)
sc delete mysqld // удаление службы

net start mysqld	// net start - для запуска службы, mysqld - используется для запуска сервера
net stop mysqld // остановка службы

C:\Server\usr\local\mysql-5.1\bin\mysqld -u root -p // подключение к БД; -u - логин/ -p - пароль
exit // выход из монитора MySQL

// либо более короткий вариант зайти в свойства компьютера->дополнительные параметры->переменные среды->окно системные переменные Path добавляем ;C:\Server\usr\local\mysql-5.1\bin\. Затем перезагрузить консоль
Теперь можно использовать:
mysqld -u root -p

>>>>> Набор признаков реляционной БД <<<<<<<

/*
- данные хранятся в двумерных таблицах, состоящих из полей(*столбоцов) и рядов(*строк).
- на пересечении ряда и поля содержится только 1 значение.
- поля имеют имя, значения в поле должны быть одного типа.
- поля в таблицах расположены в порядке, определенном при создании и должно быть как минимум 1 поле
- сервер возвращает результат запроса в виде таблиц.

Запись = 1 ряд таблицы   
*/

>>>>> Способы сравнения (Collate) <<<<<<<

utf8_bin // берем  в расчет регистр (user !== User). Например, для логина и пароля.
utf8_general_ci // регистро-независимый способ сравнения (user == User)


mysql> show databases // выводит все БД
mysql> use sql // выбираем БД, без ";" чтобы не было окончания команды

'\c' очистить ввод в консоли.

CREATE TABLE orders (
	onum TINYINT UNSIGNED NOT NULL, 
	amt DECIMAL(6,2) NOT NULL,  // например, 9999.99
	odate DATE NOT NULL,
	cnum TINYINT UNSIGNED NOT NULL,
	snum TINYINT UNSIGNED NOT NULL,
	PRIMARY KEY(onum)
) ENGINE = MyISAM;

/*
По умолчанию TINYINT SIGNED -128 127
TINYINT UNSIGNED 0 255 (128+127)
INT(4) - предполагается, что значения будут четырехзначные, но по факту будет хранить максимально возможные.
TINYINT(4) (аналогично для SMALLINT, MEDIUMINT) предполагается, что значения будут четырехзначные, но по факту будет хранить и пятизначные.
UNSIGNED ZEROFILL // заполняет нулями пустые позиции, 3 => 003 (если lenght = 3), при извлечении 0 будут отброшены

3.4432E2 // экспоненциальное представление числа(float). 3.4432- мантиса, E2 - порядок => 10^2 = 100
// => 344.32
*/

TEXT // длина не указывается
ENUM // выбранное поле может принимать только 2 перечисленных значения ('0','1' + as defined)
DECIMAL 6,2 // 6 - точность(всего цифр), 2 - масштаб(сколько цифр после '.')


SET NAMES cp866 // установить кодировку

SELECT DISTINCT date FROM orders // DISTINCT избавляемся от дублирующих записей


>>>>> Реляционные операторы или операторы сравнения <<<<<<<

'=' // равенство
'>' // больше чем можно, но не рекоммендуется сравнивать строки. Порядок:  0123ABCD...Zabcd...zА-Яа-я; A<D,3<A
SELECT * FROM orders WHERE date >= '1990-04-10'; 
'<' // меньше чем
'>=' // больше или равно
'<=' // меньше или равно
'<>','!=' // неравенство

>>>>> Булевы операторы <<<<<<<

// OR, AND, NOT(не)

SELECT * FROM custumers WHERE NOT city = 'London' // где город не London, аналог '<>','!='
SELECT * FROM custumers WHERE rating <= 100 AND NOT city='Rome'


// IN:

SELECT * FROM salers WHERE city IN ('London', 'Rome', 'Barcelona') // IN (вместо 'OR') задаем диапазон значений
SELECT * FROM orders WHERE date IN ('2015-03-10', '2015-04-10')

// BETWEEN:

SELECT * FROM salers WHERE comm BETWEEN 0.11 AND 0.13 // BETWEEN вместо IN(0.11,0.12,0.13)
SELECT * FROM salers WHERE (comm BETWEEN 0.11 AND 0.15) AND comm NOT IN (0.11,0.15) // выборка 0.12, 0.13,0.14
SELECT name FROM salers WHERE name BETWEEN 'A' AND 'N' // выбока имен начинающихся с A до имен начинающихся на M


// NULL:

SELECT * FROM salers WHERE name IS NULL // значение поля name NULL
SELECT * FROM salers WHERE name IS NOT NULL // значение поля name не NULL

/*
LIKE !только для CHAR и VARCHAR (т.е. < 255 символов и max несколько тысяч строк) и небольших БД.
Поиск через перебор строк, не использует для поиска индексы
*/

SELECT * FROM salers WHERE name LIKE 'Mik%' // % - идут любые символы
SELECT * FROM salers WHERE name LIKE '%ld';
SELECT * FROM salers WHERE name LIKE '%rr%';

SELECT * FROM salers WHERE name LIKE 'p__l' // _ - замена 1 символа
SELECT * FROM salers WHERE name LIKE '\_' // экранирование _
SELECT * FROM salers WHERE name LIKE '\%' // экранирование %




>>>>> Вложенные подзапросы <<<<<<<
/*
SQL позволяет вкладывать запросы друг в друга. Обычно подзапрос возвращает одно значение, которое проверяется на предмет истинности предиката.
Виды условий поиска: 
• Сравнение с результатом вложенного запроса (=, <>, <, <=, >, >=) 
• Проверка на принадлежность результатам подзапроса (IN) 
• Проверка на существование (EXISTS) 
• Многократное (количественное) сравнение (ANY, ALL)

Примечания по вложенным запросам: 
• Подзапрос должен выбирать только один столбец (за исключением подзапроса с предикатом EXISTS), и тип данных его результата должен соответствовать типу данных значения, указанному в предикате. 
• В ряде случаев можно использовать ключевое слово DISTINCT для гарантии получения единственного значения. 
• Во вложенном запросе нельзя включать раздел ORDER BY и UNION. 
• Подзапрос может находиться и лева и справа от условия поиска. 
• В подзапросах могут использоваться функции агрегирования без раздела GROUP BY, которые автоматически выдают специальное значение для любого количества строк, специальный предикат IN, а также выражения, основанные на столбцах. 
• По возможности следует вместо подзапросов использовать соединение таблиц JOIN.

Примеры на вложенные запросы: 
*/
SELECT * FROM Orders WHERE SNum=(SELECT SNum FROM SalesPeople WHERE SName=’Motika’) 
SELECT * FROM Orders WHERE SNum IN (SELECT SNum FROM SalesPeople WHERE City=’London’) 
SELECT * FROM Orders WHERE SNum=(SELECT DISTINCT SNum FROM Orders WHERE CNum=2001) 
SELECT * FROM Orders WHERE Amt>(SELECT AVG(Amt) FROM Orders WHERE Odate=10/04/1990) 
SELECT * FROM Customer WHERE CNum=(SELECT SNum+1000 FROM SalesPeople WHERE SName=’Serres’)
SELECT sname FROM custumers WHERE snum IN(SELECT snum FROM salers WHERE sname IN('Peel','Motika'))

>>>>> Связанные подзапросы <<<<<<<
/*
В SQL можно создавать подзапросы со ссылкой на таблицу из внешнего запроса. В этом случае подзапрос выполняется многократно, по одному разу для каждой строки таблицы из внешнего запроса. Поэтому важно, чтобы подзапрос использовал индекс. Подзапрос может обращаться к той же таблице, чтоб и внешний. Если внешний запрос возвращает относительно небольшое число строк, то связанный подзапрос будет работать быстрее несвязанного. Если подзапрос возвращает небольшое число строк, то связанный запрос выполнится медленнее несвязанного.

Примеры на связанные подзапросы: 
*/
SELECT * FROM SalesPeople Main WHERE 1<(SELECT COUNT(*) FROM Customer WHERE SNum=Main.SNum) // возвращает всех продавцов, обслуживших более одного покупателя 
SELECT * FROM Orders O1 WHERE Amt>(SELECT AVG(Amt) FROM Orders O2 WHERE O2.CNum=O1.CNum) // возвращает все заказы, величина которых превосходит среднюю величины заказа для данного покупателя 

Источник: https://intellect.ml/vidy-vlozhennykh-zaprosov-podzaprosy-v-sql-5912

// Избыточность данных => таблица не нормализованна


>>>>> MyISAM и InnoDB <<<<<<<

# Транзакционный движек 
/*
Транзакция (Transaction) — блок операторов SQL, который в случае ошибки в одном запросе, возвращается к предыдущему состоянию (Rollback), и только в случае выполнения всех запросов подтверждается (Commit)	MyISAM=>Нет	InnoDB=>Да
*/

# Поддержка внешних ключей 
/*
Внешние ключи — это способ связать записи в двух таблицах по определенным полям так, что при обновлении поля в родительской автоматически происходит определенное изменение поля в дочерней (дочернюю и родительскую выбираешь при создании ключа; точнее, создаешь ключ в дочерней, который ссылается на родительскую).	MyISAM=>Нет InnoDB=>Да
*/

# Блокировка
/*
Блокировка на уровне строк, т.е. если процессу нужно обновить строку в таблице, то он блокирует только эту строку, позволяя другим обновлять другие строки параллельно	
MyISAM=>Блокировка на уровне таблиц	InnoDB=>Блокировка на уровне строк
*/

# Одновременные запросы к разным частям таблицы 
// MyISAM=>Медленнее	InnoDB=>Быстрее

# При смешанной нагрузке в таблице (select/update/delete/insert) 
// MyISAM=>Медленнее	InnoDB=>Быстрее

# Операция Insert 
// MyISAM=>Быстрее	InnoDB=>Медленнее, ибо есть оверхед на транзакцию, но это цена надежности

# Если преобладают операции чтения (SELECT)
// MyISAM=>Работает Быстрее 	InnoDB=>Работает медленнее

# DeadlockDeadlock — ситуация в многозадачной среде или СУБД, при которой несколько процессов находятся в состоянии бесконечного ожидания ресурсов, захваченных самими этими процессами.
// MyISAM=>Не возникают	InnoDB=>Возможны.

# Поддержка полнотекстового поиска
// MyISAM=>Да	InnoDB=>Нет (доступен начиная с версии MySQL 5.6.4)

# Запрос Count(*)
// MyISAM=>Быстрее	InnoDB=>Медленнее

# Поддержка mysqlhotcopy
/*
Утилита mysqlhotcopy представляет собой Perl-сценарий, использующий SQL-команды LOCK TABLES, FLUSH TABLES и Unix-утилиты cp или scp для быстрого получения резервной копии базы данных.	
MyISAM=>Да	InnoDB=>Нет
*/

# Файловое хранение таблиц
// MyISAM=>Каждой таблице отдельный файл	InnoDB=>Данные при настройках по умолчанию хранятся в больших совместно используемых файлах

# Бинарное копирование таблиц
/*
Табличные файлы можно перемещать между компьютерами разных архитектур и разными операционными системами без всякого преобразования.
MyISAM=>Да	InnoDB=>Нет
*/

# Размер таблиц в БД
// MyISAM=>Меньше	InnoDB=>Больше

# Поведение в случае сбоя	
// MyISAM=>Крашится вся таблица	InnoDB=>По логам можно все восстановить

# В случае хранения «логов» и подобного
// MyISAM=>Лучше	InnoDB=>Хуже

/*
Выводы:
 * Использовать MyISAM лучше в таблицах, которых преобладает один вид доступа: чтение (новостной сайт) или запись (например, логирование);
 * Использование InnoDB имеет смысл во всех остальных случаях и случаях повышенных требований по сохранности данных.
*/


RESTRICT // запрет на изменение данных из справочника, если эти данные есть в дочерней таблице (по умолч.). 
CASCADE // любое изменение данных в справочнике, повлечет за собой изменение данных в дочерней таблице (ON UPDATE / ON DELETE - сможем удалять или обновлять)

CREATE TABLE country
{
	country_id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL,
	country_name VARCHAR(50) NOT NULL,
	PRIMARY KEY (country_id)
} ENGINE=InnoDB;

CREATE TABLE city
{
	city_id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL,
	city_name VARCHAR(50) NOT NULL,
	country_id TINYINT UNSIGNED NOT NULL,
	PRIMARY KEY (city_id)
	INDEX ixCity(country_id),
	CONSTRAINT country_city, 
	FOREIGN KEY(country_id) REFERENCES country(country_id)
} ENGINE=InnoDB;


/*
Предложение Constraint NAME задает имя внешнего ключа явным образом. 
Задав имя ключа в последствии, если вы захотите его удалить, вы сможете это сделать с помощью:
alter table Tab drop foreign key NAME.
Так же ключевое слово constraint необходимо для некоторой совместимости со стандартами SQL. 
*/


SELECT COUNT(sname) FROM salers // выводит количество значений полей (без учета NULL)
SELECT COUNT(*) FROM salers // выводит количество полей (c учетом NULL)!
SELECT COUNT(DISTINCT city) FROM salers // выводит количество уникальных полей (c учетом NULL) => |COUNT(DISTINCT city)| |кол-во|
SELECT COUNT(*) AS res FROM salers // псевдоним => 
/*
|res|
|кол-во|
*/

SELECT SUM(ant) AS res FROM orders // выводит сумму полей
SELECT 15.48+14.2 AS res; 

SELECT AVG(ant) AS res FROM orders // выводит среднее значение полей

SELECT MIN(ant) AS res FROM orders // выводит минимальное значение(num/str) из полей

SELECT MAX(ant) AS res FROM orders // выводит максимальное значение(num/str) из полей
SELECT snum, MAX(amt) FROM orders WHERE snum=1001 // выведет поле с максимальным значением amt, у которого snum=1001

SELECT snum, MAX(amt) FROM orders GROUP BY snum // агрегатная функция. Выбрать всех продавцов по 1 разу, чтоб у каждого была максимальная сумма

SELECT snum, MAX(amt) AS res FROM orders GROUP BY snum HAVING res > 2000 // HAVING фильтр на группы
SELECT snum, MAX(amt) FROM orders GROUP BY snum HAVING COUNT(snum) > 2;

SELECT((SELECT SUM(amt) FROM orders) / (SELECT COUNT(amt) FROM orders)) AS result // среднее ариф.значение

SELECT city, MAX(rating) FROM custumers GROUP BY city // получить список городов без повторов и максимальный рейтинг для каждого из них 


>>>>> Нормальные формы <<<<<<<

/*
1 нормальная форма: значение в ячейках таблицы должны быть атамарны (1 ячейка = 1 значение)
2 нормальная форма: таблица должна содержать ключ, от которого зависят все элементы ряда. Для устранения избыточности избыточные данные вносятся в таблицу справочник.
3 нормальная форма: любой неключевой атрибут таблицы должен зависеть только от первичного ключа.
*/

SELECT sname, comm*100, '%' FROM salers // =>
/*
| sname | comm*100 | % | 
| Peel  | 12.00    | % |
*/


>>>>> ORDER BY <<<<<<<

ORDER BY (ASC - по умолчанию, DESC - обратный порядок)
SELECT * FROM page ORDER BY title ASC, date DESC // данные будут отсортированы по полю title в возрастающем порядке, при этом если значения совпадут, то эти записи будут отсортированы по полю date по убыванию.
SELECT snum, amt odate FROM orders ORDER BY snum, amt DESC // сортировка по 2 полям, 2 поле с обратной сортировкой
SELECT * FROM page ORDER BY BINARY title // cортировка с учетом регистра символов
SELECT * FROM page ORDER BY FIELD(season, "весна","лето","осень","зима") // cортировка по заданному списку


>>>>> LIMIT <<<<<<<

SELECT * FROM salers LIMIT 0, 1 // 1 цифра с какой записи начинать, 2 - сколько выводить


>>>>> Строковые функции <<<<<<< 

# 1. CONCAT(str1, str2, ...) // Возвращает строку, являющуюся результатом конкатенации аргументов. Если хотя бы один из аргументов равен NULL => NULL
SELECT CONCAT(sname, ' ', city) AS res FROM salers;

# 2. CONCAT_WS(separator, str1, str2, ...) - concat with separator(конкатенация с разделителем). Данная функция будет пропускать все величины NULL и пустые строки, расположенные после аргумента-разделителя. Если separator == NULL => NULL
CONCAT_WS(' ', str1, str2, ...);

# 3. LENGHT(str) - возвращает длину строки в байтах
CHAR_LENGHT(str) - возвращает кол-во символов
CHARACTER_LENGHT(str) - возвращет количество символов

# 4. LOCATE(substr, str) - возвращает позицию первого вхождения подстроки substr  в str. Если подстрока substr в строке str отсутсует, возвращется 0. Отсчет начинается с 1, включая позицию вхождения.
SELECT * FROM salers WHERE LOCATE('kin', sname) // => Rifkin, Sifkin

# 5. LEFT(str, len) - возвращает крайние слева len символов из стрки str. Функция поддерживает многобайтные величины.

# 6. RIGHT(str, len) - возвращает крайние справа len символов из строки str. Функция поддерживает многобайтные величины.
SELECT odate, LEFT(odate, 7) FROM orders;

# 7. SUBSTRING(str, pos, len) - возвращает подстроку длиной len символов из строки str, начиная от позиции pos.
Функция поддерживает многобайтные величины.

# 8. SUBSTRING(str, pos) - возвращает подстроку из строки str, начиная с позиции pos(отсчет начинается с 1). Функция поддерживает многобайтные величины.
SELECT SUBSTRING('abcdef',3);
SELECT odate, SUBSTRING(odate, 6) FROM orders;

# 9. SUBSTRING_INDEX(str, delim, count) - возвращает подстроку из строки str перед появлением count вхождений разделителя delim. 
/*
Если count>0, то возвращается все, что находится слева от последнего разделителя(считая слева).
Если count<0, то возвращается все, что находится справа от последнего разделителя (считая справа).
Функция поддерживает многобайтные величины.
*/
SELECT SUBSTRING_INDEX('http://www.dev.mysql.com/index.php', '/', 3) // => http://www.dev.mysql.com

# 10. LTRIM(str) - возвращает строку str c удаленными начальными пробелами. Функция поддерживает многобайтные величины.

# 11. RTRIM(str) - возвращает строку str c удаленными начальными пробелами. Функция поддерживает многобайтные величины.

# 12. TRIM([[BOTH | LEADING | TRAILING] [remstr] FROM ] str) - возвращает строку str с удаленными всеми префиксами и/или суффиксами, указанными в restr.
/*
Если не указан ни один из спецификаторов BOTH, LEADING или TRAILING, то подразумевается BOTH.
Если аргумент remstr не задан, то удаляются пробелы.
Функция поддерживает многобайтные величины.
*/
SELECT TRIM(' bar ') // => 'bar'
SELECT TRIM(BOTH 'x' FROM 'xxxbarxxx') // обрезание с обоих концов => 'bar'
SELECT TRIM(LEADING 'x' FROM 'xxxbarxxx') // обрезание из начала строки => 'barxxx'
SELECT TRIM(TRAILING 'xyz' FROM 'barxxyz') // обрезание из конца строки => 'barx'
SELECT TRIM(TRAILING '-10' FROM odate) FROM orders;

# 13. REPLACE(str, from_str, to_str) - возвращает строку str, в которой все вхождения строки from_str заменены to_str. Функция поддерживает многобайтные величины.

# 14. LCASE(str), LOWER(str) - возвращает строку str, в которой все символы переведены в нижний регистр. Функция поддерживает многобайтные величины.

# 15. UCASE(str), UPPER(str) - возвращает строку str, в которой все символы переведены в верхний регистр. Функция поддерживает многобайтные величины.

/** 
из таблицы salers выбрать имена, которые состоят из 6 или более символов
**/

SELECT sname, CHAR_LENGHT(sname) AS lenght FROM salers WHERE CHAR_LENGHT(sname) >= 6;


/**
выберите все поля таблицы orders при этом результирующая таблица должна удолетворять двум условиям  - поля должны иметь те же имена, что и в таблице orders, значения поля odate должны иметь формат ГГГГ/ММ/ДД
**/
SELECT onum, amt, REPLACE(odate, '-', '/') AS odate, cnum, snum FROM orders;


/**
получите только целые части(без дробной) сумм из таблицы orders
**/
SELECT SUBSTRING_INDEX(amt, '.', 1) AS amt FROM orders;


/** 
получите месяц и число из таблицы orders (исп. только SUBSTRING_INDEX), при этом в результирующей таблице форма вывода должен иметь вид ММ/ДД
**/

SELECT SUBSTRING_INDEX(REPLACE(odate, '-', '/'), '/', -2) AS odate FROM orders;


/** 
получите из таблицы salers данные об всех продавцах, имена которых написаны кириллицей.
**/
SELECT * FROM salers WHERE CHAR_LENGHT(sname) <> LENGHT(sname) // способ работает с UTF-8



>>>>> Функции сравнения строк <<<<<

// REGEXP - использовать в крайних случаях - функиця очень ресурсоемкая.

SELECT 'a' REGEXP 'a' // 1 - совпадение есть, 0 - совпадений по шаблону нет=> 1

SELECT * FROM salers WHERE sname REGEXP '[a-z]' // только латиница
SELECT * FROM salers WHERE sname REGEXP '[а-я]' // только кириллица
SELECT * FROM salers WHERE sname REGEXP '[a-zа-я]' // латиница + кириллица

REGEXP '^fo$' // ^ - начало строки, $ - конец строки
SELECT * FROM salers WHERE sname REGEXP '^s' // 1-й символ в строке - s
SELECT * FROM salers WHERE sname REGEXP 'n$' // последний символ в строке - n


>>>>> Кванторы <<<<<

REGEXP '.' // . - любой символ
REGEXP 'a*' // a - может встречаться от 0 до бесконечности раз
REGEXP 'a+' // a - может встречаться от 1 до бесконечности раз
REGEXP 'a?' // a - может встречаться 0 или 1 раз
REGEXP 'a{3}' // a - может встречаться 3 раза
REGEXP 'a{3,}' // a - может встречаться >= 3 раз
REGEXP 'a{3,5}' // a - может встречаться от [3,5] раз
SELECT * FROM salers WHERE sname REGEXP '^[^r].*' // первый символ не 'r', .* -  >= 0 любых символов.
SELECT * FROM salers WHERE sname REGEXP '^[^r]*$' // исключить значения, где встречается 'r'
SELECT * FROM salers WHERE sname REGEXP '(r){2}' // найти значения, где 2 подряд 'r'


https://dev.mysql.com/doc/refman/8.0/en/regexp.html

>>>>> Математические функции <<<<<

# 1. ABS(X) - возвращает абсолютное значение величины X

# 2. SIGN(X) - возвращает знак аргумента в виде -1, 0 или -1, в зависимости от того, является ли X отрицательным, нулем или положительным.
SELECT comm, SIGN(comm) AS res FROM salers;

# 3. MOD(N, M) - возвращает значение по модулю. Возвращает остаток от деления N на M

# 4. FLOOR(X) - округляет дробь в меньшую сторону. 

# 5. CEILING(X), CEIL(X) - округляет дробь в большую сторону.

# 6. ROUND(X) - округляет дробь по правилам математики. Применять с осторожностью - зависит от приложения.

# 7. ROUND(X,D) - возвращает аргумент X, округленный до числа с D десятичными знаками. Если D == 0, результат будет представлен без десятичного знака или дробной части.

# 8. POW(X,Y), POWER(X,Y) - возвращает X ** Y

# 9. SQRT(X) - возвращает неотрицательный квадратный корень числа X.

# 10. RAND() - возвращает случайное число с плавающей точкой в диапазоне от 0 до 1. Сильно нагружает БД (использовать для небольших БД, и с извлечением 1,2 случайных строк).
SELECT * FROM salers ORDER BY RAND() LIMIT 1;

# 11. TRUNCATE(X,D) - возвращает число X усеченный до D количества знаков после десятичной точки.
/*
Если D == 0, возвращает X без десятичной точки или дробной части.
Если D < 0, возвращает X c обнуленным числом перед точкой
*/
SELECT TRUNCATE(10.156, 2) // => 10.15
SELECT TRUNCATE(10.156, 0) // => 10
SELECT TRUNCATE(11.156, -1) // заменяет на 0 => 10 

/**
выбрать суммы до 1000(суммы ввида 533.54, 84.44)
**/
SELECT amt FROM orders WHERE amt REGEXP '^.{1-6}$'; 
SELECT amt FROM orders WHERE amt REGEXP'^[0-9]{1-3}\.[0-9]{2}$';


/** 
выбрать ряды, где имена продавцов не превышают 6 символов(киррил=латиница). '|' - или. 
**/
SELECT * FROM salers WHERE sname REGEXP '^([a-z]{1,6}|[а-яА-Я]){1,12})$'; 



>>>>> Функции даты и времени <<<<<

# 1. NOW(), SYSDATE(), CURRENT_TIMESTAMP - возвращает текущую дату и время как величину в формате YYYY-MM-DD HH:MM:SS или YYYYMMDDHHMMSS, в зависимости от того, в каком контексте используется функция - в строковом или числовом.

NOW() // вычисляется единожды для каждого запроса, а именно - в начале его выполнения.

SELECT NOW();
SELECT NOW(), SLEEP(2), NOW() // SLEEP - прекрати выполнение на 2с, NOW - вычисляется 1 раз =>
2018-03-03 13:30:33 | 0 |  2018-03-03 13:30:33 

SELECT CURRENT_TIMESTAMP //  выводит строковое значение,  так же вычисляется 1 раз 
SELECT NOW()+0 // приводим к числу в SYSDATE() выводит без дробной части
SELECT SYSDATE(), SLEEP(2), SYSDATE() // может вычисляется несколько раз =>
2018-03-03 13:30:33 | 0 |  2018-03-03 13:30:35 

# 2. CURDATE(), CURRENT_DATE - возвращает сегодняшнюю дату как величину в формате YYYY-MM-DD или YYYYMMDD, в зависимости от того в каком контексте используется функция - в строком или числовом.

# 3. CURTIME(), CURRENT_TIME - возвращает текущее время как величину в формате HH:MM:SS или HHMMSS, в зависимости от того в каком контексте используется функция - в строком или числовом.

# 4. DAYOFWEEK(date) - возвращает индекс дня недели для аргумента date(1 = воскресенье, 2 = понедельник, ..., 7 = суббота). Эти индексные величины соответствуют стандарту ODBC.
SELECT odate, DAYOFWEEK(odate) FROM orders;
SELECT DAYOFWEEK(NOW()) // => 7

# 5. WEEKDAY(date) - возвращает индекс дня недели для аргумента date(0 = понедельник, 1 = вторник, ..., 6 = воскресенье)

# 6. DAY(date), DAYOFMONTH(date) - возвращает порядковый номер дня месяца для аргумента date в диапазоне от 1 до 31.

# 7. DAYOFYEAR(date) - возвращает порядковый номер дня года для аргумента date в диапазоне от 1 до 366

# 8. MONTH(date) - возвращает порядковый номер месяца в году для аргумента date в диапазоне от 1 до 12

# 9. DAYNAME(date) - возвращает название дня недели для аргумента date

SELECT @@lc_time_names // локаль => en_US
SET lc_time_names = 'ru_RU' // изменить локаль, чтобы выводить например 'суббота'

SELECT CONCAT_WS(' ', DAY(NOW()), MONTHNAME(NOW())) AS date; // => 5 December

# 10. MONTHNAME(date) - возвращает название месяца для аргумента date

# 11. QUARTER(date) - возвращает номер квартала года для аргумента date в диапазоне от 1 до 4

# 12. YEAR(date) - возвращает год для аргумента date в диапазоне от 1000 до 9999 или 0 для 'zero' даты

# 13. HOUR(time) - возвращает час для аргумента time в диапазоне от 0 до 23

# 14. MINUTE(time) - возвращает количество минут для аргумента time в диапазоне от 0 до 59

# 15. SECOND(time) - возвращает количество секунд для аргумента time в диапазоне от 0 до 59

# 16. PERIOD_ADD(P,N) - вобавляет N месяцев к периоду P(в формате YYMM или YYYYMM). Возвращает величину в формате YYYYMM. Следует учитывать, что аргумент периода P не является значением даты.
SELECT PERIOD_ADD(201203, 2) // 201205

# 17. PERIOD_DIFF(P1,P2) - возвращает количество месяцев между периодами P1 и P2. P1 и P2 должны быть в формате YYMM или YYYYMM. Следует учитывать, что аргументы периода P1, P2 не являются значениями даты.
SELECT PERIOD_DIFF(201203, 201205) // => -2

# 18. DATE_FORMAT(date, format) - форматирует величину date в соответствии со строкой format
SELECT NOW(), DATE_FORMAT(NOW(), '%e/%m/%Y') // => 5/12/2018
SELECT NOW(), DATE_FORMAT(NOW(), '%d %M %Y') // => 05 December 2018
SELECT odate, DATE_FORMAT(odate, '%Y%m', PERIOD_ADD(odate, '%Y%n'), 7) FROM orders;

# 19. TIME_FORMAT(time, format) - данная функция используется аналогично описанной ваше функции DATE_FORMAT, но строка format может содержать только те определители формата, которые относятся к часам, минутам и секундам. При указании других определителей будет выдана величина NULL или 0.
SELECT NOW(), TIME_FORMAT(NOW(), '%H:%i') // => 2012-03-03 18:35:56 | 18:35

# 20. DATE_ADD(date, INTERVAL expr type) синоним ADDDATE(date, INTERVAL expr type) - возвращает дату, после которой был добавлен определенный интервал даты/времени.
SELECT NOW(), DATE_ADD(NOW(), INTERVAL 10 DAY) AS NEWDATE // =>
/*
NOW() 				| NEWDATE
2018-12-05 20:03:05 | 2018-12-15 20:03:05
*/

DATE_SUM(date, INTERVAL expr type) // синоним SUBDATE(date, INTERVAL expr type);

# 21. SUBDATE(expr, days) - возвращает дату, после которой вычитается определенный интервал.
SELECT NOW(), SUBDATE(NOW(), 10) // => 2012-03-03 18:35:56 | 2012-02-22 18:35:56

/*
Данные функции производят арифметические действия над датами. Обе являются нововведением версии MySQL 3.22. В версии MySQL 3.22 вместо функции DATE_ADD() и DATE_SUB() можно использовать операторы + и -, если выражение с правой стороны представляет собой столбец типа DATE или DATETIME.
Аргумент date является величиной типа DATETIME или DATE, задающей начальную дату.
Выражение expr задает величину интервала, который следует добавить к начальной дате или вычесть из начальной даты. Выражение expr представляет собой строку, которая может начинаться с - для отрицательных значений интервалов. Ключевое слово type показывает, каким образом необходимо интерпритировать данное выражение. Вспомогательная функция EXTRACT(type FROM date) возвращает интервал указанного типа (type) из значения даты.
*/

SELECT NOW(), ADDDATE(NOW(), INTERVAL 1 second) // => 2012-03-03 18:35:56 | 2012-03-03 18:35:57
SELECT NOW(), ADDDATE(NOW(), INTERVAL '1:2' minute_second) // => 2012-03-03 18:35:56 | 2012-03-03 18:36:58

SELECT NOW(), NOW() + INTERVAL 1 HOUR // => 2012-03-03 18:41:44 | 2012-03-03 19:41:44
SELECT NOW(), NOW() - INTERVAL 1 HOUR // => 2012-03-03 18:41:44 | 2012-03-03 17:41:44
SELECT NOW(), NOW() - SUBDATE(NOW(), INTERVAL 1 HOUR) // => 2012-03-03 18:41:44 | 2012-03-03 17:41:44

# 21. EXTRACT(type FROM date) - типы интервалов для функции EXTRACT() используется те же, что и для функции DATE_ADD() или DATE_SUB(), но EXTRACT() производит скорее извлечение части из значения даты, чем выполнение арифметических операций.
SELECT NOW(), EXTRACT(minute FROM NOW()) // => 2012-03-03 18:41:44 | 41

# 22. SEC_TO_TIME(seconds) - возвращает аргумент seconds, преобразованный в часы, минуты и секунды, как величину в формате HH:MM:SS или HHMMSS, в зависимости от того, в каком контексте используется функция - в строком или числовом.
SELECT SEC_TO_TIME(61) // => 00:01:01

# 23. TIME_TO_SEC(time) - возвращает аргумент time, преобразованный в секунды.
SELECT TIME_TO_SEC('1:00:01') // => 3600

# 24. DATE(expr) - возвращает часть, отвечающую за дату
SELECT NOW(), DATE(NOW()) // => 2012-03-03 18:41:44 | 2012-03-03

# 25. TIME(expr) - возвращает часть, отвечающую за время
SELECT TIME(), DATE(NOW()) // => 2012-03-03 18:41:44 | 18:41:44

# 26. DATEDIFF(expr1, expr2) - возвращает разницу дат в днях.
SELECT DATEDIFF('2012-03-18', '2012-03-16') // => 2
SELECT DATEDIFF('2012-03-16', '2012-03-18') // => -2

# 27. TO_DAYS(date) - возвращает количество дней от "нулевого" года

/**
найти количество дней между датами первой и последней продажи в таблице orders
**/
SELECT DATEDIFF(MAX(odate), MIN(odate)) FROM orders // 1 способ
SELECT TO_DAYS(MAX(odate)) - TO_DAYS(MIN(odate)) FROM orders // 2 способ

/**
из таблицы orders получите результат в 2 колонки: в первой даты в исходном виде, во второй вид 10 марта 1990 года.
**/
SET lc_time_names = 'ru_RU';
SELECT odate, CONCAT(DATE_FORMAT(odate, '%e %M %Y'), ' года') FROM orders;

/**
посчитайте сколько дней прошло с начала Нового года и до текущего момента.
**/
SELECT DATEDIFF(NOW(), '2018-01-01') // 1 способ
SELECT TO_DAYS(NOW()) - TO_DAYS('2018-01-01') // 2 способ



>>>>> Объединение через справочную целостность <<<<<

SELECT salers.sname, custumers.cname, salers.city FROM salers, custumers WHERE salers.snum = custumers.snum // custumers. - если поле не уникально. Но лучше указывать всегда.

SELECT s.sname, c.cname, s.city FROM salers s, custumers c WHERE s.snum = c.snum // через псевдонимы s и с 

# Объединение таблицы с собой. Получаем заказчиков с одинаковыми рейтингами:
SELECT f.cname, s.name, f.rating FROM custumers f, custumers s WHERE f.rating = s.rating; 

# Объединение таблицы с собой. Получаем заказчиков с одинаковыми рейтингами. Исключаем Избыточность
SELECT f.cname, s.name, f.rating FROM custumers f, custumers s WHERE f.rating = s.rating AND f.name < s.name;

# Объединение таблицы с собой. Выбор нескольких продавцов в 1 городе.
SELECT f.sname, s.sname, s.city FROM salers f, salers c WHERE f.city = s.city AND f.city < s.city // =>
/*
sname  | sname | city
Motika | Peel  | London
Serres | Sifkin| Paris
*/

# Вложенный запрос:
SELECT cname FROM custumers WHERE snum = (SELECT snum FROM salers WHERE sname = 'Jorn') // Выборка всех клиентов продавца. При подзапросе возвращающем более 1 ряда - выведется ошибка, чтобы избежать - исп. IN - WHERE snum IN (SELECT ...)

/**
Выборка продавцов с более чем 1 клиентом:
**/
SELECT snum, sname FROM salers WHERE snum IN (SELECT * FROM custumers GROUP BY snum HAVING COUNT(snum) > 1) // вложенный запрос - выбрать группы, в которых snum > 1 

/**
Соотнесенный подзапрос. Выборка всех клиентов за апрель 
**/
SELECT * FROM custumers c WHERE '1990-04-10' IN (SELECT odate FROM orders o WHERE o.cnum = c.cnum);
// или через объединение таблиц на основе справочной целостности:
SELECT o.cnum, c.name, c.city, c.rating, c.snum FROM orders o, custumers c WHERE c.cnum = o.cnum AND odate = '1990-04-10';

// Еще примеры соотнесенного запроса:
#1: 

| SELECT *                                      | 
| FROM  Customers outer                         | 
| WHERE 10/03/1990 IN                           | 
| (SELECT odate                                 | 
| FROM Orders inner                             | 
| WHERE outer.cnum = inner.cnum);               | 
| ============================================= | 
|   cnum     cname     city    rating    snum   | 
|  -----    --------   ----    ------   -----   | 
|   2001    Hoffman    London     100    1001   | 
|   2003    Liu        San Jose   200    1002   | 
|   2008    Cisneros   San Jose   300    1007   | 
|   2007    Pereira    Rome       100    1004   | 
============================================= 
// "внутренний"(inner) и "внешний"(outer), это псевдонимы

#2:
SELECT odate, SUM (amt) 
  FROM Orders a 
  GROUP BY odate 
  HAVING SUM (amt) > 
      ( SELECT 2000.00 + MAX (amt) 
           FROM Orders b 
           WHERE a.odate = b.odate ); 

/**
Выберите индетификаторы и имена продавцов, имеющих по 1 клиенту
**/
SELECT snum, sname FROM  salers WHERE snum IN (
	SELECT snum FROM custumers GROUP BY snum HAVING COUNT(snum) = 1
);

/**
Получите идетификатор и имя продавца, совершившего максимальную сумму продажи
**/
SELECT snum, sname FROM salers WHERE snum = (
	SELECT snum FROM orders WHERE amt = (
		SELECT MAX(amt) FROM orders
	)
);

/**
Получите идентификаторы и имена продавцов, совершивших наименьшую и наибольшую продажи
**/
SELECT snum, sname FROM salers WHERE snum IN(
	SELECT snum FROM orders WHERE amt IN(
		(SELECT MAX(amt) FROM orders), (SELECT MIN(amt) FROM orders)
	)
);

>>>>> EXISTS <<<<<

/**
Выборка из таблицы продавцов только в случае, если есть клиенты с рейтингом > 100
**/
SELECT * FROM salers WHERE EXISTS (
	SELECT * FROM custumers WHERE rating > 100
) // Если хотя бы 1 запрос вернет истину => будет возращена вся таблица salers. Здесь EXISTS отрабатывает как булев оператор


/**
Выборка продавцов из Сан-Хосе, только в том случае, если есть клиенты с рейтингом > 100. EXISTS c обычным запросом
**/
SELECT * FROM salers WHERE city="San Jose" AND EXISTS (
	SELECT cnum FROM custumers WHERE rating > 100
); 

/**
EXISTS с соотнесенным запросом. Получаем продавцов, у которых есть клиенты
**/
SELECT * FROM salers WHERE EXISTS (
	SELECT * FROM custumers c WHERE s.snum = c.snum
) // В соотнесенном запросе в предикате(WHERE) используем данные из внешнего запроса (ссылку на поле). Метод более эффективный, проверяет условия для каждого конкретного ряда. Будут возращены строки, для которых предикат возвращает true.

/**
EXISTS с соотнесенным запросом. Получаем продавцов без клиентов
**/
SELECT cnum, sname FROM salers s WHERE NOT EXISTS (
	SELECT cnum FROM custumers c WHERE s.snum = c.snum
);

>>>>> UNION <<<<<
/*
UNION - объединение запросов
Запросы равноправные.
Количество полей в каждом запросе равны.
Типы и значенения полей должны совпадать для одинаковых столбцов.
*/

# UNION Выборка продавцов и клиентов
SELECT snum, sname FROM salers 
UNION
SELECT cnum, cname FROM custumers;

# дубликаты значений опускаются
SELECT snum, city FROM salers
UNION
SELECT snum, city FROM custumers;

# включение дубликатов 
SELECT snum, city FROM salers
UNION ALL
SELECT snum, city FROM custumers;

/**
получите идентификаторы имена и города клиентов/продавцов из Лондона
**/
SELECT cnum, cname, city FROM custumers WHERE city = 'London'
UNION
SELECT snum, sname, city FROM salers WHERE city = 'London';

/**
используя оператор EXISTS получите идентификаторы и имена продавцов, имеющих продажи с суммой более 2000
**/
SELECT snum, sname FROM salers s WHERE EXISTS(
	SELECT * FROM orders o WHERE s.snum = o.snum AND amt > 2000
)


>>>>> JOIN <<<<<

SELECT s.name, c.cname, s.city FROM salers s JOIN custumers c ON custumers.snum = salers.snum // внутреннее объединение синоним INNER JOIN
SELECT s.sname, c.cname, s.city FROM salers s LEFT OUTER JOIN custumers c ON c.snum = s.snum // левое внешнее объединение. Для значений левой таблицы, для которых не найдено было значение подставляется NULL
SELECT s.sname, c.cname, s.city FROM salers s RIGHT OUTER JOIN custumers c ON c.snum = s.snum // правое внешнее объединение. 

FUUL OUTER JOIN  // MySQL не поддерживается. Совмещает LEFT и RIGHT OUTER JOIN
SELECT s.sname, c.cname, s.city FROM salers s CROSS JOIN custumers c // получаем полностью обе таблицы



>>>>> Полнотекстовый поиск <<<<<
/*
+ Поиск очень быстрый
- Замедляется модификация записей и 
=> В поле, в котором планируется делать полнотекстовый поиск в phpmyadmin индексируем - кликаем на Fulltext
Если полей несколько выделяем их и (по-отдельности индексировать нельзя):
=> Внизу таблицы кликаем на Fulltext
через SQL запрос:
*/
ALTER TABLE custumers ADD FULLTEXT text // индексируем поле text

SELECT * FROM custumers WHERE MATCH(text) AGAINST ('test') // Полнотекстовый поиск в режиме естественного языка (NATURAL LANGUAGE MODE - по умолч.) в нем морфология не поддерживается, т.е. слова программирование и программирования - разные слова, но поддерживается релевентность (самые ценные по мнению сервера результаты будут помещены выше). В MATCH указываем поля, в которых будем искать в порядке указанном в запросе SQL.
/*
При создании полнотекстового индекса сервер выбрасывает 'стоп-слова'(помимо слов по-умолчанию, можно создать список своих), короткие - слова (по умолч. < 4 символов. Изменить в my.cnf (или .ini) секция [mysqld]: ft_min_word_len=3) и шумовые слова (по умолч. порог 50% - если слово встречается в половине записей, либо более). После изменений настроек перезагрузить сервер и сделать repair table (блок Operations) - операция включает переиндексацию - SQL запрос REPAIR TABLE custumers. 
*/
SELECT * FROM custumers WHERE MATCH(text) AGAINST ('программи*' IN BOOLEAN MODE) // Поиск в булевом режиме. Поддерживается морфология. => программирования. Нет 50% порога на шумовые слова

SELECT * FROM custumers WHERE MATCH(text) AGAINST ('+php - mysql' IN BOOLEAN MODE) // => php
/*
+ данное слово должно быть представлено в результатах поиска
- данное слово должно быть представлено в результатах поиска

Есть еще 3 вид поиска - смешанный учитывает морфологию и релевантность
*/

/*
Используя внутреннее объединение в результирующей таблице получите имена продавцов и соответсвующие им имена их клиентов, суммы их клиентов, суммы их продаж и город
*/
SELECT s.sname, c.cname, o.amt, s.city FROM salers a
	INNER JOIN custumers c ON c.snum = s.snum
	INNER JOIN orders o ON o.cnum = c.cnum;




>>>>> Создание БД <<<<<

CREATE DATEBASE [IF NOT EXISTS] sql DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci // создать БД sql, если БД c именем sql не существует.

mysql> SHOW warnings // вывести предупрежедние
mysql> SHOW databeses // вывести все БД
mysql> DESCRIBE custumers // просмотр структуры таблицы. Синоним DESC



>>>>> Создание таблицы <<<<<

CREATE TABLE [IF NOT EXISTS] `custumers` (
	`cnum` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
	`cname` varchar(50) NOT NULL,
	`text` text NOT NULL,
	PRIMARY KEY ('cnum'),
	FULLTEXT KEY ('text') 
) ENGINE=MyISAM DEFAULT CHARSET=utf8

>>>>> Создание копии страницы <<<<<
CREATE TABLE custumers2 SELECT * FROM custumers;



>>>>> INSERT <<<<<
INSERT INTO custumers(cname, city, rating, snum, text) VALUES ('Вася Пупкин', 'Васюки', 10, 5, 'Какой-то текст');
// Вставка 1-вариант
INSERT INTO custumers SET cname='Вася Пупкин', city='Васюки', rating=10, snum=5, text='Какой-то текст';
// Вставка 2-вариант



>>>>> UPDATE <<<<<

UPDATE custumers SET cname='Петро Скважин', city='Тула' WHERE cnum=2013; 



>>>>> DELETE <<<<<

DELETE FROM custumers WHERE cname='Петро Скважин' // удаление записей или таблиц



>>>>> DROP <<<<<

DROP TABLE [IF NOT EXISTS] `custumers` // удаление таблиц
DROP DATABASE [IF NOT EXISTS] `db_name` // удаление БД



>>>>> PHP <<<<<
@mysql_connect('localhost','roo', '1') or die('Нет соединения с сервером') // @ - не выводить ошибки
mysql_query('SET NAMES cp1251') or die('Не установлена кодировка соединения') // установка кодировки
mysql_select_db('sql') or die('Не выбрана БД') // выбор БД

$query = 'SELECT * FROM custumers';
$res = mysql_query($query) or die(mysql_error());
mysql_affected_rows() // возвращает кол-во затронутых рядов
while(mysql_fetch_assoc($res)){
	...
}


-- # Триггеры в MySQL
DELIMITER $$ 

CREATE
    TRIGGER `event_name` BEFORE/AFTER INSERT/UPDATE/DELETE
    ON `database`.`table`
    FOR EACH ROW BEGIN
		-- trigger body
		-- this code is applied to every 
		-- inserted/updated/deleted row
    END;​        

DELIMITER ;    



-- INSERT
DELIMITER $$

CREATE
	TRIGGER `blog_after_insert` AFTER INSERT 
	ON `blog` 
	FOR EACH ROW BEGIN
	
		IF NEW.deleted THEN
			SET @changetype = 'DELETE';
		ELSE
			SET @changetype = 'NEW';
		END IF;
    
		INSERT INTO audit (blog_id, changetype) VALUES (NEW.id, @changetype);
		
    END$$
 
DELIMITER ;


-- AFTER UPDATE
DELIMITER $$

CREATE
	TRIGGER `blog_after_update` AFTER UPDATE 
	ON `blog` 
	FOR EACH ROW BEGIN
	
		IF NEW.deleted THEN
			SET @changetype = 'DELETE';
		ELSE
			SET @changetype = 'EDIT';
		END IF;
    
		INSERT INTO audit (blog_id, changetype) VALUES (NEW.id, @changetype);
		
    END$$

DELIMITER ;


-- AFTER UPDATE определенной колонки
DELIMITER $$

CREATE 
    TRIGGER `update_products_alturl` AFTER UPDATE
    ON `ap_products`
    FOR EACH ROW BEGIN

        IF NOT (NEW.alt_url <=> OLD.alt_url) THEN 
			DELETE FROM `ap_redirect` WHERE `from` = NEW.alt_url AND `to` = OLD.alt_url;
            INSERT INTO `ap_redirect` (`from`, `to`) VALUES (OLD.alt_url, NEW.alt_url);
        END IF;

    END$$

DELIMITER ;




-- УДАЛЕНИЕ ТРИГГЕРА:
DROP TRIGGER IF EXISTS `update_products_alturl`;
