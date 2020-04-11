import {
  ADD_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  UPDATE_TODO,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS
} from '../types';

const handlers = { // (state, action)
  [ADD_TODO]: (state, { id, title }) => ({
    ...state,
    todos: [ ...state.todos, { id, title } ]
  }),
  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  }),
  [UPDATE_TODO]: (state, { title, id }) => ({
    ...state,
    todos: state.todos.map(todo => {
      if (todo.id === id) {
        todo.title = title
      }

      return todo
    })
  }),
  [SHOW_LOADER]: state => ({
    ...state,
    loading: true
  }),
  [HIDE_LOADER]: state => ({
    ...state,
    loading: true
  }),
  [CLEAR_ERROR]: state => ({
    ...state,
    error: null
  }),
  [SHOW_ERROR]: (state, { error }) => ({
    ...state,
      error
  }),
  [FETCH_TODOS]: (state, { todos }) => ({
    ...state,
    todos
  }),
  DEFAULT: state => state
}


export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}

// название файла с маленькой буквы, тк в нем не хранится реакт компонент
