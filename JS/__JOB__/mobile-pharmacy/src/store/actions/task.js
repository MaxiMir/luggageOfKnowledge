import axios from '../../axios/axiosApi'
import { showAndHideMessage } from './app'
import { responseUserErrorHandler}  from './user'
import { GET_TASK, GET_ALL_TASKS, SET_TASK_ACCEPTED, SET_TASK_COMPLETED, GET_TASK_HISTORY } from '../types'


export const getTask = id => async dispatch => {
  try {
    const { success, message, relocation } = await axios.get(`/relocations/${ id }`)

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: GET_TASK,
        payload: relocation
      })
    }
  } catch (e) {
    dispatch(responseUserErrorHandler(e))
  }
}

export const getAllTasks = () => async dispatch => {
  try {
    const { success, message, relocations } = await axios.get('/relocations')

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: GET_ALL_TASKS,
        payload: relocations
      })
    }
  } catch (e) {
    dispatch(responseUserErrorHandler(e))
  }
}

export const setTaskAccepted = id => async dispatch => {
  try {
    const postData = { id, action: "accept" }
    const { success, message } = await axios.post('/relocations', { postData })

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: SET_TASK_ACCEPTED
      })
    }
  } catch (e) {
    dispatch(responseUserErrorHandler(e))
  }
}

export const setTaskCompleted = (id, storeId, comment) => async dispatch => {
  try {
    const postData = { id, comment, action: "deliver", store_id: storeId }
    const { success, message } = await axios.post('/relocations', postData)

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: SET_TASK_COMPLETED
      })
    }
  } catch (e) {
    dispatch(responseUserErrorHandler(e))
  }
}

export const getTaskHistory = () => async dispatch => {
  try {
    dispatch({
      type: GET_TASK_HISTORY,
      payload: []
    })
  } catch (e) {
    dispatch(responseUserErrorHandler(e))
  }
}
