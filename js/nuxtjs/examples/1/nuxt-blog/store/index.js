export const state = () => ({
  error: null
})

export const actions = {
  nuxtServerInit({dispatch}) { // вызывается 1 раз на серверной части
    dispatch('auth/autoLogin')
  }
}

export const mutations = {
  setError(state, error) {
    state.error = error
  },
  clearError(state) {
    state.error = null
  }
}

export const getters = {
  error: state => state.error
}
