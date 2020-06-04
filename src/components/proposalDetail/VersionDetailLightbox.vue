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
