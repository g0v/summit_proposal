import actions from "./actions";
import moment from "moment";

const LONG_TIME_AGO = moment("2020-06-08");

function joinCommentToProject(project, commentDictionary) {
  const commentInfo = {
    commentCount: 0,
    updatedAt: LONG_TIME_AGO.clone()
  };
  const comment = commentDictionary[project._id];
  if (comment) {
    commentInfo.commentCount = comment.commentCount;
    commentInfo.updatedAt = comment.updatedAt;
    commentInfo.commentId = comment.id;
  } else {
    const initVersion = project.versions;
    console.warn(`Missing topic ${initVersion.title} (${project._id})`);
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
    initCommentList(state, commentList) {
      state.commentList = commentList;
    },
    mergeCommentList(state, newCommentList) {
      newCommentList.forEach(newComment => {
        const existingComment = state.commentList.find(
          comment => comment.id === newComment.id
        );
        if (existingComment) {
          existingComment.updatedAt = newComment.updatedAt;
          existingComment.commentCount = newComment.commentCount;
        } else {
          state.commentList.push(newComment);
        }
      });
    }
  },
  getters: {
    commentDictionary(state) {
      const dictionary = {};
      state.commentList.forEach(comment => {
        dictionary[comment.projectId] = comment;
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
