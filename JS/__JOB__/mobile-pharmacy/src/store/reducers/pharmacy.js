import { GET_ALL_PHARMACIES, GET_ALL_NEAR_PHARMACIES, CLEAR_ALL_NEAR_PHARMACIES } from '../types'

const initialState = {
  all: null,
  near: null
}

const handlers = {
  [GET_ALL_PHARMACIES]: (state, { payload }) => ({
    ...state,
    all: payload
  }),
  [GET_ALL_NEAR_PHARMACIES]: (state, { payload }) => ({
    ...state,
    near: payload
  }),
  [CLEAR_ALL_NEAR_PHARMACIES]: state => ({
    ...state,
    near: null
  }),
  DEFAULT: state => state
}

export const pharmacyReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}
