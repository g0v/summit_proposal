const axios = require("axios");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

// handle only production for simplicity
const commentEndpoint = "https://discuss.summit2020.g0v.tw/comments/get";
const topicEndpoint = "https://discuss.summit2020.g0v.tw/api/topic/tid";
const apiEndpoint = "https://api.summit2020.g0v.tw/projects";

const resultFilePath = path.join(__dirname, "../commentCache.json");

async function genCache() {
  const cacheContent = {};
  const listResp = await axios.get(apiEndpoint);
  const projectIds = listResp.data
    .filter(project => project.enable)
    .map(project => project._id);

  const totalProject = projectIds.length;
  console.log(`Total ${totalProject} projects to retrieve`);
  for (let i = 0; i < totalProject; i++) {
    const projectId = projectIds[i];
    const seq = `${i + 1}`.padStart(3);
    console.log(`  [${seq}/${totalProject}] Retrieve ${projectId}`);
    const commentResp = await axios.get(`${commentEndpoint}/${projectId}/0`);
    const commentData = commentResp.data;
    const lastPost = _.first(commentData.posts) || {};
    const comment = {
      updatedAt: lastPost.timestampISO,
      id: commentData.tid,
      // exclude initial post
      commentCount: commentData.postCount - 1
    };

    if (!comment.updatedAt) {
      console.log("            No post, get topic raw data");
      const topicResp = await axios.get(`${topicEndpoint}/${comment.id}`);
      comment.updatedAt = topicResp.data.lastposttimeISO;
    }
    cacheContent[projectId] = comment;
  }

  fs.writeFileSync(resultFilePath, JSON.stringify(cacheContent, null, "  "));
  console.log(`Check ${resultFilePath} for result file`);
}

genCache();
