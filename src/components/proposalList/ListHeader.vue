<template>
  <div class="list-header">
    <div class="container">
      <div class="title">
        <h2>提案列表 Proposals</h2>
        <div v-if="isNeedModeSwitch" class="switch">
          <div
            class="item"
            :class="{ active: mode === 'list' }"
            @click="$emit('updateMode', 'list')"
          >
            <b-icon icon="list"></b-icon>
            <span>清單模式 List Mode</span>
          </div>
          <div
            class="item"
            :class="{ active: mode === 'card' }"
            @click="$emit('updateMode', 'card')"
          >
            <b-icon icon="image"></b-icon>
            <span>卡片模式 Card Mode</span>
          </div>
        </div>
      </div>
      <div class="function">
        <div class="sort">
          <b-dropdown
            text="主題分類 Topic"
            variant="outline-primary"
            v-if="isNeedSortFunction"
          >
            <b-dropdown-form
              v-for="(option, index) in topicOptions"
              :key="index"
              ><b-form-checkbox
                v-model="topicCheckboxStatus[index]"
                :value="option"
                @input="updateTopic"
              >
                {{ option }}
              </b-form-checkbox></b-dropdown-form
            >
          </b-dropdown>
          <b-dropdown
            text="形式 Format"
            variant="outline-primary"
            v-if="isNeedSortFunction"
          >
            <b-dropdown-form
              v-for="(option, index) in formatOption"
              :key="index"
              ><b-form-checkbox
                v-model="formatCheckboxStatus[index]"
                :value="option"
                @input="updateFormat"
              >
                {{ option }}
              </b-form-checkbox></b-dropdown-form
            >
          </b-dropdown>
        </div>
        <div class="search">
          <b-form-input
            id="search"
            :value="keyword"
            @input="updateKeyword($event)"
            trim
            placeholder="Search..."
          ></b-form-input>
          <label for="search">搜尋 Search</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListHeader",
  props: {
    keyword: {
      type: String
    },
    topicOptions: {
      type: Array
    },
    topic: {
      type: Array
    },
    formatOption: {
      type: Array
    },
    format: {
      type: Array
    },
    mode: {
      type: String
    },
    isNeedModeSwitch: {
      type: Boolean
    },
    isNeedSortFunction: {
      type: Boolean
    }
  },
  data() {
    return {
      topicCheckboxStatus: [],
      formatCheckboxStatus: []
    };
  },
  created() {
    // 依照來自 route 的 queryString 設定初始資料
    if (this.isNeedSortFunction) {
      this.topicCheckboxStatus = new Array(this.topic.length).fill(false);
      this.topicOptions.forEach((item, index) => {
        if (this.topic.includes(item)) {
          this.topicCheckboxStatus[index] = item;
        }
      });
      this.formatCheckboxStatus = new Array(this.format.length).fill(false);
      this.formatOption.forEach((item, index) => {
        if (this.format.includes(item)) {
          this.formatCheckboxStatus[index] = item;
        }
      });
    }
  },
  methods: {
    updateKeyword(value) {
      this.$emit("updateKeyword", value);
      this.$emit("updateCurrentPage", 1);
    },
    updateTopic() {
      let updateValue = this.topicCheckboxStatus.filter(item => item !== false);
      this.$emit("updateTopic", updateValue);
      this.$emit("updateCurrentPage", 1);
    },
    updateFormat() {
      let updateValue = this.formatCheckboxStatus.filter(
        item => item !== false
      );
      this.$emit("updateFormat", updateValue);
      this.$emit("updateCurrentPage", 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  padding: 30px;
  background-color: $sub-color;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include mediaquery_medium_devices {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  h2,
  .switch {
    width: 100%;
    @include mediaquery_medium_devices {
      width: 50%;
    }
  }
  h2 {
    color: #fff;
    font-size: 25px;
    margin: 0 0 10px;
    text-align: center;
    @include mediaquery_medium_devices {
      text-align: left;
      margin: 0;
    }
  }
  .switch {
    display: flex;
    justify-content: center;
    @include mediaquery_medium_devices {
      justify-content: flex-end;
    }
    .item {
      width: 190px;
      padding: 8px;
      border: 1px solid white;
      cursor: pointer;
      color: #fff;
      &:first-child {
        border-radius: 8px 0 0 8px;
      }
      &:last-child {
        border-radius: 0 8px 8px 0;
      }
      svg {
        margin-right: 5px;
      }
      &.active {
        background-color: #fff;
        color: #000;
      }
    }
  }
}
.function {
  display: flex;
  flex-direction: column;
  @include mediaquery_pad {
    flex-direction: row;
    justify-content: space-between;
  }
  .sort,
  .search {
    width: 100%;
    @include mediaquery_pad {
      width: 50%;
    }
  }
  .sort {
    // text-align: left;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    @include mediaquery_pad {
      flex-direction: row;
      margin-bottom: 0;
    }
    .dropdown:first-child {
      margin-bottom: 10px;
      @include mediaquery_pad {
        margin-bottom: 0;
        margin-right: 10px;
      }
    }
    .dropdown {
      width: 200px;
    }
    ::v-deep .dropdown-menu {
      width: 300px;
      @include mediaquery_pad {
        width: 350px;
      }
    }
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    @include mediaquery_pad {
      justify-content: flex-end;
    }
    label {
      margin: 0;
    }
    #search {
      width: 12rem;
      max-width: 80vw;
      margin-right: 5px;
    }
  }
}
</style>
