import { BIND_TASK, GET_ALL_TASKS, GET_TASK, SET_TASK_STATUS } from '../types'

const initialState = {
  current: null,
  all: [],
}

const handlers = {
  [GET_TASK]: (state , { payload }) => ({
    ...state,
    current: payload
  }),
  [GET_ALL_TASKS]: (state, { payload }) => ({
    ...state,
    all: [...state.all, ...payload]
  }),
  [SET_TASK_STATUS]: (state, { payload }) => {
    const { current } = state

    current.status = payload

    return {
      ...state,
      current: current,
    }
  },
  [BIND_TASK]: (state, { payload }) => ({
    ...state,
    all: [...state.all, payload]
  }),
  DEFAULT: state => state
}

export const taskReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}
