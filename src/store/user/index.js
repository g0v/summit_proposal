import actions from "./actions";

const defaultUserInfo = {
  _id: "",
  email: "",
  picture: "",
  name: "",
  provider: ""
};

export default {
  actions,
  state: {
    token: "",
    userInfo: {
      ...defaultUserInfo
    }
  },
  mutations: {
    updateToken(state, token) {
      state.token = token;
    },
    updateUserInfo(state, info) {
      state.userInfo = info;
    },
    logout(state) {
      state.token = "";
      state.userInfo = {
        ...defaultUserInfo
      };
    }
  },
  getters: {
    token({ token }) {
      return token;
    },
    userInfo({ userInfo }) {
      return userInfo;
    },
    isLoggedIn({ userInfo }) {
      return !!userInfo._id;
    }
  }
};
