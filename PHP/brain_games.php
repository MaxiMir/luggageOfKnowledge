Публикация пакета
До того как мы непосредственно приступим к написанию самих игр, нам нужно подготовить composer-пакет и научиться его публиковать.
На этом этапе наш пакет будет представлять из себя программу, которая после установки становится доступной по имени brain-games и при вызове выводит на экран приветствие.


Инициализация пакета


Ссылки
+ Запуск на выполнение и переменная окружения PATH: https://habrahabr.ru/post/105495/

Как я смогу запускать программы на выполнение?
+ https://www.sao.ru/hq/sts/linux/doc/lnag/3.html#run_program

Шебанг
+https://goo.gl/p7IdS8

Composer https://habrahabr.ru/post/145946/

Утилита make: полезный универсальный инструмент программиста youtube

Задачи
Зарегистрируйтесь на сайте https://packagist.org/, это необходимо для возможности публиковать собственные пакеты

Подготовьте операционную систему в соответствии с нашими рекомендациями

Установите php последней версии и composer (https://getcomposer.org/), так чтобы он был доступен глобально по команде composer (https://getcomposer.org/doc/00-intro.md#globally)

Инициализируйте ваш php-пакет внутри папки с проектом, используя команду composer init.

Создайте в папке bin исполняемый файл (говорят бинарник) brain-games.

Сделайте так, чтобы запуск bin/brain-games выводил на экран строку:
  $ bin/brain-games
  Welcome to the Brain Games!


Такой вариант запуска будет работать только в том случае, если файл brain-games является исполняемым, а также в начале файла прописан шебанг с правильно указанным интерпретатором php. Подробнее об этих аспектах нужно прочитать по ссылкам выше.


Публикация в packagist

Код, лежащий на гитхабе, это уже хорошо, но еще недостаточно для того, чтобы другие могли им воспользоваться. Одной из функций composer является публикация пакетов (и обновление) в packagist https://packagist.org/. Это большой каталог php пакетов. Каждый раз, когда вы набираете composer require <vendor>/<package>, то идет установка именно из этого каталога.

В этой части вашей задачей будет подготовка пакета к публикации и, собственно, сама публикация в общем каталоге.  

Ссылки

Packagist ( https://packagist.org/about)- как публиковать пакеты (и интегрироваться с гитхабом)

Полностью настроенный php пакет (https://github.com/hexlet-boilerplates/php-package)- пример, в котором есть все от и до. В любой непоня
тной ситуации сравнивайте свое решение с тем, что сделано в этом шаблоне.

Семантическое версионирование (http://semver.org/lang/ru/)

Как работать с bin в Composer (https://getcomposer.org/doc/articles/vendor-binaries.md)


Задачи

Добавьте созданный bin (brain-games) в composer.json:
  "bin": [
    "bin/brain-games"
  ]

Загрузите свой пакет на packagist по ссылке https://packagist.org/packages/submit

Приложите к шагу аскинему с записанной установкой пакета (глобально) и вызова brain-games как обычной программы

Подсказки

Обратите внимание на то как делается автозагрузка в эталонном пакете в бине.





####

Обычные зависимости — это зависимости, которые будут использоваться в исходном коде проекта и необходимы для его работы. К нип относятся различные подключаемые и используемые библиотеки.

Девелоперские зависимости — зависимости, которые нужны лишь на этапе написания кода и не нужны в продакшене. Например библиотеки для тестирования, на продакшене они совсем необязательны.



шпаргалка по командам composer: https://phpprofi.ru/blogs/post/52

дополнительно: https://habr.com/post/258891/