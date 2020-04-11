import React, { useContext, useReducer } from 'react'
import { Alert } from 'react-native'

import { ScreenContext } from '../screen/screenContext'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types'


export const TodoState = ({ children }) => {
  const initialState = {
    todos: [
      { id: '1', title: 'Выучить React Native'}
    ]
  }

  const { changeScreen } = useContext(ScreenContext) // можем использоватеть, тк TodoState вложен в ScreenState
  const [state, dispatch] = useReducer(todoReducer, initialState)

  // state - текущий state
  // dispatch - ф-я позволяющая меняеть state через reducer

  const addTodo = title => dispatch({ type: ADD_TODO, title })

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)

    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel', // iOS
        },
        {
          text: 'Удалить',
          style: 'destructive', // iOS
          onPress: () => {
            changeScreen(null) // для редиректа на главную
            dispatch({ type: REMOVE_TODO, id })
          }
        },
      ],
      { cancelable: false }, // false - по клику по overlay модальное окно не закрывается
    )
  }

  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

// передаем в TodoContext.Provider todos и функции для дальнейшего использования
// в TodoState оборачиваем приложение в App.js
