import axios from '../../axios/axios-api'
import { GET_TASK, GET_ALL_TASKS, SET_TASK_ACCEPTED, SET_TASK_COMPLETED, GET_TASK_HISTORY } from '../types'
import { showAndHideMessage } from './app'


export const getTask = id => async dispatch => {
  try {
    const { data: { success, message, order } } = await axios.get(`/${id}`)

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: GET_TASK,
        payload: order
      })
    }

  } catch (e) {

  }
}

export const getAllTasks = () => async dispatch => {
  try {
    const { data: { success, message, orders } } = await axios.get('/')

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: GET_ALL_TASKS,
        payload: orders
      })
    }
  } catch (e) {

  }
}

export const setTaskAccepted = () => async dispatch => {

  dispatch({
    type: SET_TASK_ACCEPTED
  })
}

export const setTaskCompleted = (id, userID) => async dispatch => {

  dispatch({
    type: SET_TASK_COMPLETED
  })
}

export const getTaskHistory = () => async dispatch => {

  dispatch({
    type: GET_TASK_HISTORY,
    payload: []
  })
}




