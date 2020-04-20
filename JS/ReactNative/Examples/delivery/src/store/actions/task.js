import { GET_TASK, GET_ALL_TASKS, SET_TASK_STATUS } from '../types'

const MOCK_TASK = {
  documentID: '148583',
  documentDate: '4/3/20',
  pharmacySender: 'АУ1032 Спб Абрамова 8',
  pharmacyRecipient: 'АУ1003 Спб Гражданский 66',
  products: [
    {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
    {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
  ],
  totalQuantity: 8,
  totalAmount: '3010.08'
}

export const getTask = documentID => async dispatch => {
  const task = {...MOCK_TASK, documentID}

  setTimeout(() => {
    dispatch({
      type: GET_TASK,
      payload: task
    })
  }, 500)
}

export const getAllTasks = () => async dispatch => {
  setTimeout(() => {
    const task = {...MOCK_TASK }

    dispatch({
      type: GET_ALL_TASKS,
      payload: [ task ]
    })
  }, 500)
}

export const setTaskStatus = status => async dispatch => {
  dispatch({
    type: SET_TASK_STATUS,
    payload: status
  })
}
