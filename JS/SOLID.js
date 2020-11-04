/**
@ Модулем мы будем называть какую-то часть кода, обособленную от других. Это может быть класс, функция, объект, файл — в общем, что-то, у чего есть границы, отделяющие этот код от другого.

@ Бизнес-правилами будем называть правила взаимодействия сущностей друг с другом и внешней средой. Под внешней средой будем понимать всё, что влияет на программу извне — пользовательский ввод, события, вызов API и т. д.

@ Причиной изменения будем называть обновление бизнес-правил, которое вынуждает менять код какого-либо модуля.
*/



// @ SINGLE RESPONSIBILITY PRINCIPLE / Принцип единой ответственности:

/**
У модуля должна быть только одна причина для изменения.
Весь код, который меняется по этой причине, должен быть собран в этом модуле.

Проще говоря принцип предлагает нам проводить границы между модулями так, чтобы изменение в бизнес-правилах затрагивало как можно меньше модулей, в идеале — один.

Основной инструмент принципа — объединять те части, которые меняются по одной причине, и разделять те, которые меняются по разным.

-> помогает разбивать и декомпозировать задачи по одной на модуль;
-> уменьшает количество модулей, которые надо изменить при изменении требований;
-> ограничивает влияние изменений, помогая контролировать сложность системы.
*/

class News {
  constructor(title, text) {
    this.title = title
    this.text = text
    this.modified = false
  }

  update(text) {
    this.text = text
    this.modified = true
  }
}

class NewsPrinter { // ответственность - вывод новости в определенном формате
  constructor(news) {
    this.news = news
  }

  html() {
    return `
      <div class="news">
        <h1>${this.news.title}</h1>
        <p>${this.news.text}</p>
      </div>
    `
  }

  json() {
    return JSON.stringify({
      title: this.news.title,
      text: this.news.text,
      modified: this.news.modified
    }, null, 2)
  }

  xml() {
    return `
      <news>
          <title>${this.news.title}</title>
          <text>${this.news.text}</text>
      </news>
    `
  }
}

const printer = new NewsPrinter(
  new News('JS', 'Amazing language!')
)

printer.html()
printer.json()
printer.xml()



// @ OPEN CLOSE PRINCIPLE / Принцип открытости и закрытости:

/**
модули надо проектировать так, чтобы их нельзя было менять, а новая функциональность должна появляться лишь с помощью создания новых сущностей и композиции их со старыми.

-> заставляет проектировать модули так, чтобы они делали только одну вещь и делали её хорошо;
-> побуждает связывать сущности через абстракции (а не реализацию) там, где могут поменяться бизнес-требования;
-> обращает внимание проектировщиков на места стыка и взаимодействие сущностей;
-> позволяет сократить количество кода, который необходимо менять при изменении бизнес-требований;
-> делает внесение изменений безопасным и относительно дешёвым.
*/

class Shape {
  area() {
    throw new Error('Area method should be implemented')
  }
}

class Square extends Shape {
  constructor(size) {
    super()
    this.size = size
  }

  area() {
    return this.size ** 2
  }
}

class Circle extends Shape {
  constructor(radius) {
    super()
    this.radius = radius
  }

  area() {
    return (this.radius ** 2) * Math.PI
  }
}

class Rect extends Shape {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
  }

  area() {
    return this.width * this.height
  }
}

class AreaCalculator {
  constructor(shapes = []) {
    this.shapes = shapes
  }

  sum() {
    return this.shapes.reduce((acc, spape) => {
      acc += this.shapes.area()
      return acc
    }, 0)
  }
}

const calc = new AreaCalculator([
  new Square(10),
  new Circle(1),
  new Rect(10, 20)
])



// @ LISKOV SUBSTITUTION PRINCIPLE / Принцип подстановки Барбары Лисков:

/**
классы-наследники не должны противоречить базовому классу. Например, они не могут предоставлять интерфейс ýже базового.
Поведение наследников должно быть ожидаемым для функций, которые используют базовый класс.

-> помогает проектировать систему, опираясь на поведение модулей;
-> вводит ограничения и правила наследования объектов, чтобы их потомки не противоречили базовому поведению;
-> делает поведение модулей последовательным и предсказуемым;
-> помогает избегать дублирования, выделять общую для нескольких модулей функциональность в общий интерфейс;
-> позволяет выявлять при проектировании проблемные абстракции и скрытые связи между сущностями.
*/

class Person {

}

class Member extends Person { // участник текущей компании
  access() {
    console.log('У тебя есть доступ')
  }
}

class Guest extends Person {
  isGuest = true
}

class Frontend extends Member {
  canCreateFrontend() {}
}

class Backend extends Member {
  canCreateBackend() {}
}

class PersonFromDifferentCompany extends Guest {
  access() {
    throw new Error('У тебя нет доступа!')
  }
}

function openSecretDoor(member) {
  member.access()
}

openSecretDoor(new Frontend())
openSecretDoor(new Backend())
// openSecretDoor(new PersonFromDifferentCompany()) // There should be member!


// #2:

class Component {

}

class ComponentWithTemplate extends Component {
  render() {
    return '<div>Component</div>'
  }
}

class HigherOrderComponent extends Component {

}

class HeaderComponent extends ComponentWithTemplate {
  onInit() {}
}

class FooterComponent extends ComponentWithTemplate {
  afterInit() {}
}

class HOC extends HigherOrderComponent {
  render() {
    throw new Error('Render is impossible here')
  }

  wrapComponent(component) {
    component.wrapped = true
    return component
  }
}

function renderComponent(component) {
  component.render()
}

renderComponent(new HeaderComponent())
renderComponent(new FooterComponent())



// @ INTERFACE SEGREGATION PRINCIPLE / Принцип разделения интерфейса:

/**
помогает проектировать интерфейсы так, чтобы изменения затрагивали только те модули, на функциональность которых они действительно влияют.
Чаще всего это заставляет интерфейсы дробить (разделять).

-> помогает бороться с наследованием или реализацией ненужной функциональности;
-> даёт возможность спроектировать модули так, чтобы их затрагивали изменения только тех интерфейсов, которые они действительно реализуют;
-> снижает сцепление модулей;
-> уничтожает наследование ради наследования, поощряет использование композиции;
-> позволяет выявлять более высокие абстракции и находить неочевидные связи между сущностями.
*/

class Animal {
  constructor(name) {
    this.name = name
  }
}

const swimmer = {
  swim() {
    console.log(`${this.name} умеет плавать`)
  }
}

const flyer = {
  fly() {
    console.log(`${this.name} умеет летать`)
  }
}

const walker = {
  walk() {
    console.log(`${this.name} умеет ходить`)
  }
}

class Dog extends Animal {}
class Eagle extends Animal {}
class Whale extends Animal {}

Object.assign(Dog.prototype, swimmer, walker)
Object.assign(Eagle.prototype, flyer, swimmer)
Object.assign(Whale.prototype, swimmer)



// @ DEPENDENCY INVERSION PRINCIPLE / Принцип инверсии зависимостей:

/**
Низкоуровневые содержат утилитарную функциональность: обращение к БД, запросы к серверу, рендеринг DOM-элементов на странице.

Высокоуровневые содержат сложную, более абстрактную бизнес-логику.
Они достаточно абстрактны, чтобы их можно было переиспользовать в разных проектах: авторизация пользователей, валидация форм, отправка уведомлений.

Высокоуровневые модули не должны зависеть от низкоуровневых; оба типа должны зависеть от абстракций.
Абстракции не должны зависеть от деталей, детали должны зависеть от абстракций.

-> вводит правила и ограничения для зависимости одних модулей от других;
-> снижает сцепление (степень взаимозависимости разных модулей) модулей;
-> делает тестирование модулей проще;
-> позволяет проектировать систему так, чтобы модули были заменяемы на другие.
 */

class Fetch {
  request(url) {
    return fetch(url).then(r = r.json())
  }
}

class FetchClient {
  constructor() {
    this.fetch = new Fetch()
  }

  clientGet() {
    return this.getData.request('vk.com')
  }
}

class LocalStorage {
  get() {
    return LocalStorage.get('vk.com')
  }
}

class LocalStorageClient {
  constructor() {
    this.localStorage = new LocalStorage()
  }

  clientGet() {
    return this.localStorage.get()
  }
}

class Database {
  constructor(client) {
    this.client = client
  }

  getData() {
    return this.client.clientGet()
  }
}

const db = new Database(new FetchClient)
db.getData()

