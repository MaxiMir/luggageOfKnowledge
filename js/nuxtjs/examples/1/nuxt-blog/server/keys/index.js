if (process.env.NODE_ENV === 'production') { // определяем режим разработки
  module.exports = require('./keys.prod')
} else {
  module.exports = require('./keys.dev')
}
