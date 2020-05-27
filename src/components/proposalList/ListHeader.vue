<template>
  <div class="list-header">
    <div class="list-header-container container">
      <h2>提案列表</h2>
      <div class="search">
        <b-form-group label="搜尋提案" label-for="search">
          <b-form-input id="search" v-model="search" trim></b-form-input>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListHeader",
  data() {
    return {
      search: ""
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
  ::v-deep .form-group {
    margin-bottom: 0;
  }
}
</style>
