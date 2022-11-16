# TYPESCRIPT: BASIC

+ [TYPES](#TYPES)
+ [MULTIPLE TYPES](#MULTIPLE_TYPES)
+ [TUPLE](#TUPLE)
+ [TYPE](#TYPE)
+ [ENUM](#ENUM)
+ [FUNCTIONS](#FUNCTIONS)
+ [GUARDS](#GUARDS)
+ [FUNCTION OVERLOAD](#FUNCTION_OVERLOAD)
+ [INTERFACE](#INTERFACE)
+ [PARTIAL](#PARTIAL)
+ [DYNAMIC OBJECT KEYS](#DYNAMIC_OBJECT_KEYS)
+ [READONLY](#READONLY)
+ [REQUIRED](#REQUIRED)
+ [KEYOF](#KEYOF)
+ [RECORD](#RECORD)
+ [PICK](#PICK)
+ [OMIT](#OMIT)
+ [EXCLUDE](#EXCLUDE)
+ [EXTRACT](#EXTRACT)
+ [NonNullable](#NonNullable)
+ [ReturnType](#ReturnType)
+ [InstanceType](#InstanceType)
+ [ABSTRACT CLASS](#ABSTRACT_CLASS)
+ [GENERIC](#GENERIC)
+ [INFER_TYPE](#INFER_TYPE)
+ [CONDITIONAL TYPES](#CONDITIONAL_TYPES)
+ [DECORATOR](#DECORATOR)
+ [NAMESPACE](#NAMESPACE)
+ [SATISFIES](#SATISFIES)

```shell script
$ npm init -y # по дефолту
$ npm install -D typescript
$ tsc --init # генерирует файл конфигурации typescript - tsconfig.json
$ tsc # запускаем компиляцию
$ tsc -w # запуск слежения за изменением файлов
```

### <a name="TYPES"></a> TYPES:

* Boolean:

```typescript
const isFetching: boolean = true
```

* Number:

```typescript
const int: number = 42
const float: number = 4.2
const num: number = 3e10
```

* String:

```typescript
const message: string = 'Hello'
```

* Undefined:

```typescript
const u: undefined = undefined
```

* Null:

```typescript
const n: null = null // в нативном typeof null - object
```

* Object:

```typescript
const o: object = {name: 'object'} // object
const user: { name: string, age: number } = {name: 'Max', age: 25}
```

* Any:

```typescript
let variable: any = 42 // тип переменной может меняться
variable = 'New string'
```

### <a name="MULTIPLE_TYPES"></a> MULTIPLE TYPES:

```typescript
type ID = string | number
const id: ID = 1234
const id2: ID = '1234'
```

### <a name="TUPLE"></a> TUPLE:

```typescript
const concat: [string, number] = ['Maxim', 7774565] // массив со строками и числами
```

### <a name="TYPE"></a> TYPE:

```typescript
type Employee = {
	name: string,
	age: number,
	nickName?: string,
	getPass?: () => string
}

const developer: Employee = {
	name: 'John',
	age: 21,
	nickName: 'Slim'
}

const designer: Employee = {
	name: 'Ann',
	age: 19,
	getPass() {
		return 'ann1234'
	}
}
```

### <a name="ENUM"></a> ENUM:

```typescript
enum Directions { // набор именованных числовых констант:
    Up = 2,
    Down = 4,
    Left = 6,
    Right
}

Directions.Up // 2
Directions.Down // 4
Directions.Left // 6
Directions.Right // 7

Directions[2] // 'Up'
Directions[4] // 'Down'
Directions[6] // 'Left'
Directions[7] // 'Right'
```

* константные перечисления с оптимизацией - генерация только в случае обращения к links:

```typescript
const enum links { // при добавлении const компилироваться будет в константу, а не в функцию
	youtube = 'https://youtube.com',
	vk = 'https://vk.com',
}

links.youtube // https://youtube.com
links.vk // https://youtube.com
```

### <a name="FUNCTIONS"></a> FUNCTIONS:

```typescript
function add(a: number, b: number): number {
	return a + b
}

const createSkills = (name: string, ...skills: Array<string>): string =>
	`${name}, my skills are ${skills.join()}`

const sayMyName = (name: string): void => { // void - функция ничего не возвращает
	console.log(name)
}

const throwError = (message: string): never => { // never - результат из функции не получим
	throw new Error(message)
}

const infiniteLoop = (): never => { // с бесконечным циклом
	while (true) {}
}

const infiniteRec = (): never => { // с божественной рекурсией
	return infiniteRec()
}
```

### <a name="GUARDS"></a> GUARDS:

```typescript
class MyResponse {
	header = 'response header'
	result = 'response result'
}

class MyError {
	header = 'error header'
	message = 'error message'
}

const handle = (res: MyResponse | MyError) => {
	if (res instanceof MyResponse) {
		return res.header + res.result
	}

	return res.header + res.message
}

type AlertType = 'success' | 'danger' | 'warning'

const setAlertType = (type: AlertType) => {}

setAlertType('success')
setAlertType('danger')
setAlertType('warning')
```

### <a name="FUNCTION_OVERLOAD"></a> FUNCTION OVERLOAD | ПЕРЕГРУЗКА ФУНКЦИИ:

```typescript
interface MyPosition {
	x: number | undefined,
	y: number | undefined
}

interface MyPositionWithDefault {
	default: string
}

function position(): MyPosition
function position(a: number): MyPositionWithDefault
function position(a: number, b: number): MyPosition

function position(a?: number, b?: number) { // ? - опциональный аргумент
	if (!a && !b) {
		return {x: undefined, y: undefined}
	}

	if (a && !b) {
		return {x: a, y: undefined, default: a.toString}
	}

	return {x: a, y: b}
}

console.log('Empty: ', position())
console.log('One param: ', position(42))
console.log('Two params: ', position(10, 15))
```

### <a name="INTERFACE"></a> INTERFACE:

```typescript
interface Rect {
	readonly id: string, // readonly - только для чтения
	color?: string // ? - необязательный параметр
	size: {
		width: number,
		height: number
	}
}

interface ReactWithArea extends Rect {
	getArea: () => number
}

const rect: ReactWithArea = { // interface + object
	id: '1234',
	size: {
		width: 20,
		height: 30
	},
	getArea(): number {
		return this.size.width * this.size.height
	}
}

rect.color = '#ccc'

const react2 = {} as Rect // приводим объект к типу Rect
const rect3 = <Rect>{} // <-> старый вид записи
```

### <a name="PARTIAL"></a> PARTIAL:

```typescript
interface AppleCar {
	model: string,
	year: number
}

function createAndValidateCar(model: string, year: number): AppleCar {
	const car: Partial<AppleCar> = {} // Partial - временно не хватает определенных ключей

	if (model.length > 3) {
		car.model = model
	}

	if (year > 2000) {
		car.year = year
	}

	return car as AppleCar
}
```

### <a name="DYNAMIC_OBJECT_KEYS"></a> DYNAMIC OBJECT KEYS:

```typescript
interface Styles {
	[key: string]: string // ключ и значение - строка
}

const css: Styles = {
	border: '1px soild black',
	marginTop: '2px',
	borderRadius: '5px'
}
```

### <a name="READONLY"></a> READONLY:

```typescript
const cars: Readonly<Array<string>> = ['Ford', 'Audi'] // массив только для чтения

interface User {
	name: string	
}

const user: Readonly<User> = { // объект только для чтения
	name: 'Max'	
}

user.name = 'John'  // Error: cannot reassign a readonly property
```

### <a name="REQUIRED"></a> REQUIRED<T>:

```typescript
interface Props {
   a?: number,
   b?: string
}

const obj: Props = {a: 5} // OK
const obj2: Required<Props> = {a: 5} // Error: property 'b' missing
````

### <a name="KEYOF"></a> KEYOF:

```typescript
interface Person {
	name: string,
	age: number
}

type PersonKeys = keyof Person // 'name' | 'age'

let key: PersonKeys = 'name' // age
```

### <a name="RECORD"></a> RECORD<K, T>:

```typescript
interface PageInfo {
   title: string
}

type Page = 'home' | 'about' | 'contact'

const x: Record<Page, PageInfo> = { // сопоставляет
   about: {title: 'about'},
   contact: {title: 'contact'},
   home: {title: 'home'},
}
```

### <a name="PICK"></a> PICK<T, K>:

```typescript
interface Todo {
   title: string,
   decription: string,
   completed: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'completed'> // оставляем определенные ключи из типа

const todo: TodoPreview = {
   title: 'Clean room',
   completed: false
}
```

### <a name="OMIT"></a> OMIT<T, K>:

```typescript
interface Todo {
   title: string,
   decription: string,
   completed: boolean
}

type TodoPreview = Omit<Todo, 'decription'> // удаляет ненужные свойства у объекта

const todo: TodoPreview = {
   title: 'Clean room',
   completed: false
} 
```

### <a name="EXCLUDE"></a> EXCLUDE<T, U>:

```typescript
type T0 = Exclude<"a" | "b" | "c", "a"> // исключаем "a" -> "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b"> // исключаем "a" или "b" -> "c"
type T2 = Exclude<string | number | (() => void), Function> // исключаем функцию -> string | number

type User = {
	_id: number,
	name: string,
	createdAt: Date
}

type UserKeysNoMeta = Exclude<keyof User, '_id' | 'createdAt'>

let u1: UserKeysNoMeta = 'name'
```

### <a name="EXTRACT"></a> EXTRACT<T, U>:

```typescript
type T0 = Extract<"a" | "b" | "c", "a" | "f"> // оставляем только "a" или "f" -> "a"
type T1 = Exclude<string | number | (() => void), Function> // оставляем только функцию -> () => void
```

### <a name="NonNullable"></a> NonNullable<T>:

```typescript
type T0 = NonNullable<string | number | undefined> // string | number
type T1 = NonNullable<string[] | null | undefined> // string[]
```

### <a name="ReturnType"></a> ReturnType<T>:

```typescript
declare function f1(): {a: number, b: string}
// создает тип состоящий из возвращемого функцией типа
type T0 = ReturnType<() => string> // string
type T1 = ReturnType<(s: string) => void> // void
type T2 = ReturnType<(<T>() => T)> // {} (тк дженерик тип по дефолту {})
type T3 = ReturnType<(<T extends X, X extends number[]>() => T)> // number[]
type T4 = ReturnType<typeof f1> // {a: number, b: string}
type T5 = ReturnType<any> // any
type T6 = ReturnType<never> // any
type T7 = ReturnType<string> // Error
type T8 = ReturnType<Function> // Error
```

### <a name="InstanceType"></a> ReturnType InstanceType<T>:

```typescript
class C {
   x = 0
   y = 0
}
// создает тип состоящий из типа экземпляра функции конструктора:
type T0 = InstanceType<typeof C> // C
type T1 = InstanceType<any> // any
type T1 = InstanceType<never> // any 
type T1 = InstanceType<string> // Error 
type T1 = InstanceType<Function> // Error
```

### <a name="CLASS"></a> CLASS:

```typescript
interface IClock {
	time: Date, // тип Date
	setTime(date: Date): void
	info: () => string
}

class Clock implements IClock { // interface + class
	time: Date = new Date()
	readonly static version = '1.01'

	setTime(date: Date): void {
		this.time = date
	}

	info(): string {
		return `Version: ${Clock.version}`
	}
}
```

```typescript
class Client<T, K extends Number> {
	constructor(public nickname: T, public age: K) {} // сокращенная запись (модификатор обязателен)

	set clientAge(age: K) { // setter
		this.age = age
	}
}
```

### <a name="ABSTRACT_CLASS"></a> ABSTRACT CLASS:

```typescript
abstract class Component {
	constructor(public name: string) {}

	abstract render(): void

	abstract info(): void
}

class AppComponent extends Component {
	render(): void {
		console.log('Component on render')
	}

	info(): void {
		console.log('This is info')
	}
}
```

### <a name="GENERIC"></a> GENERIC:

```typescript
const words2: string[] = ['Hello', 'Typescript'] // массив строк
const words: Array<string> = ['Hello', 'Typescript'] // массив строк

const getter = <T>(data: T): T => data

getter<Number>(1) // тип Number — это такой же аргумент, как и 1. Он подставляется везде вместо T.
```

```typescript
const reverse = <T>(array: T[]): T[] => array.reverse()
```

```typescript
const mergeObjects = <T extends object, R extends object>(a: T, b: R): T & R => {
	return Object.assign({}, a, b)
} // T & R - не обязательный TS понимает и без указания на это

const merged = mergeObjects({ name: 'Maxim' }, { age: 26 })
```

```typescript
interface ILength {
	length: number
}

const withCount = <T extends ILength>(value: T): {value: T, count: string} => {
	return {
		value,
		count: `В этом объекте ${value.length} символов`
	}
} // <T extends ILength> - передаваемый объект должен иметь свойство length
```

```typescript
const getObjectValue = <T extends object, R extends keyof T>(obj: T, key: R) => {
	return obj[key]
} // keyof T - ключи объекта T

const person = {
	name: 'Max',
	age: 26
}

console.log(getObjectValue(person, 'name')) // отработает
console.log(getObjectValue(person, 'age')) // отработает
console.log(getObjectValue(person, 'job')) // ошибка
```

```typescript
type Student = {
	name: string
	age: number
	hasScar: boolean
}

const students: Student[] = [
	{name: "Harry", age: 17, hasScar: true},
	{name: "Ron", age: 17, hasScar: false},
	{name: "Hermione", age: 16, hasScar: false}
]

const getBy = <T, P extends keyof T>(model: T[], prop: P, value: T[P]): T | null => {
	return model.filter(item => item[prop] === value)[0] || null
}

const result = getBy(students, "name", "Harry")
```

```typescript
const promise2: Promise<string> = new Promise(resolve => {
	setTimeout(() => {
		resolve('Promise resolved!')
	})
})

promise.then(data => {
	console.log(data.toUpperCase())
})
```

```typescript
class Collection<T extends number | string> {
	constructor(private _items: T[] = []) {}

	add(item: T) {
		this._items.push(item)
	}

	remove(item: T) {
		this._items = this._items.filter(i => i !== item)
	}

	get items(): T[] {
		return this._items
	}
}

const strings = new Collection<string>(['I', 'am', 'strings'])
strings.add('!')
strings.remove('Am')
strings.items // ['I', 'strings', '!']

const numbers = new Collection<number>([1, 2, 3])
numbers.add(2)
numbers.remove(3)
numbers.items // [1, 2, 2]
```

### <a name="INFER_TYPE"></a> INFER TYPE:

```typescript
type Nullable<T> = null | T

const initial = {
    age: 10,
    name: "Max",
    user: null as Nullable<UserType>,
    photo: null as Nullable<PhotoType>
}

type StateType = typeof initial // создает тип на основании initial
//type ActionsTypes = ReturnType<typeof AgeActionCreator> | ReturnType<typeof FullNameActionCreator>
type ActionsTypes = ActionReturnType<typeof AgeActionCreator> | ActionReturnType<typeof FullNameActionCreator>
type ActionReturnType<T> = T extends (...args: any[]) => infer R ? R : any
// (...args: any[]) => infer R - тип функция
// возвращаемый тип проанализировать и записать в R если это функция, иначе any

const reducer = (state: StateType = initial, action: ActionsTypes) => {
    switch (action.type) {
        case "SET-AGE":
            return {...state, age: action.age}
        case "SET-NAMES":
            return {...state, firstName: action.firstName, lastName: action.lastName}
    }

    return state
}

const AgeActionCreator = (age: number) => ({type: "SET-AGE", age} as const)
const FullNameActionCreator = (firstName, lastName) => ({type: "SET-NAMES", firstName, lastName} as const)


const obj = {
    a: {name: 'Alex'},
    b: {age: 33},
    c: {site: {title: 'ya.ru'}}
}

type objType<T> = T extends {[key: string]: infer U} ? U : never
const someObj: objType<typeof obj> = {age: 18}
```

### <a name="CONDITIONAL_TYPES"></a> CONDITIONAL TYPES:

```typescript
type UserType = {
    firstName: string,
    lastName: string,
    age: number
}

type PhotoType = {
    large: string,
    small: string
}

type ServerResponseType<D> = {
    errorCode: number
    messages: Array<string>,
    data: D
}

const responseWithUser: ServerResponseType<UserType> = {
    errorCode: 1,
    messages: ['it', 'ts'],
    data: {
        firstName: 'Neo',
        lastName: 'Anderson',
        age: 23
    }
}

const responseWithPhoto: ServerResponseType<PhotoType> = {
    errorCode: 1,
    messages: ['it', 'ts'],
    data: {
        large: '1.jpg',
        small: '1.min.jpg'
    }
}

type ConditionalType<T> = T extends 'user' ? UserType : PhotoType

const user: ConditionalType<'user'> = { // можно и <'user' | 'photo' >
    firstName: 'Max',
    lastName: 'Mirrev',
    age: 32
}

const photo: ConditionalType<'photo'> = {
    large: '1.jpg',
    small: '1.min.jpg'
}
```

### <a name="DECORATOR"></a> DECORATOR:

```typescript
const logClass = (constructor: Function) => {
	console.log(constructor) // Result of call: class User {}
	// Если декоратор класса вернет значение - то оно заменит объявление класса с помощью предоставленного конструктора
}

const logProperty = (target: Object, propertyKey: string | symbol) => {
	console.log(propertyKey) // Result of call: "secret"
	// Если декоратор свойства вернет значение - то он будет использоваться для вызова Object.defineProperty(descriptor)
}

const logMethod = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
	console.log(propertyKey) // Result of call: "getPass"
}

const logSet = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
	console.log(propertyKey) // Result of call: "myAge"
}

@logClass // <--- Apply decorator for class
class User {
	@logProperty // <--- Apply decorator for property
	secret: number

	constructor(public name: string, private age: number, secret: number) {
		this.secret = secret
	}

	@logMethod // <--- Apply decorator for method
	public getPass(): string {
		return `${this.name}${this.age}`
	}

	@logSet // <--- Apply decorator for set
	set myAge(age: number) {
		this.age = age
	}
}
```

* Factory Decorator

```typescript
const factory = (value: any) => { // Factory Decorator
	return function (target: any) { // Decorator
		console.log(target) // Decorator logic
	}
}

const enumerable = (value: boolean) => { // applying Factory Decorator
	return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
		descriptor.enumerable = value
	}
}

class User {
	constructor(public name: string, private age: number) {}

	@enumerable(false) // <--- Call decorator factory with argument 
	public getPass(): string {
		return `${this.name}${this.age}`
	}
}
```

* Decorator composition

```typescript
// Decorator composition syntax
// Apply decorations (one line):
@f @g x

// Apply decorations (multiple lines):
@f
@g
x
````

> Выражение для каждого декоратора вычисляется сверху вниз, затем результаты как функции вызываются снизу вверх

```typescript
// Two factory decorations
const first = () => {
	console.log('first() completing')

	return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
	  console.log('first() called')
	}
}
const second = () => {
	console.log('second() completing')

	return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
	  console.log('second() called')
	}
}

class User {
	constructor(public name: string, private age: number) {}

	@first()
	@second()   
	public getPass(): string {
		return `${this.name}${this.age}`
	}
}

// first() completing // Factory 1
// second() completing // Factory 2
// second() called // Decorator 2
// first() called // Decorator 1
```

```typescript
interface ComponentDecorator {
	selector: string,
	template: string
}

function Component(config: ComponentDecorator) {
	return function<T extends {new(...args:any[]): object}>(Constructor: T) {
		return class extends Constructor {
			constructor(...args: any[]) {
				super(...args)

				const el = document.querySelector(config.selector)!
				el.innerHTML = config.template
			}
		}
	}
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
```

```typescript
function Bind(_:any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
	const original = descriptor.value

	return {
		configurable: true,
		enumerable: false,
		get() { // this указывает на инстанс класса
			return original.bind(this)
		}
	}
}

class CarComponent {
	constructor(public name: string) {}

	@Bind
	logName(): void {
		console.log(`Component Name: ${this.name}`)
	}
}

const card = new CarComponent('My Card Component')
const btn = document.querySelector('#btn')!
btn.addEventListener('click', card.logName) // благодаря декоратору @Bind, вместо card.logName.bind(card)
```

```typescript
type ValidatorType = 'required' | 'email'

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

function validate(obj: any): boolean {
	let isValid = true
	const objConfig = validators[obj.constructor.name]

	if (!objConfig) {
		return isValid
	}

	Object.keys(objConfig).forEach(key => {
		if (objConfig[key] === 'required') {
			isValid = isValid && !!obj[key]
		}
	})

	return isValid
}

class Form {
	@Required
	public email: string | void

	constructor(email?: string) {
		this.email = email
	}
}

const form = new Form()
console.log(form)

if (validate(form)) {
	console.log('Valid: ', form)
} else {
	console.log('Validation Error')
}
```

### <a name="NAMESPACE"></a> NAMESPACE:

* FILE: form-namespace.ts:

```typescript
namespace Form { // namespace должны совпадать
	export type FormType = 'inline' | 'block' // экспортируем из namespace
	export type FormState = 'active' | 'disabled'

	export interface FormInfo {
		type: FormType,
		state: FormState
	}
}
```

* FILE: my-form.ts:

```typescript
/// <reference path="form-namespace.ts" />

namespace Form { // namespace должны совпадать
	class MyForm {
		private type: FormType = 'inline'
		private state: FormState = 'active'

		constructor(public email: string) {}

		getInfo(): FormInfo {
			return {
				type: this.type,
				state: this.state
			}
		}
	}

	const myForm = new MyForm('m@m.ru')
}
```

### <a name="SATISFIES"></a> SATISFIES (TS >= 4.9):

```typescript
type RGB = readonly [red: number, green: number, blue: number]
type Color = RGB | string
```
**Old way**:
```typescript
const color: Color = 'red'
color.toUpperCase()
```
**New way**:
```typescript
const color = 'red' satisfies Color
color.toUpperCase() // valid operation as color is a string

const incorrectColor = 100 satisfies Color // throws error

// with const:

const palette = {
	red: [255, 0, 0],
	green: "#00ff00",
	blue: [1,2,3],
} satisfies Record<string, Color>

console.log(palette.green) // green is string

const constantPalette = {
	red: [255, 0, 0],
	green: "#00ff00",
	blue: [1,2,3],
} as const satisfies Record<string, Color>

console.log(constantPalette.green) // green is "#00ff00"
```

