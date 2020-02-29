import firebase from 'firebase/app';

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit('setError', e); // запуск мутации
        throw e;
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        
        const uid = await dispatch('getUid');
        
        await firebase.database().ref(`/users/${uid}/info`).set({
          name,
          bill: 10000, // колонка счет
        }); // работа с таблицей info - данные о пользователе
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async getUid() { // возвращает ID пользователя
      const user = firebase.auth().currentUser;
      
      return user ? user.uid : null;
    },
    async logout({commit}) {
      await firebase.auth().signOut();
      commit('clearInfo'); // дергаем мутацию
    },
  },
  
};
