import Vuex from 'vuex'

const Storage = new Vuex.Store({
  state: {
  },
  mutations: {
    SET_SOMETHING(state, someData) {
      // Это пример. SOMETHING надо поменять например на USER,
      // и прописать соответствующую структуру данных и логику
    },
    DELETE_SOMETHING(state) {
    },
  },
  actions: {
    SET_SOMETHING(state, someData) {
      state.commit('SET_SOMETHING', someData);
    },
    DELETE_SOMETHING(state) {
      state.commit('DELETE_SOMETHING');
    },
  }
});

export default Storage;
