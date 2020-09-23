import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timers: [],
  },
  mutations: {
    updateTimers(state, data) {
      state.timers = data;
    },
    startTimer(state, id) {
      let timer = state.timers.find((timer) => timer.id == id);
      timer.active = true;
      timer.timerId = setInterval(() => {
        timer.timestamp++;
      }, 1000);
    },
    stopTimer(state, id) {
      let timer = state.timers.find((timer) => timer.id == id);
      timer.active = false;
      clearInterval(timer.timerId);
    },
    addTimer(state) {
      state.timers.push({
        id: Date.now(),
        timestamp: 0,
        active: false,
      });
    },
    clearTimer(state, id) {
      let timer = state.timers.find((timer) => timer.id == id);
      timer.timestamp = 0;
      this.commit("stopTimer", timer.id);
    },
  },
  actions: {
    timersPlaceholder({ commit }) {
      let timers = [
        {
          id: 1,
          timestamp: 160,
          active: false,
        },
        {
          id: 2,
          timestamp: 1532,
          active: true,
        },
        {
          id: 3,
          timestamp: 5415,
          active: true,
        },
        {
          id: 4,
          timestamp: 4833,
          active: true,
        },
      ];
      commit("updateTimers", timers);
      timers.forEach((timer) => {
        if (timer.active) {
          commit("startTimer", timer.id);
        }
      });
    },
  },
  getters: {
    getFormattedTime: () => (timer) => {
      let hours = Math.floor(timer.timestamp / 60 / 60);
      let minutes = Math.floor(timer.timestamp / 60) - hours * 60;
      let seconds = timer.timestamp % 60;

      if (hours) return `${hours}:${minutes}:${seconds}`;

      if (minutes) return `${minutes}:${seconds}`;

      return seconds;
    },
    getTimers({ timers }) {
      return timers;
    },
  },
});
