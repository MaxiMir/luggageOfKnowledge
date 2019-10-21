<!-- #@@@ FETCH + PHP #@@@ -->
<script>
    // ...
    const data = [/* ... some data */];
    const fetchOptions = {
        method: 'POST',
        mode: "same-origin",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };


    fetch('/ajax/calc.php', fetchOptions)
        .then(data => data.json())
        .catch(e => alert('Возникла ошибка при отправке...'));

    // конвертируем картинку в base64
    function getBase64Image(img) {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/jpg");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
</script>

<?php
	 
	 $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
	 
	 if ($contentType === "application/json") {
		  $response = ['result', 'success'];
		  $content = trim(file_get_contents("php://input"));
		  $decoded = json_decode($content, true);
		  
		  if (!is_array($decoded)) {
				$response = ['result', 'error'];
		  } else {
				// ... some code
		  }
		  
		  echo json_encode($response);
	 }
	 
	 function base64_to_jpeg($base64_string, $output_file)
	 {
		  $ifp = fopen($output_file, "wb");
		  $data = explode(',', $base64_string);
		  
		  fwrite($ifp, base64_decode($data[1]));
		  fclose($ifp);
		  
		  return $output_file;
	 }
	 
	 
	 #@@@ Dependency Injection Container (DI Container) #@@@
	 
	 /*
	  Контейнер внедрения зависимостей - это паттерн проектирования,
смысл которого в том, чтобы разрешать все зависимости, существующие у объекта при его создании.
Например, для создания объекта профайлинга нужно создать объект настроек и передать его в конструктор.
	 */
	 
	 ### Различные способы передачи (внедрения) объектов.
	 
	 #1 Инъекция объекта через конструктор:
	 class Profile
	 {
		  private $setting;
		  
		  public function __construct(Setting $setting)
		  {
				$this->setting = $setting;
		  }
	 }
	 
	 // Для создания объекта $profile нужно создать сначала объект $setting
	 $setting = new Setting;
	 $profile = new Profile($setting);
	 
	 
	 #2 Внедрение зависимости через метод setter:
	 
	 // Этот способ дает вам возможность внедрять зависимость $setting каждый раз, когда вам нужно использовать ее внутри класса Profile.
	 class Profile
	 {
		  private $setting;
		  
		  public function setSetting(Setting $setting)
		  {
				$this->setting = $setting;
		  }
	 }
	 
	 $setting = new Setting;
	 $profile = new Profile();
	 $profile->setSetting($setting);
	 
	 #3 Использование DI Container:
	 /*
	 Container Injection Dependency - это способ управления внедрением зависимостей и сторонними библиотеками в вашем приложении.
	 PHP-FIG PSR-11 содержит информацию о том, как использовать контейнер в вашем приложении:
	 */
	 
	 interface ContainerInterface
	 {
		  public function get($id);
		  
		  public function has($id);
	 }
	 
	 /*
	 Это очень простая реализация интерфейса ContainerInterface, которая имеет две основные функции get() и has():
	 get(): для получения объект из контейнера.
	 has(): для проверки, есть ли у нас объект в контейнере.
	 
	 Примечание. Цель PHP-FIG - установить стандарты для различных реализаций и представить их
	 сообществу PHP программистов как некий пример хорошего тона.
	 */
	 
	 #4 Связка ReflectionClass и DI Container:
	 /*
	 Большинство фреймворков используют контейнер внедрения зависимостей не только для инъекции объектов
	 при создании других объектов, но и для разрешения других зависимостей рекурсивно.
	 
	 Но что подразумевается под разрешением зависимостей. Посмотрим на примере.
	 
	 Создадим класс Container, который будет автоматически
разрешить зависимости для вашего приложения:
 	 */
	 
	 
	 /**
	  * Class Container
	  */
	 class Container
	 {
		  /**
			* @var array
			*/
		  protected $instances = [];
		  
		  /**
			* @param      $abstract
			* @param null $concrete
			*/
		  public function set($abstract, $concrete = null)
		  {
				if ($concrete === null) {
					 $concrete = $abstract;
				}
				$this->instances[$abstract] = $concrete;
		  }
		  
		  /**
			* @param       $abstract
			* @param array $parameters
			*
			* @return mixed|null|object
			* @throws Exception
			*/
		  public function get($abstract, $parameters = [])
		  {
				// if we don't have it, just register it
				if (!isset($this->instances[$abstract])) {
					 $this->set($abstract);
				}
				return $this->resolve($this->instances[$abstract], $parameters);
		  }
		  
		  /**
			* resolve single
			*
			* @param $concrete
			* @param $parameters
			*
			* @return mixed|object
			* @throws Exception
			*/
		  public function resolve($concrete, $parameters)
		  {
				if ($concrete instanceof Closure) {
					 return $concrete($this, $parameters);
				}
				$reflector = new ReflectionClass($concrete);
				// check if class is instantiable
				if (!$reflector->isInstantiable()) {
					 throw new Exception("Class {$concrete} is not instantiable");
				}
				// get class constructor
				$constructor = $reflector->getConstructor();
				if (is_null($constructor)) {
					 // get new instance from class
					 return $reflector->newInstance();
				}
				// get constructor params
				$parameters = $constructor->getParameters();
				$dependencies = $this->getDependencies($parameters);
				// get new instance with dependencies resolved
				return $reflector->newInstanceArgs($dependencies);
		  }
		  
		  /**
			* get all dependencies resolved
			*
			* @param $parameters
			*
			* @return array
			* @throws Exception
			*/
		  public function getDependencies($parameters)
		  {
				$dependencies = [];
				foreach ($parameters as $parameter) {
					 // get the type hinted class
					 $dependency = $parameter->getClass();
					 if ($dependency === null) {
						  // check if default value for a parameter is available
						  if ($parameter->isDefaultValueAvailable()) {
								// get default value of parameter
								$dependencies[] = $parameter->getDefaultValue();
						  } else {
								throw new Exception("Can not resolve class dependency {$parameter->name}");
						  }
					 } else {
						  // get dependency resolved
						  $dependencies[] = $this->get($dependency->name);
					 }
				}
				return $dependencies;
		  }
	 }
	 
	 // Класс Container регистрирует разные классы с помощью функции set():
	 $container = new Container();
	 
	 // Зарегестрируем класс Profile в контейнере, чтобы потом его использовать
	 $container->set('Profile');
	 ​
	// И всякий раз, когда вы хотите создать экземпляр класса Profile, вы можете легко сделать
	//следующее:

	$profile = $container->get('Profile');

	 /*
	 Метод get() создает объект, при этом отробатывает метод resolve(), который проверяет, имеет ли
	 класс Profile какие-либо зависимости через его __construct(). Далее он разрешает их рекурсивно
	 (это означает, что если параметр Setting имеет свои зависимости, он также будет разрешен),
	 в противном случае он будет создавать экземпляр класса Profile напрямую.
		
	 ReflectionClass и ReflectionParameter используются в нашем классе Container для получения информации
	 о классах, которые являются зависимостями.
	 Класс ReflectionClass сообщает информацию о классе, а ReflectionParameter позволяет получить параметры из
	 конструктора.
	 
	 Вот какие методы рефлексии применяются в методе resolve($concrete, $parameters) и его вызовах:
	  */
	 
	 $reflector = new ReflectionClass($concrete);
	 
	 // проверяем, есть ли возможность создать объект
	 $reflector->isInstantiable();
	 
	 // получить конструктор класса
	 $constructor = $reflector->getConstructor();
	 
	 // создаем объект класса
	 $reflector->newInstance();
	 
	 //создание объетка с зависимостями
	 $reflector->newInstanceArgs($dependencies);
	 
	 // получаем параметры конструктора
	 $parameters = $constructor->getParameters();
	 
	 //получаем класс из type hinted
	 $params->getClass();
		
	 //проверка, есть ли значение по умолчанию для параметра в методе
	 //Пример: function foo($test, $bar = 'baz'){}
	 $parameter->isDefaultValueAvailable();
	 
	 //получаем значение по умолчанию
	 $parameter->getDefaultValue();
	 
	 
	 
	 
	 
	 
	 
	 
	 #@ Пример работы с классами и интерфейсами: #@
	 /**
	  * Interface PersonInterface
	  */
	 interface PersonInterface // указываем только публичные методы
	 {
		  public function get(): string;
		  public function set(string $name);
	 }
	 
	 /**
	  * Interface CityInterface
	  */
	 interface CityInterface
	 {
		  public function addPerson(Person $person);
		  public function getPerson(): array;
	 }
	 
	 /**
	  * Class Person
	  */
	 class Person implements PersonInterface
	 {
		  private $name;
		 
		  public function get():string
		  {
				return $this->name;
		  }
		 
		  public function set(string $value)
		  {
				$this->name = $value;
		  }
	 }
	 
	 /**
	  * Class City
	  */
	 class City implements CityInterface
	 {
		  private $persons = [];
		 
		  public function addPerson(Person $person)
		  {
				$this->persons[] = $person->get();
		  }
		 
		  public function getPerson():array
		  {
				return $this->persons;
		  }
	 }
	 
	 $personMisha = new Person();
	 $personMisha->set('Misha');
	 
	 $personVanya = new Person();
	 $personVanya->set('Vanya');
	 
	 $city = new City();
	 $city->addPerson($personMisha);
	 $city->addPerson($personVanya);
	 $city->getPerson(); // => [0]=> 'Misha', [1]=>'Vanya'





	 /**
	  * Class BaseModel
	  */
	 abstract class BaseModel
	 {
		  public function selectAll():string
		  {
				return 'SELECT * FROM ' . $this->getTableName();
		  }
		  
		  public function db(string $sql)
		  {
				// TODO: db реализацию сделать!
		  }
		  
		  abstract public function getTableName():string; // у потомков реализация данного метода отличается
	 }
		
	 /**
	  * Class Article
	  */
	 class Article extends BaseModel
	 {
		  public function getTableName():string
		  {
				return 'task';
		  }
	 }
		
	 $task = new Atricle();
	 echo $task->selectAll();
		
	 
	 
	 #@ трейд - механизм, реализующий повторное использование кода. Решает проблему отсутствия множественного наследования.
	 #
	 /**
	  * Class Article
	  */
	 class Article
	 {
		  public $sql;
		  
		  public function executeSql() // реализация методов идентична
		  {
				return $this->sql;
		  }
	 }
	 
	 
	 /**
	  * Class User
	  */
	 class User
	 {
		  public $sql;
		  
		  public function executeSql() // реализация методов идентична
		  {
				return $this->sql;
		  }
	 }
		
	 
	 #@ Реализация метода executeSql в классах индентична, а значит можно использовать трейт:
	 trait BaseModel
	 {
		  public $sql;
		  
		  public function executeSql() // реализация методов идентична
		  {
				return $this->sql;
		  }
		 
		  public function selectAllFromDB()
		  {
				$this->sql = 'SELECT * FROM' . $this->getTableName();
		  }
	
		  abstract public function getTableName(): string;
	 }
	 
	 class Article
	 {
		  use BaseModel; // можно перечислить несколько трейтов через ','
		  
		  public function getTableName()
		  {
				return 'articles';
		  }
	 }
		
	 class User
	 {
		  use BaseModel;
		  
		  public function getTableName()
		  {
				return 'users';
		  }
	 }
		
	 $article = new Article();
	 $article->selectAllFromDB();
	 echo $article->executeSql(); // => SELECT * FROM articles
	 
	 $user = new User();
	 $user->selectAllFromDB();
	 echo $user->executeSql(); // => SELECT * FROM users


	 

	#@ Exceptions:
	 class User
	 {
		  public $sql;
		 
		  public function addUser(string $login, string $password)
		  {
				if(strlen($login) < 3 || strlen($login) > 15) {
					 return false;
				}
			 
				if(strlen($password) < 3 || strlen($password) > 6) {
					 return false;
				}
			 
				$this->sql = "INSERT INTO users VALUES('', {$login}, {$pasword})";
			 
				return true;
		  }
	 }
	 
	 $user = new User();
	 $result = $user->addUser('Misha', '1234');
	 
	 if ($result === true) {
		  echo 'user was added';
	 } else {
		  echo 'fail';
	 }
	 
	 
	 // Тоже самое используя Exceptions:
	 
	 class User
	 {
		  public $sql;
		 
		  public function addUser(string $login, string $password)
		  {
				if(strlen($login) < 3 || strlen($login) > 15) {
					 throw new Exception('Wrong login');
				}
			 
				if(strlen($password) < 3 || strlen($password) > 6) {
					 throw new Exception('Wrong password');
				}
			 
				$this->sql = "INSERT INTO users VALUES('', {$login}, {$pasword})";
			 
				return true;
		  }
	 }
	 
	 try {
		  $user = new User();
		  $result = $user->addUser('Misha', '1234');
		  echo 'user was added';
	 } catch(Exception $e) {
		  die('Fail');
	 }
	 
	 
	  // Чтобы каждый раз не писать конструкцию try/catch лучше создать отдельный класс:
	 /**
	 * Class UserException
	 */
	 class UserException extends Exception
	 {
		
	 }
	 
	 /**
	  * Class UserLoginException
	  */
	 class UserLoginException extends UserException
	 {
		  protected $message = 'wrong login';
	 }
	 
	 /**
	  * Class UserPasswordException
	  */
	 class UserPasswordException extends UserException
	 {
		  protected $message = 'wrong password';
	 }
	 
	 /**
	  * Class User
	  */
	 class User
	 {
		  public $sql;
		 
		  public function addUser(string $login, string $password)
		  {
				if(strlen($login) < 3 || strlen($login) > 15) {
					 throw new UserLoginException;
				}
			 
				if(strlen($password) < 3 || strlen($password) > 6) {
					 throw new UserPasswordException;
				}
			 
				$this->sql = "INSERT INTO users VALUES('', {$login}, {$password})";
			 
				return true;
		  }
	 }
	 
	 try {
		  $user = new User();
		  $result = $user->addUser('Misha', '1234');
		  echo 'user was added';
	 } catch(UserException $e) {
		  die($e->getMessage());
	 }