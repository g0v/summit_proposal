import API from "@/utils/API.js";

export default {
  async createEmptyProject() {
    const project = await API.POST("/project");
    if (!project._id) {
      throw new Error("Failed to create project");
    }
    return project._id;
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
  async detailProject({ commit }, id) {
    const data = await API.GET(`/project/${id}`);
    console.log(data);
    return commit("updateProjectDetail", data);
  }
};
