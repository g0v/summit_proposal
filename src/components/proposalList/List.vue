<template>
  <div class="list">
    <div class="list-container container" v-if="list.length === 0">
      <span class="no-info">抱歉，目前尚無提案供閱讀</span>
    </div>
    <div class="list-container container" v-else>
      <router-link
        v-for="item in list"
        :key="item._id"
        tag="div"
        class="item"
        :to="{ name: routerName, params: { id: item._id } }"
      >
        <!-- 正常有版本的 -->
        <template v-if="item.versions[item.versions.length - 1]">
          <div class="cover">
            <img
              :src="item.versions[item.versions.length - 1].cover_image"
              alt="project cover"
              v-if="item.versions[item.versions.length - 1].cover_image"
            />
            <div class="no-cover" v-else></div>
            <div class="owner">
              <img
                v-for="(speaker, index) in item.versions[
                  item.versions.length - 1
                ].speakers"
                :key="index"
                :src="speaker.avatar_url"
                alt="owner pic"
              />
            </div>
          </div>
          <div class="content">
            <span
              class="notice"
              v-if="displayDraftNotice && Object.keys(item.draft).length !== 0"
              >提醒：您有尚未編輯完成的暫存內容唷</span
            >
            <h3>
              <span>{{ item.versions[item.versions.length - 1].title }}</span>
              <span>{{
                item.versions[item.versions.length - 1].title_en
              }}</span>
            </h3>
            <p>
              {{ item.versions[item.versions.length - 1].summary }}
            </p>
            <p>
              {{ item.versions[item.versions.length - 1].summary_en }}
            </p>
          </div>
        </template>
        <!-- draft 暫存版本的 -->
        <div v-else>此為暫存版本，請點選進入，查看詳細資訊</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    routerName: {
      type: String
    },
    displayDraftNotice: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.list-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .no-info {
    color: #000;
    font-size: 20px;
  }
  .item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    margin-bottom: 15px;
    padding: 40px 20px;
    box-shadow: 0px 0px 2px 0px #00000052, 0px 12px 8px -12px #000;
    border-radius: 5px;
    background-color: #ffffff94;
    text-decoration: none;
    cursor: pointer;
    @include mediaquery_phone {
      width: 46%;
      margin: 2%;
    }
    @include mediaquery_medium_devices {
      width: 31%;
      margin: 0 1% 2%;
    }
    &:hover {
      background-color: #ffffffbf;
      position: relative;
      top: -1px;
      left: -1px;
      box-shadow: 1px 2px 2px #333131;
    }
    .cover {
      width: 80%;
      height: 150px;
      position: relative;
      margin-bottom: 40px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
      }
      .no-cover {
        width: 100%;
        height: 100%;
        background-color: #f5cfcf;
        border-radius: 5px;
      }
      .owner {
        width: 50px;
        height: 50px;
        position: absolute;
        bottom: 0;
        left: -20px;
        display: flex;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }
    .content {
      color: #000;
      h3 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 5px;
        height: 70px;
        span {
          display: block;
        }
      }
      .notice {
        display: block;
        color: $main-color;
        margin-bottom: 10px;
        font-size: 14px;
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        margin-bottom: 0;
        font-size: 15px;
      }
    }
  }
}
</style>
