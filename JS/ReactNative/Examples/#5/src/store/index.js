import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { taskReducer } from './reducers/task'

const rootReducer = combineReducers({
  task: taskReducer,
})

export default createStore(rootReducer, applyMiddleware(thunk))
