<?
# установка 
$ composer create-project yiisoft/yii2-app-basic treasure 2.0.10 # treasure название проекта

# в случае ошибки invalid Configuration -yii\base\InvalidConfigException
// file: config/web.php находим строку:
'cookieValidationKey' => '', // и в '' прописываем любой набор символов


// В корень проекта добавляем .htaccess со следующим содержанием: ?>
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

<? 
// В папку /web добавляем файл .htaccess со следующим содержимым:
RewriteEngine On RewriteBase /
 
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
 
RewriteRule . index.php


// В файле /config/web.php необходимо раскоментировать это:
...
'urlManager' => [
    'enablePrettyUrl' => true,
    'showScriptName' => false,
    'rules' => [
        '' => 'site/index',                                
        '<controller:\w+>/<action:\w+>/' => '<controller>/<action>',
    ],
],


# Миграции
$ cd /treasure
$ php yii migrate/create create_article_table
$ php yii migrate/create create_category_table
$ php yii migrate/create create_tag_table
$ php yii migrate/create create_user_table
$ php yii migrate/create create_comment_table
$ php yii migrate/create create_article_tag_table

# MySQL
// Создаем DB treasure

# file: config/db.php
..'dsn' => '...;dbname=treasure',

# file: /migrations/ml....create_article_table.php, аналогично и для других страниц:

use yii\db\migration;

// ...

class ml....create_article_table extends Migration
{
	// ...
	public function up() # срабатывает при запуске миграции
	{
		$this->createTable('article', [
			'id' => $this->primaryKey(),
			'title' => $this->string(),
			'description' => $this->text(),
			'date' => $this->date(),
			'user_id' => $this->integer(),
		]);
	}

	public function down() # при откате миграции
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


# после заполнения таблиц, запускаем миграции:
$ php yii migrate


# переходим по url: treasure/gii. Выбираем Module Generator
/* в первом поле указываем путь до модуля: app\modules\admin\Module
 * во втором поле указываем его название: admin
 * -> preview -> Generate, копируем код и вставляем в web.php
*/

# переходим по url: treasure/gii/model
/* для создания моделей под все таблицы в БД в поле Table name указываем * -> Preview
 * в code file убираем чекбокс у таблицы models\Migration.php и проставляем models\User.php
 * -> Generate
*/

# переходим по url: treasure/gii/crud
/* Model Class (путь до модели): app\models\Article
 * Search Model Class (путь до модели поиска): app\models\ArticleSearch
 * Controller Class (путь до контроллера): app\models\admin\controllers\ArticleController
 * View Path (путь до видов): @app/modules/admin/views/article
 * -> Preview -> Generate
 * аналогично и для других таблиц (category, tag и т.д.)
*/


# переходим по url: treasure/admin/article

/* Create Article
 * заполняем все поля
 * -> create
 * аналогично и для других таблиц (category, tag и т.д.)
*/


# file: modules/admin/Module.php
// перед $controllerNamespace = 'app\modules\admin\controllers' прописываем название шаблона:
public $layout = '/admin';

# folder: views/layouts/admin.php создаем файл admin.php (копируем все из main.php):
echo Nav::widget([
	// ...
	'items' => [ # здесь меняем на шаблоны админа:
		['label' => 'Home', 'url' => ['/admin/default/index']],	
		['label' => 'Articles', 'url' => ['/admin/article/index']],	
		['label' => 'Categories', 'url' => ['/admin/category/index']],
		['label' => 'Tag', 'url' => ['/admin/tag/index']],	
	// ... дальнейший код можно убрать (это меню пользователя - Login)
	];	
]);


# file: modules/admin/views/article/_form.php:
// убираем ненужные поля, оставляем 'title', 'description', 'content', 'date'

# file: models/Article.php:
public function rules() {
	return [
		[['title'], 'required'], // делаем обязательным
		[['title','description', 'content'], 'string'],
		[['date'], 'date', 'format' => 'php:Y-m-d'],
		[['date'], 'default', 'value' => date('Y-m-d')], // по дефолту текущая дата
		[['title'], 'string', 'max' => 255] // длина поля до 255 
}

# file: modules/controllers/AtricleController.php
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



### Функционал загрузки картинок ###

// file: /modules/admin/views/article/view.php:
<?= Html::a('Update', [...]) ?> // кнопка Update
<?= Html::a('Set Image', ['set-image', 'id' => $model->id], ['class' => 'btn btn-default']) ?> // добавляем новую кнопку
<?= Html::a('Delete', [...]) ?> // кнопка Delete

// file: /modules/admin/controllers/ArticleController.php
    ...
	public function actionSetImage($id) // создаем action для кнопки 'Set Image'. В () какую переменную из адресной строки хотим получить (например ?id=20, и в $id = 20) 
	{
		$model = new ImageUpload; # // класс лежит в /models

		if (Yii::$app->request->isPost) {
			$article = $this->findModel($id); // запрос в БД, здесь ищем статью
			$file = UploadedFile::getInstance($model, 'image'); // ст. метод возвращает файл		
			$article->saveImage($model->uploadFile($file);)
		}

		return $this->render('image'); # название файла в /modules/admin/views/article/image.php
	}
}


// в folder: /modules/admin/views/article/ создаем image.php:
use ...

<div class="article-form">
	<?php $form = ActiveForm::begin(); ?>
	<?= $form->field($model, 'image')->fileInput(['maxlength' => true]) ?> // fileInput - тип поля

	<div class="form-group">
		<?= Html::submitButton('Submit', ['class' => 'btn btn-success']) ?>
	</div>

	<?php ActiveForm::end(); ?>
</div>

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
    ...
	public function saveImage($filename)
	{
		$this->image = $filename;
		$this->save(false); // сохраняем данные в БД, с false в () данных сохраются без валидации
	}
}









# ================================================================================== #

/* folder: /views/layouts/ - папка с шаблонами
 * folder: /views/site/ - папка со всеми views контроллера (здесь - SiteController),
 * именование папок в нижнем регистре
 * folder: /views/site/about.php - вид контроллера actionAbout
 */

/* При переходе на /site/helloworld вывести строку "Hello, world":
 * file: /controllers/SiteController.php:
*/
class SiteController extends Controller
{
    ...
    public function actionHelloWorld()
    {
        return 'Hello, world';
    }
}


/* При переходе на /site/hello вывести строку "<h1>Hello, world</h1>" в текущем шаблоне:
 * file: /controllers/SiteController.php:
 */
class SiteController extends Controller
{
    ...
    public function actionHello() // Hello - название action
    {
        return $this->render('hello'); // в () передаем название необходимого view
    }
}

// folder: /views/site/ создаем файл hello.php:
<h1>Hello, world</h1>



/* url /site/hello - здесь site - controller, hello - action в этом controller
 * Имя controller задается так: названиеController
 * Имя action задается так: actionНазвание, в случае нескольких слов использовать CamelCase.
 * По умолчанию отрабатывает actionIndex
 */



/* При переходе на /my/index (или /my/) вывести '<h1>Hello, {$user}</h1> c именами' в текущем шаблоне:
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

<h1><?="{$hello} {$id}"?></h1>

<?php
    foreach ($names as $name) {
        echo "<p>$name</p>";
    }
?>
    
<?
/* При переходе на /admin/my/index вывести 'ADMIN' в текущем шаблоне
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
<h1>Admin Zone</h1>


/* Класс для debug
 * folder: /controllers/ создаем файл AppController.php:
 */
namespace app\controllers;

use yii\web\Controller;

class AppController extends Controller
{
    public function debug($arr)
    {
        echo '<pre>' . print_r($arr, true) . '</pre>';
    }
}

function debug($arr) // функция для использования в views
{
    echo '<pre>' . print_r($arr, true) . '</pre>';
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

<h1>Test Action</h1>

<?php
    $form = ActiveForm::begin(['options'] => ['id' => 'Tform']); // ActiveForm - виджет - объявление начала создания формы.
    // В options добавляем id форме
    $form->field($model, 'name')->label('Имя'); // настройка поля формы (изменение label)
    $form->field($model, 'email')->input('email');
    $form->field($model, 'password')->passwordInput(); // <-> input('password');
    $form->field($model, 'text')->label('Текст сообщения')->textarea(['rows' => 5]); // настройка поля формы (изменение label и типа на textarea)
    Html::submitButton('Отправить', ['class' => 'btn btn-success']); // создание кнопки
    $form = ActiveForm::end();

    \app\controllers\debug(Yii::$app); /* использование функции для debug.
объект Yii доступен без ипортирования. 2-й вариант создать файл functions.php в корне,
разместить в нем код debug и подключить этот в файл в /web/index.php через require
 */



/* Создание собственного шаблона
 * folder: /views/layouts/ создаем файл basic.php
 */
use app\assets\AppAsset; // класс со стилями/скриптами/зависимостями
use yii\helpers\Html; // класс для генерации html тегов

AppAsset::register($this); // регистрация объекта AppAsset
?>

<?php $this->beginPage();?>
<!DOCTYPE html>
<html lang="<?=Yii::$app->language ?>">
<head>
    <meta charset="<?=Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?=Html::csrfMetaTags() // класс для генерации токенов, позволяет принимать POST запросы ?>
    <title><?=Html::encode($this->title) // Html::encode - экранирование символов ?></title>
    <?php $this->head() // подключение скриптов?>
</head>
<body>
    <?php $this->beginBody() ?>
    
    <div class="wrap">
        <div class="container">
            <ul class="nav nav-pills">
                <li><?= Html::a('Главная', '/web/') ?></li>
                <li><?= Html::a('Статьи', ['post/index']) ?></li>
                <li><?= Html::a('Статья',  ['post/show']) ?></li>
            </ul>
        </div>
    </div>
    
    <?php if (isset($this->blocks['head-block'])) {
        echo $this->blocks['head-block']; // выводим блок из view *1*. !Выведется только для post/show
    ?>
    
    <?=$content ?> <!-- в $content содержится контент страницы -->
    
    <?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage();?>

<?
// file: /config/web:
$config = [
    ...
    'layout' => 'basic' // изменение шаблона всего сайта на 'basic'
    ...
];

// file /controllers/PostController.php:
namespace app\controllers;

use Yii;
use TestForm;

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
	    if (Yii:$app->request->isAjax) { // пришли ли данные Ajax-ом
	        debug(Yii:$app->request->post()); // <-> $_POST
	        return 'test';
	    }
	    
	    $model = new TestForm();
	    $this->title = 'Все статьи'; // задание title в контроллере (1 способ)
	    $this->layout = 'basic'; // изменение шаблона для определенного action
        return $this->render('test', compact('model')); // объект формы передаем во view
	}
    
    public function actionShow()
    {
        $this->title = 'Одна статья';
        $this->view->registerMetaTag([ // задание мета тегов
            'name' => 'keywords',
            'content' => 'ключевики...'
        ]);
        $this->view->registerMetaTag([
            'name' => 'description',
            'content' => 'описание страницы...'
        ]);
        return $this->render('show');
    }
}

// folder: /views/post создаем show.php:
<? $this->title = 'Одна статья'; ?> <!-- задание title в views (2 способ) -->

<? $this->beginBlock('head-block'): ?>  <!-- создаем блок *1* -->
    <h1>Заголовок страницы</h1>
<? $this->endBlock(); ?>

<h1>Show Action</h1>
<button>Click</button>

<? $this->registerJsFile('@web/js/jQueryHandler.js', ['depends' => 'yii\web\YiiAsset']); ?> <!-- регистрация файла - подключаем файл, с указанием зависимостей (подключится после подключения библиотеки jQuery). Так же можно задать position места подключения кода. -->
<?
// 1 вариант:
$this->registerJs("$('.container').append('<p>TEXT</p>');", \yii\web\View::POST_LOAD); // подключение блока кода <-> <script>...</script> По умолч. используется POS_READY - код оборачивается в jQuery(document).ready(),  \yii\web\View::POST_LOAD - оборачивается в jQuery(window).load()

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
                alert('Error!);
            }
       });
    });
JS;

$this->registerJs($script, \yii\web\View::POST_LOAD);

// константы, опции аналогичны для и CSS:
$this->registerJsFile('@web/css/reset.css', ['depends' => 'yii\web\YiiAsset']); // регистрация файла со стилями
$this->registerСss('.container{background: #ccc; }'); // подлючение блока стилей



# Подключение файлов стилей,скриптов и зависимостей в /assets/AppAsset.php:

class AppAsset extends AssetBundle
{
    ...
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
        'yii\bootstrap\BootstrapAsset',
    ];
}



# Форма:
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
}



