// ### TYPESCRIPT: BASIC ###


// @ INSTALL:
// $ npm install -g typescript



// @ types:
const isFetching: boolean = true;
const isLoading: boolean = false;

const int: number = 42;
const float: number = 4.2;
const num: number = 3e10;

const message: string = 'Hello';

const numberArray2: Array<number> = [1, 2, 3, 4, 6]; // дженерик: в массиве только числа
const words: Array<string> = ['Hello', 'Typescript']; // дженерик: в массиве только строки
// <->
const words2: string[] = ['Hello', 'Typescript'];

// Tuple:
const concat: [string, number] = ['Maxim', 7774565]; // в массиве только строки и числа

// Any:
let variable: any = 42; // тип переменной может меняться
variable = 'New string';

// Function:
function sayMyName(name: string): void { // void - функция ничего не возвращает
    console.log(name);
}

// Never:
function throwError(message: string): never { // never - признак для значений, которых никогда не будет. Или, признак для функций, которые никогда не вернут значения, то ли по причине ее зацикленности, например, бесконечный цикл, то ли по причине ее прерывания.
    throw new Error(message);
}

function infiniteLoop(): never { // бесконечный цикл
    while (true) {

    }
}

function infiniteRec(): never { // божественная рекурсия
    return infiniteRec();
}

// Type:
type Login = string; // создание собственного типа
const login: Login = 'admin';

type ID = string | number;
const id: ID = 1234;
const id2: ID = '1234';



// @ interfaces:
interface Rect {
    readonly id: string, // readonly - только для чтения
    color ?: string // ? - необязательный параметр
    size: {
        width: number,
        height: number
    }
}

const rect: Rect = {
    id: '1234',
    size: {
        width: 20,
        height: 30
    }
};

rect.color = '#ccc';

const react2 = {} as Rect; // приводим объект к типу Rect
const rect3 = <Rect>{} // <-> старый вид записи


// наследование интерфейсов:
interface ReactWithArea extends Rect {
    getArea: () => number
}

const react4: ReactWithArea = {
    id: '123',
    size: {
        width: 20,
        height: 20
    },
    getArea(): number {
        return this.size.widthw * this.size.height;
    }
};

// имплементация:
interface IClock {
    time: Date, // тип Date
    setTime(date: Date): void
}

class Clock implements IClock {
    time: Date = new Date();

    setTime(date: Date): void {
        this.time = date;
    }
}


// описание всех ключей и значений в интерфейсе:
interface Styles {
    [key: string]: string // ключ и значение - строка
}

const css: Styles = {
    border: '1px soild black',
    marginTop: '2px',
    borderRadius: '5px'
};



// @ enum.js:
// набор именованных числовых|строковых констант

enum Membership {
    Simple,
    Standart,
    Premium
}

const membership = Membership.Standart; // 1
const membershipReverse = Membership[2]; // Premium

enum SocialMedia {
    VK = 'VK',
    FACEBOOK = 'FACEBOOK',
    INSTAGRAMM = 'INSTAGRAMM'
}

const social = SocialMedia.INSTAGRAMM; // INSTAGRAMM



// @ functions:
function add(a: number, b: number): number {
    return a + b;
}

function toUpperCase(str: string): string {
    return str.trim().toUpperCase();
}


// Перегрузка:
interface MyPosition {
    x: number | undefined,
    y: number | undefined
}

interface MyPositionWithDefault extends MyPosition {
    default: string
}

function position(): MyPosition;
function position(a: number): MyPositionWithDefault;
function position(a: number, b: number): MyPosition;

function position(a?: number, b?: number) {
    if (!a && !b) {
        return { x: undefined, y: undefined };
    }

    if (a && !b) {
        return { x: a, y: undefined, default: a.toString };
    }

    return { x: a, y: b };
}

console.log('Empty: ', position());
console.log('One param: ', position(42));
console.log('Two params: ', position(10, 15));




// @ classes:
class Typescript {
    version: string;

    constructor(version: string) {
        this.version = version;
    }

    info(name: string) {
        return `[${name}]: Typescript version is ${this.version}`;
    }
}

class Car {
    readonly model: string
    readonly numberOfWheels: number = 4;

    constructor(theModel: string) {
        this.model = theModel;
    }
}

// <-> сокращенный вариант:
class Car {
    readonly numberOfWheels: number = 4;
    constructor(readonly model: string) {

    }
}


// модификаторы:
class Animal {
    protected voice: string = '';
    public color: string = 'black';

    private go() {
        console.log('GO');
    }
}


class Cat extends Animal {
    public setVoice(voice: string): void {
        this.voice = voice;
    }
}

const cat = new Cat;
cat.setVoice('test');

// абстрактный класс:
abstract class Component {
    abstract render(): void;
    abstract info(): void;
}

class AppComponent extends Component {
    render(): void {
        console.log('Component on render');
    }

    info(): void {
        console.log('This is info');
    }
}


// @ guards:
function strip(x: string | number) {
    if (typeof x  === 'number') {
        return x.toFixed(2);
    }

    return x.trim();
}

class MyResponse {
    header = 'response header';
    result = 'response result';
}

class MyError {
    header = 'error header';
    message = 'error message';
}

function handle(res: MyResponse | MyError) {
    if (res instanceof MyResponse) {
        return {
            info: res.header + res.result
        }
    }

    return {
        info: res.header + res.message
    }
}


type AlertType = 'success' | 'danger' | 'warning';

function setAlertType(type: AlertType) {
    // ...
}

setAlertType('success');
setAlertType('danger');
setAlertType('warning');



// @ generic:

// #1:
const numberArray: Array<number> = [1, 2, 3, 4, 6]; // дженерик. в массиве только числа
const arrayOfStrings: Array<string> = ['Hi', 'Maxim']; // дженерик. в массиве только строки

// #2:
function identity <T>(value: T) : T {
    return value;
}

identity<Number>(1); // тип Number — это такой же аргумент, как и 1. Он подставляется везде вместо T.
// Функция может принимать несколько типов аналогично тому, как она принимает несколько аргументов.

// #3:
function reverse<T>(array: T[]): T[] { // разные типы данных
    return array.reverse();
}



// @ operators:
// #1
interface Person {
    name: string,
    age: number
}

type PersonKeys = keyof Person; // 'name' | 'age'

let key: PersonKeys = 'name';
key = 'age';

// #2
type User = {
    _id: number,
    name: string,
    email: string,
    createdAt: Date
}

type UserKeysNoMeta = Exclude<keyof User, '_id' | 'createdAt'> // исключаем ключи из типа -> 'name' | 'email'
type UserKeysNoMeta2 = Pick<User, 'name' | 'email'> // оставляем определенные ключи из типа -> 'name' | 'email'

let u1: UserKeysNoMeta = 'name';


// tsc types.js // tsc - typescript compilator - компилируем файл -> types.js