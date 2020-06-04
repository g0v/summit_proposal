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
      return state.projectList.filter(item => item.enable);
    },
    myProjectList(state) {
      // const userId = getters.userInfo._id;
      // console.log("userId", userId, state.projectList);
      // if (!userId) {
      //   return [];
      // }
      console.log(state.projectList.filter(project => project.owner));
      return state.projectList.filter(project => project.owner);
    },
    projectDetail({ projectDetail }) {
      return projectDetail;
    }
  }
};
