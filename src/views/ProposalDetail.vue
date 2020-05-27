<template>
  <section class="proposal-detail">
    <ProposalDetailHeader />
    <ProposalDetailContent />
  </section>
</template>

<script>
import ProposalDetailHeader from "@/components/propodalDetail/ProposalDetailHeader.vue";
import ProposalDetailContent from "@/components/propodalDetail/ProposalDetailContent.vue";

export default {
  name: "ProposalDetail",
  components: { ProposalDetailHeader, ProposalDetailContent }
};
</script>
