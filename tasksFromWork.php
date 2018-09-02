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