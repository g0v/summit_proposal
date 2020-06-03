<template>
  <section class="proposal-edit">
    <div class="proposal-edit-container container">
      <ProposalFormHeader />
      <ProposalForm />
    </div>
  </section>
</template>

<script>
import ProposalForm from "@/components/proposalForm/ProposalForm.vue";
import ProposalFormHeader from "@/components/proposalForm/ProposalFormHeader.vue";

export default {
  name: "ProposalEdit",
  components: { ProposalForm, ProposalFormHeader }
};
</script>
<style lang="scss" scoped>
.proposal-edit-container {
  padding: 45px 0;
}
</style>
