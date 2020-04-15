import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { postReducer } from './reducers/post'


const rootReducer = combineReducers({
  post: postReducer
})

export default createStore(rootReducer, applyMiddleware(thunk)) // передаем thunk
