import Vuex from 'vuex'

const Store = new Vuex.Store({
  state: {
    user: {
      id: String(),
      name: String(),
      group: String(),
      tg: String(),
      vk: String(),
      email: String(),
      phone: String(),

      isSignedIn: false,
    },
    task: {
      points: Number(),
      timeFinish: Number(),
      timeLeft: Number(),
      timeLeftString: String(),

      isGotten: false,
    },
    team: {
      id: String(),
      title: String(),
      points: Number(),

      isGotten: false,
    }
  },
  mutations: {
    SET_USER(state, userData) {
      state.user.id = String(userData.id);
      state.user.name = String(userData.name);
      state.user.group = String(userData.group);
      state.user.tg = String(userData.telegram);
      state.user.vk = String(userData.vk);
      state.user.email = String(userData.email);
      state.user.phone = String(userData.phone_number);

      state.user.isSignedIn = true;
    },
    SET_TASK(state, taskData) {
      state.task.points = String(taskData.points);
      state.task.timeFinish = new Date(taskData.timeFinish);

      state.task.isGotten = true;
    },
    _UPDATE_TASK_TIME_LEFT(state) {
      if (!state.task.isGotten) {
        return;
      }
      console.log(state.task.timeFinish)
      state.task.timeLeft = new Date(state.task.timeFinish * 1000 - new Date()) / 1000;
      const h = String(Math.floor(state.task.timeLeft / 60 / 60));
      const m = String(Math.floor((state.task.timeLeft - h * 60 * 60) / 60)).padStart(2, '0');
      const s = String(Math.floor((state.task.timeLeft - h * 60 * 60 - m * 60))).padStart(2, '0');
      state.task.timeLeftString = `${h}:${m}:${s}`;
    },
    SET_TEAM(state, teamData) {
      state.team.id = String(teamData.id);
      state.team.title = String(teamData.title);
      state.team.points = Number(teamData.points);

      state.team.isGotten = true;
    },
    DELETE_USER(state) {
      state.user.isSignedIn = false;
    },
    DELETE_TASK(state) {
      state.task.isGotten = false;
    },
    DELETE_TEAM(state) {
      state.team.isGotten = false;
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
    SET_TASK(state, taskData) {
      state.commit('SET_TASK', taskData);
    },
    SET_TEAM(state, teamData) {
      state.commit('SET_TEAM', teamData);
    },
    DELETE_USER(state) {
      state.commit('DELETE_USER');
    },
    DELETE_TASK(state) {
      state.commit('DELETE_TASK');
    },
    DELETE_TEAM(state) {
      state.commit('DELETE_TEAM');
    },
    _UPDATE_TASK_TIME_LEFT(state) {
      state.commit('_UPDATE_TASK_TIME_LEFT');
    }
  }
});

setInterval(() => Store.dispatch('_UPDATE_TASK_TIME_LEFT'), 1000);

export default Store;
