import { GET_SHIPPING_ADDRESSES } from '../types';

const initialState = {
  shippingAddresses: null
}

const handlers = {
  [GET_SHIPPING_ADDRESSES]: (state , action) => ({
    ...state,
    shippingAddresses: action.payload,
    loading: false
  }),
  DEFAULT: state => state
}

export const addressReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}



