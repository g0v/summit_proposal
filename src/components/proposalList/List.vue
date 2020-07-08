<template>
  <div class="list">
    <div class="list-container container" v-if="list.length === 0">
      <span class="no-info">抱歉，目前尚無提案供閱讀</span>
    </div>
    <div class="list-container container" v-else>
      <router-link
        v-for="item in list"
        :key="item._id"
        class="item"
        :to="{ name: routerName, params: { id: item._id } }"
      >
        <div class="item-container">
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
              <draft-notifier
                class="mv2"
                v-if="displayDraftNotice"
                :proposal="item"
              />
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
          <div v-else>
            <div class="mv3">
              此為暫存版本，請點選進入，查看詳細資訊
            </div>
            <div class="mv3">
              This proposal is not submitted yet. Click here to get latest
              draft.
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import DraftNotifier from "@/components/DraftNotifier";

export default {
  name: "List",
  components: {
    DraftNotifier
  },
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
  justify-content: space-between;
  flex-wrap: wrap;
  // 為了做到 flex 漂亮排版，往外拉了20px
  @include mediaquery_phone {
    max-width: 560px;
  }
  @include mediaquery_pad {
    max-width: 740px;
  }
  @include mediaquery_medium_devices {
    max-width: 980px;
  }
  @include mediaquery_large_devices {
    max-width: 1160px;
  }
  .no-info {
    color: #000;
    font-size: 20px;
    margin: 20px 0;
  }
  &:after {
    content: "";
    flex: auto;
  }
  .item {
    width: 100%;
    padding: 10px;
    text-decoration: none;
    @include mediaquery_phone {
      width: 50%;
    }
    @include mediaquery_medium_devices {
      width: 33.33333%;
    }
  }
  .item-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    padding: 40px 20px;
    box-shadow: 0px 0px 2px 0px #00000052, 0px 12px 8px -12px #000;
    border-radius: 5px;
    background-color: #ffffff94;
    cursor: pointer;
    height: 100%;
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
        margin-bottom: 8px;
        // height: 70px;
        span {
          display: block;
        }
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        margin-bottom: 0;
        font-size: 15px;
        white-space: pre-line;
      }
    }
  }
}
</style>
