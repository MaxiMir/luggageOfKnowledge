import { GET_ALL_ADDRESSES } from '../types';

const MOCK_ADDRESSES = [
  {
    code: 'АУ1032',
    address: 'Спб Абрамова 8',
    brand: 'Столички',
    operationMode: '10-18 ежедневно',
    phone: '8800-888-88-22'
  },
  {
    code: 'АУ1033',
    address: 'Спб Маргелова 4',
    brand: 'Столички',
    operationMode: '10-18 ежедневно',
    phone: '8800-888-88-33'
  },
  {
    code: 'АУ1035',
    address: 'Спб Абрамова 12',
    brand: 'Столички',
    operationMode: '10-18 ежедневно',
    phone: '8800-888-88-44'
  },
  {
    code: 'АУ1129',
    address: 'Спб Абрамова 15',
    brand: 'Столички',
    operationMode: '10-18 ежедневно',
    phone: '8800-888-88-55'
  },
  {
    code: 'АУ9587',
    address: 'Спб Абрамова 98',
    brand: 'Столички',
    operationMode: '10-18 ежедневно',
    phone: '8800-888-88-66'
  },

]

export const getAllAddresses = () => async dispatch => {
  setTimeout(() => {

    dispatch({
      type: GET_ALL_ADDRESSES,
      payload: MOCK_ADDRESSES
    })

  }, 500)
}

