import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import info from './info';
import category from './category';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  actions: {
    async fetchCurrency() {
      const key = proccess.env.VUE_APP_FIXER; // получаем значение из файла .env
      const res = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`);
      return await res.json();
    },
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  getters: {
    error: state => state.error,
  },
  modules: {
    auth, info, category,
  },
});
