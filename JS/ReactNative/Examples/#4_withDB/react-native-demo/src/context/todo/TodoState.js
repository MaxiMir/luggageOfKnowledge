import React, { useContext, useReducer } from 'react'
import { Alert } from 'react-native'

import { ScreenContext } from '../screen/screenContext'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import { ADD_TODO, CLEAR_ERROR, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from '../types'


export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }

  const { changeScreen } = useContext(ScreenContext) // можем использоватеть, тк TodoState вложен в ScreenState
  const [state, dispatch] = useReducer(todoReducer, initialState)

  // state - текущий state
  // dispatch - ф-я позволяющая меняеть state через reducer

  const addTodo = async title => {
    const response = await fetch('https://react-native-demo-9c073.firebaseio.com/todos.json', { // .json - тк работаем c протоколом http | todos - коллекция
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title })
    })
    const { name: id } = await response.json() // в name содержится id записи

    dispatch({ type: ADD_TODO, title, id })
  }

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

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const hideLoader = () => dispatch({ type: HIDE_LOADER })

  const showError = error => dispatch({ type: SHOW_ERROR, error })

  const clearError = () => dispatch({ type: CLEAR_ERROR })

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
