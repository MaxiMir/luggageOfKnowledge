<?
	 
	 
	 #@@@ Подключение модулей @@@#:
	 
	 # Old school:
	 CModule::IncludeModule("iblock");
	 CModule::IncludeModuleEx("intervolga.tips");
	 
	 # D7:
	 use Bitrix\Main\Loader;
	 
	 Loader::includeModule("iblock");
	 Loader::includeSharewareModule("intervolga.tips");
	 
	 
	 
	 #@@@ Локализация @@@#:
	 
	 # Old school:
	 IncludeTemplateLangFile(__FILE__);
	 echo GetMessage("INTERVOLGA_TIPS.TITLE");
	 
	 # D7:
	 use Bitrix\Main\Localization\Loc;
	 
	 Loc::loadMessages(__FILE__);
	 echo Loc::getMessage("INTERVOLGA_TIPS.TITLE");
	 
	 
	 
	 #@@@ Настройки модулей @@@#:
	 
	 # Old school:
	 COption::SetOptionString("main", "max_file_size", "1024");
	 $size = COption::GetOptionInt("main", "max_file_size");
	 COption::RemoveOption("main", "max_file_size", "s2");
	 
	 # D7:
	 use Bitrix\Main\Config\Option;
	 
	 Option::set("main", "max_file_size", "1024");
	 $size = Option::get("main", "max_file_size");
	 Option::delete("main", array(
			 "name" => "max_file_size",
			 "site_id" => "s2"
		 )
	 );
	 
	 
	 
	 #@@@ Кеширование @@@#:
	 
	 # Old school:
	 $cache = new CPHPCache();
	 if ($cache->InitCache($cacheTime, $cacheId, $cacheDir)) {
		  $result = $cache->GetVars();
	 } elseif ($cache->StartDataCache()) {
		  $result = [];
		  // ...
		  if ($isInvalid) {
				$cache->AbortDataCache();
		  }
		  // ...
		  $cache->EndDataCache($result);
	 }
	 
	 # D7
	 $cache = Bitrix\Main\Data\Cache::createInstance();
	 if ($cache->initCache($cacheTime, $cacheId, $cacheDir)) {
		  $result = $cache->getVars();
	 } elseif ($cache->startDataCache()) {
		  $result = [];
		  // ...
		  if ($isInvalid) {
				$cache->abortDataCache();
		  }
		  // ...
		  $cache->endDataCache($result);
	 }
	 
	 
	 
	 #@@@ Языковые константы @@@#:
	 // FILE: header.php + footer.php:
	 
	 # DEPRECATED:
	 IncludeTemplateLangFile(__FILE__); #1
	 GetMessage('CFT_MAIN'); // #2 например, <?= GetMessage('CFT_SEARCH') ? >
	 
	 # D7:
	 use \Bitrix\Main\Localization\Loc;
	 
	 Loc::loadMessages(__FILE__); // #1
	 Loc::getMessage('CFT_MAIN'); // #2
	 
	 
	 
	 #@@@ События @@@#
	 
	 /*
	 	AddEventHandler , RemoveEventHandler , RegisterModuleDependences , UnRegisterModuleDependences , GetModuleEvents
		Теперь за кратко- и долгосрочную регистрацию обработчиков событий отвечает один класс: Bitrix\Main\EventManager .
	 */
	 
	 # Old school:
	 $handler = AddEventHandler(
		 "main",
		 "OnUserLoginExternal",
		 [
			 "Intervolga\\Test\\EventHandlers\\Main",
			 "onUserLoginExternal"
		 ]
	 );
	 RemoveEventHandler(
		 "main",
		 "OnUserLoginExternal",
		 $handler
	 );
	 RegisterModuleDependences(
		 "main",
		 "OnProlog",
		 $this->MODULE_ID,
		 "Intervolga\\Test\\EventHandlers",
		 "onProlog"
	 );
	 UnRegisterModuleDependences(
		 "main",
		 "OnProlog",
		 $this->MODULE_ID,
		 "Intervolga\\Test\\EventHandlers",
		 "onProlog"
	 );
	 
	 $handlers = GetModuleEvents("main", "OnProlog", true);
	 
	 
	 # D7:
	 use Bitrix\Main\EventManager;
	 
	 $handler = EventManager::getInstance()->addEventHandler(
		 "main",
		 "OnUserLoginExternal",
		 [
			 "Intervolga\\Test\\EventHandlers\\Main",
			 "onUserLoginExternal"
		 ]
	 );
	 EventManager::getInstance()->removeEventHandler(
		 "main",
		 "OnUserLoginExternal",
		 $handler
	 );
	 EventManager::getInstance()->registerEventHandler(
		 "main",
		 "OnProlog",
		 $this->MODULE_ID,
		 "Intervolga\\Test\\EventHandlers",
		 "onProlog"
	 );
	 EventManager::getInstance()->unRegisterEventHandler(
		 "main",
		 "OnProlog",
		 $this->MODULE_ID,
		 "Intervolga\\Test\\EventHandlers",
		 "onProlog"
	 );
	 $handlers = EventManager::getInstance()->findEventHandlers("main", "OnProlog");
	 
	 
	 /*
	 	Bitrix\Main\EventManager , так же как Bitrix\Main\Page\Asset , реализует паттерн Одиночка, обращаться к нему нужно через getInstance().
		! Важное замечание: в обработчики, зарегистрированные с помощью addEventHandler в качестве аргумента будет передан объект события
		( Bitrix\Main\Event ). Если хотите, чтобы передавались старые добрые аргументы, нужно использовать addEventHandlerCompatible.
		Аналогично с registerEventHandler и registerEventHandlerCompatible.
	 */
	 
	 
	 
	 #@@@ Файловая структура: @@@#
	 
	 # Old school
	 CheckDirPath($_SERVER["DOCUMENT_ROOT"] . "/foo/bar/baz/");
	 RewriteFile(
		 $_SERVER["DOCUMENT_ROOT"] . "/foo/bar/baz/1.txt",
		 "hello from old school!"
	 );
	 DeleteDirFilesEx("/foo/bar/baz/");
	 
	 # D7:
	 use Bitrix\Main\Application;
	 use Bitrix\Main\IO\Directory;
	 use Bitrix\Main\IO\File;
	 
	 Directory::createDirectory(
		 Application::getDocumentRoot() . "/foo/bar/baz/"
	 );
	 File::putFileContents(
		 Application::getDocumentRoot() . "/foo/bar/baz/1.txt",
		 "hello from D7"
	 );
	 Directory::deleteDirectory(
		 Application::getDocumentRoot() . "/foo/bar/baz/"
	 );
	 
	 //  DeleteDirFilesEx принимал путь от корня сайта, а его аналог принимает абсолютный путь к файлу от корня сервера.
	 /*
	 	Вместо $_SERVER["DOCUMENT_ROOT"] сейчас можно использовать Bitrix\Main\Application::getDocumentRoot() .
	 */
	 
	 
	 
	 #@@@ Исключения: @@@#
	 
	 # Old school:
	 global $APPLICATION;
	 $APPLICATION->ResetException();
	 $APPLICATION->ThrowException("Error");
	 //...
	 if ($exception = $APPLICATION->GetException()) {
		  echo $exception->GetString();
	 }
	 
	 # D7:
	 use Bitrix\Main\SystemException;
	 
	 try {
		  // ...
		  throw new SystemException("Error");
	 } catch (SystemException $exception) {
		  echo $exception->getMessage();
	 }
	 
	 
	 
	 #@@@ Отладка: @@@#
	 
	 # Old school:
	 define("LOG_FILENAME", $_SERVER["DOCUMENT_ROOT"] . "/bitrix/log-intervolga.txt");
	 
	 AddMessage2Log($_SERVER);
	 echo "<pre>" . mydump($_SERVER) . "</pre>";
	 
	 # D7:
	 use Bitrix\Main\Diag\Debug;
	 
	 Debug::dumpToFile($_SERVER);
	 # or:
	 Debug::writeToFile($_SERVER);
	 
	 Debug::dump($_SERVER);
	 
	 
	 # методы для измерения времени в D7:
	 use Bitrix\Main\Diag\Debug;
	 
	 Debug::startTimeLabel("foo");
	 foo();
	 Debug::endTimeLabel("foo");
	 
	 Debug::startTimeLabel("bar");
	 bar();
	 Debug::endTimeLabel("bar");
	 
	 print_r(Debug::getTimeLabels());
	 
	 
	 
	 #@@@ Почтовые события: @@@#
	 
	 # Old school:
	 CEvent::Send(
		 "NEW_USER",
		 "s1",
		 array(
			 "EMAIL" => "info@intervolga.ru",
			 "USER_ID" => 42
		 )
	 );
	 
	 # D7:
	 use Bitrix\Main\Mail\Event;
	 
	 Event::send(
		 [
			 "EVENT_NAME" => "NEW_USER",
			 "LID" => "s1",
			 "C_FIELDS" => [
				 "EMAIL" => "info@mm.ru",
				 "USER_ID" => 42
			 ],
		 ]
	 );
	 
	 
	 
	 #@@@ Работа с cookie: @@@#:
	 // В старом ядре было 2 метода: для создания и для получения кук. Теперь всё стало гораздо глубже: задавать куки нужно через класс “ответа сервера” – Bitrix\Main\HttpResponse , получать их нужно через класс “запроса к серверу” – Bitrix\Main\HttpRequest .
	 
	 # Old school:
	 global $APPLICATION;
	 $APPLICATION->set_cookie("TEST", 42, false, "/", "example.com");
	 // Cookie будет доступна только на следующем хите!
	 echo $APPLICATION->get_cookie("TEST");
	 
	 # D7:
	 use Bitrix\Main\Application;
	 use Bitrix\Main\Web\Cookie;
	 
	 $cookie = new Cookie("TEST", 42);
	 $cookie->setDomain("example.com");
	 Application::getInstance()->getContext()->getResponse()->addCookie($cookie);
	 // Cookie будет доступна только на следующем хите!
	 echo Application::getInstance()->getContext()->getRequest()->getCookie("TEST");
	 
	 // Также работа с куками может вестись силами класса Bitrix\Main\Web\HttpClient , но это совсем другая история .
	 //Важное замечание: запись куки, добавленной через D7, произойдет только при подключении эпилога (там вызывается метод Bitrix\Main\HttpResponse::flush() )
	 
	 
	 
	 #@@@ Работа со ссылками @@@#:
	 # Old school:
	 global $APPLICATION;
	 $redirect = $APPLICATION->GetCurPageParam("foo=bar", array("baz"));
	 
	 # D7:
	 use Bitrix\Main\Application;
	 use Bitrix\Main\Web\Uri;
	 
	 $request = Application::getInstance()->getContext()->getRequest();
	 $uriString = $request->getRequestUri();
	 $uri = new Uri($uriString);
	 $uri->deleteParams(["baz"]);
	 $uri->addParams(["foo" => "bar"]);
	 $redirect = $uri->getUri();
	 
	 
	 
	 #@@@ Запросы к БД @@@#:
	 
	 # Old school:
	 global $DB;
	 $record = $DB->Query("select 1+1;")->Fetch();
	 AddMessage2Log($record);
	 
	 # D7:
	 use Bitrix\Main\Application;
	 use Bitrix\Main\Diag\Debug;
	 
	 $record = Application::getConnection()
		 ->query("select 1+1;")
		 ->fetch();
	 
	 
	 
	 
	 #@@@ Настройка параметров ядра @@@#:
	 // FILE: /bitrix/php_interface/dbconn.php - параметры для старого ядра
	 // FILE: /bitrix/.settings.php - параметры для нового ядра (API \Bitrix\Main\Config):
	 /*
	  * Секция кэширование ключ - 'cache'
	  * Секуция обработка ошибок ключ - 'exception_handling'
	  * Секция подключение к БД ключ - 'connections'
	  */
	 
	 # Файлы папки local:
	 /* /local
	  *   /activities
	  *   /components
	  *   /gadjets
	  *   /modules
	  *   /php_interface
	  *      /user_lang
	  *      init.php
	  *   /templates
	  */
	 
	 
	 #@@@ Компоненты на классах: @@@#
	 
	 // FILE : /bitrix/components/academy/class/class.php:
	 class classComponents extends CBitrixComponent
	 {
		  function var1()
		  {
				$arResult['var1'] = 'Отработал метод var1 компонента class';
				
				return $arResult;
		  }
		  
		  function executeComponent() // необходимо определить, запускается при выполнении компонента
		  {
				$this->arResult = array_merge($this->arResult, $this->var1());
				
				$this->includeComponentTemplate(); // подключение шаблона
		  }
	 }
	 
	 // FILE : /bitrix/components/academy/class/templates/.default/template.php:
	 if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
		  die();
	 }
	 
	 echo 'pre>';
	 var_dump($arResult);
	 echo '</pre>';
	 
	 /*/ =>
	 array(1) {
		  ['var1'] => string(61) 'Отработал метод var1 компонента class'
	 }
	 */
	 
	 // FOLDER: /bitrix/components/academy/ создаем папку class.extends + создаем/копируем файлы из /templates/ + .description.php + .parameters.php + class.php
	 
	 // FILE: /bitrix/components/academy/class.extends/class.php:
	 CBitrixComponent::includeComponentClass("academy:class"); // передаем название компонента, от котого наследуемся
	 
	 class classComponentsExtends extends classComponents
	 {
		  function var2()
		  {
				$arResult['var2'] = 'Отработал метод var2 компонета class.extends';
				
				return $arResult;
		  }
		  
		  function executeComponent()
		  {
				$this->arResult = array_merge($this->arResult, $this->var2());
				
				parent::executeComponent(); // вызов родительского метода
				
		  }
	 }
	 
	 
	 // FILE : /bitrix/components/academy/class.extends/templates/.default/template.php:
	 if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
		  die();
	 }
	 
	 var_dump($arResult);
	 
	 /* =>
	 array(1) {
		  [var2] => string(61) 'Отработал метод var2 компонета class.extends'
		  [var1] => string(61) 'Отработал метод var1 компонента class'
	 }
	 */
	 
	 
	 #@@@ lib: #@@@
	 // FOLDER: /local/modules/academy.oop/lib - для методов модуля. Для них действует autoload
	 
	 /*
	 - components
		  - classcomponents.php
	 - main.php
	 - options.php
	 - result.php
	 
	 # 1 класс - 1 файл
	 # Имя файла = Имя класса
	 */
	 
	 
	 // FILE: /local/modules/academy.oop/lib/maim.php:
	 namespace Academy\Oop;
	 
	 // FOLDER academy.oop
	 
	 class main
	 {
		  const MODULE_ID = 'academy.oop';
		  
		  static function GetPatch($notDocumentRoot = false)
		  {
				if (!$notDocumentRoot) {
					 return dirname(__DIR__);
				}
				
				return str_ireplace($_SERVER["DOCUMENT_ROOT"], '', dirname(__DIR__));
		  }
		  
		  static function isVersionD7()
		  {
				return CheckVersion(SM_VERSION, '14.00.00');
		  }
	 }
	 
	 
	 // FILE: /local/modules/academy.oop/lib/components/classcomponents.php:
	 namespace Academy\Oop\components;
	 
	 class classComponents
	 {
		  function var1()
		  {
				$arResult['var1'] = 'Отработал метод var1 компонента class';
				
				return $arResult;
		  }
	 }
	 
	 
	 // FILE: /local/modules/academy.oop/include.php:
	 \Bitrix\main\Loader::registerAutoLoadClasses('academy.oop', [
		 '\Academy\Oop\globalMenu' => '/lib/old.php' // добавляем в автозагрузку файл old.php; ключ - полное имя класса.
	 ]);
	 
	 
	 #@@@ Отказ от работы с глобальными переменными: @@@#
	 // Получили объект приложения:
	 $application = \Bitrix\Main\Application::getInstance();
	 
	 // Получили объект контекста:
	 $context = $application->getContext();
	 
	 // Получаем объект, содержащий серверные данные:
	 $server = $context->getServer();
	 
	 // Путь до корня сайта:
	 $server->getDocumentRoot();
	 
	 // SERVER_NAME
	 $server->getServerName();
	 
	 // $_SERVER[HTTP_X_REAL_IP]
	 $server->get('HTTP_X_REAL_IP');
	 
	 // Получаем объект, содержащий данные запроса:
	 $request = $context->getRequest();
	 
	 // $_REQUEST["some_name"] вариант 1:
	 $request["some_name"];
	 
	 // $_REQUEST["some_name"] вариант 2:
	 $request->get("some_name");
	 
	 
	 #@@@ Исключения: @@@#
	 // FILE: /bitrix/.settings.php:
	 // ключ 'debug' - режим откладки
	 try {
		  throw new \Bitrix\Main\ArgumentTypeException('Аргумент, который генерирует исключение', 'Тип аргумента');
	 } catch (Exception $e) {
		  echo 'Перехваченное исключение';
		  var_dump($e->getRequiredType()); // тип аргумента
	 }
	 
	 
	 #@@@ ORM: @@@#
	 
	 # 1 старое ядро:
	 require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");
	 
	 $by = 'ID'; // поле для сортировки
	 $order = 'sort'; // сортировка
	 $filter = ['ID' => '1']; // фильтр
	 $result = CGroup::GetList($by, $order, $filter);
	 
	 echo 'Группа пользователей по фильтру:<br>';
	 while ($row = $result->fetch()) {
		  var_dump($row);
	 }
	 
	 # 2 старое ядро:
	 СModule::Include('iblock');
	 
	 $result = CIBlockElement::GetList(['ID' => 'ASC'], // сортировка. Можно не указывать (false)
		 ['ID' => '1'], // aильтр
		 false, // группировка
		 false, // постраничная навигация
		 ['NAME'] // необходимые поля
	 );
	 
	 echo 'Элемент инфоблока по фильтру: <br>';
	 while ($row = $result->fetch()) {
		  var_dump($row);
	 }
	 
	 # 3 D7:
	 #Настройки > Производительность > Таблицы и добавить GET-параметр orm=y. Адрес будет выглядеть так: /bitrix/admin/perfmon_tables.php?lang=ru&orm=y
	 # После этого для любой таблицы в БД сайта можно автоматически создавать ORM-класс
	 
	 
	 Booktable::getList([
		 'select' => ..., // имена полей, которые необходимо получить в результате
		  'filter' => ..., // описание фильтра для WHERE и HAVING
		  'group' => ..., // явное указание полей, по которым нужно группироваь результат
		  'order' => ..., // параметры сортировки
		  'limit' => ..., // количество записей
		  'offset' => ..., // cмещение для limit
		  'runtime' => ..., // динамически определенные поля
	 ]);
	 
	 # 4 D7:
	 $result = \Bitrix\Main\GroupTable::getList([
		 'select' => ['NAME'],
		 'filter' => ['ID' => '1']
	 ]);
	 
	 
	 # 5 D7:
	 use Bitrix\Form\ResultAnswerTable;
	 use Bitrix\Main\Loader;
	 
	 require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
	 
	 Loader::includeModule("form");
	 
	 $dbRes = ResultAnswerTable::getList(
		 [
			 "select" => [
				 "ID",
				 "USER_TEXT"
			 ],
			 "filter" => [
				 "FORM_ID" => 2
			 ]
		 ]
	 );
	 
	 echo "<pre>";
	 print_r($dbRes->fetchAll());
	 echo "</pre>";
	 
	 
	 #@@@  Application / Context / Request / Server: @@@#
	 
	 use Bitrix\Main\Application,
		 Bitrix\Main\Context,
		 Bitrix\Main\Request,
		 Bitrix\Main\Server;
	 
	 $docRoot = Application::getDocumentRoot();
	 $context = Context::getCurrent();
	 
	 $request = $context->getRequest(); // объект Request
	 $server = $context->getServer();   // объект Server
	 $siteId = $context->getSite();     // ID текущего сайта ("s1")
	 $langId = $context->getLanguage(); // ID текущего языка ("ru")
	 
	 
	 ### Bitrix\Main\Request ###
	 $request = $context->getRequest();
	 // Или более краткая форма:
	 $request = Context::getCurrent()->getRequest();
	 /** Параметры запроса */
	 $value = $request->get("param");       // получение параметра GET или POST
	 $value = $request["param"];            // получение параметра GET или POST
	 $value = $request->getQuery("param");  // получение GET-параметра
	 $values = $request->getQueryList();    // получение списка GET-параметров
	 $value = $request->getPost("param");   // получение POST-параметра
	 $values = $request->getPostList();     // получение списка POST-параметров
	 $value = $request->getFile("param");   // получение загруженного файла
	 $values = $request->getFileList();     // получение списка загруженных файлов
	 $value = $request->getCookie("param"); // получение значения кука
	 $values = $request->getCookieList();   // получение списка кукисов
	 
	 /** Данные о запросе */
	 $method = $request->getRequestMethod(); // получение метода запроса
	 $flag = $request->isGet();              // true - GET-запрос, иначе false
	 $flag = $request->isPost();             // true - POST-запрос, иначе false
	 $flag = $request->isAjaxRequest();      // true - AJAX-запрос, иначе false
	 $flag = $request->isHttps();            // true - HTTPS-запрос, иначе false
	 
	 /** Данные о запрошенной странице */
	 $flag = $request->isAdminSection();            // true - находимся в админке, иначе false
	 $requestUri = $request->getRequestUri();       // Запрошенный адрес (напр. "/catalog/category/?param=value")
	 $requestPage = $request->getRequestedPage();   // Запрошенная страница (напр. "/catalog/category/index.php")
	 $rDir = $request->getRequestedPageDirectory();// Директория запрошенной страницы (напр. "/catalog/category")
	 
	 ### Bitrix\Main\Server ###
	 
	 $server = $context->getServer();
	 // Или более краткая форма:
	 $server = Context::getCurrent()->getServer();
	 
	 $server->getDocumentRoot(); // DOCUMENT_ROOT
	 $server->getPersonalRoot(); // BX_PERSONAL_ROOT ("/bitrix")
	 $server->getHttpHost();     // HTTP_HOST
	 $server->getServerName();   // SERVER_NAME
	 $server->getServerAddr();   // SERVER_ADDR
	 $server->getServerPort();   // SERVER_PORT
	 $server->getRequestUri();   // REQUEST_URI
	 $server->getRequestMethod();// REQUEST_METHOD
	 $server->getPhpSelf();      // PHP_SELF
	 $server->getScriptName();   // SCRIPT_NAME
	 $server->get('HTTP_ACCEPT');// Любое значение из $_SERVER
	 
	 
	 
	 
	 
	 
	 
	 




