import { GET_TASK, GET_ALL_TASKS, BIND_TASK, SET_TASK_STATUS } from '../types'
import { hideLoaderWithMessage, showLoaderWithMessage } from './app';

const MOCK_TASK = {
  documentNumber: '324sd463ex43',
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


export const getTask = documentID => async dispatch => {

  dispatch(showLoaderWithMessage(`Получаю данные по заказу №\n${documentID}`))

  dispatch({
    type: GET_TASK,
    payload: MOCK_TASK
  })

}

export const getAllTasks = () => async dispatch => {
  // const response = await fetch('https://vacancy-dev.erkapharm.com/api/mobile', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ivrm58MKt0pJUmypCK7wV0NVatJWCOTLBbQWVnEXUSxYyx9iFQWqP3h4461Y'
  //   }
  // })
  //
  // const json = await response.json()
  //
  // console.log(json)

  dispatch({
    type: GET_ALL_TASKS,
    payload: [
      MOCK_TASK,
      MOCK_TASK,
      MOCK_TASK
    ]
  })

}

export const bindTaskToUser = (userID, task) => async dispatch => {
  dispatch({
    type: BIND_TASK,
    payload: task
  })
}

export const setTaskStatus = (documentID, status) => async dispatch => {
  dispatch({
    type: SET_TASK_STATUS,
    payload: status
  })
}

