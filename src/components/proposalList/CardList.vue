<template>
  <div class="list">
    <div class="list-container" v-if="list.length === 0">
      <span class="no-info">抱歉，目前尚無提案供閱讀</span>
    </div>
    <div class="list-container" v-else>
      <router-link
        v-for="item in list"
        :key="item._id"
        class="item"
        :class="{ 'item--accepted': canShowAccepted(item) }"
        :to="{ name: routerName(item), params: { id: item._id } }"
      >
        <div class="item-container" :class="{ 'o-50': isForbidEdit(item) }">
          <div class="item-banner tc" v-if="canShowAccepted(item)">
            <template v-if="isOnReview(item)">
              新版本審核中 New edition is under review
            </template>
            <template v-else>
              已錄取！ Accepted!
            </template>
          </div>

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
import _ from "lodash";
import DraftNotifier from "@/components/DraftNotifier";

export default {
  name: "CardList",
  components: {
    DraftNotifier
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    displayDraftNotice: {
      type: Boolean,
      default: false
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    routerName(item) {
      if (this.isEditable && item.selected && item.owner) {
        return "ProposalEdit";
      }
      return "ProposalDetail";
    },
    isForbidEdit(item) {
      if (!this.isEditable) {
        return false;
      }
      return !(item.selected && item.owner);
    },
    canShowAccepted(item) {
      return this.isEditable && !this.isForbidEdit(item);
    },
    isOnReview(item) {
      const lastVer = _.last(item.versions) || {};
      return !lastVer.verified;
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  padding: 0 1rem;
}
.list-container {
  max-width: $width--proposal-list;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  // padding: 0 10px;
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
    @include mediaquery_large_devices {
      width: 25%;
    }

    &--accepted {
      .item-container {
        padding-top: 48px;
        box-shadow: 0px 0px 2px 0px #00000052, 0px 0px 2px 2px #fbf1a9;

        &:hover {
          box-shadow: 1px 2px 2px 0px #00000052, 1px 2px 2px 2px #fbf1a9;
        }
      }
    }
  }
  .item-banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    background: #fbf1a9;
    color: #555;
    font-size: 0.875rem;
    line-height: 2rem;
  }
  .item-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    padding: 40px 20px;
    position: relative;
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
      width: 100%;
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
        width: 100%;
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
