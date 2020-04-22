import { GET_ALL_PHARMACIES } from '../types'

const initialState = {
  all: null
}

const handlers = {
  [GET_ALL_PHARMACIES]: (state, {payload}) => ({
    ...state,
    all: payload
  }),
  DEFAULT: state => state
}

export const pharmacyReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}
