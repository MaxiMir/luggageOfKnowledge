# CODE GUIDE #
		
## ДЛЯ ЧЕГО, СОБСТВЕННО: ##
Код, к которому мы будем стремиться даст следующее:
- Увеличение скорости разбора кода коллеги;
- Легкость отлаживания кода;
- Легкость внесения изменений;
- Возможность переиспользования кода в других проектах;
	
## СТИЛЬ КОДА:	
- Открывающиеся **теги**: `<?php ?> <?= ?>`;
- Для оформления **отступов** должны использоваться четыре пробела;	
- Следует стараться, чтобы **длина строки** составляла 80 символов или менее.

Пример :
```php
    # Управляющие конструкции:
    # Функции:
    # Массивы
    # Циклы:
    # Массивы: []
    function getSumArgs($arg1, &$arg2, $arg3 = [])
    {
        if ($arg1) {
            // тело if
        } elseif ($arg2) {
            // тело elseif
        } else {
            // тело else
        }

        while ($arg3) {
            // тело конструкции
        }
    }   
```
Если в коротком гайде, нет интересующего Вас вопроса, обращаемся к документации:
	
## НЕЙМИНГ:
- **Нотация**: Верблюжья нотация (CamelCase): 
```php 
$productCount 
```
- **Имя переменной** должно быть СУЩЕСТВИТЕЛЬНЫМ:
```php
   $productRating;
   $brandLinks;
   $properties;
```  
Если вам нужна переменная, в которой содержится количество чего-либо, то используем комбинацию: сущность во множественном числе + count:
```php
   $usersCount;
   $productsCount;
``` 


# ФУНКЦИИ (И МЕТОДЫ)
### Нейминг: ###
- **Имя функции** должно быть ГЛАГОЛОМ 
```php
   getName($user); 
   setName($user, "Alexandr"); 
   saveProperties($properties);
```  
или предикатом:
```php
   isEmpty($users);
   isValid($field);
```

Называть необходимо так, чтобы не заходя в код функции можно понять, что функция делает. 

### СЕМАНТИКА ###
- Любая функция доложна отвечать за один функционал и только за него.
- Если фунция отвечает сразу за два или более действий, то её функционал нужно разделять.
- Если входящих аргументов > 3, то стоит задуматься, каким образом лучше от них избавится.
- Функции с побочными эффектами (обращение к БД, чтение/запись в файл, печать на экран) всегда выносим в отдельную функцию. Аналогично поступаем и с недетермированными функциями ()
-- Максимально на сколько это возможно не используем переменные из глобальной области видимости:
-- ЗАПРОСЫ В ЦИКЛЕ
-- ПРЯМЫЕ ЗАПРОСЫ В БД
-- РАННИЙ ВЫХОД ИЗ ФУНКЦИИ
-- ЕСЛИ ЕСТЬ 2 ПОВТОРЕНИЯ МОЖНО НАПИСАТЬ ФУНКЦИЮ
Передача по ссылке во время вызова запрещена
-- Плоская функция
-- Do not Repeat Youself — не повторяй самого себя!

Пример:
```php
    function foo()
    {
        global $variable;
        // или
        $GLOBALS['variable'];
    }
```

### PHPDoc + Type Hinting ###
- Каждой функции добавляем: 
    - PHPDoc (IDE может генерировать автоматически) с кратким описанием функции;
    - Type hinting, какого тип данных функция принимает и какого типа данных возвращает
    - При изменении функции обновляем PHPDoc
```php
	declare(strict_types=1); // если PHP > 7

	/**
      * Возвращает названия брендов из фильтровой части URN:
      * 
      * @param string $brandsFilterPath
      * @return array
      */
	function getFilterNames(string $brandsFilterPath): array
      {
         if (!$brandsFilterPath) {
             return [];
         }
         
         $irreversiblePathData = explode("or", $brandsFilterPath);  

         return ;
      }
```
	
### ИНТЕРПОЛЯЦИЯ: ###
Для подстановки переменных в строку используем интерполяцию:
```php
$userName = "Johny";
$userGreeting = "Hello, {$userName}";
```
### GUARD EXPRESSION ###
Дословно - "защитное выражение", некоторая проверка на входе в функцию.
Пример:
```php
/**
 * Возвращает среднее арифметическое элементов массива
 * 
 * @param array $arr
 * @return int|null   
 */
function calculateAverage(array $arr): ?int
{
    if (empty($arr)) { // GUARD EXPRESSION
        return null;
    }

    return array_sum($arr) / sizeof($arr);
}
```

### ДЕСТРУКТУРИЗАЦИЯ (PHP7) ###
```php
# Массивы:
$languages = ['Java', 'PHP', 'JS'];
[$java, $php, $js] = $languages;
echo $java; // => Java
echo $php; // => PHP
echo $js; // => JS

# Ассоциативные массивы:
$languagesComplexity = ['PHP' => '4/10', 'JS' => '6/10'];
['PHP' => $phpComplexity, 'JS' => $jsComplexity] = $languagesComplexity;

echo $phpComplexity; // => 4/10
echo $jsComplexity; // => 6/10


# Использование в циклах:
$workersData = [
    'developer' => ['name' => 'John', 'age' => 21],
    'managers' => ['name' => 'Vera', 'age' => 23]
];

foreach($workersData as ['name' => $name, 'age' => $age]) {
    echo "Worker name: {$name} | age: {$age} <br>";
}
// =>
// Worker name: John | age: 21
// Worker name: Vera | age: 23
```

### ГЕНЕРАЦИЯ СТРОК В ЦИКЛЕ: ###
Конкатенация и интерполяция порождают новую строчку вместо старой и подобная ситуация повторяется на каждой итерации. 
Причем строка становится все больше и больше.
Копирование строк приводит к серьезному расходу памяти и может влиять на производительность. 
Правильный путь:
```php
$coll = ['milk', 'butter', 'eggs', 'bread'];
$parts = []; 
	 
foreach ($coll as $item) {
  $parts[] = "<li>{$item}</li>";
}

$innerValue = implode("\n", $parts);
$result = "<ul>{$innerValue}</ul>";
```

### ФУНКЦИИ ВЫСШЕГО ПОРЯДКА: ###
В некоторых случаях вместо объявления пустого массива и наполнением его через циклы, наиболее коротким и оптимальным путем будет использование функций высшего порядка:
```php
$languages = ['java', 'php', 'js'];

# array_map:
$languagesWithBigLetter = array_map(function($language) {
    return ucfirst($language);
}, $languages);
print_r($languagesWithBigLetter); // =>
/*
(
Array (
    [0] => Java
    [1] => Php
    [2] => Js
)
*/

# array_filter:
$languagesComplexity = ['PHP' => '4', 'JS' => '6', 'Java' => '8'];
$difficultLanguages = array_filter($languagesComplexity, function ($complexity) {
    return $complexity > 5;
});
print_r($difficultLanguages); // =>
/*
(
Array (
    [JS] => 6
    [Java] => 8
)
*/

# array_reduce:
$languagesComplexity = ['PHP' => '4', 'JS' => '6', 'Java' => '8'];
$sumComplexity = array_reduce($languagesComplexity, function($acc, $complexity) {
    return $acc + $complexity;
}, 0);
echo $sumComplexity; // => 18
```

### Splat Operator ###
```php
#1: Пример 1:
/**
 * Распечатываем любое количество аргументов
 *
 * @param mixed ...$args
 */
function dbg(...$args)
{
    # В $args массив переданных функции аргументов
    echo '<pre>';
    
    foreach ($args as $arg) {
        $type = gettype($arg);
        
        echo "TYPE: {$type}<br>";
        print_r($arg);
    }
    
    echo '</pre>';
}

dbg(7, 'ABC', [1]); // =>
/*
TYPE: integer
7
TYPE: string
ABC
TYPE: array
Array
(
    [0] => 1
)
*/

# Пример 2:
function getSum($arg1, $arg2)
{
    return $arg1 + $arg2;
}

$integers = [1, 2];
echo getSum(...$integers); // => 3
```
