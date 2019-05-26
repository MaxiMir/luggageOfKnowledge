// ############### ES6 ###############


/*@ var и let @*/
var elems = document.querySelectorAll('p');

for (var i = 0; i < elems.length; i++) { 
    elems[i].addEventListener('click', function () { 
        this.innerHTML = i; // будет брать i на момент вызова => везде будет подставляеться elems.length + 1
    });
}

console.log(i); // => elems.length + 1


for (let i = 0; i < elems.length; i++) { 
    elems[i].addEventListener('click', function () { 
        this.innerHTML = i; // будет брать текущий i 
    });
}


console.log(i); // => Ошибка



/*@ Деструктуризация @*/

// 1:
var nums = [1, 20, 7, 6, 5];
Math.max(...nums); // нахождение максимального числа через Spread Operator => 20


// 2:
let a = 1;
let b = 2;

[a, b] = [b, a] 

console.log(a); // => 2
console.log(b); // => 1

// 3:
let arr = [1, 2, 3, 4, 5, 6]; 
let [num1, num2, ...nums] = arr; 

console.log(num1); // => 1
console.log(num2); // => 2
console.log(nums); // => [3, 4, 5, 6]


// 4:
function func(a, ...arrs) {
	console.log(a); // => [1, 2, 3]
	console.log(arrs); // => [[4, 5, 6], [7, 8, 9]]
}

func([1, 2, 3], [4, 5, 6], [7, 8, 9]);


// 5:
function concatArrs(...arrs) // Конкатенация произвольного количества массивов:
{
	return [].concat(...arrs);
}

// 6:
function createElem(tag, parent, options) {
	let {border = '1px solid black', width = 100, height = 100} = options; // со значениями по умолчанию

	let elem = document.createElement(tag);

	elem.style.border = border;
	elem.style.width = width + 'px';
	elem.style.height = height + 'px';

	parent.appendChild(elem);
}

createElem('div', document.body, {width: 400, height: 300})



/*@ Создание свойств: @*/

let width = 100;
let height = 200;
let border = '1px solid red';

let options = {
	width,
	height,
	b: border // меняем название ключа
};

console.log(options);



/*@ Слайдер: @*/
setInterval(() => {
	[img[0].src, img[1].src, img[2].src] = [img[1].src, img[2].src, img[0].src];
}, 1000); 



/*@ Цикл для перебора массива: @*/ 
for (let elem of arr) {
	// code
}

// При этом цикл для перебора объекта: for (let key in obj) {}, в key - будет значение ключа



/*@ Проверка на существование элемента в массиве: @*/ 
arr.find(e => e === 'что ищем'); 



/*@ Копирование массива: @*/ 
let arr = [1, 2, 3];
let [...clone] = arr;



/*@ Сортировка: @*/ 
let arr = [1, 2, 3];
arr = arr.sort((a, b) => a - b);



/*@ Удаление дублей из массива: @*/ 
function uniq(arr) {
    return [... new Set(arr)]; // # 1 через оператор Spread преобразуем объект Set к массиву
    return Array.from(new Set(arr)); // #2 
}

console.log(uniq([1, 2, 1, 3, 4, 2, 5])); // => [1, 2, 3, 4, 5]



/*@ Запомнить элементы на которые был клик (Set): @*/
let set = new Set;

let elems = document.querySelectorAll('p');

for (let elem of elems) {
    elem.addEventListener('click', function () {
        set.add(this);
    });
}

let button = document.querySelector('button');

button.addEventListener('click', () => {
    for(let elem of set) {
        elem.innerHTML += '!';
    }
    
    set.clear(); // очищаем коллекцию
});



/*@ По нажатию клавиши двигаться по истории введенных значений (Map): @*/
let inputs = document.querySelectorAll('input');

let map = new Map; // создаем новую коллекцию

for (let input in inputs) {
    map.set(input, {values: [], index: -1}); // для каждого перебираемого input создаем пустой объект
    
    input.addEventListener('blur', function () {
       let {values, index} = map.get(this); // получаем предыдущие значения
       values.push(this.value); // добавляем текущее значение
       map.set(this, {values: values, index: index + 1}); //  переопределяем
       
       this.value = ''; // удаляем данные из input
       
       console.log(map.get(this));
    });
    
    input.addEventListener('keydown', function (event) { // по нажатию кнопки влево - в input выводим предыдущие введенные значения
        let {values, index} = map.get(this);
        
        if (event.key === 'ArrowLeft' && index > -1)  {
            event.preventDefault();
            
            this.value = values[index];
            map.set(this, {values: values, index: index - 1});
        }
        
        if (event.key === 'ArrowRight' && index < values.lenght - 1)  {
            event.preventDefault();
            
            this.value = values[index + 1];
            map.set(this, {values: values, index: index + 1});
        }
    });
}



/*@ Преобразуем строку в массив: @*/ 
let str = 'abcde'; 
let letters = [...str];



/*@ Преобразуем число в массив цифр: @*/ 
let num = 12345;
let nums = [...String(num)];



/*@ Применение деструктуризации для свойств DOM элементов при переборе циклом for: @*/ 

let elems = document.querySelectorAll('p');

for (let {id, innerHTML: content} of elems) { // получаем ID элемента и его содержимое
    console.log(id, content);
}


/*@ Применение итераторов, деструктуризации и for of для получение порядкового номера DOM элемента: @*/ 

let elems = document.querySelectorAll('p');
let entries = elems.entries(); // итератор entries => [ключ, элемент]

for (let [num, {id, innerHTML}] of entries) {
    console.log(num, id, innerHTML); // в num - порядковый номер элемента 
}



/*@ Использование метода reduce для преобразования двухмерного массива в одномерный @*/

let array = [[1, 2, 3], [4, 5], [6]]; 

console.log(array.reduce((flat, current) => flat.concat(current), [])); // => [1, 2, 3, 4, 5, 6]




/*@ Promise @*/

// предоставляет удобный способ организации асинхронного кода.

/** СТАТУСЫ:
 * pending - ожидание
 * resolved - исполнено
 * rejected - отклонено
 */

// #1:
const willGift = new Promise(
    (resolve, reject) => {
        let win = Math.random().toFixed(1);

        if (win > 0.5)
            resolve('Win!');
        else
            reject('Lost!');
    }
);

const writeOnFb = () => Promise.resolve('I Win!'); // <-> new Promise((resolve, reject) => resolve('I Win!'))

const buyTicket = () => {
    console.log('buy ticket');

    willGift
        .then(result => console.log(result)) // произойдет в случае успеха (в result попадет Win!)
        .catch(error => console.log(error)); // произойдет в случае неуспеха (в result попадет Lost!)

    //.then(writeOnFb) // можно использовать несколько then

    console.log('sleep');
};

buyTicket(); // !асинхронность =>
// buy ticket
// sleep
// Win!


// #2:
let promise = new Promise(
	(resolve, reject) => {
		setTimeout(() => {
			let num = Math.ceil(Math.random() * 100);

			console.log('2 шаг');

			if (num < 50) {
				resolve('3 шаг: успешно выпало < 50');			
			} else {
				reject('3 шаг: ошибка выпало > 50'); 	
			}

		}, 3000);
	}
);

console.log('1 шаг');

promise.then(
	result => console.log(result), 
	error => console.log(error) 
)

// =>
// 1 шаг
// 2 шаг
// 3 шаг - успешно < 50 или (3 шаг: ошибка выпало > 50)


// #3:
let promise = new Promise(
	(resolve, reject) => {
		let i = 0;
		start();

		function start() {
			let interval = getRandomInt(1, 5);

			setTimeout(() => {
				i++;

				console.log(i, interval);

				if (interval === 3) {
					resolve('3 шаг: успешно interval равен 3');
				} else if (i >= 10) {
					reject('3 шаг: неудача более 10 итераций');
				} else {
					start();
				}
			}, interval * 1000); // запускаем через случайный промежуток времени
		}
	}
);

promise.then(
	result => console.log(result), 
	error => console.log(error) 
)

console.log('1 шаг');



function getRandomInt(min, max) { // генерирует случайное число из заданного диапазона
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
		
// =>
// 1 шаг
// 1 4
// 2 2
// 3 4
// 4 4
// 5 4
// 6 1
// 7 2
// 8 4
// 9 3
// 3 шаг: успешно interval равен 3 или (3 шаг: неудача более 10 итераций)



/*@ Catch в promise @*/

// #1:
promise.then(
	result => console.log(result), 
	error => console.log(error) 
)

// #2:
promise
	.then(
		result => console.log(result)
	)
	.catch(
		error => console.log(error)
	)



/*@ Цепочки Promise chaining: @*/

// # 1:
let promise = new Promise(
	(resolve, reject) => {
		setTimeout(() => {
			resolve('запуск | ');
		}, 3000);
	}	
);	

promise
	.then(
		data => data + '1 then | ' // здесь можно вернуть новый promise и нижний then будет относится к нему
	)
	.then( // в data попадает результат предыдущего then
		data => data + '2 then'
	)
	.then( // в data попадает результат предыдущего then
		data => console.log('Успешно: ' + data)
	)

// => Успешно: запуск | 1 then | 2 then


// #2:
let promise = new Promise(
	(resolve, reject) => {
		setTimeout(() => {
			reject('запуск | ');
		}, 3000);
	}	
);	

promise
	.then(
		function (data) { 
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(data + '1 then | ');
				}, 2000);
			})	
		},
		function (error) {
			// #1 возвращаемые данные передадутся в следующий then:
			return 'new Data'; 

			// #2 данные передаются в ближайший сatch:
			throw new Error('Неисправимая ошибка') 	
		}
	)		
	.then( 
		function (data) { 
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(data + '2 then');
				}, 1000);
			})	
		}
	)
	.then( 
		data => console.log('Успешно: ' + data)
	)
	.catch(
		error => console.log(error.message)
	)




/*@ Метод Promise all: @*/

// #1:
function heavyOperation(num) {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			resolve(num * num);	
		}, 3000);
	});
}


heavyOperation(3).then(
	result => console.log(result),
	error => console.log(error)
);


// через 3 секунды => 9

let arr = [
	new Promise(function(resolve, reject) {
		setTimeout(() => {
			resolve(2 * 2);	
		}, 1000);
	}),
	new Promise(function(resolve, reject) {
		setTimeout(() => {
			resolve(3 * 3);	
		}, 1000);
	}),
];

Promise
	.all(arr)
	.then(results => console.log(results)); // метод all позволяет выполнить несколько promise одновременно, после этого выполняется then
// в results - массив из результов resolve-ов
// через 2 секунды => [4, 9]


// #2:
let nums = [1, 2, 3];

Promise
	.all( 
		nums.map((num) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					if (num != 0) {
						resolve(num * num);	
					} else {
						reject('Передан 0');
					}
				}, 3000);
			});
		})
	)
	.then(
		results => console.log(results),
		error => console.log(error)
	);

// через 9 секунд => [1, 4, 9]




/*@ Метод Promise race: @*/
let promise1 = new Promise((resolve, reject) => setTimeout(resolve, 500, 'one'));
let promise2 = new Promise((resolve, reject) => setTimeout(resolve, 100, 'two'));

Promise.race([promise1, promise2]).then(value => console.log(value)); // метод race - ждет загрузки 1-го promise, после этого выполняется then
// => two




/*@ Метод Promise resolve: @*/
let promise1 = Promise.resolve([1, 2, 3]); // создает уже выполнившийся promise
promise1.then(value => console.log(value));

// => [1, 2, 3]



/*@ Метод Promise reject: @*/
let promise1 = Promise.resolve([1, 2, 3]); // создает уже выполнившийся promise c ошибкой
promise1.then(value => console.log(value));

function resolved(result) {
	console.log(result)
}

function rejected(result) {
	console.log(result)
}

Promise.reject(new Error('fail')).then(resolved, rejected)

// => Error: fail



/*@ Promise async await: @*/
function getSmthF() {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve('getSmthF - успешно'), 1000)
	});
}

function getSmthS() {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve('getSmthS - успешно'), 1000)
	});
}

async function func() {
	console.log('1');
	let result1 = await getSmthF(); 
	console.log('2'); // не выполниться пока не отработает getSmthF()
	let result2 = await getSmthS();
	console.log('3'); // не выполниться пока не отработает getSmthS()
	console.log(result1, result2);
}

func().catch(error => console.log(error)); // отловить ошибки #1

// => 
// 1
// 2
// 3
// ['getSmthF - успешно', 'getSmthS - успешно']


// отловить ошибки #2:
async function func() {
	try {
		let result = await getSmthF(); 
		console.log(result);
	} catch (error) {
		console.log(error);
	}
}



/*@ Загрузка картинок через Promise: @*/
// #1:
function loadImage(path) {
	return new Promise((resolve, reject) => {
		let image = new Image();
		image.src = path;

		image.onload = () => resolve(image); // картинка загружена успешно
		image.onerror = () => reject(path); // картинка загружена с ошибкой
	});
}

loadImage('images/1.png').then(
	image => document.body.appendChild(image),
	error => console.log(error)
);

// #2:
let images = [
	'images/1.png',
	'images/2.png',
	'images/3.png',
	'images/4.png',
	'images/5.png',
];


Promise
	.all(images.map(loadImage)).then(
		images => {
			for (let image of images) {
				document.body.appendChild(image);
			}
		}
	)
	.catch(error => console.log(error));