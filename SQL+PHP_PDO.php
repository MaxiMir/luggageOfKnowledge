<?

############################# Базы данных: SQL (DDL/DML) #####################

>>>>> Введение <<<<<<<
/*
SQL (англ. structured query language — «язык структурированных запросов») — декларативный язык программирования, применяемый для создания, модификации и управления данными в реляционной базе данных, управляемой соответствующей системой управления базами данных.
Wiki: https://ru.wikipedia.org/wiki/SQL

База данных:

* Содержит данные приложения
* Управляется с помощью СУБД

История:
* К 1980 существовало множество СУБд
* У каждого свой собственный язык запросов
* В 1986 году вышел первый стандарт SQL86

Системы Управления БД
* PostgreSQL
* MySQL (MariaDB, Percona)
* MS-SQL
* Oracle
* Sqlite - встраиваемая кроссплатформенная БД. Поддерживает набор команд SQL и доступна в исходных кодах (язык C).

SQL Parts
* Data Definition Language (DDL)
* Data Manipulation Language (DML)

Data Definition Language (DDL) (язык описания данных) — это семейство компьютерных языков, используемых в компьютерных программах для описания структуры баз данных.
На текущий момент наиболее популярным языком DDL является SQL, используемый для получения и манипулирования данными в РСУБД, и сочетающий в себе элементы DDL, DML и DCL.
Wiki: https://ru.wikipedia.org/wiki/Data_Definition_Language

Data Manipulation Language (DML) (язык управления (манипулирования) данными) — это семейство компьютерных языков, используемых в компьютерных программах или пользователями баз данных для получения, вставки, удаления или изменения данных в базах данных.
На текущий момент наиболее популярным языком DML является SQL, используемый для получения и манипулирования данными в РСУБД. Другие формы DML использованы в IMS/DL1, базах данных CODASYL (таких как IDMS), и других.
Wiki: https://ru.wikipedia.org/wiki/Data_Manipulation_Language
*/


>>>>> Создание базы данных <<<<<<<

/*
Локаль - набор параметров, определяющий региональные настройки пользовательского интерфейса, такие как язык, страна, часовой пояс, набор символов и т. п.

Документация:
CREATE DATABASE / PostgreSQL Manual: https://www.postgresql.org/docs/9.0/static/sql-createdatabase.html

По умолчанию пользователь, из учетной записи которого выполнялась команда создания, является владельцем (owner) только что созданной БД.
*/ 

$ psql -U postgres // подключаемся к СУБД от имени пользователя postgres
CREATE DATEBASE test; // создание БД test
\? // справка по cлужебным командам
\l // список БД
ALTER DATEBASE test RENAME TO test2; // переименование БД
ALTER DATEBASE test OWNER TO vagrant; // изменение владельца БД
DROP DATABASE test2; // удаление БД test2
\q // выход из клиента

$ create -U postgres test // создаем БД из под пользователя postgres не заходя в клиент 
$ dropdb -U postgres test // удаляем БД из под пользователя postgres не заходя в клиент 

// В случаях когда название сущности в базе (например таблицы) состоит из не цифро-буквенных символов или совпадает с ключевыми словами самого sql, то имена заключают в двойные кавычки.


>>>>> Создание таблицы <<<<<<<

$ psql -U postgres 
$ \c hexlet // подключаемся к БД hexlet
$ \d // список таблиц
$ \d products // describe: просмотреть информацию о таблице

// file: ddl.sql

CREATE TABLE products ( // создание таблицы products
	product_no integer,
	product boolean, 
	name character varying, // character varying похож на varchar в MYSQL
	description text,
	count integer,
	price numeric, // хранение дробных чисел
	created_at timestamp // есть вариант с timezone
);

// в PostgreSQL действует строгая типизация

$ psql -U postgres hexlet < ddl.sql // перенаправляем поток - отправляем содержимое файла в БД


>>>>> Ограничения <<<<<<<

NULL // значение не установлено

// Constraints - ограничения на столбец или группу столбцов

CREATE TABLE products ( // создание таблицы products
	product_no integer NOT NULL, // ограничение не-null - колонка не должна содержать значение null.
	product_no integer UNIQUE, // ограничения уникальности - данные, содержащиеся в колонке или группе колонок являются уникальными по отношению к другим строкам в той же таблице
	product_no integer PRIMARY KEY // первый ключ
	product_no integer UNIQUE NOT NULL, // ограничение первичного ключа
	UNIQUE(product_no, count); // ограничение на группу столбцов. Комбинация полей должна быть уникальной, но не внутри.
	price numeric CHECK (price > 0) // задать для определённой колонки, выражение, которое будет осуществлять проверку, помещаемого в эту колонку значения.
);


CREATE TABLE products ( // таблица товаров
    product_no integer PRIMARY KEY,
    name text,
    price numeric
);

CREATE TABLE orders (
    order_id integer PRIMARY KEY,
    product_no integer REFERENCES products,
    quantity integer
);

/*
таблица orders является ссылающейся (referencing) таблицей, а таблица products является ссылочной (referenced) таблицей. Похожим образом, колонки являются ссылающейся и ссылочной.

Внешний ключ может также ограничивать и ссылаться на группу колонок. Такое ограничение необходимо записывать как ограничение на таблицу. Вот пример:
*/

CREATE TABLE t1 (
  a integer PRIMARY KEY,
  b integer,
  c integer,
  FOREIGN KEY (b, c) REFERENCES other_table (c1, c2)
);

/*
Документация:
Ограничения целостности: http://postgresql.ru.net/manual/ddl-constraints.html
Constraints: http://www.postgresql.org/docs/9.4/static/ddl-constraints.html
Ограничения и первичные ключи: http://postgresql.ru.net/node/4

/**
Выполните в psql запрос, который создает таблицу cars с полями id (primary key), name (unique, not null), price (без констрейнов) и created_at (not null). Типы столбцов нужно выбрать самостоятельно.
**/

CREATE TABLE cars (
    id integer PRIMARY KEY,
    name character varying UNIQUE NOT NULL,
    price numeric,
    created_at timestamp NOT NULL
);



>>>>> Добавление записи <<<<<<<


INSERT INTO products VALUES (1, 'car', 3.55);
select * from products;
INSERT INTO products (product_no, price) VALUES (4, 1); // вставка в определенные столбцы
INSERT INTO products (product_no, price) VALUES (4, 1), (9, 10); // вставка в определенные столбцы нескольких строк
DELETE FROM products; // удаляет все записи в products. ОСТОРОЖНо!
DELETE FROM products WHERE price = 10;

/*
Документация:
Insert: https://www.postgresql.org/docs/9.4/static/sql-insert.html
Вставка данных: http://postgresql.ru.net/manual/dml-insert.html

/**
Добавьте в таблицу cars две записи: (1, nissan, 1.12) и (10, kia, null).
**/

CREATE TABLE cars (
    id integer PRIMARY KEY,
    name character varying UNIQUE NOT NULL,
    price numeric
);

INSERT INTO cars VALUES (1, 'nissan', 1.12);
INSERT INTO cars (id, name) VALUES (10, 'kia');



>>>>> Обновление данных <<<<<<<

UPDATE products SET PRICE = 4 WHERE product_no = 2;
UPDATE products SET price =2, name = 'book2' WHERE  product_no > 5; // обновление нескольких значений
UPDATE products SET price = price + 3; // увеличиваем значения колонки на 3

SELECT * FROM PRODUCTS;
/*
Документация:
UPDATE: http://www.postgresql.org/docs/9.1/static/sql-update.html
Обновление данных: http://postgresql.ru.net/manual/dml-update.html


/**
Увеличьте прайс в два раза для записи с именем nissan.
Установите имя в bmw для записи с id равным 10.
**/

CREATE TABLE cars (
    id integer PRIMARY KEY,
    name character varying UNIQUE NOT NULL,
    price numeric
);

INSERT INTO cars VALUES (1, 'nissan', 1.12);
INSERT INTO cars (id, name) VALUES (10, 'kia');

UPDATE cars SET price = price * 2 WHERE name = 'nissan';
UPDATE cars SET name = 'bmw' WHERE id = 10;



>>>>> Значения по умолчанию  <<<<<<<

CREATE TABLE products (
    product_no integer PRIMARY KEY,
    name character varying,
    price numeric DEFAULT 3.3 // по умолчанию
);

CREATE SEQUENCE serial; // генератор чисел, может быть подключен к разным таблицам (является стандартом SQL)
SELECT * FROM serial; // => таблица с 1 полем (start_value = 1, last_value = 3, max-value = 92233... и т.д.)
SELECT nextval('serial'); // продвигает последовательность к следующему значению => 1
SELECT nextval('serial'); // => 2

CREATE TABLE products (
    product_no integer PRIMARY KEY DEFAULT nextval('serial'), // будет 3
    name character varying,
    price numeric DEFAULT 3.3 // по умолчанию
);

// Сокращенный вариант <->

CREATE TABLE products (
    product_no SERIAL PRIMARY KEY;
    // ...
);


/*
Документация:
Defaults: http://www.postgresql.org/docs/9.4/static/ddl-default.html
Значения по умолчанию: http://postgresql.ru.net/manual/ddl-default.html

/**
Создайте таблицу cars. Сделайте поле id типа SERIAL, текстовое поле name и поле price со значением по умолчанию равным 1.22.
**/

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    name character varying,
    price numeric DEFAULT 1.22
);



>>>>> Модификация таблиц  <<<<<<<

// Adding a Column
ALTER TABLE products ADD COLUMN description text; // добавление колонки с типом
ALTER TABLE products DROP COLUMN description;

// Adding a Constraint 
ALTER TABLE products ADD CONSTRAINT some_name UNIQUE (product_no); // в () поля на которые вешаем CONSTRAINT
ALTER TABLE products DROP CONSTRAINT some_name;

ALTER TABLE products ALTER COLUMN product_no SET NOT NULL; // для NOT NULL отделный синтаксис
ALTER TABLE products ALTER COLUMN product_no DROP NOT NULL;

// Changing a Columns Default Value
ALTER TABLE products ALTER COLUMN price SET DEFAULT 7.77;
ALTER TABLE products ALTER COLUMN price DROP DEFAULT;

// Changing a Columns Data Type
ALTER TABLE products ALTER COLUMN price TYPE numeric(10, 2);

// Renaming a Column
ALTER TABLE products RENAME COLUMN product_no TO product_number;

// Renaming a Table
ALTER TABLE products RENAME TO items;

/*
Документация:
Alter table: http://www.postgresql.org/docs/9.1/static/sql-altertable.html
Изменение таблиц: http://postgresql.ru.net/manual/ddl-alter.html

/**
Напишите запрос который изменит таблицу products так как описано ниже:

Поле name должно стать not null, unique и иметь тип character varying;
Добавьте поле amount типа integer;
Удалите default у поля price;
**/

DROP TABLE IF EXISTS "products";

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name text,
    price numeric DEFAULT 1
);

ALTER TABLE products
    ADD COLUMN amount integer,
    ALTER COLUMN name TYPE varchar,
    ALTER COLUMN name SET NOT NULL,
    ADD CONSTRAINT name_uniq UNIQUE (name),
    ALTER COLUMN price DROP DEFAULT;

/*
Документация:
Создание последовательности: https://postgrespro.ru/docs/postgrespro/10/sql-createsequence
Схемы: http://postgresql.ru.net/manual/ddl-schemas.html
*/


>>>>>  Схема <<<<<<<

\d /* => 

Schema | Name                    | Type     | owner
----------------------------------------------------
public | products                | table    | postgres
public | products_product_no_seq | sequence | postgres

Schema своего рода namespace в SQL
*/

SELECT * FROM schema.table // название_схемы.название_таблицы
CREATE SCHEMA mysupershema;

\dn // список схем
\dt *.* // список всех таблиц(сюда входят sequence, функции, и т.д.) во всех схемах

SHOW search_path; // показывает в каких схемах осуществляется поиск => имя_пользователя, public и в pg_catalog
drop schema myschema cascade; // cascade - удалить указанную сущность и все зависимости

/*
Документация:
Создание последовательности: https://postgrespro.ru/docs/postgrespro/10/sql-createsequence
Схемы: http://postgresql.ru.net/manual/ddl-schemas.html

/**
Выполните в psql следующие запросы:
Создание схемы custom.
Создание последовательности serial в новой схеме.
**/

CREATE SCHEMA custom;
CREATE SEQUENCE custom.serial;



>>>>>  Представления <<<<<<<
 
CREATE VIEW products2 AS SELECT * FROM PRODUCTS; // в \d будет иметь тип не table, а view (по сути вложенный запрос)
SELECT * products2;
DROP VIEW products2; // удаление view
/*
Документация:
CREATE VIEW in PostgreSQL: http://www.postgresql.org/docs/9.4/static/sql-createview.html
Представления в PostgreSQL: http://postgresql.ru.net/manual/tutorial-views.html
Представления в БД / Википедия: http://bit.ly/1MjW1qC
Представления в MySQL: http://habrahabr.ru/post/47031/


/**
Выполните в psql создание новой view с назавнием cars_without_price. Вью должна быть основана на выборке из таблицы cars и должна содержать все поля этой таблицы за исключением price;
**/

CREATE TABLE cars (
    id integer PRIMARY KEY,
    name character varying UNIQUE NOT NULL,
    price numeric
);

INSERT INTO cars VALUES (1, 'nissan', 1.12);

CREATE VIEW cars_without_price AS select id, name FROM cars;



>>>>> SELECT <<<<<<<

select * from products;
select price, name from products;
select pricem name as name2 from products; // задание псовдонима колонке
select price + 2 as newprice from products; // увеличение значений колонок + псовдонима колонке
select 2 + 3; испольщование SQL как калькулятора
select random() + price from products; // увеличение колонки price на рандомное значение

/*
Полезные ссылки
Использование SQL для извлечения информации из таблиц: http://postgresql.ru.net/gruber/ch3.html
SELECT / PostgreSQL documentation: http://www.postgresql.org/docs/9.4/static/sql-select.html
Википедия / Что такое ORM: https://ru.wikipedia.org/wiki/ORM

/**
Выполните в psql запрос, который выбирает из таблицы products поля name и new_price. new_price вычисляется по формуле price + 1;
**/

SELECT name, (price + 1) AS new_price FROM products;



>>>>>  WHERE <<<<<<<

select * from products where product_no = 1;
select * from products where price = 20 and price = 30; // <->
select * from  products where product_no in (1, 3, 4); //  product_no = 1 или 3 или 4
select * from  products where price between 20 and 30; // price от 20 до 30
select * from  products where name is null; // is null - значение поля не задано (null), задано - is not null

/*
Полезные ссылки
PostgreSQL SELECT (with WHERE): http://www.postgresql.org/docs/9.4/static/sql-select.html
Квалифицированный выбор при использовании предложений: http://www.postgresql.org/docs/9.4/static/sql-select.html

/**
Выполните в psql запрос который выбирает из таблицы goods все названия товаров, у которых категория products и цена от 3 до 5 включительно;
**/

SELECT name FROM goods WHERE category = 'products' AND price BETWEEN 3 AND 5



>>>>>  Where и like <<<<<<<

// like - просматривает всю таблицу

select * from products where name like 'car'; // ищет поле с точным соответствием
select * from products where name like 'c%'; // поля начинающиеся с 'c'
select * from products where name like '%c'; // поля заканчивающиеся на 'c'
select * from products where name like '_v_'; // 3 символа, в середине - 'v'
select * from products where name ilike '_v_'; // нерегистрозависимый поиск

/* 
Полезные ссылки
Pattern matching in PostgreSQL: http://www.postgresql.org/docs/9.4/static/functions-matching.html
Использование LIKE в PostgreSQL: http://postgresql.ru.net/docs/sql_kg/2-3-4.html
Что такое полнотекстовый поиск (и отличия от LIKE): http://habrahabr.ru/post/40218/
*/



>>>>>  Порядок вывода <<<<<<<
 














































############################ PHP PDO: Работа с базой данных ############################

>>>>>  Соединение с базой данных  <<<<<<< 

namespace Theory

$opt = [
    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION   // режим ошибок - Exceptions    
       ];

/* $dsn = "mysql:host=$host;dbname=$db;charset=$charset"; // Формат описывающий параметры для подключения */

$pdo = new \PDO('sqlite::memory', null, null, $opt); // 2-й, 3-й параметр логин и пароль.

$pdo->exec("CREATE TABLE users (id integer, name string)");    
$pdo->exec("INSERT INTO users VALUES 3, 'adel')");     
$pdo->exec("INSERT INTO users VALUES (7, 'ada')");    
$data = $pdo->query("SELECT * FROM users")->fetchAll();
print_r($data);


/**
Реализуйте интерфейс App\DDLManagerInterface в классе App\DDLManager

Пример использования:
**/

$dsn = 'sqlite::memory:';
$ddl = new DDLManager($dsn);

$ddl->createTable('users', [
    'id' => 'integer',
    'name' => 'string'
]);

/*
Получившийся запрос в базу:

CREATE TABLE users (
    id integer,
    name string
);
*/

namespace App;

interface DDLManagerInterface
{
    public function __construct($dsn, $user = null, $pass = null);

    public function createTable($table, array $params);
}


namespace App;

class DDLManager implements DDLManagerInterface
{
    private $pdo;

    public function __construct($dsn, $user = null, $pass = null)
    {
        $options = [\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION];
        $this->pdo = new \PDO($dsn, $user, $pass, $options);
    }

    public function createTable($table, array $params)
    {
        $fieldParts = array_map(function ($key, $value) {
            return "{$key} {$value}";
        }, array_keys($params), $params);
        $fieldsDescription = implode(", ", $fieldParts);
        $sql = sprintf("CREATE TABLE %s (%s)", $table, $fieldsDescription);
        return $this->pdo->exec($sql);
    }  

    public function getConnection()
    {
        return $this->pdo;
    }
}



>>>>>  Безопасность при работе с внешними данными  <<<<<<<

// WRONG!!!

$id = 7;
$name = 'ada';
$pdo->exec("INSERT INTO users VALUES ($id, '$name')");


// SQL INJECTION:
$id = 8;
$name = "ada'); DELETE FROM users; --";  //  '); - закрываем запрос; -- комментируем оставшуюся часть запроса'); в конце
$sql = "INSERT INTO users VALUES ($id, '$name')";
print_r($sql);
$pdo->exec($sql);

// OK:
$VALUES = [3, 'm\'ark --']; 
$data = implode(', ', array_map(function ($item) use ($pdo) { 
    return $pdo->quote($item);  // заключает строку в кавычки (если требуется) и экранирует специальные символы внутри строки подходящим для драйвера способом.
}, $VALUES));
$sql = "INSERT INTO users VALUES ($id, '$name')";
print_r($sql);

$data = $pdo->query("select * from users")->fetchAll();
print_r($data);


/**
Query класс который предоставляет абстракцию поверх sql. Его главное достоинство это возможность строить динамические запросы без склеивания строк. Реализуйте метод toSql.

Пример использования:
**/

$query = new Query($pdo, 'users');
$query = $query->where('from', 'github');
$query = $query->where('id', '3')->where('age', 21);

// SELECT * FROM users WHERE from = 'github' AND id = 3 AND age = 21;
$query->toSql();

$query->all();

namespace App;

class Query
{
    private $pdo;
    private $where = [];

    public function __construct($pdo, $table, $where = [])
    {
        $this->pdo = $pdo;
        $this->table = $table;
        $this->where = $where;
    }

    public function where($key, $value)
    {
        $where = [$key => $value];
        return $this->getClone($where);
    }

    public function all()
    {
        return $this->pdo->query($this->toSql())->fetchAll();
    }

    public function toSql()
    {
        $sqlParts = [];
        $sqlParts[] = "SELECT * FROM {$this->table}";
        
        if ($this->where) {
            $where = implode(' AND ', array_map(function ($key, $value) {
                $quotedValue = $this->pdo->quote($value);
                return "$key = $quotedValue";
            }, array_keys($this->where), $this->where));
            $sqlParts[] = "WHERE $where";
        }

        return implode(' ', $sqlParts);        
    }

    private function getClone($where)
    {
        $mergedData = array_merge($this->where, $where);
        return new self($this->pdo, $this->table, $mergedData);
    }
}



>>>>>  Результат запроса в базу данных  <<<<<<<

$stmt = $pdo->query("select * from users"); // подготовленный запрос, возращает объект PDO Statement 

print_r($stmt->fetchAll()); // данные извлекаются сразу. При этом, ключи представлены дважды: как числовые индексы и как ключ в ассоциативном массиве.
print_r($stmt->fetchAll(\PSO::FETCH_ASSOC)); // возращает ассоциативный массив

// задаем дефолтный способ извлечения:
$options = [
             \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
             \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC
           ];

while ($row = $stmt->fetch()) { // работаем с курсором, данные как правило находятся в базе (зависит от клиента) 
    print_r($row);
} 

// или        

foreach ($stmt as $value) {
    print_r($value);
}

// PDO::FETCH_COLUMN - вытаскивает только одну колонку из результата.

$data = $pdo->query('SELECT name FROM users')->fetchAll(PDO::FETCH_COLUMN);

/* array (
  0 => 'John',
  1 => 'Mike',
  2 => 'Mary',
  3 => 'Kathy',
) */

// PDO::FETCH_KEY_PAIR - из двух запрошенных полей содержимое первого становится ключом, а второго - значением одномерного массива.

$data = $pdo->query('SELECT name, car FROM users')->fetchAll(PDO::FETCH_KEY_PAIR);

/* array (
  'John' => 'Toyota',
  'Mike' => 'Ford',
  'Mary' => 'Mazda',
  'Kathy' => 'Mazda',
)*/

// PDO::FETCH_UNIQ - возвращает массив с остальными полями. Первое поле должно быть уникальным.

$data = $pdo->query('SELECT * FROM users')->fetchAll(PDO::FETCH_UNIQUE);

/* array (
  'John' => array (
    'sex' => 'male',
    'car' => 'Toyota',
  ),
  'Mike' => array (
    'sex' => 'male',
    'car' => 'Ford',
  ),
  'Mary' => array (
    'sex' => 'female',
    'car' => 'Mazda',
  ),
  'Kathy' => array (
    'sex' => 'female',
    'car' => 'Mazda',
  ),
) */

$stmt = $pdo->query("select MAX(id) from users");
print_r($stmt->fetchColumn() . "\n"); // возвращает данные одного столбца  => 3


/*
Query — класс, который является абстракцией поверх sql. Его главное достоинство это возможность строить динамические запросы без склеивания строк.

Реализуйте метод count в соответствии с примером ниже.
Реализуйте метод map в соответствии с примером ниже.

Пример использования:
*/

$query = new Query($this->pdo, 'users');
$query = $query->where('social', 'github');
$query = $query->select('id', 'name');

$query->count() == sizeof($query->all());

$coll = $query->map(function ($row) {
    return $row['id'] . '-' . $row['name'];
});
print_r($coll); // ['id1-name1', 'id2-name2', ...]


namespace App;

class Query
{
    private $pdo;
    private $table;
    private $data = [
        'select' => '*',
        'where' => []
    ];

    public function __construct($pdo, $table, $data = null)
    {
        $this->pdo = $pdo;
        $this->table = $table;
        if ($data) {
            $this->data = $data;
        }
    }

    public function count()
    {
        $query = $this->select('COUNT(*)');
        $stmt = $this->pdo->query($query->toSql());
        return $stmt->fetchColumn();
    }

    public function map($func)
    {
        $stmt = $this->pdo->query($this->toSql());
        return array_map($func, $stmt->fetchAll());
    }

    public function select(...$arguments)
    {
        $select = implode(', ', $arguments);
        return $this->getClone(['select' => $select]);
    }

    public function where($key, $value)
    {
        $data = ['where' => array_merge($this->data['where'], [$key => $value])];
        return $this->getClone($data);
    }

    public function all()
    {
        return $this->pdo->query($this->toSql())->fetchAll();
    }

    public function toSql()
    {
        $sqlParts = [];
        $sqlParts[] = "SELECT {$this->data['select']} FROM {$this->table}";
        if ($this->data['where']) {
            $where = $this->buildWhere();
            $sqlParts[] = "WHERE $where";
        }

        return implode(' ', $sqlParts);
    }

    private function buildWhere()
    {
        return implode(' AND ', array_map(function ($key, $value) {
            $quotedValue = $this->pdo->quote($value);
            return "$key = $quotedValue";
        }, array_keys($this->data['where']), $this->data['where']));
    }

    private function getClone($data)
    {
        $mergedData = array_merge($this->data, $data);
        return new self($this->pdo, $this->table, $mergedData);
    }
}

// TEST:

namespace App;

class QueryTest extends \PHPUnit_Framework_TestCase
{
    private $pdo;

    public function setUp()
    {
        $opt = array(
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION
        );
        $pdo = new \PDO('sqlite::memory:', null, null, $opt);
        $pdo->exec("
                CREATE TABLE users (id integer,
                                    name string,
                                    social string,
                                    age integer)
            ");

        $pdo->exec("INSERT INTO users VALUES (1, 'John', 'github', 17)");
        $pdo->exec("INSERT INTO users VALUES (3, 'Adel', 'facebook', 17)");
        $pdo->exec("INSERT INTO users VALUES (8, 'Mike', 'github', 17)");
        $this->pdo = $pdo;
    }

    public function testCount()
    {
        $query = new Query($this->pdo, 'users');

        $this->assertEquals(3, $query->count());
        $this->assertCount(3, $query->all());
    }

    public function testMap()
    {
      $query = new Query($this->pdo, 'users');
      $query = $query->where('social', 'github')
          ->where('age', 17);

      $coll = $query->map(function ($row) {
          return $row['id'] . '-' . $row['name'];
      });
      $this->assertEquals(['1-John', '8-Mike'], $coll);
    }
}




>>>>>  Формирование подготовленных запросов  <<<<<<<

namespace Theory

$opt = [
    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,   // режим ошибок - Exceptions 
    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC   
       ];

$pdo = new \PDO('sqlite::memory', null, null, $opt); // 2-й, 3-й параметр логин и пароль.

$pdo->exec("CREATE table users (id integer, name string, role string)");    
$pdo->exec("INSERT INTO users VALUES (1, 'jorn', 'member')");
$pdo->exec("INSERT INTO users VALUES (3, 'adel', 'admin')");
$pdo->exec("INSERT INTO users VALUES (7, 'ada', 'member')");	

$stmt = $pdo->query("SELECT * FROM users");

$stmt = $pdo->prepare('SELECT name FROM users WHERE role :=role'); // подготавливает запрос, :role - символьное имя. При многократном вызове такой способ работает быстрее из-за кеширования плана запроса
$stmt->bindValue(':role', 'member', \PDO::PARAM_STR); // 3-й параметр необязательный - тип данных
$stmt->execute(); // подставляет данные в запрос

$data = [
		  [1, 'jorn', 'member'],
		  [2, 'mike', 'admin'],
		  [3, 'adel', 'member']
];

$stmt = $pdo->prepare("INSERT INTO users VALUES (?, ?, ?)");
foreach ($data as $value) {
	$stmt->execute($value);
}

$stmt = $pdo->prepare("SELECT name FROM users WHERE role = ? AND name != ?"); // ? - плейсхолдер
$stmt->execute(['member', '']);

print_r($stmt->fetchAll());


/**
UserMapper это класс отвечающий за сохранение объектов класса User в базе вместе с зависимостями. В нашем примере User может содержать фотографии (класс Photo).

Структура таблиц описана в файле UserMapperTest.php.

Пример:
**/
$user = new User();
$user->addPhoto('family', '/path/to/photo/family');
$user->addPhoto('party', '/path/to/photo/party');
$user->addPhoto('friends', '/path/to/photo/friends');

$mapper = new UserMapper($pdo);
$mapper->save($user);

// Реализуйте функцию save в классе UserMapper. В этом задании достаточно реализовать логику сохранения (только вставку) фотографий пользователя.

// file Photo.php:

namespace App;

class Photo
{
    private $user;
    private $name;
    private $filepath;

    public function __construct($user, $name, $filepath)
    {
        $this->user = $user;
        $this->name = $name;
        $this->filepath = $filepath;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getFilepath()
    {
        return $this->filepath;
    }
}

// file: User.php

namespace App;

class User
{
    private $photos;
    private $id;

    public function __construct($name)
    {
        $this->name = $name;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function addPhoto($name, $filepath)
    {
        $photo = new Photo($this, $name, $filepath);
        $this->photos[] = $photo;
    }

    public function getPhotos()
    {
        return $this->photos;
    }
}

// file: UserMapper.php

namespace App;

class UserMapper
{
    private $pdo;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    public function save(User $user)
    {
        $stmtUser = $this->pdo->prepare("INSERT INTO users (name) VALUES (?)");
        $stmtUser->execute([$user->getName()]);
        $user->setId($this->pdo->lastInsertId());

        // BEGIN (write your solution here)
        
        // END
    }
}