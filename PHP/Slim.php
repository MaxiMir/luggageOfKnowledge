<?

###################### SLIM ###################### 

// FILE: composer.json
	/*
{
	"require": {
		"slim/slim": "2.*"
	}
}
*/

// $ composer init // install
// $ php copmposer.phar install

$app = new\Slim\Slim();
$app->get('/hello/:name', function($name) {
	echo 'Hello, $name';
});

$app->run();


// FILE: index.php
require_once "vendor/autoload.php";

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim([
	'mode' => 'development', // по умолч. Определяется в момент создания класса
	'debug' => TRUE, // режим откладки, по умолчанию включен и исп. свой класс ERROR Exception для перехвата и отображению ошибок
	'templates.path' => 'templates', // путь до каталога с шаблонами
	'cookies.encrypt' => TRUE, // влючение режима шифрования значений, которые записываются в куки
	'cookies.lifetime'=>  '20 minutes', // время жизни кук
	'cookies.path' => '/', // устанавливает подмножество страниц, для которых действительны значения файлов cookies
	'cookies.domain' => 'slim.ru', // -//- для каких доменов
	'cookies.secure' => FALSE, // Если true, то информация по кукам пересылается только по https с использованием SSL сертификата. По-умолч. false.
	'cookies.httponly' => TRUE, // куки будут доступны для различных клиентских языков веб програмирования (напр., JS)
	'cookies.cipher' => 'cipher',
	'cookies.cipher_mode' => 'mode',
	'cookies.secret_key' => 'key',
	'host' => 'localhost',
	'user' => 'user',
	'pass' => 'pass',
	'db' => 'dbname'
]); // в массиве при необходимости передаем наши настройки. 1 ваирант

$app->config('db'); // возвращает значение настройки
$app->config(['db' => 'dbname']); // изменяет значение настройки
$app->config([ // изменение/создание настроек. 2 вариант
	'host' => 'localhost',
	'user' => 'user',
	'pass' => 'pass',
	'db' => 'dbname'
]); 

$app->configureMode('development', function() use ($app) {  // привязываем конкретные настройки mode
	$app->config([
					'debug' => TRUE
	]);				
});

$app->configureMode('test', function() use ($app) {  // привязываем конкретные настройки mode. Вызывается после установки/изменения режима mode
	$app->config([
					'debug' => FALSE
	]);	
});


getDefaultSettings(); // возвращает массив настроек по-умолчанию

$app->get('hello', function() { // index.php?hello или index.php/hello
	$app = \Slim\Slim::getInstance(); // возвращает ранее созданный объект данного класса или можно использовать use($app)
	echo 'world';
});

$app->post('/add', function () {
	print_r($_POST);
});

$app->map('/create', function() {
	echo 'STRING!';
})->via('GET', 'POST');  // POST & GET

$app->run(); // запускаем фреймворк


// FILE: .htaccess
/*
RewriteEngine On // подключаем модуль перенаправления сервера Apache
RewriteCond %{REQUEST_FILENAME} !-f // условие перенаправления (если не файл)
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [QSA,L] // правило перенаправления: домен + index.php + добавленный запроc. Флаг QSA - добавление запроса, L - последнее перенаправление
*/

// маршрутизация - процесс получения части URI и разложение его на параметры для определения того, какой контроллер и какое его действие должны выполниться.
// роутер - метод, в котором определен шаблон части URI и функция обработчик, код которой будет выполнен при совпадении текущего URI c описанным шаблоном.

/*
URI - Uniform Resource Identifier - единообразный индентификатор ресурса = http://slim.ru/article/id/2-title.php
URL - Uniform Resource Locator - единообразный указатель ресурса = http://slim.ru
URN - Iniform Resource Name - единообразный указатель имени = /article/id/2-title.php
*/