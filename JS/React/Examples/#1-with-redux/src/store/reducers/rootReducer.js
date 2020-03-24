import {combineReducers} from 'redux'
import quizReducer from './quiz'
import createReducer from './create'
import authReducer from './auth'

export default combineReducers({ // объединяем все reducers
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer
})


// импортирует все reducers
