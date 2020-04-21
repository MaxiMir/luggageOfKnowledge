import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { appReducer } from './reducers/app'
import { taskReducer } from './reducers/task'


const rootReducer = combineReducers({
  app: appReducer,
  task: taskReducer,
})

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
)

