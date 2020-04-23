import { CLEAR_USER, SET_USER } from '../types'
import { AsyncStorage } from 'react-native'

const initialState = {
  user: null,
  isAuthenticated: false
}

const handlers = {
  [SET_USER]: (state, { payload }) => {
    return {
      ...state,
      user: payload,
      isAuthenticated: true
    }
  },
  [CLEAR_USER]: state => ({
    ...state,
    user: null,
    isAuthenticated: false
  }),
  DEFAULT: state => state
}

export const userReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}
