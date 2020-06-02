<template>
  <section class="propasal-list">
    <ListHeader @updateKeyword="keyword = $event" />
    <List :list="listByKeywordFilter" routerName="ProposalDetail" />
  </section>
</template>

<script>
import ListHeader from "@/components/proposalList/ListHeader.vue";
import List from "@/components/proposalList/List.vue";
import { handleApiError } from "@/utils/mixins";

export default {
  name: "PropasalList",
  mixins: [handleApiError],
  components: { ListHeader, List },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      await vm.handleApiError(vm.$store.dispatch("listProjects"));
    });
  },
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    listByKeywordFilter() {
      let listByKeywordFilter = this.$store.getters.displayProjectList.filter(
        project => {
          let lastVersion = project.versions[project.versions.length - 1];
          return lastVersion.title.search(this.keyword) != -1;
        }
      );
      return listByKeywordFilter;
    }
  }
};
</script>
<style lang="scss" scoped>
.propasal-list {
  padding: 45px 0;
  background-image: url("../assets/images/bg.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  min-height: calc(100vh - 80px);
}
</style>
