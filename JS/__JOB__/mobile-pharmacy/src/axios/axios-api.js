import axios from 'axios'


let instance = axios.create({
  baseURL: 'https://vacancy-dev.erkapharm.com/api/mobile/',
  headers: {
    'Content-Type': 'application/json'
  }
})

const onFulfilledCb = response => {
  const { data: { success, message } } = response

  //

  return response
}

const onReject = error => {

  //

  return Promise.reject(error)
}

instance.interceptors.response.use(onFulfilledCb, onReject)

export default instance
