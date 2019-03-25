<?

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

if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); // исключить обращение по ссылке к шаблону  ?>


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
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH . '/js/jquery-1.11.1.min.js');
$APPLICATION->AddHeadScript(); // устаревший метод подключения скриптов
Asset::getInstance()->addString('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1>');
Asset::getInstance()->addString('<link href="//fonts.googleapis.com/css?family=Monda" rel="stylesheet" type="text/css">');

$APPLICATION->SetPageProperty('title', 'Заголовок окна браузера');
$APPLICATION->SetTitle('Отзывы');
?>


<? if($GLOBALS['USER']->IsAdmin()): ?>
    <div id="panel"><?$APPLICATION->ShowPanel();?></div> <!-- ПОКАЗ АДМИН ПАНЕЛИ -->
<? endif; ?>

<h1><?$APPLICATION->showTitle(false)?></h1> <!-- ВЫВОД H1 -->


<? 
// file: /local/php_interface/init.php - здесь можно определить пользовательские функции, к-л. логику, которыми хотели бы пользоваться в шаблоне, до его подключения.

define("DEFAULT_TEMPLATE_PATH", "/local/templates/.default"); // теперь можно вместо SITE_TEMPLATE_PATH использовать DEFAULT_TEMPLATE_PATH
define('DEFAULT_TEMPLATE_PATH', BX_PERSONAL_PATH . '/templates/.default'); // путь до папки .default в ядре bitrix

function debug($data) {
	echo "<pre>" . print_r($data) . '<pre>';
}


// file: /local/templates/TEMPLATE_NAME:
debug($arResult); // используем функцию из init.php
// Код шаблона


# появление РЕДАКТОРА ЭЛЕМЕНТА в визуальном редакторе: ?>
<div class="box1" id="<?=$this->GetEditAreaId($arItem['ID']); ?>"> 
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
    <div class="some-elem-class" id="<?=$this->GetEditAreaId($arItem['ID'])?>">
        <!-- Код шаблона элемента -->
    </div>
<? endforeach; ?>


<?
// file: parameters.php, result_modifier.php, component_epilog - позволяют дополнить логику компонента

// file: component_epilog.php (можно создать в папке с шаблоном) будет подключаться после подключения файла с шаблоном. Например, сюда можно поместить подключение компонента "комментарии", для того чтобы он не кэшировался

// file: result_modifier.php - сюда можно, например поместить функцию-обработчик элементов массива $arResult:
foreach ($arResult['ITEMS'] as &$item) {
	$item['PREVIEW_TEXT'] = mbCutString($item['PREVIEW_TEXT'], 50); // mbCutString - пользовательская функция в init.php
}

unset($item); // поскольку массив передаем по ссылке



// ВЫВОД ПАГИНАЦИИ: ?>
<? if ($arParams['DISPLAY_BOTTOM_PAGER']): ?>
	<?=arResult['NAV_STRING']; ?> 
<? endif; ?>



<?
// Настройки главного модуля объединять CSS, JS, получать минифированные версии CSS и JS



// file: .setting.php - настройка debug - более подробный вывод ошибки



/** КОМПОНЕНТЫ:
- Включаемая область

- Меню (Настройки->Настройки продукта->Настройки модулей->Управление структурой->Настройки модуля:Настройки для сайтов)
Возможно подключение определенного шаблона для определенной страницы - выбрать тип условия -> Для папки или файла и условие относительный url (наприм. /blog)

- новости: bitrix:news
- список новостей: bitrix:news.list
- новость: bitrix:news.detail

- структура разделов: bitrix:catalog.section.list

- форма поиска: bitrix:search.form (так же необходимо создать раздел search c файлом index.php)
- стандартная страница поиска: bitrix:search.page
- форма обратной связи: bitrix:main.feedback
    В админке страница переиндексация -> переиндексировать, если поиск работает некорректно.
    
- облако тегов: bitrix:search.tags.cloud  
- форма обратной связи: bitrix: main.feedback

- регистрация: bitrix:system.auth.registration
- настраиваемая регистрация: bitrix:main.register
- параметры пользователя: bitrix:main.register
- system.auth.form
- system.auth.authorize
- system.auth.forgotpasswd
- system.auth.changepasswd

- карта сайта: bitrix:site.map

- комментарии: bitrix: catalog.comments

- каталог: bitrix:catalog
- элементы раздела: bitrix:catalog.section
- элемент: bitrix:catalog.item
- корзина: bitrix:sale.basket.basket
- умный фильтр: bitrix:smart.filter
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
    Права на комментарии: Все посетители - чтение, Авторизованные - запись
*/



# ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ:
/*
    
    В свойствах инфоблока создать новое свойство: 
        Название галерея | тип файл  | множественное - отметить | код - GALLERY | тип загружаемых файлов - изображения
    [PROPTERTIES] => [GALLERY] => [PROPERTY_VALUE_ID] => [44, 45, 46, 47] // ID - картинок
*/
?>

<?if (!empty($arResult['PROPTERTIES']['GALLERY']['VALUE'])): ?>
	<?php foreach ($arResult['PROPTERTIES']['GALLERY']['VALUE'] as $photo): ?>
		<img src="<?=CFile::GetPath($photo); ?>" alt="" width="200"> <!-- $photo - содержит ID, по нему получем путь к картинке -->
	<?php endforeach; ?>
<?php endif; ?>


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
<p>Добро пожаловать: <?=$arResult['USER_NAME']?></p>
<p>Ваш профиль: <a href="<?=$arResult['PROFILE_URL']?>"</p>
<p>Выход: <a href="
        <?=$APPLICATION->GetCurPageParam('logout=yes', ['login', 'logout','register', 'forgot_password', 'change_passwrod'])?>">
        <?=GetMessage('AUTH_LOGOUT_BUTTON')?>
    </a>
</p>
<!-- .... --><?


// создаем file: /auth/registration.php
// Вставляем компонент настраиваемая регистрация - bitrix:main.register



// создаем file: /auth/profile.php
// Вставляем компонент параметры пользователя - bitrix:main.register


// изменяем шаблоны остальных компонентов



# КАРТА САЙТА:
// Главный модуль -> вкладка "Настройки" -> скролл до "Карта сайта" - выбрать из каких меню генерировать ссылки







#@@@ ВЫВОД АКТИВНЫХ НОВОСТЕЙ С УСТАНОВЛЕННЫМ СВОЙСТВОМ SHOW_MAIN:
CModule::IncludeModule('block');
$arSelect = ['ID', 'IBLOCK_ID', 'NAME', 'PREVIEW_TEXT'];
$arFilter = ['IBLOCK_ID' => 1, 'ACTIVE_DATE' => 'Y', 'ACTIVE' => 'Y', '!SHOW_MAIN' => false]; // IBLOCK_ID - ID инфоблока
$res = CIBlockElement::GetList([], $arFilter, false, ['nPageSize' => 4], $arSelect); ?>

<? if ($res->arResult): ?>
    <div class="element">
        <? while($ob = $res->GetNextElement()): $arFields = $ob->GetFields(); ?>
            <? $imgSrc = CFile::GetPath($arFields['DETAIL_PICTURE']); // получение пути к картинке по ID ?>
            <a href="<?=$arFields['DETAIL_PAGE_URL']?>">
                <p><?=$arFields['NAME']?></p>
                <img src="<?=$imgSrc?>"alt="<?=$arFields['NAME']?>">
            </a>
        <? endwhile; ?>
    </div>
<? endif; ?>
<?
// $ob->GetFields() - получение полей. $ob->GetProperties() - получение свойств.



#@@@ ОБНОВЛЕНИЕ МЕТ:
function get_min_price_in_product($id) {
    $arSelect = Array(
       "ID",
       "PROPERTY_PRICE",
   );

   $arFilter = Array(
       "ID" => $id,
       "IBLOCK_ID" => IntVal(5),
       "ACTIVE_DATE" => "Y",
       "ACTIVE" => "Y",
       ">CATALOG_PRICE_1"  => "0",
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



#@@@ Обновление названия и свойства DETAIL_PAGE_URL у карточек товаров в определенных разделах:
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");

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



#@@@ Выбрать элементы раздела, у которых свойство PROPERTY_SHOW_ON совпадает с текущим ID раздела:
$res = CIBlockElement::GetList([], ['IBLOCK_ID' => 5, 'PROPERTY_SHOW_ON' => $arResult['ID']], false, false, ['ID', 'PROPERTY_YOUTUBE_CODE']);

while($arFields = $res->GetNext()) {
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
        ...         
    <? endwhile; ?>
<? endif; ?>

<?
#@@@ ИЗМЕНЕНИЕ arResult + ДОБАВЛЕНИЕ ЦЕН И СВОЙСТВ:
// file: --template-component--/result_modifier.php:

$arSelect = ['ID', 'IBLOCK_ID', 'PROPERTY_INBOX','CATALOG_GROUP_10']; // необходимо определить какие цены используются (по дефолту CATALOG_GROUP_1)
$arFilter = ['IBLOCK_ID' => 31, 'ID' => $offerID];
$dbEl = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);

if ($obEl = $dbEl->Fetch()) {
$arResult['offerData'][$offerID]['Единиц в коробке'] = $obEl['PROPERTY_INBOX_VALUE'];
$arResult['offerData'][$offerID]['Цена'] = $obEl['CATALOG_PRICE_10'];
}