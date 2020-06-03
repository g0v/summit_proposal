import actions from "./actions";

export default {
  actions,
  state() {
    return {
      projectList: [],
      projectDetail: {
        versions: []
      }
    };
  },
  mutations: {
    updateProjectList(state, rows) {
      state.projectList = rows;
    },
    updateProjectDetail(state, detail) {
      state.projectDetail = detail;
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
    },
    projectDetail({ projectDetail }) {
      return projectDetail;
    }
  }
};
