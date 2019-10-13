// ##### NODEJS: #####

// + FILE app.js:
сonsole.log('Hello Node JS');

// $ node app
// => Hello Node JS

// $ npm init -y // генерируем "базовый" package.json + FOLDER node_modules
// $ npm install yargs // устанавливаем пакет для работы с параметрами, поступающими из консоли
// $ npm install chalk // устанавливаем пакет для красивого вывода информации в консоли


// FILE app.js:
сonsole.log(process.argv); // process.argv - массив, содержащий аргументы командной cтроки

// $ node app
/* =>
[
    'usr/local/bin/node', // путь до ядра nodejs
    'Users/maxim/Documents/projects/node-practics/app' // путь до текущего исполняемого файла
]
*/

// $ node app test-param test-param2
/* =>
[
    'usr/local/bin/node',
    'Users/maxim/Documents/projects/node-practics/app',
    'test-param', // переданный параметр
    'test-param2' // переданный параметр
]
*/


// FILE app.js:
const yargs = require('yargs') // подключаем библиотеку
const pkg = require('./package.json') // подключаем JSON файл
const yargs = require('./notes') // подключаем модуль

yargs.version(pkg.version) // указываем версию приложения

yargs.command({ // регистрация команды
    command: 'add',
    describe: 'Добавить новую заметку',
    builder: { // принимаемые параметры
        title: {
            type: 'string',
            demandOption: true, // параметр необходим для работы данной комманды
            describe: 'Название заметки'
        },
        text: {
            type: 'string',
            demandOption: true,
            describe: 'Текст заметки'
        }
    },
    handler({title, text}) { // сallback функция, которая будет вызвана при этой команде
        addNote(title, text)
    }
})

yargs.command({
    command: 'list',
    describe: 'Показать список заметок',
    handler() {
        listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Показывает контент выбранной заметки',
    handler() {

    }
})

yargs.command({
    command: 'remove',
    describe: 'Удаляет заметку',
    handler() {

    }
})

yargs.parse()

// $ node app --help // => информация о приложении
/*
app [command]

Команды:
    app add Добавить новую заметку
    app list Показать список заметок
    app read Показывает контент выбранной заметки
    app remove Удаляет заметку

Опции:
    --help Показать помощь [булев тип]
    --version Показать номер версии [булев тип]
    --title Название заметки    [строковый тип] [необходимо]
    --text Текст заметки    [строковый тип] [необходимо]
*/


// $ node app --version // => 1.0.0 (если не указан yargs.version берет из package.json)



// + FILE notes.js:
const chalk = require('chalk');
const fs = require('fs') // встроенный модуль для работы с файловой системой
const path = require('path') // встроенный модуль для работы с путями

const notePath = path.join(__dirname, 'notes.json') // __dirname - системная переменная путь до текущей папки


const getNotes = callback => {
    fs.readFile(notePath, 'utf-8', (error, content) => { // ! рекомендуется всегда использовать асинхронные методы
        if (error) {
            throw new Error(error)
        }

        try {
            callback(JSON.parse(content)) // парсим строку
        } catch (e) {
            callback([])
        }
    })
}

const saveNotes = content => {
    fs.writeFile(notePath, JSON.stringify(content), err => {
        if (err) {
            throw new Error(err)
        }
    })
}

const addNote = (title, text) => {
    getNotes(notes => {
        const isDublicateNote = notes.find(note => note.title === title)

        if (isDublicateNote) {
            console.log(chalk.red.inverse('Заметка с таким названием уже существует'))
        } else {
            notes.push({title, text})
            saveNotes(notes)
            console.log(chalk.green.inverse('Заметка добавлена'))
        }
    })
}

const listNotes = () => {
    getNotes(notes => {
        if (notes.length) {
            console.log(chalk.inverse('Ваши заметки:'))
            notes.forEach(note => {
                console.log(note.title)
            })
        } else {
            console.log(chalk.blue('Заметок пока нет. Добавьте первую'))
        }
    })
}


module.exports = { // экспортируем модуль
    addNote,
    listNotes
}

// + FILE notes.json:
[]

// $ node app add --text="Стать true программистом" --title="Миссия #1" // запускаем команду + передаем параметры
// => Заметка добавлена
// $ node app add --text="Стать true программистом" --title="Миссия #1" // => Заметка с таким названием уже существует

