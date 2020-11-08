+ [PROMISE](#PROMISE)
+ [CATCH IN PROMISE](#PROMISE_CATCH)
+ [PROMISE CHAINING](#PROMISE_CHAINING)
+ [PROMISE ALL](#PROMISE_ALL)
+ [PROMISE RACE](#PROMISE_RACE)
+ [PROMISE RESOLVE](#PROMISE_RESOLVE)
+ [PROMISE REJECT](#PROMISE_REJECT)
+ [PROMISE ASYNC AWAIT](#PROMISE_ASYNC)
+ [ЗАГРУЗКА КАРТИНОК](#PROMISE_IMG)

### <a name="PROMISE"></a> PROMISE:
предоставляет удобный способ организации асинхронного кода.

СТАТУСЫ:
* pending - ожидание
* resolved - исполнено
* rejected - отклонено

```js
const willGift = new Promise((resolve, reject) => {
    const win = Math.random().toFixed(1);
    
    if (win > 0.5) {
      resolve('Win!');
      return; 
    }   
        
    reject('Lost!');
});

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
```
```js
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let num = Math.ceil(Math.random() * 100);
        
        console.log('2 шаг');
        
        if (num < 50) {
          resolve('3 шаг: успешно выпало < 50');	
          return; 		
        } 

        reject('3 шаг: ошибка выпало > 50'); 
    }, 3000);
});

console.log('1 шаг');

promise.then(
	result => console.log(result), 
	error => console.log(error) 
)

// =>
// 1 шаг
// 2 шаг
// 3 шаг - успешно < 50 или (3 шаг: ошибка выпало > 50)
```
```js
let promise = new Promise((resolve, reject) => {
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
});

promise.then(result => console.log(result), error => console.log(error))
console.log('1 шаг');

function getRandomInt(min, max) { // генерирует случайное число из заданного диапазона
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
		
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
```
### <a name="PROMISE_CATCH"></a> CATCH IN PROMISE:
```js
// #1:
promise.then(result => console.log(result), error => console.log(error))

// #2:
promise
	.then(result => console.log(result))
	.catch(error => console.log(error))
```
### <a name="PROMISE_CHAINING"></a> PROMISE CHAINING:
```js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('запуск | ');
    }, 3000);
});	

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

// Успешно: запуск | 1 then | 2 then
```
```js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => reject('запуск | '), 3000);
});	

promise
	.then(
		data => new Promise((resolve, reject) => { 
			setTimeout(() => resolve(data + '1 then | '), 2000)
		}),
		error => {
			// #1 возвращаемые данные передадутся в следующий then:
			return 'new Data | '; 

			// #2 данные передаются в ближайший сatch:
			throw new Error('Неисправимая ошибка') 	
		}
	)	
	.then( 
		data => new Promise((resolve, reject) => {
            setTimeout(() => resolve(data + '2 then'), 1000);	
		})
	)
	.then(data => console.log('Успешно: ' + data))
	.catch(error => console.log(error.message))


// C #1: Успешно: new Data | 2 then
// БЕЗ #1: Неисправимая ошибка
```
### <a name="PROMISE_ALL"></a> PROMISE ALL:
```js
const heavyOperation = num => new Promise(function(resolve, reject) {
    setTimeout(() => resolve(num * num), 3000);
});

heavyOperation(3).then(result => console.log(result), error => console.log(error));

// через 3 секунды => 9

let arr = [
	new Promise((resolve, reject) => {
		setTimeout(() => resolve(2 * 2), 1000);
	}),
	new Promise((resolve, reject) => {
		setTimeout(() => resolve(3 * 3), 1000);
	}),
];

Promise
	.all(arr)
	.then(results => console.log(results)); // метод all позволяет выполнить несколько promise одновременно, после этого выполняется then

// в results - массив из результов resolve-ов -> через 2 секунды => [4, 9]
```
```js
let nums = [1, 2, 3];

Promise
	.all(nums.map((num) => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num != 0) {
                resolve(num * num);	
                return;
            } 
            
            reject('Передан 0');
        }, 3000);
    }))
	.then(results => console.log(results), error => console.log(error));

// через 9 секунд => [1, 4, 9]
```
### <a name="PROMISE_RACE"></a> PROMISE RACE:
```js
const promise1 = new Promise((resolve, reject) => setTimeout(resolve, 500, 'one'));
const promise2 = new Promise((resolve, reject) => setTimeout(resolve, 100, 'two'));

Promise.race([promise1, promise2]).then(value => console.log(value)); // метод race - ждет загрузки 1-го promise, после этого выполняется then
// => two
```
### <a name="PROMISE_RESOLVE"></a> PROMISE RESOLVE:
```js
const promise1 = Promise.resolve([1, 2, 3]); // создает уже выполнившийся promise
promise1.then(value => console.log(value));

// => [1, 2, 3]
```
### <a name="PROMISE_REJECT"></a> PROMISE REJECT:
```js
const resolved = result => console.log(result)

const rejected = result => console.log(result)

Promise.reject(new Error('fail')).then(resolved, rejected) // создает уже выполнившийся promise c ошибкой
// => Error: fail
```
### <a name="PROMISE_ASYNC"></a> PROMISE ASYNC AWAIT:
```js
const getSmthF = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve('getSmthF - успешно'), 1000)
	});
}

const getSmthS = () => {
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
```

### <a name="PROMISE_IMG"></a> ЗАГРУЗКА КАРТИНОК (PROMISE):
```js
const loadImage = path => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = path;

		image.onload = () => resolve(image); // картинка загружена успешно
		image.onerror = () => reject(path); // картинка загружена с ошибкой
	});
}

loadImage('images/1.png').then(
	image => document.body.appendChild(image),
	error => console.log(error)
);

// OR SEVERAL:
const images = [
	'images/1.png',
	'images/2.png',
	'images/3.png',
	'images/4.png',
	'images/5.png',
];

Promise
    .all(images.map(loadImage))
    .then(images => {
        for (let image of images) {
            document.body.appendChild(image);
        }
    })
	.catch(error => console.log(error));
```