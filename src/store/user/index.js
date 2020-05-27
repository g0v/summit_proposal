import actions from "./actions";

export default {
  actions,
  state: {
    token: "",
    userInfo: {
      _id: "",
      email: "",
      picture: "",
      sub: "",
      name: "",
      provider: ""
    }
  },
  mutations: {
    updateToken(state, token) {
      state.token = token;
    }
  },
  getters: {
    token({ token }) {
      return token;
    },
    userInfo({ userInfo }) {
      return userInfo;
    }
  }
};
