<?

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

// Возврат ключей
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


// Комбинируем возврат и приём значений

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

// Создаем псевдо-массив
$splArray = new SplFixedArray(5);

$splArray[1] = 2;
$splArray[4] = 'foo';
$splArray[5] = 'bar'; // Ошибка!

echo $array->getSize(); // 5

// Увеличиваем псевдо-массив
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

// Явное указание класса User для создания объекта
$stmt->setFetchMode(PDO::FETCH_CLASS, 'User');


// Явное указание класса User для создания объекта
// Свойства заполяются значениями после отработки конструктора
$stmt->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'User');



// Полная выборка

class User
{
	public $id, $name, $email; 	
}
// Получаем массив объектов класса User
$arr = $stmt->fetchAll(PDO::FETCH_CLASS, 'USER');
$sql = 'SELECT city, name FROM users';
$stmt = $pdo->query($sql);

// Выбираем данные только из первого поля
$arr = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

// Группируем значения второго полня по значению первого поля
$arr = $stmt->fetchAll(PDO::FETCH_COLUMN|PDO::FETCH_GRUP);

// Выбираем уникальные значения из первого поля
$arr = $stmt->fetchAll(PDO::FETCH_COLUMN|PDO::FETCH_UNIQUE);

// Испольщуем функцию обратного вызова:
function foo ($name, $email)
{
	return $name . ':' . $email . '\n';
}

// Подготовленные запросы
$sql = "SELECT email FROM users WHERE id = :id AND name := name";
$stmt = $pdo->prepare($sql);
$stmt->execute([':id' => 5, ':name' => 'Jorn']);
$john = $stmt->fetchAll();

// Неименнованные псевдопеременные
$sql = "SELECT email FROM users WHERE id = ? AND name := ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([5, 'Jorn']);
$john = $stmt->fetchAll();


// Привязка параметров 
$id = 5;
$name = 'John';

// Для именнованных переменных
$sql = "SELECT email FROM users WHERE id = :id AND name = :name";

$stmt = $pdo->prepare($sql);
$stmt->bindValue(':id', $id, PDO::PARAM_INT);
$stmt->bindValue(':name', $name, PDO::PARAM_STR);
$stmt->execute();


// Для неименнованных псевдопеременных
$sql = "SELECT email FROM users WHERE id = ? AND name := ?";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(1, $id, PDO::PARAM_INT);
$stmt->bindValue(2, $name, PDO::PARAM_STR);
$stmt->execute();


// Использование хранимых процедур

$id = 5;
$name = 'John';

$stmt = $db->prepare('CALL getEmail(?,?,?)');

// Параметр IN
$stmt->bindPara(1, $id, PDO::PARAM_INT);

// Параметр INOUT
$stmt->bindParam(2, $name, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT);

// Параметр OUT
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



#################### Класс ReflectionFunctionAbsract ####################

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

// Создание экземпляра класса ReflectionFunction
$reflect = new ReflectionFunction('foo1');
echo $reflect;