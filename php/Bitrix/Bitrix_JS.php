<?
	 ########## BITRIX JS ##########
	 
	 #@ Регистрация и подключение библиотек:
	 
	 // Регистрация библиотек в include.php модуля или в init.php:
	 $arJsConfig = [
		 'custom_main' => [
			 'js' => '/bitrix/js/custom/main.js',
			 'css' => '/bitrix/js/custom/main.css',
			 'rel' => [],
			  // коды других BX-библиотек, которые будут автоматически подключены при подключении этой библиотеки.
		 ]
	 ];
	 
	 foreach ($arJsConfig as $ext => $arExt) {
		  \CJSCore::RegisterExt($ext, $arExt);
	 }
	 
	 
	 // Когда библиотеки зарегистрированы, их можно подключить с помощью следующей конструкции:
	 CUtil::InitJSCore(['custom_main']);