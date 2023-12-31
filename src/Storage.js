import Vuex from 'vuex'

const Store = new Vuex.Store({
  state: {
    user: {
      id: Number(),
      name: String(),
      group: String(),
      tg: String(),
      vk: String(),
      email: String(),
      phone: String(),

      isSignedIn: false,
    },
  },
  mutations: {
    SET_USER(state, userData) {
      state.user.id = Number(userData.id);
      state.user.name = String(userData.name);
      state.user.group = String(userData.group);
      state.user.tg = String(userData.telegram);
      state.user.vk = String(userData.vk);
      state.user.email = String(userData.email);
      state.user.phone = String(userData.phone_number);

      state.user.isSignedIn = true;
    },
    DELETE_USER(state) {
      state.user.isSignedIn = false;
    },
  },
  actions: {
    async GET_USER(state) {
      const {data, code, ok} = await this.$app.$api.getUser();
      if (!ok) {
        state.commit('DELETE_USER');
        return;
      }
      state.commit('SET_USER', data);
    },
    async DELETE_USER(state) {
      state.commit('DELETE_USER');
    },
  }
});

export default Store;
