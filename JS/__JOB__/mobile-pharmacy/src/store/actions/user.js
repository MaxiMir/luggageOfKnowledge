import { AsyncStorage } from 'react-native'

import axios from '../../axios/axios-api'
import { showAndHideMessage } from './app'
import { SET_USER, CLEAR_USER } from '../types'


export const auth = (phone, password) => async dispatch => {
  try {
    const { data: { success, message, user } } = await axios.post('/auth', { phone, password })

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      await saveUserInStorage(user)

      dispatch({
        type: SET_USER,
        payload: user
      })

      setToken(user['api_token'])
      dispatch(showAndHideMessage(message))
    }
  } catch (e) {
    console.error('auth ERROR:', e.message)
  }
}

export const autoLogin = () => async dispatch => {
  try {
    const userData = await AsyncStorage.getItem('_user', null)
    const user = JSON.parse(userData)

    if (user) {
      dispatch({
        type: SET_USER,
        payload: user
      })

      setToken(user['api_token'])
    }
  } catch (e) {
    console.log('autoLogin ERROR: ', e.message)
  }
}

export const saveUserInStorage = async user => {
  try {
    await AsyncStorage.setItem('_user', JSON.stringify(user), null)
  } catch (e) {
    console.log('saveUserInStorage ERROR: ', e.message)
  }
}

export const logout = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('_user', null);
    clearToken()

    dispatch({
      type: CLEAR_USER
    })

    dispatch(showAndHideMessage('Пожалуйста, авторизуйтесь', false))
  } catch (e) {
    console.log('logout ERROR: ', e.message)
  }
}

export const setToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`
}

export const clearToken = () => {
  axios.defaults.headers.common['Authorization'] = false
}
