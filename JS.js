////////////// Массивы ///////////////////////
var arr = []; // создание массива
var arr2 = [1,2,3, [4,5,6]];
var arr3 = new Array(); // формируем объект нового массива эквивалент []
var arr3 = new Array(5); // параметр в () длина массива(кол-во элементов) => пустой массив с length = 5
var arr4 = new Array(1,2,3, [4,5,6]); // <-> [1,2,3, [4,5,6]];

alert(arr2[3][0]); // выводим значение
alert(arr4); // alert приводит к строке => 1,2,3,4,5,6
--

arr[0] = 'num'; //  0 - индекс массива
arr['str'] = 'bum!'; // str - свойство объекта. При преобразовании toString не обрабатываются
arr[-5] = 2; // при num < 0: arr[-5] -> arr['-5'] станет свойством объекта 
arr[100]; // если перед индексом 100 нет предыдущих индексов -> заполняется пустыми ячейками с неопределенными индексами. При выводе в цикле пустые ячейки => undefined;
--

arr2.length = 5; // если кол-во эл-тов > 5, то начиная с 6 они будут удалены, если < будут заполнены пустыми ячейками
--

var k = Object.keys(arr2); // метод возвращает ключи переданного объекта
for(var i=0; i < k.length; i++){ // обход массива
	document.write(k[i] + '=>' + arr2[k[i]) + '<br>';
}
--

var table = new Array(10); // пустой массив на 10 элементов
for(var i = 0; i < table.length; i++){
	table[i] = new Array(10); // в каждую ячейку вкладываем массив на 10 элементов
} 

for(var row = 0; row < table.length; row++){ // строки
	for(var col = 0; col < table[row].length; col++){ // перейти по ячейкам, в которую вложен массив
		table[row][col] = row+col;
}

alert(table[5][6]); // => 30

////////////// Методы работы с массивами //////////////

var arr = [1,2,3,10];

if(Array.isArray(arr)){ // проверка на массив
	alert('It`s array!');
}

if(0 in arr){ // проверка на наличие индекса/свойства в массиве или объекте
	alert('true');
}

arr.indexOf(3); // возвращает индекс 1-го найденного значения с начала массива. => -1 - если ничего не найдено
arr.lastIndexOf(1); // возвращает индекс 1-го найденного значения с конца массива. => -1 - если ничего не найдено

arr.join(); // преобразует все элементы массиву в строку и объединяет их. По умолч. разделитель `,` => '1,2,3,10'
arr.join(':'); // с разделителем ':'. Вложенные массивы рекурсивно не обработываются и разд. по умолч. `,`.

arr.reverse(); // меняет порядок элементов в массиве на обратный => [10,3,2,1]

arr.sort(); // сортировка массива. По умолч. в алфавитном порядке (т.е. как обычные строки) => [1,10,2,3]
arr.sort(function(a,b){ // сортировка массива с функцией определяющей порядок сортировки.
	// если 1-й аргумент должен предшествовать 2-му, то должно возвращаться любое отрицательное число. 
	// если 1-й аргумент должен идти после 2-го, то должно вернуться любое число >0
	console.log(a + '|' + b); // смотрим в консоли сколько раз вызывается данная функция 
	return a-b; // => '1,2,3,10'
	return b-a; // => '10,3,2,1'
});

arr.concat(0,0,0,0); // конкатенация элементов массива с перед. параметрами => [10,20,30,100]
arr.concat([1,2,3,4]); // конкатенация элементов массива с др. массивом => [11,22,33,104]

arr.slice(0, 2); // возвращает фрагмент или подмассив переданного массива, начало-включая [0], конец-не включая (2) => [1,2]
arr.slice(1); // начало-включая [1] и до конца => [2,3,10]
arr.slice(-2); // начало предпоследний элемент массива и до конца => [3,10]

arr.splice(2); // Удалит элементы массива начиная и включая [2]. Функция возвращает удален. значения 
arr.splice(1, 2); // Удалит 2 элемента массива начиная и включая [1]  
arr.splice(1, 2, [5,7,9]); // Удалит 2 элемента массива начиная и включая [1], на их место вставит 5,7,9 

arr.push(20,30); // добавляет элементы в конец массива.
arr.push([20,30]); // добавляет элементы массива в конец массива.

arr.pop(); // удаляет последний элемент массива и возвращает его

arr.unshift([10,20,30]); // добавляет эл-ты в начало массива. Индексы массива смещаются

arr.shift(); // удаляет первый эл-т массива и возвращает его. Индексы массива смещаются

delete arr[0]; // удаляет элемент массива. Получаем разреженный массив, тк индексы не смещаются

--

arr.forEach(function(v, i, a){ // делает обход эл-тов массива и применяет для них указанную функцию
	a[i] = v + 10 + 'hello';  
});

--

var res = arr.map(function(x, i, a){ // метод возвращает новый массив, с элементами, которые возвращаются функцией. исходный массив не изменяется
	return x*x;
}); 

--

arr.filter(function(x, i, a){  // метод возвращает подмассив с эл-тами подходящими под заданный фильтр
	return x < 5;
});

--

var res = arr.every(function(x, i, a){ // метод => true - если функция возвращает true для каждого эл-та массива => 'false'
	return x > 5;
}); 

--

 var res = arr.some(function(x, i, a){ // метод => true - если функция возвращает true хотя бы для 1 эл-та массива => 'true'
	return x > 3;
});

--

var res = arr.reduce(function(x,y){ // метод объединяет эл-ты массива с помощью указанной функции. 0 - начальная позиция. в x -накопленный результ работы функции. Для 1-го элемента в x используется либо значение по умолчанию(здесь 0, если не указан попадает значение из первой ячейки). reduceRight - обрабатывает массив необорот -  с конца.
	return x+y;
	
}, 0); // => 16

--

for(var key in arr) {// в key записываются ключи и свойства массива
	document.write(key + '=>' + arr[key] + '<br>');
}


////////////// Дата и время в интерпритаторе JavaScript //////////////

var date = new Date(); // создание объекта с текущей датой и временем (*)
var date = Date(); // эквивалент (*) через конструктор. !здесь передаваемые в () параметры  игнорируются

console.log(date); // => 'Date (Mon Apr 04 2016 02:26:32 GMT + 0300)'

var date = new Date(500); // 500 мс => 'Date (Thu Jan 01 1970 02:00:00 GMT + 0200)'
var date = new Date(2016,2,25,13,45,30,10); // => 'Date (Fri Mar 25 2016 13:45:30 GMT + 0200)'
var date = new Date('Apr 25 2016'); // => 'Date (Mon Apr 25 2016 00:00:00 GMT + 0300)'
var date = new Date('04 25 2016'); // => 'Date (Mon Apr 25 2016 00:00:00 GMT + 0300)'

--
var date = new Date();

date.getFullYear(); // => 2016 (год)

date.getMonth(); // => 4 (месяц; 0 - январь, 11 - декабрь)
var month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']; // массив для вывода месяцев 
month[date.getMonth()]; // => 'Апрель'

date.getDate(); // => 4 (число)

date.getDay(); // => 1 (номер дня; 1 - понедельник, вс - 0)
var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']; // массив для вывода месяцев
days[date.getDay()]; // => 'понедельник'

date.getHours(); // => 2(часы)
date.getMinutes(); // 41(минуты)
date.getSeconds(); // 59(секунды)
date.Milliseconds(); // 946(милисекунды)

date.getTime(); // возвращает кол-во милисекунд с начала эпохи Unix => 1528991067538
date.getTimezoneOffset(); // возвращает в минутах смещение текущего локального времени относительно времени по гринвичу => -180

date.setMonth(11,3); // установка месяца для текущего объекта Date; дополнительно можно передать день => 'Date (Wed Dec 03 2014 22:56:34 GMT + 0300)'
date.setUTCMonth(11,3); // !UTC - метод работает с универсальным временем UTC - является временем, установленным Мировым Стандартом Времени.
date.setDate(10); // установка даты для текущего объекта Date => 'Date (Mon Apr 10 2016 02:26:32 GMT + 0300)'
date.setFullYear(2018,7,21); // установка даты для текущего объекта Date; дополнительно можно передать месяц и дату => 'Date (Thu Aug 21 2014 02:26:32 GMT + 0300)'
date.setHours(22,43,10,50); // установка времени для текущего объекта Date; => 'Date (Thu Aug 21 2014 22:43:10 GMT + 0300)'
date.setMinutes(56,34,10); // установка минут для текущего объекта Date; дополнительно можно передать секунды и милисекунды
date.setSeconds(15); // установка секунд для текущего объекта Date;
date.setMilliseconds(666); //  установка миллисекунд для текущего объекта Date;

date.setTime(1528991067538); // установка даты для текущего объекта Date, функция принимает в параметр кол-во милисекунд с начала эпохи Unix;

date.toString(); // преобразование даты в строковое значение => 'Mon Apr 04 2016 03:05:37 GMT+0300'
date.toTimeString(); // преобразование времени в строковое значение => '03:05:37 GMT+0300'
date.toDateString(); // преобразование даты в строковое значение без времени => 'Mon Apr 04 2016'
date.toUTCString(); // преобразование локального времени в универсальное (UTC) => 'Mon, Apr 04 2016 00:03:36 GMT'
date.toJSON(); // преобразование даты в json строку => "2018-06-14T15:44:27.538Z"
date.toLocaleString(); // возвращает строковое представление объекта Date, применительно к локальным настройкам => '04.04.2016, 3:05:09'
date.toLocaleDateString();// возвращает строковое представление даты из объекта Date, применительно к локальным настройкам => '04.04.2016'
date.toLocaleTimeString();// возвращает строковое представление времени из объекта Date, применительно к локальным настройкам => '3:06:25'

Date.now(); // возвращает кол-во милисекунд с начала эпохи Unix => 1469728444000
Date.parse(date.toString()); // анализирует строковое представление даты и времени и возвращает внутреннее представление даты в милисекундах  => 1469728444000

--
function displayTime(){ // таймер
	var now = new Date();
	var div = document.getElementById('clock'); 
	
	div.innerHTML = now.toLocaleTimeString(); // строкое представление времени применительно к локальным настройкам
	setTimeout(displayTime, 1000); // циклически вызывает функцию через 1 секунду
}

function displayTimeAlt(){ // Обратный таймер
	var now = new Date();
	var div = document.getElementById('clock');
	var sdate = new Date(2016,11,31); // новый год
	var timer = sdate.getTime() - now.getTime(); // возвращает кол-во милисекунд с начала эпохи Unix
	var days = parseInt(timer/(24*60*60*1000)); // parseInt - приводим к целочисл. типу данных;24ч*60мин*60сек*1000мс
	var hours = parseInt(timer/(60*60*1000))%24; // в остатке часы, исключаем дни
	var min = parseInt(timer/(60*1000))%60; // в остатке минуты, исключаем часы 
	var sec = parseInt(timer/(1000))%60; // в остатке секунды, исключаем минуты 
	
	div.innerHTML = days + ':' + hours + ':' + min + ':' + sec; 
	setTimeout(displayTimeAlt, 1000); // циклически вызывает функцию через 1 секунду
}

// Так как, скрипт прописан в head:
window.onload = displayTime; // как только страница полностью загружена - запускаем displayTime()


////////////// Работа со строками ///////////////////////
var str = 'Hello world';

String(str); //  функция-преобразователь. преобразует передаваемый параметр в строку
new String(str); // функция-конструктор возвращает объект типа String

typeof String(str); // возвращает тип данных передаваемого объекта => 'String'
typeof new String(); // => Object

str.charAt(0); // возвращает определенный символ строки по его индексу => 'H'
str.charCodeAt(0); // возвращает UNICODE символа по его индексу => '72'
str.concat('!', ' Yo!'); // метод для конкатенации строк => 'Hello world! Yo!'
String.fromCharCode(1056, str.charCodeAt(15)); // метод создает строку из UNICODE символов

str.indexOf('He'); // поиск подстроки в строке, начиная с начала. Возвращает позицию 1-го вхождения в подстроки. Если ничего не найдено возвращает -1
str.indexOf('He', 5); // вторым параметром можно задать начальную позицию для поиска

str.lastIndexOf('wo'); // поиск подстроки в строке, начиная с конца.
str.lastIndexOf('wo', 4); // вторым параметром можно задать начальную позицию для поиска

str.length; // кол-во символов в строке

str.localeCompare('A');// метод осуществляет сравнение 2-х строк с учетом текущей локализации. Возвращает число < 0 - если исходная строка < перед. строки,
// > 0 - если исходная строка > перед. строка, 0 - если индентичны или не различимы => -1. Используется для сортировки.
var strings = ['привет', 'мир', 'что-то', 'случилось', 'здесь'];
var result = strings.sort(function(a,b){
	return a.localeCompare(b);
}); // => ['здесь', 'мир', 'привет', 'случилось', 'что-то']

str.match(/\d+/); // поиск в строке с использованием регулярного выражения. Возвращает массив, содержащий результаты поиска. \d+ - все числовые значения. Без переданного флага ищет 1 соответствие, если его не найдено возвращает 0.
str.match(/\d+/g); // флаг - глобальный поиск, ищет все совпадения с шаблоном

str.replace(/\d+/, '2018'); // поиск и замена в строке с использованием регулярного выражения. Без переданного флага(g) ищет и заменяет 1 соответствие.

str.search(/\d+/)// поиск в строке с использованием регулярного выражения. Возвращает позицию вхождения подстроки или -1 если соответствия не найдено. Метод игнорирует флаг g.
 
str.slice(1,3); // извлекает подстроку из строки. 1-й аргумент - индекс начало подстроки(входит в возвр. выражение), 2-й аргумент - конец подстроки(не входит в возвр. выражение). Без 2-го параметра извлекает до конца строки. Можно передавать отрицательные значения в 1-й аргумент. 

str.slpit('/', 2); // разбивает строку по разделителю. 2-й аргумент - лимит(максимальная длина массива). Возвращает массив.

str.substr(1,2); // извлекает подстроку из строки. 1-й аргумент - начало подстроки. 2-й аргумент - кол-во символов. Без 2-го параметра извлекает до конца строки.

str.substr(1,2); // извлекает фрагмент из строки. 1-й аргумент - индекс начало подстроки(входит в возвр. выражение), 2-й аргумент - конец подстроки(не входит в возвр. выражение). Отличия: не работает с отрицательными числами, если аргумент1 >аргумент2, меняет их местами.

str.toLocaleLowerCase(); // возвращает строку в нижнем регистре с учетом локали (кирилица). toLowerCase - без учета локали
str.toLocaleUpperCase(); // возвращает строку в верхнем регистре с учетом локали (кирилица). toUpperCase - без учета локали
 
 
 ////////////// Математические преобразования ///////////////////////
 
Math.abs(-10); // вычисляет абсолютное значение числа => 10
Math.acos(-1); // вычисляет аркосинус аргумента в радианах=> 3.141...
Math.cos(30 * ((2*Math.PI)/360)); // вычисляет косинус аргумента в радианах => 0.866...
Math.sin(30 * ((2*Math.PI)/360)); // вычисляет синус аргумента в радианах  => 0.499...
Math.atg(45); // вычисляет артангельс аргумента в радианах => 1.548...
Math.tan(30 * ((2*Math.PI)/360)); // вычисляет тангельс в радианах  => 0.999...
Math.PI; // математическая константа ПИ => 3.141...

Math.ceil(3.1); // Округляет число до ближейшего верхнего => 4
Math.ceil(-3.1); // => -3
Math.floor(3.1); // Округляет число до ближайшего меньшего => 3
Math.ceil(-3.1); // => -4

Math.E; // математическая константа e ~ 2.72
Math.exp(x); // вычисляет e^x
Math.LN2; // вычисляет loge(2) => 0.691...
Math.log(10); // вычисляет натуральный логарифм => 2.302...
Math.LOG10E; // математическая константа log10(e) => 0.434...
Math.LOG2E; // математическая константа log2(e) => 1.442...

Math.max(10,34,0,45,600, Infinity); // вычисляет наибольший аргумент из списка аргументов => Infinity
Math.min(10,34,0,45,-600, Infinity); // вычисляет наименьший аргумент из списка аргументов => -600

Math.pow(-2, 3); // вычисляет x^y => -8. 
Math.pow(-4, 0,5) // => NaN 
Math.sqrt(16); // вычисляет квадратный корень => 4
Math.SQRT1_2; // математическая константа 1/sqrt(2) => 0.707...
Math.SQRT2; // математическая константа sqrt(2) => 1.414...

Math.random();// вычисляет псведо-случайное число [0, 1]
Math.floor(Math.random()*100); // => 74

--

NaN == NaN; // => false 

var num = NaN;
if(num != num) // или isNaN(num)
	alert('It`s NaN');

--

var num = new Number(10.5); // функция-конструктор возвращает объект типа Number
var num = Number(true); // функция-преобразователь => 1
Number.MAX_VALUE; // математическая константа с максимально допустимым значением числа. => 1.7976931348623157e+308. Если превысить данное число -> Infinity
Number.MIN_VALUE; // математическая константа с максимально допустимым значением числа. => 5e-324. Если превысить данное число -> -Infinity

Number.NEGATIVE_INFINITY; // математическая константа бесконечность
Number.POSITIVE_INFINITY; // математическая константа -бесконечность

num.toString(); // преобразует число в строку в заданной системе исчисления. После этого объект будет удален => '10.5'
num.toLocaleString(); // преобразует число в строку, но руководствуется локальными соглашениями о форматировании чисел => '10,5'

num.toFixed(5); // производит округление числа до указанного знака в дробной части. в аргументе кол-во цифр после десятичной точки => '10.50000'
num.toPrecition(2); // преобразует число до нужной длины => 11

parseFloat(' 10.5hello333 world'); // преобразует строковый аргумент в число с плавающей точкой => 10.5
parseFloat('hello333 world'); // => NaN

parseInt(' -10.5hello333 world'); // анализирует строку и возвращает целое число => -10

////////////// Объект ///////////////////////
/*
 Объект - неупорядоченная коллекция свойств, каждое из которых имеет имя и значение.
 Операции над объектами выполняются по ссылке, а не по значению.
 Каждый объект в JS имеет 2-й объект ассоциированный с ним - прототип.
 1-й объект наследует от прототипа все его свойства. 
*/
x; // ссылка на объект
var y = x; // в y будет та же ссылка на объект, что и в x. Любые изменения в y будут отражаться и в x

--

// Литерал объекта - выражение отделенное {}:
var obj = { // пустой объект

};

function addObj(o,i,v){ // Динамическое создание свойств. o - obj, i -свойство, v - значение свойства. 
	return o[i] = v;
}

addObj(obj, 'one', 'Hi!');
alert(obj.one); // => 'Hi!'

/*
Все объекты, которые создаются с помощью литерал-объекта имеют один и тот же прототип (Object prototype), на который можно сослаться:
Object.prototype;

Объекты созданные с помощью ключевого слова 'new' и с помощью вызова функции-конструктора, в качестве прототипа получают значение
свойства prototype функции-конструктора и наследуют свойства Object.prototype.
Наследование пример: Object.prototype->Date.prototype-> new Date()

Object.prototype - объект, который не имеет прототипа и неунаследованных свойств.
*/

var str = 'some string',
a = 10,
b = 20,
obj1 = { 
	one : 'Hello', // индетификатор one
	two: 'World', // индетификатор two
	three: {
			a:1,
			b:2
	},
	'some string': a + b // строковый литерал 'some string'
};

obj1.two = 'Russia!'; // меняем значение свойства
alert(obj1.one); // => 'Hello'
alert(obj1['some string']); // <-> obj1[str] => '30'. При этом obj1.str - вернет ошибку


var date = new Date(); // исп. функцию-конструктор Date, наследуем свойство object.prototype - Date.prototype
var arr = new Array(); // здесь наследуем свойство объекта - Array.prototype
var obj2 = new Object(); // <-> new Object() <-> {}

var obj3 = Object.create(obj1); // создает новый объект и использует 1-й аргумент в качестве прототипа созданного объекта
alert(obj3.one); // obj3 наследует свойства obj1 => 'Hello'
obj3.one = 1; // если свойство унаследовано, то JS создаст новое собственное свойство со значением для данного объекта 

var obj3 = Object.create(null); // создает объект без прототипа
var obj3 = Object.create(Object.prototype); // <-> new Object() <-> {}

alert(obj3.five); // если JS не может найти свойство у данного объекта - он пытается отыскать его в прототипе данного объекта. Если и у него нет ищет в прототипе прототипа и т.д.

delete obj1.one; // удаление свойства. Не может удалять унаследованные свойства

function iteration(o){
	for(v in o){ // обход свойств объекта. Выполняет тело цикла для каждого свойства объекта. v - имя свойства
		
		if(o.hasOwnProperty(v)) continue; // обходим только собственные свойства

		if(typeof o[v] == 'function') continue; // игнорируем методы
		
		if(typeof(o[v]) == 'object'){ // для вложенных объектов
			iteration(o[v]);
		}else{
			console.log(v + ' - ' + o[v]);
		}		
	}
}

if(obj1.one !== undefined){
	alert('Свойство есть!');
}

if('one' in obj1){ // in - проверка существования свойства в объекте, в том числе и наследуемых. Сработает при obj1.one = undefined
	alert('Свойство есть!');	
}

if(obj1.hasOwnProperty('one')){ // проверяет имеет ли объект собственное свойство с указанным именем
	alert('Свойство есть!');	
}

if(obj1.propertyIsEnumerable('one')){ // проверяет имеет ли объект собственное свойство с указанным именем со значением true
	alert('Свойство есть!');	
}

--

var obj3 = {
	prop1: 30,
	prop2: 50,
	func: function(){ // метод с анонимной функцией
		console.log(this.prop1 + this.prop2); // this - контекст вызова - указание на данный объект (~ obj3.prop1).
	}
};

alert(obj3.func()); // вызов метода => '30'

obj3.func2 = function(){ // создание метода
	alert('World');
}

obj3.func3 = foo; // перезаписываем метод

function foo(){
	console.log('War!');
}

alert(obj3.func3); // => 'War!'


--

var o = {
	prop1: 10,
	prop2: 20,
	func: function(){ 
		console.log(this.prop1 + this.prop2); 
	},

	get summ() { // get - метод доступа(чтение). Возвращаемое значение становится значением данного свойства, когда мы будем к нему обращаться
		return this.prop1 + this.prop2;
	},

	set summ(value){ // set - метод доступа(запись).
		this.prop1 += value;
	}
}

o.summ = 5; 
console.log(o.summ); // => 35 т.к. prop1 = 15

o.summ = 5; 
console.log(o.summ); // => 40 т.к. prop1 = 20

o.summ = 5; 
console.log(o.summ); // => 45 т.к. prop1 = 25


Object.defineProperty(o, 'prop3', { // метод для создания или настройки атрибутов свойств объекта. в {} - дескриптор свойства
									value: 100, // значение свойства
									writable: true, // доступность свойства для записи
									enumerable: true, // доступность свойства для перечисления циклом for in
									configurable: true // доступность свойства для настройки
}); 

Object.defineProperty(o, 'prop3', { // можно указывать не все значения в дескрипторе свойств
									writable: false, // доступность свойства для записи
}); 

o.prop3 = 'AAAAA!'; // => ошибка

--
function People(name, age){ // собственная функция-конструктор
	this.name = name; // будущее свойство объекта
	this.age = age;
	this.summ = function(){
		return this.name + ' - ' + this.age;
	}
}

var Ben = new People('Ben', 18); // создание объекта
alert(Ben.age); // => '18'
alert(Ben.summ()); // => 'Ben - 18'

People.prototype = obj1; // задаем в свойстве prototype объект, который будет являться прототипом объекта, созданного с помощью функции-конструктора

People.prototype.goAge = function(){
	return this.age > 18;
}

alert(Ben.one); // свойство obj1 => 'Hello'
alert(obj1.goAge()); // => false



////////////// Объект window ///////////////////////
/* 
Глобальный объект window - сосредоточение асбсолютно всех возможностей и прикладных интерфейсов клиентского JS. Окно веб-браузера или фрейм (если на сайте исп. фреймы). Данный объект находится на вершине цепочки областей видимости. Его свойства и методы являются глобальными переменными и функциями.
*/
window.print(); // метод печать документа
window.location; // метод возвращает URL - текущего окна <-> document.location <-> location
window.location = 'http://yandex.ru'; // редирект на заданный URL
// Свойство декомпозии URL:
	location.href; // полный URL  => http://vk.com/
	location.toString(); // встроенный метод - приводит объект к строке -> полный URL => http://vk.com/
	location.host; // имя домена с портом => vk.com
	location.hostname; // имя домена => vk.com
	location.port; // порт
	location.pathname; // путь к конкретному документу => /contact/pay.index
	location.protocol; // протокол => http:
	location.hash; // возвращает индетификатор фрагмента из URL - vk.com/#top (поднять полосу прокрутки вверх) => #top
	location.search; // возвращает часть URL после '?' называемой строкой запроса => vk.com/?item=123

function urlArgs(){ // /?page=ddd&id=222
	var args = {},
	pos = null,
	query = window.location.search.substring(1), // извелекаем все после '?'
	parts = query.split('&'); 

	for(var i = 0; i < parts.length; i++){
		pos = parts[i].indexOf('=');
		if(pos == -1) {
			continue;
		}

		var name = parts.substring(0, pos),
		value = parts.substring(pos);

		args.name = value;
	}
	
	return parts;
}

var obj = urlArgs();
alert(obj.page); // => ddd

window.location.assign('http://ya.ru'); // загрузить и отобразить документ по указанному URL
window.location.assign('f1.html'); // по относительному URL

window.location.replace('http://ya.ru'); // загрузить и отобразить документ по указанному URL. Перед открытием удаляет текущий документ из списка посещавщихся страниц

window.location.reload(); // перезагрузить текущий документ

--
window.open(); // метод для создания нового окна в браузере

var myVar; // глобальная переменная (свойство объекта window) (**) -> скрипт увидит
window.onload = function(){
	var openWindow = document.getElementById('btn_open_window'),
	closeWindow = document.getElementById('btn_close_window');

	openWindow.onclick = function(){
		var w1 = null,
		w1 = window.open( // метод возвращает ссылку на объект window нового окна
					'test.php', // URL адрес документа, отображаемого в новом окне. Без него - пустое окно
					'TEST', // строка с именем окна. Если вкладки с данным именем нет, JS создает новое	окно. Имя окна хранится в window.name. По дефоолту: about:blank.
					'width=420, height=220, resizable=yes, scrollbars=no, status=no, left=500, top=300, menubar= no, toolbar=no, location=no' // список параметров, определяющих размер и видимые элементы графического пользовательского интерфейса нового окна. resizable - изменение размеров будущего окна(yes -разрешено, no - нет), работа параметра зависит от версии браузера. scrollbars - разрешение полосы прокрутки, status - разрешение отображения строку статуса в окне, left - смещение по левой стороне окна, menubar - разрешение на показ основного меню браузера,  toolbar - разрешение на показ основной панели инструментов браузера, location - разрешение на показ адресной строки браузера
		);
		console.log(w1.opener); // родильский объект window => window js.js
	}

	closeWindow.onclick = function(){
		if(typeof w1 == 'object'){
			w1.close(); // закрывает открытое окно. При этом, объект window продолжает существовать
		}	
	}

	var myVar = 'Hello world!'; // локальная переменная (**) -> скрипт не увидит

	function getMyVar(){
		alert(myVar);
		myVar = w1.editMyVar();
	}
}

function editMyVar(){ // sctript.js подключается в файле test.php
	return window.opener.myVar = 50; // myVar - должна быть глобальной (**)
}

w1.focus(); // метод делает активным выбранное окно

w1.innerWidth; // возвращает в px ширину экранной области+
w1.outerWidth; // возвращает в px ширину экранной области вместе с панелью инструментов, полос прокруток и т.д
w1.innerHeight; // возвращает в px высоту экранной области
w1.outerHeight; // возвращает в px высоту экранной области вместе с панелью инструментов, полос прокруток и т.д

w1.scrollBy(50.100); // перемещение полосы прокрутки на заданное кол-во px
w1.scrollTo(50.100); // устанавливает фиксированное положение для полос прокрутки в px
w1.moveBy(40,80); // перемещает окно, представленное определенным объектом window на определенное количество px
w1.moveTo(40,80); // устанавливает фиксированное положение для окна в px
w1.reizeBy(-50, -50); // уменьшает/увеличивает размер окна на опред. кол-во пикселей
w1.reizeTo(150, 150); // устанавливает фиксированный размер окна в px. Браузеры по-разному могут обрабатывать данный метод


v  Window   top - ссылается на объект самого вверхнего уровня
v  Frames 	
v  Window   parent - ссылается на родительский объект текущего окна
v  Frames 
v  Window   self - ссылается на текущее окно

var fr = document.getElementById('fr'); 

fr.contentWindow.getAlert(); // все элементы iframe имеют свойство contentWindow, которое ссылается на объект window этого фреймаю Здесь используем функцию getAlert() из скрипта этого фрейма
// <->
window.frames['f1'].getAlert(); // frames свойство хранит ссылки на дочерние фреймы в виде массива, содерж. в окне или фрейме. 'f1' - атрибут name тега iframe

self.parent.getParentAlert(); // ссылаемся на родителя текущего окна или фрейма.

--
window.alert('Gazzzzz'); // метод выводит окно с сообщением
window.confirm(); 
window.prompt();

do{
	var str = prompt('Введите число');
	var result = confirm('Вы ввели ' + str + '. Нажмите на ок для продолжения.');
}
while(!result) // пока не нажмем ok в confirm

window.document; // ссылается на одноименный объект и представляет содержимое документа, отображаемого в окне.
window.document.getElementById('main_column'); // один из методов window.document, возвращает объект типа element

// Таймеры
window.setTimeout(); // планирует запуск функции через определенное кол-во милисекунд
window.setInterval(); 

var timerId = setTimeout(...); // setTimeout возвращает числовой идентификатор таймера timerId, который можно использовать для отмены действия.
clearTimeout(timerId);


window.onload = function() { // onload  - страница полностью загружена
	var wrap = document.getElementById('popup_overlay'),
	closeB = document.getElementById('popup_close'),
	inP = document.getElementById('popupIn'),
	tIn, tOut;
	
	closeB.onclick = popupClose; // при клике на элемент вызываем функцию
	inP.onclick = popup;

	function popup(){
		wrap.style.display = 'block'; // свойство style - стили элемента.
		popupIn(1);
	}
	
	function popupClose(){
		popupOut(0);
	}
	
	function popupIn(x){ // в x - необх. прозрачность
		var op = (wrap.style.opacity) ? parseFloat(wrap.style.opacity) : 0; // текущее значение прозрачности
		
		if(op < x){
			clearInterval(tOut); // отменяем ранее запланированное действие
			op += 0.05;
			wrap.style.opacity = op;
			tIn = setTimeout(function(){
				popupIn(x);
			}, 50);
		}
	}
	
	function popupOut(x){
		var op = (wrap.style.opacity) ? parseFloat(wrap.style.opacity) : 0;
		
		if(op > x) {		
			clearInterval(tIn);
			op -= 0.05;
			wrap.style.opacity = op;
			
			tOut = setTimeout(function(){	
				popupOut(x);
			}, 100);
		}
		
		if(wrap.style.opacity == x) {
			wrap.style.display = 'none';
		}
	
	}
	
	setTimeout(popup, 3000); // через 3 секунды выполнить popup()




	var h1 = document.getElementById('header');
	h1.onclick = function(){
		clearTimeout(intStop);
	}

	function changeColor(){
		if(h1.style.color == 'black'){
			h1.style.color == 'white';	
		}else{
			h1.style.color == 'black'
		}
	}

	var intStop = setInterval(changeColor, 500);
}


window.history; // объект хранит истрию просмотра страниц в конктретном окне в виде списка документов и сведений о них
history.length; // кол-во элементов в списке истории. По причине безопасности скрипт не может получить доступ к URL этих документов => 13
history.back(); // возвращаемся на предыдущий документ, который просматривали
history.forward(); // перейти на следующую URL в списке посещенных страниц
history.go(-2); // загрузить конкретную страницу из истории сессии, определяемую относительной позицией к текущей странице (относительный показатель текущей страницы равен 0).

window.navigator; // объект содержит общую информацию о производителе браузера и номере версии. Свойства не стандартизированы
navigator.appCodeName; // => 'Mozilla'
navigator.platform; // => 'Win32'

window.screen; // объект содержит информацию о размере экрана и о доступном кол-ве цветов
screen.width; // ширина экрана в px
screen.height; // высота экрана в px
screen.availWidth; // доступная ширина экрана в px => 1010
screen.availHeight; // доступная высота экрана в px



////////////// Объект Document ///////////////////////
/*
DOM - Объектная модель документа
*/
document.getElementById('stuck_container'); // селектор по id

function getElements(){
	var elem = {};
	
	for(var i = 0; i < arguments.length; i++){
		var id = arguments[i],
		el = document.getElementById(id);
		
		if(el == null){
			continue;
		}
		
		elem[id] = el;	
	}
	
	return elem;
}

var result = getElements('stuck_container', 'content', 'footer'); // в объекте будут объекты html 


document.getElementById('nav').className; // => название класса выбранного элемента
--

var elname = document.getElementsByName('email'), // селектор по атрибуту name => объект NodeList(массив выбранных элементов)
elname_first = document.getElementsByName('email')[0].style.border = '1px solid black;';


--

var sect = document.getElementsByTagName('section'), // селектор по имени тега => объект NodeList(массив выбранных элементов), Mozilla => HTMLCollection
divB = sect.getElementsByTagName('div'); // выборка относительно выбранного блока

--

var imgs = document.images, // => HTMLCollection со всеми изображениями, которые определены на данной HTML странице
links = document.links, // => HTMLCollection со всеми ссылками, которые определены на данной HTML странице
forms = document.forms; // => HTMLCollection со всеми формами, которые определены на данной HTML странице

for(var i = 0; i < images.length; i++){ // меняем стили для всех изображений
	document.images[i].style.border = '5px solid red;'; 
}

--

var elId = document.getElementsByClassName('test'); // селектор по классу(-ам, перечисляются через ',') => объект HTMLCollection (массив выбранных элементов)

--
document.querySelectorAll('header'); // возвращает список эл-тов HTML-документа, которые соответствуют указанной группе селекторов => объект NodeList(массив выбранных элементов). Если ничего не найдено вернет пустой объект NodeList

document.querySelector('.header'); // возвращает первый эл-т HTML-документа, который соответствует указаннному селектору
document.querySelector('p').querySelector('span'); // селектор: span вложенный в p

document.querySelector('h2').onclick = function(){
	var myLi = document.querySelector('.current');
	myLi.parentNode; // parentNode - содержит родительский узел для выбранного элемента или null -  если родителя нет.
	
	myLi.parentNode.firstChild.style.border = '2px solid black'; // firstChild - первый дочерний узел. ! Перевод строки в html разметке может быть firstChild. ! Cвойства с '-' пишутся так: borderTop 
	myLi.parentNode.lastChild.style.border = '2px solid red; margin:20px;'; // lastChild - последний дочерний узел. ! Перевод строки в html разметке может быть lastChild
	
	myLi.childNodes; // childNodes - содержит коллекцию дочерних элементов данного элемента (включая комментариии - идут отдельным узлом). Текстовое содержимое тега тоже отдельный узел - textNode
	
	myLi.nextSibling; // следующий `братский` узел. ! Перевод строки в html разметке может быть nextSibling
	myLi.previousSibling; // предыдущий `братский` узел. ! Перевод строки в html разметке может быть previousSibling
	myLi.nextSibling.nextSibling.firstChild.firstChild.nodeValue = 'hy-hy!'; // селектор .current>li:first-child>a>Text. 2 раза nextSibling - поскольку есть перенос строки. nodeValue - текстовое содержимое узла
	
	myLi.nodeType; // nodeType - тип определенного узла. => 1 - если nodeType - соответствует типу Element, 3 - типу text, 8 - типу comments, 9 - типу document (например document.nodeType), 11 - document.fragments
	
	myLi.nodeName; // имя тега элемента, в котором все символы преобразованы в верхний регистр => 'LI'
	
	myLi.parentNode.children; // children - свойство хранит объект nodeList и содержит !только объекты Element
	myLi.parentNode.firstElementChild; // возвращает первый дочерний элемент для выбранного элемента
	myLi.parentNode.lastElementChild; // возвращает последний дочерний элемент для выбранного элемента
	
	myLi.nextElementSibling; // возвращает последующий `братский` элемент перед текущим
	myLi.previousElementSibling; // возвращает предыдущий элемент `братский` перед текущим
	
	myLi.parentNode.childElementCount; // возвращает кол-во дочерних элементов у выбранного элемента <-> myLi.parentNode.children.length
	
	myLi.href='z-z-z-z'; // можно обращаться к HTML атрибутам, пример: document.forms[0].method='post'. Зарезервированные слова в JS, которые совпадают с html атрибутами необ. записывать с приставкой html, например for в <label> -> label.name.htmlFor='...'

	document.images[0].setAttribute('width', '100'); // установить атрибуты. Зарезервированные слова указываются без приставки 'html'
	document.images[0].getAttribute('src'); // возвращает значение атрибута

	if(document.images[0].hasAttribute('for')){ // проверка на наличие атрибута у выбранного элемента
		document.images[0].removeAttribute('alt'); // удаление атрибута
	} 

	var li = document.querySelector('.current');
	li.innerHTML = 'Bla-Bla'; //  устанавливает/получает всю разметку и содержание внутри данного элемента; Не рекомм. испол. конкатенацию .innerHTML += ..., поскольку быстродействие скрипта ухудшиться
	li.outerHTML = '<h2>' + li.outerHTML + '</h2>' ; // HTML > 5, устанавливает/получает всю разметку и содержание внутри данного элемента, включаяя сам элемент

	li.insertAdjacentHTML('beforebegin', '<strong>Some Text</strong>'); // устанавливает произвольный HTML перед выбранным элементом
	li.insertAdjacentHTML('afterbegin', '<strong>Some Text</strong>'); // устанавливает произвольный HTML в выбранном элементе после открывающего тега 
	li.insertAdjacentHTML('beforeend', '<strong>Some Text</strong>'); // устанавливает произвольный HTML в выбранном элементе перед закрывающим тегом 
	li.insertAdjacentHTML('afterend', '<strong>Some Text</strong>'); // устанавливает произвольный HTML в выбранном элементе после закрывающего тега 

	var newDiv = document.createElement('div'), // создание пустого элемента
	newText = document.createTextNode('Some String'), // создание текстового узла
	newComment = document.createComment('This is comment'), // создание узла комментария
	documentFragment = documentdocumentFragment(), // создание типа documentFragment
	cloneButton = document.querySelector('.current').cloneNode(); // копирование сушществующего узла без потомков 
	cloneButton = document.querySelector('.current').cloneNode(true), // копирование сушществующего узла c потомками
	h1 = document.querySelector('.karkas').removeChild(h1); // удаление узла => h1 - будет удален 
	replaceChild(); 

	newDiv.appendChild(newText); // добавление в конец элемента нового узла
	document.querySelector('.wrap').insertBefore('newDiv', document.querySelector('.wrap--item')); // 1-й аргумент - вставляемый узел, 2-й элемент - дочерний узел, перед которым необходимо добавить новый узел. с null во втором аргументе <-> appendChild()

	var a = document.querySelector('.current').firstChild,
	a.textContent; // устанавливает/возвращает текстовое содержимое выбранного элемента. Для IE - innerText

	function textContent(el, value){ // работа с текстом в разных браузерах
		var content = el.textContent; 

		if(value === undefined){
			if(content !== undefined){
				return content
			}else{
				return el.innerText; // IE
			}
		}else{
			if(content !== undefined){
				el.textContent = value;
			}else{
				el.innerText = value;
			}
		}
	}

	function textContent(el){ // получаем текст со страницы
		var child, type, s='';
		for(child = el.firstChild; child != null; child = child.nextSibling){
			type = child.nodeType; // тип элемента
			if(type === 3){ // узел типа текст
				s += child.nodeValue;
			}elseif(type === 1){
				s += textContent(child);
			}
		}
		return s;
	}
}

function r(el){ // функция-реверс дочерних элементов 
	var fr = document.createDocumentFragment();
	
	while(el.lastChild){
		fr.appendChild(el.lastChild); // перемещаем последний дочерний элемент во фрагмент	
	}
	
	el.appendChild(fr);
}

////////////// Работа с формами ///////////////////////////////

window.onload = function(){
	var email = document.getElementById('firstForm');
	
	var fields = document.querySelectorAll('#firstForm input[type="checkbox"]'); // коллекция чекбоксов
	for(var i = 0; i < fields.length; i++){
		console.log(fields[i].type); // у всех элементов форм есть свойство type, содер. тип поля
	}
	
	window.myForm; // селектор формы по атрибуту name ( name='myForm' !Не рекомендуется к использованию ).
	document.myForm; // -//-
	document.forms.firstForm; // селектор формы по id через HTMLCollection
	document.forms.firstForm.email; // селектор input с атрибутом name='email'
	document.forms.firstForm.elements; // коллекция всех элементов выбранной формы
	
	var f = document.forms.firstForm;
	f.submit(); // Отправка данных формы по адресу в атрибуте action
	f.reset(); // сбрасывает состояние формы
	
	var option = document.forms.firstForm.elements.option; // чекбосы с атрибутом name='option'
	
	for(var i = 0; i < option.length; i++){
		if(option[i].checked){ // checked - выбранный чекбокс. defualtChecked - чекбокс по умолчанию. 
			console.log('Выбран' + option[i].value);  
		}
	}

	// Если select c артибутом multiple, то select.type => 'select-multiple', если нет => 'select-one
	select.length; // => количество тегов option. Если задать число < текущего, то лишние теги будут удалены
	select.options; // => HTMLOptionsCollection - коллекция с тегами option
	select.options[0].text; // текст в теге option
	select.options[1] = null; // удаление выбранного option
	select.options.selected; // выбранный тег option
	select.options.selectedIndex; // => индекс элемента выбранного тега option в коллекции
	
	var newOption  = new Option(
								'Option new', // текст между тегами
								10, // значение value
								false, // значение defaultSelect
								false // выбор элемента после добавления 
								);
								
	select[select.length] = newOption; // добавление option последним в списке								
});

////////////// Обработка событий в JavaScript ////////////// 

window.onload = function(e){ // установка свойств обработчика событий. Самый простой способ
	var btn = document.querySelector('.btn-default');

	btn.onclick = function(){
		document.forms[0].submit(); // отправка формы по клику по кнопке <=> <button onclick='document.forms[0].submit();'>Отправить</button> В html разметке можно разместить несколько инструкций разделив их ';'
	}
	
	btn.addEventListener('click', function(){document.forms[0].submit();}, false); // назначить на элемент обработчик события. 1-й аргумент - событие, 2-й аргумент - испол. функция, при true - функция будет зарегистрирована как перехватывающая в обработчике и будет вызываться в др. фазе распространения событий. На 1 объект можно вешать несколько функций-обработчиков. Вызываются в порядке их регистрации
	
	btn.addEventListener('click', func, false);
	function func(){
		document.forms[0].submit();
	}
	
	var query = location.search;
	if(query != ''){
		btn.removeEventListener('click', func, false); // удаляем обработчик событий	
	}
	
	--
	
	if(button.addEventListener){ // IE <=8 не поддерживает
		btn.removeEventListener('click', func, false);
	}else if(button.attachEvent){ // назначить на элемент обработчик события в IE <=8
		button.attachEvent('onclick', func);
	}
	
	--
	
	var form = document.forms.myForm;
	var empty = false;
	
	for(var i = 0; i < form.length; i++){
		if(form.elements[i].type == 'text' || form.elements[i].type == 'password'){ 
			if(form.elements[i].value == ''){
				form.elements[i].style.border.color = 'red';
				empty = true;
			}	
		}

	}
	
	if(empty){
		alert('Заполните все поля');
	}else{
		form.submit();
	}
} 


////////////// Аргументы обработчиков событий. Отмена событий ////////////// 

window.onload = function(e){ 
	var btn = document.getElementById('myButton');
	btn.addEventListener('click',  hendler, false);
	
	function hendler(e){ // e - объект возникшего события
		e = e || window.event; // window.event для IE
		console.log(this); // <-> console.log(e) => <button id='myButton' type='button'>
		console.log(e.type); // => click
		if(e.preventDefault){ 
			e.preventDefault; // отменяет все стандартные действия по умолчанию (В IE не работает) <-> return false; 
			console.log(e.defaultPrevented); // => true, когда поддерживается метод preventDefault
		}else if(e.returnValue){ 
			e.returnValue = false; // отменяет все стандартные действия по умолчанию в IE
		}else{
			return false; 
		}
	}
	
	function addEvent(target, type, hendler){ // кросбраузерный обработчик
		if(target.addEventListener){ // выполнится везде кроме IE
			target.addEventListener(type,hendler, false);
		}else{
			targer.attachEvent('on' + type, function(e){
				return hendler.call(target,e); // call - вызов функции в контексте опред. объекта (1-й аргумент, 2-й аргумент - перед. параметры)
			});
		}
	}
	
	addEvent(btn, 'click', hendler); // => <button id='myButton' type='button'> в IE [object HTMLButtonElement]
	
	--
	
	document.forms.myForm.elements.inputMail.onleypress = function(e){ // функция-обработчик на нажатие клавиши
		if(e.charCode == 100){ // в свойстве charCode содержится код символа
			return false; // => запрещаем ввод в поле латинского символа 'D'
		}else{
			return true; // => другие символы вводятся
		}
	}
	
	--
	
	window.onbeforeunload = function(){ // вывод модального окна с сообщением при закрытии страницы в IE, в других браузерах модельное окно выводится, но без сообщения
		return 'Hi Man!';
	}
	
	--
	
	// Порядок вызова обработчиков: из html кода -> addEventListener -> attachEvent(при этом вызываются в произ. порядке)
	
}	
	<button id='myButton' type='button' type='submit' onclick="alert(inputFile); return false;"> // => выведет в alert html-код код инпута с id 'inputFile', но отправки данных формы не произойдет, поскольку return false - отменяет все стандартные действия по-умолчанию для текущего события. 
	
	
////////////// Фазы распространения событий	////////////// 

div#one 
	> Some Text
	>  p#two 
		> span#three

document.getElementById('one').addEventListener('click', function(event){
	this.style.backgroundColor = 'grey';	// this - ссылается на целевой элемент
	alert(this.tagName); // => имя тега
}, false);

document.getElementById('two').addEventListener('click', function(event){
	this.style.backgroundColor = 'green';
	alert(this.tagName);
}, false);

document.getElementById('three').addEventListener('click', function(event){
	this.style.backgroundColor = 'yellow';
	alert(this.tagName);
	event.stopPropagation() // (**) останавливает "всплытие" вызова события к родительским элементам. Для IE: e.cancelBubble = true;
	event.stopImmediatePropagation(); // предотвращает выполнение следующих обработчиков текущего события и останавливает "всплытие" вызова события к родительским элементам 
}, false);


Без (**)
// => span, p, div
При клике на span#three сработает фаза 'всплытия' (от целевого элемента -> до родителя) => сработает обработчик для span#three, затем для p#two и в конце для div#one

С (**)
// => span
При клике на span#three cработает обработчик только для span 

--

document.getElementById('firstForm').addEventListener('click', function(e){ // обработчик для всей формы
	e.target.style.border = '1px solid red';; // e.target - содержит элемент, который является целью события
	console.log(this); 
}, false);

// =>
<form id='firstForm'>
При клике на элемент формы, он будет иметь красную рамку, при клике на другие элементы, рамка у предыдущих элементов будет сохраняться

--

document.getElementById('one').addEventListener('click', function(event){
	this.style.backgroundColor = 'grey'; // this - ссылается на целевой элемент
	alert(this.tagName); // => имя тега
	if(event.target.tagName == 'span'){
		event.stopPropagation(); // (**)
	}
}, true);

document.getElementById('two').addEventListener('click', function(event){
	this.style.backgroundColor = 'green';
	alert(this.tagName);
}, true);

document.getElementById('three').addEventListener('click', function(event){
	this.style.backgroundColor = 'yellow';
	alert(this.tagName);
}, true);


Без (**)
// => div, p, span
При клике на span#three сработает фаза 'перехват'(от родителя -> до целевого элемента) => сработает обработчик для div#one, затем для p#two и в конце для span#three

С (**)
// => div
При клике на span#three cработает обработчик только для span 


////////////// События мыши ////////////// 

click - срабатывает, когда пользователь нажимает и отпускает кнопку мыши или иным образом 'активирует' элемент

contextmenu - срабатывает перед выводом контекстного меню. Клик левой кнопкой мыши

dblclick - срабатывает, когда пользователь выполняет двойной щелчок

mousedown - срабатывает, когда пользователь нажимает кнопку мыши

mouseup  - срабатывает, когда пользователь отпускает кнопку мыши 

mousemove - срабатывает, когда пользователь перемещает кнопку мыши

mouseover - срабатывает, когда указатель мыши помещается над элементом

mouseout - срабатывает, когда указатель мыши покидает элемент

mouseenter - подобно mouseover, но не всплывает

mouseleave - подобно mouseout, но не всплывает

window.onload = function(e){
	function addEvent(target, type, hendler){ // кросбраузерный обработчик
		if(target.addEventListener){ // выполнится везде кроме IE
			target.addEventListener(type,hendler, false);
		}else{
			targer.attachEvent('on' + type, function(e){
				return hendler.call(target,e); // call - вызов функции в контексте опред. объекта (1-й аргумент, 2-й аргумент - перед. параметры)
			});
		}
	}
	
	function handler(e){
		e = e || window.event;
		this.style.backgroundColor = 'green';
	}
	
	function handler2(e){
		e = e || window.event;
		this.style.backgroundColor = 'red';
	}
	
	addEvent(document.getElementById('one'), 'mousedown', handler);
	addEvent(document.getElementById('one'), 'mouseup', handler2);
}

--
<div style="position: absolute; left: 100px; top:100px; background-color: white; border: 2px solid #f6f6f6;">
	<div style="background-color: green; border: 1px solid blue;" onmousedown="drag(this.parentNode, event)">
		Drag media
	</div>
</div>	


function getScroll(w){
	w = w || window; // если передали w, присвоить w, иначе window'
	
	if(w.pageXOffset){
		return {x: w.pageXOffset, y: w.pageYOffset}; // прокрутка страницы по вертикали и горизонтали
	}
	
}

function drag(el, event){
	var scroll = getScroll();
	
	var startX = event.clientX + scroll.x; // clientX - гориз. координаты указателя мыши относительно окна. startX - гориз. координаты документа
	var startY = event.clientY + scroll.y; // clientY - вертик. координаты указателя мыши относительно окна. startY - вертик. координаты документа
	
	var elX = el.offsetLeft; // offsetLeft - смещение элемента относит. родительского элемента по горизонтали 
	var elY = el.offsetTop; // offsetTop - смещение элемента относит. родительского элемента по вертикали 
	
	var deltaX = startX - elX; // разница между коорд. элемента (левый верхний угол) и коорд. клика на элемент по гориз.
	var deltaY = startY - elY; // разница между коорд. элемента (левый верхний угол) и коорд. клика на элемент по вертик.

	if(document.addEventListener){ // бразуер поддерживает данный метод
		document.addEventListener('mousemove', moveHandler, true); // вызываем метод отн. всего документа
		document.addEventListener('mouseup', upHandler, true); // вызываем метод отн. всего документа
	}

	if(event.stopPropagation){
		event.stopPropagation();
	}

	if(event.preventDefault){
		event.preventDefault();
		el.style.left = (e.clientX + scroll.x - deltaX) + 'px'; // объект с абсолютным позиционирвоанием
		el.style.top = (e.clientY + scroll.y - deltaY) + 'px';
		
		if(e.stopPropagation){ // останавливаем всплытие события
			e.stopPropagation();
		}
	}

	function moveHandler(){
		var scroll = getScroll;
	}

	function upHandler(){
		if(document.removeEventListener){ // бразуер поддерживает данный метод
			document.removeEventListener('mousemove', moveHandler, true); // вызываем метод отн. всего документа
			document.removeEventListener('mouseup', upHandler, true); // вызываем метод отн. всего документа
		}

		if(e.stopPropagation){
			e.stopPropagation();
		}
	}

}

////////////// События формы ////////////// 

События клавиатуры

onkeypress - ввод символа в элемент
onkeyup - клавиша отпущена
onkeydown - клавиша нажата


<input data-chars='asdfghjkl' name='email' type='text' id='inputEmail'> // data-chars - разрешенные символы

window.onload = function(e){
	function addEvent(target, type, hendler){ // кросбраузерный обработчик
		if(target.addEventListener){ // выполнится везде кроме IE
			target.addEventListener(type,hendler, false);
		}else{
			targer.attachEvent('on' + type, function(e){
				return hendler.call(target,e); // call - вызов функции в контексте опред. объекта (1-й аргумент, 2-й аргумент - перед. параметры)
			});
		}
	}


	var input = document.getElementById('inputEmail');
	
	addEvent(input, 'keypress', handler);

	var chars = [];

	function hendler(e){ // e - объект возникшего события
		e = e || window.event; // window.event для IE
		var target = e.target || e.srcElement; // e.target - содержит элемент, который является целью события 
		var code = e.charCode || e.keyCode; // возвращает код введенного символа
		
		// CharCode - 1087 - свойство с введенным кодом символа
		
		if(code <32 || e.ctrlKey || e.altKey){
			return;
		}

		var text = String.fromCharCode(e.charCode);
		var chars = target.getAttribute('data-chars');

		if(chars.indexOf(text) == -1){ // недопустимый символ 
			alert('Не допустимый символ' + text);
			e.preventDefault();
			return false;
		}
		
		//chars.push(String.fromCharCode(e.charCode)); // добавляем в массив введенный символ

		return true; 
	}
}

События форм

obsubmit // отправка формы. Например, document.getElementById('myForm').submit();
onreset // сбрасывание формы. Элемент с type reset
onchange // изменение состояния опред. элемента формы
onclick // клик по элементу
onfocus // элементу передается фокус. Например, клик на поле элемента
onblur // потеря фокуса
oninput  // в элемент добавляется содержимое. Пример <input oninput='this.value = this.value.toUpperCase();'> // Вводимые символы станут верхнего регистра

События объекта window

onload
onbeforeunload
onfocus
onblur
onresize
onscroll


window.onload = function(e){
	function addEvent(target, type, hendler){ // кросбраузерный обработчик
		if(target.addEventListener){ // выполнится везде кроме IE
			target.addEventListener(type,hendler, false);
		}else{
			targer.attachEvent('on' + type, function(e){
				return hendler.call(target,e); // call - вызов функции в контексте опред. объекта (1-й аргумент, 2-й аргумент - перед. параметры)
			});
		}
	}
	
	var inputs = document.getElementById('input');

	for(var i = 0; i < inputs.length; i++){
		var el = inputs[i];
		
		if(el.type == 'radio'){
			addEvent(el, 'change', handler);
		}
	}
	
	function hendler(e){ // e - объект возникшего события
		e = e || window.event; // window.event для IE
		var target = e.target || e.srcElement; // e.target - содержит элемент, который является целью события 
		
		var id = target.getAttribute('value');
		
		if(id){
			var div =document.querySelector('.extraFields'); 
			var divs = div.children; // дочерние элементы
			
			for(var i = 0; i < divs.length; i++){
				if(divs[i].lastElementChild.getAttribute('id') == id){ // последний дочерний элемент и выбранная радио-кнопка
					div[i].className = 'active';
				}else{
					div[i].className = 'hidden';
				}
			}
		}
	}
});

////////////// Работа с Ajax ////////////// 	
		
window.onload = function(e){
	function addEvent(target, type, hendler){ // кросбраузерный обработчик
		if(target.addEventListener){ // выполнится везде кроме IE
			target.addEventListener(type,hendler, false);
		}else{
			targer.attachEvent('on' + type, function(e){
				return hendler.call(target,e); // call - вызов функции в контексте опред. объекта (1-й аргумент, 2-й аргумент - перед. параметры)
			});
		}
	}
	
	
	function hendler(e){ // e - объект возникшего события
		e = e || window.event; // window.event для IE
		
		var request = new XMLHttpRequest();
		
		request.open('POST', 'server.php');
		
		request.setRequestHeader('MyHead', 'some string'); // отправка заголовков. MyHead - название, some string - контент	
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // обязю заголовок при отправке информации на сервер
		
		request.onreadystatechange = function(){
			if(request.readyState === 4 request.status === 200){
				document.getElementById('three').innerHTML = request.responseText;
			}
		}
		
		request.send('name=Ben&age=18'); // при GET - () можно оставить пустым
		
		//getResponseHeader(); - Возвращает значение заголовка ответа
		// responseText
		// responseXml
		// readyState - код состояния HTTP запроса (0 - запрос не определен -> 1 - открыт HTTP запрос -> 2 - получены заголовки 3 -> прием тела ответа 4 -> прием ответов завершен)
		
		e.preventDefault();
		return false;

});	
	


