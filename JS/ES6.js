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


/*@ Создание свойств @*/

let width = 100;
let height = 200;
let border = '1px solid red';

let options = {
	width,
	height,
	b: border // меняем название ключа
};

console.log(options);


/*@ Слайдер @*/
setInterval(() => {
	[img[0].src, img[1].src, img[2].src] = [img[1].src, img[2].src, img[0].src];
}, 1000); 


/*@ Цикл для перебора массива @*/ 
for (let elem of arr) {
	// code
}

// При этом цикл для перебора объекта: for (let key in obj) {}, в key - будет значение ключа


/*@ Проверка на существование элемента в массиве @*/ 
arr.find(e => e === 'что ищем'); 


/*@ Копирование массива @*/ 
let arr = [1, 2, 3];
let [...clone] = arr;


/*@ Сортировка @*/ 
let arr = [1, 2, 3];
arr = arr.sort((a, b) => a - b);


