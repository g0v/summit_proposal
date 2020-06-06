<template>
  <div class="list-header">
    <div class="list-header-container container">
      <h2>提案列表 Proposals</h2>
      <div class="search">
        <b-form-group label="搜尋提案 Search proposals" label-for="search">
          <b-form-input
            id="search"
            :value="keyword"
            @input="updateKeyword($event)"
            trim
            placeholder="請輸入標題 Type title to search "
          ></b-form-input>
        </b-form-group>
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
    }
  },
  methods: {
    updateKeyword(value) {
      this.$emit("updateKeyword", value);
      this.$emit("updateCurrentPage", 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-header-container {
  padding: 30px;
  background-color: $sub-color;
  border-radius: 10px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  h2 {
    color: #fff;
    font-size: 25px;
  }
  .search {
    display: flex;
    align-items: center;
    svg {
      margin-left: 10px;
      cursor: pointer;
    }
  }
  ::v-deep .form-group {
    margin-bottom: 0;
  }
  #search {
    width: 18rem;
    max-width: 80vw;
  }
}
</style>
