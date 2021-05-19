class Employee {
	constructor(name, salary) {
		this.name = name;
		this.salay = salary;
	}

	work() {
		return `${this} выполняет ${this.responsibilities()}`;
	}

	getPaid() {
		return `${this.name} имеет ЗП ${this.salay}`;
	}
}

class Developer extends Employee {
	constructor(name, salary) {
		super(name, salary);
	}

	responsibilities() {
		return 'процесс создания программ'
	}
}


class Tester extends Employee {
	constructor(name, salary) {
		super(name, salary);
	}

	responsibilities() {
		return 'процесс тестирования';
	}
}

const dev = new Developer('Max', 100000);
console.log(dev.getPaid()); // Max имеет ЗП 100000
console.log(dev.responsibilities()); // процесс создания программ
const tester = new Tester('Julia', 90000);
console.log(tester.getPaid()); // Julia имеет ЗП 90000
console.log(dev.responsibilities()); // процесс тестирования
