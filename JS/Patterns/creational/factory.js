class SimpleMembership {
	constructor(name) {
		this.name = name;
		this.cost = 50;
	}
}

class StandardMembership {
	constructor(name) {
		this.name = name;
		this.cost = 150;
	}
}

class PremiumMembership {
	constructor(name) {
		this.name = name;
		this.cost = 500;
	}
}

class MemberFactory {
	static list = {
		simple: SimpleMembership,
		standard: StandardMembership,
		premium: PremiumMembership
	};

	create(name, type = 'simple') {
		const Membership = MemberFactory.list[type] || MemberFactory.list.simple;
		const member = new Membership(name);

		// расширяем функционал member:
		member.type = type;
		member.define = function () {
			console.log(`${this.name} (${this.type}): ${this.cost}`);
		};

		return member;
	}
}

const factory = new MemberFactory();
const members = [
	factory.create('Maxim', 'simple'),
	factory.create('Olga', 'premium'),
	factory.create('Petr', 'standard'),
];

console.log(members); // =>
/*
[
    SimpleMembership {
        name: 'Maxim',
        cost: 50,
        type: 'simple',
        define: [Function]
    },
    // ...
]
*/

members.forEach(m => {
	m.define();
}); // =>
/*
Maxim (simple): 50
Olga (premium): 500
Petr (standard): 150
*/



