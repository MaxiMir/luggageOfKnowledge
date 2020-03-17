const EventEmitter = require('events')


class Logger extends EventEmitter {
  log(message) {
    this.emit('message', `${message} ${Date.now()}`) // 1-й параметр, название события, которое хотим заэмиттить
  }
}

const logger = new Logger()
logger.on('message', data => { // добавляем прослушку события message
  console.log(DataTransferItem)
})

logger.log('Hello')

// -> Hello 1555398762536
