import { SHOW_LOADER, HIDE_LOADER, SHOW_LOADER_WITH_MESSAGE, HIDE_LOADER_WITH_MESSAGE } from '../types';


const initialState = {
  loading: true,
  error: null,
  message: null
}

const handlers = {
  [SHOW_LOADER]: state => ({
    ...state,
    loading: true
  }),
  [HIDE_LOADER]: state => ({
    ...state,
    loading: false
  }),
  [SHOW_LOADER_WITH_MESSAGE]: (state, action) => ({
    ...state,
    message: action.payload,
    loading: true
  }),
  [HIDE_LOADER_WITH_MESSAGE]: state => ({
    ...state,
    message: null,
    loading: false
  }),
  DEFAULT: state => state
}

export const appReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}
