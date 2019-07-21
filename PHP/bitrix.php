<?

// Глобальные фильтры на всякие случаи жизни https://camouf.ru/blog-note/4717/
	
/** Удаляем все кроме:
 * /bitrix
 * /upload
 * .htaccess
 * .access.php
 * 404.php
 * index.php
 * robots.txt
 * Apache-PHP-7-x64_vhost.conf
 * urlrewrite.php
 * web.config
 */
	
# исключить обращение по ссылке к шаблону:	
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); ?>


<!DOCTYPE HTML>
<html>
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
</html>
<body>
	<? if ($GLOBALS['USER']->IsAdmin()): ?>
	    <div id="panel"><? $APPLICATION->ShowPanel(); ?></div> <!-- ПОКАЗ АДМИН ПАНЕЛИ -->
	<? endif; ?>

	    <h1><? $APPLICATION->showTitle(false) ?></h1> <!-- ВЫВОД H1 -->
<?



// file: /local/php_interface/init.php - здесь можно определить пользовательские функции, к-л. логику, которыми хотели бы пользоваться в шаблоне, до его подключения.
	
	define("DEFAULT_TEMPLATE_PATH", "/local/templates/.default"); // теперь можно вместо SITE_TEMPLATE_PATH использовать DEFAULT_TEMPLATE_PATH
	define('DEFAULT_TEMPLATE_PATH', BX_PERSONAL_PATH . '/templates/.default'); // путь до папки .default в ядре bitrix
	
	function debug($data)
	{
		echo "<pre>" . print_r($data) . '<pre>';
	}



// file: /local/templates/TEMPLATE_NAME:
	debug($arResult); // используем функцию из init.php
// Код шаблона



# появление РЕДАКТОРА ЭЛЕМЕНТА в визуальном редакторе: ?>
<div class="box1" id="<?= $this->GetEditAreaId($arItem['ID']); ?>">
    <!-- код элемента в цикле -->
</div>
<?



# измение/удаление элементов в визуальном редакторе: ?>
<? foreach ($arResult['ITEMS'] as $arItem): ?>
	<? $this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'],
		CIBlock::GetArrayByID($arItem['iBLOCK_ID'], 'ELEMENT_EDIT'));
	$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'],
		CIBlock::GetArrayByID($arItem['iBLOCK_ID'], 'ELEMENT_DELETE'),
		array('CONFIRM' => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM'))); ?>
    <div class="some-elem-class" id="<?= $this->GetEditAreaId($arItem['ID']) ?>">
        <!-- Код шаблона элемента -->
    </div>
<? endforeach; ?>
<?



# file: parameters.php, result_modifier.php, component_epilog - позволяют дополнить логику компонента



# file: component_epilog.php (можно создать в папке с шаблоном) будет подключаться после подключения файла с шаблоном. Например, сюда можно поместить подключение компонента "комментарии", для того чтобы он не кэшировался

// file: result_modifier.php - сюда можно, например поместить функцию-обработчик элементов массива $arResult:
foreach ($arResult['ITEMS'] as &$item) {
	$item['PREVIEW_TEXT'] = mbCutString($item['PREVIEW_TEXT'], 50); // mbCutString - пользовательская функция в init.php
}
	
unset($item); // поскольку массив передаем по ссылке


// ВЫВОД ПАГИНАЦИИ: ?>
<? if ($arParams['DISPLAY_BOTTOM_PAGER']): ?>
	<?= arResult['NAV_STRING']; ?>
<? endif; ?>
<?



# Настройки главного модуля объединять CSS, JS, получать минифированные версии CSS и JS


# file: .setting.php - настройка debug - более подробный вывод ошибки
	
	
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




# ТЕКУЩАЯ СТРАНИЦА:
$APPLICATION->GetCurPage(false); // => относительный урл




# RESIZE изображений В ШАБЛОНЕ:
$file = CFile::ResizeImageGet(
	$arItem['PREVIEW_PICTURE'],
	['width' => 100, 'height' => 100],
	BX_RESIZE_IMAGE_EXACT, // масштабирует в прямоугольник с сохранением пропорций, обрезая лишнее
	true
);

$file['src']; // путь до новой картинки




# ДОБАВЛЕНИЕ КОММЕНТАРИЕВ:
	/** Используется компонент bitrix: catalog.comments
	 * В вызове компонента добавить: "AJAX_POST" => "Y"
	 * СЕРВИСЫ -> БЛОГИ -> Нужный_Инфблок изменить -> вкладка "Права на доступ":
	 * Права на комментарии: Все посетители - чтение, Авторизованные - запись
	 */




# ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ:
/*
В свойствах инфоблока создать новое свойство:
Название галерея | тип файл  | множественное - отметить | код - GALLERY | тип загружаемых файлов - изображения
[PROPTERTIES] => [GALLERY] => [PROPERTY_VALUE_ID] => [44, 45, 46, 47] // ID - картинок
*/?>
<? if (!empty($arResult['PROPTERTIES']['GALLERY']['VALUE'])): ?>
	<?php foreach ($arResult['PROPTERTIES']['GALLERY']['VALUE'] as $photo): ?>
        <img src="<?= CFile::GetPath($photo); ?>" alt="" width="200"> <!-- $photo - содержит ID, по нему получем путь к картинке -->
	<?php endforeach; ?>
<? endif; ?>
<?



# Авторизация:
// создаем file: /auth/index.php
define('NEED_AUTH', true); // если инициализировать данную константу значением "true" до подключения пролога, то будет проведена проверка на авторизованность пользователя. Если пользователь не авторизован, то ему будет предложена форма авторизации.
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



// file: local/templates/.default/components/bitrix/system.auth.form/template: ?>
    <!-- .... -->
    <p>Добро пожаловать: <?= $arResult['USER_NAME'] ?></p>
    <p>Ваш профиль: <a href="<?= $arResult['PROFILE_URL'] ?>">ссылка</a></p>
    <p>Выход: <a href="<?= $APPLICATION->GetCurPageParam('logout=yes', ['login', 'logout', 'register', 'forgot_password', 'change_passwrod']) ?>">
			 <?= GetMessage('AUTH_LOGOUT_BUTTON') ?></a>
    </p>
    <!-- .... --><?


// создаем file: /auth/registration.php
// Вставляем компонент настраиваемая регистрация - bitrix:main.register

// создаем file: /auth/profile.php
// Вставляем компонент параметры пользователя - bitrix:main.register

// изменяем шаблоны остальных компонентов




# КАРТА САЙТА:
// Главный модуль -> вкладка "Настройки" -> скролл до "Карта сайта" - выбрать из каких меню генерировать ссылки



# Добавление свойств раздела:
"SECTION_USER_FIELDS" => ["UF_TEXT_BEFORE"],



# Добавление свойств товара:
"LIST_PROPERTY_CODE" => [
    "PRICE",
    "OPT_PR",
],




# Подключение CSS и JS в шаблоне:
$this->addExternalCss("https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css");
$this->addExternalJS("https://code.jquery.com/ui/1.12.1/jquery-ui.js");



# Настройка ЧПУ в инфорблоке:
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



# Получение данных по метатегам: 
use \Bitrix\Iblock\InheritedProperty\SectionValues;

$seoData = new SectionValues($arParams['IBLOCK_ID'], $arResult['SECTION_ID']);
$seoProps = $seoData->getValues();
$APPLICATION->SetPageProperty("title", $seoProps["SECTION_META_TITLE"]);
$APPLICATION->SetPageProperty("description", $seoProps["SECTION_META_DESCRIPTION"]);



#@@@ ВЫВОД АКТИВНЫХ НОВОСТЕЙ С УСТАНОВЛЕННЫМ СВОЙСТВОМ SHOW_MAIN:
CModule::IncludeModule('block');
$arSelect = ['ID', 'IBLOCK_ID', 'NAME', 'PREVIEW_TEXT'];
$arFilter = ['IBLOCK_ID' => 1, 'ACTIVE_DATE' => 'Y', 'ACTIVE' => 'Y', '!SHOW_MAIN' => false]; // IBLOCK_ID - ID инфоблока
$res = CIBlockElement::GetList([], $arFilter, false, ['nPageSize' => 4], $arSelect); ?>

<? if ($res->arResult): ?>
    <div class="element">
		 <? while ($ob = $res->GetNextElement()): $arFields = $ob->GetFields(); ?>
			 <? $imgSrc = CFile::GetPath($arFields['DETAIL_PICTURE']); // получение пути к картинке по ID ?>
           <a href="<?= $arFields['DETAIL_PAGE_URL'] ?>">
               <p><?= $arFields['NAME'] ?></p>
               <img src="<?= $imgSrc ?>" alt="<?= $arFields['NAME'] ?>">
           </a>
		 <? endwhile; ?>
    </div>
<? endif; ?>
<?
// $ob->GetFields() - получение полей. $ob->GetProperties() - получение свойств.



#@@@ ОБНОВЛЕНИЕ МЕТ:
function get_min_price_in_product($id)
{
	$arSelect = Array(
		"ID",
		"PROPERTY_PRICE",
	);
	
	$arFilter = Array(
		"ID" => $id,
		"IBLOCK_ID" => IntVal(5),
		"ACTIVE_DATE" => "Y",
		"ACTIVE" => "Y",
		">CATALOG_PRICE_1" => "0",
	);
	
	$res = CIBlockElement::GetList(array("CATALOG_PRICE_1" => 'ASC'), $arFilter, false, array('nTopCount' => 1), $arSelect);
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



#@@@ Обновление названия и свойства DETAIL_PAGE_URL у карточек товаров в определенных разделах:
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

global $DB;

$sectionsData = [
	['3', '229'],
	['3', '230'],
	['3', '251']
];


foreach ($sectionsData as [$IBLOCK_ID, $ID]) {
	
	$arSelect = [
		'ID',
		'IBLOCK_ID',
		'NAME',
		'PROPERTY_SECHENIE',
		'PROPERTY_KOLICHESTVO_JIL',
		'DETAIL_PAGE_URL'
	];
	
	$arFilter = [
		"IBLOCK_ID" => $IBLOCK_ID,
		'SECTION_ID' => $ID,
		'ACTIVE' => 'Y'
	];
	
	$res = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);
	
	while ($arFields = $res->GetNext()) {
		$valSechenie = $arFields['PROPERTY_SECHENIE_VALUE'];
		$elemsWithZil = $ID != '411' || $ID != '421' || $ID != '408';
		$valZhil = $elemsWithZil ? $arFields['PROPERTY_KOLICHESTVO_JIL_VALUE'] : '';
		$isValidValFields = $elemsWithZil ? ($valSechenie != '' && $valZhil != '') : $valSechenie != '';
		
		if ($isValidValFields) {
			switch ($ID) {
				case '229':
					$h1 = "Кабель АВБбшв {$valZhil}х{$valSechenie}";
					$h1Razvodnay = "АВБбшв {$valZhil}х{$valSechenie}";
					break;
				case '230':
					$h1 = "Кабель ВБбшв {$valZhil}х{$valSechenie}";
					$h1Razvodnay = "Вббшв {$valZhil}х{$valSechenie}";
					break;
				case '251':
					$h1 = "Кабель КВВГнг-LS {$valZhil}х{$valSechenie}";
					$h1Razvodnay = "КВВГнг-LS {$valZhil}х{$valSechenie}";
					break;
				default:
					throw new Exception("Неизвестный ID: {$ID}!");
			}
			
			$cbe = new CIBlockElement;
			$test = $cbe->Update($arFields["ID"], ['NAME' => $h1Razvodnay]);
			CIBlockElement::SetPropertyValuesEx($arFields["ID"], $IBLOCK_ID, ["NAME_ITEM" => $h1]);
		}
		
	}
}



#@@@ ВЫБРАТЬ ЭЛЕМЕНТЫ РАЗДЕЛА, У КОТОРЫХ СВОЙСТВО PROPERTY_SHOW_ON СОВПАДАЕТ С ТЕКУЩИМ ID РАЗДЕЛА:
	$res = CIBlockElement::GetList([], ['IBLOCK_ID' => 5, 'PROPERTY_SHOW_ON' => $arResult['ID']], false, false, ['ID', 'PROPERTY_YOUTUBE_CODE']);
	
	while ($arFields = $res->GetNext()) {
		echo '<pre>';
		print_r($arFields);
		echo '</pre>';
	}



#@@@ ВЫВОД НОВОСТЕЙ:
CModule::IncludeModule('iblock');
$arSelect = ['ID', 'IBLOCK_ID', 'NAME', 'PREVIEW_TEXT', 'DETAIL_PAGE_URL', 'PREVIEW_PICTURE', 'ACTIVE_FROM'];
$arFilter = ['IBLOCK_ID' => 1, 'ACTIVE_DATE' => 'Y', 'ACTIVE' => 'Y', '!PROPERTY_SHOW_ON_MAIN' => false];
$res = CIBlockElement::GetList([], $arFilter, false, ['nPageSize' => 3], $arSelect);
?>

<? if ($res->arResult): ?>
	<? while ($ob = $res->GetNextElement()): $arFieds = $ob->GetFields(); ?>
		<? $srcImg = CFile::GetPath($arFields['PREVIEW_PICTURE']); ?>

        <div class="col-md-4">
            <div class="card card-blog">
                <div class="card-img">
                    <a href="<?= $arFields['DETAIL_PAGE_URL'] ?>" title="Прочитать новость">
                        <img src="<?= $srcImg ?>" alt="" class="img-fluid">
                    </a>
                </div>
            </div>
        </div>
        <!-- ... -->
	<? endwhile; ?>
<? endif; ?>
<?



#@@@ ИЗМЕНЕНИЕ arResult + ДОБАВЛЕНИЕ ЦЕН И СВОЙСТВ:

// file: --template-component--/result_modifier.php:
$arSelect = ['ID', 'IBLOCK_ID', 'PROPERTY_INBOX', 'CATALOG_GROUP_10']; // необходимо определить какие цены используются (по дефолту CATALOG_GROUP_1)
$arFilter = ['IBLOCK_ID' => 31, 'ID' => $offerID];
$dbEl = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);

if ($obEl = $dbEl->Fetch()) {
	$arResult['offerData'][$offerID]['Единиц в коробке'] = $obEl['PROPERTY_INBOX_VALUE'];
	$arResult['offerData'][$offerID]['Цена'] = $obEl['CATALOG_PRICE_10'];
}



#@@@ ИЗМЕНЕНИЕ arResult + ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЬСКОГО СВОЙСТВА:

// file: --template-component--/result_modifier.php:
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

$sectIDs = [];

foreach ($arResult['SECTIONS'] as $item) {
	$sectIDs[] = $item['ID'];
}

$dbSection = CIBlockSection::GetList(
	false,
	["IBLOCK_ID" => CAT_IBLOCK_ID, "ID" => $sectIDs, "ACTIVE" => "Y", "GLOBAL_ACTIVE" => "Y", "SECTION_ACTIVE" => "Y"],
	false,
	["UF_SLIDER_IMGS"],
	false
);


while ($arRes = $dbSection->Fetch()) {
	$currImgs = [];
	foreach ($arRes['UF_SLIDER_IMGS'] as $img) {
		$currImgs[] = CFile::GetPath($img);
	}
	
	$arResult['SECTIONS'][++$key]['SLIDER_IMGS'] = $currImgs;
}



#@@@ Отправка на почту и запись в инфоблок:
require $_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_before.php';

use Bitrix\Main\{Application, Context};

$result = 'error';
$connection = Application::getConnection();
$context = Context::getCurrent();
$request = $context->getRequest();

if ($request->isPost()) {
	$prodName = $request->getPost("prodName");
	parse_str($request->getPost("formData"), $formData);
	['rName' => $uName, 'rEmail' => $uEmail, 'rComment' => $uCommet] = $formData;
	
	if (empty($uCommet))
		$uCommet = 'не заполнено';
	
	if (!($uName && $uEmail && $prodName)) {
		echo 'Некоректно заполнены поля формы';
	} else {

		#@ Отправляем письмо:
		$arEventFields = [
			'AUTHOR' => $uName,
			'AUTHOR_EMAIL' => $uEmail,
			'PRODUCT_NAME' => $prodName,
			'COMMENT' => $uCommet
		];
		
		CEvent::Send("FEEDBACK_FORM_", SITE_ID, $arEventFields);
		
		#@ Записываем в инфоблок:
		CModule::IncludeModule("iblock");
		$el = new CIBlockElement;
		$PROP = [];
		$PROP['UNAME'] = $uName;
		$PROP['UEMAIL'] = $uEmail;
		$PROP['PRODNAME'] = $prodName;
		$PROP['UCOMMENT'] = $uCommet;
		
		$arLoadProductArray = Array(
			"IBLOCK_ID" => 43,
			"NAME" => "{$uName}: $prodName",
			"PROPERTY_VALUES" => $PROP,
		);
		
		$PRODUCT_ID = $el->Add($arLoadProductArray);
	}
}


#@@@ ВЫВОД КАРТИНОК ИЗ ПОЛЬЗОВАТЕЛЬСКОГО СВОЙСТВА (тип файл - множественный): ?>
<? foreach ($arResult['UF_ADDITIONAL_GALLER'] as $imgInfo): ?>
    <? $imgSrc = CFile::GetPath($imgInfo) ?>
    <div class="col-md-3 col-sm-4 col-xs-6">
    	<img src="<?= $imgSrc ?>" alt="">
    </div>
<? endforeach; ?>
<?



#@@@ ПОЛУЧИТЬ ВЛОЖЕННЫЕ РАЗДЕЛЫ:
    $arResult['ITEMS'] = [];
   
    if (CModule::IncludeModule("iblock")) {
        $arSort = [
           "SORT" => "ASC"
        ];
    
        $filter = [
           'IBLOCK_ID' => $arParams['IBLOCK_ID'],
           'GLOBAL_ACTIVE' => 'Y',
           'SECTION_ID' => $arParams['SECTION_ID'],
        ];
    
        $arSelect = [
           "ID",
           "CODE",
           "NAME",
           "SECTION_PAGE_URL",
           "PICTURE",
           "UF_*"
        ];
        
        $dbList = CIBlockSection::GetList($arSort, $filter, false, $arSelect);
        
        $dbList->result->num_rows; // количество найденных записей
        
        while ($row = $dbList->GetNext()) {
            $arResult['ITEMS'][] = [
				'ID' => $row['ID'],
				'NAME' => $row['NAME'],
				'IMG' => CFile::GetPath($row['PICTURE']),
				'LINK' => $row['SECTION_PAGE_URL'], 
				'MIN_PRICE' => $row['UF_MIN_PRICE'], 
            ];
        }
    }



 
#@@@ bitrix.news -> section.php:    
    if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
        die();
    }
    
    /*@ Данные о разделе @*/
    $arFilter = [
       'IBLOCK_ID' => $arParams['IBLOCK_ID'],
       'ID' => $arResult["VARIABLES"]["SECTION_ID"],
       "ACTIVE" => "Y",
       'GLOBAL_ACTIVE' => 'Y',
    ];
    
    $arSelect = [
       "NAME",
       "UF_*",
    ];
    
    $sectionData = CIBlockSection::GetList(["SORT"=>"ASC"], $arFilter, false, $arSelect);
    
    if ($props = $sectionData->Fetch()) {
        $APPLICATION->SetTitle($props['NAME']);
        
        $textBeforeSert = $props['UF_TEXT_BEFORE_SERT'];
    }
    
    /*@ Выводим подразделы: @*/
    
    $arFilter = [
       'IBLOCK_ID' => $iBlockID,
       'SECTION_ID' => $sectionID,
       "ACTIVE" => "Y",
       "GLOBAL_ACTIVE" => "Y",
    ];
            
	$rsSect = CIBlockSection::GetList(["SORT"=>"ASC"], $arFilter);
       
        
    <? while ($childSection = $rsSect->GetNext()): ?>
        <div>
            <a href="<?= $childSection['SECTION_PAGE_URL'] ?>">
                    <?= $childSection['NAME'] ?>
            </a>
            <?= $childSection['DESCRIPTION'] ?>	
            
            <?
            	/*@ Выводим элементы из подраздела: @*/
                $arSelect = ["ID", "IBLOCK_ID", "NAME", "DETAIL_PAGE_URL", "PREVIEW_PICTURE", "PROPERTY_PRICE"];
                $arFilter = ["IBLOCK_ID" => $iBlockID, "SECTION_ID" => $childSection['ID'], "ACTIVE" => "Y"];
                $elementsData = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);
            ?>


            <? while ($elemData = $elementsData->GetNext()): ?>
                <? if ($elemData['ID'] === $childSection['ID']) continue; ?>
                
                <div class="col-md-4 col-sm-6">
                	<img src="<?= CFile::GetPath($elemData['PREVIEW_PICTURE']) ?>" alt="<?= $elemData['NAME'] ?>">
                	<div class="property">Цена: <?= $elemData['PROPERTY_PRICE_VALUE'] ?> руб.</div>
                </div>
            <? endwhile; ?>
        </div>
    <? endwhile ?>
<? endif; ?>


<? /*@ Или выводим элементы: @*/
    $arSelect = ["ID", "IBLOCK_ID", "NAME", "DETAIL_PAGE_URL", "PREVIEW_PICTURE", "PROPERTY_PRICE"];
    $arFilter = ["IBLOCK_ID" => $iBlockID, "SECTION_ID" => $sectionID, "ACTIVE" => "Y"];
    $elementsData = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);
?>

<div class="maxwidth-theme">
    <div class="col-md-12">
        <div class="row sid-4 items stones">
            <? while ($elemData = $elementsData->GetNext()): ?>
                <div class="col-md-4 col-sm-6">
                	<img src="<?= CFile::GetPath($elemData['PREVIEW_PICTURE']) ?>" width="150px" alt="<?= $elemData['NAME'] ?>">
                	<div class="property">
                        Цена: <?= $elemData['PROPERTY_PRICE_VALUE'] ?> руб./м<sup>2</sup>
                    </div>
                </div>
            <? endwhile; ?>
        </div>
    </div>
</div>   





<?
    
#@@@ ЗАЛИТЬ РАЗДЕЛЫ/ТОВАРЫ:

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");

global $DB;

//** Файлы для заливки:
const FILE_CATALOG = 'CATEGORY.csv';
const FILE_PALETTE = 'CATEGORY_PALETTE.csv';
const FILE_PRODUCTS = 'NEW_PRODUCTS.csv';
const FILE_STONES = 'STONES.csv';
const FILE_META = 'META.csv';

const CATALOG_IBLOCK_ID = 26;
const PALETTE_IBLOCK_ID = 27;

//**@@ Читаем файл и генерируем данные по разделам каталога:
#$sectionsCData = getSectionsData(FILE_CATALOG);

//**@@ Читаем файл и генерируем данные по по разделам палитры:
#$sectionsPData = getSectionsData(FILE_PALETTE);

//**@@ Создаем новые разделы Каталог:
#createNewSections($sectionsCData, CATALOG_IBLOCK_ID);

//**@@ Создаем новые разделы Палитра:
#createNewSections($sectionsPData, PALETTE_IBLOCK_ID);

//**@@ Создаем новые камни:
#$createData = createElements(FILE_STONES, 'palitra');

//**@@ Создаем новые товары:
#$createData = createElements(FILE_PRODUCTS);
#$countProducts = $createData['count'];
#$error = is_null($createData['error']) ? 0 :  $createData['error'];
#echo "Создано {$countProducts} <br> Ошибки: {$error}";

//**@@ Меты для разделов:
#$seoData = getCSVData(FILE_META);
#updateSections($seoData);

//**@@ Разделы:
function getSectionsData($fileName)
{
    $sectionsData = [];
    
    if (!file_exists($fileName)) {
        die('Файл не найден');
    }
    
    $csvFile = new SplFileObject($fileName);
    
    while (!$csvFile->eof()) {
        try {
            $data = $csvFile->fgetcsv(';');
            
            if (empty($data[0])) {
                continue;
            }
            
            list($urn, $sectionName1, $sectionName2, $sectionName3) = $data;

            $clearPartsUrn = getURNData($urn);
            $nesting = count($clearPartsUrn);
            
            if ($nesting === 1) {
                $sectionName = $sectionName1;
            } elseif ($nesting === 2) {
                $sectionName = $sectionName2;
            } else {
                $sectionName = $sectionName3;
            }
            
            $urn = implode('/', $clearPartsUrn).'/';
            $sectionCODE = array_pop($clearPartsUrn);
            $parentSectionCODE = $nesting == 1 ? null : array_pop($clearPartsUrn);
            
            if (!array_key_exists($sectionName, $sectionsData)) {
                $sectionsData[$sectionName] = compact("parentSectionCODE", "sectionCODE", "urn", "nesting");
            }
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }
    
    return sortByNested($sectionsData); // сортировка по вложенности раздела
}

function createNewSections($sectionsData, $blockID)
{
    foreach ($sectionsData as $sectionName => $sectionData) {
        $parentSectionCODE = $sectionData['parentSectionCODE'];
        $sectionCODE = $sectionData['sectionCODE'];
        $nesting = $sectionData['nesting'];
        
        $parentSectionID = getSectionIDByCode($parentSectionCODE, $nesting, $blockID);
        
        if (!isSectionExists($parentSectionID, $sectionCODE, $blockID)) {
            createSection($sectionName, $parentSectionID, $sectionCODE, $blockID);
        }
    }
}

function getSectionIDByCode($sectionCODE, $nesting, $blockID)
{

    if (!isset($sectionCODE, $blockID)) {
        return;
    }
    
    $arPSFilter = ['IBLOCK_ID' => $blockID, "CODE" => $sectionCODE, 'DEPTH_LEVEL' => $nesting];
    $arPSSelect = ["ID"];
    
    $rsSections = CIBlockSection::GetList([], $arPSFilter, false, $arPSSelect);
    
    if ($arSection = $rsSections->GetNext()) {
        return $arSection["ID"];
    }

    return false;
}

function getSectionIDByName($name, $blockID)
{
    if (!isset($name, $blockID)) {
        return;
    }
    
    $arFilter = [
       'IBLOCK_ID' => $blockID,
       'NAME' => $name,
    ];
    
    $arSelect = [
       'ID',
    ];
    
    return CIBlockSection::GetList([], $arFilter, false, false, $arSelect)->GetNext()["ID"];
}

function isSectionExists($sectionID, $sectionCODE, $blockID)
{
    $arSFilter = ["IBLOCK_ID" => $blockID, "CODE" => $sectionCODE];
    
    if (!is_null($sectionID)) {
        $arSFilter["SECTION_ID"] = $sectionID;
    }
    
    return CIBlockSection::GetCount($arSFilter);
}

function createSection($sectionName, $parentSectionID, $sectionCODE, $blockID)
{
    $bSection = new CIBlockSection;
    
    $arFields = [
       "ACTIVE" => "Y",
       "IBLOCK_ID" => $blockID,
       "CODE" => $sectionCODE,
       "NAME" => $sectionName,
    ];
    
    if (!is_null($parentSectionID)) {
        $arFields["IBLOCK_SECTION_ID"] = $parentSectionID;
    }
    
    if (!$bSection->Add($arFields)) {
        die($bSection->LAST_ERROR);
    }
}

function updateSections($data)
{
    foreach ($data as $itemData) {
        $bs = new CIBlockSection;
        
        list($ID, $NAME, $SECTION_META_TITLE, $SECTION_META_DESCRIPTION) = $itemData;
        $arFields = compact('NAME');
        $arFields["IPROPERTY_TEMPLATES"] = compact('SECTION_META_TITLE', 'SECTION_META_DESCRIPTION');

        if (!$bs->Update($ID, $arFields)) {
            echo "Не удалось обновить меты у ID: {$ID} <br>";
        }
    }
}


//**@@ Элементы:
function createElements($fileName, $type = 'catalog')
{
    $counter = 0;

    if (!file_exists($fileName)) {
        return ['count' => $counter, 'error' => "Файл не найден {$fileName}"];
    }
    
    $csvFile = new SplFileObject($fileName);
    
    while (!$csvFile->eof()) {
        try {
            $data = $csvFile->fgetcsv(';');
            
            if (empty($data[0])) {
                continue;
            }
            
            switch ($type) {
                case 'palitra':
                    $createData = createStone($data);
                    break;
                    
                default:
                    $createData = createProduct($data);
            }

            if (!$createData['result']) {
                return ['count' => $counter, 'error' => $createData['error']];
            }

            $counter++;
        } catch (Exception $e) {
            return ['count' => $counter, 'error' => $e->getMessage()];
        }
    }

    return ['count' => $counter, 'error' => 0];
}

function createProduct($data)
{
    $imgFolder = "{$_SERVER['DOCUMENT_ROOT']}/productUploader/img/products/";

    list(
       $urn, $NAME, $listPhotos, $PRICE, $DETAIL_TEXT, $parentSectionID,
       $TITLE, $DESCRIPTION, $SQUARE, $STONE, $TERM_OF_PRODUCTION, $COLOR,
       $SIZE, $WASH_PRICE, $ADD_INSTALLED, $MATERIAL, $SERVICES, $SINK_METAL_COST,
       $WASH, $WASH_INTEGRATED, $GROOVE_FOR_WATER, $WASH_INTEGRATED_LIT, $EQUIPMENT
       ) = $data;

    $element = new CIBlockElement;
    
   
    # свойства элемента:
    $props = compact(
       'PRICE','SQUARE', 'TERM_OF_PRODUCTION', 'COLOR', 'SIZE',
       'WASH_PRICE', 'ADD_INSTALLED', 'SERVICES', 'SINK_METAL_COST', 'WASH',
       'WASH_INTEGRATED', 'GROOVE_FOR_WATER', 'WASH_INTEGRATED_LIT', 'EQUIPMENT'
    );

    # Детальное изображение + галерея:
    $photos = explode(',', $listPhotos);
    $mainImgName = array_shift($photos);
    $mainImg = "{$imgFolder}{$mainImgName}";

    $props["STONE"] = getElementIDByName($STONE, PALETTE_IBLOCK_ID);
    $props["MATERIAL"] = getSectionIDByName($MATERIAL, PALETTE_IBLOCK_ID);
    
    if (!empty($photos)) {
        $props["GALLERY"] = array_reduce(array_keys($photos), function ($acc, $key) use ($photos, $imgFolder) {
            $imgPath = "{$imgFolder}{$photos[$key]}";
        
            $acc["n{$key}"] = [
               "VALUE" => CFile::MakeFileArray($imgPath),
            ];
        
            return $acc;
        }, []);
    }
    
    $productData = [
       "IBLOCK_ID" => CATALOG_IBLOCK_ID,
       "IBLOCK_SECTION" => [$parentSectionID],
       "NAME" => $NAME,
       "CODE" => getSymbolCode($urn),
       "PROPERTY_VALUES" => $props,
       "ACTIVE" => "Y",
       "DETAIL_TEXT" => $DETAIL_TEXT,
       "DETAIL_TEXT_TYPE" => 'html',
       "DETAIL_PICTURE" => CFile::MakeFileArray($mainImg),
       "PREVIEW_PICTURE" => CFile::MakeFileArray($mainImg),
       "IPROPERTY_TEMPLATES" => [
          "ELEMENT_META_TITLE" => $TITLE,
          "ELEMENT_META_DESCRIPTION" => $DESCRIPTION,
       ],
    ];
    
    if ($PRODUCT_ID = $element->Add($productData)) {
        return ['result' => true, 'error' => null];
    } else {
        return ['result' => false, 'error' => "Error: {$NAME} " . $element->LAST_ERROR];
    }
}

function createStone($data)
{
    $imgFolder = "{$_SERVER['DOCUMENT_ROOT']}/productUploader/img/stones/";

    list(
       $URN, $NAME, $listPhotos, $PRICE, $DETAIL_TEXT, $PARENT_SECTION_NAME,
       $TITLE, $DESCRIPTION, $MANUFACTURER, $COLOUR, $ARTICLE, $COLOR_TYPE,
       $POLISHING
       ) = $data;
   
    $element = new CIBlockElement;

    $sectionID = getSectionIDByName($PARENT_SECTION_NAME, PALETTE_IBLOCK_ID);
    
    # свойства элемента:
    $props = compact('PRICE', 'MANUFACTURER', 'COLOUR', 'ARTICLE', 'COLOR_TYPE', 'POLISHING');
    
    # Детальное изображение + галерея:
    $photos = explode(',', $listPhotos);
    $mainImgName = array_shift($photos);
    $mainImg = "{$imgFolder}{$mainImgName}";
    
    if (!empty($photos)) {
        $props["GALLERY"] = array_reduce(array_keys($photos), function ($acc, $key) use ($photos, $imgFolder) {
            $imgPath = "{$imgFolder}{$photos[$key]}";
            
            $acc["n{$key}"] = [
               "VALUE" => CFile::MakeFileArray($imgPath),
            ];
            
            return $acc;
        }, []);
    }
    
    $productData = [
       "IBLOCK_ID" => PALETTE_IBLOCK_ID,
       "IBLOCK_SECTION" => [$sectionID],
       "NAME" => $NAME,
       "CODE" => getSymbolCode($URN),
       "PROPERTY_VALUES" => $props,
       "ACTIVE" => "Y",
       "DETAIL_TEXT" => $DETAIL_TEXT,
       "DETAIL_TEXT_TYPE" => 'html',
       "DETAIL_PICTURE" => CFile::MakeFileArray($mainImg),
       "PREVIEW_PICTURE" => CFile::MakeFileArray($mainImg),
       "IPROPERTY_TEMPLATES" => [
          "ELEMENT_META_TITLE" => $TITLE,
          "ELEMENT_META_DESCRIPTION" => $DESCRIPTION,
       ],
    ];
    
    if ($PRODUCT_ID = $element->Add($productData)) {
        return ['result' => true, 'error' => null];
    } else {
        return ['result' => false, 'error' => "Error: {$NAME} " . $element->LAST_ERROR];
    }
}

function getElementIDByName($name, $blockID)
{
    if (!isset($name, $blockID)) {
        return;
    }
    
    $arFilter = [
       'IBLOCK_ID' => $blockID,
       'NAME' => $name,
    ];
    
    $arSelect = [
       'ID',
    ];

    return CIBlockElement::GetList([], $arFilter, $arSelect)->GetNext()["ID"];
}


//**@@ HELPERS:
function getCSVData($fileName) {
    $csvData = [];

    if (!file_exists($fileName)) {
        die('Файл не найден');
    }

    $csvFile = new SplFileObject($fileName);

    while (!$csvFile->eof()) {
        try {
            $data = $csvFile->fgetcsv(';');
        
            if (empty($data[0])) {
                continue;
            }
        
            $csvData[] = $data;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    return $csvData;
}

function getURNData($urn)
{
    $partsURN = explode('/', $urn);

    return array_filter($partsURN, function ($key) use ($partsURN) {
        return $partsURN[$key] && $key != count($partsURN) - 2;
    }, ARRAY_FILTER_USE_KEY);
}

function sortByNested($sectionsData)
{
    uasort($sectionsData, function ($a, $b) {
        return $a['nesting'] < $b['nesting'] ? -1 : 1;
    });
    
    return $sectionsData;
}

function getSymbolCode($urn)
{
    $urnData = explode('/', $urn);
    
    return $urnData[count($urnData) - 2];
}


# Слайдер:
if (CModule::IncludeModule("iblock")) {
    // ID инфоблока из которого выводим элементы
    $iblock_id = 11;

    $my_slider = CIBlockElement::GetList (
        // Сортировка элементов
        ["ID" => "ASC"],
        ["IBLOCK_ID" => $iblock_id],
        false,
        false,
        // Перечисляесм все свойства элементов, которые планируем выводить
        [
            'ID', 
            'NAME', 
            'PREVIEW_PICTURE', 
            'PREVIEW_TEXT', 
            'PROPERTY_LIN_PR'
        ]
    );
    while($ar_fields = $my_slider->GetNext())
    {
        //Выводим элемент со всеми свойствами + верстка
        $img_path = CFile::GetPath($ar_fields["PREVIEW_PICTURE"]);
        echo '<li><a href="'.$ar_fields['PROPERTY_LIN_PR_VALUE'].'">';
        echo '<h4>'.$ar_fields['NAME']."</h4>";
        echo "<img src='".$img_path."'/>";
        echo "<p>".$ar_fields['PREVIEW_TEXT']."'</p>";
        echo '</a></li>';
    }
}

// Если попробуете вывести свойство типа HTML/TEXT получите Array. Для его вывода используйте конструкцию:
echo htmlspecialcharsBack($ar_fields['PROPERTY_КОД_СВОЙСТВА_VALUE']["TEXT"]);