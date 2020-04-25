import { GET_ALL_TASKS, GET_TASK, SET_TASK_ACCEPTED, SET_TASK_COMPLETED, GET_TASK_HISTORY } from '../types'

const initialState = {
  current: null,
  accepted: null,
  completed: null,
}

const handlers = {
  [GET_TASK]: (state, { payload }) => ({
    ...state,
    current: payload
  }),
  [GET_ALL_TASKS]: (state, { payload }) => ({
    ...state,
    accepted: payload
  }),
  [SET_TASK_ACCEPTED]: state => ({
    ...state,
    current: null,
    accepted: !state.accepted ? null : [...state.accepted, state.current]
  }),
  [SET_TASK_COMPLETED]: state => ({
    ...state,
    current: null,
    accepted: !state.accepted ? null : state.accepted.filter(task => task.id !== state.current.id),
    completed: !state.completed ? null : [...state.completed, state.current]
  }),
  [GET_TASK_HISTORY]: (state, { payload }) => ({
    ...state,
    completed: payload
  }),
  DEFAULT: state => state
}

export const taskReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}
