<?
	 /**
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
	 echo $str->getCountAnagram([
		 "тест",
		 "цифра",
		 "отол",
		 "оолт",
		 "кекс",
		 "тест",
		 "цифра",
		 "отол",
		 "оолт",
		 "кекс",
		 "тест",
		 "цифра",
		 "отол",
		 "оолт",
		 "кекс",
		 "тест",
		 "цифра",
		 "отол",
		 "оолт",
		 "кекс",
		 "кекс1"
	 ]);
	 $end = microtime(true);
	 echo "\nTIME:" . ($end - $start);
	 
	 
	 
	/**
	 * Возвращает URN с учетом редиректа:
	 * @param $url
	 * @param $urn
	 * @return bool|string|string[]
	 */
	 function getCurrURN($url, $urn)
	 {
		  $uri = "{$url}{$urn}";
		  $headers = get_headers($uri, 1);
		  
		  if ($headers[0] == "HTTP/1.1 404 Not Found") {
				return false;
		  }
		  
		  if ($headers[0] == "HTTP/1.1 301 Moved Permanently") {
				$location = $headers['Location'];
				$newURN = !is_array($location) ? $location : $location[1];
				$urn = str_replace($url, '', $newURN);
		  }
		  
		  return $urn;
	 }
	 
	 
	 
	/**
	* Сортировка по ключам многомерного массива: @#
	* @param $array
	* @return bool
	*/
	function recursiveKeySort(&$array) {
		foreach ($array as &$value) {
			if (is_array($value)) {
				recursiveKeySort($value);
			}
		}
		
		return ksort($array);
	}
    
    
    /**
     * Class UserGeo
     *
     * Данные пользователя по IP
     */
    class UserGeo
    {
        private $ip;
        private $apiURI = 'http://www.geoplugin.net/json.gp';
        
        public function __construct()
        {
            $this->ip = $this->defineIP();
        }
        
        public function getIPData()
        {
            $content = file_get_contents("{$this->apiURI}?ip={$this->ip}&lang=ru");
            
            return json_decode($content);
        }
        
        public function getTown()
        {
            $ipData = $this->getIPData();
            
            file_put_contents("./test.txt", $this->ip . " : " .  $ipData->geoplugin_city . "\n", FILE_APPEND);
            
            return !is_object($ipData) ? false : $ipData->geoplugin_city;
        }
        
        private function defineIP()
        {
            [
                'HTTP_CLIENT_IP' => $clientIP,
                'HTTP_X_FORWARDED_FOR' => $forwardedFor,
                'REMOTE_ADDR' => $remoteAddr
            ] = $_SERVER;
            
            if (filter_var($clientIP, FILTER_VALIDATE_IP)) {
                return $clientIP;
            }
            
            if (filter_var($forwardedFor, FILTER_VALIDATE_IP)) {
                return $forwardedFor;
            }
            
            return $remoteAddr;
        }
    }