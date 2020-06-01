import API from "@/utils/API.js";

export default {
  updateToken({ commit }, token) {
    commit("updateToken", token);
    API.SET_AUTH_TOKEN(token);
  },
  async fetchUserInfo({ commit }) {
    let res = await API.GET("/user/me");
    commit("updateUserInfo", res);
  },
  logout({ commit }) {
    commit("logout");
    API.RESET_AUTH_TOKEN();
  }
};
