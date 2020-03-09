import Cookie from 'cookie' // чтение кук
import Cookies from 'js-cookie' // запись+удаление из кук
import jwrDecode from 'jwt-decode' // декодирование токена

export const state = () => ({
  token: null
})

export const mutations = {
  setToken(state, token) {
    this.$axios.setToken(token, 'Bearer') // добавляем токен в заголовки отправляемого  запроса (не отработает на фронте)
    state.token = token
    Cookie.set('jwt-token', token) // сохраняем токен в куки
  },
  clearToken(state) {
    this.$axios.setToken(false)  // удаляем токен из заголовков отправляемого запроса (не отработает на фронте)
    state.token = null
    Cookies.remove('jwt-token') // удаляем токен из кук
  }
}

export const actions = {
  async login({ commit, dispatch }, formData) {
    try {
      const { token } = await this.$axios.$post('/api/auth/admin/login', formData) // this.$axios - nuxt method.

      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, { root: true }) // root: true смотреть в корневом элементе
      throw e // чтобы, например, попасть в catch
    }
  },
  async createUser({ commit }, formData) {
    try {
      await this.$axios.$post('/api/auth/admin/create', formData)
    } catch (e) {
      commit('setError', e, { root: true }) // root: true смотреть в корневом элементе
      throw e
    }
  },
  setToken({ commit }, token) {
    commit('setToken', token)
  },
  logout({ commit }) {
    commit('clearToken')
  },
  autoLogin({ dispatch }) {
    const cookieStr = proccess.browser // где находимся на клиенте или на сервере
      ? document.cookie
      : this.app.context.request.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {} // парсим куки
    const token = cookies['jwt-token']
    if (isJWTValid(token)) { // проверяем на валидность куку
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  }
}

export const getters = {
  isAuthenticated: state => Boolean(state.token),
  token: state => state.token
}


function isJWTValid(token) {
  if (!token) {
    return false
  }

  const jwtData = jwrDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}
