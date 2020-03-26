// @ SINGLE RESPONSIBILITY PRINCIPLE:

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



// @ OPEN CLOSE PRINCIPLE:

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



// @ LISKOV SUBSTITUTION PRINCIPLE:

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



// @ INTERFACE SEGREGATION PRINCIPLE:

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



// @ DEPENDENCY INVERSION PRINCIPLE:

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

