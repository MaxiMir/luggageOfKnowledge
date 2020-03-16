const user = {
  name: 'Elena',
  age: 25
}

module.exports = { // экпортируем данные
  user,
  sayHello() {
    console.log('Hello')
  }
}
