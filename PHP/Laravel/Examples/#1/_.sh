#1: INSTALL Laravel/Plugin

#2:
$ composer create-project laravel/laravel poligon

#3: INSTALL IDE Helper (https://github.com/barryvdh/laravel-ide-helper)
$ composer require --dev barryvdh/laravel-ide-helper

# FILE composer.json:
<<comment
  "scripts":{
      ...
      "post-update-cmd": [
          "Illuminate\\Foundation\\ComposerScripts::postUpdate",
          "@php artisan ide-helper:generate",
          "@php artisan ide-helper:meta"
      ]
  }
comment

#4 INSTALL laravel-debugbar (запуск ctrl+r)
$ composer require barryvdh/laravel-debugbar --dev

#5 БД:
# > CREATE SCHEMA `poligon` DEFAULT CHARACTER SET utf6mb4 COLLATE utf8mb4_unicode_ci;
# Создаем модели :
$ php artisan make:model Models/BlogCategory -m # в папке Models | -m создать миграцию
$ php artisan make:model Models/BlogPost -m
$ php artisan migrate

# Создаем сиды (тестовые данные /database/seeds):
$ php artisan make:seeder UsersTableSeeder # тестовые пользователи
$ php artisan make:seeder BlogCategoriesTableSeeder # тестовые категории

# Запуск сидов:
$ php artisan db:seed # дергает DatabaseSeeder.php
$ php artisan db:seed --class-UsersTableSeeder # запуск конкретного сида
$ php artisan migrate:refresh --seed # artisan migrate:refresh - rollback по всем миграциям -> заново запустить миграции -> запустить seed


#6 Контроллер
$ php artisan make:controller RestTestController --resource # --resource - для готовых rest функций | создаться в /app/Http/Controllers/
# Базовый (родительский) контроллер блога:
$ php artisan make:controller Blog/BaseController # Blog - подпапка
# Контроллер статей блога:
$ php artisan make:controller Blog/PostController --resource # Blog - подпапка
$ php artisan make:controller Blog/Admin/CategoryController --resource # контроллер для категорий
$ php artisan make:controller Blog/Admin/PostController --resource


#7 REQUESTS:
$ php artisan make:request BlogCategoryUpdateRequest
$ php artisan make:request BlogCategoryCreateRequest


#8 Создание базовых файлов для авторизации/регистрации:
$ php artisan make:auth
# >= 6.0:
$ composer require laravel/ui
$ php artisan ui vue --auth

#9 OBSERVERS:
$ php artisan make:observer BlogPostObserver --model=Models/BlogPost
$ php artisan make:observer BlogCategoryObserver --model=Models/BlogCategory
# Прописать в AppServiceProvider




#10: ОЧЕРЕДИ
<<comment
Очередь (queue) - это некий пул Задач реализованный по принципу FIFO - "первым пришел - первым ушел".

Задача (job) - это целостный элемент очереди (может быть пустой или состоять из одной или более задач).

Воркер (worker) - это приложение, которые прослушивает Очередь и выполняет Задачи.

Пример: отправка почты
comment

# Создаем файл миграции для таблицы jobs. jobs - это таблица Задач, которые можно группировать по Очередям (поле queue)
$ php artisan queue:table

# Создаем файл миграции для таблицы failed_jobs
$ php artisan queue:failed_jobs

# Создаем первые Job`s
$ php artisan make:job BlogPostAfterCreateJob
$ php artisan make:job BlogPostAfterDeleteJob
$ php artisan make:job ProccessVideoJob

# /config/queue.php

# INFO:
$ php artisan route:list # список всех маршрутов приложения
