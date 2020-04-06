import React from 'react'
import {render} from 'react-dom'
import AppService from './modules/app.service'
import {config} from './modules/config'
import App from './App'
import './modules/ts.module'
import './css/index.css'
import './less/index.less'
import './scss/index.scss'

console.log('Config key:', config.key)

const service = new AppService('Hello world!')
service.log()

render(<App />, document.getElementById('app')) 