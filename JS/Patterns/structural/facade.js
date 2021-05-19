// Пример фасада - jQuery

class Complaints {
	constructor() {
		this.complaints = [];
	}

	reply(complaint) {
	}

	add(complaint) {
		this.complaints.push(complaint);

		return this.reply(complaint);
	}
}

class ProductComplaints extends Complaints {
	reply({id, customer, details}) {
		return `Product: ${id}: ${customer} (${details})`;
	}
}

class ServiceComplaints extends Complaints {
	reply({id, customer, details}) {
		return `Service: ${id}: ${customer} (${details})`;
	}
}

class ComplaintRegistry { // класс фасад
	register(customer, type, details) {
		let complaint;
		const id = Date.now();

		if (type === 'service') {
			complaint = new ServiceComplaints();
		} else {
			complaint = new ProductComplaints();
		}

		return complaint.add({id, customer, details});
	}
}


const registry = new ComplaintRegistry();
console.log(registry.register('Maxim', 'service', 'недоступен')); // => Service: 1567497706372: Maxim (недоступен)
console.log(registry.register('Elena', 'product', 'выпадает ошибка')); // => Service: 1567497706399: Elena (выпадает ошибка)

