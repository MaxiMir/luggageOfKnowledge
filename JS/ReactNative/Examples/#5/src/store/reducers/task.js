import { GET_TASK } from '../types';

const initialState = {
  info: null,
  loading: true
}


const handlers = {
  [GET_TASK]: (state , action) => ({
    ...state,
    info: action.payload,
    loading: false
  }),
  DEFAULT: state => state
}

export const taskReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}
