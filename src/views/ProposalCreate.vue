<template>
  <section class="proposal-create">
    <div class="proposal-create-container container">
      <ProposalFormHeader title="創建提案" />
      <ProposalForm />
    </div>
  </section>
</template>

<script>
import ProposalForm from "@/components/proposalForm/ProposalForm.vue";
import ProposalFormHeader from "@/components/proposalForm/ProposalFormHeader.vue";

export default {
  name: "ProposalCreate",
  components: { ProposalForm, ProposalFormHeader }
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
