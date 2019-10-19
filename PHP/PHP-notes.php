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