import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('post.db') // название БД

export class DB {
	static init() {
		return new Promise((resolve, reject) => {
			db.transaction(tx => {
				tx.executeSql(
					'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT NOT NULL, data TEXT, booked INT)',
					[],
					resolve, // что вызываем в случае успешной инициализации
					(_, error) => reject(error)
				)
			})
		})
	}

	static getPosts() {
		return new Promise((resolve, reject) => {
			db.transaction(tx => {
				tx.executeSql(
					'SELECT * FROM posts',
					[],
					(_, result) => resolve(result.rows._array), // result.rows._array - результат выборки
					(_, error) => reject(error)
				)
			})
		})
	}

	static createPost({text, date, img}) {
		return new Promise((resolve, reject) => {
			db.transaction(tx => {
				tx.executeSql(
					`INSERT INTO posts (text, date, booked, img) VALUES (?, ?, ?, ?)`,
					[text, date, 0, img], // для защиты
					(_, result) => resolve(result.insertId),
					(_, error) => reject(error)
				)
			})
		})
	}

	static updatePost(post) {
		return new Promise((resolve, reject) => {
			db.transaction(tx => {
				tx.executeSql(
					'UPDATE posts SET booked = ? WHERE id = ?',
					[post.booked ? 0 : 1, post.id],
					resolve,
					(_, error) => reject(error)
				)
			})
		})
	}

	static removePost(id) {
		return new Promise((resolve, reject) => {
			db.transaction(tx => {
				tx.executeSql(
					'DELETE FROM posts WHERE id = ?',
					[id],
					resolve,
					(_, error) => reject(error)
				)
			})
		})
	}
}

// подлючаем в bootstrap.js
