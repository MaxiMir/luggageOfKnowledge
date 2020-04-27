import axios from '../../axios/axiosApi'
import { GET_ALL_PHARMACIES, GET_ALL_NEAR_PHARMACIES } from '../types'
import { showAndHideMessage } from './app'


export const getAllPharmacies = () => async dispatch => {
  try {
    const { data: { success, message, stores } } = await axios.get('/stores')

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: GET_ALL_PHARMACIES,
        payload: stores
      })
    }
  } catch (e) {
    dispatch(showAndHideMessage('Что-то пошло не так...', false))
  }
}

export const getAllNearPharmacies = coordinate => async dispatch => {
  try {
    const { data: { success, message, stores } } = await axios.post('/stores', coordinate)

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: GET_ALL_NEAR_PHARMACIES,
        payload: stores
      })
    }
  } catch (e) {
    dispatch(showAndHideMessage('Что-то пошло не так...', false))
  }
}


