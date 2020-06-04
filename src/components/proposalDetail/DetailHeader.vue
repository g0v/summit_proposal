<template>
  <div class="detail-header">
    <div class="detail-header-container container">
      <div class="cover">
        <img :src="latestVersion.cover_image" alt="cover" />
      </div>
      <div class="title">
        <h2>
          <span>{{ latestVersion.title }}</span>
          <span>{{ latestVersion.title_en }}</span>
        </h2>
        <div class="owner">
          <img
            v-for="(speaker, index) in latestVersion.speakers"
            :key="index"
            :src="speaker.avatar_url"
            alt="owner"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailHeader",
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
.detail-header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  @include mediaquery_pad {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 50px;
  }
  .cover {
    width: 100%;
    margin-bottom: 30px;
    @include mediaquery_pad {
      width: 45%;
      margin-bottom: 0px;
    }
  }
  .title {
    width: 100%;
    margin-bottom: 30px;
    @include mediaquery_pad {
      width: 50%;
      margin-bottom: 0px;
    }
  }
  .cover {
    height: 250px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      position: relative;
      z-index: 2;
    }
    &::after {
      content: "";
      display: block;
      height: 250px;
      width: 50%;
      position: absolute;
      top: -25px;
      left: -10px;
      background-color: $main-color;
      z-index: 1;
    }
  }
  .title {
    text-align: left;
    h2 {
      font-size: 40px;
      font-weight: 600;
      text-align: left;
      @include mediaquery_pad {
        text-align: center;
      }
      span {
        display: block;
      }
    }
    .owner {
      width: 100%;
      height: 50px;
      img {
        width: 50px;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
}
</style>
