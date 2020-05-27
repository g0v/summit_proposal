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
  mutations: {},
  getters: {
    token({ token }) {
      return token;
    },
    userInfo({ userInfo }) {
      return userInfo;
    }
  }
};
