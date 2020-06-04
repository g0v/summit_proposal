<template>
  <section class="propasal-list">
    <ListHeader
      :keyword="keyword"
      @updateKeyword="keyword = $event"
      @updateCurrentPage="paginationData.currentPage = $event"
    />
    <List :list="listByPage" routerName="ProposalEdit" />
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

import { handleApiError } from "@/utils/mixins";

export default {
  name: "PropasalManageList",
  mixins: [handleApiError],
  components: { ListHeader, List, ListPagination },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
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
      if (this.keyword) {
        let listByKeywordFilter = this.$store.getters.myProjectList.filter(
          project => {
            let lastVersion = project.versions[project.versions.length - 1];
            if (!lastVersion) return false;
            return (
              lastVersion.title.search(this.keyword) != -1 ||
              lastVersion.title_en.search(this.keyword) != -1
            );
          }
        );
        return listByKeywordFilter;
      } else {
        return this.$store.getters.myProjectList;
      }
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
  background-image: url("../assets/images/bg.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  min-height: calc(100vh - 80px);
}
</style>
