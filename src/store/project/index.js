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
    myProjectList(state) {
      return state.projectList.filter(project => "version" in project);
    }
  }
};
