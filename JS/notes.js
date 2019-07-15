// >>>>>> Что такое prototype <<<<<<

// #1 добавляем всем объектам метод sayHello:
const maxiMir = {
    name: "Maxim",
    age: 25,
    greet: function () {
        console.log('Greet');
    }
};

maxiMir.sayHello(); // => Uncaught TypeError

Object.prototype.sayHello = function () { 
    console.log('Hello!');
};

// цепочка наследования - объект __proto__

maxiMir.sayHello(); // => Hello!

// #2 один из вариантов наследования:
const maxCon = Object.create(maxiMir);
maxCon.age = 30;
maxCon.greet(); // Greet



// >>>>>> Что такое контекст. Как работает call, bind, apply <<<<<<

function hello () {
    console.log('Hello', this);
}

const maxiMir = {
    name: "Maxim",
    age: 25,
    sayHello: hello
};

maxiMir.sayHello(); // Hello > {name: "Maxim", age: 25, sayHello: f}
window.hello(); // <-> hello(); Hello > Window {postMessage: f, blur: f, focus: f, ...}


this === window; // true


const maxiMir = {
    name: "Maxim",
    age: 25,
    sayHello: hello,
    sayHelloWindow: hello.bind(window), // в () контекст вызова для this
    logInfo: function (job, phone) {
        console.group(`${this.name} info:`); // Заголовок для группы
        console.log(`Name is ${this.name}`);
        console.log(`Age is ${this.age}`);
        console.log(`Job is ${job}`);
        console.log(`Phone is ${phone}`);
        console.groupEnd();
    }
};

const maxCon = {
    name: "Max",
    age: 30   
};

// #1 bind:
const fnMaxConInfoLog = maxiMir.logInfo.bind(maxCon, 'Frontend', '8-999-999-99-99'); 
fnMaxConInfoLog(); // () - т.к. метод bind не вызывает функцию, а возвращает новую // =>

// #2 call:
maxiMir.logInfo.call(maxCon, 'Frontend', '8-999-999-99-99'); // сразу вызывает функцию => 

// #3:
maxiMir.logInfo.apply(maxCon, ['Frontend', '8-999-999-99-99']); // сразу вызывает функцию => 

// Max info:
//      Name is Max
//      Age is 30
//      Job is Frontend
//      Phone is 8-999-999-99-99


// Пример задачи с собеседований (создать метод для массивов):
const nums = [1, 2, 3, 4, 5];

Array.prototype.multBy = function(n) {
    return this.map(item => item * n);
};

nums.multBy(2); // [2, 4, 6, 8, 10]



// >>>>>> Что такое замыкания <<<<<<

// Написать свою функцию bind
function logPerson() {
    console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
}

const person1 = {name: 'Maxim', age: 22, job: 'Frontend'};
const person2 = {name: 'John', age: 23, job: 'SMM'};

function bind(context, fn) {
    return (...args) => fn.apply(context, args);
}

bind(person1, logPerson)(); // Person: Maxim, 22, Frontend
bind(person2, logPerson)(); // Person: John, 23, SMM



// >>>>>> Асинхронность. Event Loop. SetTimeout  <<<<<<

setTimeout(() => { // Web Apis <-> window.setTimeout(...); 
    console.log('Inside timeout, after 2000 seconds');
}, 2000); 

// Call Stack
// Web Apis
// Event Loop
// Callback Queue



// >>>>>> Promise <<<<<<
console.log('Request data...');

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Preparing data...');

        const backendData = {
            server: 'aws',
            port: 2000,
            status: 'working'
        };

        resolve(backendData);
    }, 2000);
});

promise
    .then(data => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                data.modified = true;
                resolve(data);
            }, 2000);
        });
    })  
    .then(clientData => {
        clientData.fromPromise = true;

        return clientData; // можно возвращать не только промисы
    })
    .then(data => console.log('Modified', data))
    .catch(err => console.error('Error', err))
    .finally(() => console.log('Finally')); // вызывается в любом случае


// #2 sleep:    
const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    });    
} 
    
sleep(2000).then(() => console.log('After 2 sec'));
sleep(3000).then(() => console.log('After 3 sec'));


// #3 Promise.all: 
Promise.all([sleep(2000), sleep(3000)])
    .then(() => console.log('All promises')); // ждет выполнения всех промисов


// #4 Promise.race: 
Promise.race([sleep(2000), sleep(3000)])
    .then(() => console.log('Race promises')); // ждет выполнения первого промиса



// >>>>>> Объекты с Object.create <<<<<<

const person = Object.create(
    { // прототип:
        calculateAge() {
            console.log('Age:', new Date().getFullYear() - this.birthYear);
        }
    }, 
    {
        name: {
            value: 'MaxiMir',
            enumerable: true, // !#1
            writable: true, // !#2
            configurable: true // !#3
        },
        birthYear: {
            value: 1988,
            enumerable: true, // !#1
            writable: true // !#2
        },
        age: {
            get() {
                return new Date().getFullYear() - this.birthYear;        
            }, 
            set(value) {
                document.body.style.background = 'red';
                console.log('Set age', value)
            }
        }
    }
);

const person2 = { name: 'MaxiMir', birthYear: 1988 };

for(let key in person) {
    if (person.hasOwnProperty(key)) { // собственный ключ объекта (не прототип)
        console.log('Key', key); // => #1 Ничего не выведет без enumerable
    }
}

for(let key in person2) {
    console.log('Key', key); // => Key name \n Key birthYear
}

person.name = 'John'; // !#2 Нельзя будет изменить без writable
console.log('Name', person.name); // => MaxiMir

delete person.birthYear // !#3 Нельзя будет удалить по ключу из объекта без configurable

person.age; // => 30
person.age = 100; 

person.calculateAge(); // => 30



// >>>>>> Все о ES6 Классах  <<<<<<

class Animal {
    static type = 'ANIMAL';

    constructor(options) {
        this.name = options.name;
        this.age = options.age;
        this.hasTail = options.hasTail;
    }

    voice() {
        console.log('I am animal')
    }
}

const animal = new Animal({
    name: 'Animal',
    age: 5, 
    hasTail: true
});

Animal.voice(); // => 'I am animal'

animal.type; // ! => undefined
Animal.type; // ! => ANIMAL


class Cat extends Animal {
    static type = 'CAT';

    constructor(options) {
        super(options);
        this.color = options.color;
    }

    voice() {
        super.voice();
        console.log('I am cat')
    }

    get ageInfo() {
        return this.age * 7;
    }

    set ageInfo(newAge) {
        this.age = newAge;
    }
}

const cat =  new Cat({
    name: 'Cat',
    age: 7, 
    hasTail: true,
    color: 'black'
});

Cat.type; // => CAT
cat.voice(); // => I am animal \n I am cat 
cat.ageInfo; // => 49
cat.ageInfo = 8; // => 49
cat.ageInfo; // => 56


// #2:

class Component {
    constructor(selector) {
        this.$el = document.querySelector(selector);
    }

    hide() {
        this.$el.style.display = 'none';
    }

    show() {
        this.$el.style.display = 'block';
    }
}

class Box extends Component {
    constructor(options) {
        super(options.selector);

        this.$el.style.width = this.$el.style.heighth = options.size + 'px';
        this.$el.style.background = options.color;
    }
}

class Circle extends Box {
    constructor(options) {
        super(options);

        this.$el.style.borderRadius = '50%';
    }
}

const box1 = new Box({
    selector: '#box1',
    size: 100,
    color: 'red'
});

const box2 = new Box({
    selector: '#box2',
    size: 130,
    color: 'blue'
});

const circle = new Circle({
    selector: '#circle',
    size: 90,
    color: 'green'
});


box1.hide(); // cкрываем элемент box1
box1.show(); // показываем элемент box1

box2.hide(); // cкрываем элемент box2
box2.show(); // показываем элемент box2



// >>>>>> Async, Await <<<<<<
const delay = ms => {
	return new Promise(r => setTimeout(() => r(), ms));
};

const url = 'https://jsonplaceholder.typicode.com/todos';

// #1:
function fetchTodos() {
	console.log('Fetch todo started...');

	return delay(2000)
		.then(() => fetch(url))
		.then(response => response.json())
}


fetchTodos()
	.then(data => {
		console.log('Data:', data)
	})
	.catch(e => console.error(e));


// #2 аналогично через async + await:
async function fetchAsyncTodos() {
	console.log('Fetch todo started...');

	try {
		await delay(2000);
		const response = await fetch(url);
		const data = await response.json();
		console.log('Data:', data);
	} catch (e) {
		console.error(e)
	} finally {

	}
	
}

fetchAsyncTodos();



// >>>>>> Proxy. Объекты, функции, классы. <<<<<<

// # Objects:
const person = {
	name: "Maxim",
	age: 25,
	job: 'Fullstack'
};

const op = new Proxy(person, {
	get(target, prop) { // ловушка на метод get
		console.log('Target', target);
		console.log('Prop', prop);
		console.log(`Getting prop ${prop}`);
		return target[prop];
	},
	set(target, prop, value) {
		if (prop in target) {
			target[prop] = value;
		} else {
			throw new Error(`No ${prop} field in target`);
		}
	}, 
	has(target, prop) {
		return ['age', 'name', 'job'].includes(prop);
	},
	deleteProperty(target, prop) {
		console.log('Deleting...', prop);
		delete target.prop;

		return true;
	}
});

op.age; 
// Target >  {name: Maxim, age: 25, job: Fullstack}
// Prop age
// 25

op.qqq = 26;
// No qqq field in target

'name' in op;
// true

'age2' in op;
// false

delete op.age;
// 'Deleting... age


// # Functions:
const log = text = `Log: ${text}`;

const fp = new Proxy(log, {
	apply(target, thisArg, args) { // отслеживание вызова функции, thisArg - контекст, args - переданные параметры
		console.log('Calling fn...');

		return target.apply(thisArg, args).toUpperCase();
	},
});

fp(); 
// Calling fn...
// "LOG: undefined"

fn('TEST');
// Calling fn...
// "LOG: TEST"


// # Classes:
class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
}

const PersonProxy = new Proxy(Person, {
	construct(target, args) { // отслеживание инициализации класса
		console.log('Construct...');

		return new target(...args);
		// или
		return new Proxy(new target(...args), {
			get(tar, prop) {
				console.log(`Getting prop "${prop}"`);
				return t[prop];	
			}
		});
	}
});

const p = new PersonProxy('Maxim', 30);
// Construct...

p.name;
// Getting prop name
// "Maxim"


// # Wrapper
const withDefaultValue = (target, defaultValue = 0) => {
    return new Proxy(target, {
        get: (obj, prop) => (prop in obj ? obj[prop] : defaultValue)
    });
};

const position = withDefaultValue(
    {
        x: 24,
        y: 42
    },
    0
);

console.log(position); 
// > Proxy {x: 24, y: 42}
position.x
// 24
position.y
// 42
position.z
// 0

// # Hidden properties:
const withHiddenProps = (target, prefix = '_') => {
    return new Proxy(target, {
        has: (obj, prop) => (prop in obj) && (!prop.startWith(prefix)),
        ownKeys: obj => Reflect.ownKeys(obj) // возвращает массив из ключей
            .filter(p => !p.startsWith(prefix)),
        get: (obj, prop, receiver) => (prop in receiver ? obj[prop] : void 0) // void 0 <-> undefined 
    });
};

const data = withHiddenProps({
   name: 'MaxiMir', 
   age: 25,
   _uid: '1231231'
});

data
// > Proxy {name: MaxiMir, age: 25, _uid: 1231231}

data.age
//25

data._uid
// undefined

'_uid' in data
// false

for(let key in data) console.log(key);
// name
// age

Object.keys(data)
// ['name', 'age']


// Optimization
const userData = [
  {id: 1, name: 'MaxiMir', job: 'Fullstact', age: 25},
  {id: 2, name: 'Elena', job: 'Student', age: 22},  
  {id: 3, name: 'Victor', job: 'Backend', age: 23}
];

// Не подходит для больших объемов данных:
userData.find(user => user.id === 3); // По сути метод является циклом по всему массиву {id: 3, name: 'Victor', job: 'Backend', age: 23}

// Решение в лоп (карта индексов):
const index = {};
userData.forEach(i => (index[i.id] = i));
// 1: {id: 1, name: 'MaxiMir', job: 'Fullstact', age: 25},
// 2: {id: 2, name: 'Elena', job: 'Student', age: 22},  
// 3: {id: 3, name: 'Victor', job: 'Backend', age: 23},  
index[2]; // {id: 2, name: 'Elena', job: 'Student', age: 22}

// Right Way:
const IndexedArray = new Proxy(Array, {
    construct(target, [args]) {
        const index = {};
        args.forEach(item => (index[item.id] = item))

        return new Proxy(target(...args), {
            get(arr, prop) {
                switch(prop) {
                    case 'push':
                       return item => {
                           index[item.id] = item;
                           arr[prop].call(arr, item);
                       };
                    case 'findById': 
                        return id => index[id];
                    default: 
                        return arr[prop];
                }
            }
        });
    }
});

const users = new IndexedArray([
    {id: 1, name: 'MaxiMir', job: 'Fullstact', age: 25},
    {id: 2, name: 'Elena', job: 'Student', age: 22},  
    {id: 3, name: 'Victor', job: 'Backend', age: 23}    
]);

users.push({id: 7, name: 'John', job: 'Student', age: 22});
users.findById(7); // {id: 7, name: 'John', job: 'Student', age: 22}



