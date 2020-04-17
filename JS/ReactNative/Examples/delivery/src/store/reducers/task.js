import { GET_TASK, SET_TASK_STATUS } from '../types'

const initialState = {
  current: null,
  loading: true,
  error: null,
  all: null,
}

const handlers = {
  [GET_TASK]: (state , action) => ({
    ...state,
    current: action.payload,
    loading: false
  }),
  [SET_TASK_STATUS]: (state, action) => {
    const { current } = state

    current.status = action.payload

    return {
      ...state,
      current: current,
      loading: false
    }
  },
  DEFAULT: state => state
}

export const taskReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}
