import axios from '../../axios/axios-api'
import { GET_TASK, GET_ALL_TASKS, SET_TASK_ACCEPTED, SET_TASK_COMPLETED, GET_TASK_HISTORY } from '../types'
import { showAndHideMessage } from './app'
import { TASK_STATUS } from '../../consts';


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
    const { data: { success, message, relocations } } = await axios.get('/relocations')

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

export const setTaskStatus = (id, status, comment = null) => async dispatch => {
  try {
    const statusMap = {
      [TASK_STATUS.ACCEPTED]: "accept",
      [TASK_STATUS.COMPLETED]: "deliver",
    }

    const action = statusMap[status]
    const postData = !comment ? { id, action } : { id, action, comment }

    const { data: { success, message } } = await axios.post('/relocations', postData)

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: status
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




