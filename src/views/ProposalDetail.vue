<template>
  <section class="proposal-detail">
    <DetailHeader />
    <DetailContent />
  </section>
</template>

<script>
import DetailHeader from "@/components/propodalDetail/DetailHeader.vue";
import DetailContent from "@/components/propodalDetail/DetailContent.vue";

export default {
  name: "ProposalDetail",
  components: { DetailHeader, DetailContent }
};
</script>
<style lang="scss" scoped>
.proposal-detail {
  padding: 45px 0;
}
</style>
