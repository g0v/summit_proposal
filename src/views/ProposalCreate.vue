<template>
  <section class="proposal-create">
    <div class="proposal-create-container container">
      <div class="title">
        <h2>創建提案</h2>
        <span>2020 g0v summit proposal</span>
      </div>
      <ProposalForm />
    </div>
  </section>
</template>

<script>
import ProposalForm from "@/components/ProposalForm.vue";
export default {
  name: "ProposalCreate",
  components: { ProposalForm }
};
</script>
<style lang="scss" scoped>
.proposal-create-container {
  padding: 45px 0;
  .title {
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
}
</style>
