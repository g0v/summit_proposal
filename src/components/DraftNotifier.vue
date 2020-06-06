<template>
  <div
    class="br2 tl bg-light-red white pv2 ph3 inline-flex items-center"
    v-if="hasDraft"
  >
    <div class="mr2 f4">
      <b-icon-exclamation-triangle />
    </div>
    <div class="flex-auto">
      提案還有未提交的內容！<br />
      Part of content not submitted!
    </div>
  </div>
</template>
<script>
export default {
  props: {
    proposal: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasDraft() {
      const draft = this.proposal.draft || {};
      return Object.keys(draft).length > 0;
    }
  }
};
</script>
