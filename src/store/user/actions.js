import API from "@/utils/API.js";

export default {
  updateToken({ commit }, token) {
    commit("updateToken", token);
  },
  async fetchUserInfo({ commit }) {
    let res = await API.GET("/user/me");
    commit("updateUserInfo", res);
  }
};
