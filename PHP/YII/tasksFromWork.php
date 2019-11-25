<?
	 
	 #@@@ Поддомены YII2:
	 
	 // DNS: serveralias *.имядомена
	 
	 // FILE: /frontend/components/CustomView.php
	 namespace app\components;
	 
	 use yii\helpers\ArrayHelper;
	 use yii\helpers\Html;
	 use yii\web\AssetBundle;
	 use yii\web\View;
	 use frontend\controllers\TownsController;
	 
	 class CustomView extends View
	 {
		  /**
			* @param $viewFile
			* @param $params
			* @param $output HTML с замененными плейсхолдерами поддоменов
			*/
		  public function afterRender($viewFile, $params, &$output)
		  {
				$placeholders = [
					"#town_id#",
					"#town_name#",
					"#nominative_case#",
					"#genitive_case#",
					"#detailed_case#",
					"#accusative_case#",
					"#instrumental_case#",
					"#prepositional_case#",
					"#adress#",
					"#map#",
					"#phone#"
				];
				
				$cityData = TownsController::getCityDataByName();
				
				if (!$cityData) {
					 return;
				}
				
				$replacedValues = array_values($cityData);
				
				$output = str_replace($placeholders, $replacedValues, $output);
		  }
	 }
	 
	 
	 // FILE: /frontend/controllers/TownsController.php
	 namespace frontend\controllers;
	 
	 use Yii;
	 use yii\web\Controller;
	 use app\models\Towns;
	 
	 class TownsController extends Controller
	 {
		  const HOST = ".hoho.ru";
		  const MAIN_CITY_CODE = 'msk';
		  
		  /**
			* @return string символьный код города
			*/
		  private static function getCityName()
		  {
				$serverName = Yii::$app->getRequest()->serverName;
				$city = explode(self::HOST, $serverName)[0];
				return $city == $serverName ? self::MAIN_CITY_CODE : $city;
		  }
		  
		  /**
			* @return mixed данные о городе
			*/
		  public static function getCityDataByName()
		  {
				$cityName = self::getCityName();
				
				$cache = Yii::$app->cache;
				$key = "cityData{$cityName}";
				
				$townData = $cache->get($key);
				
				if ($townData === false) {
					 $townData = Towns::find()->where(['name' => $cityName])->asArray()->one();
					 
					 if (!$townData) {
						  $townData = Towns::find()->where(['name' => self::MAIN_CITY_CODE])->asArray()->one();
					 }
					 
					 $cache->set($key, $townData);
				}
				
				return $townData;
		  }
	 }
	 
	 
	 class m190924_152055_remove_and_add_towns_table extends Migration
	 {
		  public function safeUp()
		  {
				$tableOptions = "";
				
				if ($this->db->driverName === 'mysql') {
					 $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
				}
				
				$this->createTable('towns', [
					'id' => $this->primaryKey(),
					'name' => $this->string()->notNull(), # название
					'nominative_case' => $this->string()->notNull(), # именительный
					'genitive_case' => $this->string()->notNull(), # родительный
					'detailed_case' => $this->string()->notNull(), # дательный
					'accusative_case' => $this->string()->notNull(), # дательный
					'instrumental_case' => $this->string()->notNull(), # творительный
					'prepositional_case' => $this->string()->notNull(), # предложный
					'adress' => $this->text(), # адрес
					'map' => $this->text(), # карта
					'phone' => $this->string(), # телефон
				], $tableOptions);
				
				$this->insert('towns',
					[
						'name' => 'msk', # название
						'nominative_case' => 'Москва', # название
						'genitive_case' => "Москвы", # родительный
						'detailed_case' => "Москве", # дательный
						'accusative_case' => "Москве", # дательный
						'instrumental_case' => "Москвой", # творительный
						'prepositional_case' => "Москве", # предложный
						'adress' => "Москва ул. Б.Сеpпуховская д. 38 к.8", # адрес
						'map' => "<div id=\"YMapsID\" style=\"width: 100%; height: 303px;\">&nbsp;</div>", # карта
						'phone' => "8(495) 587-71-31", # телефон
					]
				);
		  }
		  
		  // ...
	 }
	 
	 
	 
	 
	 #@@@ Карта сайта:
		
	// FILE: .htaccess: ?>
	 RewriteCond %{REQUEST_URI} sitemap.xml
	 RewriteRule sitemap.xml$ sitemap.php [L]
	 RewriteCond %{REQUEST_URI} robots.txt
	 RewriteRule robots.txt$ robots.php [L]

<?
		
	 // FILE /frontend/web/sitemap.php:
	 header("Content-type: text/xml");
	 
	 echo file_get_contents("{$_SERVER['REQUEST_SCHEME']}://{$_SERVER['HTTP_HOST']}/sitemap/");


	 // FILE: frontend/web/robots.php:
	 header("Content-type: text/plain");
	 
	 $host = $_SERVER["HTTP_HOST"];
	 $noIndexHosts = [
		 'tula.domain.ru',
		 'msk.domain.ru',
	 ];
	 
	 $isNoIndexHost = in_array($host, $noIndexHosts);
	 $fileName = !$isNoIndexHost ? 'robots-main.txt' : 'robots-subdomain.txt';
	 
	 $filePathData = [
		 $_SERVER["DOCUMENT_ROOT"],
		 'frontend',
		 'web',
		 $fileName
	 ];
	 
	 $filePath = implode(DIRECTORY_SEPARATOR, $filePathData);
	 
	 echo file_get_contents($filePath);


	// FILE: frontend/web/robots-subdomain.txt: ?>
	 User-agent: *
	 Disallow: /
		  
		  
<?

	// FILE: frontend/web/robots-main.txt: ?>
	 User-agent: *
	 Disallow: /backend/
	 Disallow: /backend/web/
	 Disallow: /backup_db
	 Disallow: /logs
	 Disallow: /tests
	 Disallow: /admin
	 Disallow: /*openstat*
	 Disallow: /*?utm*
	 Disallow: /*&utm*
	 Disallow: /*?from*
	 Disallow: /*&from*
	 Disallow: /*gclid*
	 Disallow: /*yclid*
	 Disallow: /*ymclid*
	 Disallow: /*?tid*
	 Disallow: /*&tid*
	 Disallow: /index.php
	 Disallow: /*?
	 Disallow: /page/
	 Sitemap: https://domain.ru/sitemap.xml


<?

	// FILE: frontend/config/urlManager.php
	 
	 return [
		  // ..
		 'sitemap' => 'site/sitemap',
		  // ..
	 ];
	 
	 
	 // FILE: /frontend/controllers/SiteController.php
	 namespace frontend\controllers;
	 
	 use app\models\ContactForm;
	 use app\models\PasswordResetRequestForm;
	 use app\models\ResetPasswordForm;
	 use app\models\SignupForm;
	 use common\models\Category;
	 use common\models\Client;
	 use common\models\LoginForm;
	 use common\models\Meta;
	 use common\models\Order;
	 use common\models\OrderFast;
	 use common\models\Post;
	 use common\models\Review;
	 use common\models\Service;
	 use frontend\helpers\FSHelper;
	 use frontend\models\Sitemap;
	 use Yii;
	 use yii\base\InvalidParamException;
	 use yii\filters\AccessControl;
	 use yii\filters\VerbFilter;
	 use yii\web\BadRequestHttpException;
	 use yii\web\Controller;
	 use yii\web\UploadedFile;
	 use yii\widgets\DetailView;
	 
	 /**
	  * Site controller
	  */
	 class SiteController extends Controller
	 {
		  // ...
		  
		  /**
			* Генерирует карту сайта (XML)
			* @return mixed
			*/
		  public function actionSitemap()
		  {
				$siteMap = new Sitemap();
				$allMapData = $siteMap->getURNData();
				
				Yii::$app->response->format = \yii\web\Response::FORMAT_RAW;
				Yii::$app->response->headers->add('Content-Type', 'text/xml');
				
				return $this->renderPartial(
					'xml',
					$allMapData
				);
		  }
		  
		  
		  /**
			* Генерирует карту сайта (HTML)
			* @return mixed
			*/
		  public function actionMap()
		  {
				$siteMap = new Sitemap();
				$allMapData = $siteMap->getURNData(true);
				
				return $this->render(
					'map',
					$allMapData
				);
		  }
	 }
	 
	 
	 // FILE: /frontend/models/Sitemap.php
	 namespace frontend\models;
	 
	 use common\models\Category;
	 use common\models\Post;
	 use common\models\Service;
	 use Yii;
	 use yii\base\Model;
	 
	 
	 class Sitemap extends Model
	 {
		  private $priorityCategory = 0.8;
		  private $priorityStatic = 1;
		  private $priorityBlog = 0.7;
		  private $sectionBlogId = 17;
		  
		  /**
			* @param bool $isTreeView
			*
			* @return array SITEMAP DATA всех страниц
			*/
		  function getURNData($isTreeView = false)
		  {
				$host = Yii::$app->request->hostInfo;
				$mapData = Yii::$app->cache->get('mapData');
				
				if (!$mapData) {
					 $categoriesURNs = $this->getCatsUrnDataHub($isTreeView);
					 $pagesURNs = $this->getPagesUrnHub($isTreeView);
					 
					 $mapData = array_merge($categoriesURNs, $pagesURNs);
					 
					 if ($isTreeView) {
						  usort($mapData, function ($a, $b) {
								return $a['data']['priority'] < $b['data']['priority'] ? -1 : 1;
						  });
					 }
					 
					 Yii::$app->cache->set('mapData', $mapData, 3600 * 24);
				}
				
				return compact('host', 'mapData');
		  }
		  
		  /**
			* @param bool $isTreeView
			*
			* @return array SITEMAP DATA категорий
			*/
		  function getCatsUrnDataHub($isTreeView = false)
		  {
				$categories = Category::find()->orderBy('parent_id')->all();
				$services = Service::find()->all();
				
				$categoriesData = [$categories, $services];
				
				if (!$isTreeView) {
					 return $this->getCatsUrnData($categoriesData);
				}
				
				return $this->getCatsUrnTreeData($categoriesData);
		  }
		  
		  /**
			* @param $categoriesData
			*
			* @return array SITEMAP DATA категорий
			*/
		  function getCatsUrnData($categoriesData)
		  {
				$urlsData = [];
				$priority = $this->priorityCategory;
				
				foreach ($categoriesData as $key => $categories) {
					 $titleName = !$key ? 'category_title' : 'service_title';
					 
					 foreach ($categories as $category) {
						  list($urn, $name, $updDate) = [
							  $category->url,
							  $category->$titleName,
							  date('c', $category->updated_at)
						  ];
						  
						  $categoryData = compact('name', 'priority', 'updDate');
						  $urlsData[$urn] = $categoryData;
					 }
				}
				
				return $urlsData;
		  }
		  
		  /**
			* @param $categoriesData
			*
			* @return array SITEMAP DATA категорий в виде дерева
			*/
		  function getCatsUrnTreeData($categoriesData)
		  {
				$dataHub = [
					'categories' => [],
					'services' => []
				];
				$priority = $this->priorityCategory;
				
				foreach ($categoriesData as $key => $categories) {
					 $hubKey = !$key ? 'categories' : 'services';
					 $parentIDName = !$key ? 'parent_id' : 'category_id';
					 $titleName = !$key ? 'category_title' : 'service_title';
					 
					 foreach ($categories as $category) {
						  list($id, $parentID, $urn, $name) = [
							  $category->id,
							  $category->$parentIDName,
							  $category->url,
							  $category->$titleName
						  ];
						  
						  $categoryData = compact('name', 'priority', 'updDate', 'urn', 'parentID');
						  
						  if (!$parentID) {
								if (!isset($dataHub[$hubKey][$id])) {
									 $dataHub[$hubKey][$id] = [];
									 $dataHub[$hubKey][$id]['child'] = [];
								}
								
								$dataHub[$hubKey][$id]['data'] = $categoryData;
						  } else {
								if (!isset($dataHub[$hubKey][$parentID])) {
									 $dataHub[$hubKey][$parentID] = [];
									 $dataHub[$hubKey][$parentID]['child'] = [];
								}
								
								$dataHub[$hubKey][$parentID]['child'][$id] = $categoryData;
						  }
					 }
				}
				
				return $this->appendChild($dataHub);
		  }
		  
		  /**
			* @param $isTreeView
			*
			* @return array SITEMAP DATA блог + статика
			*/
		  function getPagesUrnHub($isTreeView)
		  {
				$sectionBlogURN = "/" . Post::findOne($this->sectionBlogId)->slug . "/";
				$posts = Post::find()->all();
				
				if (!$isTreeView) {
					 return $this->getPagesUrnData($posts, $sectionBlogURN, $this->priorityStatic, $this->priorityBlog);
				}
				
				return $this->getPagesUrnTreeData($posts, $sectionBlogURN, $this->priorityStatic, $this->priorityBlog);
		  }
		  
		  /**
			* @param $posts
			* @param $sectionBlogURN
			* @param $priorityStatic
			* @param $priorityBlog
			*
			* @return array SITEMAP DATA блог + статика
			*/
		  function getPagesUrnData($posts, $sectionBlogURN, $priorityStatic, $priorityBlog)
		  {
				$urlsData = [];
				
				foreach ($posts as $post) {
					 list($urn, $name, $updDate, $isBlogNews) = [
						 "{$post->slug}/",
						 $post->post_name,
						 date('c', $post->updated_at),
						 $post->post_type == 1
					 ];
					 
					 $priority = $isBlogNews ? $priorityBlog : $priorityStatic;
					 $urn = !$isBlogNews ? "/{$urn}" : "{$sectionBlogURN}{$urn}";
					 
					 $postData = compact('name', 'priority', 'updDate');
					 
					 $urlsData[$urn] = $postData;
				}
				
				return $urlsData;
		  }
		  
		  /**
			* @param $posts
			* @param $sectionBlogURN
			* @param $priorityStatic
			* @param $priorityBlog
			*
			* @return array SITEMAP DATA блог + статика в виде дерева
			*/
		  function getPagesUrnTreeData($posts, $sectionBlogURN, $priorityStatic, $priorityBlog)
		  {
				$urlsData = [];
				
				foreach ($posts as $post) {
					 list($id, $urn, $name, $isBlogNews) = [
						 $post->id,
						 "{$post->slug}/",
						 $post->post_name,
						 $post->post_type == 1
					 ];
					 
					 $priority = $isBlogNews ? $priorityBlog : $priorityStatic;
					 $urn = !$isBlogNews ? "/{$urn}" : "{$sectionBlogURN}{$urn}";
					 $isDetailNews = $isBlogNews && $urn != $sectionBlogURN;
					 $postData = compact('name', 'priority', 'updDate', 'urn');
					 
					 if ($isDetailNews) {
						  $urlsData[$this->sectionBlogId]['child'][] = $postData;
						  continue;
					 }
					 
					 $urlsData[$id]['data'] = $postData;
				}
				
				return $urlsData;
		  }
		  
		  /**
			* @param $dataHub
			*
			* @return array SITEMAP DATA со смерженными разделами каталога
			*/
		  function appendChild($dataHub)
		  {
				$categoriesData = $dataHub['categories'];
				$servicesData = $dataHub['services'];
				
				foreach ($servicesData as $serviceID => $serviceData) {
					 $serviceChild = $serviceData['child'];
					 
					 if (isset($categoriesData[$serviceID])) {
						  $parentChild = $categoriesData[$serviceID]['child'];
						  $categoriesData[$serviceID]['child'] = array_replace($parentChild, $serviceChild);
						  
						  continue;
					 }
					 
					 foreach ($categoriesData as $catID => $catData) {
						  $categoryChild = $categoriesData[$catID]['child'];
						  
						  if (!isset($categoryChild[$serviceID])) {
								continue;
						  }
						  
						  if (!isset($categoryChild[$serviceID]['child'])) {
								$categoriesData[$catID]['child'][$serviceID]['child'] = [];
						  }
						  
						  foreach ($serviceChild as $item) {
								array_push($categoriesData[$catID]['child'][$serviceID]['child'], $item);
						  }
					 }
				}
				
				return $categoriesData;
		  }
	 }
	 
	 
	 // FILE: /frontend/views/site/xml.php: ?>
	 <?= '<?xml version="1.0" encoding="UTF-8"?>'; ?>
	 <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		  <url>
				<loc><?= $host ?></loc>
				<lastmod><?= date('c') ?></lastmod>
				<priority>1</priority>
		  </url>
		  
		  <? foreach ($mapData as $urn => $siteMapItemData): ?>
				<url>
					 <loc><?= $host ?><?= $urn ?></loc>
					 <lastmod><?= $siteMapItemData['updDate'] ?></lastmod>
					 <priority><?= $siteMapItemData['priority'] ?></priority>
				</url>
		  <? endforeach; ?>
	 </urlset>
