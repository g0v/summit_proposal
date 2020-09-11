<template>
  <div class="detail-content">
    <div class="detail-content-container container">
      <div class="main-info">
        <div class="side">
          <div class="item">
            <h4>修訂紀錄</h4>
            <div class="content">
              <div
                v-for="(version, index) in versions"
                :key="index"
                class="pointer"
                @click="$emit('openVersionDetailLightboxOpen', index)"
              >
                <span> version {{ index + 1 }} </span>
                <span
                  v-if="index === lastVerifiedVersionIndex && !onlyShowVerified"
                  class="ml2 f7 ph2 lh-solid br4 bg-green white"
                >
                  已審核 Verified
                </span>
              </div>
            </div>
          </div>
        </div>
        <main>
          <div
            class="item"
            v-if="'presentation_method' in latestVersion && !onlyShowVerified"
          >
            <h3>
              現場報告或遠端連線 Whether to present this proposal on-site or
              online
            </h3>
            <p>
              {{ latestVersion.presentation_method }}
            </p>
          </div>
          <div class="item">
            <h3>摘要 Summary</h3>
            <rich-multiline :text="latestVersion.summary" />
          </div>
          <div class="item">
            <h3>英語摘要 Summary in English</h3>
            <rich-multiline :text="latestVersion.summary_en" />
          </div>
          <div class="item">
            <h3>使用語言 Language</h3>
            <p>
              {{
                latestVersion.oral_languate_other === ""
                  ? latestVersion.oral_language
                  : latestVersion.oral_languate_other
              }}
            </p>
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
          <div class="item" v-if="latestVersion.related_url">
            <h3>相關專案資訊連結 Related projects / works URL</h3>
            <p>
              <a
                class="gray dim hover-gray"
                :href="latestVersion.related_url"
                target="_blank"
                rel="noopener nofollow"
              >
                {{ urlShortener(latestVersion.related_url) }}
                <b-icon icon="box-arrow-up-right" />
              </a>
            </p>
          </div>
          <div class="item">
            <h3>
              你的議程是否可以接受錄影、錄音、拍照、共筆、直播等形式的記錄，且以開放授權釋出？
              <br />Do you agree that your presentation will be live-streamed
              and recorded in the forms of text, photo, audio, and video, and
              released publicly with an CC BY 4.0 International license?
            </h3>
            <p>
              {{ latestVersion.is_presentation_cc40 ? "是 Yes" : "否 No" }}
            </p>
          </div>
          <div class="item">
            <h3>
              你的投影片是否可以以開放授權釋出？
              <br />Do you agree that your slides will be released publicly with
              an CC BY 4.0 International license?
            </h3>
            <p>
              {{ latestVersion.is_slide_cc40 ? "是 Yes" : "否 No" }}
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
            <template v-if="speaker.info_url">
              <h4>講者資訊連結 Speaker info URL</h4>
              <p>
                <a
                  :href="speaker.info_url"
                  rel="noopener nofollow"
                  target="_blank"
                >
                  {{ urlShortener(speaker.info_url) }}
                  <b-icon icon="box-arrow-up-right" />
                </a>
              </p>
            </template>
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
import _ from "lodash";
import RichMultiline from "./RichMultiline";

const MAX_URL_LEN = 40;
const URL_ELLIPSIS = "...";
const MIN_URL_TAIL_LEN = 5;

export default {
  name: "DetailContent",
  components: {
    RichMultiline
  },
  props: {
    projectDetail: {
      type: Object,
      required: true
    },
    onlyShowVerified: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    versions() {
      if (this.onlyShowVerified) {
        return this.projectDetail.versions.slice(
          0,
          this.lastVerifiedVersionIndex
        );
      }
      return this.projectDetail.versions;
    },
    lastVerifiedVersionIndex() {
      return _.findLastIndex(this.projectDetail.versions, ver => ver.verified);
    },
    latestVersion() {
      if (!this.onlyShowVerified) {
        return this.projectDetail.versions[
          this.projectDetail.versions.length - 1
        ];
      } else {
        for (let i = this.projectDetail.versions.length - 1; i >= 0; i--) {
          const ver = this.projectDetail.versions[i];
          if (ver.verified) {
            return ver;
          }
        }
      }
      return {};
    }
  },
  mounted() {
    let baseURL = location.href.includes("propose.summit2020.g0v.tw")
      ? `https://discuss.summit2020.g0v.tw`
      : `https://discuss.summit2020.pre-stage.cc`;
    const config = {
      discussURL: baseURL,
      projectID: this.$route.params.id,
      projectTitle: this.latestVersion.title || "無標題",
      categoryID: 2
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
  },
  methods: {
    urlShortener(url) {
      if (!url.startsWith("http")) {
        // just to ensure it's a url
        // or become an invalid stuff
        url = "https://" + url;
      }
      if (url.length <= MAX_URL_LEN + URL_ELLIPSIS.length) {
        return url;
      }
      const urlTokens = url.split("/");
      let domain = urlTokens.slice(0, 3).join("/") + "/";
      if (domain.length > MAX_URL_LEN) {
        domain = domain.slice(0, MAX_URL_LEN - MIN_URL_TAIL_LEN);
      }
      const postfix = urlTokens.slice(3).join("/");
      const lenLeft = Math.max(MAX_URL_LEN - domain.length, MIN_URL_TAIL_LEN);
      const shortUrl =
        domain + URL_ELLIPSIS + postfix.slice(postfix.length - lenLeft);
      return shortUrl;
    }
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
          > div {
            &:hover {
              color: $main-color;
            }
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
        font-size: 18px;
      }
      p {
        margin-bottom: 0;
        white-space: pre-line;
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
