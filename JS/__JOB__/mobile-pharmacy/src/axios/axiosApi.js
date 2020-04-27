import axios from 'axios'

let instance = axios.create({
  baseURL: 'https://vacancy-dev.erkapharm.com/api/mobile/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instance
