<template>
  <div class="list-header">
    <div class="list-header-container container">
      <h2>提案列表</h2>
      <div class="search">
        <b-form-input id="search" v-model="keyword" trim></b-form-input>
        <b-icon
          icon="search"
          variant="secondary"
          font-scale="2"
          @click="$emit('updateKeyword', keyword)"
        ></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListHeader",
  data() {
    return {
      keyword: ""
    };
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
}
</style>
