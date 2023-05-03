const car = {
	wheels: 4,

	init() {
		console.log(`У меня есть ${this.wheels} колеса, мой владелей ${this.owner}`);
	}
};

// создаем копию объекта и добавляем новые свойства:
const carWithOwner = Object.create(car, {
	owner: {
		value: 'Дмитрий'
	}
});

carWithOwner.init(); // => У меня есть 4 колеса, мой владелей Дмитрий
console.log(carWithOwner.__proto__ === car); // ссылка на прототип является объектом car => true
