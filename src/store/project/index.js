import actions from "./actions";
import moment from "moment";

const LONG_TIME_AGO = moment("2020-06-08");

function joinCommentToProject(project, commentDictionary) {
  const commentInfo = {
    commentCount: 0,
    updatedAt: LONG_TIME_AGO.clone()
  };
  if (project.versions && project.versions.length) {
    const initVersion = project.versions[0];
    // nodebb use "無標題" when title is empty
    const title = initVersion.title || "無標題";
    if (title in commentDictionary) {
      const comment = commentDictionary[title];
      commentInfo.commentCount = comment.commentCount;
      commentInfo.updatedAt = comment.updatedAt;
      commentInfo.commentId = comment.id;
    } else {
      console.warn(`Missing topic ${initVersion.title} (${project._id})`);
    }
  }

  return {
    ...project,
    ...commentInfo
  };
}

export default {
  actions,
  state() {
    return {
      projectList: [],
      commentList: [],
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
    },
    resetComment(state) {
      state.commentList = [];
    },
    appendCommentList(state, commentList) {
      state.commentList.push(...commentList);
    }
  },
  getters: {
    commentDictionary(state) {
      const dictionary = {};
      state.commentList.forEach(comment => {
        // assume there won't be title conflict
        // as we can't get tid - proposal id mapping
        dictionary[comment.title] = comment;
      });
      return dictionary;
    },
    displayProjectList(state, getters) {
      return state.projectList
        .filter(item => item.enable)
        .map(item => joinCommentToProject(item, getters.commentDictionary))
        .sort((l, r) => {
          return r.updatedAt - l.updatedAt;
        });
    },
    myProjectList(state) {
      return state.projectList.filter(project => project.owner);
    },
    projectDetail({ projectDetail }) {
      return projectDetail;
    }
  }
};
