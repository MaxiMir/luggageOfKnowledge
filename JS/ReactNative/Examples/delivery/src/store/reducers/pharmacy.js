import { GET_ALL_ADDRESSES } from '../types';

const initialState = {
  all: null
}

const handlers = {
  [GET_ALL_ADDRESSES]: (state, {payload}) => ({
    ...state,
    all: payload
  }),
  DEFAULT: state => state
}

export const addressReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}
