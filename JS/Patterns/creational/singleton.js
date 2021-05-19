class Database {
	constructor(data) {
		if (Database.exists) {
			return Database.instance;
		}

		Database.instance = this;
		Database.exists = true;
		this.data = data;
	}

	getData() {
		return this.data;
	}
}

const mongo = new Database('MongoDB');
console.log(mongo.getData()); // => MongoDB

const mysql = new Database('MYSQL');
console.log(mysql.getData()); // ! => MongoDB
