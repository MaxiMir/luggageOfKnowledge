import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types';

const handlers = { // (state, action)
  [ADD_TODO]: (state, { title }) => ({
    ...state,
    todos: [
      ...state.todos ,
      {
        id: Date.now().toString(),
        title: title
      }
    ]
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
  DEFAULT: state => state
}


export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT

  return handler(state, action)
}

// название файла с маленькой буквы, тк в нем не хранится реакт компонент
