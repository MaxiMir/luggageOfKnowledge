const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const todo = sequelize.define('Todo', { // создание модели
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false, // не может быть null
		type: Sequelize.INTEGER // тип
	},
	done: {
		type: Sequelize.BOOLEAN, // тип
		allowNull: false
	},
	title: {
		type: Sequelize.STRING, // тип
		allowNull: false
	}
})

module.exports = todo
