import { createStore, combineReducers } from 'redux'
import { postReducer } from './reducers/post'

const rootReducer = combineReducers({
  post: postReducer
})

export default createStore(rootReducer)
