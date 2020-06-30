<template>
  <section class="proposal-edit">
    <div class="proposal-edit-container container">
      <ProposalFormHeader />
      <ProposalForm :id="$route.params.id" @access-denied="handleUnauthVisit" />
    </div>
  </section>
</template>

<script>
import ProposalForm from "@/components/proposalForm/ProposalForm.vue";
import ProposalFormHeader from "@/components/proposalForm/ProposalFormHeader.vue";
import { addMetaData } from "@/utils/mixins";

export default {
  name: "ProposalEdit",
  components: { ProposalForm, ProposalFormHeader },
  mixins: [addMetaData],
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.addMetaData(to.name);
      if (!vm.$store.getters.isLoggedIn) {
        vm.$router.push({ name: "Homepage" });
      }
    });
  },
  methods: {
    handleUnauthVisit() {
      this.$router.push("/proposal-list");
    }
  }
};
</script>
<style lang="scss" scoped>
.proposal-edit-container {
  padding: 45px 0;
}
</style>
