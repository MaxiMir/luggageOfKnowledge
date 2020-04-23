import axios from 'axios'

let instance = axios.create({
  baseURL: 'https://vacancy-dev.erkapharm.com/api/mobile/',
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.response.use(
  response => {
    console.log(response.data['http_code'])
    return response
  },
    error => {
    if (error.response.status !== 401) {

    }

    return Promise.reject(error)
  }
)

export default instance
