import axios from '../../axios/axiosApi'
import { showAndHideMessage } from './app'
import { responseUserErrorHandler } from './user'
import { GET_ALL_PHARMACIES, GET_ALL_NEAR_PHARMACIES } from '../types'


export const getAllPharmacies = () => async dispatch => {
  try {
    const { success, message, stores } = await axios.get('/stores')

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: GET_ALL_PHARMACIES,
        payload: stores
      })
    }
  } catch (e) {
    dispatch(responseUserErrorHandler(e))
  }
}

export const getAllNearPharmacies = coordinate => async dispatch => {
  try {
    const { success, message, stores } = await axios.post('/stores', coordinate)

    if (!success) {
      dispatch(showAndHideMessage(message, false))
    } else {
      dispatch({
        type: GET_ALL_NEAR_PHARMACIES,
        payload: stores
      })
    }
  } catch (e) {
    dispatch(responseUserErrorHandler(e))
  }
}
