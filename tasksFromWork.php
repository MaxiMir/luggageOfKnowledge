<?
###################### ЗАДАНИЯ ################################

# Заменить абсолютные ссылки на относительные:

require 'common/connect.php';

$changeColunmData = function ($table, $column, $changeText, $newText) {
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


echo $changeColunmData('ap_categories', 'text', '="http://www.stald.ru/', '="/');
echo $changeColunmData('ap_categories', 'text', '=\'http://www.stald.ru/', '=\'/'); 


# Создать ассоциативный массив исходя из вложенности разделов:

$arElements = [
    [
        0 => "Кабель1 КОРЕНЬ", 
        1 => "",
        2 => "",
        3 => ""
    ], 
    [
        0 => "",
        1 => "Кабель1 УРОВЕНЬ 2-1", 
        2 => "",
        3 => ""
    ],
    [
        0 => "",
        1 => "",
        2 => "Кабель1 УРОВЕНЬ 3-1", 
        3 => ""
    ],
    [
        0 => "",
        1 => "",
        2 => "Кабель1 УРОВЕНЬ 3-2", 
        3 => ""
    ],
    [
        0 => "",
        1 => "Кабель1 УРОВЕНЬ 2-2", 
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
        0 => "Кабель2 КОРЕНЬ",
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
        0 => "Кабель3 КОРЕНЬ",
        1 => "",
        2 => "",
        3 => ""
    ],
    [
        0 => "",
        1 => "Кабель3 УРОВЕНЬ 3-1",
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
