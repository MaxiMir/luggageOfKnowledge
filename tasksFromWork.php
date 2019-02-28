<?
	###################### ЗАДАНИЯ ################################
	
	# Дан список слов неограниченной длины. Необходимо максимально быстрым способом найти количество анаграмм этого слова. Пример: слово - "лото".
	# Список: "тест", "цифра", "отол", "оолт", "кекс" . Результат - 2.
	// JS:
	const getCountAnagram = (data, origStr) => {
	let counter = 0;
	
	  if (data.length > 0 && origStr.length > 0) {
		  const sOrigStr = [...origStr].sort().join();
	    
	    data.forEach(function(currStr) {
			  if (typeof currStr !== 'string') {
				  console.log('Ошибка, элемент не строка');
			  } else {
				  if (origStr.length === currStr.length) {
					  const sCurrStr = [...currStr].sort().join();
	                if (sCurrStr === sOrigStr) counter++;
	            }
			  }
	    });
	  }
	  return counter;
	};
	
	// PHP:
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

	
	# Найти абсолютные ссылки на относительные:
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
	
    # Заменить абсолютные ссылки на относительные:
    
    require 'common/connect.php';
    
    function changeColunmData ($table, $column, $changeText, $newText) {
	    $changeTextScr = addslashes($changeText);
	    $sql = "SELECT id, $column FROM $table WHERE $column LIKE('%{$changeTextScr}%')";
	    $res = mysql_query($sql);
	
	    if (!$res) {
		    return mysql_errno() . ": " . mysql_error() . "\n";
	    } elseif ($resOp = mysql_num_rows($res)) {
		    while ($row = mysql_fetch_assoc($res)) {
			    $id = $row['id'];
			    $currData = $row[$column];
			
			    $newData = addslashes(str_replace($changeText, $newText, $currData));
			    $sqlIns = "UPDATE $table SET $column='$newData' WHERE id=$id";
			    $resIns = mysql_query($sqlIns);
			    if (!$resIns) {
				    print mysql_errno() . ": " . mysql_error() . "\n\n error with id=$id";
			    }
		    }
		
		    $resOpIns = mysql_num_rows($resIns);
		
		    return "change $resOp from $resOpIns <br>";
	    }
    };
    
    
    echo changeColunmData('ap_categories', 'text', '="http://www.stald.ru/', '="/');
    echo changeColunmData('ap_categories', 'text', '=\'http://www.stald.ru/', '=\'/'); 
    
    
    # Создать ассоциативный массив исходя из вложенности разделов:
    
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
			    $branch = [];
			    $stack = [];
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
    
    
    # Динамическая вставка в селекты JQUERY:
    
    /* Текущий относительный url */
    const getURN = () => $(location).attr('pathname');
    
    /* Подгрузка селектов услуг для каждого из врачей */   
    const generateSelects = () => {
	const curURN = getURN();
	
	const nameData = {
		'/some_URN1/': {
			'title': 'name_1',
    			'name1' : ['val1', 'val2', 'val3'],
                'name2' : ['val5', 'val6', 'val7'],
                'name3' : ['val1', 'val8', 'val9'],
    		},
        	'/some_URN2/': {
			'title': 'name_2',
    			'name1' : ['val11', 'val12', 'val13'],
                'name2' : ['val15', 'val16', 'val17'],
                'name4' : ['val11', 'val18', 'val3'],
    		},
    		
        };
        
        const generateSelect = (obj) => {
		let service;
        	
        	$.each(obj, function (name, data) {
		        if (name === 'title') {
			        service = data;
		        } else {
			        const currSelect = $('#' + name + ' .class_item');
			
			        if (currSelect.length > 0) {
				        currSelect.prepend($('<optgroup>', { label: service }));
        				optGroup = currSelect.find(`[label="${service}"]`);

            			const htmlOptions = data.map(function (option) {
					            return '<option value="' + option + '">' + option + '</option>';
				            }).join('\n');

            			optGroup.prepend(htmlOptions);
            		}
		        }
	        });
        };
        

		if (curUrl === '/') {
			$.each(nameData, function (url, obj) {
				generateSelect(obj);
			})
		} else {
			const isServicePage = curUrl in nameData;
			
			if (isServicePage) generateSelect(nameData[curUrl]);
		}
    };

    generateSelects();