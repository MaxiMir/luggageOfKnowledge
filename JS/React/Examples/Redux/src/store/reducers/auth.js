import {AUTH_LOGOUT, AUTH_SUCCESS} from '../actions/actionTypes';

const initialState = {
  token: null
}


export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, token: action.token
      }
    case AUTH_LOGOUT:
      return {
        ...state, token: null
      }
    default:
      return state
  }
}