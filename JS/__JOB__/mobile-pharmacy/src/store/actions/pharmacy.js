import { GET_ALL_PHARMACIES } from '../types';
import { showAndHideMessage } from './app';
import axios from '../../axios/axios-api';


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

