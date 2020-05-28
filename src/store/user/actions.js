import API from "@/utils/API.js";

export default {
  updateToken({ commit }, token) {
    commit("updateToken", token);
  },
  async fetchUserInfo({ commit, getters }) {
    let res = await API.GET("/user/me", {
      headers: { Authorization: `Bearer ${getters.token}` }
    });
    commit("updateUserInfo", res);
  }
};
