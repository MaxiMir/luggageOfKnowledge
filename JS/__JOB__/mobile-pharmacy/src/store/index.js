import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { appReducer } from './reducers/app'
import { taskReducer } from './reducers/task'
import { pharmacyReducer } from './reducers/pharmacy'


const rootReducer = combineReducers({
  app: appReducer,
  task: taskReducer,
  pharmacy: pharmacyReducer
})

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
)

