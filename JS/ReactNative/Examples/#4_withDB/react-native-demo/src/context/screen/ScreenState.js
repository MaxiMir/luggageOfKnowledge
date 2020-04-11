import React, { useReducer } from 'react'
import { ScreenContext } from './screenContext'
import { screenReducer } from './screenReducer'
import { CHANGE_SCREEN } from '../types';

export const ScreenState = ({ children }) => {
  const [state, dispatch] = useReducer(screenReducer, null)

  const changeScreen = id => dispatch({ type: CHANGE_SCREEN, payload: id })

  return (
    <ScreenContext.Provider value={{
      todoId: state,
      changeScreen
    }}>
      {children}
    </ScreenContext.Provider>
  )
}

// передаем в ScreenContext.Provider todoId и changeScreen
// в ScreenState оборачиваем приложение в App.js
