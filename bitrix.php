# Удаляем все кроме: /bitrix /upload .htaccess .access 404.php index.php robots urlrewrite web

<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); // исключить обращение по ссылке к шаблону 
?>  

<? $APPLICATION->showHead() ?> // Метод предназначен для вывода в шаблоне сайта основных полей тега <head>: мета-теги Content-Type, robots, keywords, description; стили CSS; скрипты, заданные через CMain::AddHeadScript.

<title><? $APPLICATION->showTitle() ?></title> // вывод Title
<?
	use Bitrix\Main\Page\Asset;

	Asset::getInstance()->addCss(SITE_TEMPLATE_PATH . '/css/style.css'); // подключение стилей. SITE_TEMPLATE_PATH - путь к активному шаблону сайта
	$APPLICATION->SetAdditionalCss(); // устаревший метод подключения стилей
	CJSCore::Init(['jquery']); // подключение библиотек из ядра битрикса
	Asset::getInstance()->addJs(SITE_TEMPLATE_PATH . '/js/jquery-1.11.1.min.js');
	$APPLICATION->AddHeadScript(); // устаревший метод подключения скриптов
	Asset::getInstance()->addString('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1>');
	Asset::getInstance()->addString('<link href="//fonts.googleapis.com/css?family=Monda" rel="stylesheet" type="text/css">');
?>

<body>
	<div id="panel"><? $APPLICATION->showPanel() // показ админ. панели ?></div>
	<h1><? $APPLICATION->showTitle(false) ?></h1>
<?


// пользователь админ
$USER->isAdmin(); 


// Файл init.php file: local/php_interface/init.php (/bitrix/php_interface/init.php): // сюда можно вывести пользовательские функции, к-л. логику, которыми хотели бы пользоваться в шаблоне, до его подключения.

define("DEFAULT_TEMPLATE_PATH", "/local/templates/.default"); // теперь можно вместо SITE_TEMPLATE_PATH использовать DEFAULT_TEMPLATE_PATH
define('DEFAULT_TEMPLATE_PATH', BX_PERSONAL_PATH . '/templates/.default'); // путь до папки .default в ядре bitrix

function debug($data) {
	echo "<pre>" . print_r($data) . '<pre>';
}

// file: /local/templates/TEMPLATE_NAME

debug($arResult); // используем функцию из init.php

<div class="box1" id="<?=$this->GetWdirAreaId($arItem['ID']); ?>"> // появление редактора элемента в визуальном редакторе
	// код элемента в цикле
</div>

/*
parameters.php, result_modifier.php, component_epilog - позволяют дополнить логику компонента

Файл component_epilog.php (можно создать в папке с шаблоном) будет подключаться после подключения файла с шаблоном. Например, сюда можно поместить подключение компонента "комментарии", для того чтобы он не кэшировался

Файл result_modifier.php - сюда можно, например поместить функцию-обработчик элементов массива $arResult:
*/
foreach ($arResult['ITEMS'] as &$item) {
	$item['PREVIEW_TEXT'] = mbCutString($item['PREVIEW_TEXT'], 50); // mbCutString - пользовательская функция в init.php
}

unset($item); // поскольку массив передаем по ссылке


// вывод пагинации
<? if ($arParams['DISPLAY_BOTTOM_PAGER']): ?>
	<?=arResult['NAV_STRING']; ?> 
<? endif; ?>



<?
$APPLICATION->SetPageProperty('title', 'Заголовок окна браузера');
$APPLICATION->SetTitle('Отзывы');

$APPLICATION->ShowTitle(); // => Заголовок окна браузера
$APPLICATION->ShowTitle(false); // => Отзывы


// Настройки главного модуля объединять CSS, JS, получать минифированные версии CSS и JS

// .setting.php - настройка debug - более подробный вывод ошибки
/*
Компоненты:
- Включаемая область
- Меню (Настройки->Настройки продукта->Настройки модулей->Управление структурой->Настройки модуля:Настройки для сайтов)
Возможно подключение определенного шаблона для определенной страницы - выбрать тип условия -> Для папки или файла и условие относительный url (наприм. /blog)
- новости bitrix:news
- список новостей bitrix:news.list
- структура разделов bitrix:catalog.section.list
- форма поиска bitrix:search.form (так же необходимо создать раздел search)
- стандартная страница поиска bitrix:search.page
- форма обратной связи bitrix:main.feedback
*/





// Путь до шаблона
$componentName = 'bitrix:news.list';
$componentTemplate = 'objects_page';

$component = new CBitrixComponent();
$component->InitComponent($componentName, $componentTemplate);
$component->initComponentTemplate();
echo $component->__template->GetFolder();


// текущая страница (относительный урл)
$APPLICATION->GetCurPage(false); 


// обработка изображений (resize) в шаблоне
$file = CFile::ResizeImageGet(
	$arItem['PREVIEW_PICTURE'],
	['width' => 100, 'height' => 100],
	BX_RESIZE_IMAGE_EXACT, // масштабирует в прямоугольник с сохранением пропорций, обрезая лишнее
	true
);
$file['src']; // путь до новой картинки


CModule::IncludeModule('iblock');
$arSelect = ['ID', 'IBLOCK_ID', 'NAME', 'PREVIEW_TEXT', 'DETAIL_PAGE_URL', 'PREVIEW_PICTURE', 'ACTIVE_FROM'];
$arFilter = ['IBLOCK_ID' => 1, 'ACTIVE_DATE' => 'Y', 'ACTIVE' => 'Y', '!PROPERTY_SHOW_ON_MAIN' => false];
$res = CIBlockElement::GetList([], $arFilter, false, ['nPageSize' => 3], $arSelect);


// Вывод новостей:
<?if ($res->arResult):?>
	<? while($ob = $res->GetNextElement()): $arFieds = $ob->GetFields(); ?>
        <? $srcImg = CFile::GetPath($arFieds['PREVIEW_PICTURE']); ?>

        <div class="col-md-4">
            <div class="card card-blog">
                <div class="card-img">
                    <a href="<?=$arFieds['DETAIL_PAGE_URL']?>" title="Прочитать новость">
                        <img src="<?=$srcImg?>" alt="" class="img-fluid">
                    </a>
                </div>
            </div>
        </div>
// ...         

<?
/*
    Выбрать элементы раздела, у которых свойство PROPERTY_SHOW_ON совпадает с текущим ID раздела
*/


$res = CIBlockElement::GetList([], ['IBLOCK_ID' => 5, 'PROPERTY_SHOW_ON' => $arResult['ID']], false, false, ['ID', 'PROPERTY_YOUTUBE_CODE']);

while($arFields = $res->GetNext()) {
	echo '<pre>';
	print_r($arFields);
	echo '</pre>'; 
}


// Обновление названия и свойства DETAIL_PAGE_URL у карточек товаров в определенных разделах
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");

global $DB;

die();

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
		"IBLOCK_ID"=> $IBLOCK_ID,
		'SECTION_ID' => $ID,
		'ACTIVE' => 'Y'
	];
	
	$res = CIBlockElement::GetList(Array(), $arFilter, false, [], $arSelect);
	
	while($arFields = $res->GetNext())	{	
		$valSechenie = $arFields['PROPERTY_SECHENIE_VALUE'];
		$elemsWithZil = $ID != '411' || $ID != '421' || $ID != '408';
		$valZhil = $elemsWithZil ? $arFields['PROPERTY_KOLICHESTVO_JIL_VALUE'] : '';
		$isValidValFields = $elemsWithZil ? ($valSechenie != '' && $valZhil != '') : $valSechenie != '';
		
		if ($isValidValFields) {
			switch($ID) {
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
					throw new Exception("Неизвестный ID: {$ID}!!!");
					
			}
			
			
			$cbe = new CIBlockElement;
			$test = $cbe->Update($arFields["ID"], ['NAME' => $h1Razvodnay]);
			CIBlockElement::SetPropertyValuesEx($arFields["ID"], $IBLOCK_ID, ["NAME_ITEM" => $h1]);	
		}
	
	}
}


# Галерея изображений:
/*
Новое свойство: Галерея тип файл, множественное, название GALLERY, тип загружаемых файлов - изображения
[PROPTERTIES] => [GALLERY] => [PROPERTY_VALUE_ID] => [44, 45, 46, 47] // ID - картинок
*/

<?if (!empty($arResult['PROPTERTIES']['GALLERY']['VALUE']): ?>
	<?php foreach ($arResult['PROPTERTIES']['GALLERY']['VALUE'] as $photo): ?>
		<img src="<?=CFile::GetPath($photo); ?>" alt="" width="200"> // $photo - содержит ID
	<?php endforeach; ?>
<?php endif; ?>



# Авторизация

define('NEED_AUTH', true); // Если инициализировать данную константу значением "true" до подключения пролога, то будет проведена проверка на авторизованность пользователя. Если пользователь не авторизован, то ему будет предложена форма авторизации.

/*
Компонент: system.auth.registration
Компонент: форма авторизации:
Страница регистрации: /auth/registration.php
Страница забытого пароля: /auth/
Страница профиля: /auth/profile.php
+ Показывать ошибки (необходима контстанта NEED_AUTH)
Компонент: настраиваемая регистрация
*/

"AJAX_POST" => 'Y' // отправка данных с помощью AJAX



# Обновление мет

function get_min_price_in_product($id) {
    $arSelect = Array(
       "ID",
       "PROPERTY_PRICE",
   );

   $arFilter = Array(
       "ID"             => $id,
       "IBLOCK_ID"        => IntVal(5),
       "ACTIVE_DATE"    => "Y",
       "ACTIVE"        => "Y",
       ">CATALOG_PRICE_1"        => "0",
   );

   $res = CIBlockElement::GetList(array("CATALOG_PRICE_1"=>'ASC'), $arFilter, false, array('nTopCount' => 1), $arSelect);
   $row = $res->GetNext();

   return number_format($row['CATALOG_PRICE_1'], 0, '', ' ');
}



$obj = new CIBlockSection();
$arSect = $obj->GetList(
   	array(),
   	array(
       'IBLOCK_ID' => $arResult['IBLOCK_ID'],
       'ID' => $arResult['IBLOCK_SECTION_ID'],
   	),
   	false,
   	array('ID', 'UF_PROD_M_TITLE', 'UF_PROD_M_DESCRIPT'),
   	false
);
$rsSect = $arSect->Fetch();

if($rsSect['UF_PROD_M_TITLE']) {
	$min_price = is_array($arResult['PROPERTIES']['SCLAD']['VALUE']) ? get_min_price_in_product($arResult['PROPERTIES']['SCLAD']['VALUE']) : null;
	$meta_title = $rsSect['UF_PROD_M_TITLE'];
	$meta_title = preg_replace('/#H1#/', $arResult["PROPERTIES"]["MENU"]["VALUE"], $meta_title);

	if($min_price) {
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
