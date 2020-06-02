import actions from "./actions";

export default {
  actions,
  state() {
    return {
      projectList: []
    };
  },
  mutations: {
    updateProjectList(state, rows) {
      state.projectList = rows;
    }
  },
  getters: {
    allProjectList(state) {
      return state.projectList;
    },
    displayProjectList(state) {
      console.log(state.projectList.filter(item => item.enable));
      return state.projectList.filter(item => item.enable);
    },
    myProjectList(state) {
      const userId = state.user.userInfo._id;
      if (!userId) {
        return [];
      }
      return state.projectList.filter(project => project.user._id === userId);
    }
  }
};
