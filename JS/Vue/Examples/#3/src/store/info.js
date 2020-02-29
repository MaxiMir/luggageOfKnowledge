import firebase from 'firebase/app';

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {locale: state.info.locale}; // чтобы info пользователей не пересекались при logout
    },
  },
  actions: {
    async updateInfo({dispatch, commit, getters}, toUpdate) {
      try {
        const uid = await dispatch('getUid'); // дергаем внешний action getUid
        const updateData = {...getters.info, ...toUpdate};
        await firebase.database().ref(`/users/${uid}/info`).update(updateData);
        commit('setInfo', updateData); // запускаем мутацию setInfo
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');
        const info = (await firebase.database().
          ref(`/users/${uid}/info`).
          once('value')).val(); // получаем info пользователя
        commit('setInfo', info);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
  getters: {
    info: s => s.info,
  },
};

