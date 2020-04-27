import axios from '../../axios/axiosApi'
import { GET_TASK, GET_ALL_TASKS, SET_TASK_ACCEPTED, SET_TASK_COMPLETED, GET_TASK_HISTORY } from '../types'
import { showAndHideMessage } from './app'


export const getTask = id => async dispatch => {
  try {
    const { data: { success, message, relocation } } = await axios.get(`/relocations/${ id }`)

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: GET_TASK,
        payload: relocation
      })
    }

  } catch (e) {
    dispatch(showAndHideMessage('Что-то пошло не так...', false))
  }
}

export const getAllTasks = () => async dispatch => {
  try {
    const response = await axios.get('https://vacancy-dev.erkapharm.com/api/mobile/relocations')
    const { data: { success, message, relocations } } = response

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: GET_ALL_TASKS,
        payload: relocations
      })
    }
  } catch (e) {
    dispatch(showAndHideMessage('Что-то пошло не так...', false))
  }
}

export const setTaskAccepted = id => async dispatch => {
  try {
    const postData = { id, action: "accept" }
    const { data: { success, message } } = await axios.post('/relocations', { postData })

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: SET_TASK_ACCEPTED
      })
    }
  } catch (e) {
    dispatch(showAndHideMessage('Что-то пошло не так...', false))
  }
}

export const setTaskCompleted = (id, storeId, comment) => async dispatch => {
  try {
    const postData = { id, comment, action: "deliver", store_id: storeId }
    const { data: { success, message } } = await axios.post('/relocations', postData)

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: SET_TASK_COMPLETED
      })
    }
  } catch (e) {
    dispatch(showAndHideMessage('Что-то пошло не так...', false))
  }
}

export const getTaskHistory = () => async dispatch => {
  try {
    dispatch({
      type: GET_TASK_HISTORY,
      payload: []
    })
  } catch (e) {
    dispatch(showAndHideMessage('Что-то пошло не так...', false))
  }
}




