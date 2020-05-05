import { SHOW_SUCCESS_MESSAGE, SHOW_ERROR_MESSAGE, CLEAR_MESSAGE } from '../types'
import { SETTINGS } from '../../consts'


export const showAndHideMessage = (message, isSuccess = true, showTimeMs = SETTINGS.SHOW_MESSAGE_TIME_MS) => async dispatch => {
  dispatch(showMessage(message, isSuccess))

  setTimeout(() => {
    dispatch(clearMessage())
  }, showTimeMs)
}

export const showMessage = (message, isSuccess) => {
  const type = isSuccess ? SHOW_SUCCESS_MESSAGE : SHOW_ERROR_MESSAGE

  return {
    type,
    payload: message
  }
}

export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE
  }
}
