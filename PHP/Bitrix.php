<?
	 
	 ### Глобальные фильтры на всякие случаи жизни https://camouf.ru/blog-note/4717/
	 
	 
	 #@ БОЛЕЕ ПОДРОБНЫЙ ВЫВОД ОШИБКИ FILE: .setting.php поставить debug => true
	 
	 
	 #@ ИСКЛЮЧИТЬ ОБРАЩЕНИЕ ПО ССЫЛКЕ К ШАБЛОНУ:
	 if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
		  die();
	 }
	 
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
		 array('CONFIRM' => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM'))); ?>
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
	 $params = array(
		 "max_len" => "100",
		 "change_case" => "L",
		 "replace_space" => "_",
		 "replace_other" => "_",
		 "delete_repeat_replace" => "true",
		 "use_google" => "false",
	 );
	 
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
		  [PROPTERTIES] => [GALLERY] => [PROPERTY_VALUE_ID] => [44, 45, 46, 47] // ID - картинок
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
		  
		  $res = CIBlockElement::GetList(array("CATALOG_PRICE_1" => 'ASC'), $arFilter, false, array('nTopCount' => 1),
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
	 
	 
	 #@ ОБНОВЛЕНИЕ НАЗВАНИЯ И СВОЙСТВ DETAIL_PAGE_URL У ТОВАРОВ:
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
								$h1Section = "АВБбшв {$valZhil}х{$valSechenie}";
								break;
						  case '230':
								$h1 = "Кабель ВБбшв {$valZhil}х{$valSechenie}";
								$h1Section = "Вббшв {$valZhil}х{$valSechenie}";
								break;
						  default:
								throw new Exception("Неизвестный ID: {$ID}!");
					 }
					 
					 $cbe = new CIBlockElement;
					 $test = $cbe->Update($arFields["ID"], ['NAME' => $h1Section]);
					 CIBlockElement::SetPropertyValuesEx($arFields["ID"], $IBLOCK_ID, ["NAME_ITEM" => $h1]);
				}
		  }
	 }
	 
	 
	 #@ ВЫБРАТЬ ЭЛЕМЕНТЫ РАЗДЕЛА, У КОТОРЫХ СВОЙСТВО PROPERTY_SHOW_ON СОВПАДАЕТ С ТЕКУЩИМ ID РАЗДЕЛА:
	 $res = CIBlockElement::GetList([], ['IBLOCK_ID' => 5, 'PROPERTY_SHOW_ON' => $arResult['ID']], false, false,
		 ['ID', 'PROPERTY_YOUTUBE_CODE']);
	 
	 while ($arFields = $res->GetNext()) {
		  echo '<pre>';
		  print_r($arFields);
		  echo '</pre>';
	 }
	 
	 
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
	 
	 
	 #@ ИЗМЕНЕНИЕ arResult + ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЬСКОГО СВОЙСТВА:
	 // FILE: --template-component--/result_modifier.php:
	 if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
		  die();
	 }
	 
	 $sectIDs = [];
	 
	 foreach ($arResult['SECTIONS'] as $item) {
		  $sectIDs[] = $item['ID'];
	 }
	 
	 $dbSection = CIBlockSection::GetList(
		 false,
		 [
			 "IBLOCK_ID" => CAT_IBLOCK_ID,
			 "ID" => $sectIDs,
			 "ACTIVE" => "Y",
			 "GLOBAL_ACTIVE" => "Y",
			 "SECTION_ACTIVE" => "Y"
		 ],
		 false,
		 ["UF_SLIDER_IMGS"],
		 false
	 );
	 
	 
	 while ($arRes = $dbSection->Fetch()) {
		  $currImgs = [];
		  foreach ($arRes['UF_SLIDER_IMGS'] as $img) {
				$currImgs[] = CFILE::GetPath($img);
		  }
		  
		  $arResult['SECTIONS'][++$key]['SLIDER_IMGS'] = $currImgs;
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
	 
	 
	 #@ ПОЛУЧИТЬ ВЛОЖЕННЫЕ РАЗДЕЛЫ:
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
					'IMG' => CFILE::GetPath($row['PICTURE']),
					'LINK' => $row['SECTION_PAGE_URL'],
					'MIN_PRICE' => $row['UF_MIN_PRICE'],
				];
		  }
	 }
	 
	 
	 #@ bitrix.news -> section.php:    
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
	 
	 $sectionData = CIBlockSection::GetList(["SORT" => "ASC"], $arFilter, false, $arSelect);
	 
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
	 
	 $rsSect = CIBlockSection::GetList(["SORT" => "ASC"], $arFilter);
?>

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
				<? if ($elemData['ID'] === $childSection['ID']) {
					 continue;
				} ?>
				
				<div class="col-md-4 col-sm-6">
					 <img src="<?= CFILE::GetPath($elemData['PREVIEW_PICTURE']) ?>" alt="<?= $elemData['NAME'] ?>">
					 <div class="property">Цена: <?= $elemData['PROPERTY_PRICE_VALUE'] ?> руб.</div>
				</div>
		  <? endwhile; ?>
	 </div>
<? endwhile ?>


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
						  <img src="<?= CFILE::GetPath($elemData['PREVIEW_PICTURE']) ?>" width="150px"
								 alt="<?= $elemData['NAME'] ?>">
						  <div class="property">
								Цена: <?= $elemData['PROPERTY_PRICE_VALUE'] ?> руб./м<sup>2</sup>
						  </div>
					 </div>
				<? endwhile; ?>
		  </div>
	 </div>
</div>
<?
	 
	 
	 #@ ЗАЛИТЬ РАЗДЕЛЫ/ТОВАРЫ:
	 require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
	 
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
	 $sectionsCData = getSectionsData(FILE_CATALOG);
	 
	 //**@@ Читаем файл и генерируем данные по по разделам палитры:
	 $sectionsPData = getSectionsData(FILE_PALETTE);
	 
	 //**@@ Создаем новые разделы Каталог:
	 createNewSections($sectionsCData, CATALOG_IBLOCK_ID);
	 
	 //**@@ Создаем новые разделы Палитра:
	 createNewSections($sectionsPData, PALETTE_IBLOCK_ID);
	 
	 //**@@ Создаем новые камни:
	 $createData = createElements(FILE_STONES, 'palitra');
	 
	 //**@@ Создаем новые товары:
	 $createData = createElements(FILE_PRODUCTS);
	 $countProducts = $createData['count'];
	 $error = is_null($createData['error']) ? 0 : $createData['error'];
	 echo "Создано {$countProducts} <br> Ошибки: {$error}";
	 
	 //**@@ Меты для разделов:
	 $seoData = getCSVData(FILE_META);
	 updateSections($seoData);
	 
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
					 
					 $urn = implode('/', $clearPartsUrn) . '/';
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
				[
					'parentSectionCODE' => $parentSectionCODE,
					'sectionCODE' => $sectionCODE,
					'nesting' => $nesting
				] = $sectionData;
				
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
				
				[$ID, $NAME, $SECTION_META_TITLE, $SECTION_META_DESCRIPTION] = $itemData;
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
		  
		  [
			  $urn,
			  $NAME,
			  $listPhotos,
			  $PRICE,
			  $DETAIL_TEXT,
			  $parentSectionID,
			  $TITLE,
			  $DESCRIPTION,
			  $SQUARE,
			  $STONE,
			  $TERM_OF_PRODUCTION,
			  $COLOR,
			  $SIZE,
			  $WASH_PRICE,
			  $ADD_INSTALLED,
			  $MATERIAL,
			  $SERVICES,
			  $SINK_METAL_COST,
			  $WASH,
			  $WASH_INTEGRATED,
			  $GROOVE_FOR_WATER,
			  $WASH_INTEGRATED_LIT,
			  $EQUIPMENT
		  ] = $data;
		  
		  $element = new CIBlockElement;
		  
		  
		  # свойства элемента:
		  $props = compact(
			  'PRICE', 'SQUARE', 'TERM_OF_PRODUCTION', 'COLOR', 'SIZE',
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
						 "VALUE" => CFILE::MakeFileArray($imgPath),
					 ];
					 
					 return $acc;
				}, []);
		  }
		  
		  $productData = [
			  "IBLOCK_ID" => CATALOG_IBLOCK_ID,
			  "IBLOCK_SECTION" => [$parentSectionID],
			  "NAMEC" => $NAME,
			  "CODE" => getSymbolCode($urn),
			  "PROPERTY_VALUES" => $props,
			  "ACTIVE" => "Y",
			  "DETAIL_TEXT" => $DETAIL_TEXT,
			  "DETAIL_TEXT_TYPE" => 'html',
			  "DETAIL_PICTURE" => CFILE::MakeFileArray($mainImg),
			  "PREVIEW_PICTURE" => CFILE::MakeFileArray($mainImg),
			  "IPROPERTY_TEMPLATES" => [
				  "ELEMENT_META_TITLE" => $TITLE,
				  "ELEMENT_META_DESCRIPTION" => $DESCRIPTION,
			  ],
		  ];
		  
		  if ($PRODUCT_ID = $element->Add($productData)) {
				return ['result' => true, 'error' => null];
		  }
		  
		  return ['result' => false, 'error' => "Error: {$NAME} " . $element->LAST_ERROR];
		  
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
						 "VALUE" => CFILE::MakeFileArray($imgPath),
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
			  "DETAIL_PICTURE" => CFILE::MakeFileArray($mainImg),
			  "PREVIEW_PICTURE" => CFILE::MakeFileArray($mainImg),
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
	 function getCSVData($fileName)
	 {
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
	 
	 
	 
	 
	 
	 #@@@ Наработки: @@@#
	 
	 <?
    
    use Bitrix\Main\Loader;
    use Bitrix\Main\Context;
    
    Loader::includeModule("iblock");
    Loader::includeSharewareModule("forum");
    
    
    ###### @ HELPERS @ ######
    
    ### распечатываем любое количество аргументов ###
    function dbg(...$args)
    {
        echo '<pre>';
        
        foreach ($args as $arg) {
            print_r($arg);
        }
        
        echo '</pre>';
    }
    
    
    ### обрезаем строку на заданную длину с добавлением маркера ###
    function getTrimLine($str, $length = 100, $trimMarker = '...')
    {
        return mb_strimwidth($str, 0, $length, $trimMarker);
    }
    
    
    ### => данные из кэша (при истекшем $timeSeconds - добавляет в кэш): ###
    function returnResultCache($timeSeconds, $cacheId, $funcName, $arCallbackParams = [])
    {
        $result = false;
        $obCache = new CPHPCache();
        $cachePath = '/'.SITE_ID.'/'.$cacheId;
        
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
    
    ### => CODE раздела || false: ###
    function getCurrentSection($urn)
    {
        $requestUrnData = explode('/', $urn);
        $urnData = array_filter($requestUrnData, function ($partUrb) {
            return $partUrb != '';
        });
        
        return end($urnData);
    }
    
    
    ### => ID раздела по символьному коду: ###
    function getSectionIDByUrn($urn)
    {
        $code = getCurrentSection($urn);
        
        if (!$code) {
            return false;
        }
        
        $arSort = [];
        $arFilter = [
           "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
           "CODE"      => $code,
           "ACTIVE"    => "Y",
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
    
    
    ### => ID родительского "искусственного" раздела || false: ###
    function getParentMadeSectionID($sectionID)
    {
        $arSort = [];
        $arSelect = [
           "ID",
           "UF_SHOW_IN_SECT_MENU",
        ];
        $arFilter = [
           "ID"            => $sectionID,
           "IBLOCK_ID"     => CATALOG_I_BLOCK_ID,
           "GLOBAL_ACTIVE" => "Y",
        ];
        
        $sectionDBData = CIBlockSection::GetList($arSort, $arFilter, false,
           $arSelect);
        
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
           "IBLOCK_ID"             => CATALOG_I_BLOCK_ID,
           "GLOBAL_ACTIVE"         => "Y",
           $keyFilterParentSection => $sectionID,
        ];
        
        if ($excludedIDs) {
            $arFilter['!ID'] = $excludedIDs;
        }
        
        $sectionsDBData = CIBlockSection::GetList($arSort, $arFilter, false,
           $arSelect);
        
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
              "AR_FILTER"        => $arFilter,
              "IS_SEF"           => "Y",
              "SEF_BASE_URL"     => "/categories/",
              "SECTION_PAGE_URL" => "#SECTION_CODE_PATH#/",
              "DETAIL_PAGE_URL"  => "#SECTION_CODE_PATH#/#ELEMENT_CODE#",
              "IBLOCK_TYPE"      => "category",
              "IBLOCK_ID"        => CATALOG_I_BLOCK_ID,
              "CACHE_TYPE"       => "A",
              "CACHE_TIME"       => "1800",
              "GET_ASSOC_ARR"    => $isGetAssocArr,
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
           "IBLOCK_ID"             => CATALOG_I_BLOCK_ID,
           "!UF_SHOW_IN_SECT_MENU" => false,
           "GLOBAL_ACTIVE"         => "Y",
        ];
        
        $sectionsDBData = CIBlockSection::GetList($arSort, $arFilter, false,
           $arSelect);
        
        while ($sectionData = $sectionsDBData->GetNext()) {
            [
               "ID"                   => $id,
               "NAME"                 => $name,
               "SECTION_PAGE_URL"     => $sectionPageURL,
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
                  "IS_PARENT"   => "",
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
           "IBLOCK_ID"     => CATALOG_I_BLOCK_ID,
           "SECTION_ID"    => $sectionID,
           "GLOBAL_ACTIVE" => "Y",
        ];
        
        $sectionsDBData = CIBlockSection::GetList($arSort, $arFilter, false,
           $arSelect);
        
        while ($sectionData = $sectionsDBData->GetNext()) {
            [
               "NAME"             => $name,
               "SECTION_PAGE_URL" => $sectionPageURL,
            ] = $sectionData;
            
            $menuData[] = [
               $name,
               $sectionPageURL,
               [$sectionPageURL],
               [
                  "FROM_IBLOCK" => $fromBlock,
                  "IS_PARENT"   => "",
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
           'ACTIVE'    => 'Y',
        ];
        $arSelect = [
           'NAME',
           'DETAIL_PAGE_URL',
        ];
        
        $res = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);
        
        while ($arFields = $res->GetNext()) {
            ['NAME' => $NAME, 'DETAIL_PAGE_URL' => $DETAIL_PAGE_URL]
               = $arFields;
            
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
                 "IS_PARENT"   => 1,
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
                  "IS_PARENT"   => "",
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
    
    
    ### => все разделы из кэша: ###
    function getAllSectionsFromCache($params)
    {
        $cacheTime = 3600 * 6;
        $cacheID = "allCatalogSections";
        
        return returnResultCache($cacheTime, $cacheID, 'getAllSections',
           $params);
    }
    
    
    ### => данные отзывов с текущими товарами из кэша: ###
    function getResponseDataWithProdsFromCache($prodsDataForResponse, $sectionCode) {
        $cacheTime = 3600;
        $cacheID = "responseDataWithProds{$sectionCode}";
        
        return returnResultCache($cacheTime, $cacheID, 'getResponseDataWithProds', $prodsDataForResponse);
    }
	 
Урл должен сохраняться =)
31 августа
￼
Ник 16:55

)))

там где я пробовал настройки другие у апача походу
5 сентября
￼
Ник 15:5
    
	 // использование:
	 $aMenuLinks = getMenuLinksFromCache();
    
    // и:
    
	 $arResult['ITEMS'] = getCatalogLeftMenuLinksFromCache();
	 
	 
	 #@ СВЯЗКА ОТЗЫВОВ С ФОРУМА И ТОВАРОВ:
	 // FILE: /responses/index.php:
	 require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
	 
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
	 use Bitrix\Main\Loader;
	 use Bitrix\Main\Context;
	 
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
    
    
    ### => проверяем на необходимость сортировки по количеству отзывов к товару: ###
    function isSortByCount()
    {
        $request = Context::getCurrent()->getRequest();
        
        return $request->getQuery("sort") === "count";
    }
    
    
    ### => товары выбранного раздела ###
    function getSectionProducts($sectionCode)
    {
        $productsData = [];
    
        $arFilter = [
           "IBLOCK_ID" => CATALOG_I_BLOCK_ID,
           'ACTIVE'    => 'Y',
           "SECTION_CODE" => $sectionCode
        ];
        $arSelect = [
           'ID',
           'NAME',
           'DETAIL_PAGE_URL',
           'DETAIL_PAGE_URL',
           'PREVIEW_PICTURE',
        ];
    
        $res = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);
    
        while ($prodData = $res->GetNext()) {
            [
               'ID'              => $id,
               'NAME'            => $name,
               'DETAIL_PAGE_URL' => $urn,
               'PREVIEW_PICTURE' => ['SRC' => $src],
            ] = $prodData;
    
            $productsData[$id] = compact('id', 'name', 'urn', 'src');
        }
    
        return $productsData;
    }
    
    
    ### => все разделы инфоблока: ###
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
           "IBLOCK_ID"     => $iBlockID,
           "GLOBAL_ACTIVE" => "Y",
        ];
        
        $sectionsDBData = CIBlockSection::GetList($arSort, $arFilter, false,
           $arSelect);
        
        while ($sectionData = $sectionsDBData->Fetch()) {
            $sectionsData[] = $sectionData;
        }
        
        return $sectionsData;
    }
    
    
    ### => данные товаров в нужном формате для работы с отзывами: ###
    function getProdsDataForResponse($itemsData)
    {
        return array_reduce($itemsData, function ($acc, $item) {
            [
               'ID'              => $id,
               'NAME'            => $name,
               'DETAIL_PAGE_URL' => $urn,
               'PREVIEW_PICTURE' => ['SRC' => $src],
            ]
               = $item;
            
            $acc[$id] = compact('id', 'name', 'urn', 'src');
            
            return $acc;
        }, []);
    }
    
    
    ### => данные отзывов с текущими товарами: ###
    function getResponseDataWithProds($itemsData)
    {
        $responsesData = [];
        $arSort = ["ID" => "DESC"];
        $productsID = array_keys($itemsData);
        $arFilter = [
           "FORUM_ID" => FORUM_ID,
           "APPROVED" => "Y",
           "@PARAM2"  => $productsID,
        ];
        
        $responseDBData = CForumMessage::GetListEx($arSort, $arFilter);
        
        while ($responseData = $responseDBData->Fetch()) {
            [
               "PARAM2"            => $id,
               "AUTHOR_NAME"       => $author,
               "POST_MESSAGE_HTML" => $message,
               "POST_DATE"         => $postDate,
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
    
    
    ### => отсортированные по убыванию количества отзывов к товарам данные отзывов: ###
    function sortResponseDataWithProdsByCount($itemsData)
    {
        usort($itemsData, function ($a, $b) {
            return $b['responseCount'] - $a['responseCount'];
        });
        
        return $itemsData;
    }
    
    
    ### => количество отзывов к товару
    function getProductResponseCount($productID)
    {
        $arSort = [];
        $arFilter = [
           "FORUM_ID" => FORUM_ID,
           "APPROVED" => "Y",
           "@PARAM2"  => $productID,
        ];
        
        return CForumMessage::GetListEx($arSort, $arFilter, true);
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
	 
	 #@ УДАЛЕНИЕ ДУБЛЕЙ ТОВАРОВ + РЕДИРЕКТЫ:
	 use h2o\Redirect\RedirectTable;
	 
	 require_once "{$_SERVER["DOCUMENT_ROOT"]}/bitrix/modules/main/include/prolog_before.php";
	 
	 const CATALOG_IBLOCK_ID = 17;
	 
	 
	 [$origElementsWithDoubles, $doublesElements, $doubleElemCodes] = getCatalogDoublesData();
	 
	 [
		 'toDel' => $toDelProducts,
		 'toSave' => $toSaveProducts
	 ] = splitCatalogDoublesData($origElementsWithDoubles, $doublesElements, $doubleElemCodes);
	 
	 
	 ['errors' => $redirectError] = addRedirectsForCatalogDoubles($toDelProducts, $toSaveProducts, $doubleElemCodes);
	 
	 if ($redirectError) {
		  echo "Error add redirect: <br>" . implode("<br>", $redirectError);
	 }
	 
	 ['errors' => $deleteErrors] = deleteCatalogDoubles($toDelProducts);
	 
	 if ($deleteErrors) {
		  echo "Error delete elements: <br>" . implode("<br>", $deleteErrors);
	 }
	 
	 if (!$redirectError && !$deleteErrors) {
		  echo 'Success';
	 }
	 
	 
	 /**
	  * @return array [
	  *    данные по товарам, имеющими дубли,
	  *    данные по дублями,
	  *    символьные кода товаров
	  * ]
	  */
	 function getCatalogDoublesData()
	 {
		  $origElements = [];
		  $doublesElements = [];
		  $arSort = [];
		  $arFilter = [
			  "IBLOCK_ID" => CATALOG_IBLOCK_ID,
			  "ACTIVE" => "Y",
		  ];
		  $arSelect = [
			  "ID",
			  "NAME",
			  "CODE",
			  "DETAIL_PAGE_URL",
		  ];
		  
		  $dbResElements = CIBlockElement::GetList($arSort, $arFilter, false, false, $arSelect);
		  
		  while ($elemData = $dbResElements->GetNext()) {
				[
					"ID" => $id,
					"NAME" => $name,
					"CODE" => $code,
					"DETAIL_PAGE_URL" => $urn,
				] = $elemData;
				
				$isOrigElem = !array_key_exists($code, $origElements);
				$depth = substr_count($urn, '/') - 2;
				$elemData = compact('id', 'name', 'urn', 'depth');
				
				if ($isOrigElem) {
					 $origElements[$code] = $elemData;
					 continue;
				}
				
				$doublesElements[$code] = $elemData;
		  }
		  
		  $doubleElemCodes = array_keys($doublesElements);
		  $origElementsWithDoubles = array_filter($origElements, function ($key) use ($doubleElemCodes) {
				return in_array($key, $doubleElemCodes);
		  }, ARRAY_FILTER_USE_KEY);
		  
		  return [$origElementsWithDoubles, $doublesElements, $doubleElemCodes];
	 }
	 
	 
	 /**
	  * @param $origElementsWithDoubles
	  * @param $doublesElements
	  * @param $doubleElemCodes
	  * @return mixed * @return mixed [
	  *    'toDel' => данные товаров для удаления,
	  *    'toSave' => данные товаров, которые оставляем
	  * ] (исходя из глубины вложенности товара)
	  */
	 function splitCatalogDoublesData($origElementsWithDoubles, $doublesElements, $doubleElemCodes)
	 {
		  return array_reduce($doubleElemCodes, function ($acc, $code) use ($origElementsWithDoubles, $doublesElements) {
				$origElement = $origElementsWithDoubles[$code];
				$doubleElement = $doublesElements[$code];
				['depth' => $depthOrig] = $origElement;
				['depth' => $depthDouble] = $doubleElement;
				
				$acc['toDel'][$code] = $depthOrig > $depthDouble ? $origElement : $doubleElement;
				$acc['toSave'][$code] = $depthOrig < $depthDouble ? $origElement : $doubleElement;;
				
				return $acc;
		  }, ['toDel' => [], 'toSave' => []]);
	 }
	 
	 /**
	  * @param $toDelProducts
	  * @param $toSaveProducts
	  * @param $doubleElemCodes
	  * @return array [
	  * 'redirects' => данные по проставленным редиректам
	  * 'errors' => не добавленные редиректы
	  * ]
	  */
	 function addRedirectsForCatalogDoubles($toDelProducts, $toSaveProducts, $doubleElemCodes)
	 {
		  $result = [
			  'errors' => [],
			  'redirects' => []
		  ];
		  
		  foreach ($doubleElemCodes as $code) {
				['urn' => $redirectFrom] = $toDelProducts[$code];
				['urn' => $redirectTo] = $toSaveProducts[$code];
				
				if ($redirectFrom == $redirectTo) {
					 continue;
				}
				
				$result['redirects'][] = "FROM: {$redirectFrom} TO: {$redirectTo}";
				
				$dbResAdd = h2o\Redirect\RedirectTable::add([
					"ACTIVE" => "Y",
					"REDIRECT_FROM" => $redirectFrom,
					"REDIRECT_TO" => $redirectTo,
					"IS_REGEXP" => "N",
				]);
				
				$keyData = $dbResAdd ? 'redirects' : 'errors';
				
				$result[$keyData][] = "FROM: {$redirectFrom} TO: {$redirectTo}";
		  }
		  
		  return $result;
	 }
	 
	 /**
	  * @param $toDelProducts
	  * @return array [
	  * 'deletedIDs' => удаленные ID
	  * 'errors' => не удаленные ID
	  * ]
	  */
	 function deleteCatalogDoubles($toDelProducts)
	 {
		  $result = [
			  'errors' => [],
			  'deletedIDs' => []
		  ];
		  
		  foreach ($toDelProducts as $delProduct) {
				['id' => $id] = $delProduct;
				
				$resDel = CIBlockElement::Delete($id);
				$keyData = $resDel ? 'deletedIDs' : 'errors';
				
				$result[$keyData][] = $id;
		  }
		  
		  return $result;
	 }
	 
	 
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
	 
	 
	 #@@@ ЗАЛИВКА РЕЗУЛЬТОВ ФОРМЫ: @@@#
	 use Bitrix\Main\Loader;
	 
	 const FORM_RESPONSE_COMPANY_ID = 10;
	 const RESPONSES_CSV_FILE = "response.csv";
	 
	 Loader::includeModule("form");
	 
	 $responsesData = getCSVData(RESPONSES_CSV_FILE);
	 
	 
	 [
		 'errors' => $errorsResponses,
		 'createdCount' => $createdResponsesCount
	 ] = addAllResponses($responsesData);
	 
	 
	 /**
	  * @param $responsesData
	  * @return array [
	  *   'errors' => ошибки,
	  *   'createdCount' => количество созданных отзывов
	  * ]
	  */
	 function addAllResponses($responsesData)
	 {
		  $result = [
			  'errors' => [],
			  'createdCount' => 0
		  ];
		  
		  foreach ($responsesData as $key => $responseData) {
				if (!$key) {
					 continue;
				}
				
				$resultAdd = addResponseFormResult($responseData);
				
				if (!$resultAdd) {
					 $result['errors'][] = "Не удалось создать отзыв с данными со строки: {$key}";
					 continue;
				}
				
				++$result['createdCount'];
				
		  }
		  
		  return $result;
	 }
	 
	 /**
	  * @param $data
	  * @return bool - создан отзыв с обновленной датой
	  */
	 function addResponseFormResult($data)
	 {
		  global $DB;
		  
		  [$name, $email, $date, $response] = $data;
		  
		  $formData = [
			  "form_text_47" => $name,
			  "form_email_48" => $email,
			  "form_textarea_49" => $response
		  ];
		  
		  if (!$resultFID = CFormResult::Add(FORM_RESPONSE_COMPANY_ID, $formData, "N")) {
				return false;
		  }
		  
		  $DB->PrepareFields("b_form_result");
		  
		  $dbData = [
			  "DATE_CREATE" => "'{$date}'"
		  ];
		  
		  return $DB->Update("b_form_result", $dbData, "WHERE ID='{$resultFID}'") === 1;
	 }

?>

<p>Создано отзывов: <b><?= $createdResponsesCount ?></b></p>

<? if ($errorsResponses): ?>
	 <p><b>Ошибки:</b></p>
	 <p><?= implode("<br>", $errorsResponses) ?> </p>
<? endif; ?>



<?
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
	 if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) {
	 	 die();
	 }
	 
	 if(!is_array($arResult["SECTION"])) {
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
	 
	 
	 
	 #@@@ ЗАЛИВКА СТАТЕЙ: @@@#
	 use Bitrix\Main\Loader;
	 
	 require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
	 
	 # ФАЙЛЫ: #
	 const NEWS_CSV_FILE = "news.csv";
	 const NEWS_SECTIONS_CSV_FILE = "news_sections.csv";
	 
	 
	 Loader::includeModule("iblock");
	 
	 
	 $newsAllData = getCSVData(NEWS_CSV_FILE);
	 $newsSectionData = getCSVData(NEWS_SECTIONS_CSV_FILE);
	 $newsAssocSectionData = convertToAssocArr($newsSectionData);
	 
	 [
		 'errors' => $newsErrors,
		 'createdCount' => $createdNewsCount,
	 ] = createAllNews($newsAllData, $newsAssocSectionData);
	 
	 
	 /**
	  * @param $data
	  * @return mixed ассоциативный массив из массивов с 2 элементами
	  */
	 function convertToAssocArr($data)
	 {
	 	 return array_reduce($data, function ($acc, $sectionData) {
			  [$key, $value] = $sectionData;
			  $acc[$key] = $value;
			
			  return $acc;
		 }, []);
	 }
	 
	 /**
	  * @param       $newsAllData
	  * @param array $newsSectionData
	  *
	  * @return array [
	  *   'errors' => массив с ошибками,
	  *   'createdCount' => количество созданных новостей
	  * ]
	  */
	 function createAllNews($newsAllData, $newsSectionData = [])
	 {
		  $result = [
			  'errors' => [],
			  'createdCount' => 0,
		  ];
		  
		  foreach ($newsAllData as $key => $newsData) {
				if (!$key) {
					 continue;
				}
				
				['error' => $error] = createNews($newsData, $newsSectionData);
				
				if ($error) {
					 $result['errors'][] = "Строка CSV: {$key}<br>Ошибка: {$error}";
					 continue;
				}
				
				++$result['createdCount'];
		  }
		  
		  return $result;
	 }
	 
	 /**
	  * @param $newsData
	  * @param $newsSectionData
	  *
	  * @return array [
	  *    'id' => созданной новости || false,
	  *    'error' => ошибка при создании || null
	  * ]
	  */
	 function createNews($newsData, $newsSectionData)
	 {
		  $dirWithImg = implode(DIRECTORY_SEPARATOR, [__DIR__, 'pic']) . DIRECTORY_SEPARATOR;
		  
		  [$id, $stamp, $time, $date, $title, $text, $img, $imgExt] = $newsData;
		  
		  $iBlockSection = $newsSectionData[$id] ?? '';
		  $previewText = getTrimLine($text, 350);
		  $imgDetailPath = "{$dirWithImg}{$stamp}$imgExt";
		  $imgPreviewPath = "{$dirWithImg}{$stamp}_{$img}$imgExt";
		  
		  $el = new CIBlockElement;

		  $newsData = [
			  "IBLOCK_ID" => ARTICLES_I_BLOCK_ID,
			  "IBLOCK_SECTION" => $iBlockSection,
			  "NAME" => $title,
			  "CODE" => $id,
			  "ACTIVE" => "Y",
			  "PREVIEW_TEXT" => $previewText,
			  "PREVIEW_TEXT_TYPE" => 'html',
			  "DETAIL_TEXT" => $text,
			  "DETAIL_TEXT_TYPE" => 'html'
		  ];

		  if (file_exists($imgDetailPath)) {
				$newsData["DETAIL_PICTURE"] = CFILE::MakeFileArray($imgDetailPath);
		  }

		  if (file_exists($imgPreviewPath)) {
				$newsData["PREVIEW_PICTURE"] = CFILE::MakeFileArray($imgPreviewPath);
		  }

		  if ($newElement = $el->Add($newsData)) {
				return ['id' => $newElement];
		  }

		  return ['error' => $el->LAST_ERROR];
	 }
?>

<p>Создано статей: <b><?= $createdNewsCount ?></b></p>

<? if ($newsErrors): ?>
<p><b>Ошибки:</b></p>
<p><?= implode("<br>", $newsErrors) ?> </p>
<? endif; ?>









<?
	 #@@@ МАСШТАБИРОВАНИЕ ФОТО (сохраняет копию файла и возвращает путь к нему либо возвращает ссылку на картинку-заглушку): @@@#
	 
	 /**
	  * Водяной знак - если существует файл /upload/watermark/watermark_original.png - он будет
	  * смасштабирован под фото и нанесен на всю поверхность с небольшим отступом от края.
	  * watermark_original.png - должен быть большого размера, чтобы не терялось качество.
	  *
	  * @param $imgId
	  * @param $width int
	  * @param $height int Если не задано, будет пропорционально ширине
	  * @param $proportional bool false - Обрезать жестко по заданному размеру (удобно для мини картинок). true - пропорционально (для больших)
	  *
	  * @return string Путь к измененному файлу
	  * @throws Exception File dimensions can not be a null
	  *
	  *
	  */
	 function getResizedImgOrPlaceholder($imgId, $width, $height = "auto", $proportional = true)
	 {
		  if (!$width) {
				throw new \Exception("File dimensions can not be a null");
		  }
		  
		  $resizeType = BX_RESIZE_IMAGE_EXACT;
		  $autoHeightMax = 9999;
		  
		  if ($height == "auto") {
				$height = $autoHeightMax;
				$resizeType = BX_RESIZE_IMAGE_PROPORTIONAL;
		  }
		  
		  if (!$height) {
				$height = $width;
		  }
		  
		  if ($proportional) {
				$resizeType = BX_RESIZE_IMAGE_PROPORTIONAL;
		  }
		  
		  if (!$imgId) {  // если картинка не существует (например, пустое значение некотрого св-ва) - вернем заглушку нужного размера
				// тут можно положить собственную заглушку под стиль сайта
				$customNoImg = SITE_TEMPLATE_PATH . "/upload/img_placeholder.jpg";
				// есть ограничение на размер заглушки на сайте dummyimage.com. можно еще задать цвет фона и текста.
				$height = $height == $autoHeightMax ? $width : $height;
				
				return file_exists($_SERVER["DOCUMENT_ROOT"] . $customNoImg) ? $customNoImg : "http://dummyimage.com/{$width}x{$height}/5C7BA4/fff";
		  }
		  
		  $arFilters = [];
		  /*
			* <watermark>
			* 1) получаем размер ($arDestinationSize) итоговой картинки (фото товара) после ресайза, с учетом типа ресайза ($resizeType)
			* 2) создаем водяной знак под этот размер фото (он должен быть чуть меньше самого фото)
			* 3) формируем фильтр для наложения знака
			* */
		  $watermark = $_SERVER['DOCUMENT_ROOT'] . "/upload/watermark/watermark_original.png";
		  
		  if (is_readable($watermark)) {
				$bNeedCreatePicture = $arSourceSize = $arDestinationSize = false;
				$imgSize = \CFile::GetImageSize($_SERVER["DOCUMENT_ROOT"] . \CFile::GetPath($imgId));
				\CFile::ScaleImage($imgSize["0"], $imgSize["1"], ["width" => $width, "height" => $height], $resizeType,
					$bNeedCreatePicture, $arSourceSize, $arDestinationSize);
				
				$koef = 0.95;
				$watermarkResized = $_SERVER['DOCUMENT_ROOT'] . "/upload/watermark/watermark_" . $arDestinationSize["width"] * $koef . ".png";
				
				if (!is_readable($watermarkResized)) {
					 \CFile::ResizeImageFile($watermark, $watermarkResized,
						 ["width" => $arDestinationSize["width"] * $koef, "height" => $arDestinationSize["height"] * $koef],
						 BX_RESIZE_IMAGE_PROPORTIONAL, false, 95, []);
				}
				
				if (is_readable($watermarkResized)) {
					 $arFilters[] = [
						 "name" => "watermark",
						 "position" => "center",
						 "size" => "real",
						 "file" => $watermarkResized
					 ];
				}
		  }
		  
		  /*
			* </watermark>
			* */
		  $resizedImg = \CFile::ResizeImageGet($imgId, ["width" => $width, "height" => $height], $resizeType, false,
			  $arFilters, false, 100);
		  // если файл по каким-то причинам не создался - вернем заглушку
		  if (!file_exists($_SERVER["DOCUMENT_ROOT"] . $resizedImg['src'])) {
				if ($height == $autoHeightMax) {
					 $height = $width;
				}
				return self::getResizedImgOrPlaceholder(false, $width, $height, $proportional);
		  }
		  
		  return $resizedImg['src'];
	 }

?>

<!-- пример любой картинки, которую нужно пропорционально уменьшить -->
<img src="<?= getResizedImgOrPlaceholder($arResult["DETAIL_PICTURE"]["ID"], $width = 1024) ?>"/>

<!-- пример для большой картинки в карточке товара или в списке товаров -->
<img src="<?= getResizedImgOrPlaceholder($arResult["DETAIL_PICTURE"]["ID"], $width = 600, $height = 400,
	$proportional = true) ?>"/>

<!-- пример для маленькой картинки в слайдере -->
<img src="<?= getResizedImgOrPlaceholder($arResult["DETAIL_PICTURE"]["ID"], $width = 60, $height = 60,
	$proportional = false) ?>"/>
