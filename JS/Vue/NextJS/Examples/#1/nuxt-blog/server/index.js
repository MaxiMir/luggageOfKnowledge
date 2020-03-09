const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = require('./app')


const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(nuxt.render)

  app.listen(port, host, () => { // переносим в коллбэк consola:
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
}

start()
