### let && var:

```swift
var variable = "initial"
variable = "changed"

let constant = "ummutable"
```

### Int:
```swift
let int = 10 // Int

Int.min // -9223372036854775808
Int.max // 9223372036854775807

UInt.min // 0
UInt.max // 18446744073709551615

Int8.min // -128
Int8.max // 127

UInt8.min // 0
UInt8.max // 255

Int16.min // -32768
Int16.max // 32767

UInt16.min // 0
UInt16.max // 65535

Int32.min // -2147483648
Int32.max // 2147483647

UInt32.min // 0
UInt32.max // 4294967295

Int64.min // -9223372036854775808
Int64.max // 9223372036854775807

UInt64.min // 0
UInt64.max // 18446744073709551615

let double = 5.45 // Double - до 15 знаков после .
let float: Float = 5.43 // Float - до 6 знаков после .
let number = Int(double) // 5 - to Int
let numberPrepared = Float(number) // 5 - to Float
```

### String:
```swift
let hey = "Hello" // String
let name = "Max"
let heyMax = hey + name // concatination
print("Say \(heyMax)") // interpolation
```

### Condition:
```swift
let areYouHappy = true

if areYouHappy {
    print("Yep")
}
```

### Тернарный оператор:
```swift
areYouHappy ? print("🥰") : print("🤬")
```

### Switch:
```swift
let weather = "sunny"

switch weather {
case "rain": print("🌧")
case "snow": print("❄️")
fallthrough // skip break
case "sunny": print("🌞")
default: print("Enjoy your day!")
}
```

### Оператор замкнутого/закрытого диапазона (a...b), полузамкнутого/полузакрытого диапазона (a..<b):
```swift
let myAge = 30

switch myAge {
case 0...10: print("young")
case 13..<20: print("teenager")
case 20...60: print("grown man")
default: print("How old are you")
}
```

### Циклы:

```swift
let count = 1...10

for number in count {
    print("Number is \(number)")
}

for _ in 1...5 { // without variable
    print("Hey! 😎")
}

var countPrints = 0

while countPrints <= 20 {
    print(countPrints)
    countPrints += 1
}

repeat {
    print(countPrints)
    countPrints += 1
} while countPrints <= 20
```

### Tuple (Составные типы данных) - для временного хранения данных:

```swift
let tuple = (name: "Max", age: 30, developer: true)
tuple.name // Max
tuple.age // 30
```
```swift
let a = 10
let b = "Hello"
let tuple = (a, b)
```
```swift
let tuple = (10, "Swift")
```
```swift
let tuple: (Int, String)
tuple = (45, "Swift")
tuple.0 // 45
tuple.1 // Swift
```
```swift
let (weight, height) = (75, 170)
```
```swift
var point1 = (x: 4, y: 3)
let point2 = (x: 2, y: 6)
point1 = point2 // формат и типы данных должны быть одинаковыми
```

### Опциональные типы данных:

```swift
var age: Int? = 12 // 12 || nil

// let preparedAge = Int(age)! // force unwrapping - не использовать
```

### Optional binding:

```swift
let yearOfBirth = "1988ERROR!"

if let safeYearOfBirth = Int(yearOfBirth) {
    print("Optional binding value: \(safeYearOfBirth)")
}

if age == nil {} // condition

let emptyString: String? = "" // опциональная строка

print(emptyString ?? "not empty string") // ?? отработает если значение не nil
```

### Неявно извлеченный опционал (вначале nil, затем гарантированно значение):

```swift
var someNumber: Int! = number

if true {
    someNumber = 77
}
```

### Коллекции Массив (Array) - упорядоченные коллеции значений:

```swift
let array = Array<String>() // полная форма записи
```
```swift
let array = [String]() // краткая и предпочтительная
```
```swift
let apple = "apple"
let orange = "orange"
let fruits = [apple, orange]
```
```swift
var vegatables = ["tomato", "garlik"]
vegatables.count // 2
vegatables.isEmpty // false
vegatables.append("milk") // insert to end
vegatables[1] // garlik - get by index
vegatables[1] = "salt" // change by index
vegatables.insert("sugar", at: 0) // insert by index

for value in vegatables { // перебор
    print(value)
}

for (index, value) in vegatables.enumerated() { // перебор через enumerated()
    print("Index \(index) | Value: \(value)")
}
```
```swift
let nums1 = [1, 2, 3]
let nums = [4, 5]
var mergedNumbers = nums1 + nums // array concat
mergedNumbers += [6] // array concat
```

### Множество (Set) - неупорядоченная коллекция уникальных значений:

```swift
let set = Set<String>()
```
```swift
var set: Set = ["football", "bowling", "tennis", "running"] // порядок всегда рандомный
set.count // 4
set.isEmpty // false
set.contains("football") // проверка! При большом кол-ве элементов быстрее отрабатывает Set
set.insert("hockey")

for type in set.sorted() { // сортируем по алфавиту
    print(type)
}
```
```swift
let color = Set(["red", "green", "blue"]) // set из массива
```
```swift
let oddNumbers: Set = [1, 3, 5, 7, 9]
let evenNumbers: Set = [0, 2, 4, 6, 8]
let primeNumbers: Set = [2, 3, 5, 7]

oddNumbers.union(evenNumbers).sorted() // объединение множества -> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
oddNumbers.intersection(evenNumbers).sorted() // пересечение множеств -> []
oddNumbers.subtracting(primeNumbers).sorted() // множество значений, которые не принадлежат второму множеству [1, 9]
oddNumbers.symmetricDifference(primeNumbers).sorted() // множество из значений, которые не повторяются в 2-х множествах -> [1, 2, 9]
```

### Словарь (Dictionary):

```swift
let dictionary = [Int: String]()
```
```swift
let dictionary = ["Max": 1.75, "Maria": 1.92]
dictionary["Max"] // 1.75
```
```swift
var distionary = ["Mathematics": 100, "English": 85]
distionary.count // 2
distionary.isEmpty // false
distionary["History"] = 80 // add
distionary["English"] = 90 // change
distionary.updateValue(70, forKey: "History") // update or insert
distionary.removeValue(forKey: "History") // remove

for (key, point) in distionary {
    print("Key: \(key), Value: \(point)")
}

for key in distionary.keys {
    print("Key: \(key)")
}

for value in distionary.values {
    print("Value: \(value)")
}

let key = Array(distionary.keys) // get keys array
```

### Функции:

```swift
func square(number: Int) -> Int {
    return number * number // если выражение можно без return
}

let result = square(number: 7) // 49
```
```swift
func getUser() -> [String: String] {
    ["first": "Max", "second": "Minchenko"]
}

let user = getUser()
user["first"]
```
```swift
func getUser() -> (first: String, second: String) {
    (first: "Max", second: "Minchenko")
}

let (first, second) = getUser()
```
```swift
func sayHello(to name: String) { // to внешнее имя, name - локальное имя параметра
    print("Hello \(name)!")
}

sayHello(to: "Max")
```
```swift
func sayHello(_ name: String) { // пропуск имени параметра параметра
    print("Hello \(name)!")
}

sayHello("Max")
```
```swift
func sayHello(_ name: String, nicely: Bool = true) { // параметр по умолчанию
    if (nicely) {
        print("Hello \(name)!")
        return
    }
    
    print("Oh no, it's \(name) again!")
}
```

### Вариативные фунции и вариативные параметры:

```swift
func printNumbers(numbers: Int...) { // вариативные параметры
    for number in numbers {
        print(number)
    }
}

printNumbers(numbers: 1, 2, 3)
```

### Сквозные параметры:

```swift
func doubleIt(number: inout Int) {
    number *= 2
}

var inoutNumber = 10
doubleIt(number: &inoutNumber) // лучше избегать inout

print(inoutNumber) // 20
```

### Клоужеры:

```swift
let driving = {
    print("I'm driving in my car")
}

driving() // -> I'm driving in my car

func driving(place: String) -> String { // обычная функция
    "I'm going to \(place) in my car"
}

let drivingWithClosure = {(place: String) -> String in // closure
    "I'm going to \(place) in my car"
}

let message = drivingWithClosure("London") // -> I'm going to London in my car

let payment = {(user: String) -> Bool in
    return !user.isEmpty
}

let goToCar = {
    print("I'm going to my car")
}

func travel(action: () -> Void) {
    print("I'm getting ready to go")
    action()
    print("I'm arrived")
}

travel(action: goToCar) // ->
/*
 I'm getting ready to go
 I'm going to my car
 I'm arrived
*/

// <->

travel() { // передача сразу клоужера, только если последний параметр клоужер
    print("I'm going to my car")
}

travel { // если у функции только один параметр клоужер
    print("I'm going to my car")
}

func animate(duration: Double, animations: () -> Void) {
    print("Starting a \(duration) second animation")
    animations()
}

animate(duration: 3) {
    print("Image")
}
```
```swift
func travel(action: (String) -> String) {
    print("I'm getting ready to go")
    let description = action("London")
    print(description)
    print("I arrived!")
}

travel { place in // тк клоужер уже описан в travel
    "I'm going to \(place) im my car"
}

// <-> еще сокращеннее:

travel {
    "I'm going to \($0) im my car" // доступ к параметрам по индексу
}
```
```swift
func getTravel() -> (String) -> Void { // возвращаем клоужер
    var counter = 0

    return {
        counter += 1
        print("Count: \(counter).I'm going to \($0)")
    }
}

let travel = getTravel()
travel("London")
```

### Перечиления:
```swift
enum Result {
    case success
    case failure, failed
}

var result = Result.success
result = .failed // меняем значение
```
```swift
let result: Result
result = .success
```

```swift
enum Activity {
    case dancing
    case running
    case talking
    case singing
}

let currentActivity = Activity.dancing

switch currentActivity { // нужно перечислить все case из enum
case .dancing: print("Dance")
case .running: print("Run")
case .singing: print("Song")
case .talking: print("Talk")
}

```

```swift
enum Activity {
    case dancing
    case running(destionation: String) // ассоциативное значение
    case talking(topic: String)
    case singing(volume: Int)
}

let currentActivity = Activity.dancing

switch currentActivity {
case .dancing: print("Dance")
case .running: print("Run")
case .singing: print("Song")
case .talking: print("Talk")
}

let talking = Activity.talking(topic: "Swift 🔥") // -> talking(topic: "Swift 🔥")
```

```swift
enum Planet: Int { // чистое значение перечисления через индексы
    case mercury
    case venus
    case earth
    case mars = 10 // задать свой индекс
}

let earth = Planet(rawValue: 2) // -> earth
```
```swift
enum Phone: String { // чистое значение перечисления через строку
    case Apple = "iPhone 13"
    case Samsung = "Galaxy S10"
}

let myPhone = Phone.Apple // Apple
myPhone.rawValue // -> iPhone 13
```

### Классы:

```swift
class Human { // с изначальными значениями
    var name = "Max"
    var age = 30

    
    func sayHey() {
        print("Hey. I'm \(name)")
    }
}

let max = Human()
max.name // -> Max
max.sayHey()
```

```swift
class Human {
    var name: String // stored property
    var age: Int
    var isQualified: Bool
    var status: String { // computed property (геттер)
        isQualified ? "\(name) is qualifies for this job" : "\(name) isn't qualifies for this job"
    }

    func sayHey() {
        print("Hey. I'm \(name)")
    }
    
    init(name: String, age: Int, isQualified: Bool) { // инициализируем экземпляр класса
        self.name = name
        self.age = age
        self.isQualified = isQualified
    }
}

let max = Human(name: "Max", age: 30, isQualified: true)
max.status // -> Max is qualifies for this job
```
```swift 
class Account {
    var sum: Double { // сумма вклада
        // property observers:
        willSet(newSum) { // перед установкой нового значения
            print("Previous sum: \(self.sum) / New sum: \(newSum)")
        }
        
        didSet(oldSum) { // после установки нового значения
            print("Sum increased by: \(self.sum - oldSum)")
        }
    }
    var rate: Double = 0.01 // процентная ставки
    
    var profit: Double {
        get {
            sum + sum * rate
        }

        set {
            self.sum = newValue / (1 + rate)
        }
    }
    
    init(sum: Double, rate: Double) {
        self.sum = sum
        self.rate = rate
    }
}

var myAcc: Account = Account(sum: 1000, rate: 0.1)
myAcc.profit // getter -> 1100.0

// ожидаемая прибыль:
myAcc.profit = 2000 // setter
myAcc.sum // -> 1818.1818
```

**Экземпляры классов передаются по ссылке!**


### Структуры:

```swift
struct Human {
    var name: String
    var age: Int
}

var human = Human(name: "Max", age: 30)
human.age = 25 // можно мутировать, если задано через var
```

**value type** - Int, String, Bool, structure
**reference type** - enum, class

**Экземпляры структур не передаются по ссылке, а просто копируются!**
