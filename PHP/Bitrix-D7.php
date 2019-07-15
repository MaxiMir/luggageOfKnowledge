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