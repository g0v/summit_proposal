<template>
  <section class="propasal-list">
    <ListHeader />
    <List />
  </section>
</template>

<script>
import ListHeader from "@/components/proposalList/ListHeader.vue";
import List from "@/components/proposalList/List.vue";

export default {
  name: "PropasalList",
  components: { ListHeader, List }
};
</script>
<style lang="scss" scoped>
.propasal-list {
  padding: 45px 0;
}
</style>
