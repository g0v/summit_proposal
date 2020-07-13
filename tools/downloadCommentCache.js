const axios = require("axios");
const fs = require("fs");
const path = require("path");

// handle only production for simplicity
const endpoint = "https://discuss.summit2020.g0v.tw/api/recent?page=";
// const endpoint = "https://discuss.summit2020.pre-stage.cc/api/recent?page=";
const resultFilePath = path.join(__dirname, "../commentCache.json");

async function downloadAllComments() {
  const comments = [];
  const titleDict = {};
  for (let curPage = 1; ; curPage++) {
    console.log(`Download page ${curPage}`);
    const resp = await axios.get(`${endpoint}${curPage}`);
    if (!resp.data.topics) {
      break;
    }
    const topics = resp.data.topics;
    topics.forEach(topic => {
      if (topic.tid === 197) {
        // for some reason, this comment title is out of sync
        topic.title = "生於亂世 有種責任: Civic tech when institutions fail";
      }
      const comment = {
        title: topic.title,
        titleRaw: topic.titleRaw,
        updatedAt: topic.lastposttimeISO,
        id: topic.tid,
        commentCount: topic.postcount - 1
      };
      if (!titleDict[topic.title]) {
        titleDict[topic.title] = comment;
        comments.push(comment);
      } else {
        const oldComment = titleDict[comment.title];
        console.warn(
          `Duplicated title: ${comment.title} in [${comment.id}, ${oldComment.id}]`
        );
        if (comment.id > oldComment.id) {
          // always prefer new project, as this handle all duplicated case
          oldComment.id = comment.id;
          oldComment.updatedAt = comment.updatedAt;
          oldComment.commentCount = comment.commentCount;
        }
      }
    });
    if (topics <= 0) {
      break;
    }
  }
  fs.writeFileSync(resultFilePath, JSON.stringify(comments));
  console.log(`Check ${resultFilePath} for result file`);
}

downloadAllComments();
