<template>
  <section class="propasal-list">
    <ListHeader
      :keyword="keyword"
      @updateKeyword="keyword = $event"
      @updateCurrentPage="paginationData.currentPage = $event"
    />
    <List :list="listByPage" routerName="ProposalDetail" />
    <ListPagination
      :perPage="paginationData.perPage"
      :currentPage="paginationData.currentPage"
      :allDataLength="listByKeywordFilter.length"
      @updateCurrentPage="paginationData.currentPage = $event"
    />
  </section>
</template>

<script>
import ListHeader from "@/components/proposalList/ListHeader.vue";
import List from "@/components/proposalList/List.vue";
import ListPagination from "@/components/proposalList/ListPagination.vue";

import { handleApiError, addMetaData } from "@/utils/mixins";

export default {
  name: "PropasalList",
  mixins: [handleApiError, addMetaData],
  components: { ListHeader, List, ListPagination },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      vm.addMetaData(to.name);
      await vm.handleApiError(vm.$store.dispatch("listProjects"));
    });
  },
  data() {
    return {
      keyword: "",
      paginationData: {
        currentPage: 1,
        perPage: 12
      }
    };
  },
  computed: {
    listByKeywordFilter() {
      let listByKeywordFilter = this.$store.getters.displayProjectList.filter(
        project => {
          let lastVersion = project.versions[project.versions.length - 1];
          return (
            lastVersion.title
              .toLowerCase()
              .search(this.keyword.toLowerCase()) != -1 ||
            lastVersion.title_en
              .toLowerCase()
              .search(this.keyword.toLowerCase()) != -1
          );
        }
      );
      return listByKeywordFilter;
    },
    listByPage() {
      return this.listByKeywordFilter.slice(
        (this.paginationData.currentPage - 1) * this.paginationData.perPage,
        this.paginationData.currentPage * this.paginationData.perPage
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.propasal-list {
  padding: 45px 0;
  min-height: calc(100vh - 80px);
}
</style>
