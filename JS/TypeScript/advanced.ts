// $ npm init -y # по дефолту
// $ npm install -D typescript
// $ tsc --init # генерирует файл конфигурации typescript - tsconfig.json
// $ tsc # запускаем компиляцию
// $ tsc -w # запуск слежения за изменением файлов


// FILE: tsconfig.json:
{
    "compilerOptions": {
        // ...
        "target": "ES6", // в какую версию компилировать JS
            "lib": [ // подключение библиотек
            "DOM", // подключаем браузерный API (по умолч.)
            "scripthost", // (по умолч.)
            "dom.iterable", // (по умолч.)
            "es2016" // (по умолч.)
        ],
        "allowJs": true, // разрешить JS файлам быть скомпилированными
        "checkJs": true, // включает проверку JS файлов
        "sourceMap": true, // включить генерацию sourceMap
        "outDir": "./dist", // директория для скомпилированных файлов
        "rootDir": "./src", // корневая директория
        "removeComments": true, // удаление комменториев в скомпилированных файлах
        "noEmitOnError": true, // не запускать компиляцию если есть ошибки (по умолч. false)
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,

        "jsx": "preverse", // или react или react-native - настройки для React
        "experimentalDecorators": true // экспериментальная фича - декораторы
    },
    "exclude": [ // файлы или пути, которые исключаем из компиляции
        "./module.ts" // пример
    ],
    "include": [ // файлы или пути, которые включаем в компиляцию
        "./src/**/*"
    ],
    "files": [ // файлы, которые включаем в компиляцию
        "./module.ts"
    ]
}


// + FILE: index.js:
/**
 <!DOCTYPE html>
 <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Typescript</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <script src="dist/app.js" defer></script>
        <script src="dist/generic.js" defer></script>
    </head>
    <body>
        <div class="container"></div>
    </body>
 </html>
 */


// + FILE: src/app.ts:
const message: string = 'Hello world';



// + FILE: src/generic.ts:
// #1:
function mergeObjects<T extends object, R extends object>(a: T, b: R): T & R {
    return Object.assign({}, a, b);
} // T & R - не обязательный TS понимает и без указания на это

const merged = mergeObjects({ name: 'Maxim' }, { age: 26 });

// #2:
interface ILength {
    length: number
}

function withCount<T extends ILength>(value: T): {value: T, count: string} {
    return {
        value,
        count: `В этом объекте ${value.length} символов`
    }
} // <T extends ILength> - передаваемый объект должен иметь свойство length

console.log(withCount('Привет Typescript')); // отработает
console.log(withCount(['I', 'am', 'array'])); // отработает
console.log(withCount({ length: 20 })); // отработает
console.log(withCount(20)); // ошибка

// #3:
function getObjectValue<T extends object, R extends keyof T>(obj: T, key: R) {
    return obj[key];
} // keyof T - ключи объекта T

const person = {
    name: 'Max',
    age: 26
};

console.log(getObjectValue(person, 'name')); // отработает
console.log(getObjectValue(person, 'age')); // отработает
console.log(getObjectValue(person, 'job')); // ошибка


// #4:
class Car {
    label: string = 'Generic Car';
    numWheels: Number = 4;
    horn() {
        return "beep beep!";
    }
}

class Truck extends Car {
    label = 'Truck';
    numWheels = 18;
}

class Vespa extends Car {
    label = 'Vespa';
    numWheels = 2;
}

function washCar <T extends Car> (car: T) : T {
    console.log(`Received a ${car.label} in the car wash.`);
    console.log(`Cleaning all ${car.numWheels} tires.`);
    console.log('Beeping horn -', car.horn());
    console.log('Returning your car now');
    return car;
}

const myVespa = new Vespa();
washCar<Vespa>(myVespa);

const myTruck = new Truck();
washCar<Truck>(myTruck);

// #4:
type Student = {
    name: string;
    age: number;
    hasScar: boolean;
};

const students: Student[] = [
    { name: "Harry", age: 17, hasScar: true },
    { name: "Ron", age: 17, hasScar: false },
    { name: "Hermione", age: 16, hasScar: false }
];

function getBy<T, P extends keyof T>(model: T[], prop: P, value: T[P]): T | null {
    return model.filter(item => item[prop] === value)[0] || null;
}

const result = getBy(students, "name", "Harry");

// #5:
const promise = new Promise<string>(resolve => {
    setTimeout(() => {
        resolve('Promise resolved!');
    });
});
// <->
const promise2: Promise<string> = new Promise(resolve => {
    setTimeout(() => {
        resolve('Promise resolved!');
    });
});

promise.then(data => {
    console.log(data.toUpperCase());
});


// #6:
class Collection<T extends number | string | boolean> {
    constructor(private _items: T[] = []) {}

    add(item: T) {
        this._items.push(item);
    }

    remove(item: T) {
        this._items = this._items.filter(i => i !== item);
    }

    get items(): T[] {
        return this._items;
    }
}

const strings = new Collection<string>(['I', 'am', 'strings']);
strings.add('!');
strings.remove('Am');
strings.items; // ['I', 'strings', '!']


const numbers = new Collection<number>([1, 2, 3]);
numbers.add(2);
numbers.remove(3);
numbers.items; // [1, 2, 2]


// #7:
interface Car {
    model: string,
    year: number
}

function createAndValidateCar(model: string, year: number): Car {
    const car: Partial<Car> = {}; // Partial - временно не хватает определенных ключей

    if (model.length > 3) {
        car.model = model;
    }

    if (year > 2000) {
        car.year = year;
    }

    return car as Car;
}


// #8:
const cars: Readonly<Array<string>> = ['Ford', 'Audi']; // массив только для чтения
const ford: Readonly<Car> = { // объект только для чтения
    model: 'Ford',
    year: 2020
};



// @ decorators:
function LogClass(constructor: Function) {

}

function LogProp(target: any, propName: string | Symbol) {

}

function LogMethod(target: any, propName: string | Symbol, descriptor: PropertyDescriptor) {

}


@LogClass
class Component {
    @LogProp
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    @LogMethod
    logName(): void {
        console.log(`Component Name: ${this.name}`);
    }

    @LogMethod
    get componentName() {
        return this.name;
    }
}


// #2:
interface ComponentDecorator {
    selector: string,
    template: string
}

function Component(config: ComponentDecorator) {
    return function
        <T extends { new(...args:any[]): object }>
        (Constructor: T) {
        return class extends Constructor {
            constructor(...args: any[]) {
                super(...args);   
                
                const el = document.querySelector(config.selector)!;
                el.innerHTML = config.template;
            }
        }        
    }
}

function Bind(_:any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original = descriptor.value;
    
    return {
        configurable: true,
        enumerable: false,
        get() { // this указывает на инстанс класса
            return original.bind(this)
        }
    };
}

@Component({
    selector: '#card',
    template: `
        <div class="card">
            <div class="card-content">
                <span class="card-title">Card Component</span>
            </div>
        </div>
    `
})
class CarComponent {
    constructor(public name: string) {
    }

    @Bind
    logName(): void {
        console.log(`Component Name: ${this.name}`);
    }
}

const card = new CarComponent('My Card Component'); 
const btn = document.querySelector('#btn')!;
btn.addEventListener('click', card.logName); // благодаря декоратору @Bind, вместо card.logName.bind(card)


// #3:
type ValidatorType = 'required' | 'email';

interface ValidatorConfig {
    [prop: string]: {
        [validateProp: string]: ValidatorType
    }
}

const validators: ValidatorConfig = {}

function Required(target: any, propName: string) {
    validators[target.constructor.name] = { // target.constructor.name - название класса
        ...validators[target.constructor.name],
        [propName]: 'required',
    }
}

class Form {
    @Required
    public email: string|void;

    constructor(email?: string) {
        this.email = email;
    }
}

const form = new Form();
console.log(form);