import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    obj: {},
    user: {},
  },
  mutations: {
    setObj(state, obj) {
      state.obj.date = obj[0]
      state.obj.tipoRecurso = obj[1]
    },
    setUser(state, obj) {
      state.user = obj.payload;
      axios.defaults.headers.common['x-access-token'] = obj.token;
    }
  },
  actions: {
  },
  modules: {
  }
})
