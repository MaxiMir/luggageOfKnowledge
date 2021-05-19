const fs = require('fs') // file system
const path = require('path')

const notesDir = path.join(__dirname, 'notes')
fs.mkdir(notesDir, err => { // создание папки; 1 параметр в cb всегда ошибка
	if (err) {
		throw new Error(err) // обработка ошибки
		// <-> throw err
	}

	console.log('Папка создана')
})

const noteFile = path.join(__dirname, 'notes', 'mynotes.txt')
fs.writeFile( // создание и запись в файл
	noteFile,
	'Hello world',
	err => {
		if (err) {
			throw new Error(err) // обработка ошибки
		}

		console.log('Файл был создан')
	}
)

fs.appendFile( // вставка данных в конец файла
	noteFile,
	' From append file',
	err => {
		if (err) {
			throw new Error(err) // обработка ошибки
		}

		console.log('Файл был изменен')


		fs.readFile( // чтение файла
			noteFile,
			'utf-8', // # кодировка
			(err, data) => {
				if (err) {
					throw new Error(err) // обработка ошибки
				}

				console.log(data) // если передана #кодировка
				// если не передана:
				console.log(Buffer.from(data).toString()) // преведение полученных данных через буффер к строке
			}
		)
	}
)


fs.rename( // переименование файла
	noteFile,
	path.join(__dirname, 'notes', 'notes.txt'),
	err => {
		if (err) {
			throw err
		}

		console.log('Файл был переименован')
	}
)


// рекомендуется вызывать асинхронные функции, так как они не блокируют поток
