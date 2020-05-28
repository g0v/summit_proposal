<template>
  <div class="porposal-form-header">
    <h2>創建提案</h2>
    <span>2020 g0v summit proposal</span>
  </div>
</template>

<script>
export default {
  name: "ProposalFormHeader",
  props: {
    title: {
      type: String,
      require: true
    }
  }
};
</script>

<style lang="scss" scoped>
.porposal-form-header {
  position: relative;
  top: 20px;
  background-color: $sub-color;
  padding: 50px 0;
  z-index: 1;
  border-radius: 10px;
  h2 {
    color: #fff;
    margin-bottom: 5px;
  }
  span {
    color: #ffffff7d;
  }
}
</style>
