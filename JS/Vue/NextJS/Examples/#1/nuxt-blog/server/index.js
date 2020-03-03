const express = require('express')
const consola = require('consola')
const {Nuxt, Builder} = require('nuxt')
const app = require('./app')


const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }


  app.use(nuxt.render)

  // переносим в коллбэк consola:
  app.listen(port, host, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
}

start()
