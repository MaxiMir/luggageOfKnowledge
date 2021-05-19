const Sequelize = require('sequelize')

const DB_NAME = 'node-todo' // Schema
const USER_NAME = 'root'
const PASSWORD = '12345678'

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
	host: 'localhost',
	dialect: 'mysql' // СУБД
})

module.exports = sequelize
