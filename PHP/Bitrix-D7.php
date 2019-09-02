<?

# Языковые константы:
// FILE: header.php + footer.php:
// DEPRECATED 
IncludeTemplateLangFile(__FILE__); #1
GetMessage('CFT_MAIN'); // #2 например, <?= GetMessage('CFT_SEARCH') ? >

// D7
use \Bitrix\Main\Localization\Loc; 
Loc::loadMessages(__FILE__); // #1
Loc::getMessage('CFT_MAIN'); // #2

# Настройка параметров ядра:
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

# Компоненты на классах:

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
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

echo 'pre>';
var_dump($arResult);
echo '</pre>';

// => 
array(1) {
    [var1] => string(61) 'Отработал метод var1 компонента class'
}

// FOLDER: /bitrix/components/academy/ создаем папку class.extends + создаем/копируем файлы из /templates/ + .description.php + .parameters.php + class.php

// FILE: /bitrix/components/academy/class.extends/class.php:
CBitrixComponent::includeComponentClass("academy:class"); // передаем название компонента, от котого наследуемся

class classComponentsExtends class classComponents
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
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

echo 'pre>';
var_dump($arResult);
echo '</pre>';

// => 
array(1) {
    [var2] => string(61) 'Отработал метод var2 компонета class.extends'
    [var1] => string(61) 'Отработал метод var1 компонента class'
}



# lib:
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
namespace Academy\Oop; // FOLDER academy.oop

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

    static fucntion isVersionD7()
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


# Отказ от работы с глобальными переменными:
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
$request["some_name"]

// $_REQUEST["some_name"] вариант 2:
$request->get("some_name");



# Исключения:
// FILE: /bitrix/.settings.php: 
// ключ 'debug' - режим откладки
try {
    throw new \Bitrix\Main\ArgumentTypeException('Аргумент, который генерирует исключение',
    'Тип аргумента');
} сatch(Exception $e) {
    echo 'Перехваченное исключение';
    var_dump($e->getRequiredType()); // тип аргумента
}



# ORM:
# 1 старое ядро:
require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");

$by = 'ID'; // поле для сортировки
$order = 'sort'; // сортировка
$filter = ['ID' => '1']; // фильтр
$result = CGroup::GetList($by, $order, $filter); 

echo 'Группа пользователей по фильтру:<br>';
while($row = $result->fetch()) {
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
while($row = $result->fetch()) {
    var_dump($row);
}

# 3 D7:
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
\Bitrix\Main\Loader::includeModule('iblock');

$result = \Bitrix\Iblock\ElementTable::getList([
    'select' => ['NAME'],
    'filter' => ['ID' => '1']
]);


# 6 D7:
# Настройки > Производительность > Таблицы
# ?orm=y   
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



# Application / Context / Request / Server:
use Bitrix\Main\Application,
    Bitrix\Main\Context,
    Bitrix\Main\Request,
    Bitrix\Main\Server;

$docRoot = Application::getDocumentRoot();
echo '<pre>' . print_r($docRoot, true) . '</pre>';

$context = Context::getCurrent();
//echo '<pre>' . print_r($context, true) . '</pre>';

$request = $context->getRequest(); // объект Request
//echo '<pre>'.print_r($request, true).'</pre>';
$server = $context->getServer();   // объект Server
//echo '<pre>'.print_r($server, true).'</pre>';
$siteId = $context->getSite();     // ID текущего сайта ("s1")
//echo '<pre>'.print_r($siteId, true).'</pre>';
$langId = $context->getLanguage(); // ID текущего языка ("ru")
//echo '<pre>'.print_r($langId, true).'</pre>';

/** Bitrix\Main\Request */

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

/** Bitrix\Main\Server */

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




