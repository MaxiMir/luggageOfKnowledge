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

	
	#@@@ Найти абсолютные ссылки на относительные:
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
	echo $str->getCountAnagram(["тест", "цифра", "отол", "оолт", "кекс", "тест", "цифра", "отол", "оолт", "кекс", "тест", "цифра", "отол", "оолт", "кекс", "тест", "цифра", "отол", "оолт", "кекс"]);
	
	$end = microtime(true);
	echo "\nTIME:". ($end - $start);
	
    
    #@@@ Создать ассоциативный массив исходя из вложенности разделов:
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
    
	
	 #@@@ Рекурсивно собрать родительские урлы:
	function getParentsUrls ($table, $belon, $acc)
	{
		$sqlNewSel = "SELECT name, belon FROM {$table} WHERE id = '{$belon}'";
		$resNewSel = mysql_query($sqlNewSel);
		
		$row = mysql_fetch_assoc($resNewSel);
		$name = $row['name'];
		$pBelon = $row['belon'];
		
		if ($belon == 0) {
			return array_reverse($acc);
		} else {
			$acc[] = $name;
			return getParentsUrls($table, $pBelon, $acc);
		}
	}
	
	
	#@@@ Парсер с callback-функцией:
	function parseCSV($filename, $func)
	{
		$resultLog = __DIR__ . "/resLog.txt";
		$line = 1;
		$errors = 0;
		
		if (!file_exists($filename)) {
			die("Файл не существует: {$filename}<br>");
		}
		
		$csvFile = new SplFileObject($filename);
		
		while (!$csvFile->eof()) {
			try {
				if ($line > 1) {
					$data = $csvFile->fgetcsv(';');
					
					if (!$func($data)) {
						++$errors;
						writeToFile($resultLog, "Ошибка на строке {$line}\n");
					}
				}
				
				++$line;
			} catch (Exception $e) {
				writeToFile($resultLog, $e->getMessage() . "Ошибка на строке {$line}\n c данными: " . print_r($data, true));
			}
		}
		
		writeToFile($resultLog, "Прочитано в '{$filename}' - {$line} строк, из них с ошибками {$errors}");
	}
	
	
	#@@@ Запись в CSV файл:
	function writeOnCSV($filename, $data)
	{
		$csvFile = new SplFileObject($filename, 'a');
		return $csvFile->fputcsv($data, ';');
	}
	
	
	#@@@ Возвращает текущий URN:
	function getCurrURN($url, $urn)
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
	
	#@@@ Запись в конец файла:
	function writeToFile($file, $content)
	{
		$resWrite = file_put_contents($file, $content, FILE_APPEND);
		
		if (!$resWrite) die("Ошибка записи в файл: {$file}");
	}
	
	#@@@ Запись в CSV URN сайта:
	function writeRedirectsAnd404($data)
	{
		$checkURN = $data[0];
		$currURN = getCurrURN('http://www.yandex.ru', $checkURN);
		
		return $checkURN == $currURN ? true : writeOnCSV('getLinks.csv', [$checkURN, $currURN]);
	}
	
	
	
