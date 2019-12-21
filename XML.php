<?

################ XML ################

// XML (Extensible Markup Language) - Расширяемый язык разметки. Предназначен для хранения структурированных данных / обмена между программами.

// FILE: catalog.xml
/*
<?xml version="1.0" encoding="utf-8" ?>
<catalog>
	<book>
		<author>Алекс Гомер</author>
		<title>XML</title>
		<pubyear>2000</pubyear>
		<price>200</price>
	</book>

	<book>
		<author>Алекс Гомер</author>
		<title>!CDATA[XML и IE5]]</title> // !CDATA[....]] брать текст как есть
		<pubyear>2000</pubyear>
		<price>200</price>
	</book>
</catalog>
*/



#>>>>>>> Sumple Api for XML (SAX) <<<<<<<
	
	$sax = xml_parser_create('utf-8'); // создание парсера
	
	// Декларация фукнций обработки событий
	function onStart($parser, $tag, $attributes) { // функция обработчик начальных тегов
		if ($tag != 'CATALOG' && $tag != 'BOOK')
			echo '<td>';
		
		if ($tag == 'BOOK')
			echo '<tr>';
	}
	
	function onEnd($parser, $tag) { // функция обработчик закрывающих тегов
		if ($tag != 'CATALOG' && $tag != 'BOOK')
			echo '</td>';
		
		if ($tag == 'BOOK')
			echo '</tr>';
	}
	
	function onText($parser, $text) { // функция обработчик текстового содержимого
		echo $text;
	}

	// Регистрация функций как обработчиков событий
	xml_set_element_handler($sax, 'onStart', 'onEnd');
	xml_set_character_data_handler($sax, 'onText');

	// Запуск парсера
	xml_parse($sax, file_get_contents('catalog.xml'));



#>>>>>>> DOM <<<<<<<

// Интерфейс, позволяющий программам управлять содержимым документов XMLь а так же изменять их структуру.

# Чтение, модификация и создание новых XML-документов.

// FILE: dom.php
	header('Content-Type: text/html; charset=utf-8');

	$dom = new DOMDocument('1.0', 'utf-8'); // создание объекта
	$dom->load('catalog.xml'); // загрузка документа
	$root = $dom->documentContent; // получение корневого элемента
	$root->textContent; // получаем все текстовое содержимое
	$root->nodeType; // получение типа узла => 1
	$books = $root->childNodes; // получение коллекции дочерних узлов => object (book)


	foreach ($books as $book) {
		if ($book->nodeType == 1) { // элемент book
			echo "<tr>";
			
			foreach ($book->childNodes as $item) {
				if ($item->nodeType == 1) {
					echo "<td>{$item->textContent}</td>";
				}
			}
			
			echo "</tr>";
		}
	}

	$books = $dom->getElementsByTagName('book'); // Получение коллекции элементов с определенным именем
	$book = $dom->createElelement('book'); // Создание нового элемента
	$book = $dom->createElelement('title');
	$text = $dom->createTextNode('Название книги'); // Создание текстового узла
	
	$title->appendChild($text); // Добавление узлов к узлам
	$book->appendChild($title);
	$root->appendChild($book);

	$author = $dom->createElelement('author', 'Автор книги'); // Другой вариант создания элемента
	$book->insertBefore($author, $title); // Добавляем узел к узлу перед другим


	// Создаем секцию CDATA
	$description = $dom->createElement('description');
	$cdata = $dom->createCDATASection('...описание книги...');
	$description->appendChild($cdata);
	$book->appendChild($description);

	
	// Сохраняем документ
	$dom->save('catalog.xml');


	// Пример новостной ленты:
/*
<?xml version="1.0" encoding="utf-8" ?>
<?xml-stylesheet type="text/xsl" href="catalog.xsl" ?> // подключение стилей
<rss version="2.0">
	<channel>
		<title>Заголовок новостной ленты</title>
		<link>Ссылка на новостную ленту</link>

		<item>
			<title>Заголовок новости</title>
			<link>Ссылка на новость</link>			
			<decription>Содердание новости</decription>

			<pubDate>Дата публикации новости</pubDate>
			<category>Категория новости</category>
		</item>
	</channel>	
</rss>
*/

	header('Content-Type: text/html; charset=utf-8');

	private function createRss() 
	{
		$dom = new DOMDocument('1.0', 'utf-8');
		$dom->formatOutput = true; // форматирование вывода
		$dom->preserveWhiteSpace = false; // форматирование вывода	

		$rss = $dom->createElelement('rss');
		$dom->appendChild($rss);

		$version = $dom->createAttribute('version');
		$version->value = '2.0';
		$rss->appendChild($version);

		$channel = $dom->createAttribute('channel');
		$title = $dom->createAttribute('title', self::RSS_TITLE);
		$link = $dom->createAttribute('link', self::RSS_LINK);	
		$channel->addChild($title);
		$channel->addChild($link);
		$rss->addChild($channel);

		$lenta = $this->getNews();
		
		if (!$lenta)
			return false;

		foreach ($lenta as $news) {
			$item = $dom->createElement('item');
			$title = $dom->createElement('title', $news['title']);		
			$category = $dom->createElement('category', $news['category']);	

			$desc = $dom->createElement('description');
			$cdata = $dom->createCDATASection($news['description']);
			$desc->appendChild($cdata);

			$link = $dom->createElement('link', '#');

			$dt = date('r', $news['datetime']);
			$pubDate = $dom->createElement('pubDate', $dt);

			$item->appendChild($title);
			$item->appendChild($link);
			$item->appendChild($desc);
			$item->appendChild($pubDate);
			$item->appendChild($category);

			$channel->appendChild($item);
		}

		$dom->save(self::RSS_NAME);
	}


#>>>>>>> SimpleXML <<<<<<<

	// Чтение, модификация XML-документов.
	$sxml = simplexml_load_file('catalog.xml'); // загружаем документ и преобразуем его в объект
	$sxml = simplexml_load_string('XML строка'); // загружаем XML-строку и преобразуем ее в объект
	
	$sxml->book[1]->title; // получение текста нужного элемента
	$sxml->book[1]->title['lang']; // получение атрибута элемента
	
	$sxml->book[0]->title = 'Новое название'; // Изменение текста нужного элемента
	
	$xml = $sxml->asXML(); // преобразование объекта в строку (здесь это catalog)
	file_put_contents('catalog.xml', $xml); // запись строки в файл



#>>>>>>> Преобразование XML с XSL/T <<<<<<<

	// Загрузка исходного XML-документа
	$xml = new DOMDocument();
	$xml->load('catalog.xml');
	
	// Загрузка таблицы стилей XSL
	$xsl = new DOMDocument();
	$xsl->load('catalog.xsl');
	
	$processor = new XSLTProccessor(); // создание XSLT процессора
	$processor->importStylesheet($xsl); // загрузка XSL в процессор
	$processor->transformToXML($xml); // выполнение преобразовния

/*
<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output
	method="html"
	doctype-public="-//W3C//DTD HTML 4.01//EN"
	doctype-system="http://www.w3.org/TR/html4/strict.dtd"
	indent="yes" />

<!-- Шаблон корневого элемента -->

<xsl:template match="/">
	<html>

	<head>
		<title>Наши книги</title>
		<style type="text/css">
			* {
				margin: 0px;
				padding: 0px;
			}
		</style>
</xsl:template>
*/



#>>>>>>> Simple Object Access Protocol <<<<<<<

/**
 * Простой протокол доступа к объектам
 * Запросы посылаются HTTP методом POST
 * Структура SOAP сообщения
 	* Envelope
 	* Header
 	* Body
*/

// SOAP запрос
/*
<soap:Envelope
	xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
	<soap:Body>
		<getStock xmlns="http://site.ru/ws"> // имя удаленной процедуры
			<num>12345</num>
		</getStock>
	</soap:Body>
</soap:Envelope>			 	
*/

// SOAP ответ
/*
<soap:Envelope
	xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
	<soap:Body>	
		<getStockDetailsResponse xmlns="http://site.ru/ws">
			<getStockDetailsResult>
				<id>12345</id>
				<productName>Стакан Граненный</productName>
				<decription>Стакан Граненный. 250 мл.</description>
				<price>9.95</price>
			</head>getStockDetailsResult>	
		</head>getStockDetailsResponse>		
	</head>soap:Body>						
</soap:Envelope>	
*/

/**
Для работы необходимо подключить модуль php_soap.dll
Основные SOAP классы:
 * SoapServer
 * SoapClient
*/

	// FILE: server.php:
	
	// Описание функции Web-сервиса
	function getStock($id)
	{
		$stock = ['a' => 100, 'b' => 200, 'c' => 300, 'd' => 400, 'e' => 500];
		if (!isset($stock[$id])) {
			return new SoapFault('Server', 'Несуществующий id товара');
		}
	
		return $stock[$id];
	}
	
	// Отключение кэширования WSDL-документа
	ini_set('soap.wsdl_cache_enable', '0');
	
	// Создание SOAP-сервера
	$server = new SoapServer('http://mysite.local/demo/soap/stock.wsdl');
	// Добавить класс серверу
	$server->addFunction('getStock'); // если функций несколько ['getStock', 'setStock']
	// Служба является классом, то (getStock, будет методом)
	$server->setClass();
	// Запуск сервера
	$server->handle();


	// FILE: /demo/soap/stock.wsdl:
/*
<?xml version="1.0" encoding="utf-8"?>
<definitions name='Stock'
	targetNamespace='http://localhost/soap'
	xmlns:tns='http://localhost/soap '
	xmlns:soap='http://schemas.xmlsoap.org/wsdl/soap/'
	xmlns:xsd='http://www.w3.org/2001/XMLSchema'
	xmlns:soapenc='http://schemas.xmlsoap.org/soap/encoding/'
	xmlns:wsdl='http://schemas.xmlsoap.org/wsdl/'
	xmlns='http://schemas.xmlsoap.org/wsdl/'>

	<message name="getStockRequest">
		<part name='self_name' type='xsd:string' />
	</message>
	<message name="getStockResponse">
		<part name='quantity' type='xsd:integer' />
	</message>

	<portType name='StockPortType'>...</portType>

	<binding name='StockBinding' type="tns:StockPortType">...</binding>

	<service name='StockService'>
		<port name='StockPort' binding='StockBinding'>
			<soap:address
				location='http://mysite.local/demo/soap/server.php' />
				<operation name='getStock' /> // доступные операции
		</port>	
	</service>
</definitions>
*/



// FILE: client.php:
try {
	$client = new SoapClient('http://mysite.local/demo/soap/stock.wsdl'); // создание SOAP-клиента
	$result = $client->getStock('b'); // выхзов удаленной процедуры
	echo 'Текущий запас на складе: ', $result;
	print_r($client->__getFunctions()); // посмотреть список доступных операций
} catch (SoapFault $exception) {
	echo $exception->getMessage();
}



#>>>>>>> SOCKET <<<<<<<

// FILE: dummy.php
	$name = strip_tags($_POST['name']);
	$age = (int) $_POST['age'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Передача данных методом POST через сокет</title>
</head>
<body>
	<h1>Передача данных методом POST через сокет</h1>

	<?php 
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			if ($name and $age) {
				echo "<h1>Привет, {$name}</h1>";
				echo "<h3>Тебе {$age} лет</h3>";
			} else {
				print "<h3>Нет данных для вывода</h3>";
			}
		}
	?>
</body>
</html>

<?
	// FILE: get_dummy.php
	
	header('Content-Type: text/html;charset=utf-8');
	
	// Сокетное соединение
	// Создаем сокет (host+порт)
	$socket = fsockopen('mysite.local', 80, $sock_errno, $sock_errstr, 30); // 30 - таймаут в секундах
	
	if (!$socket)
		return $sock_errmsg;
	
	// Создаем POST-строку
	$str_query = 'name=John&age=25';
	
	// Посылка HTTP-запроса
	$outData = [];
	$outData[] = "POST /demo/socket/dummy.php HTTP/1.1\r\n";
	$outData[] = 'Host: mysite.local\r\n';
	$outData[] = "Content-Type: application/x-www-form-urlencoded\r\n";
	$outData[] = "Content-lenght: " . strlen($str_query) . "\r\n\r\n";
	
	$outData[] = $str_query;
	$out = implode('', $outData);
	fwrite($socket, $out);
	
	// Получаем и выводим ответ:
	while (!feof($socket)) {
		echo fgets($socket);
	}
	
	// Закрытие соединения:
	fclose($socket);
	
	// В ответе сервера $_POST будет пустым, а 'name=Jorn&age=25' будет в $_GLOBALS['HTTP_RAW_POST_DATA'], если не указан "Content-Type: application/x-www-form-urlencoded\r\n";
	
	


#>>>>>>> Сетевые функции <<<<<<<
	
	// Получаем имя хоста по ip адресу
	$host_name = gethostbyaddr('127.0.0.0');
	
	// Получаем ip-адрес по имени хоста
	$ip_adress = gethostbyname('myhost.local');
	
	// Получаем массив ip-адрессов по имени хоста
	$id_adresses = gethostbynamel('mysite.local');
	
	// Получаем номер порта по имени службы
	$port = getservbyname('http', 'tcp');
	
	// Получаем имя службы по номеру порта
	$service = getservbyport(80, 'tcp');
	
	// Получаем DNS запись для указанного хоста
	$dns_record = dns_get_record('mysite.local');
	
	// Получаем MX запись для указанного хоста
	$dns_record = getmxrr('mysite.local');
	
	// Проверяем имя хоста на существование
	$existsHost = checkdnsrr('mysite.local');
	

#>>>>>>> Работа с графикой <<<<<<<

/**
Библиотека GD2 boutell.com/gd/
Необходимо подключить расширение php_gd2.php
Поддерживаемые форматы: 
	gif (<1.6 и > 2.0.28)
	jpeg (все версии)
	png (> 1.6)

Изображения можно сохранять на сервере
Изображения можно напрямую отдавать клиенту:
<img src="create_image.php">
*/

	// FILE: create_image.php

	// Создание изображения:
	$i = imagecreate(500, 300); // создание изображения 256 цветов
	// или
	$i = imagecreatetruecolor(500, 300); // создание полноцветного изображения
	
	
	// Подготовка к работе:
	imageantialias($i, true); // применить функции сглаживания
	
	// Рисуем текст:
	imagestring($i, 5, 150, 200, 'PHP7', $black); // рисование строки текста горизонтально. 5 - размер шрифта
	imagechar($i, 3, 20, 20, 'PHP7', $black); // рисование символа по горизонтали
	imagettftext($i, 30, 10, 300, 150, $green, 'arial.ttf', 'PHP7'); // наносит текст text поверх изображения, используя TrueType шрифт.
	
	// Создание цветов для изображения:
	$red = imagecolorallocate($i, 255, 0, 0); // станет фоном для картинки, если используем imagecreate()
	$green = imagecolorallocate($i, 0, 255, 0);
	$white = imagecolorallocate($i, 0xFF, 0xFF, 0xFF);
	$black = imagecolorallocate($i, 0, 0, 0);
	
	// Производит заливку:
	imagefill($i, 0, 0, $white); // начиная с заданных координат (верхний левый угол имеет координаты 0, 0)
	
	
	// Рисуем примитивы:
	imagesetpixel($i, 10, 10, $black); // рисует точку (пиксел) на заданных координатах.
	imageline($i, 20, 20, 80, 280, $red); // рисует линию
	imagerectangle($i, 20, 20, 80, 280, $red); // рисует прямоугольник
	imagefilledrectangle($i, 20, 20, 80, 280, $red); // рисует прямоугольник, залитый выбранным цветом
	
	$points = [0, 0, 100, 200, 300, 200];
	imagepolygon($i, $points, 3, $red); // рисуем многоугольник; 3 - количество точек
	
	imageellipse($i, 200, 150, 300, 200, $white); // рисует эллипс (200, 150 - центр, 300, 200 - ширина и высота)
	imagefilledellipse($i, 200, 150, 300, 200, $white); // рисует эллипс, залитый выбранным цветом
	
	imagearc($i, 200, 150, 300, 200, 0, 40, $red); // рисование дуги (200, 150 - центр, 300, 200 - ширина и высота, 0, 40 - градусы начальный и конечный)
	imagefilledarc($i, 210, 160, 300, 200, 0, 90, $red, IMG_ARC_PIE); // рисует дугу, залитый выбранным цветом
	
	
	// Использование существующего изображения:
	$img = imagecreatefromgif('picture.gif');
	$img = imagecreatefrompng('picture.png');
	$img = imagecreatefromjpeg('picture.jpg');
	$img = imagecreatefromstring($string);
	
	
	// Установка толщины линии:
	imagesetthickness($img, 5);
	
	// Использование стилей:
	$style = [$red, $red, $red, $black, $black, $black];
	imagesetstyle($img, $style);
	imageline($img, 20, 20, 80, 280, $red);
	
	// Отдаем изображение:
	header('Content-Type: image/gif');
	imagegif($i, 'test.gif'); // сохраняем в файл без отдачи
	// или
	header('Content-Type: image/png');
	imagepng($i);
	// или
	header('Content-Type: image/jpg');
	imagejpeg($i, '', 90); // 3-й параметр сжатие(75 - по умолчанию)




#>>>>>>> CAPTCHA <<<<<<<

	// FILE: noise-picture.php:
	session_start();
	
	$img = imagecreatefromjpeg('images/noise.jpg');
	$color = imagecolorallocate($img, 64, 64, 64);
	imageantialias($img, true);
	$countChars = 5;
	$randStr = substr(md5(uniqid()), 0, $countChars); // uniqid - возвращает уникальную строчку
	$_SESSION['randStr'] = $randStr;
	
	$x = 20;
	$y = 30;
	$deltaX = 40;
	
	for ($i = 0; $i < $countChars; $i++) {
		$size = rand(16, 30);
		$angle = -30 + rand(0, 60);
		imagettftext($img, $size, $angle, $x, $y, 'fonts/bellb.ttf', $randStr[$i], $color);
		$x += $deltaX;
	}
	
	header('Content-Type: image/jpg');
	imagejpeg($img);

	
	// FILE: registration.php:
	session_start();
	$output = '';
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		if (!isset($_SESSION['randStr'])) {
			$output = 'Включи картинки!';
		} else {
			if ($_SESSION['randStr'] === strtolower($_POST['answer'])) {
				$output = "DONE!";
			} else {
				$output = "ERROR!";
			}
		}
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Регистрация</title>
</head>
<body>
	...
	<?=$output?>
</body>
</html>