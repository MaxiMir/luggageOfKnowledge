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



#@ ДАННЫЕ О ПОЛЬЗОВАТЕЛЕ: @#
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
