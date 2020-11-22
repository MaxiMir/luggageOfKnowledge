## PROTOTYPE

```js
const Animal = function(options) {
    this.name = options.name
    this.color = options.color

    // this.voice = function() {
    //     console.log('Base voice from', this.name)
    // }
}

Animal.prototype.voice = function() {
    console.log('Base voice from', this.name)
}

const dog = new Animal({name: 'Rex', color: '#fff'})
dog.voice()

const Cat = function(options) {
    Animal.apply(this, arguments)
    this.hasTail = options.hasTail
}

const cat = new Cat({name: 'Boris', color: '#000', hasTail: true})
cat.voice() // -> TypeError: cat.voice is not a function

Cat.prototype = Object.create(Animal.prototype) // наследование от прототипа Animal
Cat.prototype.constructor = Cat // поскольку сделали переопределение прототипа выше, указываем явно конструктор
cat.voice() // Base voice from Boris

Animal.prototype.voice = function() { // переопределение метода базового класса
    console.log('This sound goes from:', this.name)
}

Animal.prototype.voice = function() { // переопределение метода дочернего класса
    Animal.prototype.voice.apply(this, arguments) // вызов родительского метода
    console.log(this.name + ' says myay')
}
```
```js
const maxiMir = {
    name: "Maxim",
    age: 25,
    greet: () => {
        console.log('Greet');
    }
};

maxiMir.sayHello(); // => Uncaught TypeError

Object.prototype.sayHello = () => {
    console.log('Hello!');
};

// цепочка наследования - объект __proto__
maxiMir.sayHello(); // => Hello!
```