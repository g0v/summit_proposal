import API from "@/utils/API.js";
import FORUM_API from "@/utils/FORUM_API.js";
import moment from 'moment';

const COMMENT_PER_PAGE = 20;

export default {
  async createEmptyProject() {
    const project = await API.POST("/project");
    if (!project._id) {
      throw new Error("Failed to create project");
    }
    return project._id;
  },
  createProjectVersion(_dummy, { id, data }) {
    return API.POST(`/project/${id}`, data);
  },
  updateProjectDraft(_dummy, { id, data }) {
    return API.PATCH(`/project/${id}`, data);
  },
  async listProjects({ commit }) {
    const rows = await API.GET("/projects");
    if (Array.isArray(rows)) {
      commit("updateProjectList", rows);
      return rows;
    } else {
      throw new Error("Failed to load project list");
    }
  },
  async listComments({ commit }) {
    for (let curPage = 1; ; curPage++) {
      const resp = await FORUM_API.GET(`/api/recent?page=${curPage}`);
      if (resp.topics) {
        const comments = resp.topics.map(topic => {
          return {
            title: topic.title,
            // we actually don't know what's diff between title & titleRaw, store both of them just in case
            titleRaw: topic.titleRaw,
            updatedAt: moment(topic.lastposttimeISO),
            id: topic.tid,
            // 1 post would be initial post for this topic
            commentCount: topic.postcount - 1
          };
        });
        if (curPage === 1) {
          // reset it when get new data
          commit("resetComment");
        }
        commit("appendCommentList", comments);
      }
      if (resp.topics.length < COMMENT_PER_PAGE) {
        break;
      }
    }
  },
  async getDetailProject({ commit }, id) {
    const data = await API.GET(`/project/${id}`);
    commit("updateProjectDetail", data);
    return data;
  }
};
