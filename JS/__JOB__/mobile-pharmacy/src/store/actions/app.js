import { SHOW_SUCCESS_MESSAGE, SHOW_ERROR_MESSAGE, CLEAR_MESSAGE } from '../types';


export const showAndHideMessage = (message, isSuccess = true, showTimeMs = 3000) => async dispatch => {
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
