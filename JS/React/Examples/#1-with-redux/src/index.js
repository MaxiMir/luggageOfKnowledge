import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

import {createStore, compose, applyMiddleware} from 'redux' // compose для REDUX DEVTOOLS
import {Provider} from 'react-redux' // импорт Provider из react-redux
import rootReducer from './store/reducers/rootReducer' // reducer для store
import thunk from 'redux-thunk'

// Для REDUX DEVTOOLS:
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;


const store = createStore( // создание store
  rootReducer, // передаем reducer
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const app = (
  <Provider store={store}> // оборачиваем приложение + передаем store
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
