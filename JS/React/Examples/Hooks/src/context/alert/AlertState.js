import React, {useReducer} from 'react'
import {AlertContext} from './alertContext'
import {alertReducer} from './alertReducer'
import {HIDE_ALERT, SHOW_ALERT} from '../types'

export const AlertState = ({children}) => {
  const [state, dispatch] = useReducer(alertReducer, null) // хук useReducer, 2-й параметр - начальное значение | dispatch - изменение state

  const hide = () => dispatch({type: HIDE_ALERT}) // функция меняет state | передаем в AlertContext.Provider

  const show = (text, type = 'secondary') => { // функция меняет state | передаем в AlertContext.Provider
    dispatch({
      type: SHOW_ALERT,
      payload: {type, text}
    })
  }

  return (
    // AlertContext.Provider - компонент провайдит контекст в дочерние компоненты
    <AlertContext.Provider value={{
      hide, show, alert: state
    }}>
      {children}
    </AlertContext.Provider>
  )
}
