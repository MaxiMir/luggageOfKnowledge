import { combineReducers } from 'redux'
import { ASYNC_INCREMENT, CHANGE_THEME, DECREMENT, DISABLE_BUTTONS, ENABLE_BUTTONS, INCREMENT } from './types';

const initialCounterState = 0

function counterReducer(state = initialCounterState, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    case ASYNC_INCREMENT:
      return state + 1
  }

  return state
}

const initialThemeState = {
  value: 'light',
  disabled: false
}

function themeReducer(state = initialThemeState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {...state, value: action.payload}
    case ENABLE_BUTTONS:
      return {...state, disabled: false}
    case DISABLE_BUTTONS:
      return {...state, disabled: true}
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer
})
