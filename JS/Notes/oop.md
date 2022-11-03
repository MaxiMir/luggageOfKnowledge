# ООП #

```js
class Animal {
  static type = 'ANIMAL'

  constructor(options) {
    this.name = options.name
    this.age = options.age
    this.hasTail = options.hasTail
  }

  voice() {
    console.log('I am animal')
  }
}

const animal = new Animal({
  name: 'Animal',
  age: 5,
  hasTail: true
})

Animal.voice() // => 'I am animal'

animal.type // ! => undefined
Animal.type // ! => ANIMAL

class Cat extends Animal {
  static type = 'CAT'

  constructor(options) {
    super(options)
    this.color = options.color
  }

  voice() {
    super.voice()
    console.log('I am cat')
  }

  get ageInfo() { // геттер
    return this.age * 7
  }

  set ageInfo(newAge) { // сеттер
    this.age = newAge
  }
}

const cat = new Cat({
  name: 'Cat',
  age: 7,
  hasTail: true,
  color: 'black'
})

Cat.type // => CAT
cat.voice() // => I am animal \n I am cat
cat.ageInfo // => 49
cat.ageInfo = 8 // => 49
cat.ageInfo // => 56
```

#### Private Class Fields ####

```js
class Person {
  name = 'unknown name'
  #year = 1993 // приватное поле
  static type = 'HUMAN'
  static #area = 'EARTH' // приватное статическое поле

  constructor(name) {
    this.name = name
  }

  get age() { // геттеры/сеттеры тоже могут быть приватными
    return new Date().getFullYear() - this.#year
  }

  set age(age) {
    if (age > 0) {
      this.#year = new Date().getFullYear() - age
    }
  }

  static printArea() {
    return Person.#area === "EARTH" ? 'Земля' : 'Марс'
  }
}
```

#### EXAMPLE: ####

```js
class Component {
  constructor(selector) {
    this.$el = document.querySelector(selector)
  }

  hide() {
    this.$el.style.display = 'none'
  }

  show() {
    this.$el.style.display = 'block'
  }
}

class Box extends Component {
  constructor(options) {
    super(options.selector)

    this.$el.style.width = this.$el.style.heighth = options.size + 'px'
    this.$el.style.background = options.color
  }
}

class Circle extends Box {
  constructor(options) {
    super(options)

    this.$el.style.borderRadius = '50%'
  }
}

const box1 = new Box({
  selector: '#box1',
  size: 100,
  color: 'red'
})

const box2 = new Box({
  selector: '#box2',
  size: 130,
  color: 'blue'
})

const circle = new Circle({
  selector: '#circle',
  size: 90,
  color: 'green'
})

box1.hide() // cкрываем элемент box1
box1.show() // показываем элемент box1

box2.hide() // cкрываем элемент box2
box2.show() // показываем элемент box2
```
