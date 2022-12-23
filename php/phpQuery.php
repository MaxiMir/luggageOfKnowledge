<?php
	
	#>>>>> PHPQuery <<<<<#

	header('Content-type:text/html; charset=utf-8');

	require 'phpQuery.php'; // скачать: http://code.google.com/archive/p/phpquery/downloads

	#1:
	$url = 'https://privatbank.ua/';
	$file = file_get_contents($url);

	$doc = phpQuery::newDocument($file);
	$priceBlock = $doc->find('#priceBlock'); // find - поиск элементов в DOM дереве
	$priceBlock = $doc->find('#priceBlock')->text(); // возвращает текстовое содержимое элемента

	#2:
	$url = 'https://kolesa.ru/news';
	$file = file_get_contents($url);

	$doc = phpQuery::newDocument($file);

	foreach ($doc->find('.articles-container . post-excerpt') as $article) {
		$article = pq($article); // оборачиваем DOM element в объект phpQuery
		$imgSrc = $article->find('.img-cont img')->attr('src'); // получаем значение src у картинки
		$text = $article->find('.pd-cont')->html(); // получаем весь HTML код элемента
	}	


	$article->find('.cat')->remove(); // удаление блока по селектору
	$article->find('.cat')->prepand('Категория'); // добавление содержимого перед блоком
	$article->find('.cat')->wrap('<div class="category">')->after('Дата ' . date('Y-m-d H:i:s')); // wrap - обернуть содержимое в заданный элемент; after - добавление содержимого после блока

	function getContent($url)
	{
		$ch = curl_init($url); // инициализируем соединение
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // для следования любому заголовку Location отправленному сервером в ответе
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // для возврата передачи в качестве строки вместо прямого вывода в браузер
		$content = curl_exec($ch);
		curl_close($ch); // закрываем соедение

		return $content;
	}


	function parser($url, $start, $end) 
	{
	    if ($start <= $end) {
		    $file = getContent($url);
		    $doc = phpQuery::newDocument($file);
		    
		    foreach ($doc->find('.articles-container .post-excerpt') as $article) {
		        $article = pq($article);
		        
		        $img = $article->find('.img-cont img')->attr('src');
		        $text = $article->find('.pd-cont')->html();

		        echo "<img src='"
		    }

		    $nextPage = $doc->find('.pages-nav .current')->next()->attr('href');

		    if (!empty($nextPage)) {
		    	$start++;
		    	parser($nextPage, $start, $end);	
		    }	    	
	    }	
	}

	$url = 'http://www.kolesa.ru/news';
	$start = 0;
	$end = 5;
	parser($url, $start, $end);



	# >>>>> CURL <<<<< #

	$url = 'http://www.kolesa.ru/news';
	$ch = curl_init(); // инициализируем соединение
	$fp = fopen('file.txt', 'w'); // открываем файл на запись

	curl_setopt($ch, CURLOPT_URL, $url); // настраиваем соединение
	curl_setopt($ch, CURLOPT_HEADER, true); // включаем в вывод заголовки страницы
	curl_setopt($ch, CURLOPT_NOBODY, true); // исключает тело ответа из вывода (только заголовки)
	curl_setopt($ch, CURLOPT_FILE, $fp); // сохранение вывода в файл
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // для следования любому заголовку Location отправленному сервером в ответе
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // для возврата передачи в качестве строки вместо прямого вывода в браузер
	curl_exec($ch); // выполняет запрос
	curl_close($ch); // закрываем соедение



	# >>>>> АВТОРИЗАЦИЯ <<<<< #

	function getContent($url, $data = [])
	{
		$ch = curl_init($url); // инициализируем соединение
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // для следования любому заголовку Location отправленному сервером в ответе
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // для возврата передачи в качестве строки вместо прямого вывода в браузер
		curl_setopt($ch, CURLOPT_POST, true); // для использования HTTP POST
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data)); // отправляет переданные данные методом POST
		curl_setopt($ch, CURLOPT_COOKIEJAR, __DIR__ . "/cookie.txt"); // файл, куда пишутся куки после закрытия коннекта, например после curl_close()
		curl_setopt($ch, CURLOPT_COOKIEFILE, __DIR__ . "/cookie.txt"); // файл, откуда читаются куки
		$content = curl_exec($ch);
		curl_close($ch); // закрываем соедение

		return $content;
	}

	$urlAuth = 'http://wp.loc/wp-login.php'; // страница авторизации
	$url = 'http:///wp.loc/zakrytaya-statia/'; // страница доступная авторизованнмым пользователям
	$authData = [ // данные для авторизации
		'log' => 'admin', // логин
		'pwd' => '123',	// пароль
		'rememberme' => 'on', // отмеченный чекбокс
	];


	$data = getContent($urlAuth, $authData); // авторизируемся => true/false
	$data = getContent($url); // получаем данные со страницы для авторизированных пользователей


	# >>>>> ООП <<<<< #
	class Parser
	{
		private $url;
		private $ch;

		public function __construct($print = false)
		{
			$this->ch = curl_init();

			if (!$print) {
				curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, true);
			}
		}

		public function set($name, $value)
		{
			curl_setopt($this->ch, $name, $value);	

			return $this; // возвращаем текущий объект
		}

		public function exec($url)
		{
			curl($this->ch, CURLOPT_URL, $url);

			return curl_exec($this->ch);
		}

		public function __destructor()
		{
			curl_close($this->ch);
		}
	}

	// Использование:
	$parser = new Parser();
	$parser->set(CURLOPT_POST, true)
		->set(CURLOPT_POSTFIELDS, http_build_query($authData))
		->set(CURLOPT_COOKIEJAR, __DIR__ . "/cookie.txt")
		->set(CURLOPT_COOKIEFILE, __DIR__ . "/cookie.txt");
	$dataAuth = $parser->exec($urlAuth);
	$content = $parser->exec($url);