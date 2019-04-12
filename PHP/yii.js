// УСТАНОВКА
$ composer create-project yiisoft/yii2-app-basic treasure 2.0.10 // treasure название проекта


/* В СЛУЧАЕ ОШИБКИ invalid Configuration -yii\base\InvalidConfigException:
 * file: config/web.php находим строку:
 * 'cookieValidationKey' => '',
 * и в '' прописываем любой набор символов
 */


/* folder: /views/layouts/ - папка с шаблонами
 * folder: /views/site/ - папка со всеми views контроллера (здесь - SiteController),
 * именование папок - в нижнем регистре
 * folder: /views/site/about.php - вид контроллера actionAbout
 */


/** При переходе на /site/helloworld вывести строку "Hello, world":
 * file: /controllers/SiteController.php:
 */
class SiteController extends Controller
{
    // code // code ...
    public function actionHelloWorld()
    {
        return 'Hello, world';
    }
}


/** При переходе на /site/hello вывести строку "<h1>Hello, world<\h1>" в текущем шаблоне:
 * file: /controllers/SiteController.php:
 */
class SiteController extends Controller
{
    // code ...
    public function actionHello() // Hello - название action
    {
        return $this->render('hello'); // в () передаем название необходимого view
    }
}

// folder: /views/site/ создаем файл hello.php:
<h1>Hello, world<\h1>



/* url /site/hello - здесь site - controller, hello - action в этом controller
 * Имя controller задается так: названиеController
 * Имя action задается так: actionНазвание, в случае нескольких слов использовать CamelCase.
 * По умолчанию отрабатывает actionIndex
 */



/** При переходе на /my/index (или /my/) вывести '<h1>Hello, {$user}<\h1> c именами' в текущем шаблоне:
 * folder: /controllers/ создаем файл MyController.php:
 */

namespace app\controllers;

use yii\web\Controller;

class MyController extends Controller
{
    public function actionIndex($id = 'guest') // $id <-> $_GET['id'].
    {
        $hello = 'Hello, ';
        $names = ['Max', 'Andrew', 'Nick'];
        return $this->render('index', compact('hello', 'names', 'id')); // передаем в шаблон переменные (cоздает массив, содержащий названия переменных и их значения).
        // compact('hello', 'names') <-> ['hello' => $hello, 'names' => $names]
    }
    
    public function actionBlogPost() // url:  /my/blog-post
    {
        return 'Blog Post';
    }
}

// folder: /views/ создаем папку my и в ней файл index.php: ?>

<h1><?="{$hello} {$id}"?><\h1>

<?php
    foreach ($names as $name) {
        echo "<p>$name<\p>";
    }
?>



/** При переходе на /admin/my/index вывести 'ADMIN' в текущем шаблоне
 * folder: /controllers/ создаем папку admin c файлом UserController.php:
 */
namespace app\controllers\admin;

use yii\web\Controller;

class UserController extends Controller
{
	public function actionIndex()
	{
        return $this->render('index');
	}
}

// folder: /views/ создаем папку admin с папкой user, а в ней файл index.php:
<h1>Admin Zone<\h1>



/* Класс для debug
 * folder: /controllers/ создаем файл AppController.php:
 */
namespace app\controllers;

use yii\web\Controller;

class AppController extends Controller
{
    public function debug($arr)
    {
        echo '<pre>' . print_r($arr, true) . '<\pre>';
    }
}

function debug($arr) // функция для использования в views
{
    echo '<pre>' . print_r($arr, true) . '<\pre>';
}


/* Созданные контроллеры будут наследовать не Controller, AppController
 * Создаем файл PostController:
 */
namespace app\controllers;

use Yii;

class PostController extends AppController
{
    public function actionTest()
    {
        $this->debug(Yii::$app); // использование функции для debug внутри класса
        return $this->render('test');
    }
}


// folder: /views/ создаем папку post c файлом test:
<?php
    use yii\widgets\ActiveForm;
    use yii\helpers\Html;
?>

<h1>Test Action<\h1>

<?php if (Yii:$app->session->hasFlash('success')): ?> // если есть flash сообщение
    <div class="alert alert-success" role="alert">
        <?= Yii:$app->session->getFlash('success') ?> // выводим его
    <\div>
<?php endif; ?>

<?php if (Yii:$app->session->hasFlash('error')): ?>
    <div class="alert alert-danger" role="alert">
        <?= Yii:$app->session->getFlash('error') ?>
    <\div>
<?php endif; ?>

<?php
    $form = ActiveForm::begin(['options'] => ['id' => 'Tform']); // ActiveForm - виджет - объявление начала создания формы.
    // В options добавляем id форме
    $form->field($model, 'name')->label('Имя'); // настройка поля формы (изменение label (2 способ))
    $form->field($model, 'email')->input('email');
    $form->field($model, 'password')->passwordInput(); // <-> input('password');
    $form->field($model, 'text')->label('Текст сообщения')->textarea(['rows' => 5]); // настройка поля формы (изменение label и типа на textarea)
    Html::submitButton('Отправить', ['class' => 'btn btn-success']); // создание кнопки
    $form = ActiveForm::end();

    \app\controllers\debug(Yii::$app); // использование функции для debug. Объект Yii доступен без ипортирования. 2-й вариант создать файл functions.php в корне, разместить в нем код debug и подключить этот в файл в /web/index.php через require



/** Создание собственного шаблона
 * folder: /views/layouts/ создаем файл basic.php
 */
use app\assets\AppAsset; // класс со стилями/скриптами/зависимостями
use yii\helpers\Html; // класс для генерации html тегов

AppAsset::register($this); // регистрация объекта AppAsset


<?php $this->beginPage();?>
<!DOCTYPE html>
<html lang="<?=Yii::$app->language ?>"> // Динамическое изменение языка
<head>
    <meta charset="<?=Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?=Html::csrfMetaTags() // класс для генерации токенов, позволяет принимать POST запросы ?>
    <title><?=Html::encode($this->title) // Html::encode - экранирование символов ?><\title>
    <?php $this->head() // подключение скриптов?>
<\head>
<body>
    <?php $this->beginBody() ?>
    
    <div class="wrap">
        <div class="container">
            <ul class="nav nav-pills">
                <li><?= Html::a('Главная', '/web/') ?><\li>
                <li><?= Html::a('Статьи', ['post/index']) ?><\li>
                <li><?= Html::a('Статья',  ['post/show']) ?><\li>
            <\ul>
        <\div>
    <\div>
    
    <?php if (isset($this->blocks['head-block'])) {
        echo $this->blocks['head-block']; // выводим блок из view *1*. !Выведется только для post/show
    ?>
    
    <?=$content ?> // в $content содержится контент страницы
    
    <?php $this->endBody() ?>
<\body>
<\html>
<?php $this->endPage();?>


// file: /config/web:
$config = [
    // code ...
    'layout' => 'basic' // изменение шаблона всего сайта на 'basic'
    // code ...
];

// file /controllers/PostController.php:
namespace app\controllers;

use app\models\Category;
use Yii;
use app\models\TestForm;

class PostController extends AppController
{
    public $layout = 'basic'; // изменение шаблона для action контроллера
    
    public function beforeAction($action) // метод выполняется до action
    {
        if ($action->id == 'index') {
            $this->enableCsrfValidation = false; // отключаем csrf валидацию
        }
        
        return parent::beforeAction($action);
    }
    
	public function actionIndex()
	{
        $this->title = 'Все статьи'; // задание title в контроллере (1 способ)
        $this->layout = 'basic'; // изменение шаблона для определенного action
    
	    if (Yii:$app->request->isAjax) { // пришли ли данные Ajax-ом
	        debug(Yii:$app->request->post()); // <-> $_POST
	        return 'test';
	    }
	
	    $model = new TestForm(); // операции INSERT
	    
        if ($model->load(Yii::$app->request->post())) {  // если данные POST успешно загружены
	        if ($model->validate()) { // и данные формы валидны
	           Yii::$app->session->setFlash('success', 'Данные приняты'); // flash сообщения (данные после их запроса будут удалены из сессии)
                return $this->refrash(); // метод перезапрашивает текущую страницу
            } else {
	            Yii::$app->session->setFlash('error', 'Ошибка');
	        }
        }
	    
        return $this->render('test', compact('model')); // объект формы передаем во view
	}
    
    public function actionShow()
    {
        $this->title = 'Одна статья';
        $this->view->registerMetaTag([ // задание мета тегов
            'name' => 'keywords',
            'content' => 'ключевики// code ...'
        ]);
        $this->view->registerMetaTag([
            'name' => 'description',
            'content' => 'описание страницы// code ...'
        ]);
        
        $cats = Category::find()->orderBy('id' => SORT_DESC)->all(); // Category - модель, find()->all() <-> выполнение запроса 'SELECT * FROM Category ORDER BY id DESC'
	    $cats = Category::find()->asArray()->where('parent=691')->limit(1)->all(); // asArray - вытаскивает данные в формате массива. (Вместо $cat->title будет $cat['title'])
	    // one() - одномерный массив с одной записью. Рекомендуется перед ним добавлять limit(1)
        // where['parent' => 691] 2 вариант, limit(2) - первые 2 попавшиеся записи
        // count() - количество выбраннных записей
        // findOne(['parent' => 691]) - возвращает 1 объект с записью. По умолч. ищет по первичному ключу
        // findAll(['parent' => 691]) - возвращает массив объектов записей
        
        $query = "SELECT * FROM categories WHERE title LIKE :search"; // от SQL инъекций
        $cats = Category::findBySql($query, [':search' => '%pp%' ])->all(); // findBySql - метод для выполнения SQL запроса
        
        $cats = Category::findOne(694); // отложенная загрузка *3*. Использование: 1-3 объекта без использование связей
    
        $cats = Category::find()->with('products')->all(); // *4* с with - жадная загрузка, объединение с products
	    
        return $this->render('show', compact('cats'));
    }
}

// folder: /views/post создаем show.php:
<? $this->title = 'Одна статья'; ?> // задание title в views (2 способ)

<? $this->beginBlock('head-block'): ?>  // создаем блок *1*
    <h1>Заголовок страницы<\h1>
<? $this->endBlock(); ?>

<h1>Show Action<\h1>
<button>Click<\button>

// запрос *3* при ленивой загрузке:
debug($cats); // До *2*: свойства products нет
count($cats->products); // *2* ориентируется на название getProducts в модели Products. вернет кол-во продуктов c parent = 684.
debug($cats); // После *2*: свойство products содержит массивы с продуктами
// при этом подходе в примере было 41 запрос к БД

// запрос *4* при жадной загрузке:
foreach ($cats as $cat) { // перебираем в цикле данные из БД
    echo "<ul>";
    echo "<li>{$cat->title}<\li>"; // названия категорий

    $products  = $cat->products; // используем отложенную загрузку
    foreach ($products as $product) {
        echo "<ul>";
        echo "<li>{$product->title}<\li>";
        echo "<ul>";
    }

    echo "<ul>";
}
// при этом подходе в примере было 6 запросов к БД


$this->registerJsFile('@web/js/jQueryHandler.js', ['depends' => 'yii\web\YiiAsset']); // регистрация файла - подключаем файл, с указанием зависимостей (подключится после подключения библиотеки jQuery). Так же можно задать position места подключения кода.

// 1 вариант:
$this->registerJs("$('.container').append('<p>TEXT<\p>');", \yii\web\View::POST_LOAD); // подключение блока кода <-> <script>// code ...<\script> По умолч. используется POS_READY - код оборачивается в jQuery(document).ready(),  \yii\web\View::POST_LOAD - оборачивается в jQuery(window).load()

// 2 вариант:
$script = <<< JS
    $('button').on('click', function() {
       $.ajax({
            url: 'index.php?r=post/index',
            data: {test: '123'},
            type: 'POST',
            success: function (res) {
                console.log(res);
            },
            error: function () {
                alert('Error!');
            }
       });
    });
JS;

$this->registerJs($script, \yii\web\View::POST_LOAD);

// константы, опции аналогичны для и CSS:
$this->registerJsFile('@web/css/reset.css', ['depends' => 'yii\web\YiiAsset']); // регистрация файла со стилями
$this->registerСss('.container{background: //ccc; }'); // подлючение блока стилей



// Подключение файлов стилей,скриптов и зависимостей в /assets/AppAsset.php:

class AppAsset extends AssetBundle
{
    // code ...
    public $css = [ // файл стилей
        'css/site.css', // путь файла: web/css/site.css
    ];
    
	public $js = [ // файл скриптов
	    'js/script.js',
    ];
    
    public $jsOptions = [
        'position' => \yii\web\View::POS_HEAD, // задать позицию скрипта на странице
    ];
    
	public $depends = [ // файл зависимостей (для сооблюдения очередности подключения)
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapPluginAsset',
    ];
}



// ФОРМА:
/* Форма не работает с БД - расширяем класс Modal. Название файла - ИмяформыForm.php
 * Форма работает с БД - расширяем класс Active
 * folder: /models создаем файл TestForm.php:
 */

namespace app\models;

use yii\base\Model;

class TestForm extends Model
{
    public $name;
    public $email;
    public $password;
    public $text;
    
    public function attributeLabels() // изменить label (1 способ)
    {
        return [
            'name' => 'Имя',
            'email' => 'Email',
            'password' => 'Пароль'
            'text' => 'Текст сообщения',
        ]
    }
    
    public function rules()
    {
        return [
            [ ['name', 'email', 'password'], 'required', // обязательные поля
            'message' => ' Поле обязательно' ], // изменение стандартного текста подсказок (срабатывает не для всех валидаторов)
            ['email', 'email'], // задать полю email тип email адреса
            ['name', 'string', 'min' => 2, 'toShort' => 'Мало'], // задаем полю тип строка с минимальной длиной в 2 символа. toShort - текст ошибки
            ['name', 'string', 'max' => 5, 'toLong' => 'Много'], // задаем полю тип строка с максимальной длиной в 5 символов. toLong - текст ошибки
            ['name', 'string', 'legth' => [2, 5]], // задание типа строки с длиной в одну строку
            ['name', 'myRule'] // собственный валидатор
            ['text', 'trim'] // после потери фокуса значение поля пропускают через trim
            ['text', 'safe']  // валидатор данные будут доступны без проверки. Лучше использовать trim
        ];
    }

    public function myRule($attr) // описание собственного валидатора (валидация проходит на сервере)
    {
        if (!in_array($this->attr, ['USA', 'CHINA'])) {
            $this->addError($attr, 'Wrong country!');
        }
    }
}

// file: config/web.php:
$config = [
    // code ...
    'language' => 'ru', // добавляем строку, для изменения текста подсказок на русском + атрибут lang в head
];



// РАБОТА С БД

/*
 * Таблицы и поля именуются в нижнем регистре
 * Слова в названиях разделяются символом подчеркивания (например, product_order)
 * В именах таблиц используются либо единственное число, либо множественное, но не оба сразу.
 * Рекомендуется использовать единственное число.
 * Имена таблиц могут содержать префикс. Например, tbl_. Это особенно полезно, когда таблицы
 * приложения находятся в БД, используемой одновременно др. приложениями.
 */

// file: /config/db.php:
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost:dbname=yii2basic',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8'
];

// folder: /models/ создаем файл Category.php:

namespace app\models;

use yii\db\ActiveRecord;

class Category extends ActiveRecord
{
	// Если мы называем модель по имени таблицы (только первая заглавная), то Yii автоматически свяжет модель с таблицей.
    public static function tableName() // если имя модели не совпадает с названием таблицы
   {
       return 'categories';
   }
}

// ОТЛОЖЕННАЯ И ЖАДНАЯ ЗАГРУЗКА ДАННЫХ

// folder: models создаем файл Product.php:

namespace app\models;

use yii\db\ActiveRecord

class Product extends ActiveRecord
{
    public static function tableName()
    {
       return 'products';
    }
    
    public function getProducts()
    {
        return $this->hasMany(Product::className(), ['parent' => 'id']); // 1 параметр возвращает строку с именем класса,
        // с которым связываем, 2-й параметр массив, где ключ поле связываемой таблицы (products),
        //  а значением поле справочника, на которое мы ссылаемся (category)
	    // hasOne - связь один ко одному / hasMany - связь один ко многим
        // возвращает массив объектов
    }
	
	public function getcategories() // 1 продукту соотвествует 1 категория -> hasOne
	{
	    return $this->hasOne(Category::className(), ['id' => 'parent']);
	    // возвращает объект или null если ничего не найдено
	}
 
}


// ЗАПИСЬ ДАННЫХ В БД

// Создаем таблицу posts:
CREATE TABLE `posts` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    'email' varchar(255) DEFAULT NULL,
    `text` text NOT NULL,
    PRIMARY key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf-8;

// file: models/TestForm.php изменяем:

namespace app\models;
use yii\db\ActiveRecord;

class TestForm extends ActiveRecord
{
    // при использовании ActiveRecord в отличие от Model, объявлять свойства с полями не нужно
	
    public static tableName()
    {
        return 'posts';
    }
   
	public function attributeLabels() // изменить label (1 способ)
	{
        return [
            'name' => 'Имя',
            'email' => 'Email',
            'password' => 'Пароль'
            'text' => 'Текст сообщения',
        ]
	}
	
	public function rules()
	{
        return [
            [ ['name', 'text', 'password'], 'required'], // изменение стандартного текста подсказок (срабатывает не для всех валидаторов)
            ['email', 'email'], // задать полю email тип email адреса
        ];
	}
}

// file: controllers/PostController.php изменяем:
namespace app\controllers;

use app\models\Category;
use Yii;
use app\models\TestForm;

class PostController extends AppController
{
    public $layout = 'basic'; // изменение шаблона для action контроллера

    public function beforeAction($action) // метод выполняется до action
    {
        if ($action->id == 'index') {
            $this->enableCsrfValidation = false; // отключаем csrf валидацию
        }
    
        return parent::beforeAction($action);
    }
    
    public function actionIndex()
    {
        $this->title = 'Все статьи'; // задание title в контроллере (1 способ)
        $this->layout = 'basic'; // изменение шаблона для определенного action
        
        if (Yii:$app->request->isAjax) { // пришли ли данные Ajax-ом
            debug(Yii:$app->request->post()); // <-> $_POST
            return 'test';
        }
        
        $model = new TestForm();
        // 1: сохранение данных вручную:
        $model->name = 'Автор';
        $model->email = 'mail@mail.com';
        $model->name = 'Текст сообщения';
        $model->save(); // сохранение объекта в БД, по умолч. вызывает метод validate. save(false) - сохранение без валидации
  
        if ($model->load(Yii::$app->request->post())) {  // если данные POST успешно загружены
	        //2: сохранение данных из формы
            if ($model->save()) { // и данные формы сохранены
                Yii::$app->session->setFlash('success', 'Данные сохранены'); // flash сообщения (данные после их запроса будут удалены из сессии)
                return $this->refrash(); // метод перезапрашивает текущую страницу
            } else {
                Yii::$app->session->setFlash('error', 'Ошибка');
            }
        }
    
        return $this->render('test', compact('model')); // объект формы передаем во view
    }
    
    public function actionShow()
    {
        $this->title = 'Одна статья';
        $this->view->registerMetaTag([ // задание мета тегов
            'name' => 'keywords',
            'content' => 'ключевики// code ...'
        ]);
        $this->view->registerMetaTag([
            'name' => 'description',
            'content' => 'описание страницы// code ...'
        ]);
        
        $cats = Category::find()->with('products')->all();
        return $this->render('show', compact('cats'));
    }
}


// ОБНОВЛЕНИЕ И УДАЛЕНИЕ ДАННЫХ ИЗ БД

// file: controllers/PostController.php изменяем:

class PostController extends AppController
{
    // code ...
	// если объект получен из БД (например с помощью find, а значит создает объект Active Record) операция - Update
    $post = TestForm::findOne(3); // по умолч. поиск по id
    $post->email = 'example@mail.ru';
    $post->save(); // сохраняем для записи с id = 3 email со значением example@mail.ru
    // если несколько значений используем updateAll
	
	$post = TestForm::findOne(2);
    $post->delete(); // удаляем запись с id = 2
    
    Test::deleteAll('>', 'id', 3); // удаление нескольких значений. По умолч. удаляет все записи
    // code ...
}

// Виджет

/* Виджет в Yii - некая логика, которую можем использовать в видах для реализации
 * повторяющихся вещей.
 */

// folder: / создаем папку components, а в ней файл MyWidget.php:

namespace app\components;

use yii\base\Widget;

class MyWidget extends Widget
{
    public $name; // свойство - передаваемый параметр в виджет
    
    public function init() // занимается нормализацией свойств виджета
    {
        parent::init(); // обязательно выполнение родительского метода
	    //1:
        $this->name ?? 'Guest'; // если не передан задаем значение по умолч.
        //2 буферизация вывода:
        ob_start();
    }
    public function run() // рендерим вид c передачей параметра - /components/views/my.php:
    {
         //1:
         return $this->render('my', ['name' => $this->name]);
         //2 сохраняем в переменную буферизированный вывод:
         $content = ob_get_clean();
         $content = mb_strtoupper($content,'utf-8'); // переводим содержимое в верхний регистр
         return $this->render('my', compact('content'));
    }
}

// file: /views/post/show.php:
use app\components\MyWidget; // импортируем виджет

// code ...
//1:
echo MyWidget::widget(['name' => 'Mike']); // вывод виджета с переданным параметром
//2:
<?php MyWidget::begin()?>
    <p>Some Text!<\p>  // выведет Some Text!, а затем содержимое виджета
<?php MyWidget::end()?>
// code ...

// folder: /components создаем папку views, а в ней файл my.php:
//1:
<p>Hello, <?=$name?><\p>
//2:
<?= $content?>



// Установка расширений из консоли

// Поиск расширений: www.yiiframework.com/extensions

// Устанавливаем jQuery UI:
$ composer require --prefer-dist yiisoft/yii2-jui

// file: /views/post/test.php вставляем UI DatePicker в форму:?>
// code ...
<?= yii\jui\DatePicker::widget(['name' => 'attributeName'])?>
// code ...




// ### СОЗДАНИЕ ЧПУ ###:

// file: /.htaccess:
Options +FollowSymLinks
IndexIgnore */*
RewriteEngine On

RewriteCond %{REQUEST_URI} !^/(web)
RewriteRule ^assets/(.*)$ /web/assets/$1 [L]
RewriteRule ^css/(.*)$ web/css/$1 [L]
RewriteRule ^js/(.*)$ web/js/$1 [L]
RewriteRule ^images/(.*)$ web/images/$1 [L]
RewriteRule (.*) /web/$1

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /web/index.php


// file: /web/.htaccess:
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . index.php



*/// file: /config/web.php раскоментировать строку:
'urlManager' => [
    'enablePrettyUrl' => true,
    'showScriptName' => false, // не показывать /index.php?r=...
    'suffix' => '.html', // ОПЦИОНАЛЬНО! Что дописываем в конец ссылок
    'rules' => [
        '' => 'site/index', // правило для главной страницы
        'about' => 'site/about', // при обращении по /about использовать контроллер site с action about
        'contact' => 'site/contact',
        '<action:(about|contact|login)>' => 'site/<action>', // правила через регулярные выражения для about,contact,login
        '<action:\w+>' => 'site/<action>', // правила - для любого названия action
        'defaultRoute' => 'post/index', // путь по умолчанию
        ['pattern' => '', 'route' => 'site/index', 'suffix' => ''] // отдельное правило для главной страницы
        
    ],
],
// так же дополнительно прописать: 
'request' => [
    // ...
    'baseUrl' => ''
];




// ### ГЕНЕРАЦИЯ ССЫЛОК ###:

use yii\helpers\Url;

// Url::to() вызывает UrlManager::createUrl() для создания URL
$url = Url::to(['post/view', 'id' => 100]);


<?=Html::a('Home', Url::to('/'))?>
<?=Html::a('About', Url::to(['/about']))?>
<?=Html::a('Contact', Url::to(['/contact']))?>



































// **************************************


// В файле /config/web.php необходимо раскоментировать это:
// code ...



// МИГРАЦИИ
$ cd /treasure
$ php yii migrate/create create_article_table
$ php yii migrate/create create_category_table
$ php yii migrate/create create_tag_table
$ php yii migrate/create create_user_table
$ php yii migrate/create create_comment_table
$ php yii migrate/create create_article_tag_table

// MYSQL
// Создаем DB treasure

// file: config/db.php
..'dsn' => '// code ...;dbname=treasure',

// file: /migrations/ml// code ....create_article_table.php, аналогично и для других страниц:

use yii\db\migration;

// // code ...

class ml// code ....create_article_table extends Migration
{
	// // code ...
	public function up() // срабатывает при запуске миграции
	{
		$this->createTable('article', [
			'id' => $this->primaryKey(),
			'title' => $this->string(),
			'description' => $this->text(),
			'date' => $this->date(),
			'user_id' => $this->integer(),
		]);
	}

	public function down() // при откате миграции
	{
		$this->dropTable('article', [
	}
}


// create index for column 'user_id'
$this->createIndex(
	'idx_tag_id',
	'article_tag',
	'tag_id'
);

// add forein key for table 'user'
$this->addForeinKey(
	'fk-tag_id',
	'article_tag',
	'tag_id',
	'tag',
	'id',
	'CASCADE'
);

// create index for column 'article_id'
$this->createIndex(
	'idx_article_id',
	'comment',
	'article_id'
);

// add forein key for table 'article'
$this->addForeinKey(
	'fk-article_id',
	'comment',
	'article_id',
	'article',
	'id',
	'CASCADE'
);


// после заполнения таблиц, запускаем миграции:
$ php yii migrate


// переходим по url: treasure/gii. Выбираем Module Generator
/* в первом поле указываем путь до модуля: app\modules\admin\Module
 * во втором поле указываем его название: admin
 * -> preview -> Generate, копируем код и вставляем в web.php
*/

// переходим по url: treasure/gii/model
/* для создания моделей под все таблицы в БД в поле Table name указываем * -> Preview
 * в code file убираем чекбокс у таблицы models\Migration.php и проставляем models\User.php
 * -> Generate
*/

// переходим по url: treasure/gii/crud
/* Model Class (путь до модели): app\models\Article
 * Search Model Class (путь до модели поиска): app\models\ArticleSearch
 * Controller Class (путь до контроллера): app\models\admin\controllers\ArticleController
 * View Path (путь до видов): @app/modules/admin/views/article
 * -> Preview -> Generate
 * аналогично и для других таблиц (category, tag и т.д.)
*/


// переходим по url: treasure/admin/article

/* Create Article
 * заполняем все поля
 * -> create
 * аналогично и для других таблиц (category, tag и т.д.)
*/


// file: modules/admin/Module.php
// перед $controllerNamespace = 'app\modules\admin\controllers' прописываем название шаблона:
public $layout = '/admin';

// folder: views/layouts/admin.php создаем файл admin.php (копируем все из main.php):
echo Nav::widget([
	// // code ...
	'items' => [ // здесь меняем на шаблоны админа:
		['label' => 'Home', 'url' => ['/admin/default/index']],
		['label' => 'Articles', 'url' => ['/admin/article/index']],
		['label' => 'Categories', 'url' => ['/admin/category/index']],
		['label' => 'Tag', 'url' => ['/admin/tag/index']],
	// // code ... дальнейший код можно убрать (это меню пользователя - Login)
	];
]);


// file: modules/admin/views/article/_form.php:
// убираем ненужные поля, оставляем 'title', 'description', 'content', 'date'

// file: models/Article.php:
public function rules() {
	return [
		[['title'], 'required'], // делаем обязательным
		[['title','description', 'content'], 'string'],
		[['date'], 'date', 'format' => 'php:Y-m-d'],
		[['date'], 'default', 'value' => date('Y-m-d')], // по дефолту текущая дата
		[['title'], 'string', 'max' => 255] // длина поля до 255
}

// file: modules/controllers/AtricleController.php
// заполненные поля из файла models/Article.php приходят сюда

public function actionCreate()
{
	$model = new Article();

	var_dump(Yii::$app->request->post()); // распечатываем данные из формы

	if ($_POST['article']) {
		$model->title = $_POST['Article']['title']; // присваиваем полю title значение из формы. **
		$model->load(Yii:$app->request->post()); // чтобы не прописывать для каждого поля, как в **
		var_dump($model->attributes); // просмотр всех свойств модели
		$model->save(); // перед сохранением проходим процесс валидации по правилам из файла models/Article.php:
	}
}



////// Функционал загрузки картинок //////

// file: /modules/admin/views/article/view.php:
<?= Html::a('Update', [// code ...]) ?> // кнопка Update
<?= Html::a('Set Image', ['set-image', 'id' => $model->id], ['class' => 'btn btn-default']) ?> // добавляем новую кнопку
<?= Html::a('Delete', [// code ...]) ?> // кнопка Delete

// file: /modules/admin/controllers/ArticleController.php
    // code ...
	public function actionSetImage($id) // создаем action для кнопки 'Set Image'. В () какую переменную из адресной строки хотим получить (например ?id=20, и в $id = 20)
	{
		$model = new ImageUpload; // // класс лежит в /models

		if (Yii::$app->request->isPost) {
			$article = $this->findModel($id); // запрос в БД, здесь ищем статью
			$file = UploadedFile::getInstance($model, 'image'); // ст. метод возвращает файл
			$article->saveImage($model->uploadFile($file);)
		}

		return $this->render('image'); // название файла в /modules/admin/views/article/image.php
	}
}


// в folder: /modules/admin/views/article/ создаем image.php:
use // code ...

<div class="article-form">
	<?php $form = ActiveForm::begin(); ?>
	<?= $form->field($model, 'image')->fileInput(['maxlength' => true]) ?> // fileInput - тип поля

	<div class="form-group">
		<?= Html::submitButton('Submit', ['class' => 'btn btn-success']) ?>
	<\div>

	<?php ActiveForm::end(); ?>
<\div>

<?
// в folder: /models создаем ImageUpload.php:

namespace app\models;

use Yii;
use yii\base\Model;
use yii\web\UploadedFile;

class ImageUpload extends Model
{
	public $image;

	public function uploadFile(UploadedFile $file)
	{
		$file->saveAs(Yii::getAlias('@web') . 'uploads/' . $file->name);
		return $file->name;
	}
}

// folder: /web создаем папку uploads

// file: /modules/Article.php удаляем методы getArticleTags, getComments
    // code ...
	public function saveImage($filename)
	{
		$this->image = $filename;
		$this->save(false); // сохраняем данные в БД, с false в () данных сохраются без валидации
	}
}