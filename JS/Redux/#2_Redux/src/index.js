import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

import { rootReducer } from './redux/rootReducer'
import { decrement, increment, asyncIncrement, changeTheme } from './redux/actions'
import './styles.css'


const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')


// function logger(state) {
//   return function (next) {
//     return function (action) {
//       console.log('State:', state)
//       console.log('Action:', action)
//
//       return next(action)
//     }
//   }
// }


const store = createStore(
  rootReducer,
  composeWithDevTools( // compose with redux devtools
    applyMiddleware(thunk, logger), // передаем middleware`s
  )
)

addBtn.addEventListener('click', () => {
  store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
  store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light') ?
    'dark'
    :
    'light'
  store.dispatch(changeTheme(newTheme))
})


store.subscribe(() => {
  const state = store.getState()

  counter.textContent = state.counter
  document.body.className = state.theme.value;

  [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
    btn.disabled = state.theme.disabled
  })
})

store.dispatch({ type: 'INIT_APPLICATION'})
