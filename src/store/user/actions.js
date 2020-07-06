import API from "@/utils/API.js";
import FORUM_API from "@/utils/FORUM_API.js";

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
  },
  getForumNotifications() {
    return FORUM_API.GET("/api/notifications");
  }
};
