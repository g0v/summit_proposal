<template>
  <div class="list-header">
    <div class="container">
      <div class="title">
        <h2>提案列表 Proposals</h2>
      </div>
      <div class="function">
        <div class="sort"></div>
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
  padding-left: calc(15px + 1.5%);
  padding-right: calc(15px + 1.5%);
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
