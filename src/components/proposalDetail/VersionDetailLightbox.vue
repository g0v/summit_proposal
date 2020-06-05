<template>
  <div class="version-lightbox">
    <div class="version-lightbox-container container">
      <b-icon
        class="close-icon"
        icon="x-square"
        @click="$emit('close')"
        variant="danger"
      ></b-icon>
      <div class="item">
        <h3>摘要 Summary</h3>
        <p>{{ versionData.summary }}</p>
      </div>
      <div class="item">
        <h3>英語摘要 Summary in English</h3>
        <p>{{ versionData.summary_en }}</p>
      </div>
      <div class="item">
        <h3>形式 Format</h3>
        <p>{{ versionData.format }}</p>
      </div>
      <div class="item">
        <h3>主題分類 Topic</h3>
        <p>{{ versionData.topic }}</p>
      </div>
      <div class="item">
        <h3>三個關鍵字 3 keywords</h3>
        <p>
          {{
            versionData.keywords
              ? versionData.keywords.join(" , ")
              : versionData.three_keywords
          }}
        </p>
      </div>
      <div class="item">
        <h3>
          你的議程是否可以接受錄影、錄音、拍照、共筆、直播等形式的記錄，且以開放授權釋出？
          <br />Do you agree that your presentation will be live-streamed and
          recorded in the forms of text, photo, audio, and video, and released
          publicly with an CC BY 4.0 International license?
        </h3>
        <p>
          {{ versionData.is_presentation_cc40 ? "是 Yes" : "否 No" }}
        </p>
      </div>
      <div class="item">
        <h3>
          你的投影片是否可以以開放授權釋出？
          <br />Do you agree that your slides will be released publicly with an
          CC BY 4.0 International license?
        </h3>
        <p>
          {{ versionData.is_slide_cc40 ? "是 Yes" : "否 No" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VersionDetailLightbox",
  props: {
    versionData: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.version-lightbox {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff7d;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .version-lightbox-container {
    background-color: $sub-color;
    max-height: 80vh;
    overflow: scroll;
    color: #fff;
    padding: 30px 15px;
    text-align: left;
    position: relative;
    border-radius: 5px;
  }
  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  .item {
    h3 {
      font-size: 18px;
      color: #ef4645;
    }
    p {
      font-size: 15px;
    }
  }
  .item:last-child p {
    margin-bottom: 0;
  }
}
</style>
