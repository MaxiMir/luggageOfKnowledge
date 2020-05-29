// @ REFLECT:
class Student {
  constructor(name) {
    this.name = name
  }

  greet() {
    console.log(`Hi! My name is ${this.name}`)
  }
}

class ProtoStudent {
  university = 'Oxford'
}

const student = Reflect.construct(Student, ['Igor']); // создаем инстанс объекта; можно передать 3-й параметр - класс протитотип

Reflect.apply(student.greet, {name: 'Max'}, []); // вызываем метод класса student greet в контексте объекта {name: 'Max'}, 3 параметр аргументы
// => Hi! My name is Max

Reflect.ownKeys(student); // возвращает собственные ключи объекта => ['name']

Reflect.preventExtensions(student); // блокируем модификацию объекта
student.age = 25;
student; // {name: 'Max'}
Reflect.isExtensible(student); // проверяем на доступность для модификации объекта => false
