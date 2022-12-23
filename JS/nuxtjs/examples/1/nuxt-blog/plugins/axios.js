export default function ({ $axios, redirect, store }) {

  $axios.interceptors.request.use(request => { //interceptors - перехватывает запросы
    const isAuthUser = store.getters['auth/token']
    const isHeaderAuthAdded = request.headers.common['Authorization'] // common - для доступа к заголовкам

    if (isAuthUser && !isHeaderAuthAdded) {
      const token = store.getters['auth/token']

      request.headers.common['Authorization'] = `Bearer ${token}`
    }

    return request
  })

  $axios.onError(error => { // обработчик ошибок
    if (error.response) { // данная ошибка обработана axios
      if (error.response.status === 401) { // ошибка авторизации
        redirect('/admin/login?message=session')
        store.dispatchEvent('auth/logout')
      }

      if (error.response.status === 500) {
        console.error('Server 500 error')
      }
    }
  })
}


// плагин вызывается и на фронте и на бэке.
