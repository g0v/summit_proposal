<template>
  <section>
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
