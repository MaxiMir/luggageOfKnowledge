<?

######################## .htaccess ########################



# .htaccess - файл дополнительной конфигурации web сервера



# - комментарий
AddDefaultCharset utf-8



# - запрет листинга каталогов
Options -Indexes # разрешить вместо "-" - "+""



# открытие файлов без указания расширения (category.php -> category)
Options +MultiViews 



# Переопределение индексного файла
DirectoryIndex file_php.php



# Видоизменяет листинг каталога
IndexOptions FancyIndexing
IndexOptions FancyIndexing ScanHTMLTitles # добавляет колонку title файлам html



# Исключение из листинга определенных файлов
IndexIgnore *.rar *.zip *.txt # если поставить * - все файлы



# Выполнение кода PHP в не .php файлах
// FILE httpd.conf:
AddType application/x-httpd-php .php .php5 .phtml # файлы которые обрабатываются интерпритатором php, перед отдачей клиенту
AddType application/x-httpd-php .htm .css

// FILE style.css: ?>
<?php header("Content-Type: text/css"); ?>
<?php $bg ="#333"; $color = '#fff'; ?>
body {
	background: <?=$bg?>
	color: <?=$color?>
}



<?php
# Страницы ошибок
ErrorDocument 403 /errors/page403.html
ErrotDocument 404 /errors/page404.html



# Порядок работы директив Allow и Deny
Order Deny,Allow # Deny, Allow - запрет доступа всем, кроме ...
Order Allow, Deny # Allow, Deny - разрешаем всем кроме ...

Deny from all # запрет всем => 403 ошибка
Allow from 127.0.0.1, 127.0.0.2 # разрешена только с этих IP. Можно указывать часть IP адреса или их диапазон
# Стоит учесть тот факт, что содержимое файла будет все-равно доступно другим скриптам.



# Ограничение доступа к файлам
<Files "rar.rar"> # к конкретному файлу
    Deny from all 
    Allow from 127.0.0.1
</Files>    

<Files "rar*.rar"> # ? - любой 1 символ, * - любые символы
    Deny from all 
</Files>

<Files ~ ".+\.(zip|rar)$"> # предпочтительнее использование для регулярок FilesMatch. '.' - любой символ, * - любое количество повторений, + - хотя бы 1 символ
</Files>
<FilesMatch ".+\.(gif|png|jpe?g)$"> # поиск по регулярным выражениям. e? - е необязательный символ
    Deny from all # ограничиваем доступ к картинкам
</FilesMatch>

<FilesMatch "tech\.(html|jpg)$">
	Allow from all # Разрешаем доступ к файлам .html и .jpg
</FilesMatch>



# Редиректы
Redirect /file.html /file.php # по умолч. используется 302 - временно перемещен
Redirect 301 /file.html /file.php # 301 - перемещен навсегда, 410 - удален
RedirectMatch 301 .+\.rar$ /file.php?file=$1 # редирект по регулярному выражению. В $1 - будет содержаться относительный путь до файла
RedirectMatch 301 .*?([^/]+\.(rar|zip))$ /file.php?file=$1 # В $1 - будет содержаться имя файла



# Редиректы с раздела и его подразделов:
RewriteRule ^catalog/podrostkovye/$ /catalog/khardteyl-24/ [R=301,L]
RewriteRule ^catalog/podrostkovye/(.*)$ /catalog/velosipedy-khardteyly/$1 [R=301,L]