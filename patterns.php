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