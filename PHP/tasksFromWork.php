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
	
	
	
	/*@@@ 
	Создать ассоциативный массив исходя из вложенности разделов:
	*/
    $arElements = [
	    [
		    0 => "Раздел1 КОРЕНЬ",
		    1 => "",
		    2 => "",
		    3 => ""
	    ],
	    [
		    0 => "",
		    1 => "Раздел1 УРОВЕНЬ 2-1",
		    2 => "",
		    3 => ""
	    ],
	    [
		    0 => "",
		    1 => "",
		    2 => "Раздел1 УРОВЕНЬ 3-1",
		    3 => ""
	    ],
	    [
		    0 => "",
		    1 => "",
		    2 => "Раздел1 УРОВЕНЬ 3-2",
		    3 => ""
	    ],
	    [
		    0 => "",
		    1 => "Раздел1 УРОВЕНЬ 2-2",
		    2 => "",
		    3 => ""
	    ],
	    [
		    0 => "",
		    1 => "",
		    2 => "",
		    3 => ""
	    ],
	    [
		    0 => "Раздел1 КОРЕНЬ",
		    1 => "",
		    2 => "",
		    3 => ""
	    ],
	    [
		    0 => "",
		    1 => "",
		    2 => "",
		    3 => ""
	    ],
	    [
		    0 => "Раздел1 КОРЕНЬ",
		    1 => "",
		    2 => "",
		    3 => ""
	    ],
	    [
		    0 => "",
		    1 => "Раздел1 УРОВЕНЬ 3-1",
		    2 => "",
		    3 => ""
	    ],
    ];
        
    function getTree(array $data)
    {
	    $getCatInfo = function (array $arr) {
		    foreach ($arr as $num => $name) {
			    if (!empty($name)) { return [$num, $name]; }
		    }
	    };
	
	    $createEmtyArr = function ($elements, $currCatName, $newCatName) use (&$createEmtyArr) {
		    $newElememts = [];
		
		    foreach ($elements as $key => $val) {
			    $newElememts[$key] = empty($val) ? $val : $createEmtyArr($val, $currCatName, $newCatName);
			    if ($key == $currCatName) {
				    $newElememts[$key][$newCatName] = [];
			    }
		    }
		
		    return $newElememts;
	    };
	
	    $getTreeData = array_reduce(array_keys($data), function($acc, $key) use ($data, $getCatInfo, $createEmtyArr) {
		    ['tree' => $tree, 'branch' => $branch, 'stack' => $stack, 'countDepth' => $countDepth] = $acc;
		    $arr = $data[$key];
		    $lastArr = count($data) - 1;
		    $infoCat = $getCatInfo($arr);
		    $isSeparator = $infoCat == [];
		
		    if ($isSeparator) {
			    $tree = array_merge($tree, $branch);
			    $branch = $stack = [];
			    $countDepth = 0;
		    } else {
			    list($depth, $newCatName) = $infoCat;
			
			    if (empty($stack)) {
				    $branch[$newCatName] = [];
				    array_push($stack, $newCatName);
				    $countDepth++;
			    } else {
				    while($countDepth != $depth) {
					    array_pop($stack);
					    $countDepth--;
				    }
				
				    $branch = $createEmtyArr($branch, end($stack), $newCatName);
				    array_push($stack, $newCatName);
				    $countDepth++;
			    }
			
			    if($key == $lastArr) { $tree = array_merge($tree, $branch); }
		    }
		
		    return ['tree' => $tree, 'branch' => $branch, 'stack' => $stack, 'countDepth' => $countDepth];
		
	    }, ['tree' => [], 'branch' => [], 'stack' => [], 'countDepth' => 0]);
	
	    return $getTreeData['tree'];
    }




    class URN 
    {
    	#@@@ Возвращает текущий URN:
    	public function getCurrURN($url, $urn)
    	{
    		$uri = "{$url}{$urn}";
    		$headers = get_headers($uri, 1);
    		
    		if ($headers[0] == "HTTP/1.1 404 Not Found") {
    			return '404 Not Found';
    		} elseif ($headers[0] == "HTTP/1.1 301 Moved Permanently") {
    			$location = $headers['Location'];
    			$newURN = !is_array($location) ? $location : $location[1];
    			$urn = str_replace($url, '', $newURN);
    		}
    		
    		return $urn;
    	}
    	
    	#@@@ Запись в CSV URN сайта:
    	public function writeRedirectAnd404($data)
    	{
    	    $url = 'https://www.dveri-md.ru/';
    	    $result = 'success';
    	    $csvFile = 'getLinks.csv';
      	    $checkURN = $data[0];
      	    
    		$currURN = getCurrURN($url, $checkURN);
    		
    		if ($checkURN != $currURN) {
    		    $isWritten = ContentManager::writeOnCSV($csvFile, [$checkURN, $currURN]);
    		    
    		    if (!$isWritten) {
    		        $result = 'error';
    		    }
    		}
    		
    		return ['result' => $result];
    	}        
    }
	
	

	#@@@ Генерация sitemap.xml на yii2:
	// FILE: /backend/config/main.php
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