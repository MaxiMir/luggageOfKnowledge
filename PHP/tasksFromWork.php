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

	class ContentManager
	{
		#@@@ Парсер с callback-функцией:
		public static function parseCSV($filename, $class, $method)
		{
			$line = 1;
			$errors = 0;
			$resultLog = self::createLogBlock();

			if (!file_exists($filename)) {
				die("Файл не существует: {$filename}");
			} elseif (!class_exists($class)) {
			    die("Класс не существует: {$class}");
			} elseif (!method_exists($class, $method)) {
			    die("Метод класса {$class} не существует: {$method}");
			}

			$csvFile = new SplFileObject($filename);

			while (!$csvFile->eof()) {
				try {
					$data = $csvFile->fgetcsv(';');

					if (!empty($data[0]) && $line > 1) {
						$dataOperation = $class->$method($data);
						$isError = $dataOperation['result'] == 'error';

						if ($isError) {
							++$errors;
							$errorData = implode("\n", $dataOperation['errors']);
							self::writeToFile($resultLog, "Строкa № {$line}\n {$errorData} \n");
						}
					}

					++$line;

				} catch (Exception $e) {
					self::writeToFile($resultLog, $e->getMessage() . "Ошибка на строке {$line}\n c данными: " . print_r($data, true));
				}
			}

			self::writeToFile($resultLog, "Прочитано в '{$filename}' - {$line} строк, из них с ошибками {$errors}");
		}

		#@@@ Запись в конец файла:
		public static function writeToFile($file, $content)
		{
			$resWrite = file_put_contents($file, $content, FILE_APPEND);

			if (!$resWrite) die("Ошибка записи в файл: {$file}");
		}

		#@@@ Запись в CSV файл:
		public static function writeOnCSV($filename, $data)
		{
			$csvFile = new SplFileObject($filename, 'a');

			return $csvFile->fputcsv($data, ';');
		}

		#@@@ Создание пустого файла:
		public static function createEmptyTxtFile($path)
		{
			file_put_contents($path, '');
		}

		#@@@ Создание файлов для лога:
		public static function createLogBlock()
		{
			$currDate = date('m-d-y-H:i:s');
			$parentDir = dirname(__DIR__);
			$folderLog = "{$parentDir}/Log/";
			$fileLog = "{$folderLog}{$currDate}.txt";

			if (!file_exists("{$parentDir}/Log/")) {
				mkdir($folderLog);
			}

			if (!file_exists($fileLog)) {
				self::createEmptyTxtFile($fileLog);
			}

			return $fileLog;
		}
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
	
	
	#@@@ Работа с PDO:
	class DMLManager
	{
		public static function getConnection()
		{
			$options = [
				\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
				\PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
				\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES cp1251'
			];

			try {
				return new \PDO('mysql:host=localhost;dbname=mir-door.ru', 'mir-door.ru', '0lD0OgAiQJt8cbZq', $options);
			} catch (\PDOException $e) {
				die('Error connecting to the database: ' . $e->getMessage());
			}
		}

		public static function query($sql)
		{
			return self::getConnection()->query($sql);
		}

		public static function one($sql)
		{
			return self::getConnection()->query($sql)->fetchColumn();
		}

		public static function insert($table, $fields, $values)
		{
			$pdo = self::getConnection();
			$fieldsList = implode(', ', $fields);
			$placeholders = implode(', ', array_fill(0, count($values), '?'));
			$sql = "INSERT INTO {$table} ({$fieldsList}) VALUES ({$placeholders})";
			$stmt = $pdo->prepare($sql);
			$stmt->execute($values);

			if (!$stmt)
				return false;

			return $pdo->lastInsertId();
		}

		public static function update($table, $id, $fields, $values)
		{
			$fieldsData = array_map(function($v) {return "$v=?";}, $fields);
			$fields = implode(', ', $fieldsData);
			$sql = "UPDATE {$table} SET {$fieldsData} WHERE id={$id}";
			$stmt = self::getConnection()->prepare($sql);
			$stmt->execute($values);

			if (!$stmt)
				return false;

			return $stmt->rowCount() == 1;
		}
	}
	
	
	
