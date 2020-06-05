import API from "@/utils/API.js";

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
  async getDetailProject({ commit }, id) {
    const data = await API.GET(`/project/${id}`);
    console.log(data);
    commit("updateProjectDetail", data);
    return data;
  }
};
