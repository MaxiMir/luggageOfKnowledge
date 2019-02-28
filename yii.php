<?
# установка 
$ composer create-project yiisoft/yii2-app-basic treasure 2.0.10 # treasure название проекта

# В корень проекта добавляем .htaccess со следующим содержанием:
?>
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
# В папку /web добавляем файл .htaccess со следующим содержанием:

RewriteEngine On RewriteBase /
 
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
 
RewriteRule . index.php


# В файле /config/web.php раскоментировать это:
 
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
/*
в первом поле указываем путь до модуля: app\modules\admin\Module
во втором поле указываем его название: admin
-> preview -> Generate, копируем код и вставляем в web.php
*/

# переходим по url: treasure/gii/model
/*
для создания моделей под все таблицы в БД в поле Table name указываем * -> Preview
в code file убираем чекбокс у таблицы models\Migration.php и проставляем models\User.php
-> Generate
*/

# переходим по url: treasure/gii/crud
/*
Model Class (путь до модели): app\models\Article
Search Model Class (путь до модели поиска): app\models\ArticleSearch
Controller Class (путь до контроллера): app\models\admin\controllers\ArticleController
View Path (путь до видов): @app/modules/admin/views/article
-> Preview -> Generate
аналогично и для других таблиц (category, tag и т.д.)
*/

# переходим по url: treasure/admin/article

/*
Create Article
заполняем все поля
-> create
аналогично и для других таблиц (category, tag и т.д.)
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

// file: /modules/admin/views/article/view.php

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


// в folder: /modules/admin/views/article/ создаем image.php

use ...

<div class="article-form">
	<?php $form = ActiveForm::begin(); ?>
	<?= $form->field($model, 'image')->fileInput(['maxlength' => true]) ?> // fileInput - тип поля

	<div class="form-group">
		<?= Html::submitButton('Submit', ['class' => 'btn btn-success']) ?>
	</div>

	<?php ActiveForm::end(); ?>
</div>

// в folder: /models создаем ImageUpload.php

name app\models;

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


// file: /modules/Article.php 
// удаляем методы getArticleTags, getComments
...
	public function saveImage($filename)
	{
		$this->image = $filename;
		$this->save(false); // сохраняем данные в БД, с false в () данных сохраются без валидации
	}
}	