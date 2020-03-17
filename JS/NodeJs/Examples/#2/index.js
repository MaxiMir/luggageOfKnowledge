// Название этого файла должно совпадать с entry point в package.json

const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {

    res.writeHead(200, { // статус ответа - 200
      'Content-Type': 'text/html; charset=utf-8'
    })

    let templateName;

    if (req.url === '/') {
      templateName = 'index.html'
    }

    if (req.url === '/about') {
      templateName = 'about.html'
    }

    if (templateName) {
      fs.readFile(
        path.join(__dirname, 'views', templateName),
        'utf-8',
        (err, content) => {
          if (err) {
            throw err
          }

          res.end(content)
        }
      )
    }

  } else if (req.method === 'POST') {
    const body = []

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    req.on('data', data => { // так как является наследником EventEmitter
      body.push(Buffer.from(data)) // добавляем обработанный буффер
    })

    res.on('end', () => {
      const message = body.toString().split('=')[1]

      res.end(`
        <h1>Ваше сообщение: ${message}</h1>
      `)
    })
  }
})

server.listen(3000, () => {
  console.log('Server is running')
})
