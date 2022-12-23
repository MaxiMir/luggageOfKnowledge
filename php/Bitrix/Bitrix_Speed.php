<?
	 
	######## Ускорение работы сайта на 1С-Битрикс ########
	 
	 
	#@ Включение встроенных инструментов оптимизации 1С-Битрикс:
	/**
	  * Включение оптимизации CSS и JS файлов.
		1. Настройки > Настройка продукта > Настройки модулей > Главный модуль
			> Оптимизация CSS - проставляем везде чекбоксы
			> Быстрая отдача файлов через Nginx -> проставить чекбокс 
		2. Минифицируем CSS и JS файлы
	  
	  * Включение кеширования и управляемого кеширования
		Настройки > Настройка продукта > Автокеширование
		> Включаем автокэширование
		> Включаем управляемый кэш
	  
	  * Включение композитного сайта
		Настройки > Настройка продукта > Композитный сайт
		1. Таб "Композит"
		> Включаем композит
		
		2. Таб "Настройки"
		> Голосование шаблона компонента по умолчанию -> "За"
		> Содержимое компонента -> чекбокс "Статическая область"
		> Режим перезаписи кеша -> Стандартный режим с задержкой перезаписи (рекомендуесый)

		3. Настройки > Настройка продукта > Композитный сайт > Откладка
		> Включаем откладку
		> В режиме инкогнито проходим по страницам по 2 раза
		> Выключаем откладку
		> Если все ок - лог должен быть пустым

	  * Удаление не используемых модулей системы
		> Настройки > Настройка продукта > Модули
		Удаляем не используемые модули (с таблицами на старте)
		Например: 
		- AD/LDAP интеграция
		- Push and Pull
		- REST API
		- Wiki
		- A/B-тестирование
		- Бизнес-процессы
		- Веб-аналитика
		- Веб-кластер
		- Веб-меcсенжер
		- Веб-сервисы
		- Веб-формы
		- Дизайнер бизнес-процессов
		- Документооборот
		- Интеграция с Битрикс24
		- Календарь событий
		- Конверсия
		- Конструктор отчетов
		- Мастер магазина
		- Менеджер идей
		- Мобильная платформа
		- Мобильное приложение для интернет-магазина
		- Обучение
		- Почта
		- Реклама, баннеры
		- Сайты 24
		- Служба сообщений
		- Социальная сеть
		- Социальные сервисы

	  * Запуск оптимизации базы данных
	  
	  * ! Ускорение CDN не включаем
	*/
	 
	 
	 
	 
	#@ Подготавливаем сервер и переносим сайт:
	/**
	  * Устанавливаем свежее веб-окружение
		$ yum install wget 
		$ wget http://repos.1c-bitrix.ru/yum/bitrix-env.sh # битрикс веб-окружение
		$ chmod +x /root/bitrix-env.sh # делаем исполняемым
		$ /root/bitrix-env.sh # устанавливаем веб-окружение
		$ reboot

	  * Включаем и поднастраиваем memcached
		1.
		$ /root/menu.sh # меню виртуальной машины
		> 4. Configure Memcached service for the pool
		> 1. Configure memcached service 
		Enter hostname:
		Вводим текущий ServerName
		10. Background pool tasks # здесь можно отслеживать текущие задачи
			
		2.
		После завершения:
		// FILE: /etc/sysconfig/memcached:
			# Ansible managed
			# memcached settings
			PORT="11211"
			USER="memcached"
			MAXCONN="1024"
			CACHESIZE="512" # макс. размер кэша в оперативной памяти (зависит от конфигурации)
			OPTIONS="-t 8"  # количество потоков

		3.		
		// FILE: /home/bitrix/www/bitrix/php_interface/dbconn.php:
			
			define("BX_CACHE_TYPE", "memcache"); // в качестве кэша используем memcache
			define("BX_CACHE_SID", $_SERVER["DOCUMENT_ROOT"]."#sw"); // # ca - индетификатор сайта (в случае мультисайтовости, чтобы кэши не перемешивались)
			define("BX_MEMCACHE_HOST", "127.0.0.1");
			define("BX_MEMCACHE_PORT", "11211");
		
		4.
		// FILE: /home/bitrix/www/bitrix/.settings_extra.php
			<?php
				return array(
				'cache' => array(
					'value' => array(
					'type' => 'memcache',
					'memcache' => array(
						'host' => '127.0.0.1',
						'port' => '11211',
					),
					'sid' => $_SERVER["DOCUMENT_ROOT"]."#sw" // должен совпадать с SID в dbconn.php
					),
				),
				);
			?>
		
		5.
		$ service memcached restart # перезапускаем сервис memcache

		6. 
		Администрирование > Настройки > Панель производительности
		> Таб "Битрикс" в Хранение кэша должно быть memcache 
		
		7.
		Настройки > Настройка продукта > Композитный сайт	
		> Таб "Настройки"	
		Хранить кэш в -> memcached 
		Кликаем на "проверить соединение"				

		8.
		Настройки > Настройки продукта > Сайты > Список сайтов
		Название -> прописываем SERVER NAME
		Доменное имя -> прописываем SERVER NAME
		Название веб-сайта -> прописываем SERVER NAME
		URL сервера -> прописываем SERVER NAME

		9.
		Настройки > Настройка продукта > Настройки модулей > Главный модуль		
		Название сайта -> прописываем SERVER NAME
		URL сайта -> прописываем SERVER NAME

	  * Получаем SSL сертификат Lets Encrypt
		$ /root/menu.sh 
		> 8. Manage pool web servers
		> 3. Configure certificates
		> 1. Configure "Let`s encrypt" certificate
		Enter site name (default): Enter
		Enter DNS name(s): прописываем SERVER NAME
		Enter email for "Let`s encrypt" notifications: mmirrev@mail.ru
		Please confirm you want to install certificates for the sites (Y|n): Y

	  * Делаем по умолчанию https						
		$ /root/menu.sh 
		> 6. Configure pool sites
		> 5. Change a site`s http settings
		Enter site name (default) or 0 to exit: default
		Do you want to disable HTTP access for the site default (Y|n): Y 

	  * Включаем отдачу композитного кеша через nginx
		$ /root/menu.sh 
		> 9. Configure nginx to use composite cache
		Enter site name (default) or 0 to exit: default

	  * Выполняем проверку сайта из админпанели
		Настройки > Инструменты > Оптимизация БД
		Запускаем оптимизацию
	*/
	 
	 
	 
	 
	#@ Настраиваем генерацию и отдачу WebP изображений:
	 /**
	  * Устанавливаем необходимое ПО на сервере

		$ yum install libwebp-tools #  утилита cwebp - конвертирует изображения в WebP

		Далее, в директории /root/ создаем скрипт webpconverter.sh. Данный скрипт будет рекурсивно проходиться по директории upload и конвертировать все найденные изображения. При этом, он создаст копии изображений в формате .webp рядом с оригиналами. То есть, не удалит оригиналы.

		!!! /home/bitrix/www/upload/ заменятем на свой путь до /upload/:

		#!/usr/bin/env bash

		# converting JPEG images
		find /home/bitrix/www/upload/ -type f -and \( -iname "*.jpg" -o -iname "*.jpeg" \) \
		-exec bash -c '
		webp_path=$(sed 's/\.[^.]*$/.webp/' <<< "$0");
		if [ ! -f "$webp_path" ]; then
		cwebp -quiet -q 90 "$0" -o "$webp_path";
		fi;' {} \;

		# converting PNG images
		find /home/bitrix/www/upload/ -type f -and -iname "*.png" \
		-exec bash -c '
		webp_path=$(sed 's/\.[^.]*$/.webp/' <<< "$0");
		if [ ! -f "$webp_path" ]; then
		cwebp -quiet -lossless "$0" -o "$webp_path";
		fi;' {} \;


		$ chmod +x /root/webpconverter.sh // делаем этот файл исполняемым


		// делаем резервную копию сайта, затем запускаем:
		$ /root/webpconverter.sh

	  * Вешаем на cron автообновление изображений
	 	// FILE: /etc/crontab:
		* /*12 * * * bitrix /root/webpconverter.sh	# вешаем скрипт на крон (исполнение каждые 12)
		
	  * Прописываем настройки в .htaccess
		<IfModule mod_expires.c>
			ExpiresActive on
			ExpiresDefault                                      "access plus 1 month"
			ExpiresByType text/css                              "access plus 1 year"
			ExpiresByType application/atom+xml                  "access plus 1 hour"
			ExpiresByType application/rdf+xml                   "access plus 1 hour"
			ExpiresByType application/rss+xml                   "access plus 1 hour"
			ExpiresByType application/json                      "access plus 0 seconds"
			ExpiresByType application/ld+json                   "access plus 0 seconds"
			ExpiresByType application/schema+json               "access plus 0 seconds"
			ExpiresByType application/vnd.geo+json              "access plus 0 seconds"
			ExpiresByType application/xml                       "access plus 0 seconds"
			ExpiresByType text/xml                              "access plus 0 seconds"
			ExpiresByType image/vnd.microsoft.icon              "access plus 1 week"
			ExpiresByType image/x-icon                          "access plus 1 week"
			ExpiresByType text/html                             "access plus 0 seconds"
			ExpiresByType application/javascript                "access plus 1 year"
			ExpiresByType application/x-javascript              "access plus 1 year"
			ExpiresByType text/javascript                       "access plus 1 year"
			ExpiresByType application/manifest+json             "access plus 1 week"
			ExpiresByType application/x-web-app-manifest+json   "access plus 0 seconds"
			ExpiresByType text/cache-manifest                   "access plus 0 seconds"
			ExpiresByType audio/ogg                             "access plus 1 month"
			ExpiresByType image/bmp                             "access plus 1 month"
			ExpiresByType image/gif                             "access plus 1 month"
			ExpiresByType image/jpeg                            "access plus 1 month"
			ExpiresByType image/png                             "access plus 1 month"
			ExpiresByType image/svg+xml                         "access plus 1 month"
			ExpiresByType image/webp                            "access plus 1 month"
			ExpiresByType video/mp4                             "access plus 1 month"
			ExpiresByType video/ogg                             "access plus 1 month"
			ExpiresByType video/webm                            "access plus 1 month"
			ExpiresByType application/vnd.ms-fontobject         "access plus 1 month"
			ExpiresByType font/eot                              "access plus 1 month"
			ExpiresByType font/opentype                         "access plus 1 month"
			ExpiresByType application/x-font-ttf                "access plus 1 month"
			ExpiresByType application/font-woff                 "access plus 1 month"
			ExpiresByType application/x-font-woff               "access plus 1 month"
			ExpiresByType font/woff                             "access plus 1 month"
			ExpiresByType application/font-woff2                 "access plus 1 month"
			ExpiresByType application/x-font-woff2               "access plus 1 month"
			ExpiresByType font/woff2                             "access plus 1 month"
			ExpiresByType application/font-woff2                "access plus 1 month"
			ExpiresByType text/x-cross-domain-policy            "access plus 1 week"
		</IfModule>
		<IfModule mod_deflate.c>
			AddOutputFilterByType DEFLATE application/javascript
			AddOutputFilterByType DEFLATE application/rss+xml
			AddOutputFilterByType DEFLATE application/vnd.ms-fontobject
			AddOutputFilterByType DEFLATE application/x-font
			AddOutputFilterByType DEFLATE application/x-font-opentype
			AddOutputFilterByType DEFLATE application/x-font-otf
			AddOutputFilterByType DEFLATE application/x-font-truetype
			AddOutputFilterByType DEFLATE application/x-font-ttf
			AddOutputFilterByType DEFLATE application/x-javascript
			AddOutputFilterByType DEFLATE application/xhtml+xml
			AddOutputFilterByType DEFLATE application/xml
			AddOutputFilterByType DEFLATE font/opentype
			AddOutputFilterByType DEFLATE font/otf
			AddOutputFilterByType DEFLATE font/ttf
			AddOutputFilterByType DEFLATE font/woff
			AddOutputFilterByType DEFLATE font/woff2
			AddOutputFilterByType DEFLATE image/svg+xml
			AddOutputFilterByType DEFLATE image/svg
			AddOutputFilterByType DEFLATE image/x-icon
			AddOutputFilterByType DEFLATE text/css
			AddOutputFilterByType DEFLATE text/html
			AddOutputFilterByType DEFLATE text/javascript
			AddOutputFilterByType DEFLATE text/plain
			AddOutputFilterByType DEFLATE text/xml
			AddOutputFilterByType DEFLATE image/webp
			BrowserMatch ^Mozilla/4 gzip-only-text/html
			BrowserMatch ^Mozilla/4\.0[678] no-gzip
			BrowserMatch \bMSIE !no-gzip !gzip-only-text/html
			Header append Vary User-Agent
		</IfModule>

	  * Прописываем конфигурацию в nginx

	  	После того как картинки сконвертируются, нужно сконфигурировать веб сервер nginx.
		Так, что бы он отдавал .webp изображения, при их наличии и оригиналы если .webp вариантов нет (или не поддерживается браузером). Для этого открываем файл виртуального хоста.


		// FILE: /etc/nginx/bx/site_enabled/ssl.s1.conf // путь может отличаться

		И сразу, после указания правила server_name_in_redirect off; дописываем:	
	
		location ~* ^.+\.(jpg|jpeg|gif|png|svg|js|css|woff2|webp)$
		{
			if ( $http_accept ~* webp ) {
				set $webp "A";
			}
			if ( $request_filename ~ (.+)\.(png|jpe?g)$ ) {
				set $file_without_ext $1;
			}
			if ( -f $file_without_ext.webp ) {
				set $webp "${webp}E";
			}
			if ( $webp = AE ) {
				add_header Vary Accept;
				rewrite ^(.+)\.(png|jpe?g)$ $1.webp break;
			}
			expires 365d; # время кэширования в днях
		}

		И перезапускаем nginx:
		$ service nginx restart

		С точки зрения исходного кода, картинки все также будут с расширениями jpeg/png.
		Но в инспекторе, на вкладке Network, должно показать Type - webp
	*/
