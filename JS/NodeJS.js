// ##### NODEJS: #####

// + FILE app.js:
import {cons} from "./HJS";

сonsole.log('Hello Node JS');

// $ node app
// => Hello Node JS

// $ npm init -y // генерируем "базовый" package.json + FOLDER node_modules
// $ npm i yargs // устанавливаем пакет для работы с параметрами, поступающими из консоли
// $ npm i chalk // устанавливаем пакет для красивого вывода информации в консоли (флаг -D - зависимость для разработки)



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

const notePath = path.join(__dirname, 'notes.json') // __dirname - системная переменная путь до текущей папки, __filename - системная переменная путь до текущего файла


const getNotes = callback => {
    fs.readFile(notePath, 'utf-8', (error, content) => { // ! рекомендуется всегда использовать асинхронные методы, так как они не блокируют поток + 1 параметр error
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




// #@@@ Примеры работы с базовыми модулями #@@@:

// FILE: path.js:
const path = require('path') // встроенный модуль для работы с путями

path.basename(__filename) // имя файла =>  path.js
path.dirname(__filename) // название директории => /Users/Maxim/WebStormProjects/node-youtube/demo
path.extname(__filename) // расширение файла => .js
path.parse(__filename) // данные о файле
/* =>
Parse: {
    root: '/',
    dir: '/Users/Maxim/WebStormProjects/node-youtube/demo',
    base: 'path.js',
    ext: '.js',
    name: 'path
}
 */
path.parse(__filename).name // обращение по ключу => path
path.join(__dirname, 'server', 'index.html') // генерация пути /Users/Maxim/WebStormProjects/node-youtube/demo/server/index.html



// FILE: fs.js:
const fs = require('fs') // встроенный модуль для работы с файловой системой

fs.mkdir(path.join(__dirname, 'test'), err => { // создаем папку
    if (err) {
        throw err
    }

    console.log('Папка test создана')
})

const filePath = path.join(__dirname, 'test', 'text.txt')

fs.writeFile(filePath, 'Hello,\n NodeJS!', err => { // запись в файл (если файла нет - он будет создан)
    if (err) {
        throw err
    }

    console.log('Папка test создана')
})


fs.appendFile(filePath, 'Hello, NodeJS!\n', err => { // дозаписываем данные в файл
    if (err) {
        throw err
    }

    console.log('Hello again!\n')
})


fs.readFile(filePath, (err, content) => { // читаем файл
    if (err) {
        throw err
    }
    // #1:
    console.log('Содержимое файла:', content) // по умолчанию nodejs считывает в буфер => <Buffer 48 64 6c 6c 6f 20 4e 6f 64 64 4a 53 21 0a 48 ...>

    // #2:
    const data = Buffer.from(content);
    console.log('Содержимое файла:', content)
    /* =>
        Hello, NodeJS
        Hello again!
     */
})
// #3:
fs.readFile(filePath, 'utf-8', (err, content) => { // читаем файл c указанием кодировки
    if (err) {
        throw err
    }

    console.log('Содержимое файла:', content)
    /* =>
        Hello, NodeJS
        Hello again!
     */
})


// FILE: os.js:

const os = require('os')

os.platform() // операционная система => darwin
os.arch() // архитектура процессора => x64
os.cpus() // данные по процессорам => [{model: 'Intel(R) Core(TM) i5-7267U CPU @ 3.10GHz}...]
os.freemem()// свободная память => 69709824
os.totalmem() // доступно памяти => 8589934592
os.homedir() // домашняя директория => /Users/Maxim
os.uptime() // сколько включена система в сек. => 267399



// FILE: events.js:

const EventEmitter = require('events')

// #1:
const emitter = new EventEmitter()

emitter.on('anything', data => { // слушаем событие anything
    console.log('ON: anything', data)
})

emitter.emit('anything', {a: 1}) // эмитим событие anything, 2 параметр данные (конфигурация)

// #2:
class Dispatcher extends EventEmitter {
    subsctibe(eventName, cb) {
        console.log('[Subscribe...]')
        this.on(eventName, cb)
    }

    dispatch(eventName, data) {
        console.log('[Dispatching...]')
        this.emit(eventName, data)
    }
}

const dis = new Dispatcher()

dis.subsctibe('aa', data => { // слушаем события aa
    console.log('ON: aa', data)
})

dis.dispatch('aa', {aa: 22})



// FILE: index.js:
const http = require('http') // встроенный модуль для работы с сервером
const fs = require('fs')
const path = require('path')
let contentType;

switch (ext) {
    case '.css':
        contentType = 'text/css'
        break;
    case '.js':
        contentType = 'text/css'
        break;
    default:
        contentType = 'text/html'
}


const server = http.createServer((req, res) => { // req - данные о запросе клиента, res - ответ сервера


    const urn = req.url
    let templatePath = path.join(__dirname, 'public', urn === '/' ? 'index.html' : urn)
    const ext = path.extname(filePath)

    if (!ext) {
        filepath += '.html'
    }

    fs.readFile(templatePath, (err, content) => {
        if (!err) {
            res.writeHead(200, { // устанавливаем статус ответа + тип контента
                'Content-Type': contentType
            })

            res.end(content)
        } else {
            fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end('Error')
                } else {
                    res.writeHead(200, { // устанавливаем статус ответа + тип контента
                        'Content-Type': 'text/html'
                    })

                    res.end(data) // завершаем ответ сервера и выводим верстку из шаблона
                }
            })
        }
    })
})

const PORT = process.env.PORT || 3000 // считываем порт (по умолчанию 3000)

server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`)
})

// -> localhost:3000 => Hello NodeJS
// В случае изменений: останавливаем сервер: $ нажать Ctrl+C -> Затем заново запускаем: $ node index

// $ npm i nodemon - пакет автоматически перезапускает сервер в случаем изменений

// FILE: package.json:
{
    // ..
    "scripts": {
        "start": "node index.js", // для продакшена
        "dev": "nodemon index.js" // для разработки через nodemon
    },
    // ...
}

// $ npm run dev // запускаем режим разработки

// + FOLDER: public
// FOLDER /public + FILE index.html:
/*
<!doctype html>
<html lang="en">
<head>
	 <meta charset="UTF-8">
	 <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	 <meta http-equiv="X-UA-Compatible" content="ie=edge">
	 <link rel="stylesheet" href="styles.css">
	 <title>Home page</title>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
    </nav>
    <h1>Home page</h1>
</body>
</html>
*/

// FOLDER /public + FILE contact.html:
/*
<!doctype html>
<html lang="en">
<head>
	 <meta charset="UTF-8">
	 <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	 <meta http-equiv="X-UA-Compatible" content="ie=edge">
	 <link rel="stylesheet" href="styles.css">
	 <title>Contact page</title>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
    </nav>
    <h1>Contact page</h1>
</body>
</html>


// FOLDER /public + FILE styles.css:
* {
    margin: 0;
    padding: 0;
}

body {
    backgroound: #000;
}
*/