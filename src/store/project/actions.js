import moment from "moment";
import _ from "lodash";

import API from "@/utils/API.js";
import FORUM_API from "@/utils/FORUM_API.js";
import commentCache from "@/assets/commentCache.json";

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
  async listComments({ state, commit }) {
    if (state.commentList.length === 0) {
      const commentRows = Object.keys(commentCache)
        .map(projectId => {
          const comment = commentCache[projectId];
          return {
            projectId,
            ...comment,
            updatedAt: moment(comment.updatedAt)
          };
        })
        .sort((l, r) => {
          return r.updatedAt - l.updatedAt;
        });
      commit("initCommentList", commentRows);
    }
    const curUpdatedAt = Math.max(...state.commentList.map(c => c.updatedAt));
    for (let curPage = 1; ; curPage++) {
      const resp = await FORUM_API.GET(`/api/recent?page=${curPage}`);
      if (resp.topics && resp.topics.length) {
        const comments = resp.topics.map(topic => {
          return {
            updatedAt: moment(topic.lastposttimeISO),
            id: topic.tid,
            // 1 post would be initial post for this topic
            commentCount: topic.postcount - 1
          };
        });
        const tailUpdatedAt = _.last(comments).updatedAt;
        commit("mergeCommentList", comments);

        if (tailUpdatedAt < curUpdatedAt) {
          // no need to query nodebb, as we are older than cache
          break;
        }
      }
      if (resp.topics.length <= 0) {
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
