import axios from 'axios'


let instance = axios.create({
  baseURL: 'https://vacancy-dev.erkapharm.com/api/mobile/',
  headers: {
    'Content-Type': 'application/json'
  }
})


instance.interceptors.request.use(request => {
    //console.log('REQUEST url', request.url)
    //console.log('REQUEST headers Authorization', request.headers.common.Authorization)
    return request
})



const onFulfilledCb = response => {
  const { data: { success, message } } = response

  //console.log('RESPONSE DATA', response.data)

  if(response.status === 401) {

  }

  //

  return response
}

const onReject = error => {
  console.log("ERROR onReject:", error)

  //

  return Promise.reject(error)
}

instance.interceptors.response.use(onFulfilledCb, onReject)

export default instance
