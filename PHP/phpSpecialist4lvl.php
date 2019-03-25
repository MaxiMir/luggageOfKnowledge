<?

################ СТРОГАЯ ТИПИЗАЦИЯ ################
function sum(int ...$nums): int {} // $nums и возвращаемое ф-ей значение приводятся к типу int. Результат
приводится к int

declare(strict_types = 1); // объявление строгой типизации
function sum(int ...$nums): int {} // $nums и возвращаемое ф-ей значение должны быть типа int, иначе fatal error

indiv(10, 3) // => 3 целочисленное деление

################ Шаблоны проектирования ################
/* 
UML - Unifed Modeling Language 
Унифицированный язык моделирования:
- Структурные диаграммы
- Диаграммы поведения
- Диаграммы взаимодействия
Диаграммы:
- классов, объектов
- активности, связей
- компонентов, составных структур
- развертывания, машин состояния
- синхронизации, прецентендов
- обзора, взаимодействий
*/

class A 
{
	function __construct($o)
	{
		$this->o = stdClass();
	}
}

$a = new A(); // композиция

class A 
{
	function __construct($o)
	{
		$this->o = $o;
	}
}
$x = new stdClass();
$a = new A($x); // агрегация - в случае удаления $a, $x - продолжает существовать
/*
Порождающие шаблоны проектирования (возвращают объект):
	Factory Method / Фабричный метод
	Abstract Factory / Абстрактная фабрика
	Singleton / Одиночка
Структурные шаблоны:	
	Adapter / Адаптер
	Decorator / Декоратор
Поведенческие шаблоны (выбирают подходящий алгоритм):
	Observer / Наблюдатель
	Strategy / Стратегия
*/
// Шаблон builder (билдер - порождающий):
class Window
{
	function __constuct($d, $m, $v)
	{
		$this->dialog = $d;
		$this->modal = $m;
		$this->visible = $v;
	}
}
class CreateWindow
{
	function setDialog($flag = false)
	{
		$this->dialog = $flag;
		return $this;
	}
	function setModal($flag = false)
	{
		$this->modal = $flag;
		return $this;
	}
	function setVisible($flag = false)
	{
		$this->visible = $flag;
		return $this;
	}
	function create()
	{
		return new Window($this->dialog, $this->modal, $this->visible);
	}
}
$c = new CreateWindow();
$w = $c->setVisible(true)
	->setDialog(true)
	->create();
// Шаблон singleton:
class Logger
{
	const LOG_NAME = 'control.log';
	static private $instance;
	private function __construct() {}
	private function __clone() {} // псевдоконструктор вызывается при клонировании объекта $copy_of_object = clone $object;
	static function getInstance() 
	{
		if (!self::$instance) { // singleton всегда возвращает один и тот же объект
			self::$instance = new self;
		}
		return self::$instance;
	}
	function log($msg)
	{
		file_put_contents(self::LOG_NAME, "{$msg}\n", FILE_APPEND);
	}
}	
$log = Logger::getInstance();
$log->log('Контрольная точка на строке ' . __LINE__);
// В другом файле:
$conf = Logger::getInstance();
$conf->log('Контрольная точка на строке ' . __LINE__);
// Шаблон factory:
interface Shape
{
	function draw();
}
class Rectangle implements Shape
{
	function draw() 
	{
		echo __METHOD__ . "\n";
	}
}
class Square implements Shape
{
	function draw() 
	{
		echo __METHOD__ . "\n";
	}
}
class Circle implements Shape
{
	function draw() 
	{
		echo __METHOD__ . "\n";
	}
}
class ShapeFactory
{
	function getShape($type)
	{
		$type = strtoupper($type); // какие-либо операции с $type
		switch ($type) {
			case 'R':
				return new Rectangle();
			case 'S':
				return new Square();		
			case 'C':
				return new Circle();		
			default: throw new Exception('Wrong type!');				
		}
	}
}
$f = new ShapeFactory();
$r = $f->getShape('r');
$s = $f->getShape('s');
$c = $f->getShape('c');
$r->draw();
$s->draw();
$c->draw();
// Шаблон strategy:
function foo($a, $b)
{
	if ($a == $b) return 0;
	return $a < $b ? -1 : 1;
}
$a [3, 2, 5, 6, 1];
usort($a, 'foo');
interface Strategy
{
	function doOperation($n1, $n2);
}
class Add implements Strategy
{
	function doOperation($n1, $n2) 
	{
		return $n1 + $n2;
	}
}
class Sub implements Strategy
{
	function doOperation($n1, $n2) 
	{
		return $n1 - $n2;
	}
}
class Mult implements Strategy
{
	function doOperation($n1, $n2) 
	{
		return $n1 * $n2;
	}
}
class Context
{
	private $s;
	function __construct($op)
	{
		switch ($op) {
			case '+': 
				$this->s = new Add();
				break;
			case '-':
				$this->s = new Sub();
				break;		
			case '*':
				$this->s = new Mult();
				break;		
			default: throw new Exception('Wrong type!');				
		}
	}
	function execute($n1, $n2)
	{
		return $this->s->doOperation($n1, $n2);
	}
}
$c = new Context('+');
echo $c->execute(1, 5);
// Шаблон decorator:
interface Shape
{
	function draw();
}
class Rectangle implements Shape
{
	function draw() 
	{
		echo __METHOD__ . "\n";
	}
}
class Square implements Shape
{
	function draw() 
	{
		echo __METHOD__ . "\n";
	}
}
class Circle implements Shape
{
	function draw() 
	{
		echo __METHOD__ . "\n";
	}
}
abstract class ShapeDecorator implements Shape
{
	protected $decorator;
	function __construct(Shape $decoratedShape) 
	{
		$this->decoratedShape = $decoratedShape;
	}
	function draw() 
	{
		$this->decoratedShape->draw();
	}
}
class RedShapeDecorator exdends ShapeDecorator
{
	function __construct(Shape $decoratedShape)
	{
		parent::__construct($decoratedShape);
	}
	private function setRedBorder()
	{
		echo 'border color red';
	}
	function draw()
	{
		$this->decoratedShape->draw();
		$this->setRedBorder();
	}
}
$c = new Circle;
$rc = new RedShapeDecorator(new Circle);
$c->draw();
$rc->draw();
// Шаблон Adapter: 
interface MediaPlayer
{
	function play($type, $name);
}
interface SuperMediaPlayer
{
	function playOgg($name);
	function playMP4($name);
}
class OggPlayer implements SuperMediaPlayer
{
	function playOgg($name)
	{
		echo "Playing OGG {$name}";
	}
	function playMP4($name){}
}
class Mp4Player implements SuperMediaPlayer
{
	function playMP4($name)
	{
		echo "Playing OGG {$name}";
	}
	function playOgg($name){}
}
class MediaAdapter implements MediaPlayer // adapter
{
	private $superMediaPlayer;
	function __contruct ($type)
	{
		switch ($type) {
			case 'OGG':
				$this->superMediaPlayer = new OggPlayer;
				break;
			case 'MP4':
				$this->superMediaPlayer = new Mp4Player;
				break;
		}		
	}
	function play($t, $n)
	{
		switch ($t) {
			case 'OGG':
				$this->superMediaPlayer->playOgg($n);
				break;
			case 'MP4':
				$this->superMediaPlayer->playMP4($n);
				break;
		}
	}
}
class AudioPlayer implements MediaPlayer
{
	private $mediaAdapter
	function play($t, $n)
	{
		switch ($t) {
			case 'WAV':
				echo "Playing WAV {$n}";
				break;
			case 'MP3':
				echo "Playing MP3 {$n}";
				break;
			case 'OGG':	
			case 'MP4': 	
				$this->mediaAdapter = new MediaAdapter($t);
				$this->mediaAdapter->play($t, $n);
		}
	}
}
$p = new AudioPlayer;
$p->play('WAV', 'Song1');
$p->play('MP3', 'Song2');
$p->play('OGG', 'Song3');
$p->play('MP4', 'Song4');
################ Класс Closure ################
// Обращение к функции через переменную:
function sayHi($name)
{
	echo "Hi {$name}";
}
$func = "sayHi";
$func('Jorn');
// Анонимная функция:
$sayHi = function ($name) { // анонимная функция - экземляр класса Closure
	echo "Hi {$name}";
};
$sayHi('Jorn');
// Стандартный вариант:
$arr = [1, 2, 3, 4, 5];
function doubleValue($v)
{
	return $v * 2;
}
$new_arr = array_map(doubleValue, $arr);
// Хак (до анонимных функций):
$new_arr = array_map(create_function('$v', '$v * 10;'), $arr);
// Самый удобный вариант:
$new_arr = array_map(function ($v) { return $v * 2 }, $arr);
// Closure (замыкание):
$string = 'Hello, world';
$closure = function () use ($string) {
	echo $string;
}
$closure();
$mult = function ($num) {
	return function ($x) use ($num) {
		return $x * $num;
	};	
}
$mult_by_2 = $mult(2);
$mult_by_3 = $mult(3);
echo $mult_by_2(2); // => 4
echo $mult_by_2(5); // => 10
echo $mult_by_3(2); // => 6
echo $mult_by_3(5); // => 15
// Использование в классах:
class User 
{
	private $name;
	function __construct($name)
	{
		$this->name = $name;
	}
	function greet ($greeting)
	{
		return function () use ($greeting) {
			return "$greeting {$this->name}";
		}
	}
}
$user = new User('John');
$en = $user->greet('Hi');
echo $en; // => 'Hi John'
################ Интерфейс Iterator ################
Iterator extends Traversable
mixed current (void)
scalar key (void)
void next (void)
void rewind (void)
boolean valid (void)
class MyIterator implements Iterator // описываем логику перебора
{
	private $var = [];
	public function __construct($array)
	{
		if (is_array($array)) {
			$this->var = $array;
		}
	}
	public function rewind()
	{
		echo "rewinding\n";
		reset($this->var);
	}
	public function current()
	{
		$var = current($this->var);
		echo "current: {$var}\n";
		return $var;
	}
	public function key()
	{
		$var = key($this->var);
		echo "key: {$var}\n";
		return $var;
	}
	public function next()
	{
		$var = next($this->var);
		echo "next: {$var}\n";
		return $var;
	}
	public function valid()
	{
		$var = $this->current !== false;
		echo "valid: {$var}\n";
		return $var;
	}
}
$values = [1, 2, 3];
$it = new MyIterator($values);
foreach ($it as $key => $value) {
	print "{$key}: {$value}\n";
}
################ Интерфейс IteratorAggregate ################
IteratorAggregate extends Traversable
public Traversable getIterator (void)
class MyIterator implements Iterator
{
	private $var = [];
	private $count = 0;
	public function __construct(array $array)
	{
		$this->var = $array;
		$this->count = count($array);
	}
	public function rewind()
	{
		reset($this->var);
	}
	public function current()
	{
		$this->count--;
		return date('d-m-Y', current($this->var));
	}
	public function key()
	{
		return key($this->var);
	}
	public function next()
	{
		return next($this->var);
	}
	public function valid()
	{
		return $this->count !== 0;
	}
}
class MySchedule implements IteratorAggregate
{
	private $items = [];
	public function getIterator() // должен вернуть объект реализующий итератор
	{
		asort($this->items);
		return new MyIterator($this->items);
	}
	public function add($key, $value)
	{
		$this->items[$key] = $value;
	}
}
$schedule = new MySchedule();
$schedule->add('PHP', mktime(0, 0, 0, 3, 20, 2018));
$schedule->add('HTML', mktime(0, 0, 0, 2, 20, 2018));
$schedule->add('XML', mktime(0, 0, 0, 2, 12, 2018));
$schedule->add('AJAX', mktime(0, 0, 0, 4, 16, 2018));
foreach ($schedule as $key => $value) {
	print "{$key}: {$value}\n";
}
// Возведение в квадрат:
class NumberSquared implements Iterator
{
	private $cur;
	private $obj;
	function __constructor($obj)
	{
		$this->obj = $obj;
	}
	public function rewind()
	{
		$this->cur = $this->obj->getStart();
	}
	public function key()
	{
		return $this->cur;
	}
	public function current()
	{
		return pow($this->cur, 2);
	}
	public function next()
	{
		$this->cur++;
	}
	public function valid()
	{
		return $this->cur <= $this->obj->getEnd();		
	}
}
class NumberSquared implements Iterator
{
	// <->
	public function current()
	{
		return sqrt($this->cur);
	}
	// <->
}
class MathIterator implements IteratorAggregate 
{
	public $start; 
	public $end;
	public $action;
	public function __construct($start, $end, $action)
	{
		$this->start = $start;
		$this->end = $end;
		$this->action = $action;
	}
	public function getStart()
	{
		return $this->start;
	}
	public function getEnd()
	{
		return $this->end;
	}
	public function getIterator()
	{
		switch ($this->action) {
			case 'pow':
				return new NumberSquared($this); 
			case 'sqrt':
				return new NumberSquareRoot($this); 				
		}
	}
}
$obj = new MathIterator(3, 7, 'pow');
foreach ($obj as $key => $value) {
	print "Квадрат числа {$key} = {$value}<br>";
}
$obj = new MathIterator(3, 7, 'sqrt');
foreach ($obj as $key => $value) {
	print "Квадратный корень числа {$key} = {$value}<br>";
}
/* pow => 
Квадрат числа 3 = 9
Квадрат числа 4 = 16
Квадрат числа 5 = 25
Квадрат числа 6 = 36
Квадрат числа 7 = 49
*/
################ Интерфейс ArrayAccess ################
ArrayAccess // позволяет обращаться с объектом как с массивом
boolean offsetExists (mixed $offset)
mixed offsetGet (mixed $offset)
void offsetSet (mixed $offset, mixed $value)
void offsetUnset (mixed $offset)
class Registry implements ArrayAccess
{
	private $props = [];
	public function offsetSet($name, $value)
	{
		$this->props[$name] = $value;
		return true;
	}
	public function offsetExists($name)
	{
		return isset($this->props[$name]);
	}
	public function offsetUnset($name)
	{
		unset($this->props[$name]);
		return true;
	}
	public function offsetGet($name) 
	{
		if (!isset($this->props[$name])) {
			return null;
		}
		return $this->props[$offset];
	}
}
$obj = new Registry();
$obj['login'] = 'root';
$obj['password'] = '1234';
if (isset($obj['login']))
	echo $obj['login'] . ":" . $obj['password'];
unset($obj['password']);
################ Перегрузка сериализации ################
Serialize
string serialize (void)
void unserialize (string $serialized)
class MyData implements Serializable
{
	public $data;
	public function __construct()
	{
		$this->data = 'Some Data';
	}
	public function getData()
	{
		return $this->data;
	}
	public function serialize()
	{
		return serialize($this->data);
	}
	public function unserialize($data)
	{
		$this->data = unserialize($data);
	}
}
class A 
{
	private $varA;
	public function __construct()
	{
		$this->varA = 'A';
	}
	public function getA()
	{
		return $this->varA;
	}
}
class B exdends A 
{
	private $varB;
	public function __construct()
	{
		parent::__construct();
		$this->varB = 'B'
	}
	public function __sleep()
	{
		return ['varB', 'varA'];
	}
}
$obj = new B();
$serialized = serialize($obj); // перед запуском запустит __sleep() и созранит указанные свойства
echo "{$serialized}\n";
$restored = unserialize($serialized);
echo $restored->getA();
// Notice т.к. private $varA, а сериализуем объект класса B
// Решение:
class A implements Serializable
{
	private $varA;
	public function __construct()
	{
		$this->varA = 'A';
	}
	public function serialize()
	{
		return serialize($this->varA);
	}
	public function unserialize($serialized)
	{
		$this->varA = unserialize($serialized);
	}
	public function getA()
	{
		return $this->varA;
	}	
}
class B exdends A 
{
	private $varB;
	public function __construct()
	{
		parent::__construct();
		$this->varB = 'B'
	}
	public function serialize()
	{
		$aSerialized = parent::serialize();
		return serialize([$this->varB, $aSerialized]);
	}	
	public function unserialize($serialized)
	{
		$temp = unserialize($serialized);
		$this->varB = $temp[0];
		parent::unserialize($temp[1]);
	}
}
$obj = new B();
$serialized = serialize($obj); // перед запуском запустит __sleep() и созранит указанные свойства
echo "{$serialized}\n";
$restored = unserialize($serialized);
echo $restored->getA();
################ Класс Generator ################
function numbers()
{
	echo "START\n";
	
	for ($i = 0; $i < 5: ++$i) { 
		yield $i; // yield - передает значение в ** и возвращается обратно
	}
	echo "FINISH\n";
}
foreach (numbers() as $value) { // вместо numbers() приходит объект класса Generator, который в свою очередь реализует интерфейс Iterator
	echo "VALUE: $value\n"; // **
}
/*
При больших масштабах перебора — генераторы быстрее. Примерно в 4 раза быстрее чем итераторы и на 40% быстрее обычного перебора. При небольшом количестве элементов могут быть медленнее обычного перебора, но все еще быстрее итераторов.
START
VALUE: 0
VALUE: 1
VALUE: 2
VALUE: 3
VALUE: 4
FINISH
*/
// Возврат ключей:
function gen()
{
	yield 'a';
	yield 'b';
	yield 'name' => 'John';
	yield 10 => 'e';
}
foreach (gen() as $key => $value) {
	echo "{$key} : {$value}\n";
}
// Принимаем значение:
function printLogger()
{
	while(true) {
		echo 'Log ' . yield . '<br>';
	}
}
$logger = printLogger();
$logger->send('Foo'); // метод генератора
$logger->send('Bar');
/*
Log Foo
Log Bar
*/
// Комбинируем возврат и приём значений:
function numbers()
{
	$i = 0;
	while (true) {
		$cmd (yield $i);
		++$i;
		if ($cmd == 'stop') {
			return; // Выход из цикла
		}
	}
}
$gen = numbers();
foreach($gen as $v) {
	if ($v == 3) {
		$gen->send('stop');
	}
	echo $v;
}
// Чтение данных файла с помощью генератора:
function getLines($file) {
	$f = fopen($file, 'r');
	if (!$f) throw new Exception();
	while ($line = fgets($f)) {          
	  yield $line;
	}
	fclose($f);
}
foreach (getLines("someFile.txt") as $line) {
	echo "{$line}\n";
}
<?
/*
SPL PHP Library - стандартная библиотека PHP - коллекция класов и интерфейсов для решения стандартных проблем в PHP c версии 5.3.
Обрабока файлов:
SplFileInfo
SplFileObject
*/
#################### Создание итератора из массива ####################
ArrayIterator implements Iteratorm, Traversable, ArrayAccess, SeekableIterator, Countable, Serializable
	
$it = new ArrayIterator ([3, 2, 1]);
foreach ($it as $value) {
	echo $value . " "; // 3 2 1
}
$it->rewind();
$it->asort();
foreach ($it as $value) {
	echo "{$value} "; // 1 2 3
}
// Получаем массив из итератора:
$array = iterator_to_array($it);
// Пример:
$array = ['Вася', 'Петя', 'Иван', 'Маша'];
try {
	$object = new ArrayIterator($array);
	foreach ($object as $key => $value) {
		echo "{$key} => {$value}\n";
	}
} catch (Exception $e){
	echo $e->getMessage();
}
print_r((array) $object);
#################### Рекурсивный итератор ####################
RecursiveArrayIterator extends ArrayIterator implements RecursiveIterator, Traversable, Iterator
	
RecursiveIteratorIterator implements OuterIterator, Traversable, Iterator
	
	
$arr = [1, [2, [3]], [4]];
$rit = new RecursiveArrayIterator($arr);
$rii = new RecursiveIteratorIterator($rit);
foreach ($rii as $key => $value) {
	$depth = $rit->getDepth(); // уровень вложенности
	echo "depth=$depth key=$key value=$value\n";
}
/*
depth=0 key=0 value=1
depth=1 key=0 value=2
depth=2 key=0 value=3
depth=1 key=0 value=4
*/
$menu = [
	'Homepage',
	'Register',
	'About' => ['The Team', 'Our Story'],
	'Contact' => ['Locations', 'Support']
];
// Наследуем RecursiveIteratorIterator
class MyMenu extends RecursiveIteratorIterator
{
	public function beginChildren()
	{
		echo "<ul>\n";
	}
	
	public function endChildren()
	{
		echo "</ul></li>\n">;
	}
}
// Рекурсивная итерация
$rit = new MyMenu (new RecursiveArrayIterator($menu), RecursiveIteratorIterator::SELF_FIRST);
echo "<ul>\n";
foreach ($rit as $key => $value) {
	if ($rit->hasChildren()) {
		echo "<li>{$key}\n";
		continue;
	}
	echo "<li>{$value}\n";
}
echo "</ul>\n";
#################### Фильтрация элементов ####################
FilerIterator extends IteratorIterator implements OuterIterator, Traversable, Iterator
class MyClass extends FilterIterator
{
	public function accept()
	{
		return $this->getInnerIterator()->current() > 5;
	}
}
$arr = [5, 2, 7, 9, 3, 6, 8];
$it = new ArrayIterator($arr);
$fit = new MyClass($it);
foreach ($fit as $value) {
	echo "$value "; // 7 9 6 8
}
#################### Ограничение итераций ####################
LimitIterator extends IteratorIterator implements OuterIterator, Traversable, Iterator
$arr = [1, 2, 3, 4, 5, 6, 7, 8];
$it = new LimitIterator($arr, 2, 4); // со 2 позиции 4 элемента
foreach ($it as $value) {
	echo "{$value} "; // 3 4 5 6
}
#################### Бесконечная итерация с объединением итераторов ####################
AppendIterator extends IteratorIterator implements OuterIterator, Traversable, Iterator
	
class MyObject 
{
	public function action ()
	{
		// что-то делаем
		return $boolean;
	}
}
$object1 = new MyObject();
$object2 = new MyObject();
$arrayIterator1 = new ArrayIterator ([$object1, $object2]);
$object3 = new MyObject();
$object4 = new MyObject();
$arrayIterator2 = new ArrayIterator ([$object3, $object4]);
// Объединение итераторов
$arrayIterator = new AppendIterator();
$arrayIterator->append($arryIterator1);
$arrayIterator->append($arryIterator2);
// Бесконечная итерация 
$it = new InfiniteIterator($arrayIterator);
foreach ($it as $object)
{
	$r = $object->action();
	if (!$r) break;
}
#################### Работа с файлами ####################
SplFileInfo
SplFileObject extends SplFileInfo implements RecursiveIterator, Traversable, Iterator, SeekableIterator
	
$fileInfo = new SPLFileInfo('data.txt');
$fileProps = [];
$fileProps['filename'] = $fileInfo->getFilename();
$fileProps['pathname'] = $fileInfo->getPathname();
$fileProps['size'] = $fileInfo->getSize();
$fileProps['mtime'] = $fileInfo->getMTime();
$fileProps['type'] = $fileInfo->getType();
$fileProps['isWritable'] = $fileInfo->isWritable();
$fileProps['isReadable'] = $fileInfo->isReadable();
$fileProps['isExecutable'] = $fileInfo->isExecutable();
$fileProps['isFile'] = $fileInfo->isFile();
$fileProps['isDir'] = $fileInfo->isDir();
var_export($fileProps);
// Чтение файла 1 вариант:
$file = new SplFileObject('data.txt');
foreach ($file as $line) {
    echo "{$line}\n";
}
// Чтение файла 2 вариант:
$file->rewind();
while ($file->valid()) {
    echo $file->current(). "\n";
    $file->next();
}
// Чтение файла 3 вариант:
$file->seek(3);
echo $file->current();
// Пример чтение csv файла:
$file = new SplFileObject('data.csv');
while ($array = $file->fgetcsv()) {
    var_export($array);
}
#################### Работа с директориями ####################
DirectoryIterator extends SplFileInfo implements RecursiveIterator, Traversable, Iterator, SeekableIterator
// Итерация директорий:
foreach (new DirectoryIterator(.) as $fileInfo) {
    echo $fileInfo->getFileName() . "\n";
}
FilesystemIterator extends DirectoryIterator implements SeekableIterator
RecursiveDirectoryIterator extends FilesystemIterator implements SeekableIterator, RecursiveIterator
// Рекурсивная итерация директорий:
function callback ($objectName)
{
    if ($objectName->isDir()) {
        echo "[{$objectName}]\n";
    } else {
        echo "{$objectName}\n";
    }
}
$rdi = new RecursiveDirectoryIterator('.');
$rii = new RecursiveIteratorIterator($rdi);
array_map('callback', iterator_to_array($rii));
RecursuveTreeIterator extends RecursiveIteratorIterator implements OutherIterator
// Строим дерево:
$rdi = new RecursiveDirectoryIterator('.');
$tree = new RecursiveTreeIterator($rdi);
$tree->setPrefixPart(RecursiveTreeIterator::PREFIX_LEFT, '//');
$tree->setPrefixPart(RecursiveTreeIterator::PREFIX_MID_HAS_NEXT, ':');
#################### Массив как объект ####################
ArrayObject implements IteratorAggregate, ArrayAccess, Traversable, Iterator, Countable
$usersArr = [
	'Вася', 'Петя', 'Иван', 'Маша', 'Джон'
];
$usersObj = new ArrayObject($usersArr);
// Добавляем новое значение:
$usersObj->append('Ира');
// Получаем копию массива:
$usersArrCopy = $usersObj->getArrayCopy();
// Проверяем существует ли пятый элемент массива
if ($usersObj->offsetExists(4)) {
	$usersObj->offsetSet(4, 'Игорь');
}
#################### Структура Данных: Хранилище ####################
SplObjectStorage implements ArrayAccess, Serializable, Traversable, Iterator, Countable
$storage = new SplObjectStorage();
$object1 = (object) ['param' => 'name'];
$object2 = (object) ['param' => 'numbers'];
$storage[$object1] = 'Jorn'; // ключ выступает в качестве объекта
$storage[$object2] = [1, 2, 3];
foreach ($storage as $i => $key) {
	echo "Item {$i}:\n";
	var_dump($key, $storage[$key]);
	echo "\n"
}
// Пример:
class Course 
{
	private $name;
	
	public function __construct($name)
	{
		$this->name = $name;
	}
	public function __toString()
	{
		return strtoupper($this->name);
	}
}
$courses = new SplObjectStorage();
$php = new Course('php');
$xml = new Course('xml');
$java = new Course('java');
$courses->attach($php); // добавление
$courses->attach($java);
var_dump($courses->contains($php)); // проверяет на содержание объекта
var_dump($courses->contains($xml)); // => false
var_dump($courses->contains($java)); // => true
$courses->detach($java); // извлечение объекта
foreach ($courses as $course) {
	$titles[] = (string) $course;	
}
echo join(', ', $titles);
#################### Структура Данных: Стек ####################
SplDoublyLinkedList implements Iterator, Countable, ArrayAccess
SplStack extends SplDoublyLinkedList
$stack = new SplStack();
$stack->push('Jorn');
$stack->push('Mike');
$stack->pop(); // Mike
$stack->pop(); // Jorn
$stack->push('Jorn');
$stack->push('Mike');
$stack->top(); // Mike
$stack->pop(); // Mike
$stack->bottom(); // John
$stack->pop(); // John
#################### Структура Данных: Очередь ####################
SplDoublyLinkedList implements Iterator, Countable, ArrayAccess
SplQueue extends SplDoublyLinkedList
// Первый элемент зашел, первый 1 выходит
class Work
{
	public function __construct($title)
	{
		$this->title = $title;
	}
	public function doIt()
	{
		return $this->title;
	}
}
$work1 = new Work('Сходить в магазин');
$work1 = new Work('Прочитать книгу');
$work1 = new Work('Тупить в телевизор');
$queue = new SplQueue();
$queue->enqueue($work1); // добавление в очередь
$queue->enqueue($work2);
$queue->enqueue($work3);
while($queue->count() > 0) {
	echo $queue->dequeue()->doIt(); // извлечение из очереди
}
#################### Структура Данных: Куча ####################
SplHeap implements Iterator, Countable
SplMinHeap extends SplHeap implements Iterator, Countable
SplMaxHeap extends SplHeap implements Iterator, Countable
$minHeap = new SplMinHeap();
$minHeap->insert(2);
$minHeap->insert(3);
$minHeap->insert(1);
foreach($minHeap as $value) {
	echo "{$value} "; // 1 2 3
}
$maxHeap = new SplMaxHeap();
$minHeap->insert(2);
$minHeap->insert(3);
$minHeap->insert(1);
foreach($minHeap as $value) {
	echo "{$value} "; // 3 2 1
}
// Пример:
class Course
{
	private $name;
	public function __construct($name)
	{
		$this->name = $name;
	}
	public function __toString()
	{
		return strtolower($this->name);
	}
	public function getName()
	{
		return $this->name;
	}
}
$php = new Course('PHP');
$js = new Course('Javascript');
$xml = new Course('XML');
$java = new Course('JAVA');
class CoursesHeap extends SplHeap
{
	public function compare (Course $courseA, Course $courseB)
	{
		return strcmp((string) $courseB, (string) $courseA);
	}
}
$coursesHeap = new CoursesHeap();
$coursesHeap->insert($php);
$coursesHeap->insert($xml);
$coursesHeap->insert($js);
$coursesHeap->insert($java);
foreach($coursesHeap as $course) {
	print $course->getName() . "\n";
}
#################### Массив фиксированной длины ####################
SplFixedArray implements Iterator, ArrayAccess, Countable
// Создаем псевдо-массив:
$splArray = new SplFixedArray(5);
$splArray[1] = 2;
$splArray[4] = 'foo';
$splArray[5] = 'bar'; // Ошибка!
echo $array->getSize(); // 5
// Увеличиваем псевдо-массив:
$array->setSize(10);
#1
$start = memory_get_usage();
$array = range(1, 100000); // приблизительно 8,5Mb выделенной памяти
echo memory_get_usage() - $start, ' bytes';
#2
$start = memory_get_usage();
$array = new SplFixedArray(100000);
for ($i = 0; $i < 100000; ++$i) { // ++$i быстрее $i++
	$array[$i] = $i; // приблизительно 3,6Mb выделенной ыпамяти
}
echo memory_get_usage() - $start, ' bytes';
#################### Автозагрузка классов ####################
// Через функцию:
function loadClass()
{
	require_once "classes/{$class_name}.class.php";	
}
// Через статический метод:
class Main
{
	public static function autoload()
	{
		require_once "classes/{$class_name}.class.php";
	}
}
// Регистрация функций:
spl_autoload_register('loadClass');
// Список зарегистрированных функций:
var_dump(spl_autoload_functions());
// Удаление функции из списка зарегистрированных:
spl_autoload_unregister('loadClass');
// Регистрация статического метода класса:
spl_autoload_register(['Main', 'autoload']);
<?
#################### PDO ####################
$sql = "SELECT id, name, email FROM users";
$pdo = new PDO("sqlite: users.db");
// Приведение результата к объекту:
$stmt = $pdo->query($sql);
$obj = $stmt->fetch(PDO::FETCH_OBJ); // для каждой извлеченной строки создаётся анонимный объект (возвращает экземпляр stdClass)
echo $obj->id . "\n";
echo $obj->name . "\n";
echo $obj->email . "\n";
// Леновое приведение:
$stmt = $pdo->query($sql);
$obj = $stmt->fetch(PDO::FETCH_LAZY); // обращаться к резульатут можно как угодно
echo $obj[0] . "\n";
echo $obj['name'] . "\n";
echo $obj->email . "\n";
/*
Таблица users с полями: id, name, email
1. First, first@mail.ru
2. Second, second@mail.ru
*/
// Поиск названия класса в значении первого поля в выборке:
$sql = "SELECT id, name FROM users";
$stmt = $pdo->query($sql);
$obj1 = $stmt->fetch(PDO::FETCH_CLASS|PDO::FETCH_CLASSTYPE); // создать объект экземляр класса stdClass, чье имя находится в 1 поле (здесь id, но оно числовое)
$obj2 = $stmt->fetch(PDO::FETCH_CLASS|PDO::FETCH_CLASSTYPE); 
/* Результат:
stdClass Object ([name] => First [email] => first@email)
stdClass Object ([name] => Second [email] => second@email)
*/
class First
{
	public $id, $name, $email;
}
$sql = "SELECT name, email FROM users";
$stmt = $pdo->query($sql);
$obj = $stmt->fetch(PDO::FETCH_CLASS|PDO::FETCH_CLASSTYPE);
$obj = $stmt->fetch(PDO::FETCH_CLASS|PDO::FETCH_CLASSTYPE);
/* Результат:
First Object ([id] => NULL [name] => NULL [email] => first@email)
StdClass Object ([email] => second@email)
*/
class Second
{
	public $id, $name, $email; 
}
$sql = "SELECT name, email FROM users";
$stmt = $pdo->query($sql);
$obj = $stmt->fetch(PDO::FETCH_CLASS|PDO::FETCH_CLASSTYPE);
$obj = $stmt->fetch(PDO::FETCH_CLASS|PDO::FETCH_CLASSTYPE);
/* Результат:
First Object ([id] => 1 [name] => NULL [email] => first@email)
Second Object ([id] => 2 [name] => NULL [email] => second@email)
*/
$sql = "SELECT id, name, email FROM users";
$stmt = $pdo->query($sql);
$obj = $stmt->fetchObject();
/* Результат:
stdClass Object ([id] => 1 [name] => First [email] => first@email)
stdClass Object ([id] => 2 [name] => Second [email] => second@email)
*/
// Явное указание названия класса для создания объекта
// По умолчанию stdClass
class User
{
	public $id, $name, $email; 
}
$sql = "SELECT id, name, email FROM users";
$stmt = $pdo->query($sql);
$obj = $stmt->fetchObject('User');
/* Результат:
User Object ([id] => 1 [name] => First [email] => first@email)
User Object ([id] => 2 [name] => Second [email] => second@email)
*/
// Явное указание имеющегося класса:
$user = new User();
$stmt->setFetchMode(PDO::FETCH_INTO, $user);
$obj1 = $stmt->fetch(PDO::FETCH_ASSOC); // $obj1 = $user
$obj2 = $stmt->fetch(PDO::FETCH_ASSOC); // $obj1 = $user
/* 
Результат  используется один и тот же объект!
После извлечения последней записи в объекте будет (перезаписано):
User Object ([id] => 2 [name] => Second [email] => second@mail.ru)
*/
// Явное указание класса User для создания объекта:
$stmt->setFetchMode(PDO::FETCH_CLASS, 'User');
// Явное указание класса User для создания объекта
// Свойства заполяются значениями после отработки конструктора
$stmt->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'User');
// Полная выборка:
class User
{
	public $id, $name, $email; 	
}
// Получаем массив объектов класса User
$arr = $stmt->fetchAll(PDO::FETCH_CLASS, 'USER');
$sql = 'SELECT city, name FROM users';
$stmt = $pdo->query($sql);
// Выбираем данные только из первого поля:
$arr = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
// Группируем значения второго полня по значению первого поля:
$arr = $stmt->fetchAll(PDO::FETCH_COLUMN|PDO::FETCH_GRUP);
// Выбираем уникальные значения из первого поля
$arr = $stmt->fetchAll(PDO::FETCH_COLUMN|PDO::FETCH_UNIQUE);
// Испольщуем функцию обратного вызова:
function foo ($name, $email)
{
	return $name . ':' . $email . '\n';
}
// Подготовленные запросы:
$sql = "SELECT email FROM users WHERE id = :id AND name := name";
$stmt = $pdo->prepare($sql);
$stmt->execute([':id' => 5, ':name' => 'Jorn']);
$john = $stmt->fetchAll();
// Неименнованные псевдопеременные:
$sql = "SELECT email FROM users WHERE id = ? AND name := ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([5, 'Jorn']);
$john = $stmt->fetchAll();
// Привязка параметров:
$id = 5;
$name = 'John';
// Для именнованных переменных:
$sql = "SELECT email FROM users WHERE id = :id AND name = :name";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':id', $id, PDO::PARAM_INT);
$stmt->bindValue(':name', $name, PDO::PARAM_STR);
$stmt->execute();
// Для неименнованных псевдопеременных:
$sql = "SELECT email FROM users WHERE id = ? AND name := ?";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(1, $id, PDO::PARAM_INT);
$stmt->bindValue(2, $name, PDO::PARAM_STR);
$stmt->execute();
// Использование хранимых процедур:
$id = 5;
$name = 'John';
$stmt = $db->prepare('CALL getEmail(?,?,?)');
// Параметр IN:
$stmt->bindPara(1, $id, PDO::PARAM_INT);
// Параметр INOUT:
$stmt->bindParam(2, $name, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT);
// Параметр OUT:
$stmt->bindParam(3, $email, PDO::PARAM_STR);
$stmt->execute();
// Использование транзакций:
try {
	$pdo->beginTransaction();
	// Исполняем много запросов
	// Если все запросы исполнены успешно, то фиксируем это
	$pdo->commit();
} catch (PDOException $e) {
	// Если хотя бы в одном запросе произошла ошибка, откатываем все назад
	$pdo->rollBack();
}
#################### Класс ReflectionFunction ####################
// Класс ReflectionFunction сообщает информацию о функциях.
function sayHello($name, $h)
{
	static $count = 0;
	return "<h{$h}>Hello, {$name}</h$h>";
}
// Обзор функции:
ReflectionFunction::export(mew ReflectionFunction('sayHello'));
// Вывод основной информации:
$func = new ReflectionFunction('sayHello');
printf(
	"<p>===> %s функция '%s'\n".
	"	объявлена в %s\n".
	"	строки с %d по %d\n",
	$func->isInternal() ? 'Internal' : 'User-defined',
	$func->getName(),
	$func->getFileName(),
	$func->getSmartLine(),
	$func->getEndLine()
);
// Вывод статических переменных, если они есть:
if ($statics = $func->getStaticVariables()) {
	printf("<p>---> Статическая переменная: %s\n",
	var_export($statics, 1));
}
// Вызов функции:
prinf("<p>---> Результат вызова: ");
$result = $func->invoke('John', '1');
echo $result;
function foo1($a, $b, $c) {}
function foo2(Exception $a, &$b, $c) {}
function foo3(ReflectionFunction $a, $b = 1, $c = null) {}
function foo4() {}
// Создание экземпляра класса ReflectionFunction:
$reflect = new ReflectionFunction('foo1');
echo $reflect;
foreach($reflect->getParameters() as $i => $param) {
	printf(
		"--Параметр #%d: %s{\n".
		"	Допуск NULL: %s\n".
		"	Передан по ссылке: %s\n".
		"	Обязательный?: %s\n".
		"}\n",
		$i,
		$param->getName(),
		var_export($param->allowsNull(), 1),
		var_export($param->isPassedByReference(), 1),
		$param->isOptional() ? 'нет' : 'да'
	);
}
abstract class MyClass
{
	public $a = 1;
	protected $b = 2;
	private $c = 3;
	public static $cnt = 0;
	const HANDS = 2;
	abstract function foo();
	
	public static function bar()
	{
		// что делаем
	}
	public function sayHello($name, $h = '1')
	{
		static $count = 1;
		return "<h$h>Hello, $name</h$h>";
	}
}
// Обзор пользовательского класса:
Reflection::export(new ReflectionClass('MyClass'));
// Обзор встроенного класса:
Reflection::export(new ReflectionClass('Exception'));
interface MyInterface{}
class Object{}
class Counter extends Object implements MyInterface
{
	const START = 0;
	private static $c = Counter::START;
	public function count()
	{
		return self::$c++;
	}
}
// Создание экземпляра класса ReflectionClass:
$class = new ReflectionClass('Counter');
printf(
	"===> %s%s%s %s '%s' [экземпляр класса %s]\n".
	"	объявлен в %s\n".
	"	строки с %d по %d\n",
	$class->isInternal() ? 'Встроенный' : 'Пользовательский',
	$class->isAbstract() ? 'абстракт' : '',
	$class->isFinal() ? 'финальный' : '',
	$class->isInterface() ? 'интерфейс' : 'класс',
	$class->getName(),
	var_export($class->getParentClass(), 1),
	$class->getFilename(),
	$class->getStartLine(),
	$class->getEndline()
);
// Вывод тех интерфейсов, которые реализует этот класс:
printf("---> Интерфейсы:\n %s\n", var_export($class->getInterfaces(), 1));
// Вывод констант класса:
printf("---> Константы: %s\n", var_export($class->getConstants(), 1));
// Вывод свойств класса:
printf("---> Свойства: %s\n", var_export($class->getProperties(), 1));
// Вывод методов класса:
printf("---> Методы: %s\n", var_export($class->getMethods(), 1));
// Если есть возможность создать экземляр класса, то создаем его
if ($class->isInstantiable()) {
	$counter = $class->newInstance();
	echo '---> Создан ли экземляр класса ' . $class->getName() . '? ';
	echo $class->isInstance($counter) ? 'Да' : 'Нет';
	echo '\n---> Создан ли экземляр класса Object()?';
	echo $class->isInstance(new Object()) ? 'Да' : 'Нет';
}
#################### Класс ReflectionMethod ####################
// Класс ReflectionMethod сообщает информацию о методах.
class Counter
{
	private static $c = 0;
	final public static function increment()
	{
		return ++self::$c;
	}
}
// Создание экземпляра класса ReflectionMethod:
$method = new ReflectionMethod('Counter', 'increment');
// Вывод основной информации:
printf(
	"===> %s%s%s%s%s%s%s метод '%s' (который является %s)\n".
	"	объявлен в %s\n".
	"	строки с %d по %d\n".
	$metod->isInternal() ? 'Встроенный' : 'Пользовательский',
	$method->isAbstract() ? 'абстрактный' : '',
	$method->isFinal() ? 'финальный'
	$method->isPublic() ? 'public'
	$method->isPrivate() ? 'private'
	$method->isProtected() ? 'protected'
	$method->isStatic() ? 'статический'
	$method->getName(),
	$method->isConstructor() ? 'конструктором' : 'обычным методов'
	$method->getFileName(),
	$class->getStartLine(),
	$class->getEndline()
);
// Вывод статических переменных, если они есть
if ($statics = $method->getStaticVariables()) {
	printf("---> Статическая переменная: %s\n", var_export($statics, 1));
	);
}
// Вызов метода
printf("---> Результат вызова: ");
$result = $method->invoke(null); // статический метод передаем с null
#################### Класс ReflectionExtension ####################
// Класс ReflectionExtension сообщает информацию о модулях.
// Создание экземпляра класса ReflectionException:
$ext = new ReflectionException('standart'); // функции в ядре. Еще пример 'mysqli'
// Вывод основной информации:
printf(
	"Имя : %s\n".
	"Версия : %s\n".
	"Функция : [%d] %s\n".
	"Константы  : [%d] %s\n".
	"Директивы INI  : [%d] %s\n".
	"Классы  : [%d] %s\n",
	$ext->getName(),
	$ext->getVersion() ? $ext->getVersion() : 'NO_VERSION',
	sizeof($ext->getFunctions()),
	var_export($ext->getFunctions(), 1),
	sizeof($ext->getConstans()),
	var_export($ext->getConstans(), 1),
	sizeof($ext->getINIEnties()),
	var_export($ext->getINIEnties(), 1),
	sizeof($ext->getClassNames()),
	var_export($ext->getClassNames(), 1)
);
class String 
{
	public $length = 5;
}
// Создание экземпляра класса reflectionProperty:
$prop = new ReflectionProperty('String', 'length'); // ReflectionProperty сообщает информацию о свойствах класса.
// Вывод основной информации о свойстве класса:
printf(
	"===> %s%s%s%s свойство '%s' (которое было %s)\n".
	"	имеет модификаторы %s\n",
	$prop->isPublic() ? 'public' : '',
	$prop->isPrivate() ? 'private' : '',
	$prop->isProtected() ? 'protected' : '',
	$prop->isStatic() ? 'static' : '',
	$prop->getName(),
	$prop->isDefault() ? 'объявлено во время комполяции' : 'создано во время выполнения',
	var_export(Reflection::getModifierName($prop->getModifiers(), 1)
);
// Создание экземпляра String:
$obj = new String();
// Получение текущего значения:
printf("---> Значение: ");
var_dump($prop->getValue($obj));
// Изменение значения:
$prop->setValue($obj, 10);
printf("---> Установка значения 10, новое значение равно: ");
var_dump($prop->getValue($obj));
// Дамп объекта:
var_dump($prop->getValue($obj));
// Пример:
class Сhest
{
	private static $key = 'Palundra!';
	public static function open($key) 
	{
		echo self::$key === $key ? 'The chest opens' : 'The chest is closed';
	}
}
$classChest = new ReflectionClass("Сhest");
$propertyKey = $classChest->getProperty("key");
$propertyKey->setAccessible(true);
$propertyKey->setValue('This`s PHP, motherfucker!');
$propertyKey->setAccessible(false);
Сhest::open('This`s PHP, motherfucker!'); // => The chest opens
#################### Reflection API: примеры ####################
// Получаем экземляр класса ReflectionClass
$rc = ReflectionClass('Имя_класса');
// Наследует ли класс тот или иной интерфейс?
$rc->implementsInterface('Имя_интерфейса');
// Имеет ли класс тот или иной метод?
$rc->hasMethod('Имя_метода');
// Получаем экземпляр класса ReflectionMethod
$rm = $rc->getMethod('Имя_метода');
// Является ли метод статическим:
$rm->isStatic();
// Выполнение статического метода 
$result = $rm->invoke(null);
// Выполнение обычного метода:
$instance = $rc->newInstance();
$result = $rm->invoke($instance);
// Пример Reflection API в системе плагинов:
// file: classes/IPlugin.class.php
interface IPlugin
{
	public static function getName();
}
class PluginIvana implements IPlugin
{
	private static $links = [
		// ...
	];
	private static $articles = [
		// ...
	];	
	private static $apps = [
		// ...
	];	
	public static function getName()
	{
		return 'Ссылки от Ивана';
	}
	public static function getLinksItems()
	{
		return self::$links;
	}
	public static function getArticlesItems()
	{
		return self::articles;
	}
	public static function getAppsItems()
	{
		return self::apps;
	}	
}
class PluginSemena implements IPlugin
{
	private static $links = [
		// ...
	];
	private static $articles = [
		// ...
	];	
	private static $apps = [
		// ...
	];		
	public static function getLinksItems()
	{
		return self::$links;
	}
	public function getAppsItems()
	{
		return $this->articles;
	}	
}
// file: classes/Favorites.class.php
class Favorites
{
	private $plugins = [];
	function construct()
	{
		$isExists = false;
		foreach(glob('classes/*/*.class.php') as $item) {
			if (is_file($it)) {
				include_once($item);
				$isExists = true;
			}
		}
		if ($isExists) $this->findPlugins();
	}
	private function findPlugins()
	{
		foreach (get_declared_classes() as $class) { // возвращает массив с именами объявленных классов
			$rc = new ReflectionClass($class);
			if ($rc->implementsInterface('IPlugin')) {
				$this->plugins[] = $rc;
			}
		}
	}
	public function getFavorites($methodName)
	{
		$list = [];
		$items = [];
		foreach ($this->plugins as $rc):
			if ($rc->hasMethod($methodName)):
				$rm = $rc->getMethod($methodName);
				if ($rm->isStatic())
					$items = $rm->invoke(null);
				else
					$items = $rm->invoke($rm->invoke($rc->newInstance()));
				$list[] = $items;
			endif;
		endforeach;
		return $list;
	}
}
// file: index.php
include_once 'classes/Favorites.class.php';
$fav = new Favorites;
$links = $fav->getFavorites('getLinksItems');
$arts = $fav->getFavorites('getLinksArticlesItems');
$apps = $fav->getFavorites('getAppsItems');
?>
//...

<div id='a'>
	<h2>Полезные сайты</h2>
	<ul>
	<? 
		foreach ($links as $link) {
			foreach ($link as $item) {
				echo "<li><a href='{$item[1]}'>{$item[0]}</a></li>"
			}
		}
	?>
	</ul>
</div>
<div id='b'>
	<h2>Полезные приложения</h2>
	<ul>
	<? 
		foreach ($apps as $app) {
			foreach ($app as $item) {
				echo "<li><a href='{$item[1]}'>{$item[0]}</a></li>"
			}
		}
	?>
	</ul>
</div>	
<div id='c'>
	<h2>Полезные статьи</h2>
	<ul>
	<? 
		foreach ($arts as $art) {
			foreach ($art as $item) {
				echo "<li><a href='{$item[1]}'>{$item[0]}</a></li>"
			}
		}
	?>
	</ul>
</div>	



/** 
* Тестовый класс
*
* @param  foo bar
* @return baz
*/
class TestClass { }

$rc = new ReflectionClass('TestClass');
var_dump($rc->getDocComment()) // парсит комментарии начинающиеся с /** => 

/*
string(55) "/** 
* Тестовый класс
*
* @param  foo bar
* @return baz
*/



#################### PHP Repository ####################

/*
PEAR 
Пакеты с исходными кодами на языке PHP
Возмодность установки пакетов
Стандарт оформление исходного кода, включая консоль версий

Документирование: PHP Doc, Doxygen
*/

#################### cURL ####################

/*
Свободная, кроссплатформенная служебная программа командной строки для передачи файлов по различным протоколам с синтаксисом URL
Libcurl - библиотека интерфейся API для передачи, которую разработчики могут встроить в свои программы.
cURL действует как автономная обертка для библиотеки libcurl
Для libcurl имеется > 30 различных привязок к языкам программирования: php_curl

Основные функции:
*/

resource curl_init ([string $url = NULL])
bool curl_setopt (resourse $ch, int $option, mixed $value) 
mixed curl_exec(resource $ch)
void curl_close(resource $ch)

// Использование cURL

// Создание:
$ch = curl_init();

// Установка опций:
curl_setopt($ch, CURLOPT_URL, 'http://site.ru'); // необязательная строка, если прописать $ch = curl_init('http://site.ru');
/*=============*/
curl_setopt($ch, CURLOPT_URL, 1); //  для возврата необработанного ответа

curl_setopt($ch, CURLOPT_HEADER, 1); // вернуть тело с заголовками

curl_setopt($ch, CURLOPT_NOBODY, 1); // вернуть только заголовками

// Выполнение:
curl_exec($ch);

// Закрытие:
curl_close($ch);



// Пример:
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, HOST_NAME . 'test.txt');

$fp = fopen('empty.txt', 'w');
$fh = fopen('headers.txt', 'w');

curl_setopt($curl, CURLOPT_FILE, $fp); // файл, в который будет записан результат передачи (тело)
curl_setopt($curl, CURLOPT_WRITEHEADER, $fh); // (заголовки)
curl_exec($curl);
curl_close($curl);

// Пример:
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, HOST_NAME . 'posttest.php');

curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, 'Hello=World&Foo=Bar&Name=Max');


curl_exec($curl);
curl_close($curl);

// file: posttest.php
var_dump($_POST);

// Пример:
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, HOST_NAME . 'upload/put.txt');

$str = 'Hello, world';

$fp = tmpfile(); // создает в памяти пустой файл
fwrite($fp, $str);
fseek($fp, 0);

curl_setopt($curl, CURLOPT_PUT, true);
curl_setopt($curl, CURLOPT_INFILE, $fp);
curl_setopt($curl, CURLOPT_INFILESIZE, strlen($str));

$result = curl_exec($curl);
fclose($fp);
curl_close($curl);

// file: put.php

if ($_SERVER['REQUEST_METHOD'] === 'PUT') { 

	$file = basename($_SERVER['REQUEST_URI']);

	if (file_exists($file)) 
		$exists = true;

	$dest = fopen($file, 'w');

	if (!$dest) {
		header('HTTP/1.1 409 Create error');
		exit;
	}

	$src = fopen('php://input', 'r'); // возвращает все необработанные данные после HTTP-заголовков запроса, независимо от типа контента.

	while($kb = fread($src, 1024)) {
		fwrite($dest, $kb, 1024);
	}
	fclose($dest);
	fclose($src);

	if ($exists) 
		header('HTTP/1.1 204 No Content');
	else 
		header('HTTP/1.1 201 Created');
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
	readfile(basename($_SERVER['REQUEST_URI']);
} else {
	header('HTTP/1.1 501 Not Implemented');
}

// file: .htaccess.php
Options Indexes FollowSymLinks
RewriteEngine On
RewriteRule ^(.*)$ put.php?url=$1 [L]



// Пример:

function curlHeaderCallback($curl, $headers) // переопределение заголовков
{
	header($headers);

	header('Content-Disposition: attachment; filename="file-name.zip"'); // яожидаемый контент ответа будет отображаться в браузере, как вэб-страница или часть вэб-страницы, или же как вложение, которое затем может быть скачано и сохранено локально.

	return strlen($headers);
}

$str = HOST_NAME . 'zip.php';
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $str);
curl_setopt($curl, CURLOPT_BINARYTRANSFER, 1); // бинарные данные
curl_setopt($curl, CURLOPT_HEADERFUNCTION, 'curlHeaderCallback');


// file: zip.php

$zip = new ZipArchive();
$filename = 'test,zip';

if ($zip->open($filename, ZIPARCHIVE::CREATE) !== TRUE) {
	exit ("cannot open $filename\n");
}

// Создаем в архиве файл 'test-file-php-1.txt' и записываем в него строку

$str = '#1 This is a test string added as testfilephp1.txt.\n';
$zip->addFromString('test-file-php-1.txt', $str);

// Создаем в архиве файл 'test-file-php-2.txt' и записываем в него строку
$str = '#2 This is a test string added as testfilephp2.txt.\n';
$zip->addFromString('test-file-php-2.txt', $str);

// Копируем в архив существующий файл 'test.txt' и переименовываем его в 'test-from-file.txt'
$zip->addFile('test.text', 'test-from-file.txt');

$zip->close();
echo file_get_contents($filename);



#################### Регулярные выражения ####################

/*
Типы регулярных выражений в PHP:
PCRE
POSIX - c 7 выпелена

Формат определения шаблонов:
<разделитель><шаблон><разделитель>[<модификатор>]

Разделители:
/
|
@
#

Основные термины:
Метасимволы
Кватификаторы
Классы символов
Ссылки

Функции поиска, замены, разделения:
preg_match($pattern, $subject [, $matches]); // поиск до первого вхождения
preg_match_all($pattern, $subject [, $matches], PREG_CONSTs); // поиск все вхождений
preg_replace($pattern, $replace, $subject); // поиск и замена
*/

preg_match('/PHP.7/', 'PHP-7', $matches); // . - любой символ, кроме перевода строки
$matches[0]; // => PHP-7
preg_match('/\.com/', 'site.com', $matches);  // \ экранирование метасимволов и разделителей
$matches[0]; // => .com

/*
{m} - точное соответствие
{m, n} - максимум и минимум
{m,} - минимум
*/

preg_match('/tre{1,2}f/', 'treef', $matches);  
$matches[0]; // => treef

/*
? что и {0, 1}
+ что и {1,}
* что и {0,}
*/

preg_match('/PHP.?5/', 'PHP 5', $matches);  
$matches[0]; // => PHP 5

/*
Метасимволы
^ Ограничение начала строки
$ Ограничение конца строки
*/

preg_match('/^abc/', 'abcdxyz', $matches);  
$matches[0]; // => abc

preg_match('/xyz$/', 'abcdxyz', $matches);  
$matches[0]; // => xyz


/*
[...] Класс искомых символов
*/

preg_match('/[0-9]+/', 'PHP is released in 1995', $matches);  
$matches[0]; // => 1995

preg_match('/[^0-9]+/', 'PHP is released in 1995', $matches); // не включая цифры 
$matches[0]; // => PHP is released in 

preg_match('/[a-zA-Z ]+/', 'PHP is released in 1995', $matches); // не включая цифры 
$matches[0]; // => PHP is released in 

preg_match('/[^a-zA-Z ]+/', 'PHP is released in 1995', $matches); // не включая цифры 
$matches[0]; // => 1995 

/*
(...) Группировка элементов, для раскидывания элементов по массиву. В 0 лежит элемент с полным вхождением, в остальных сгруппированные
*/

$subject = 'PHP is released is 1995';
$pattern = '/PHP [a-zA-Z ]+([12][0-9])([0-9]{2})/';
preg_match($pattern, $subject, $matches);
print_r($matches); // =>
/*
[0] => PHP is released in 1995,
[1] => 19,
[2] => 05
*/


/*
Специальный последовательности:
\? \+ \* \[ \] \{ \} 	// экранирование
*/
$subject = '4**';
$pattern_in_apos = '/^4\*\*$/'; // в одинарных ковычках
$pattern_in_quot = "/^4\\*\\*$"; // в двойных ковычках (т.к в них '\' считается экранирующи )


/*
\t \n \f \r (ASCII 9, 10, 12, 13)
\d ([0-9])
\D ([^0-9])
\s ([\t\n\f\r])
\S ([^\t\n\f\r])
\w - любая буква, цифра, символ подчеркивания
\W - противоположность \w
*/



/*
\b позиция между соседними символами \w и \W
\B противоположность \b
*/

$string = '##Testing123##';
preg_match('/\b.+\b/', $string, $matches); 
$matches[0]; // => Testing123 

/*
Жадные квантификаторы: * и +
*/
$subject = '<b>I am bold.</b> <i>I am Italic.</i> <b>I am also bold.</b>';
preg_match('#<b>(.+)</b>#', $subject, $matches); 
$matches[1]; // => I am bold.</b> 	<i>I am Italic.</i>	<b>I am also bold.';

/*
Таблетка от жадности: ?
*/
preg_match('#<b>(.+?)</b>#', $subject, $matches);  // => I am bold.


/*
Модификаторы
i ([a-zA-Z]) нерегистрозависимый поиск
*/


// m Многострочный поиск
$subject = "ABC\nDEF\nGHI";
preg_match('/^DEF/', $subject, $matches);
$matches[0]; // => 

preg_match('/^DEF/m', $subject, $matches);
$matches[0]; // => DEF


// S Однострочный поиск: "." = . + перевод строки
$subject = "ABC\nDEF\nGHI";
preg_match('/BC.DE/', $subject, $matches);
$matches[0]; // => 

preg_match('/BC.DE/S', $subject, $matches);
$matches[0]; // => BC\nDE


// x Пропуск пробелов и коментариев (#) в тексте шаблона
$subject = "ABC\nDEF\nGHI";
preg_match('/A B C/', $subject, $matches);
$matches[0]; // => 

preg_match('/A B C/x', $subject, $matches);
$matches[0]; // => ABC


// D что и $, если строка не заканчивается \n
preg_match('/BC$/', 'ABC\n', $matches);
$matches[0]; // => BC

preg_match('/BC$/D', 'ABC\n', $matches);
$matches[0]; // => 

// A что и ^ 
preg_match('/[a-c]{3}/i', '123ABC', $matches);
$matches[0]; // => ABC

preg_match('/[a-c]{3}/iA', '123ABC', $matches);
$matches[0]; // => 

// U ленивость по умолчанию
$subject = '<b>I am bold.</b> <i>I am Italic.</i> <b>I am also bold.</b>';
preg_match('#<b>(.+)</b>#U', $subject, $matches); 
$matches[1]; // => I am bold.


// Функция замены:
$subject ='April 15, 2003';
$pattern = '/(\w+) (\d+), (\d+)/i';
$replace = '$2 $1, $3'; // если в 2-х ковычках, экранируем: "\$2 \$1 \$3"
preg_replace($pattern, $replace, subject, $subject); // => 15 April, 2003


// Функция разделения:
$subject = 'hypertext Language, programming';
$pattern = '/[\s,]+/';
$words = preg_split($pattern, $subject); // => 
/*
[0] => hypertext,
[1] => language
[2] => programming
*/

$chars = preg_match('//', 'PHP', 0, PREG_SPLIT_NO_EMPTY); // => 

/*
[0] => P,
[1] => H,
[2] => P
*/


#################### PHPUnit ####################

/*
phpUnit (phpunit.de)

Запуск в консоли:
phpunit tests-php-file.php
*/

// Тестирование операций с массивами PHP при использовании PHPUnit

class ArrayTest extends PHPUnit_Framework_TestCase
{
	$arr = [];

	$this->assertEquals(0, count($arr));

	array_push($arr, 'element');
	$this->assertEquals('element', $arr[count($arr) - 1]);
	$this->assertEquals(1, count($arr));

	$this->assertEquals('element', array_pop($arr));
	$this->assertEquals(0, count($arr));
}


// Использование разных методов:
class StackTest extends PHPUnit_Framework_TestCase
{
	public function testEmpty()
	{
		$arr = [];
		$this->assertTrue(empty($arr));
	}

	public function testPush()
	{
		$arr = [];
		array_push($arr, 'foo');
		$this->assertEquals('foo', $arr[count($arr) - 1]);
		$this->assertFalse(empty($arr));
	}

	public function testPop(array $arr) // Ошибка 
	{
		$arr = [];
		$this->assertEquals('foo', array_pop($arr));
		$this->assertTrue(empty($arr));
	}
}

// Решение: Использование аннтации @depends для описания зависимостей (то что вернет testPop передать в testPush())
class StackTest extends PHPUnit_Framework_TestCase
{
	public function testEmpty()
	{
		$arr = [];
		$this->assertTrue(empty($arr));
		return $arr;
	}

	/**
	 * @depends testEmpty
	 */
	public function testPush(array $arr)
	{
		array_push($arr, 'foo');
		$this->assertEquals('foo', $arr[count($arr) - 1]);
		$this->assertFalse(empty($arr));	
		return $arr;	
	}
}

// Использование источника данных:
class DataTest extends PHPUnit_Framework_TestCase
{
	/**
	 * @dataProvider provider
	 */
	public function testAdd($a, $b, $c) // PHPUnit по очереди будет кидать сюда элементы массива в provider()
	{
		$this->assertEquals($c, $a + $b);
	}

	public function provider()
	{
		return [
			[0, 0, 0],
			[0, 1, 1],
			[1, 0, 1],
			[1, 1, 3]
		];
	}
}

// Применение всех возможных шаблонных методов:
class TemplateMethodsTest extends PHPUnit_Framework_TestCase
{
	public static function setUpBeforeClass() // вызывается вначале (а-ля конструктор)
	{
		print __METHOD__ . "\n";
	}
	
	protected function setUp() // вызывается перед каждым тестом
	{
		print __METHOD__ . "\n";		
	}

	protected function assertPreConditions() // вызывается перед каждым Assert
	{
		print __METHOD__ . "\n";		
	}

	public function testOne()
	{
		print __METHOD__ . "\n";
		$this->assertTrue(TRUE);
	}

	public function testTwo()
	{
		print __METHOD__ . "\n";
		$this->assertTrue(False);
	}	

	protected function assertPostConditions() // вызывается после каждого Assert
	{
		print _
// Использование источника данных:_METHOD__ . "\n";		
	}	

	protected function tearDown() // после каждого теста
	{
		print __METHOD__ . "\n";
	}

	public static function tearDownAfterClass() // вызывается в самом конце
	{
		print __METHOD__ . "\n";
	}

	protected function onNotSuccessfulTest(Exception $e) // чтобы не обваливался при failure
	{
		print __METHOD__ . "\n";
		throw $e;
	}
}


// Пример:

// file: somedemo.php
class SomeDemo
{
	public function div($a, $b)
	{
		return $a / $b;
	}

	public function mult($a, $b)
	{
		return $a * $b;
	}
}

// file: demo.php
class Demo
{
	public function sum($a, $b)
	{
		return $a + $b;
	}

	public function dummy($a, $b)
	{
		return 'nothing';
		if ($a == 100) $b = 0;
	}


	public function substract($a, $b)
	{
		return $a - $b;
	}
}

// file: demotest.php
require_once('classes/demo.php');

class DemoTest extends PHPUnit_Framework_TestCase
{
	public function testSum()
	{
		$demo = new Demo();
		$this->assertEquals(4, $demo->sum(2, 2));
		$this->assertNotEquals(3, $demo->sum(1, 1));
	}
}

// file: demotest-2.php
require_once('classes/demo.php');

class DemoTest extends PHPUnit_Framework_TestCase
{
	public function setUp() // вызывается перед каждым тестом
	{
		$this->demo = new Demo();
	}	

	public function testSum() // вызывается перед каждым тестом
	{
		$this->assertEquals(4, $this->demo->sum(2, 2));
	}	

	public function testSubstract() // вызывается перед каждым тестом
	{
		$this->assertEquals(0, $this->demo->substract(2, 2));
	}	

	public function tearDown()
	{
		unset($this->demo);
	}
}


################################ MVC ################################

// View 
include 'controller.php';

<html>
	<head>
		<link rel="stylesheet" href="style.css"	/>
	</head>
	<body>
		echo $output;
		if (is_string($dresult)) {
			echo $dbresult;
		} else {
			foreach ($dbresult as $record) {
				foreach ($record as $k => $v) {
					echo $k . ": " . $v . '<br>'	;
				}
			}
		}
	</body>
</html>	


// View 
include 'model.php';

session_start();

if (isset($_SESSION['username'])) {
	$output = 'Добро пожаловать, ' .  $_SESSION['username'];
} else {
	$output = 'Вы не авторизованы на сайте';
}
$dbresult = fetchAllProducts();


// Model
function getDBConnection()
{
	try {
		$pdo = new PDO('sqlite:site.db');
		return $pdo;
	} catch (PDOException $e) {
		return 'Извините, ' . $e->getMessage();
	}
}

function fetchAllProducts()
{
	$pdo = getDBConnection();

	if (!is_object($pdo))
		return $pdo;
	try {
		$stmt = $pdo->prepare("SELECT * FROM products");
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	} catch (PDOException $e) {
		return 'Извините, ' . $e->getMessage();
	}
}

/*
Controllers
	FrontController (как правило, встроенный)
		интрепритация переменных запроса и направление исполняемого кода
		выполняет всю черновую работу: создание моделей, парсинг шаблонов, вывод результата
	ActionControllers (пользовательские)	
		action == метод

Мodels
	классы-утилиты

Views 
	шаблоны	


Маршрутизация:
/controller/action[/key 1][/key 2]... 	
/controller/action[/key 1][/value 1]...
Примеры:
/
/book/show 			// book - имя контроллера, show - имя action, опционально дальше идут параметры 
/book/show/25
/book/get/format/xml

mod_rewrite => bootstrap file (index.php) 	// единая точка входа


Структура:

	application
		controllers
		models
		views
	images
	styles
	index.php
	.htaccess
		RewriteCond %{REQUEST_FILENAME}!-f
		RewriteRule !\.(js|gif|jpg|png|css)$ index.php	


Bootsrap
	Инициализация
		путей по-умолчанию для поиска файлов
		необходимых конфигурационных данных
		автозагрузка файлов

	Инициализация FrontController			
	Роутинг
	Вывод данных
*/


// file: index.php
// Пути по-умолчанию для поиска файлов:	
set_include_path(get_include_path() // set_include_path - устанавливает значение настройки конфигурации include_path 
	. PATH_SEPARATOR . 'application/controllers' // точка с запятой в Windows, двоеточие в других системах.
	. PATH_SEPARATOR . 'application/models'
	. PATH_SEPARATOR . 'application/views'
);

// Имена файлов:
const USER_DEFAULT_FILE = 'user_default.php';
const USER_ROLE_FILE = 'user_role.php';
const USER_LIST_FILE = 'user_list.php';
const USER_ADD_FILE = 'user_add.php';

// Текстовая база данных пользователей:
define('USER_DB', $_SERVER['DOCUMENT_ROOT'] . '/data/users.txt');

// Автозагрузчик классов:
function __autoload($class)
{
	require_once ($class . '.php');
}

// Инициализация и запуск FrontController:
$front = FrontController::getInstance();
$front->route();

// Вывод данных:
echo $front->getBody();


// file: application/controllers/FrontController.php
class FrontController
{
	protected $controller, $action, $params, $body;
	public static $instance;

	public static function getInstance() // Singleton
	{
		if (!(self::$instance instanceof self))
			self::$instance = new self();
		return self::$instance;
	}

	private function __construct()
	{
		$request = $_SERVER['REQUEST_URI'];
		$splits = explode('/', trim($request, '/'));

		// Controller
		$this->controller = !empty($splits[0]) ? ucfirst($splits[0]) . 'Controller' : 'IndexController';
		// Негласное правило: название контроллера с большой буквы + Controller. IndexController - контроллер по умолчанию.

		// Action
		$this->action = !empty($splits[1]) ? $splits[1] . 'Actions' : 'IndexActions'; 

		// Есть ли параметры и их значения:
		if (!empty($splits[2])) {
			$keys = $values = [];

			for($i = 2, $cnt = count($splits); $i < $cnt; $i++) {
				if ($i % 2 == 0) {
					// четное = ключ (параметр)
					$keys[] = $splits[$i];
				} else {
					// значение параметра
					$values[] = $splits[$i];
				}
			}
			$this->params = array_combine($keys, $values); // cоздает новый массив, используя один массив в качестве ключей, а другой в качестве соответствующих значений
		}
	}

	public function route()
	{
		if (class_exists($this->getController())) { // есть ли такой контроллер
			$rc = new ReflectionClass($this->getController());

			if ($rc->implementsInterface('IController')) { // интерфейс как метка
				if ($rc->hasMethod($this->getAction())) {
					$controller = $rc->newInstance(); // создаем экземпляр класса контроллера
					$method = $rc->getMethod($this->getAction());
					$method->invoke($controller); // вызывает отраженный метод (getAction)
				} else {
					throw new Exception('Action');
				}
			} else {
				throw new Exception('Interface');
			}
		} else {
			throw new Exception('Controller');
		}
	}

	public function getParams()
	{
		return $this->params;				
	} 

	public function getController()
	{
		return $this->controller;				
	} 

	public function getAction()
	{
		return $this->action;				
	} 	

	public function getBody()
	{
		return $this->body;				
	} 

	public function setBody($body)
	{
		$this->body = $body;				
	} 	
}


// file: application/controllers/IndexController.php

class IndexController implements IController
{
	public function indexAction()
	{
		$fc = FrontController::getInstance(); // если уже реализован, вернется ссылка на него

		// Инициализация модели:
		$model = new FileModel();

		$model->name = $fc->getParams();

		$output = $model->render(USER_DEFAULT_FILE);

		$fc->setBody($output);
	}
}



// file: application/controllers/UserController.php

class UserController implements IController
{
	public function helloAction()
	{
		$fc = FrontController::getInstance(); // если уже реализован, вернется ссылка на него

		// Инициализация модели:
		$model = new FileModel();

		$model->name = $fc->getParams()['name'];

		$output = $model->render(USER_DEFAULT_FILE);
		$fc->setBody($output);
	}

	public function listAction()
	{
		$fc = FrontController::getInstance(); // если уже реализован, вернется ссылка на него

		// Инициализация модели:
		$model = new FileModel();

		$model->list = unserialize(file_get_contents(USER_DB));

		$output = $model->render(USER_LIST_FILE);
		$fc->setBody($output);
	}	
}



// file: application/models/FileModel.php
class FileModel
{

	// имя пользователя:
	public $name = '';

	// список пользователей:
	public $list = [];

	// Текуший пользователь: ассоциативный массив с элементами role и name для существующего пользователя или только элементом name для неизвестного пользователя
	public $user = [];

	public function render($template)
	{
		// $template - текущее представление
		ob_start();
		include(dirname(__FILE__) . '/' . $template);
		return ob_get_clean();
	}
}


// file: application/views/index.php

<h1>Hello, <?=$this->name?> !</h1>


// file: application/views/user_list.php

<ol>
	<?php
		foreach ($this->list as $name => $role) {
			echo "<li>$name: $role</li>";
		}
	?>
</ol>



################################ REST ################################

/*
Representational State Transfe
Передача состояния представления
Стиль построения архитектуры распределенного приложения
	Данные должны передаваться в виде небольшого количества стандартных форматов (например, HTML, XML, JSON).
	Сетевой протокол должен поддерживать кэширование, не должен созранять информацию о состоянии между парами "запрос-ответ".
	Использование методов HTTP для указания необходимых операций.
*/

// SLIM

// Автозагрузчик
\Slim\Slim::registerAutoloader();

// Создание экземпляра класса
$app = new \Slim\Slim()	;

// Запуск приложения:
$app->run();

// Роутинг и базовые операции:
$app->get('/', function() {
	echo 'Привет Гость';
});

$app->post('/:id', function ($id) use ($app) {
	// Получаем значение параметра name
	$name = $app->request()->post('name');
	// Получаем массив всех параметров
	$params = $app->request()->post();
	// Посылаем ответ:
	$res = $app->response();
	// Посылаем HTTP заголовок с нужным значением:
	$res['Content-Type'] = 'text/xml';
});

// Запуск приложения:
$app->get('/', function () {
	echo 'Привет, гость!';
});


################################ Библиотека NotORM ################################

// notorm.com

// Инициализация:
$pdo = new PDO('sqlite:db');
$db = new NotORM($pdo);

// Выборка всех записей:
foreach ($db->users as $user) {}

// Выборка с условием:
$user = $db->users()->where('id', $id);
$row = $user->fetch();

// Изменение записи:
$user->update($array);

// Вставка записи:
$db->users()->insert($array);


// Пример:

// Подключение библиотек:
require_once 'Slim/Slim.php';
require_once 'NotORM.php';

// Инициализация автозагрузчика
\Slim\Slim::registerAutoloader();

// Инициализация соединения с БД для NotORM
$pdo = new PDO('sqlite:rest.db');
$db = new NotORM($pdo);

// Создание экземпляра класса Slim
$app = new \Slim\Slim();

// Роутинг: определение методов, путей и действий

$app->get('/', function () {
	echo 'Something by default';
});

// Выборка всех книг
$app->get('/books/', function() use ($app, $db) {
	$books = [];

	foreach($db->books() as $book) {
		$books[] = [
			'id' => $book['id'],
			'title' => $book['title'],
			'author' => $book['author']
		];
	}

	$res = $app->response();
	$res['Content-Type'] = 'application/json';
	echo json_decode($books);
});

// Выборка книги используя ее индентификатор:
$app->get('/book/:id', function ($id) use ($app, $db) {
	$res = $app->response();
	$res['Content-Type'] = 'application/json';
	$book = $db->books()->where('id', $id);

	if ($data = $book->fetch()) {

	}
});


// Получение книги используя ее индетификатор
$app->get('/book/:id', function ($id) use ($app, $db) {
	$res = $app->response();
	$res['Content-Type'] = 'application/json';
	$book =$db->books()->where('id', $id);
	if ($data = $book->fetch()) {
		echo json_encode([
			'id' => $data['id'],
			'title' => $data['title'],
			'author' => $data['author']
		]);
	} else {
		echo json_encode([
			'status' => 1,
			'message' => "Book ID $id does not exist";
		]);
	}
});

// Добавление новой книги:
$app->post('/book/', function () use ($app, $db) {
	$res = $app->response();
	$res['Content-Type'] = 'application/json';
	$book = $app->request()->post();
	$result = $db->books->insert($book);
	echo json_decode(['id' => $result['id']]);
});

// Изменение данных книги используя ее индентификатор:
$app->put('/book/:id', function ($id) use ($app, $db) {
	$res = $app->response();
	$res['Content-Type'] = 'application/json';
	$book = $db->books()->where('id', $id);
	if ($book->fetch()) {
		$post = $app->request()->put();
		$result = $book->update($post);
		echo json_encode([
			'status' => 1,
			'message' => 'Book updated successfuly'
		]);
	} else {
		echo json_encode([
			'status' => 0,
			'message' => "Book id $id does not exists";
		]);		
	}
});

// Удаление книги используя ее индентификтор
$app->delete('/book/:id', function ($id) use ($app, $db) {
	$res = $app->response();
	$res['Content-Type'] = 'application/json';
	$book = $db->books()->where('id', $id);
	if ($book->fetch()) {
		$post = $app->request()->put();
		$result = $book->delete();
		echo json_encode([
			'status' => 1,
			'message' => 'Book deleted successfuly'
		]);
	} else {
		echo json_encode([
			'status' => 0,
			'message' => "Book id $id does not exists";
		]);		
	}	
});

// Запуск приложения:
$app->run();

// file:rest.php

// Глобальная конфигурация cURL
$curl = curl_init();
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$host = 'http://mysite.local/rest/';

// Инициализация глобальных переменных:
$errMsg = $id = $author = $title = $summary = '';
$cmd = 'Добавить'; // надпись на кнопке формы

// Исполнение методов POST (на создание) и PUT (на изменение)
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	// Проверка заполнения полей формы
	if (empty($_POST['author']) or empty($_POST['title']) or empty($_POST['summary'])) {
		$errMsg = 'Заполните все поля';
	} else {
		// Формирование строки для отправки для обоих методов
		$str = "title={$_POST['title']}&author={$_POST['author']}&summary={$_POST['summary']}";
		curl_setopt($curl, CURLOPT_POSTFIELDS, $str);

		if (!empty($_POST['id'])) {
			// Отправка данных методов PUT
			$id = abs((int)$_POST['id']);
			curl_setopt($curl, CURLOPT_URL, $host."book/$id/");
			curl_setopt($curl, CURLOPT_HTTPHEADER, ['X-HTTP-Method-Override: PUT']); // если в настройках сервера это метод запрещен
			$result = json_decode(curl_exec($curl));

			if ($result->status) {
				header('Location: rest.php'); 
				exit;
			} else {
				$errMsg = 'Не удалось обновить книгу';
			}
		} else {
			// Отправка данных методом POST
			curl_setopt($curl, CURLOPT_URL, $host . 'book/');
			curl_setopt($curl, CURLOPT_POST, 1);
			$result = json_decode(curl_exec($curl));
			curl_close($curl);

			if ($result->id) {
				header('Location: rest.php'); 
				exit;
			} else {
				$errMsg = 'Не удалось обновить книгу';
			}
		}
	}
} else {
	// Исполнение методов GET (на получение) и DELETE (на удаление)'

	if (isset($_GET['del'])) {
		// отправка данных методом DELETE
		$id = abs((int)$_GET['del']);

		if ($id) {
			curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'DELETE'); // для DELETE - CURLOPT_CUSTOMREQUEST 
			curl_setopt($curl, CURLOPT_URL, $host . "book/$id");
			$result = json_decode(curl_exec($curl));
			curl_close($curl);	

			if ($result->status) {
				header('Location: rest.php'); 
				exit;
			} else {
				$errMsg = 'Не удалось удалить книгу';
			}				
		}
	} elseif (isset($_GET['update'])) {
		// отправка данных методом GET для получения одной книги
		$id = abs((int)$_GET['update']);

		if ($id) {
			curl_setopt($curl, CURLOPT_URL, $host . "book/$id");
			$result = json_decode(curl_exec($curl));
			curl_close($curl);	

			if ($result->status) {
				$errMsg = 'Не удалось получить книгу';
			} else {
				$cmd = 'Изменить!';
				$title = $result->title;
				$author = $result->author;
				$summary = $result->summary;
				$id = $result->id;
			}				
		}				
	} else {
		// Отправка данных методов GET для получения всех книг
		curl_setopt($curl, CURLOPT_URL, $host . "books/");
		$result = json_decode(curl_exec($curl));
		curl_close($curl);
	}
}

// В настройках сервера (server.conf):
<LimitExcept GET POST HEAD PUT DELETE>