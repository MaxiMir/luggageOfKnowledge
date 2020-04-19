import { GET_SHIPPING_ADDRESSES } from '../types';
import { hideLoaderWithMessage, showLoaderWithMessage } from './app';

export const getShippingAddresses = () => async dispatch => {
  const shippingAddresses = [
    'АУ 1003 СПб Гражданский 66',
    'АУ 1004 СПб Гражданский 76',
    'АУ 1005 СПб Гражданский 86',
    'АУ 1006 СПб Гражданский 96',
    'АУ 1007 СПб Гражданский 16',
    'АУ 1008 СПб Гражданский 26',
    'АУ 1009 СПб Гражданский 36',
    'АУ 1010 СПб Гражданский 46',
    'АУ 1011 СПб Гражданский 56',
  ]

  dispatch(showLoaderWithMessage('Получаю список адресов...'))

  dispatch({
    type: GET_SHIPPING_ADDRESSES,
    payload: shippingAddresses
  })

  dispatch(hideLoaderWithMessage())
}
