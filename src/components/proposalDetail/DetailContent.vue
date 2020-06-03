<template>
  <div class="detail-content">
    <div class="detail-content-container container">
      <div class="side">
        <div class="item">
          <h4>修訂紀錄</h4>
          <div class="content record">
            <span
              v-for="(version, index) in projectDetail.versions"
              :key="index"
              >version {{ index }}</span
            >
          </div>
        </div>
      </div>
      <main>
        <div class="item">
          <h3>摘要 Summary</h3>
          <p>{{ latestVersion.summary }}</p>
          <p>{{ latestVersion.summary_en }}</p>
        </div>
        <div class="item">
          <h3>形式 Format</h3>
          <p>{{ latestVersion.format }}</p>
        </div>
        <div class="item">
          <h3>主題分類 Topic</h3>
          <p>{{ latestVersion.topic }}</p>
        </div>
        <div class="item">
          <h3>三個關鍵字 3 keywords</h3>
          <p>{{ latestVersion.keywords.join(" , ") }}</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailContent",
  props: {
    projectDetail: {
      type: Object,
      required: true
    }
  },
  computed: {
    latestVersion() {
      return this.projectDetail.versions[
        this.projectDetail.versions.length - 1
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-content-container {
  padding: 20px;
  background-color: #ece8e8;
  display: flex;
  justify-content: space-between;
  .side {
    width: 20%;
  }
  main {
    width: 75%;
  }
  .side {
    text-align: left;
    .item {
      margin-bottom: 30px;
      h4 {
        font-size: 16px;
        color: #000;
        border-bottom: 3px solid $main-color;
        text-align: center;
        padding: 5px 0;
        font-weight: 600;
      }
      .content {
        img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 50%;
          margin: 8px;
        }
        span {
          display: block;
        }
      }
    }
  }
  main {
    text-align: left;
    color: #000;
    .item {
      margin-bottom: 50px;
      position: relative;
      &:not(:last-child)::after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background-color: #827d7d1f;
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    h3 {
      font-size: 20px;
    }
    p {
      margin-bottom: 0;
    }
  }
}
</style>
