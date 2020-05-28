<template>
  <section class="proposal-detail">
    <DetailHeader />
    <DetailContent />
  </section>
</template>

<script>
import DetailHeader from "@/components/proposalDetail/DetailHeader.vue";
import DetailContent from "@/components/proposalDetail/DetailContent.vue";

export default {
  name: "ProposalDetail",
  components: { DetailHeader, DetailContent }
};
</script>
<style lang="scss" scoped>
.proposal-detail {
  padding: 60px 0 45px;
}
</style>
