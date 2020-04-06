import {CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING} from '../types'

const handlers = {
  [SEARCH_USERS]: (state, {payload}) => ({...state, users: payload, loading: false}),
  [GET_REPOS]: (state, {payload}) => ({...state, repos: payload, loading: false}),
  [GET_USER]: (state, {payload}) => ({...state, user: payload, loading: false}),
  [SET_LOADING]: state => ({...state, loading: true}),
  [CLEAR_USERS]: state => ({...state, users: []}),
  DEFAULT: state => state
}

export const githubReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
