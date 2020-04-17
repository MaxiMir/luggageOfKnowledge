import { GET_TASK, SET_TASK_STATUS } from '../types'


export const getTask = documentID => async dispatch => {
  const task = {
    documentNumber: documentID,
    documentDate: '04.03.2020',
    pharmacySender: 'АУ1032 Спб Абрамова 8',
    pharmacyRecipient: 'АУ1003 Спб Гражданский 66',
    products: [
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
    ],
    totalQuantity: 8,
    totalAmount: '3010.08'
  }

  dispatch({
    type: GET_TASK,
    payload: task
  })
}

export const setTaskStatus = status => async dispatch => {
  dispatch({
    type: SET_TASK_STATUS,
    payload: status
  })
}

