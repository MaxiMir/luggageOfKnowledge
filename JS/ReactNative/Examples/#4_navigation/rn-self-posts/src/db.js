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
}

// подлючаем в bootstrap.js
