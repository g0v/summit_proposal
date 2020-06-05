<template>
  <section class="proposal-edit">
    <div class="proposal-edit-container container">
      <ProposalFormHeader />
      <ProposalForm :id="$route.params.id" />
    </div>
  </section>
</template>

<script>
import ProposalForm from "@/components/proposalForm/ProposalForm.vue";
import ProposalFormHeader from "@/components/proposalForm/ProposalFormHeader.vue";

export default {
  name: "ProposalEdit",
  components: { ProposalForm, ProposalFormHeader },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.getters.isLoggedIn) {
        vm.$router.push({ name: "Homepage" });
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.proposal-edit-container {
  padding: 45px 0;
}
</style>
