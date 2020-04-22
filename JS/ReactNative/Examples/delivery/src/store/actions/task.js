import { GET_TASK, GET_ALL_TASKS, SET_TASK_ACCEPTED, SET_TASK_COMPLETED, GET_TASK_HISTORY } from '../types'

const MOCK_TASK = {
  documentID: '148583',
  documentDate: '4/3/20',
  pharmacySender: 'АУ1032 Спб Абрамова 8',
  pharmacyRecipient: 'АУ1003 Спб Гражданский 66',
  products: [
    { id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26' },
    { id: '188', name: 'Лозартан таб. п.п.o 100м№90', quantity: 2, price: '1376.26' },
    { id: '189', name: 'Лозартан таб. п.п.o 100м№90', quantity: 3, price: '5376.26' },
    { id: '184', name: 'Лозартан таб. п.п.o 100м№90', quantity: 4, price: '4376.26' },
    { id: '181', name: 'Лозартан таб. п.п.o 100м№90', quantity: 5, price: '5376.26' },
  ],
  totalQuantity: 8,
  totalAmount: '3010.08'
}

export const getTask = documentID => async dispatch => {
  const task = { ...MOCK_TASK, documentID }

  setTimeout(() => {

    dispatch({
      type: GET_TASK,
      payload: task
    })

  }, 500)
}

export const getAllTasks = () => async dispatch => {
  setTimeout(() => {
    const task = { ...MOCK_TASK, documentID: Date.now().toString() }

    dispatch({
      type: GET_ALL_TASKS,
      payload: [task]
    })

  }, 500)
}

export const setTaskAccepted = () => async dispatch => {
  setTimeout(() => {

    dispatch({
      type: SET_TASK_ACCEPTED
    })

  }, 500)
}

export const setTaskCompleted = () => async dispatch => {
  setTimeout(() => {

    dispatch({
      type: SET_TASK_COMPLETED
    })

  }, 500)
}

export const getTaskHistory = () => async dispatch => {
  setTimeout(() => {

    dispatch({
      type: GET_TASK_HISTORY,
      payload: []
    })

  }, 500)
}




