<?
	 
	 /**
	  * Don't give me five!
	  * In this kata you get the start number and the end number of a region and should return the count of all numbers except numbers with a 5 in it. The start and the end number are both inclusive!
	  *
	  * 1,9 -> 1,2,3,4,6,7,8,9 -> Result 8
	  * 4,17 -> 4,6,7,8,9,10,11,12,13,14,16,17 -> Result 12
	  * -1,-4 -> -1,-2,-3,-4 -> Result 4
	  **/
	 
	 #1:
	 function dont_give_me_five($start, $end)
	 {
		  $count = 0;
		  
		  for ($x = $start; $x <= $end; $x++) {
				if (strpos($x, "5") === false) {
					 $count++;
				}
		  }
		  
		  return $count;
	 }
	 
	 #2:
	 function dont_give_me_five($start, $end)
	 {
		  return count(array_filter(range($start, $end),
			  function ($item) { // range - создает массив, содержащий диапазон элементов. можно задавать step
					return stripos($item, '5') === false;
			  }));
	 }
	 
	 
	 /**
	  * Write a function that takes a string of braces, and determines if the order of the braces is valid. It should return true if the string is valid, and false if it's invalid.
	  *
	  * This Kata is similar to the Valid Parentheses Kata, but introduces new characters: brackets [], and curly braces {}. Thanks to @arnedag for the idea!
	  *
	  * All input strings will be nonempty, and will only consist of parentheses, brackets and curly braces: ()[]{}.
	  *
	  * What is considered Valid?
	  * A string of braces is considered valid if all braces are matched with the correct brace.
	  *
	  * Examples
	  * "(){}[]"   =>  True
	  * "([{}])"   =>  True
	  * "(}"       =>  False
	  * "[(])"     =>  False
	  * "[({})](]" =>  False
	  **/
	 
	 function validBraces($braces)
	 {
		  $brackets = ['()', '[]', '{}'];
		  $closeBrackets = [')', ']', '}'];
		  $stack = [];
		  
		  for ($i = 0; $i < strlen($braces); $i++) {
				$currElem = $braces[$i];
				
				if (!in_array($currElem, $closeBrackets)) {
					 array_push($stack, $currElem);
				} else {
					 $lastElem = array_pop($stack);
					 $pair = "{$lastElem}{$currElem}";
					 
					 if (!in_array($pair, $brackets)) {
						  return false;
					 }
				}
		  }
		  
		  return sizeof($stack) == 0;
	 }
	 
	 
	 /**
	  * Write a function called repeatStr which repeats the given string string exactly n times.
	  *
	  * repeatStr(6, "I") // "IIIIII"
	  * repeatStr(5, "Hello") // "HelloHelloHelloHelloHello"
	  **/
	 
	 function repeatStr($n, $str)
	 {
		  return str_repeat($str, n);
	 }
	 
	 
	 /**
	  * Your job is to create a calculator which evaluates expressions in Reverse Polish notation.
	  *
	  * For example expression 5 1 2 + 4 * + 3 - (which is equivalent to 5 + ((1 + 2) * 4) - 3 in normal notation) should evaluate to 14.
	  *
	  * Note that for simplicity you may assume that there are always spaces between numbers and operations, e.g. 1 3 + expression is valid, but 1 3+ isn't.
	  *
	  * Empty expression should evaluate to 0.
	  *
	  * Valid operations are +, -, *, /.
	  *
	  * You may assume that there won't be exceptional situations (like stack underflow or division by zero).
	  **/
	 
	 function calc(string $expr)
	 {
		  if (!$expr) {
				return 0;
		  }
		  
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
	 
	 
	 /**
	  * In this Kata, your function receives an array of integers as input. Your task is to determine whether the numbers are in ascending order. An array is said to be in ascending order if there are no two adjacent integers where the left integer exceeds the right integer in value.
	  *
	  * For the purposes of this Kata, you may assume that all inputs are valid, i.e. non-empty arrays containing only integers.
	  **/
	 
	 in_asc_order([1, 2, 4, 7, 19]); // true
	 in_asc_order([1, 2, 3, 4, 5]); // true
	 in_asc_order([1, 6, 10, 18, 2, 4, 20]); // false
	 
	 
	 function in_asc_order($arr)
	 {
		  $temp = $arr;
		  sort($temp);
		  return ($temp == $arr);
	 }
	 
	 
	 /**
	  * Deoxyribonucleic acid (DNA) is a chemical found in the nucleus of cells and carries the "instructions" for the development and functioning of living organisms.
	  * In DNA strings, symbols "A" and "T" are complements of each other, as "C" and "G". You have function with one side of the DNA (string, except for Haskell); you need to get the other complementary side. DNA strand is never empty or there is no DNA at all (again, except for Haskell).
	  **/
	 
	 DNA_strand("ATTGC"); // returns "TAACG"
	 DNA_strand("GTAT"); // returns "CATA"
	 
	 
	 function DNA_strand($dna)
	 {
		  return strtr($dna, ['A' => 'T', 'T' => 'A', 'C' => 'G', 'G' => 'C']);
	 }
	 
	 
	 /**
	  * In mathematics, the factorial of a non-negative integer n, denoted by n!, is the product of all positive integers less than or equal to n. For example: 5! = 5 * 4 * 3 * 2 * 1 = 120. By convention the value of 0! is 1.
	  *
	  * Write a function to calculate factorial for a given input. If input is below 0 or above 12 throw an exception of type ArgumentOutOfRangeException (C#) or IllegalArgumentException (Java) or RangeException (PHP) or throw a RangeError (JavaScript).
	  **/
	 
	 # 1:
	 function factorial($num)
	 {
		  if ($num < 0 || $num > 12) {
				throw new RangeException('Out of Range');
		  }
		  
		  return $num <= 1 ? 1 : $num * factorial($num - 1);
	 }
	 
	 #2:
	 function factorial($num)
	 {
		  if ($num < 0 || $num > 12) {
				throw new RangeException('Out of Range');
		  }
		  
		  $iter = function ($n, $acc) use (&$iter) {
				if ($n <= 1) {
					 return $acc;
				}
				return $iter($n - 1, $n * $acc);
		  };
		  
		  return $iter($num, 1);
	 }
	 
	 #3:
	 function factorial($n)
	 {
		  if ($n < 0 || $n > 12) {
				throw new RangeException();
		  } else {
				if ($n == 0) {
					 return 1;
				} else {
					 return array_product(range(1, $n));
				}
		  }
	 }
	 
	 
	 /**
	  * The test fixture I use for this kata is pre-populated.
	  * It will compare your guess to a random number generated using:
	  * rand(1, 100)
	  * You can pass by relying on luck or skill but try not to rely on luck.
	  * "The power to define the situation is the ultimate power." - Jerry Rubin
	  * Good luck!
	  **/
	 
	 # 1:
	 srand(0); // изменяет начальное число генератора псевдослучайных чисел
	 $guess = rand(1, 100);
	 srand(0);
	 
	 
	 #2:
	 $guess = true;
	 
	 class DontRelyOnLuckKata extends TestCase
	 {
		  //This is exactly what the real test fixture looks like.
		  public function testYourLuck()
		  {
				global $guess;
				$lucky_number = rand(1, 100);
				$this->assertEquals($lucky_number, $guess, "Sorry. Unlucky this time.");
		  }
	 }
	 
	 
	 /**
	  * Write a function that takes an integer as input, and returns the number of bits that are equal to one in the binary representation of that number. You can guarantee that input is non-negative.
	  *
	  * Example: The binary representation of 1234 is 10011010010, so the function should return 5 in this case
	  **/
	 
	 function countBits($n)
	 {
		  return substr_count(decbin($n), '1');
	 }
	 
	 
	 class CountBitsTestCases extends TestCase
	 {
		  public function testResultCountBits()
		  {
				$this->assertEquals(countBits(0), 0);
				$this->assertEquals(countBits(4), 1);
				$this->assertEquals(countBits(7), 3);
				$this->assertEquals(countBits(9), 2);
				$this->assertEquals(countBits(10), 2);
		  }
	 }
	 
	 
	 /**
	  * The marketing team is spending way too much time typing in hashtags.
	  * Let's help them with out own Hashtag Generator!
	  *
	  * Here's the deal:
	  *
	  * It must start with a hashtag (#).
	  * All words must have their first letter capitalized.
	  * If the final result is longer than 140 chars it must return false.
	  * If the input or the result is an empty string it must return false.
	  *
	  * " Hello there thanks for trying my Kata"  =>  "#HelloThereThanksForTryingMyKata"
	  * "    Hello     World   "                  =>  "#HelloWorld"
	  * ""                                        =>  false
	  **/
	 
	 function generateHashtag($str)
	 {
		  if (trim($str) == '') {
				return false;
		  }
		  
		  $hash = '#' . str_replace(' ', '', trim(ucwords($str)));
		  
		  return strlen($hash) > 140 ? false : $hash;
	 }
	 
	 
	 /**
	  * In this simple Kata your task is to create a function that turns a string into a Mexican Wave. You will be passed a string and you must return that string in an array where an uppercase letter is a person standing up.
	  *
	  * 1.  The input string will always be lower case but maybe empty.
	  * 2.  If the character in the string is whitespace then pass over it as if it was an empty seat.
	  **/
	 
	 wave("hello"); // => ["Hello", "hEllo", "heLlo", "helLo", "hellO"]
	 
	 
	 function wave($people)
	 {
		  $result = [];
		  
		  for ($i = 0; $i < strlen($people); $i++) {
				if (ctype_space($people[$i])) { // проверяет наличие пробельных символов
					 continue;
				}
				
				$result[] = substr_replace($people, strtoupper($people[$i]), $i, 1);
		  }
		  return $result;
	 }
	 
	 class MyTestCases extends TestCase
	 {
		  public function testThatSomethingShouldHappen()
		  {
				$this->assertEquals(["Hello", "hEllo", "heLlo", "helLo", "hellO"], wave("hello"));
				$this->assertEquals([
					"Codewars",
					"cOdewars",
					"coDewars",
					"codEwars",
					"codeWars",
					"codewArs",
					"codewaRs",
					"codewarS"
				], wave("codewars"));
				$this->assertEquals([], wave(""));
				$this->assertEquals([
					"Two words",
					"tWo words",
					"twO words",
					"two Words",
					"two wOrds",
					"two woRds",
					"two worDs",
					"two wordS"
				], wave("two words"));
				$this->assertEquals([" Gap ", " gAp ", " gaP "], wave(" gap "));
		  }
	 }
	 
	 
	 /**
	  * find sum of positive numbers
	  */
	 
	 function getSumPosNums($numbers)
	 {
		  return array_reduce($numbers, function ($acc, $num) {
				return $num > 0 ? $acc + $num : $acc;
		  }, 0);
	 }
	 
	 /*
	 Given an array (arr) as an argument complete the function countSmileys that should return the total number of smiling faces.
	 
	 Rules for a smiling face:
	 -Each smiley face must contain a valid pair of eyes. Eyes can be marked as : or ;
	 -A smiley face can have a nose but it does not have to. Valid characters for a nose are - or ~
	 -Every smiling face must have a smiling mouth that should be marked with either ) or D.
	 No additional characters are allowed except for those mentioned.
	 Valid smiley face examples:
	 :) :D ;-D :~)
	 Invalid smiley faces:
	 ;( :> :} :]
	 
	 Example cases:
	 
	 countSmileys([':)', ';(', ';}', ':-D']);       // should return 2;
	 countSmileys([';D', ':-(', ':-)', ';~)']);     // should return 3;
	 countSmileys([';]', ':[', ';*', ':$', ';-D']); // should return 1;
	 */
	 
	 #1:
	 function count_smileys($arr): int
	 {
		  return preg_match_all('/[:;][-~]?[\)D]/', implode(",", $arr));
	 }
	 
	 #2:
	 function count_smileys($arr): int
	 {
		  return count(preg_grep('/[:;][-~]?[D)]/', $arr));
	 }
	 
	 
	 /**
	  * Write a function generatePairs that accepts two integer arguments m and n and generates an array containing the pairs of integers [a, b] that satisfy the following conditions:
	  *
	  * m <= a <= b <= n
	  * The pairs should be sorted by increasing values of a then increasing values of b.
	  *
	  * For example, generatePairs(2, 4) should return
	  *
	  * [ [2, 2], [2, 3], [2, 4], [3, 3], [3, 4], [4, 4] ]
	  */
	 
	 
	 #1:
	 function generatePairs($m, $n)
	 {
		  
		  $iter = function ($car, $step, $acc) use ($n, &$iter) {
				$cdr = $car + $step;
				if ($car === $n) {
					 return $acc;
				} elseif ($cdr > $n) {
					 $car++;
					 $step = 0;
					 $cdr = $car;
				}
				$step++;
				$acc[] = [$car, $cdr];
				
				return $iter($car, $step, $acc);
		  };
		  
		  return $iter($m, 0, []);
	 }
	 
	 #2:
	 function generatePairs(int $m, int $n): array
	 {
		  $result = [];
		  
		  for ($i = $m; $i <= $n; $i++) {
				for ($j = $i; $j <= $n; $j++) {
					 array_push($result, [$i, $j]);
				}
		  }
		  
		  return $result;
	 }