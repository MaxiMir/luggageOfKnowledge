class User {
	constructor(name) {
		this.name = name;
		this.room = null;
	}

	send(message, to) {
		this.room.send(message, this, to);
	}

	receive(message, from) {
		console.log(`${from.name} => ${this.name}: ${message}`);
	}
}

class ChatRoom {
	constructor() {
		this.users = {};
	}

	register(user) {
		this.users[user.name] = user;
		user.room = this;
	}

	send(message, from, to) {
		if (to) {
			to.receive(message, from);
		} else {
			Object.keys(this.users).forEach(key => {
				if (this.users[key] !== from) { // оптправляем всем пользователям кроме текущего
					this.users[key].receive(message, from);
				}
			});
		}
	}
}

const maxim = new User('Maxim');
const julia = new User('Julia');
const johny = new User('Johny');

const room = new ChatRoom();

room.register(maxim);
room.register(julia);
room.register(johny);

maxim.send('Hi!', julia); // Maxim => Julia: Hi!
julia.send('Salute Max!', maxim); // Julia => Maxim: Salute Max!
johny.send('Hi all!!!'); // =>
// Johny => Maxim: Hi all!!!
// Johny => Julia: Hi!
