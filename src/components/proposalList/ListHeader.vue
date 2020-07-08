<template>
  <div class="list-header">
    <div class="container">
      <div class="title">
        <h2>提案列表 Proposals</h2>
      </div>
      <div class="function">
        <div class="sort">
          <b-dropdown text="主題分類 Topic" variant="outline-primary">
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
          <b-dropdown text="形式 Format" variant="outline-primary">
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
  h2 {
    color: #fff;
    font-size: 25px;
    margin: 0;
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
    text-align: right;
    margin-bottom: 20px;
    @include mediaquery_pad {
      text-align: left;
      margin-bottom: 0;
    }
    .dropdown:first-child {
      margin-right: 10px;
    }
    ::v-deep .dropdown-menu {
      width: 300px;
    }
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
