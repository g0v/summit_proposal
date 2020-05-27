import actions from "./actions";

export default {
  actions,
  state: {
    token: "",
    userInfo: {
      _id: "",
      email: "",
      picture: "",
      name: "",
      provider: ""
    }
  },
  mutations: {
    updateToken(state, token) {
      state.token = token;
    },
    updateUserInfo(state, info) {
      state.userInfo = info;
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
