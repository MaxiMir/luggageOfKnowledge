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



/** # RewriteRule flags
    
    [C]   Chain — объединяет несколько правил в цепочку. Если первое правило
          цепочки не срабатывает, то вся цепочка игнорируется.
    
    [F]   Forbidden — возвращает ошибку 403 Forbidden (запрещено).
    
    [G]   Gone — возвращает ошибку 410 Gone (удалён).
    
    [L]   Last — останавливает процесс преобразования, и текущая ссылка
          считается окончательной.
    
    [N]   Next — запускает процесс преобразования с первого по порядку правила.
    
    [NS]  NoSubreq — разрешает срабатывание правила только для настоящих
          запросов, игнорируя подзапросы.
    
    [NC]  NoCase — отключает проверку регистра символов.
    
    [P]   Proxy — даёт команду Apache выполнить подзапрос к указанной странице
          с использованием программного модуля mod_proxy, при этом пользователь
          ничего не узнает об этом подзапросе. Если модуль mod_proxy отсутствует,
          то произойдет ошибка.
    
    [PT]  PassThrough — останавливает процесс преобразования и передает
          полученную новую ссылку дальше по цепочке.
          
    [QSA] Qsappend — добавляет исходные параметры запроса (Query String)
          к замене. Если замена не включает в себя новые параметры запроса,
          то исходные параметры запроса добавляются автоматически. Если же
          включает, то без флага QSA исходные параметры запроса будут утеряны.
    
    [R]   Redirect — останавливает процесс преобразования и возвращает
          результат браузеру клиента как редирект на новую страницу.
          По умолчанию передаётся HTTP-код 302 Moved Temporarily (перемещенно
          временно), но его можно изменить путём присвоения нового статуса
          через знак равенства [R=301]. В этом случае будет передан HTTP-код
          301 Moved Permanently (перемещено навсегда).
    
    [S]   Skip — пропускает следующее правило, если текущее правило сработало.
          Можно указать количество последующих игнорируемых правил [S=2].
*/