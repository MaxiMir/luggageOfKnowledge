import {  SHOW_SUCCESS_MESSAGE, SHOW_ERROR_MESSAGE, CLEAR_MESSAGE } from '../types'


const initialState = {
  message: null,
  isSuccess: false
}

const handlers = {
  [SHOW_SUCCESS_MESSAGE]: (state, { payload }) => ({
    ...state,
    message: payload,
    isSuccess: true
  }),
  [SHOW_ERROR_MESSAGE]: (state, { payload }) => ({
    ...state,
    message: payload,
    isSuccess: false
  }),
  [CLEAR_MESSAGE]: state => ({
    ...state,
    message: null
  }),
  DEFAULT: state => state
}

export const appReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}
