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

?>
