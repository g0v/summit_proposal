<template>
  <div class="porposal-form-header">
    <template v-if="isCreation">
      <h2>投稿 Submit a proposal</h2>
    </template>
    <template v-else>
      <h2>編輯投稿 Edit your proposal</h2>
    </template>
  </div>
</template>

<script>
export default {
  name: "ProposalFormHeader",
  props: {
    isCreation: {
      type: Boolean,
      default: false
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
