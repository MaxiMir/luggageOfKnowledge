<?

/*
Don't give me five!
In this kata you get the start number and the end number of a region and should return the count of all numbers except numbers with a 5 in it. The start and the end number are both inclusive!

1,9 -> 1,2,3,4,6,7,8,9 -> Result 8
4,17 -> 4,6,7,8,9,10,11,12,13,14,16,17 -> Result 12
-1,-4 -> -1,-2,-3,-4 -> Result 4
*/

#1:
function dont_give_me_five($start, $end) 
{
  $count = 0;

  for ($x=$start; $x<=$end; $x++) {
    if (strpos($x, "5") === false) { $count++; } 
  }

  return $count;
}

#2:
function dont_give_me_five($start, $end) 
{
  return count(array_filter(range($start, $end), function ($item){ // range - cоздает массив, содержащий диапазон элементов. можно задавать step 
    return stripos($item, '5') === false;
  }));
}



/*
Write a function that takes a string of braces, and determines if the order of the braces is valid. It should return true if the string is valid, and false if it's invalid.

This Kata is similar to the Valid Parentheses Kata, but introduces new characters: brackets [], and curly braces {}. Thanks to @arnedag for the idea!

All input strings will be nonempty, and will only consist of parentheses, brackets and curly braces: ()[]{}.

What is considered Valid?
A string of braces is considered valid if all braces are matched with the correct brace.

Examples
"(){}[]"   =>  True
"([{}])"   =>  True
"(}"       =>  False
"[(])"     =>  False
"[({})](]" =>  False
*/

 function validBraces($braces){
	$brackets = ['()','[]','{}'];
 	$closeBrackets = [')', ']', '}'];
	$stack = [];
	 
  	for ($i = 0; $i < strlen($braces); $i++) {
		$currElem = $braces[$i];
		if (!in_array($currElem, $closeBrackets)) {
			array_push($stack, $currElem);
		} else {
			$lastElem = array_pop($stack);
			$pair = "{$lastElem}.{$currElem}";
			if (!in_array($pair, $brackets)) {
				return false;
			}
		}
	}
	 
	return sizeof($stack) == 0;	
}


/*
Write a function called repeatStr which repeats the given string string exactly n times.

repeatStr(6, "I") // "IIIIII"
repeatStr(5, "Hello") // "HelloHelloHelloHelloHello"
*/

#1:
function repeatStr(int $n, string $str)
{
	$res = '';
	while ($n > 0) {
		$res .= $str;
		$n--;
	}
	
	return $res;
}

#2:
function repeatStr($n, $str)
{
  return str_repeat($str, n);
}




/*
Your job is to create a calculator which evaluates expressions in Reverse Polish notation.

For example expression 5 1 2 + 4 * + 3 - (which is equivalent to 5 + ((1 + 2) * 4) - 3 in normal notation) should evaluate to 14.

Note that for simplicity you may assume that there are always spaces between numbers and operations, e.g. 1 3 + expression is valid, but 1 3+ isn't.

Empty expression should evaluate to 0.

Valid operations are +, -, *, /.

You may assume that there won't be exceptional situations (like stack underflow or division by zero).
*/


function calc(string $expr)
{
	if(!$expr) { return 0; }
    $stack = [];
	 $intAndOper = explode(' ', $expr);		
	 foreach ($intAndOper as $val) {
        if (is_int($val) or is_float($val)) {
            $stack[] = $val;
        } else {
           $endElemDel = array_pop($stack);

           switch ($val) {
                case '*':
                    $stack[sizeof($stack) - 1] *= $end_elem_del;
                    break; 
                case '/':
                    $stack[sizeof($stack) - 1] /= $end_elem_del;
                    break;
                case '+':
                    $stack[sizeof($stack) - 1] += $end_elem_del;
                    break;
                case '-':
                    $stack[sizeof($stack) - 1] -= $end_elem_del;
                    break;        
            }
        }
    }   

    return $stack[0];
}
