<?

### Глобальные фильтры на всякие случаи жизни https://camouf.ru/blog-note/4717/


#@ БОЛЕЕ ПОДРОБНЫЙ ВЫВОД ОШИБКИ FILE: .setting.php поставить debug => true


#@ ИСКЛЮЧИТЬ ОБРАЩЕНИЕ ПО ССЫЛКЕ К ШАБЛОНУ:
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

// К таким файлам относится все, что работает внутри продукта, например: шаблоны сайтов, шаблоны компонента, файлы .parameters.php и .description.php.


#@ ТЕКУЩАЯ СТРАНИЦА:
$APPLICATION->GetCurPage(false); // => относительный урл


#@ КАРТА САЙТА:
// Главный модуль -> вкладка "Настройки" -> скролл до "Карта сайта" - выбрать из каких меню генерировать ссылки


#@ ДОБАВЛЕНИЕ СВОЙСТВ РАЗДЕЛА:
// "SECTION_USER_FIELDS" => ["UF_TEXT_BEFORE"]


#@ ДОБАВЛЕНИЕ СВОЙСТВ ТОВАРА:
// "LIST_PROPERTY_CODE" => ["PRICE", "OPT_PR"]

#@ Вывод свойства типа HTML/TEXT:
echo htmlspecialcharsBack($arFields['PROPERTY_КОД_СВОЙСТВА_VALUE']["TEXT"]);

#@ Настройка вывода цены:
// URN: /bitrix/admin/currency_edit.php?ID=RUB&lang=ru&tabControl_active_tab=edit2


#@ Подключение классов в init.php:
CModule::AddAutoloadClasses(
    '', // не указываем имя модуля
    [
        // ключ - имя класса, значение - путь относительно корня сайта к файлу с классом
        'CMyClassName1' => '/path/cmyclassname1file.php',
        'CMyClassName2' => '/path/cmyclassname2file.php',
    ]
);



?>


    <head>
        <title><? $APPLICATION->showTitle() ?></title> <!--ВЫВОД Title: -->

        <?

        use Bitrix\Main\Page\Asset;

        $APPLICATION->showHead(); // Метод предназначен для вывода в шаблоне сайта основных полей тега <head>: мета-теги Content-Type, robots, keywords, description; стили CSS; скрипты, заданные через CMain::AddHeadScript

        Asset::getInstance()->addCss(SITE_TEMPLATE_PATH . '/css/style.css'); // подключение стилей. SITE_TEMPLATE_PATH - путь к активному шаблону сайта
        $APPLICATION->SetAdditionalCss(); // устаревший метод подключения стилей
        CJSCore::Init(['jquery']); // подключение библиотек из ядра битрикса
        Bitrix\Main\UI\Extension::load('ui.vue'); // Подключение Vue JS (с января 2019 входит в ядро)
        Asset::getInstance()->addJs(SITE_TEMPLATE_PATH . '/js/jquery-1.11.1.min.js');
        $APPLICATION->AddHeadScript(); // устаревший метод подключения скриптов
        Asset::getInstance()->addString('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1>');
        Asset::getInstance()->addString('<link href="//fonts.googleapis.com/css?family=Monda" rel="stylesheet" type="text/css">');

        $APPLICATION->SetPageProperty('title', 'Заголовок окна браузера');
        $APPLICATION->SetTitle('Отзывы');
        ?>
    </head>
    <body>
<? if ($GLOBALS['USER']->IsAdmin()): ?>
    <div id="panel"><? $APPLICATION->ShowPanel(); ?></div> <!-- ПОКАЗ АДМИН ПАНЕЛИ -->
<? endif; ?>

    <h1><? $APPLICATION->showTitle(false) ?></h1> <!-- ВЫВОД H1 -->
<?


// FILE: /local/php_interface/init.php - здесь можно определить пользовательские функции, к-л. логику, которыми хотели бы пользоваться в шаблоне, до его подключения.
define("DEFAULT_TEMPLATE_PATH",
    "/local/templates/.default"); // теперь можно вместо SITE_TEMPLATE_PATH использовать DEFAULT_TEMPLATE_PATH
define('DEFAULT_TEMPLATE_PATH', BX_PERSONAL_PATH . '/templates/.default'); // путь до папки .default в ядре bitrix

function debug($data)
{
    echo "<pre>" . print_r($data) . '<pre>';
}


// FILE: /local/templates/TEMPLATE_NAME:
debug($arResult); // используем функцию из init.php
// Код шаблона


#@ ДОБАВИТЬ РЕДАКТОР ЭЛЕМЕНТА В ВИЗУАЛЬНОМ РЕДАКТОРЕ: ?>
    <div class="box1" id="<?= $this->GetEditAreaId($arItem['ID']); ?>">
        <!-- код элемента в цикле -->
    </div>
<?


#@ ИЗМЕНЕНИЕ/УДАЛЕНИЕ ЭЛЕМЕНТОВ В ВИЗУАЛЬНОМ РЕДАКТОРЕ: ?>
<? foreach ($arResult['ITEMS'] as $arItem): ?>
    <? $this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'],
        CIBlock::GetArrayByID($arItem['iBLOCK_ID'], 'ELEMENT_EDIT'));
    $this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'],
        CIBlock::GetArrayByID($arItem['iBLOCK_ID'], 'ELEMENT_DELETE'),
        ['CONFIRM' => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')]); ?>
    <div class="some-elem-class" id="<?= $this->GetEditAreaId($arItem['ID']) ?>">
        <!-- Код шаблона элемента -->
    </div>
<? endforeach; ?>
<?


#@ FILE: parameters.php, result_modifier.php, component_epilog - позволяют дополнить логику компонента
// FILE: component_epilog.php (можно создать в папке с шаблоном) будет подключаться после подключения файла с шаблоном. Например, сюда можно поместить подключение компонента "комментарии", для того чтобы он не кэшировался
// FILE: result_modifier.php - сюда можно, например поместить функцию-обработчик элементов массива $arResult:
foreach ($arResult['ITEMS'] as &$item) {
    $item['PREVIEW_TEXT'] = mbCutString($item['PREVIEW_TEXT'], 50);
    // mbCutString - пользовательская функция из init.php
}

unset($item); // поскольку массив передаем по ссылке


#@ ВЫВОД ПАГИНАЦИИ: ?>
<? if ($arParams['DISPLAY_BOTTOM_PAGER']): ?>
    <?= arResult['NAV_STRING']; ?>
<? endif; ?>
<?


#@ ТРАНСЛИТЕРАЦИЯ:
$params = [
    "max_len" => "100",
    "change_case" => "L",
    "replace_space" => "_",
    "replace_other" => "_",
    "delete_repeat_replace" => "true",
    "use_google" => "false",
];

$code = CUtil::translit($row[], "ru", $params);


/** КОМПОНЕНТЫ:
 * - Включаемая область
 *
 * - Меню (Настройки->Настройки продукта->Настройки модулей->Управление структурой->Настройки модуля:Настройки для сайтов)
 * Возможно подключение определенного шаблона для определенной страницы - выбрать тип условия -> Для папки или файла и условие относительный url (наприм. /blog)
 *
 * - новости: bitrix:news
 * - список новостей: bitrix:news.list
 * - новость: bitrix:news.detail
 *
 * - структура разделов: bitrix:catalog.section.list
 *
 * - форма поиска: bitrix:search.form (так же необходимо создать раздел search c файлом index.php)
 * - стандартная страница поиска: bitrix:search.page
 * - форма обратной связи: bitrix:main.feedback
 * В админке страница переиндексация -> переиндексировать, если поиск работает некорректно.
 *
 * - облако тегов: bitrix:search.tags.cloud
 * - форма обратной связи: bitrix: main.feedback
 *
 * - регистрация: bitrix:system.auth.registration
 * - настраиваемая регистрация: bitrix:main.register
 * - параметры пользователя: bitrix:main.register
 * - system.auth.form
 * - system.auth.authorize
 * - system.auth.forgotpasswd
 * - system.auth.changepasswd
 *
 * - карта сайта: bitrix:site.map
 *
 * - комментарии: bitrix: catalog.comments
 *
 * - каталог: bitrix:catalog
 * - элементы раздела: bitrix:catalog.section
 * - элемент: bitrix:catalog.item
 * - корзина: bitrix:sale.basket.basket
 * - умный фильтр: bitrix:smart.filter
 */


#@ RESIZE ИЗОБРАЖЕНИЙ В ШАБЛОНЕ:
$file = CFILE::ResizeImageGet(
    $arItem['PREVIEW_PICTURE'],
    ['width' => 100, 'height' => 100],
    BX_RESIZE_IMAGE_EXACT, // масштабирует в прямоугольник с сохранением пропорций, обрезая лишнее
    true
);
$file['src']; // путь до новой картинки


#@ ДОБАВЛЕНИЕ КОММЕНТАРИЕВ:
/** Используется компонент bitrix: catalog.comments
 * В вызове компонента добавить: "AJAX_POST" => "Y"
 * СЕРВИСЫ -> БЛОГИ -> Нужный_Инфблок изменить -> вкладка "Права на доступ":
 * Права на комментарии: Все посетители - чтение, Авторизованные - запись
 */


#@ ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ:
/*
     В свойствах инфоблока создать новое свойство:
     Название галерея | тип файл  | множественное - отметить | код - GALLERY | тип загружаемых файлов - изображения
     [PROPERTIES] => [GALLERY] => [PROPERTY_VALUE_ID] => [44, 45, 46, 47] // ID - картинок
*/
?>
<? if (!empty($arResult['PROPTERTIES']['GALLERY']['VALUE'])): ?>
    <?php foreach ($arResult['PROPTERTIES']['GALLERY']['VALUE'] as $photo): ?>
        <img src="<?= CFILE::GetPath($photo); ?>" alt="" width="200">
        <!-- $photo - содержит ID, по нему получем путь к картинке -->
    <?php endforeach; ?>
<? endif; ?>
<?


#@ АВТОРИЗАЦИЯ:
// создаем FILE: /auth/index.php
define('NEED_AUTH', true);
// если инициализировать данную константу значением "true" до подключения пролога, то будет проведена проверка на авторизованность пользователя. Если пользователь не авторизован, то ему будет предложена форма авторизации.

require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php');
$APPLICATION->SetTitle('Login');

// Здесь подключаем компонент bitrix:system.auth.form
require($_SERVER['DOCUMENT_ROOT'] . 'bitrix/footer.php');

/*
 Компонент: форма авторизации bitrix:system.auth.form:
    Страница регистрации: /auth/registration.php
    Страница забытого пароля: /auth/
    Страница профиля: /auth/profile.php
 + Показывать ошибки (необходима контстанта NEED_AUTH)
 Компонент: настраиваемая регистрация

 В админке в главном модуле -> вкладка Авторизация:
 можно поставить чекбокс "Разрешить авторизацию через внешние сервисы"
 Так же задать:
 Страница регистрации (для системного авторизации): /auth/registration.php
 Позволять ли пользователям регистрироваться самостоятельно?  - отметить
 Использовать CAPTCHA при регистрации
 E-mail является обязательным полем - отметить
 Запрашивать подтверждение регистрации по E-mail - отметить
 Проверять E-mail на уникальность при регистрации - отметить
 */


// FILE: local/templates/.default/components/bitrix/system.auth.form/template: ?>
<!-- .... -->
<p>Добро пожаловать: <?= $arResult['USER_NAME'] ?></p>
<p>Ваш профиль: <a href="<?= $arResult['PROFILE_URL'] ?>">ссылка</a></p>
<p>Выход: <a href="<?= $APPLICATION->GetCurPageParam('logout=yes',
        ['login', 'logout', 'register', 'forgot_password', 'change_passwrod']) ?>">
        <?= GetMessage('AUTH_LOGOUT_BUTTON') ?></a>
</p>
<!-- .... --><?


// создаем FILE: /auth/registration.php
// Вставляем компонент настраиваемая регистрация - bitrix:main.register

// создаем FILE: /auth/profile.php
// Вставляем компонент параметры пользователя - bitrix:main.register

// изменяем шаблоны остальных компонентов


#@ ПОДКЛЮЧЕНИЕ CSS И JS В ШАБЛОНЕ:
$this->addExternalCss("https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css");
$this->addExternalJS("https://code.jquery.com/ui/1.12.1/jquery-ui.js");


#@ Настройка ЧПУ в инфорблоке:
/*
     URL страницы информационного блока:
     /catalog/

     URL страницы раздела:
     /catalog/#SECTION_CODE_PATH#/

     URL страницы детального просмотра:
     /catalog/#SECTION_CODE_PATH#/#ELEMENT_CODE#/

     # Настройка ЧПУ в компоненте:
     URL страницы информационного блока:
     /catalog/

     URL страницы раздела:
     #SECTION_CODE_PATH#/

     URL страницы детального просмотра:
     #SECTION_CODE_PATH#/#ELEMENT_CODE#/
*/


#@ ПОЛУЧЕНИЕ ДАННЫХ ПО МЕТАМ:
use \Bitrix\Iblock\InheritedProperty\SectionValues;

$seoData = new SectionValues($arParams['IBLOCK_ID'], $arResult['SECTION_ID']);
$seoProps = $seoData->getValues();
$APPLICATION->SetPageProperty("title", $seoProps["SECTION_META_TITLE"]);
$APPLICATION->SetPageProperty("description", $seoProps["SECTION_META_DESCRIPTION"]);


#@ ОБНОВЛЕНИЕ МЕТ:
function get_min_price_in_product($id)
{
    $arSelect = [
        "ID",
        "PROPERTY_PRICE",
    ];

    $arFilter = [
        "ID" => $id,
        "IBLOCK_ID" => IntVal(5),
        "ACTIVE_DATE" => "Y",
        "ACTIVE" => "Y",
        ">CATALOG_PRICE_1" => "0",
    ];

    $res = CIBlockElement::GetList(["CATALOG_PRICE_1" => 'ASC'], $arFilter, false, ['nTopCount' => 1],
        $arSelect);
    $row = $res->GetNext();

    return number_format($row['CATALOG_PRICE_1'], 0, '', ' ');
}

$obj = new CIBlockSection();
$arSect = $obj->GetList(
    [],
    ['IBLOCK_ID' => $arResult['IBLOCK_ID'], 'ID' => $arResult['IBLOCK_SECTION_ID']],
    false,
    ['ID', 'UF_PROD_M_TITLE', 'UF_PROD_M_DESCRIPT'],
    false
);

$rsSect = $arSect->Fetch();

if ($rsSect['UF_PROD_M_TITLE']) {
    $min_price = is_array($arResult['PROPERTIES']['SCLAD']['VALUE']) ? get_min_price_in_product($arResult['PROPERTIES']['SCLAD']['VALUE']) : null;
    $meta_title = $rsSect['UF_PROD_M_TITLE'];
    $meta_title = preg_replace('/#H1#/', $arResult["PROPERTIES"]["MENU"]["VALUE"], $meta_title);

    if ($min_price) {
        $meta_title = preg_replace('/#MIN_PRICE#/', $min_price, $meta_title);
    }

    $APPLICATION->SetPageProperty("title", $meta_title);
    $APPLICATION->SetPageProperty("og:title", $meta_title);
}

if ($rsSect['UF_PROD_M_DESCRIPT']) {
    $meta_description = $rsSect['UF_PROD_M_DESCRIPT'];
    $meta_description = preg_replace('/#H1#/', $arResult["PROPERTIES"]["MENU"]["VALUE"], $meta_description);

    $APPLICATION->SetPageProperty("description", $meta_description);
    $APPLICATION->SetPageProperty("og:description", $meta_description);
}


#@ ПОЛУЧЕНИЕ СВОЙСТВ ИНФОБЛОКА:
$properties = CIBlockProperty::GetList([], ["IBLOCK_ID" => 1]);
while ($propData = $properties->GetNext()) {
    ['CODE' => $code, 'NAME' => $name] = $propData;
}



/* ДАННЫЕ О ПОЛЬЗОВАТЕЛЕ: */
$userID = $USER->GetID();
$userData = CUser::GetByID($userID)->Fetch();

["NAME" => $name, "LAST_NAME" => $lastName] = $userData;


#@ ИЗМЕНЕНИЕ arResult + ДОБАВЛЕНИЕ ЦЕН И СВОЙСТВ:
// FILE: --template-component--/result_modifier.php:
$arSelect = [
    'ID',
    'IBLOCK_ID',
    'PROPERTY_INBOX',
    'CATALOG_GROUP_10'
]; // необходимо определить какие цены используются (по дефолту CATALOG_GROUP_1)
$arFilter = ['IBLOCK_ID' => 31, 'ID' => $offerID];
$dbEl = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);

if ($obEl = $dbEl->Fetch()) {
    $arResult['offerData'][$offerID]['Единиц в коробке'] = $obEl['PROPERTY_INBOX_VALUE'];
    $arResult['offerData'][$offerID]['Цена'] = $obEl['CATALOG_PRICE_10'];
}



#@ ОТПРАВКА НА ПОЧТУ + ЗАПИСЬ В ИНФОБЛОК:
require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_before.php';

use Bitrix\Main\{Application, Context};

$result = 'error';
$connection = Application::getConnection();
$context = Context::getCurrent();
$request = $context->getRequest();

if (!$request->isPost()) {
    return;
}

$prodName = $request->getPost("prodName");
parse_str($request->getPost("formData"), $formData);
['rName' => $uName, 'rEmail' => $uEmail, 'rComment' => $uCommet] = $formData;

if (!($uName && $uEmail && $prodName)) {
    echo 'Некоректно заполнены поля формы';
    return;
}

#@ ОТПРАВКА ПИСЬМА:
$arEventFields = [
    'AUTHOR' => $uName,
    'AUTHOR_EMAIL' => $uEmail,
    'PRODUCT_NAME' => $prodName,
    'COMMENT' => $uCommet
];

CEvent::Send("AP_CALCULATOR", 's1', $arEventFields, "Y", "", $imgIDs); // imgIDs - массив с картинками



#@ ЗАПИСЬ В ИНФОБЛОК:
CModule::IncludeModule("iblock");

$el = new CIBlockElement;

$props = [
    'UNAME' => $uName,
    'UEMAIL' => $uEmail,
    'PRODNAME' => $prodName,
    'UCOMMENT' => $uCommet
];

$arLoadProductArray = [
    "IBLOCK_ID" => 43,
    "NAME" => "{$uName}: $prodName",
    "PROPERTY_VALUES" => $props,
];

$PRODUCT_ID = $el->Add($arLoadProductArray);



#@ ЗАГРУЗКА КАРТИНКИ:
function uploadImg()
{
    if (empty($_FILES['file'])) {
        return;
    }

    $arrFile = [
        "name" => $_FILES['file']['name'],
        "size" => $_FILES['file']['size'],
        "tmp_name" => $_FILES['file']['tmp_name'],
        "type" => $_FILES['file']['type'],
        "old_file" => "",
        "del" => "Y",
        "MODULE_ID" => "iblock"
    ];

    return CFILE::SaveFile($arrFile, "userPic");
}


#@ ВЫВОД КАРТИНОК ИЗ ПОЛЬЗОВАТЕЛЬСКОГО СВОЙСТВА (тип файл - множественный): ?>
<? foreach ($arResult['UF_ADDITIONAL_GALLERY'] as $imgInfo): ?>
    <? $imgSrc = CFILE::GetPath($imgInfo) ?>
    <div class="col-md-3 col-sm-4 col-xs-6">
        <img src="<?= $imgSrc ?>" alt="">
    </div>
<? endforeach; ?>
<?


$dbResult->result->num_rows; // количество найденных записей





#@@@ Наработки: @@@#

use Bitrix\Main\{Loader, Context};

Loader::includeModule("iblock");
Loader::includeSharewareModule("forum");


###### @ HELPERS @ ######

### распечатываем любое количество аргументов ###
function dbg(...$args)
{
    echo '<pre>';

	foreach ($args as $arg) {
		$varType = gettype($arg);

		echo "VAR TYPE: {$varType} <br>";
		print_r($arg);
	}

    echo '</pre>';
}


### обрезаем строку на заданную длину с добавлением маркера ###
function getTrimLine($str, $length = 100, $trimMarker = '...')
{
    return mb_strimwidth($str, 0, $length, $trimMarker);
}


###  данные из кэша (при истекшем $timeSeconds - добавляет в кэш): ###
function returnResultCache($timeSeconds, $cacheId, $funcName, $arCallbackParams = [])
{
    $result = false;
    $obCache = new CPHPCache();
    $cachePath = '/' . SITE_ID . '/' . $cacheId;

    if ($obCache->InitCache($timeSeconds, $cacheId, $cachePath)) {
        $vars = $obCache->GetVars();
        $result = $vars['result'];
    } elseif ($obCache->StartDataCache()) {
        $result = $funcName($arCallbackParams);
        $obCache->EndDataCache(['result' => $result]);
    }

    return $result;
}


###### @ BREADCRUMBS @ ######

###  CODE раздела || false: ###
function getCurrentSection($urn)
{
    $requestUrnData = explode('/', $urn);
    $urnData = array_filter($requestUrnData, function ($partUrb) {
        return $partUrb != '';
    });

    return end($urnData);
}


###  ID раздела по символьному коду: ###
function getSectionIDByUrn($urn)
{
    $code = getCurrentSection($urn);

    if (!$code) {
        return false;
    }

    $arSort = [];
    $arFilter = [
        "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
        "CODE" => $code,
        "ACTIVE" => "Y",
    ];

    $sectionDBData = CIBlockSection::GetList($arSort, $arFilter);

    if ($sectionData = $sectionDBData->Fetch()) {
        return $sectionData["ID"];
    }

    return false;
}


### проверяет на "искусственный" раздел: ###
function isMadeSection($sectionID)
{
    return in_array($sectionID, MADE_CATALOG_IDS);
}


###  ID родительского "искусственного" раздела || false: ###
function getParentMadeSectionID($sectionID)
{
    $arSort = [];
    $arSelect = [
        "ID",
        "UF_SHOW_IN_SECT_MENU",
    ];
    $arFilter = [
        "ID" => $sectionID,
        "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
        "GLOBAL_ACTIVE" => "Y",
    ];

    $sectionDBData = CIBlockSection::GetList($arSort, $arFilter, false, $arSelect);

    if ($arSection = $sectionDBData->GetNext()) {
        return $arSection["UF_SHOW_IN_SECT_MENU"];
    }

    return false;
}


### получить подразделы с учетом "искусственных" разделов: ###
function getSubsectionsData($sectionID, $excludedIDs = [])
{
    $sectionsData = [];
    $isMadeSection = isMadeSection($sectionID);
    $keyFilterParentSection = $isMadeSection ? "UF_SHOW_IN_SECT_MENU" : "SECTION_ID";

    $arSort = [];
    $arSelect = [
        "ID",
        "NAME",
        "SECTION_PAGE_URL",
        "IBLOCK_SECTION_ID"
    ];
    $arFilter = [
        "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
        "GLOBAL_ACTIVE" => "Y",
        $keyFilterParentSection => $sectionID,
    ];

    if ($excludedIDs) {
        $arFilter['!ID'] = $excludedIDs;
    }

    $sectionsDBData = CIBlockSection::GetList($arSort, $arFilter, false, $arSelect);

    while ($sectionData = $sectionsDBData->GetNext()) {
        $sectionsData[] = $sectionData;
    }

    return $sectionsData;
}


### данные раздела: ###
function getSectionDataByID($sectionID)
{
    $sectionDBData = CIBlockSection::GetByID($sectionID);

    return $sectionDBData->GetNext();
}


### данные элемента: ###
function getElementDataByID($iBlockID, $elementID, $props = [])
{
    if (!$props) {
        $elementDBData = CIBlockElement::GetByID($elementID);

        return $elementDBData->GetNext();
    }

    $arSelect = array_merge($props, ["ID", "IBLOCK_ID", "NAME"]);

    $arFilter = [
        "IBLOCK_ID" => $iBlockID,
        "ACTIVE" => "Y",
        "ID" => $elementID
    ];

    $prodDBData = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);

    return $prodDBData->GetNext();
}


###### @ MAIN MENU AND LEFT MENU @ ######

### данные для меню каталога (корневые разделы): ###
function getMainCatalogLinks($isMainMenu = true)
{
    global $APPLICATION;

    $arFilter = [
        "ACTIVE" => "Y",
    ];

    if ($isMainMenu) {
        $arFilter["!UF_SHOW_MENU_CHILDS"] = false;
    }

    $isGetAssocArr = $isMainMenu ? false : true;

    $menuSectionsData = $APPLICATION->IncludeComponent(
        "adpro:menu.sections",
        "",
        [
            "AR_FILTER" => $arFilter,
            "IS_SEF" => "Y",
            "SEF_BASE_URL" => "/categories/",
            "SECTION_PAGE_URL" => "#SECTION_CODE_PATH#/",
            "DETAIL_PAGE_URL" => "#SECTION_CODE_PATH#/#ELEMENT_CODE#",
            "IBLOCK_TYPE" => "category",
            "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
            "CACHE_TYPE" => "A",
            "CACHE_TIME" => "1800",
            "GET_ASSOC_ARR" => $isGetAssocArr,
        ],
        false
    );

    return $isMainMenu ? $menuSectionsData : linkCatalogLinks($menuSectionsData);
}


### привязывает "искусственные" разделы: ###
function linkCatalogLinks($catalogLinksData)
{
    return array_reduce($catalogLinksData, function ($acc, $linkData) {
        ["ID" => $id, "UF_SHOW_IN_SECT_MENU" => $parentID] = $linkData;

        if (!$parentID) {
            if (!isset($acc[$id])) {
                $acc[$id] = [];
            }

            $acc[$id]["DATA"] = $linkData;
        } else {
            if (!isset($acc[$parentID])) {
                $acc[$parentID] = [];
                $acc[$parentID]['CHILD'] = [];
            }

            $acc[$parentID]['CHILD'][] = $linkData;
        }

        return $acc;
    }, []);
}


### данные для top меню каталога DEPTH 2,3: ###
function getMadeCatalogChildLinks()
{
    $menuData = [];
    $fromIBlockMap = [];
    $counter = 0;
    $arSort = [];
    $arSelect = [
        "ID",
        "NAME",
        "SECTION_PAGE_URL",
        "UF_SHOW_IN_SECT_MENU",
    ];
    $arFilter = [
        "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
        "!UF_SHOW_IN_SECT_MENU" => false,
        "GLOBAL_ACTIVE" => "Y",
    ];

    $sectionsDBData = CIBlockSection::GetList($arSort, $arFilter, false, $arSelect);

    while ($sectionData = $sectionsDBData->GetNext()) {
        [
            "ID" => $id,
            "NAME" => $name,
            "SECTION_PAGE_URL" => $sectionPageURL,
            "UF_SHOW_IN_SECT_MENU" => $parentSectionID,
        ] = $sectionData;

        if (!isset($menuData[$parentSectionID])) {
            $menuData[$parentSectionID] = [];
            $fromIBlockMap[$parentSectionID] = ++$counter;
        }

        $fromBlock = $fromIBlockMap[$parentSectionID];

        $menuData[$parentSectionID][] = [
            $name,
            $sectionPageURL,
            [$sectionPageURL],
            [
                "FROM_IBLOCK" => $fromBlock,
                "IS_PARENT" => "",
                "DEPTH_LEVEL" => 2,
            ],
        ];

        $catalogLink3lvl = getMadeCatalogChildLinks3Lvl($id, $fromBlock);
        array_push($menuData[$parentSectionID], ...$catalogLink3lvl);
    }

    return $menuData;
}


### данные для top меню каталога DEPTH 3: ###
function getMadeCatalogChildLinks3Lvl($sectionID, $fromBlock)
{
    $menuData = [];
    $arSort = [];
    $arSelect = [
        "NAME",
        "SECTION_PAGE_URL",
    ];
    $arFilter = [
        "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
        "SECTION_ID" => $sectionID,
        "GLOBAL_ACTIVE" => "Y",
    ];

    $sectionsDBData = CIBlockSection::GetList($arSort, $arFilter, false, $arSelect);

    while ($sectionData = $sectionsDBData->GetNext()) {
        [
            "NAME" => $name,
            "SECTION_PAGE_URL" => $sectionPageURL,
        ] = $sectionData;

        $menuData[] = [
            $name,
            $sectionPageURL,
            [$sectionPageURL],
            [
                "FROM_IBLOCK" => $fromBlock,
                "IS_PARENT" => "",
                "DEPTH_LEVEL" => 3,
            ],
        ];
    }

    return $menuData;
}


### полные данные для top меню каталога: ###
function getCatalogTopMenuLinks()
{
    $menuLinks = [];
    $catalogMainLinks = getMainCatalogLinks();
    $catalogSecondLinks = getMadeCatalogChildLinks();

    foreach ($catalogMainLinks as $linkData) {
        $sectionID = end($linkData);
        $menuLinks[] = $linkData;

        if (!array_key_exists($sectionID, $catalogSecondLinks)) {
            continue;
        }

        $childLinkData = $catalogSecondLinks[$sectionID];
        array_push($menuLinks, ...$childLinkData);
    }

    return $menuLinks;
}


### данные для left меню каталога DEPTH 2 (без "искусственных" разделов): ###
function getCatalogChildLinks2Lvl($linksData)
{
    $menuData = [];

    foreach ($linksData as $sectionID => $sectionData) {
        if (!isMadeSection($sectionID)) {
            $menuData[$sectionID] = getSubsectionsData($sectionID);
        }
    }

    return $menuData;
}


### добавляет данные по дочерним разделам: ###
function appendCatalogChild($linksData, $childLinksData)
{

    foreach ($childLinksData as $parentID => $childData) {
        if (!isset($linksData[$parentID])) {
            continue;
        }

        $linksData[$parentID]['CHILD'] = $childData;
    }

    return $linksData;
}

### полные данные для left меню каталога: ###
function getCatalogLeftMenuLinks()
{
    $linksData = getMainCatalogLinks(false);
    $childLinksData = getCatalogChildLinks2Lvl($linksData);

    return appendCatalogChild($linksData, $childLinksData);
}


### данные по брендам: ###
function getBrands()
{
    $brands = [];

    $arFilter = [
        "IBLOCK_ID" => BRAND_I_BLOCK_ID,
        'ACTIVE' => 'Y',
    ];
    $arSelect = [
        'NAME',
        'DETAIL_PAGE_URL',
    ];

    $res = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);

    while ($arFields = $res->GetNext()) {
        ['NAME' => $NAME, 'DETAIL_PAGE_URL' => $DETAIL_PAGE_URL] = $arFields;

        $brands[] = compact('NAME', 'DETAIL_PAGE_URL');
    }

    return $brands;
}


### данные меню по брендам: ###
function getBrandsLinks()
{
    $brandLink = [
        [
            "Бренды",
            "/vendors/",
            ["/vendors/"],
            [
                "FROM_IBLOCK" => 2,
                "IS_PARENT" => 1,
                "DEPTH_LEVEL" => 1,
            ],
        ],
    ];

    $brands = getBrands();

    return array_reduce($brands, function ($acc, $linkData) {
        $acc[] = [
            $linkData['NAME'],
            $linkData['DETAIL_PAGE_URL'],
            [$linkData['DETAIL_PAGE_URL']],
            [
                "FROM_IBLOCK" => 2,
                "IS_PARENT" => "",
                "DEPTH_LEVEL" => 2,
            ],
        ];

        return $acc;
    }, $brandLink);
}


### данные меню: ###
function getMenuLinks()
{
    $aMenuLinksExt = getCatalogTopMenuLinks();
    $brandLinks = getBrandsLinks();

    return array_merge($aMenuLinksExt, $brandLinks);
}

### @ FUNCTIONS WITH CACHE @ ###

### данные меню из кэша: ###
function getMenuLinksFromCache()
{
    $cacheTime = 3600 * 6;
    $cacheID = "menuLinks";

    return returnResultCache($cacheTime, $cacheID, 'getMenuLinks');
}

### данные для left меню из кэша: ###
function getCatalogLeftMenuLinksFromCache()
{
    $cacheTime = 3600 * 6;
    $cacheID = "catalogLeftMenuLinks";

    return returnResultCache($cacheTime, $cacheID, 'getCatalogLeftMenuLinks');
}


###  все разделы из кэша: ###
function getAllSectionsFromCache($params)
{
    $cacheTime = 3600 * 6;
    $cacheID = "allCatalogSections";

    return returnResultCache($cacheTime, $cacheID, 'getAllSections',
        $params);
}


###  данные отзывов с текущими товарами из кэша: ###
function getResponseDataWithProdsFromCache($prodsDataForResponse, $sectionCode)
{
    $cacheTime = 3600;
    $cacheID = "responseDataWithProds{$sectionCode}";

    return returnResultCache($cacheTime, $cacheID, 'getResponseDataWithProds', $prodsDataForResponse);
}

// использование:
$aMenuLinks = getMenuLinksFromCache();

// и:
$arResult['ITEMS'] = getCatalogLeftMenuLinksFromCache();


#@ СВЯЗКА ОТЗЫВОВ С ФОРУМА И ТОВАРОВ:
// FILE: /responses/index.php:
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

$APPLICATION->SetTitle("Последние отзывы о товарах");


$urn = $APPLICATION->GetCurPage();
$sectionParams = [
    "iBlockID" => CATALOG_I_BLOCK_ID,
    "arSelect" => ["NAME", "CODE"]
];

$sectionCode = getCurrentSectionCodeInReviews($urn);
$isSortByCount = isSortByCount();
$sectionsData = getAllSectionsFromCache($sectionParams);

$GLOBALS['FORUM_RESPONSE'] = ['!PROPERTY_FORUM_MESSAGE_CNT' => false];

$APPLICATION->IncludeComponent(
    "bitrix:catalog.section",
    "_response_elements",
    [
        'IBLOCK_TYPE' => 'catalog',
        'IBLOCK_ID' => CATALOG_I_BLOCK_ID,
        'SECTION_ID' => '',
        'SECTION_CODE' => $sectionCode,
        'FILTER_NAME' => 'FORUM_RESPONSE',
        // ..
        'ADDITIONAL_DATA' => compact('urn', 'isSortByCount', 'sectionsData')
    ],
    false,
    ["HIDE_ICONS" => "Y"]
);


// FILE: /local/php_interface/include/functions.php:
use Bitrix\Main\{Loader, Context};

Loader::includeModule("iblock");
Loader::includeSharewareModule("forum");

###### @ REVIEWS @ ######

### получаем SECTION_CODE раздела каталога: ###
function getCurrentSectionCodeInReviews($urn)
{
    $requestUrnData = explode('/', $urn);
    $urnData = array_filter($requestUrnData, function ($partUrb) {
        return $partUrb != '';
    });

    return count($urnData) != 2 ? '' : $urnData[2];
}


###  проверяем на необходимость сортировки по количеству отзывов к товару: ###
function isSortByCount()
{
    $request = Context::getCurrent()->getRequest();

    return $request->getQuery("sort") === "count";
}


###  товары выбранного раздела ###
function getSectionProducts($sectionCode)
{
    $productsData = [];

    $arFilter = [
        "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
        'ACTIVE' => 'Y',
        "SECTION_CODE" => $sectionCode
    ];
    $arSelect = [
        'ID',
        'NAME',
        'DETAIL_PAGE_URL',
        'PREVIEW_PICTURE',
    ];

    $res = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);

    while ($prodData = $res->GetNext()) {
        [
            'ID' => $id,
            'NAME' => $name,
            'DETAIL_PAGE_URL' => $urn,
            'PREVIEW_PICTURE' => ['SRC' => $src],
        ] = $prodData;

        $productsData[$id] = compact('id', 'name', 'urn', 'src');
    }

    return $productsData;
}


###  все разделы инфоблока: ###
function getAllSections($params)
{
    $sectionsData = [];
    $arSort = [];
    $functionName = __FUNCTION__;

    [
        "iBlockID" => $iBlockID,
        "arSelect" => $arSelect,
    ]
        = $params;

    if (!$iBlockID) {
        throw new Exception("Необходимо передать iBlockID в {$functionName}!");
    }

    $arSelect = $arSelect ?? ["ID", "NAME", "SECTION_PAGE_URL"];

    $arFilter = [
        "IBLOCK_ID" => $iBlockID,
        "GLOBAL_ACTIVE" => "Y",
    ];

    $sectionsDBData = CIBlockSection::GetList($arSort, $arFilter, false, $arSelect);

    while ($sectionData = $sectionsDBData->Fetch()) {
        $sectionsData[] = $sectionData;
    }

    return $sectionsData;
}


###  данные товаров в нужном формате для работы с отзывами: ###
function getProdsDataForResponse($itemsData)
{
    return array_reduce($itemsData, function ($acc, $item) {
        [
            'ID' => $id,
            'NAME' => $name,
            'DETAIL_PAGE_URL' => $urn,
            'PREVIEW_PICTURE' => ['SRC' => $src],
        ]
            = $item;

        $acc[$id] = compact('id', 'name', 'urn', 'src');

        return $acc;
    }, []);
}


###  данные отзывов с текущими товарами: ###
function getResponseDataWithProds($itemsData)
{
    $responsesData = [];
    $arSort = ["ID" => "DESC"];
    $productsID = array_keys($itemsData);
    $arFilter = [
        "FORUM_ID" => FORUM_ID,
        "APPROVED" => "Y",
        "@PARAM2" => $productsID,
    ];

    $responseDBData = CForumMessage::GetListEx($arSort, $arFilter);

    while ($responseData = $responseDBData->Fetch()) {
        [
            "PARAM2" => $id,
            "AUTHOR_NAME" => $author,
            "POST_MESSAGE_HTML" => $message,
            "POST_DATE" => $postDate,
        ]
            = $responseData;

        if (!array_key_exists($id, $responsesData)) {
            $responsesData[$id] = [];
            $responsesData[$id]['product'] = $itemsData[$id];
            $responsesData[$id]['response'] = compact('author', 'message', 'postDate');
            $responsesData[$id]['responseCount'] = -1;
        }

        $responsesData[$id]['responseCount']++;
    }

    return $responsesData;
}


### отсортированные по убыванию количества отзывов к товарам данные отзывов: ###
function sortResponseDataWithProdsByCount($itemsData)
{
    usort($itemsData, function ($a, $b) {
        return $b['responseCount'] - $a['responseCount'];
    });

    return $itemsData;
}


###  количество отзывов к товару: ###
function getProductResponseCount($productID)
{
    $arSort = [];
    $arFilter = [
        "FORUM_ID" => FORUM_ID,
        "APPROVED" => "Y",
        "@PARAM2" => $productID,
    ];

    return CForumMessage::GetListEx($arSort, $arFilter, true);
}


### данные отзывов о товаре: ###
function getProductResponseData($productID)
{
    $prodResponses = [];
    $arSelect = [
        "ID",
        "IBLOCK_ID",
        "NAME",
        "PREVIEW_TEXT",
        "PROPERTY_USER_ID",
        "PROPERTY_USER_NAME",
        "PROPERTY_RATING",
        "PROPERTY_PRODUCT",
        "PROPERTY_CATALOG_SECTION"
    ];
    $arFilter = [
        "IBLOCK_ID" => RESPONSE_I_BLOCK_ID,
        "ACTIVE" => "Y",
        "PROPERTY_PRODUCT" => $productID
    ];

    $prodResponseDBData = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);

    while ($prodResponse = $prodResponseDBData->GetNext()) {
        $prodResponses[] = $prodResponse;
    }

    return $prodResponses;
}


### рейтинг товара: ###
function getProductRating($productID)
{
    $productResponseData = getProductResponseData($productID);
    $countResponses = sizeof($productResponseData);

    if (!$countResponses) {
        return;
    }

    $sumRating = array_reduce($productResponseData, function ($acc, $responseData) {
        ['PROPERTY_RATING_VALUE' => $rating] = $responseData;

        return $acc + (int)$rating;
    }, 0);

    return round($sumRating / $countResponses, 2);
}


// FILE: /component-template/result_modifier.php:
[
    "ITEMS" => $items,
    "SECTION_CODE" => $sectionCode
] = $arResult;

[
    "ADDITIONAL_DATA" => [
        "isSortByCount" => $isSortByCount
    ]
] = $arParams;

if (!$items) {
    return;
}

$prodsDataForResponse = getProdsDataForResponse($items);
$responseDataWithProds = getResponseDataWithProdsFromCache($prodsDataForResponse, $sectionCode);
$arResult['ITEMS'] = !$isSortByCount ? $responseDataWithProds : sortResponseDataWithProdsByCount($responseDataWithProds);


// /component-template/template.php:
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

$this->setFrameMode(true);

[
    "ITEMS" => $items,
    "NAME" => $sectionName,
    "SECTION_PAGE_URL" => $sectionURN,
] = $arResult;

$countItems = count($items);

[
    "SECTION_CODE" => $sectionCode,
    "ADDITIONAL_DATA" => [
        "urn" => $urn,
        "isSortByCount" => $isSortByCount,
        "sectionsData" => $sectionsData
    ]
] = $arParams;

$obParser = new CTextParser;
?>

<? if ($sectionsData): ?>
    <section id="sectionData" class="sectionData">
        <div class="dropdown">
            <div class="select">
                <span>Другие разделы с отзывами</span>
                <i class="fa fa-chevron-left"></i>
            </div>
            <div class="dropdown-menu">
                <? foreach ($sectionsData as $sectionData): ?>
                    <?
                    [
                        "NAME" => $name,
                        "CODE" => $code
                    ] = $sectionData;

                    if ($sectionCode === $code) {
                        continue;
                    }
                    ?>
                    <div class="dropdown-menu__elem">
                        <a href="/reviews/<?= $code ?>/" class="dropdown-menu__link">
                            <?= $name ?>
                        </a>
                    </div>
                <? endforeach; ?>
            </div>
        </div>
    </section>
<? endif; ?>

<? if ($countItems): ?>
    <h2><?= $sectionName ?> отзывы</h2>

    <div class="response-panel">
        <div class="response-panel__count">Найдено отзывов: <b><?= $countItems ?></b></div>
        <div class="response-panel__sort">
            Сортировка:
            <a href="<?= $urn ?>" class="<?= $isSortByCount ? '' : 'link--disabled' ?>">
                по дате
            </a>
            <a href="<?= $urn ?>?sort=count" class="<?= !$isSortByCount ? '' : 'link--disabled' ?>">
                по количеству отзывов
            </a>
        </div>
    </div>


    <div class="responses">
        <div class="response__item response__item--main">
            <div class="response__img"></div>
            <div class="response__text">
                Текст отзыва
            </div>
            <div class="response__info response__info--main">Дата</div>
            <div class="response__count response__count--main">Отзывы</div>
        </div>

        <? foreach ($items as $item): ?>
            <div class="response__item">
                <?
                [
                    'product' => [
                        'id' => $id,
                        'name' => $name,
                        'src' => $src,
                        'urn' => $urn
                    ],
                    'response' => [
                        'author' => $author,
                        'message' => $message,
                        'postDate' => $postDate
                    ],
                    'responseCount' => $responseCount
                ] = $item;

                $messageHTML = $obParser->convertText($message); // для отображения смайлов
                ?>

                <div class="response__img">
                    <a href="<?= $urn ?>" title="<?= $name ?>">
                        <img src="<?= $src ?>" alt="<?= $name ?>'">
                    </a>
                </div>
                <div class="response__text">
                    <div class="response__link">
                        <a href="<?= $urn ?>/reviews/#reviewTab" title="<?= $name ?>">
                            <?= $name ?>
                        </a>
                        <? if ($sectionName && $sectionURN): ?>
                            [
                            <a href="<?= $sectionURN ?>" title="<?= $sectionName ?>">
                                <?= $sectionName ?>
                            </a>
                            ]
                        <? endif; ?>
                    </div>
                    <div class="response__content">
                        <p><?= $messageHTML ?></p>
                    </div>
                </div>
                <div class="response__info">
                    <span class="response__date"><?= ConvertDateTime($postDate, 'YYYY-MM-DD') ?></span>
                    <span class="response__author"><?= $author ?></span>
                </div>
                <div class="response__count">
                    <a href="<?= $urn ?>/reviews/#reviewTab" title="Читать остальные отзывы"
                       class="response__link-with-img">[ <?= $responseCount ?> ]</a>
                </div>
            </div>
        <? endforeach; ?>
    </div>

    <div
            class="bottom_nav <?= $arParams["DISPLAY_TYPE"]; ?>"
            <?= ($arParams["AJAX_REQUEST"] == "Y" ? "style='display: none; '" : ""); ?>
    >
        <?
        if ($arParams["DISPLAY_BOTTOM_PAGER"] == "Y") {
            echo $arResult["NAV_STRING"];
        }
        ?>
    </div>
<? endif; ?>


<?
#@ УДАЛЕНИЕ SEO МЕТАТЕГОВ У ЭЛЕМЕНТОВ:
CModule::IncludeModule('iblock');

function cleanProductsSeoMeta($blockID, $ids)
{
    foreach ($ids as $id) {
        $iPropTemplates = new \Bitrix\Iblock\InheritedProperty\ElementTemplates ($blockID, $id);
        $iPropTemplates->set(
            [
                "ELEMENT_META_TITLE" => "",
                "ELEMENT_META_KEYWORDS" => "",
                "ELEMENT_META_DESCRIPTION" => "",
            ]
        );

    }
}

#@ УДАЛЕНИЕ SEO МЕТАТЕГОВ У РАЗДЕЛОВ:
function cleanSectionSeoMeta($blockID, $ids)
{
    foreach ($ids as $id) {
        $iPropTemplates = new \Bitrix\Iblock\InheritedProperty\SectionTemplates ($blockID, $id);
        $iPropTemplates->set(
            [
                "SECTION_META_TITLE" => "",
                "SECTION_META_KEYWORDS" => "",
                "SECTION_META_DESCRIPTION" => "",
                "ELEMENT_META_TITLE" => "",
                "ELEMENT_META_KEYWORDS" => "",
                "ELEMENT_META_DESCRIPTION" => "",
            ]
        );
    }
}

#@ ВЫВОД в bitrix:form.result.list данных с форм с датой (result_modifier.php):
$arrResults = $arResult['arrResults'];
$answersData = $arResult['arrAnswers'];

if (!$arrResults || !$answersData) {
    return;
}

$arResult['ITEMS'] = array_map(function ($answerData, $userData) {
    [
        "47" => [
            "47" => ["USER_TEXT" => $name]
        ],
        "49" => [
            "49" => ["USER_TEXT" => $responseTxt]
        ]
    ] = $answerData;

    ["DATE_CREATE" => $date] = $userData;

    return compact("name", "responseTxt", "date");

}, $answersData, $arrResults);


#@@@ Минимальная цена товара в метатегах раздела @@@#

### минимальная цена товара в разделе ###
function getMinPriceBySectionID($sectionID)
{
    $catalogID = 26;

    $arSort = ['PROPERTY_PRICE' => 'ASC'];
    $arFilter = [
        'IBLOCK_ID' => $catalogID,
        'SECTION_ID' => $sectionID,
        'ACTIVE' => 'Y',
    ];
    $arSelect = ['ID'];
    $arTopCount = ['nTopCount' => 1];

    $rsProducts = CIBlockElement::GetList(
        $arSort,
        $arFilter,
        false,
        $arTopCount,
        $arSelect
    );

    ["PROPERTY_PRICE_VALUE" => $price] = $rsProducts->Fetch();

    return $price;
}


### минимальная цена товара в разделе из кэша ###
function getMinPriceBySectionIDFromCache($sectionID)
{
    $cacheTime = 3600 * 6;
    $cacheID = "sectMinPrice{$sectionID}";

    return returnResultCache($cacheTime, $cacheID, 'getMinPriceBySectionID', $sectionID);
}


### заменить плейсхолдер на значение ###
function replacePlaceHolder($placeholder, $replaceable, $string)
{
    return str_replace($placeholder, $replaceable, $string);
}


### заменить плейсхолдер #SECT_MIN_PRICE# ###
function insertMinPrice($sectionID, $string)
{
    $sectionMinPrice = getMinPriceBySectionIDFromCache($sectionID);

    return replacePlaceHolder('#SECT_MIN_PRICE#', $sectionMinPrice, $string);
}

// FILE section.php: после подлючения catalog.section:
$id = $arResult['VARIABLES']['SECTION_ID'];
$title = $APPLICATION->GetProperty("title");
$keywords = $APPLICATION->GetProperty("keywords");
$description = $APPLICATION->GetProperty("description");

$titleWithMinPrice = insertMinPrice($id, $title);
$keywordsWithMinPrice = insertMinPrice($id, $keywords);
$descriptionWithMinPrice = insertMinPrice($id, $description);

$APPLICATION->SetPageProperty("title", $titleWithMinPrice);
$APPLICATION->SetPageProperty("keywords", $keywordsWithMinPrice);
$APPLICATION->SetPageProperty("description", $descriptionWithMinPrice);




#@@@ ВЫВОДИТЬ NAME в хлебных крошках: @@@#
$APPLICATION->IncludeComponent(
    "bitrix:catalog",
    "",
    [
        //...
        "ADD_SECTIONS_CHAIN" => "N", // ### Включать раздел в цепочку навигации
        "ADD_ELEMENT_CHAIN" => "N", // ### Включать название элемента в цепочку навигации
    ]
);

// FILE: component_epilog.php в шаблонах catalog.element и catalog.section:
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

if (!is_array($arResult["SECTION"])) {
    return;
}

global $APPLICATION;

#@@@ Изменение хлебных крошек у товара с учетом "искусственных" разделов: @@@#
if (is_array($arResult["SECTION"])) {
    foreach ($arResult["SECTION"]["PATH"] as $key => ["ID" => $id, "NAME" => $name, "SECTION_PAGE_URL" => $urn]) {
        if (!$key) {
            $parentMadeSectionID = getParentMadeSectionID($id);

            if ($parentMadeSectionID) {
                [
                    "NAME" => $parentMadeSectionName,
                    "SECTION_PAGE_URL" => $parentMadeSectionURN
                ] = getSectionDataByID($parentMadeSectionID);

                $APPLICATION->AddChainItem($parentMadeSectionName, $parentMadeSectionURN);
            }
        }

        $APPLICATION->AddChainItem($name, $urn);
    }
}

# Если в section.php не подключается bitrix.section:
// File section.php :
$isCheckedForMadeSection = false;
$sectionURL = $arParams['SECTION_URL'];
$sectionID = $arSection['ID'];

$rsPath = CIBlockSection::GetNavChain(CATALOG_I_BLOCK_ID, $sectionID);
$rsPath->SetUrlTemplates('', $sectionURL);

while ($arPathData = $rsPath->GetNext()) {
    [
        'ID' => $id,
        'NAME' => $name,
        '~SECTION_PAGE_URL' => $sectionPageURL
    ] = $arPathData;

    if (!$isCheckedForMadeSection) {
        $isCheckedForMadeSection = true;
        $parentMadeSectionID = getParentMadeSectionID($id);

        if ($parentMadeSectionID) {
            [
                "NAME" => $parentMadeSectionName,
                "SECTION_PAGE_URL" => $parentMadeSectionURN
            ] = getSectionDataByID($parentMadeSectionID);

            $APPLICATION->AddChainItem($parentMadeSectionName, $parentMadeSectionURN);
        }
    }

    $APPLICATION->AddChainItem($name, $sectionPageURL);
}



#@@@ Добавление значения свойств из HB: @@@#
// ...
if ($arrProperty["PROPERTY_TYPE"] === "S" && $arrProperty["USER_TYPE_SETTINGS"]) {
    $tableName = $arrProperty["USER_TYPE_SETTINGS"]["TABLE_NAME"];

    $hlData = array_pop(HighloadBlockTable::getList([
        'filter' => ['TABLE_NAME' => $arrProperty["USER_TYPE_SETTINGS"]["TABLE_NAME"]]
    ])->fetchAll());

    $entityClass = HighloadBlockTable::compileEntity($hlData)->getDataClass();

    $res = $entityClass::getList([
        'select' => ['UF_NAME'],
        'order' => ['ID' => 'ASC'],
        'filter' => ['UF_XML_ID' => $arrProperty["VALUE"]]
    ])->fetchAll();

    if ($res) {
        $arr_prop[$arrProperties["CODE"]]["VALUE"] = $res[0]["UF_NAME"];
    }
}
