<template>
  <div class="detail-content">
    <div class="detail-content-container container">
      <div class="main-info">
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
            <p>
              {{
                latestVersion.keywords
                  ? latestVersion.keywords.join(" , ")
                  : latestVersion.three_keywords
              }}
            </p>
          </div>
        </main>
      </div>
      <div class="speaker">
        <div
          class="item"
          v-for="(speaker, index) in latestVersion.speakers"
          :key="index"
        >
          <div class="pic">
            <img :src="speaker.avatar_url" alt="speaker" />
          </div>
          <div class="open-info">
            <h4>講者名稱 Speaker’s display name</h4>
            <p>{{ speaker.display_name }}</p>
            <h4>
              組織或社群名稱 Speaker’s organization or community affiliation
            </h4>
            <p>{{ speaker.organization }}</p>
            <h4>講者所在城市 Speaker’s location (city)</h4>
            <p>{{ speaker.city }}</p>
            <h4>講者資訊連結 Speaker info URL</h4>
            <p><a :href="speaker.info_url" target="_blank">前往外部連結</a></p>
            <h4>講者簡介 Short bio</h4>
            <p>{{ speaker.bio }}</p>
            <h4>Speaker’s bio in English</h4>
            <p>{{ speaker.bio_en }}</p>
          </div>
        </div>
      </div>
      <a id="nodebb-comments"></a>
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
  },
  mounted() {
    const config = {
      discussURL: "https://discuss.summit2020.pre-stage.cc",
      projectID: this.$route.params.id,
      projectTitle: "測試標題",
      categoryID: 3
    };

    window.nbb = {};
    window.nodeBBURL = config.discussURL;
    window.articleID = config.projectID;

    window.articleData = {
      title_plain: config.projectTitle,
      url: location.href,
      tags: [],
      markDownContent: "",
      cid: config.categoryID
    };

    (function() {
      window.nbb.script = document.createElement("script");
      window.nbb.script.type = "text/javascript";
      window.nbb.script.async = true;
      window.nbb.script.src =
        window.nodeBBURL +
        "/plugins/nodebb-plugin-blog-comments/lib/general.js";
      (
        document.getElementsByTagName("head")[0] ||
        document.getElementsByTagName("body")[0]
      ).appendChild(window.nbb.script);
    })();
  }
};
</script>

<style lang="scss" scoped>
.detail-content-container {
  .main-info {
    padding: 50px 20px;
    box-shadow: 0 0 8px #ccc5c5;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    border-radius: 5px;
    @include mediaquery_pad {
      flex-direction: row;
      justify-content: space-between;
    }
    .side {
      width: 100%;
      order: 2;
      @include mediaquery_pad {
        width: 20%;
        order: 1;
      }
    }
    main {
      width: 100%;
      order: 1;
      @include mediaquery_pad {
        width: 75%;
        order: 2;
      }
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
  .speaker {
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: left;
      background-color: #292828;
      color: #fff;
      padding: 45px 0;
      border-radius: 5px;
      margin-bottom: 30px;
      box-shadow: 0 0 8px #ccc5c5;
    }
    .pic {
      text-align: center;
      margin-bottom: 40px;
      position: relative;
      img {
        width: 130px;
        height: 130px;
        object-fit: cover;
        border-radius: 50%;
        border: 2px solid #fff;
        position: relative;
        z-index: 1;
        background-color: gray;
      }
      &::before {
        content: "";
        width: 100px;
        height: 100px;
        background-color: $main-color;
        border-radius: 50%;
        position: absolute;
        right: -30%;
        top: -15px;
        z-index: 0;
      }
      &::after {
        content: "";
        width: 50px;
        height: 50px;
        background-color: $main-color;
        border-radius: 50%;
        position: absolute;
        left: -20px;
        bottom: -7px;
        z-index: 1;
      }
    }
    .open-info {
      width: 90%;
      h4 {
        font-size: 15px;
        color: #ef4645;
      }
      p {
        font-size: 13px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      a {
        color: #fff;
      }
    }
  }
}
</style>
