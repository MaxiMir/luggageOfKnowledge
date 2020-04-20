import { GET_ALL_TASKS, GET_TASK, SET_TASK_STATUS } from '../types'
import { TASK_STATUS } from '../../consts';

const initialState = {
  current: null,
  all: null,
  completed: [],
}

const handlers = {
  [GET_TASK]: (state , { payload }) => ({
    ...state,
    current: payload
  }),
  [GET_ALL_TASKS]: (state, { payload }) => ({
    ...state,
    all: payload
  }),
  [SET_TASK_STATUS]: (state, { payload }) => {
    switch (payload) {
      case TASK_STATUS.ACCEPTED:
        return {
          ...state,
          current: null,
          all: !state.all ? null : [...state.all, state.current]
        }
      default:
        return { ...state }
    }
  },
  DEFAULT: state => state
}

export const taskReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}
