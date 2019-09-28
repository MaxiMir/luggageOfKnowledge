<?
	/*@@@
	 Дан список слов неограниченной длины. Необходимо максимально быстрым способом найти количество анаграмм этого
	 слова. Пример: слово - "лото".
	 Список: "тест", "цифра", "отол", "оолт", "кекс" . Результат - 2.
	*/
	
	class StringHandler
	{
		private $origStr;
		private $origLength;
		
		public function __construct(string $str)
		{
			$this->origStr = $str;
			$this->origLength = strlen($str);
		}
		
		public function getValuesInStr(string $str)
		{
			return array_count_values(str_split($str));
		}
		
		public function getCountAnagram(array $data)
		{
			$counter = 0;
			$validData = !empty($data) && $this->origLength > 0;
			
			if ($validData) {
				$origValuesInStr = $this->getValuesInStr($this->origStr);
				
				foreach ($data as $word) {
					if ($this->origLength == strlen($word)) {
						$currValuesInStr = $this->getValuesInStr($word);
						
						if ($origValuesInStr == $currValuesInStr) {
							$counter++;
						}
					}
				}
			}
			
			return $counter;
		}
	}
	
	$start = microtime(true);
	$str = new StringHandler('лото');
	echo $str->getCountAnagram(["тест", "цифра", "отол", "оолт", "кекс", "тест", "цифра", "отол", "оолт", "кекс", "тест", "цифра", "отол", "оолт", "кекс", "тест", "цифра", "отол", "оолт", "кекс", "кекс1"]);
	$end = microtime(true);
	echo "\nTIME:". ($end - $start);
	
	
	

    class URN 
    {
    	#@@@ Возвращает URN с учетом редиректа:
    	public function getCurrURN($url, $urn)
    	{
    		$uri = "{$url}{$urn}";
    		$headers = get_headers($uri, 1);
    		
    		if ($headers[0] == "HTTP/1.1 404 Not Found") {
    			return false;
    		} elseif ($headers[0] == "HTTP/1.1 301 Moved Permanently") {
    			$location = $headers['Location'];
    			$newURN = !is_array($location) ? $location : $location[1];
    			$urn = str_replace($url, '', $newURN);
    		}
    		
    		return $urn;
    	}    
    }
	
	


	#@@@ Генерация sitemap.xml на yii2:
	// FILE: /backend/config/main.php:
	return [
		// ...
		'urlManager' => [
			'enablePrettyUrl' => true,
			'showScriptName' => false,
			/*@ Правила для sitemap @*/
			'rules' => [
				[
					"pattern" => "sitemap",
					"route" => "site/sitemap",
				],
				'<action:login|logout>' => 'site/<action>',
			]
		],
	]   


	// FILE: /frontend/config/urlManager.php
	return [
		// ...
		/*@ sitemap  @*/
		'sitemap' => 'site/sitemap',
	]


	// FILE: /frontend/controllers/SiteController.php:
	namespace frontend\controllers;
		
	use frontend\models\Sitemap;


	class SiteController extends Controller
	{
		// ...
		
		public function actionSitemap()
		{
			$siteMap = new SiteMap();
			$siteMapData = Yii::$app->cache->get('siteMapData');
			$host = Yii::$app->request->hostInfo;
		
			if (!$siteMapData) {
				$siteMapData = $siteMap->getURNData();
				Yii::$app->cache->set('siteMapData', $siteMapData, 3600 * 24);
			}
		
			Yii::$app->response->format = \yii\web\Response::FORMAT_RAW;
			Yii::$app->response->headers->add('Content-Type', 'text/xml');
			
			return $this->renderPartial(
				'xml',
				compact('host', 'siteMapData')
			);
		}
	}

	// FILE: frontend/models/Sitemap.php:
	namespace frontend\models;
	
	use common\models\Category;
	use common\models\Post;
	use Yii;
	use yii\base\Model;
	
	
	/**
	 * Class SiteMap
	 *
	 * @package frontend\models
	 */
	class Sitemap extends Model
	{
		/**
		  * @return array - URN всех страниц
		  */
		function getURNData()
		{
			$categoriesURNs = $this->getCategoriesURN();
			$pagesURNs = $this->getPagesURN();
			
			return array_merge($categoriesURNs, $pagesURNs);
		}
		
		/**
		  * @return array URN - категории
		  */
		function getCategoriesURN()
		{
			$urlsData = [];
			$priority = 0.5;
			
			$categories = Category::find()->all();
			
			foreach ($categories as $category) {
				list($urn, $updDate) = [
					$category->url,
					date('c', $category->updated_at),
				];
				
				$urlsData[$urn] = compact('priority', 'updDate');
			}
			
			return $urlsData;
		}
		
		/**
		  * @return array URN - блог + статика
		  */
		function getPagesURN()
		{
			$sectionBlogId = 17;
			$priority = 0.8;
			$urlsData = [];
			
			$sectionBlogURN = "/" . Post::findOne($sectionBlogId)->slug . "/";
			$posts = Post::find()->all();
			
			foreach ($posts as $post) {
				list($urn, $updDate, $isBlogNews) = [
					"{$post->slug}/",
					date('c', $post->updated_at),
					$post->post_type == 1
				];
				
				$urn = !$isBlogNews ? "/{$urn}" : "{$sectionBlogURN}{$urn}";
				
				$urlsData[$urn] = compact('priority', 'updDate');
			}
			
			return $urlsData;
		}
	}
	
	
	// FILE: frontend/views/site/xml.php: ?>
	<xml version="1.0" encoding="UTF-8">
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			<url>
				<loc><?= $host ?></loc>
				<lastmod>daily</lastmod>
				<priority>1</priority>
			</url>
			<? foreach ($siteMapData as $urn => $siteMapItemData): ?>
				<url>
					<loc><?= $host ?><?= $urn ?></loc>
					<lastmod><?= $siteMapItemData['updDate'] ?></lastmod>
					<priority><?= $siteMapItemData['priority'] ?></priority>
				</url>
			<? endforeach; ?>
		</urlset>
	</xml>




<?
	 
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
	 



	 #@@@ Поддомены YII2:

	 // DNS: serveralias *.имядомена

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