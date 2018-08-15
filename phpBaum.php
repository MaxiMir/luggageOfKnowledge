<?php
if (strcasecmp($_POST['email'], 'mm@mail.ru') == 0)  { // сравнение символьных строк без учета регистра
 print 'Welcome Mr.Max';
}

$print = 5; $tax = 0.075;
printf{'The dish costs $%.2f', $price * (1 + $tax)}; // форматированный вывод цены. %.f заменяется $price * (1 + $tax)  =>
// The dish costs $5.38


// Если после php кода ничего нет в конце, закрывающийся тег рекомендуется не ставить

/*
Изменение настроек php через .htaccess:
php_flag asp_tags on
*/
ini_get("post_max_size"); // Получение значения директивы из php.ini (приверы:50M, 1G, 1234K,12345678(байт))

$size = ini_get("post_max_size");
$letter = $size(strlen($size) - 1);
$size = (int)$size;

// В PHP switch использует '==' сравнение, а в JS '==='

switch (strtoupper($letter) {
	case "G": $size *= 1024;
	case "M": $size *= 1024;
	case "K": $size *= 1024;
}

echo $size;


// echo поддерживает передачу нескольких аргументов:
echo 'Эта', 'строка', 'была', 'создана', ' ', 'несколькими параметрами'; 
// => Этастрокабыласоздана несколькимипараметрами 

strftime('Сегодня %d-%m-%Y'); // => Сегодня 11-03-2017

// преобразование кодировок
echo iconv("windows-1251", "UTF-8", $name);

// Разрешаем константе быть нерегистрозависимой:
define("AAA", 100, true);
echo AAa; // => 100

// константы в PHP 5.3
const TWO_HUNDRED = 200;
// константы в PHP > 5.6. Можно присваивать выражения:
const TWO_HUNDRED_TEN = TWO_HUNDRED + 10;

// Установка локали и даты:
setlocal(LC_ALL, "russian"); // используется 1251
$day = strftime('$d');
$mon = strftime('$B');
$mon = iconv('windows-1251', 'UTF-8', $mon); // изменяем кодировку для переменной
$year = strftime('$Y');

/* Приветствие */
$hour = (int)strftime('%H');
$welcome = 'Доброй ночи';

if ($hour >= 6 and $hour < 12):
	$welcome = "Доброе утро";
elseif ($hour >= 12 and $hour < 18):
	$welcome = 'Добрый день';
elseif ($hour >= 18 and $hour < 23):
	$welcome = 'Добрый вечер';
endif;

// Включаем вывод всех ошибок:
error_reporting(E_ALL);
// Отключаем вывод всех ошибок
error_reporting(0);
// Включаем определенные уровни ошибок:
error_reporting(E_ERROR | E_WARNING);
error_reporting(E_ALL & E_DEPRECATED);


// Целые числа (integer):
$int = 0123; // восьмиричное число => 83
$int = 0x1A; // шестнадцатиричное число => 26
$int = 0b11111111; //  двоичное число (Версия PHP > 5.4) => 255

// Дробные числа (float):
$float = 1.234;
$float = 1.2e3;
$float = 7E-10;

// Строки:
$name = "JornBacя";
$len = mb_strlen($name); // => 8 байт
$myName = strlen('Максим'); // => 12 байт 
$yourName = strlen('Jorn'); // => 4 байт

// Проверка типов:
$str = "Jorn";
$int = 10;
$bool = true;

echo gettype($str); // => "string"
echo gettype($int); // => "integer"
echo gettype($bool); // => "boolean"
echo gettype($x); // => "NULL"

echo is_string($str); // "1"
echo is_integer($int); // "1"
echo is_boolean($bool); // "1"
echo is_null($x); // ""

// Приведение типов:
$str = "10 apples"
settype($x, "string"); // редко используется.
$int_from_str = (int)$str; // используется копия переменной $str => 10
$str_from_int = (string)$int; 
$bool_from_int = (bool)$int;

echo isset($val); // false в 2-х случаях: переменной нет или $val = null

empty($val); // тоже самое: !$val
(bool) "0"; // false

// Тернарный оператор:
$x = true;
echo $x ? '$x - true' : '$x - false'; // => $x - true
$y = ($x) ? '$y - true' : '$y - false'; // => $y - true


/*
Все что между php блоками выводится в через echo.
<h1>header</h1> для php <=> echo '<h1>header</h1>'
*/


$nums = [1, 2, 3, 4];

foreach ($nums as &$value) {
	$v *= 10;
} // $nums = [10, 20, 30, 40];
$v = 100; // Ссылка на последний элемент массива сохраняется => $nums = [10, 20, 30, 100]


function foo() {
	$x = 0; // локальная переменная будет хранить значение
	echo $x++;
}

foo(); // => 0
foo(); // => 0
foo(); // => 0

function foo() {
	static $x = 0; // локальная переменная будет хранить значение
	echo $x++;
}

foo(); // => 0
foo(); // => 1
foo(); // => 2

function say($name, $h = 3) // вначале обязательные аргументы
{
	echo "<h$h>Hello, $name!</h$h>";
}

$str = "say";
$str("Max"); // динамический вызов функции => <h3>Hello, Max!</h3>


function drawTable($cols = 10, $rows = 10, $color = "yellow")
{
	echo "<table border='1'>";
	for ($tr = 1; $tr <=$rows; $tr++) {
		echo '<tr>';
		for($td = 1; $td <= $cols; $td++) {
			if ($tr == 1 or $td == 1)
				echo '<th style="background: $color">' . $tr*$td . '</th>';
			else
				echo '<td>' . $tr * $td . "</td>";	
		}
		echo '<tr>';
	}
	echo "</table>";
}

// Рекомендуется обращаться к глобальным переменным через $GLOBALS['name']
$name = "Vasya";
function deleteName() 
{
	global $name;
	unset($name); // удалит только копию переменной $name
}


function nums()
{
	return [1, 2, 3];
}
 
list($one, $two, $three) = $nums;
echo $one; // => 1

$arr_two = nums()[2]; // c версии PHP >= 5.4

function nums($x, $y, &$a, &$b, &$c) {
	$a = $x * $y;
	$b = $x / $y;
	$c = $x - $y;

	return $x + $y;
}

$sum = nums(2, 3, $mult, $div, $sub);
echo "Cумма: $sum | Произведение: $mult | Деление: $div | Разность: $sub";

// аналог count()
function my_count($var, $mode = 0)
{
	if (is_null($var)) return 0;
	if (!is_array($var)) return 1;
	$cnt = 0;
	foreach ($var as $v) { 
		if (is_array($key) and $mode)
			$cnt += my_count($v, 1);
		$cnt++;
	}	
	return $cnt;
}

foo(2, 3, 4, 7);
function foo()
{
	echo func_num_args(); // возвращает количество переданных аргументов
	print_r(func_get_args()); // вовзращает массив переданных аргументов
	echo func_get_arg(2); // возвращает 2 элемент (считаем с 0)
}

function foo(array $param) {}
foo([]);

function bar($y) {}
function foo(callable $param, $x) {
	$param($x);
}
foo(bar, 2);

print_r( getdate() ); // возвращает массив с данными о времени
 
echo time(); // возвращает временную метку 
echo mktime(0, 0, 0, 2, 15, 2016); // Возвращает времененную метку для заданной даты (Часы,Минуты.Секунды,Месяц,День,Год)
echo strftime("%d - %Y"); // => 25 - 2015
echo strftime("%d - %Y", 1234567890); // отформатирует переданную метку времени => 14 - 2009
echo date("d-m-Y H:i:s"); // не работает с локалью => 13-03-2017 11:02:56 
echo date("d-m-Y H:i:s", 1234567890); // отформатирует переданную метку времени => 14-02-2009 02:31:30

// print всегда возвращает 1, echo ничего не возвращает
echo 2 + print 4; // -> 4echo 2 + 1 => 43

// Магические константы:
echo __LINE__; // выводит номер строки, где она прописана => 101
echo __FILE__; // выводит полный путь до файла, где это прописано =>
// C:\Users\Public\OpenServer\domains\mysite.local\demo\test.php
echo __DIR__; // выводит путь до файла, где это прописано =>
// C:\Users\Public\OpenServer\domains\mysite.local\demo
function foo()
{
	echo __FUNCTION__; // выводит имя функции => foo
}

print_r(get_defined_constants(), true); // возвращает массив со встроенными константами
PHP_VERSION; // версия PHP
PHP_OS; // версия ОС

function drawMenu($menu, $vertical = true) 
{
	if (!is_array($menu))
		return false;
	$style = "";
	if (!$vertical)
		$style = " style='display:inline;'";
	echo "<ul>";
	foreach ($menu as $item) {
		echo "<li$style>";
		echo "<a href='$item[href]'>{$item['link']}</a>";
		echo "</li>";
	}
	echo "</ul>";
	return true;	
}

// запускаем: 
if (!$drawMenu($leftMenu)) 
	trigger_error("Проблема с отрисовкой меню", E_USER_ERROR); // записывает это сообщение в файл error.log

set_error_handler("myError"); // установка перехватчика ошибок
function myError($no, $msg, $file, $line) // функция перехвата ошибок
{
	// мы сами квалифицируем ошибки по видам и описываем их:
	if ($no == E_USER_ERROR) {
		echo "Так не должно быть"; // выводится на сайте
		$s = date("d-m-Y H:i:s") . " - $msg в $file:$line";
		error_log("$s\n", 3, "error.log"); // 3 - запись файла
	}

	if ($no == E_USER_WARNING) {}; 

	if ($no == E_USER_NOTICE) {};
}

if ($error) {
	trigger_error("Что-то случилось", E_USER_ERROR); // показываем PHP, что здесь ошибка и нужно вызвать обработчик  
}


/* Суперглобальные переменные */
$_ENV; // Системные переменные о ОС

$_SERVER['QUERY_STRING']; // name=John&age=25 
$_SERVER['REQUEST_URI']; // /info.php?name=John&age=25
$_SERVER['SCRIPT_NAME']; // /info.php

if($_SERVER['REQUEST_METHOD'] == 'POST')
	echo 'Данные отправлены методом POST';

$_COOKIE;
$_SESSION;
$_FILES;
$_GET;
$_POST;
$_REQUEST;


// Прием параметров из тела запроса и их фильтрация:
$name = trim(strip_tags($_POST['name']));
$age = abs((int) $_POST['age']); // abs - делает число абсолютным > 0


function clearInt($data)
{
	return (int)$data;
}

function clearStr($data)
{
	return trim(strip_tags($data));
}

$output = "";
if($_SERVER['REQUEST_METHOD'] == 'POST') {
	$n1 = clearInt($_POST['num1']);
	$n2 = clearInt($_POST['num2']);
	$op = clearStr($_POST['operator']);
	// TODO: проверить тип
	$output = "$n1 $op $n2 = ";
	switch ($op) {
		case '+': $output .= $n1 + $n2; break;
		case '-': $output .= $n1 - $n2; break;
		case '*': $output .= $n1 * $n2; break;
		case '/': 
			if($n2 == 0)
				$output = "Деление на 0 запрещено!";
			else
				$output .= $n1 / $n2;
			break;
		default: $output = "Неизвестный оператор!";
	}

}

if($output) 
	echo "<h3>Результат: $output</h3>";

/*
<input name="num1" type="text" value='<?=$n1?>'> // После отправки данных в форме в полях остаются введенные значения
*/
// создание cookie
setcookie("name", "John"); // создание временной (пока открыт браузер) cookie
setcookie("name", "John", time() + 3600); // создание долговременной cookie на 1 час
setcookie("name", "John", time() + 3600, "/docs/"); // cookie доступны 1 час по пути /docs
setcookie("name", "John", time() + 3600, "/", ".example.com"); // cookie доступны 1 час по пути всех поддоменов
setcookie("name", "John", time() + 3600, "/", ".example", true); // cookie можно отдавать только при https
setcookie("name", "John", time() + 3600, "/", ".example", false, true); // cookie можно отдавать только при http запросе

// удаление cookie
setcookie("name", "John", time() - 3600); 
setcookie("name"); 
setcookie("name", "");
setcookie("name", false);

$user = [
	'name' => 'John',
	'login' => 'root',
	'password' => '1234'
];

// Для сохранения целостности:
$str = base64_encode( serialize($user)); // массив -> строка
setcookie("user", $str);

$user = unserialize(base64_decode($_COOKIE["user"])); // строка -> массив
print_r($user);

// Счетчик посещений:
$visitCounter = 0;
if(isset($_COOKIE["visitCounter"]))
	$visitCounter = $_COOKIE["visitCounter"];
$visitCounter++;
$lastVisit = "";
if(isset($_COOKIE["lastVisit"]))
	$lastVisit = date("d-m-Y H-i-s", $_COOKIE["lastVisit"]);

if(date("d-m-Y", $_COOKIE["lastVisit"]) != date("d-m-Y")) {
	setcookie("visitCounter", $visitCounter, 0x7FFFFFFF);
	setcookie("lastCounter", time(), 0x7FFFFFFF);
}

if($visitCounter == 1) {
	echo "Спасибо, что зашли на наш огонек";
} else {
	echo "Вы зашли к нам: $visitCounter<br>
	Последнее посещение: $lastVisit";
}

// Переадресация и перезапрос 

header("Location: http://mysite.local"); // переадресация со статусом 302 (перезапросить ресурс)

// переадресация со статусом 301 (перезапросить ресурс)
header("HTTP/1.1 301 Moved Permanently"); 
header("Location: http://mysite.local"); 
header("Location: http://mysite.local", true, 301);

// перезапрос ресурса
header("Refresh: 3");
header("Refresh: 3; url=http://mysite.local"); 

$url = strip_tags($_GET["url"]);
if ($url) {
	header("Location: $url");
	exit;
}

<form action="<?=$_SERVER["PHP_SELF"]?>">
	Куда отправляемся?
	<select name="url" size="1">
		<option value="http://www.google.ru">Гугль</option>
		<option value="http://www.ya.ru">Яндех</option>
	</select>
</form>		


if ($_SERVER["REQUEST_METHOD"] == "POST") {
	// Форма передавала информацию:
	$name = strip_tags($_POST["name"]);
	$age = $_POST["age"] * 1;

	// Сохранение в cookie на сутки:
	setcookie("userName", $name);
	setcookie("userAge", $age);

	// Обработка формы
	// ...

	// перезапрос формы методом GET (лечение F5)
	header("Location: " . $_SERVER["PHP_SELF"]);
	exit;
} else {
	// чтение куки
	$name = strip_tags($_COOKIE["userName"]);
	// ...
}

// Установка типа содержимого:
header("Content-Type: text/xml"); // принудительная установка типа передаваемого ресурса

header("Content-Type: text/html; charset=utf-8"); // принудительная установка кодировки передаваемого ресурса

// Перенаправление вывода передаваемых данных:
header("Content-Type: text/plain");  
header("Content-Disposition: attachment; filename=\"myfilename")

# Управление кэшированием:
header("Cashe-Control: no-cache, max-age=0"); // запрет кэширования
header("Cashe-Control: no-store"); // полный запрет кэширования
header("Cashe-Control: max-age=3600"); // разрешение кэширования на 1 час относительно времени запроса
header("Expires" . date("r", time() + 3600)); // разрешение кэширования на 1 час

# Пример:
header("Cashe-Control: no-cache"); // промежуточный кэш сохраняется, после закрытия браузера удаляется

# Буферизация вывода

// включаем буферизацию
ob_start(); 
echo 'Hello world';
setcookie("name", "Jorn");

// Посылаем содержимое буфера
ob_flush();

echo 'Еще контент!';
echo 'И еще контент!';

// Посылаем содержимое буфера и отключаем его
ob_end_flush();



ob_start(); // включаем буферизацию
echo 'Hello';
$output = ob_get_contents(); // выбираем то, что находится в буфере
echo 'world';
$output2 = ob_get_contents(); // выбираем то, что находится в буфере
ob_clean(); // очищаем буфер, но не закрываем

echo "Саша";
echo " и ";
echo "Маша";

$output3 = ob_get_contents(); // выбираем то, что находится в буфере

ob_end_clean(); // очищаем буфер и закрываем

echo $output1; // => Hello
echo $output2; // => Hello world
echo $output3; // => Саша и Маша


$_SESSION; // На сервере создается текстовый файл sess_зашифрованный_id_сессии_для_этого_пользователя


session_start(); // создание и(или) доступ к сессии
$_SESSION['name'] = 'John'; // запись в сессионную переменную
session_destroy(); // очистка сесионных переменных (кука остается)
setcookie(session_name(), session_id(), time() - 3600); // принудительное удаление сессионой cookie

// session.auto_start = 0; // При выставлении 1 (php.ini), сессия будет запускаться на всех php файлах
ini_set('session.name', PHPSESSID); // Имя сессии
ini_set('session.save_path', ''); // Место для хранения файлов сессии. Если не задано, используется временная папка ОС (напр., windows/temp).
ini_set('session.gc_maxlifetime', '1440'); // Максимальное время сессии
ini_set('session.cookie_httponly', ''); // Время сессии
ini_set('session.cookie_path', '/');

if( file_exists("file.txt")) { // Проверка файла в директории на существование
	echo "Файл или директория существует";
}

if( is_readable("filename.txt")) {
	echo "Файл можно читать!"
}

// Размер файла
echo "Длина файла file.txt: " . filesize("file.txt");

// Время изменения и доступа к файлу

echo "Файл file.txt был изменён: " . filemtime("file.txt");

echo "и запрошен: " . fileatime("file.txt");

// Что можно с файлом делать?

if( is_readable("file.txt") ) {
 echo "Файл можно читать";
}

if( is_writable("file.txt") ) {
 echo "В файл можно писать";
}
if( is_executable("file.exe") ) {
 echo "Файл можно исполнять";


# Работаем с потоком
$f = fopen("file.txt", "r") or die("Не могу открыть файл!"); // открытие потока на чтение и получение его дескриптора. $f - дескриптор. Тип переменной $f - ресурс.Если файла нет -> он создаться (если позволят права)

fclose($f); // закрытие потока

$f = fopen("file.txt", "r+"); // открытие потока на чтение и запись. Указатель помещается в начале файла
$f = fopen("file.txt", "a"); // открытие потока на запись. Указатель помещается в конец файла
$f = fopen("file.txt", "a+"); // открытие потока на чтение и запись. Указатель помещается в конец файла 
$f = fopen("file.txt", "w"); // открытие потка на запись. Файл обрезается до нулевой длины(перезаписывается)
$f = fopen("file.txt", "w+"); // открытие потока на чтение и запись. Файл обрезается до нулевой длины(перезаписывается)

// читаем файл кусками:
$f = fopen("data.txt", "r");
echo fread($f, 5); // читаем первые 5 байт из потока
echo fread($f, 3); // читаем следующие 3 байта из потока
// выводим все с текущей позиции до конца
fpassthru($f); 
fclose($f);


// Читаем файл построчно в массив
$f = fopen("file.txt", "r");
$lines = [];
while ($line = fgets($f)) {
	$lines[] = $line;
}
fclose($f);

// Читаем файл построчно в массив
$f = fopen("data.html", "r");
$lines = [];
while ($line = fgetss($f)) { // вырезает все html теги, так же в "<p><br>" можно указать теги которые не вырезать 
	$lines[] = $line;
}
fclose($f);

// Читаем файл побайтово в массив
$f = fopen("data.txt", "r");
$bytes = [];
while(!feof($f)) { // пока не достигнет конца файла
	$bytes[] = fgetc($f);
}
fclose($f);
print_r($bytes); // =>
[
	[0] => L
	[1] => i
	[2] => n
	[3] => e
	[4] => s
	[5] =>
	[6] => g
	[7] => o
};

// Пишем файл
$f = fopen("file.txt", "r+");
fwrite($f, "Новый текст", 25); // 25 - ограничение строки в байтах 
fclose($f);

// Пишем в конец файла
$f = fopen("file.txt", "a");
fputs($f, "/nLine Six"); // синоним fwrite
fclose($f);

// Читаем последние 10 байт из потока:
$f = fopen("file.txt", "r");
fseek($f, -10, SEEK_END); // устанавливаем указатель в нужную позицию. -10 - байт влево от конца файла
echo ftell($f); // в какой позиции мы находимся?
echo fread($f, 10); // читаем последние 10 байт в файле
rewind($f); // устанавливаем указатель в начало потока
fclose($f);

# Прямая работа с файлами:
readfile("file.txt"); // читает весь файл напрямую в буфер вывода
// тоже самое что:
$f = fopen("file.txt", "r");
echo fread($f, filesize("file.txt"));
fclose($f);

// читаем файл построчно в массив:
$lines = file("file.txt");
// тоже самое что:
$f = fopen("file.txt", "r");
while ($lines[] = fgets($f));
fclose($f);

// получаем весь файл в виде строки:
$file = file_get_contents("file.txt");
// тоже самое что:
$f = fopen("file.txt", "r");
$file = fread($f, filesize("file.txt"));
fclose($f);

// Пишем в файл затирая содержимое:
file_put_contents("file.txt", "Новое содержимое");
// тоже самое что:
$f = fopen("file.txt", "w");
fputs($f, "Новое содержимое");
fclose($f);

// Пишем в файл добавляя содержимое в конец:
file_put_contents("file.txt", "Новое содержимое", FILE_APPEND);
// тоже самое что:
$f = fopen("file.txt", "a");
fputs($f, "Новое содержимое");
fclose($f);

# Управление файлами:
copy("source.txt", "destination.txt"); // копируем файл
rename("old.txt", "new.txt"); // переименовываем
unlink("file-to-delete.txt"); // удаляем файл

const PATH_LOG = 'log/path.log';
$dt = time();
$page = $_SERVER['REQUEST_URI'];
$ref = $_SERVER['HTTP_REFERER'];

$path = "$dt|$page|$ref\n";

file_put_contents(PATH_LOG, $path, FILE_APPEND);

$dt = time();

$page = $_GET["id"] ?? "Index"; // если GET["id"] установлен

$ref = $_SERVER["HTTP_REFER"];
$ref = pathinfo($ref, PATHINFO_BASENAME);

$path = $dt|$page|$ref\n;

file_put_contents(PATH_LOG, $path, FILE_APPEND);

if(is_file(PATH_LOG)):
	$file = file(PATH_LOG);
	echo "<ol>";

	foreach ($file as $line):
		list($dt, $page, $ref) = explode("|", $line);
	endforeach;
	$dt = date("d-m-Y H:i:S", $dt);
	echo "<li>";
	echo "$dt - $ref -> $page";
	echo "</li>";
	echo "</ol>";
endif;	



# Работа с директориями:
mkdir("newdir"); // создание директории
rmdir("dir-to-delete"); // удаление директории

echo getcwd(); // имя текущей директории

$dir = opendir("."); // заходим в текущую директорию. Возвращает дискриптор этой директории
while ($name = readdir($dir)) { // читаем текущую директорию
	if(is_dir($name))
		echo '[' . $name . "]\n";
	else
		echo $name . "\n";
}
closedir($dir); // выходим из директории

$dir_content = scandir("."); // читаем содержимое дирекории (по алфавиту) в массив. Если 1 вторым параметром, то будет отсортированно в обратном порядке. "." - текущая директория, ".." - родительская

$dir_txt_content = glob("*.txt"); // читает определенное содержимое директории в массив


# Загрузка файлов на сервер
/*
	* Настройки PHP.INI
	* file_uploads = "1" // разрешить зарузку файлов
	* upload_max_filesize = "2M" // максимальный размер закачиваемого файла
	* post_max_size = "8M" // максимальный размер передаваемых файлов через POST post_max_size > upload_max_filesize * max_file_uploads 
	* max_file_uploads = 20 // сколько одновременных файлов можно отправить
	* upload_tmp_dir = 
	* max_input_time = "-1" // сколько времени дается на закачку файла
*/
<form enctype="multipart/form-data" method="POST" action="">
	<input type="hidden" name="MAX_FILE_SIZE" value="4096"> // устанавить макс. размер файла (4096)
	<input name="userfile" type="file">
	<input type="submit">
<form>	
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$n = $_FILES['userfile']["name"];
	$t = $_FILES['userfile']["tmp_name"];
	move_uploaded_file($t, $n);
	var_dump($_FILES); // =>
}

array (size=1)
	'userfile' =>
		array (size=5)
			'name' => string 'mydoc.rtf' (length=9)
			'type' => string 'application/rtf' (length=15)
			'tmp_name' => string 'C:\Users\Public\php-14-07\server\userdata\temp\phpD682.tmp' (length=58)
			'error' => int 0
			'size' => int 3590
if ($_FILES["userfile"]["error"]) != UPLOAD_ERR_OK) {

	switch ($_FILES["userfile"]["error"]) {
		case UPLOAD_ERR_INI_SIZE:
			echo 'Превышен максимально допустимый размер'; break;
		case UPLOAD_ERR_FORM_SIZE:
			echo 'Превышено значение MAX_FILE_SIZE'; break;
		case UPLOAD_ERR_PARTIAL:
			echo 'Файл загружен частично'; break;	
		case UPLOAD_ERR_NO_FILE:
			echo 'Файл не был загружен'; break;	
		case UPLOAD_ERR_NO_TMP_DIR:
			echo 'Отсутствует временная папка'; break;						
		case UPLOAD_ERR_CANT_WRITE:
			echo 'Не удалось записать файл на диск';
	}
} else {
	echo "Размер загруженного файла: " . $_FILES["userfile"]["size"];
	echo "Тип загруженного файла: " . $_FILES["userfile"]["type"];
	move_uploaded_file($_FILES["userfile"]["tmp_name"], "upload/" . $_FILES[])
}

// константа E_ALL содержит сумму всех ошибок (напр., E_PARSE+E_ERROR+E_WARNING)


/*
id - первичный ключ. Поле с уникальными значениями
*/

/* 
Язык SQL делится на 3 части:
- Операторы определения данных (Data Definition Language, DDL)
- Операторы манипуляции данными (Data Manipulation Language, DML)
- Операторы определения доступа к данным
*/

SELECT name FROM tearches // дай мне все записи поля name из таблицы tearches

SELECT name, addr, city
	FROM tearches
	ORDER BY name // сортировка по полю name

SELECT title
	FROM courses
	WHERE length > 30 // дай мне записи title из таблицы courses где в поле length значения > 30 	

SELECT title
	FROM courses
	WHERE length > 30
	AND title LIKE 'Web%' // где title начинается с Web

SELECT * // дай мне все поля. Принятно не использовать данный селектор.
	FROM courses
	WHERE length > 30

SELECT DISTINCT length // выборка уникальных значений (последующие поля с теми же значениями игнорируются)
	FROM courses	

// объединение таблиц (t и l)
id |  name  | code 		id | tid | course 
1  | Иванов | IVAN		1	 1		PHP
2  | Петров | PETR 		2	 1	 	XML

SELECT t.name, t.code, l.courses 
	FROM teachers t
	JOIN lessons l ON t.id = l.tid
// teachers -> t и lessons -> l задаем псевдонимы	
// =>
name   | code | course 		
Иванов | IVAN | PHP		
Иванов | IVAN | XML 		

// левое внешнее объединение:
SELECT t.name, t.code, l.courses 
	FROM teachers t
	LEFT JOIN lessons l ON t.id = l.tid	
// =>
name   | code | course 		
Иванов | IVAN | PHP		
Иванов | IVAN | XML // ниже выводятся поля у которых не нашлось необх. значений	
Петров | PETR | NULL 	

# Вставка новой записи:
INSERT INTO courses
	VALUES (NULL, 'PHP', '...', 40) // строки в SQL заключаются в ''

INSERT INTO courses(title, length)
	VALUES ('PHP', 40)

# Удаление записи:
DELETE FROM lessons
	WHERE date = '2017-06-11'

# Изменение записи
UPDATE tearches
	SET
		zarplata = zarplata * 2,
		premia = premia * 10
	WHERE name LIKE 'Иванов%'
		OR name LIKE 'Петров%'
		OR name LIKE 'Сидоров%'		

UPDATE tearches
	SET
		zarplata = zarplata * 2,
		premia = premia * 10
	WHERE name IN
		('Иванов', 'Петров', 'Сидоров')

# Создание базы данных
CREATE DATEBASE news

# Создание таблицы и полей(СУБД MYSQL диалект)
CREATE TABLE items (
	id int NOT NULL auto_increment,
	title varchar(255) NOT FULL default '',
	description varchar(255) NOT FULL default '',
	content text,
	author varchar(50) NOT FULL default '',
	pubdate timestamp NOT NULL default '',
	PRIMARY KEY(id) // первичным ключем является поле id
)


/*
Сервер баз данных MySQL - один из самых распространенных серверов баз данных
Основые параметры по умолчанию:
  Порт: 3306
  Логин: root
  Пароль: -
Конфигурационный файл -> my.ini
Например:
daradir = "c:\\users\\public\\openserver\\userdata\\MySQL-5.5" // где находятся базы данных

Програмы для работы с СУБД MySQL:
- GUI
-- MySQL Administrator
-- MySQL Query Browser
-- EMS MySQL Manager

- Веб приложение phpmyadmin.net
- Утилиты командной строки:
-- mysql.exe
-- mysqldump.exe

Использование утилит командной строки:
- Соединение с монитором MySQL
mysql -uлогин -pпароль

Внимание! Внутри монитора MySQL надо явно указывать конец запроса (;)
USE имя_БД;
quit

Экспорт базы данных:
mysqldump -uлогин -pпароль имя_БД > dump sql

> Подключение необходимого расширения в PHP.INI
> php_mysqli.dll

>  Установка соединения с сервером
> Выбор базы данных для работы (при необходимости)
> Исполнение запроса
> Обработка данных (при необходимости)
> Закрытие соединения
*/

$link = mysqli_connect('localhost', 'root', '', 'web'); // соединение и выбор базы данных

if (!$link) { // отслеживаем ошибки при соединении
	echo 'Ошибка: '
		. mysqli_connect_errno() // возвращает служебный номер ошибки
		. ':'
		. mysqli_connect_error();
}

mysqli_select_db($link, 'test'); // выбираем другую БД для работы

$result = mysqli_query($link, "SET NAMES 'utf8'"); // посылаем простой запрос (здесь установка на время соединения кодировки utf-8). Результат true или false

$sql = 'SELECT name FROM teachers';
$result = mysqli_query($link, $sql); // посылаем запрос на выборку. Результат: object или false

if(!$result) { // отслеживаем ошибки при исполнении запроса
	echo 'Ошибка: '
		. mysqli_connect_errno() // возвращает служебный номер ошибки
		. ':'
		. mysqli_connect_error();		
}
// Варианты обработки результата:
// по умолчанию:
$row = mysqli_fetch_array($result);
$row = mysqli_fetch_array($result, MYSQLI_BOTH); // аналог

// индексированный массив:
$row = mysqli_fetch_row($result);
$row = mysqli_fetch_array($result, MYSQLI_NUM); // аналог

// ассоциативный массив
$row = mysqli_fetch_assoc($result);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC); // аналог


while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)); 
	print_r($row);

// тоже самое что:
	
$row = mysqli_fetch_all($result, MYSQLI_ASSOC); // полная выборка,возвращает массив массивов
print_r($row);

mysqli_close($link); // закрываем соединение

// экранируем строки
$name = mysqli_real_escape_string($link, "John O'Brian");
$sql = "INSERT INTO teachers(name, email)
				VALUES ('$name', 'john@gmail.com')";

mysqli_query($link, $sql);

// получаем первичный ключ новой записи:
$id = mysqli_insert_id($link);

$sql = "DELETE FROM lessons WHERE room = 'БК-1'";
mysqli_query($link, $sql);

// сколько изменено записей:
$count = mysqli_affected_rows($link);

$sql = "SELECT * FROM courses";
$result = mysqli_query($link, $sql);

// сколько записей вернулось:
$row_count = mysqli_num_rows($result);

// сколько полей в вернувшихся записях:
$fields_count = mysqli_num_fields($result);

/*
select * from teacher\G // конец строки в консоли для более удобного вывода информации
*/

/* Основные настройки */
const DB_HOST = "localhost";
const DB_LOGIN = "root";
const DB_PASSWORD = "";
const DB_NAME = "gbook";
$link = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASSWORD, DB_NAME) or die(mysqli_connect_error());

/* Основные настройки */
function clearStr($data) 
{
	global $link;
	$data = trim(strip_tags($data));
	return mysqli_real_escape_string($link, $data);
}

/* Сохранение записи в БД */
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = clearStr($_POST["name"]);
	$email = clearStr($_POST["email"]);
	$msg = clearStr($_POST["msg"]);
	$sql = "INSERT INTO msgs (name, email, msg)
		VALUES ('$name', '$email', '$msg')";
	mysqli_query($link, $sql);
	header("Location: " . $_SERVER["REQUEST_URI"]);
	exit;
}

ob_start(); // в index.php в самое начало

/* Вывод записей из БД */
$sql = "SELECT id, name, email, msg,
			UNIX_TIMESTAMP(datetime) as dt 
			FROM msgs ORDER BY id DESC";
// UNIX_TIMESTAMP - конвертация во временную метку. AS - вернуть как 
$res = mysqli_query($link, $sql);			
echo "<p>Всего записей в гостевой книге:" . 
mysqli_num_rows($res) . "</p>";

while($row = mysqli_fetch_assoc($res)) {
	$dt = date("d-m-Y H:i:s", $row["dt"]);
	$msg = nl2br($row['msg']); // сохранение переносов строки
	echo <<<MSG
	<p>
		<a href="{$row['email']}">{$row['name']}</a>
		{$dt} написал<br>{$msg}
	</p>
	<p align="right">
		<a href="http://mysite.local/index.php?id=gbook&del={$row['id']}">Удалить</a>
	</p>
MSG	
}

/* Удаление записи в БД */
if (isset($_GET["del"]) {
	$id = abs((int)$_GET["del"]); // приводим к числу >= 0
	if ($id) {
		$sql = "DELETE FROM msgs WHERE id = $id";
		mysqli_query($link, $sql);
	}
}


# Опасность SQL-инъекций
// Ввдение в строковые параметры
$sql = "SELECT * FROM news WHERE title LIKE('%search_text%')"; // запрос

$search_text = "')+and+(author_id='1"; // инъекция

$sql = "SELECT * FROM news WHERE title LIKE('%') AND (author_id='1%')"; // результат

// Расщепление запроса
$sql = "SELECT * FROM news WHERE id = $id"; // запрос 

$id = "12; INSERT INTO admin(login, password) VALUES('HaCkEr', '1234')"; // инъекция
abs(int()$id); // приводим к числу

$sql = "SELECT * FROM news WHERE id = 12; 
		INSERT INTO admin(login, password) VALUES('HaCkEr', '1234')"; // результат

// Испольщование UNION
$sql = "SELECT id, title, author, date FROM news WHERE id = $id"; //запрос

$id = "-1 UNION SELECT 1? login, password? 1 FROM admin"; // инъекция

$sql = "SELECT id, title, author, date FROM news WHERE id = -1
		UNION SELECT 1, login? password, 1 FROM admin";		

// Экранирование хвоста запроса
$sql  = "SELECT title, author
		 FROM news WHERE cat = $id AND title LIKE('%search%')"; // запрос

$id = "-1 UNION SELECT login, password FROM admin--"; // инъекция

$sql = "SELECT title, author FROM news WHERE cat = -1
		U/**/NI/**/ON SELECT login, password FROM admin-- // дальше все закомититься
		AND title LIKE('%search%')";

# Выполнение команд на сервере
$sql = "SELECT name FROM user WHERE id = $id"; // запрос

$id = "1+UNION+SELECT+'<?eval($_GET['cmd']);?>'
	   +INTO+OUTFILE+'/www/cmd.php'--"; // инъекция


# Подготовленные запросы:
$sql  = "INSERT INTO users(name, email, age) VALUES(?, ?, ?)";

$stmt = musqli_prepare($link, $sql); // разобрать запрос $sql

musqli_stmt_bind_param($stmt, "ssi", $name, $email, $age); // передаем параметры для запроса

// исполняем подготовленный запрос с переданными данными
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);



/*
Архитектура интернет-магазина (книжный интернет-магазин)
Каталог товаров (таблица catalog)
- id (int? primary key)
- title (string)
- author (string)
- pubyear (int)
- price (int)

Корзина покупателя (массив)
Хранится в cookie по имени "basket"
Инициализируется при первом обращении к приложению.
Первый элемент массива всегда "ordrtid":
уникальный идентификатор заказа.
Индекс последующих элементов - количество товара.
Пример: ["orderid" => 501bbdee1b4d3 => 1, 6 => 1]

Список заказов (таблица orders)
- id(int)
- title (string)
- author (string)
- pubyear(int)
- price(int)
- quantily (int)
- orderid (string)
- datetime (int)

Файл с персональными данными заказчика (ФИО, адрес, телефон) (orders.log)

Структура приложения
eshop.sql - дамп базы данных
inc\config.inc.php - основные настройки сайта

inc\lib.inc.php - библиотека функций сайта

admin\index.php - интерфейс тадминки
admin\add2cat.php - html форма для добавления товаров
admin\save2cat.php php-код обработки html-формы
admin\orders.php - вывод списка заказов в виде HTML-таблицы
admin\secure - папка c файлами для повышения безопасности приложения

catalog.php - вывод списка товаров в виде HTML таблицы
add2backet.php - php-код обработки данных для добавления товара в корзину 


Запускаем командную строку:
// C:\Users\student
cd ..\Public\php-14-07\server\domains\mysite.local\eshop\
musql -uroot
create datebase eshop
quit
musql -uroot eshop < eshop.sql
musql -uroot  
musql -uroot eshop
show tables
*/

// admin/index.php
if(isset($_GET['logout'])){
 logOut();
}

# Файл: config.inc.php
const DB_HOST = "localhost";
const DB_LOGIN = "root";
const DB_PASSWORD = "";
const DB_NAME = "eshop";

const ORDERS_LOG = "orders.log";

$basket = [];
$count = 0;

$link = mysqli_connect(DB_HOST, DB_LOGIN, DB_PASSWORD, DB_NAME);

basketInit();


# Файл: lib.inc.php
fucntion clearStr($data)
{
	global $link;
	$data = trim(strip_tags($data));
	return mysqli_real_escape_string($link, $data);
}

fucntion clearInt($data)
{
	return abs((int)$data);

}

fucntion addItemToCatalog($title, $author, $pubyear, $price)
{
	$sql = 'INSERT INTO catalog (title, author, pubyear, price) 
			VALUES (?, ?, ?, ?)';
	global $link;		
	if(!stmt = mysqli_prepare($link, $sql)) 
		return false;
	musqli_stmt_bind_param($stmt, "ssii", $title, $author, $pubyear, $price); 
	/* Строка содержащая один или более символов, каждый из которых задает тип значения привязываемой переменной: i	переменная имеет тип integer, d	- double, s - string
	b -	является большим двоичным объектом (blob) и будет пересылаться пакетами */
	mysqli_stmt_execute($stmt);
	mysqli_stmt_close($stmt);
	return true;			
}

function selectAllItems() 
{
	global $link; 
	$sql = 'SELECT id, title, author, pubyear, price
			FROM catalog';
	if (!$result = mysqli_query($link, $sql))
		return false;
	$items = mysqli_fetch_all($result, MYSQLI_ASSOC);
	mysqli_free_result($result); // очищает $result
	return $items;			
}

function saveBasket()
{
	global $basket;
	$basket = base64_encode(serialize($basket));
	setcookie('basket', $backet, 0x7FFFFFFFF);
}

function basketInit()
{
	global $basket, $count;
	if(!isset($_COOKIE['basket'])) {
		$basket = ['orderid' => uniqid()]; // возвращает случайную строчку
		saveBasket();
	} else {
		$basket = unserialize(base64_decode($_COOKIE['basket']));
		$count = count($basket) - 1; // количество товара (не берем расчет orderid, поэтому -1)
	}
}

function removeBasket()
{
	setcookie('basket', 'deleted', time() - 3600);
}

function add2Basket($id)
{
	global $basket;
	$basket[$id] = 1;
	saveBasket();
}

function myBasket()
{
	global $link, $basket;
	$goods = array_keys($basket); // возвращает массив ключей
	array_shift($goods);
	if (!$goods) return false;
	$ids = implode(",", $goods);
	$sql = "SELECT id, author, title, pubyear, price
			FROM catalog WHERE id IN ($ids)";
	if(!$result = mysqli_query($link, $sql))
		return false;
	$items = result2Array($result);
	mysqli_free_result($result);
	return $items;
}

function result2Array($data)
{
	global $basket;
	$arr = [];
	while($row = mysqli_fetch_assoc($data)) {
		$row['quantity'] = $basket[$row['id']];
		$arr[] = $row;
	}
	return $arr;
}

function deleteitemFromBasket($id) 
{
	global $basket;
	unset($basket[$id]);
	saveBasket();
}

function saveOrder($datetime)
{
	global $link, $basket;
	$goods = myBasket();
	$stmt = mysqli_stmt_init($link);
	$sql = 'INSERT INTO orders (
								title,
								author,
								pubyear,
								price,
								quantity,
								orderid,
								datetime)
			VALUES(?, ?, ?, ?, ?, ?)';
	if (!mysqli_stmt_prepare($stmt, $sql))
		return false;
	foreach ($goods as $item) {
		mysqli_stmt_bind_param($stmt, "ssiiisi",
					$item['title'], $item['author'],
					$item['pubyear'], $item['price'],
					$item['quantity'], $basket['orderid'],
					$datetime);
		mysqli_stmt_execute($stmt);
	}		
	mysqli_stmt_close($stmt);	
	removeBasket();
	return true;
}

fucntion getOrders() // Возвращает многомерный массив с информацией о всех заказах, включая персональные данные покупателя и список его товаров
{
	global $link;
	if(!is_file(ORDERS_LOG))
		return false;
	/* Получаем в виде массива персональные данные пользователей из файла */
	$orders = file(ORDERS_LOG);
	/* Массив, который будет возвращен функцией */
	$allorders = [];
	foreach ($orders as $order) {
		list($name, $email, $phone, $address, $orderid, $date) = explore("|", $order);
		/* Промежуточный массив для хранения информации о конкретном заказе */
		$orderinfo["name"] = $name;
		$orderinfo["email"] = $email;
		$orderinfo["phone"] = $phone;
		$orderinfo["address"] = $address;
		$orderinfo["orderid"] = $orderid;
		$orderinfo["date"] = $date;
		/* SQL - запрос на выборку из таблицы orders всех товаров для конкретного покупателя */
		$sql = "SELECT title, author, pubyear, price, quantity
				FROM orders
				WHERE orderid = '$orderid' AND datetime = $date";
		/* Получение результата выборки */
		if (!$result = mysqli_query($link, $sql))
			return false;
		$items = mysqli_fetch_all($result, MYSQLI_ASSOC);
		mysqli_free_result($result);
		/* Сохранение результата в промежуточном массиве */
		$orderinfo["goods"] = $items;
		/* Добавление промежуточного массива в вовзращаемый массив */
		$allorders[] = $orderinfo;
	}
	return $allorders;
}



# Файл: save2cat.php
// Подключение библиотек:
require "secure/session.inc.php";
require "../inc/lib.inc.php";
require "../inc/config.inc.php";

$title = clearStr($_POST["title"]);
$author = clearStr($_POST["author"]);
$pubyear = clearInt($_POST["pubyear"]);
$price = clearInt($_POST["price"]);

if(!addItemToCatalog($title, $author, $pubyear, $price)) { 
	echo 'Произошла ошибка при добавлении товара в каталог';
} else {
	header("Location: add2.php");
	exit;
}

/*
Проверяем в командной строке:
select * from catalog\G
*/


# Файл catalog.php:
// Подключение библиотек
require "/inc/lib.inc.php";
require "/inc/config.inc.php";
$goods = selectAllItems();
if(!$goods === false) { echo "ERROR!"; exit; }
if(!count($goods)) { echo "Массив пустой!"; exit; }
?>
<p> Товаров в <a href="basket.php">корзине</a>: <?=$count?></p>
<table border="1" cellpadding="5" cellspacing="0" width="100%">
	<tr>
		<th>Название</th> 
		<th>Автор</th> 
		<th>Год издания</th> 
		<th>Цена, руб</th> 
		<th>В корзину</th> 
	</tr>
<?php
foreach ($goods as $item) { 
?>
	<tr>
		<td><?=$item['title']?></td>
		<td><?=$item['author']?></td>
		<td><?=$item['pubyear']?></td>
		<td><?=$item['price']?></td>
		<td><a href="add2basket.php?id=<?=$item['id']?>">В корзину</td>
	</tr>	
<?php
}
?>
</table>

<?php

# Файл add2basket.php
// Подключение библиотек
require "/inc/lib.inc.php";
require "/inc/config.inc.php";

$id = clearInt($_GET["id"]);
if ($id) {
	add2basket($id);
	header("Location: catalog.php");
	exit;
}

# Файл basket.php
require "inc/lib.inc.php";
require "inc/config.inc.php";
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Корзина пользователя</title>
</head>
<body>
	<h1>Ваша корзина</h1>
<?php
	if(!$count) {
		echo "Корзина пуста! Вернитесь в <a href="catalog.php">каталог</a>";
		exit;
	} else {
		echo "Вернуться в <a href="catalog.php">каталог</a>"
	}
	$goods = myBasket();
?>
<table border="1" cellpadding="5" cellpadding="0" width="100%">		
	<tr>
		<th>№ п/п</th>
		<th>Название</th>
		<th>Автор</th>
		<th>Год издания</th>
		<th>Цена, руб.</th>
		<th>Количество</th>
		<th>Удалить</th>
	</tr>
	<?php
		$i = 1, $sum = 0;
		foreach ($goods as $item) { 
	?>
		<tr>
			<td><?$i++?></td>
			<td><?=$item['title']?></td>
			<td><?=$item['author']?></td>
			<td><?=$item['pubyear']?></td>
			<td><?=$item['price']?></td>
			<td><?=$item['quantity']?></td>
			<td><a href="delete_from_basket.php?id=<?=$item['id']?>">Удалить</a></td>
		</tr>	
	<?php
		$sum += $item['price'] * $item['quantity'];
		}
	?>
</table>

<p>Всего товаров в корзине на сумму: <?=$sum?> руб.</p>

<div align="center">
	<input type="button" value="Оформить заказ!" onclick="location.href='orderform.php'">
</div>


</body>
</html>

<?php

# Файл delete_from_basket.php
require "inc/lib.inc.php";
require "inc/config.inc.php";

$id = clearInt($_GET["id"]);
if ($id) {
	deleteitemFromBasket($id);
	header("Location: basket.php");
}

# Файл saveorder.php
require "inc/lib.inc.php";
require "inc/config.inc.php";

$name = clearStr($_POST["name"]);
$email = clearStr($_POST["email"]);
$phone = clearStr($_POST["phone"]);
$address = clearStr($_POST["adress"]);
$iod = $basket["orderid"];
$dt = time();
$order = "$name|$email|$phone|$address|$oid|$dt\n";
file_put_contents("admin/".ORDERS_LOG, $order, FILE_APPEND);
saveOrder($dt)

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Сохранение данных заказа</title>
</head>
<body>
	<p>Ваш заказ принят</p>
	<p><a href="catalog.php">Вернуться в каталог товаров</a></p>
</body>
</html>	


# Файл orders.php
<html>
<head>
	<title>Поступившие заказы</title>
	<meta charset="ufr-8">
</head>
<body>
<h1>Поступившие заказы:</h1>

<?php
	$orders = getOrders();
	if(!$orders) {
		echo "Заказов нет!";
		exit;
	}
	foreach ($orders as $order):
?>
	<hr>
	<h2>Заказ номер: <?=$order["orderid"]?></h2>
	<p>Заказчик: <?=$order["name"]?></p>
	<p>Email: <?=$order["email"]?></p>
	<p>Телефон: <?=$order["phone"]?></p>
	<p>Адрес доставки: <?=$order["address"]?></p>
	<p>Дата размещения заказа: <?=$order["data"]?></p>

	<h3>Купленные товары</h3>
	<table border="1" cellpadding="5" cellspacin="0" width="90%">
		<tr>
			<th>№ п/п</th>
			<th>Название</th>
			<th>Автор</th>
			<th>Год издания</th>
			<th>Цена, руб.</th>
			<th>Количество</th>
		</tr>	
		<?php
			$i = 1, $sum = 0;
			foreach ($order["goods"] as $item) { 
		?>
			<tr>
				<td><?$i++?></td>
				<td><?=$item['title']?></td>
				<td><?=$item['author']?></td>
				<td><?=$item['pubyear']?></td>
				<td><?=$item['price']?></td>
				<td><?=$item['quantity']?></td>
			</tr>	
		<?php
			$sum += $item['price'] * $item['quantity'];
			}
		?>
	</table>
	<p>Всего товаров на сумму: <?=$sum?>руб.</p>	
<?php
	endforeach;
?>
</body>
</html>

# Файл secure.inc.php
const FILE_NAME = ".htpasswd";
function getHash($password)
{
	$hash = password_hash($password, PASSWORD_BCRYPT); // генерируем хеш пароля
	return $hash;
}

function checkHash($password, $hash) // проверяем пароль
{ 
	return password_verify($password, $hash);
}

function saveUser($login, $hash) // создаем новую запись в файле пользователей
{ 
	$str = "$login:$hash\n";
	if (file_put_contents (FILE_NAME, $str, FILE_APPEND))
		return true;
	else
		return false;
}

function userExists($login) // проверяет наличие пользователя в списке
{
	if(!is_file(FILE_NAME))
		return false;
	$users = file(FILE_NAME);
	foreach($users as $user){
		if(strpos($user, $login.':') !== false)
			return $user;
	}
	return false;
}

function logOut() // завершает сеанс пользователя
{ 
	session_destroy();
	header('Location: secure/login.php');
	exit;
}


# .htaccess для магазина
Options -Indexes
DirectoryIndex catalog.php
AddDefaultCharset utf-8



# Файл create_user.php:
<?
require_once "session.inc.php";
require_once "secure.inc.php";
?>
<!DOCTYPE HTML>
<html>
<head>
	<title>Создание пользователя</title>
	<meta charset="utf-8">
</head>

<body>
<h1>Создание пользователя</h1>
<?
$login = 'root';
$password = '1234';
$result = '';

if ($_SERVER['REQUEST_METHOD']=='POST'){
	$login = $_POST['login'] ?: $login;
	if(!userExists($login)){
		$password = $_POST['password'] ?: $password;
		$hash = getHash($password);
		if(saveUser($login, $hash))
			$result = 'Хеш '. $hash. ' успешно добавлен в файл';
		else
			$result = 'При записи хеша '. $hash. ' произошла ошибка';
	}else{
		$result = "Пользователь $login уже существует. Выберите другое имя.";
	}
}
?>
<h3><?= $result?></h3>
<form action="<?= $_SERVER['PHP_SELF']?>" method="post">
	<div>
		<label for="txtUser">Логин</label>
		<input id="txtUser" type="text" name="login" value="<?= $login?>" style="width:40em"/>
	</div>
	<div>
		<label for="txtString">Пароль</label>
		<input id="txtString" type="text" name="password" value="<?= $password?>" style="width:40em"/>
	</div>
	<div>
		<button type="submit">Создать</button>
	</div>	
</form>
</body>
</html>

# Файл login.php:
session_start();
header("HTTP/1.0 401 Unauthorized");
require_once "secure.inc.php";
if($_SERVER['REQUEST_METHOD']=='POST'){
	$login = trim(strip_tags($_POST["login"]));
	$pw = trim(strip_tags($_POST["pw"]));
	$ref = trim(strip_tags($_GET["ref"]));
	if(!$ref)
		$ref = '/eshop/admin/';
	if($login and $pw) {
		if($result = userExists($login)) {
			list($_, $hash) = explode(':', $result);
			if(checkHash($pw, $hash)) {
				$_SESSION['admin'] = true;
			header("Location: $ref");
			exit;
		} else {
			$title = 'Неправильное имя пользователя или пароль!';
		}
		} else {
			$title = 'Неправильное имя пользователя или пароль!';
		}
		} else {
			$title = 'Заполните все поля формы!';
		}
}

# Файл session.inc.php:
session_start();
if(!isset($_SESSION['admin'])) {
	header('Location: /eshop/admin/secure/login.php?ref='.
	$_SERVER['REQUEST_URI']);
 	exit;
}



# Отправляем email
// Директивы PHP.INI
ini_set("SMTP", "localhost");
ini_set("smtp_port", "25");
ini_set("sendmail_from", "");
$to = "vasya@mail.ru";
$subject = "Проба пера";
$body = "Отправляю письмо Васе";
echo "Письмо отправлено";
if( mail($to, $subject, $body) )
echo "Письмо отправить не удалось";
else
// Используем дополнительные заголовки
$headers = "Content-Type: text/html;charset=utf-8\r\n";
$headers .= "To: Петя <petya@mail.ru>\r\n";
$headers .= "Cc: lena@mail.ru\r\n";
$headers .= "Bcc: sveta@mail.ru\r\n";
$headers .= "From: Федя <fedya@mail.ru>\r\n";
$body = "<h1>Отправляю письмо Васе и Пете</h1>";
mail($to, $subject, $body, $headers);
































/* Чем раньше браузер начнет загружать стили тем лучше. Подключаем после мета-тегов.
<link rel="stylesheet" href="style.css">

Можно дать имя разделы и вынести этот раздел на другой сайт? -> article
Можно дать имя разделу, но вынести на другой сайт не получиться -> section
Не получается дать имя -> div

github.com/yoksel/common-words - типовые имена классов

Изображения:
картинка -  img,image,pic
иконка - icon
логотип - logo
аватар - avatar
Текст:
заголовок - title,subject,heading,headline,caption 
подзаголовок - subtitle
слоган - slogan
*/


var buttons = document.querySelectorAll('.button');
for(var i = 0; i < buttons.length; i++ ) {
	buttons[i].addEventListener('click', function() {
		this.disabled = true;
	});
}

# Раскрывающийся текст
<p>Все холодильники белые</p>
<details>
	<summary>Подробнее<summary>
	<p>Если их не покрасить в черный цвет.</p>
</details>

# Выпадающий список + поиск:
<label>
	Цвет холодильника
	<input list="fridges">
</label>
<datalist id="fridges">
	<option value="Красый">
	<option value="Желтый">
	<option value="Зеленый">
	<option value="Синий">
	<option value="Фиолетовый">
</datalist>


/*Ссылкам добавляем атрибут aria-label для доступности людей с огр. возможностями*/
<a href="https://twitter.com/" aria-label="Твиттер"></a>
<h1 class="visually-hidden">Заголовок</h1>
<label class="visually-hidden" for="user-password">Пароль</label>
<style>
.visually-hidden {
	position: absolute;
	width: 1px;
	height: 1px;
	margin: -1px;
	border: 0;
	padding:0;
	clip: rect(0 0 0 0);
	overflow: hidden;
}
</style>

/*
Псевдоклассы - усиливают обычные теги:
:link
:hover
:active
:focus   a:focus{} ссылки в фокусе
:visited

:root
:first-child
:last-child
:nth-child()   li:nth-child(2n) {} каждый 2 элемент списка


:valid
:invalid
:required   input:required {} обязательные поля ввода
:optional
:checked
:disabled   button:disabled {} отключенные кнопки
:enabled

Псевдоэлементы - создают виртуальные теги:
::after
::before
::first-letter
::first-line
*/

.login-item::before {
	content: "Иконка входа";
}
// =>
<li class="login-item">
	<::before>Иконка входа</::before>
	<a href="/login">Вход</a>
</li>

content: attr(href); // получает содержимое атрибута
width: calc(100% - 100px); // любые расчеты
background-image: linear-gradient(45deg, yellow, green); // линейный градиент

// CSS-директивы
@font-face {}
@media (max-width: 600px) {}

/*
Правила стилизации:
- не задавать глобальные стили для тегов.
- контролировать стили по умолчанию для всех элементов в разметке
Для задания стилей используются только селекторы по классам или каскад
Исключения:
* normalize.css, который исправляет браузерные умолчания (улучшает кроссбраузерность)
Подключаем до style.css:
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/style.css">
* уникальные теги документа: html, body
* дополнительная нормализация: a и img
* общее правило для box-sizing c помощью inherit
*/
body { margin: 0 }
img { max-width: 100% }
a { text-decoration: none }

.feedback { color: black}
.feedback ul { list-style: none }
.feedback p { margin-bottom: 0 }

html { box-sizing: border-box }
*, *:before, *:after { box-sizing: inherit }
?>
