<template>
  <div class="list-header">
    <div class="container">
      <div class="title">
        <h2>提案列表 Proposals</h2>
      </div>
      <div class="function">
        <div class="sort">
          <b-dropdown
            text="主題分類 Topic"
            variant="outline-primary"
            ref="topicdropdown"
          >
            <b-dropdown-form
              v-for="(option, index) in topicOptions"
              :key="index"
              ><b-form-checkbox
                v-model="topicCheckboxStatus[index]"
                :value="option"
                @input="updateTopic(option)"
              >
                {{ option }}
              </b-form-checkbox></b-dropdown-form
            >
          </b-dropdown>
          <!-- <b-dropdown text="Dropdown Button" variant="outline-primary">
            <b-dropdown-item>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
          </b-dropdown> -->
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
    }
  },
  data() {
    return {
      topicCheckboxStatus: []
    };
  },
  created() {
    this.topicCheckboxStatus = new Array(this.topic.length).fill(false);
    this.topicOptions.forEach((item, index) => {
      if (this.topic.includes(item)) {
        this.topicCheckboxStatus[index] = item;
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
      this.$emit("updateTopic", updateValue.join(","));
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
  justify-content: space-between;
  .sort,
  .search {
    width: 50%;
  }
  .search {
    display: flex;
    align-items: center;
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
</style>
