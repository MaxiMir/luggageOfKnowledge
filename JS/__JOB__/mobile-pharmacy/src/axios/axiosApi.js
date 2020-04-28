import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://vacancy-dev.erkapharm.com/api/mobile/',
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.response.use(response => response.data)

export default instance
