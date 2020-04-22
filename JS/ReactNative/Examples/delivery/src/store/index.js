import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { appReducer } from './reducers/app'
import { taskReducer } from './reducers/task'
import { addressReducer } from './reducers/address'


const rootReducer = combineReducers({
  app: appReducer,
  task: taskReducer,
  address: addressReducer
})

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
)

