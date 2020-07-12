<template>
  <section class="propasal-list">
    <ListHeader
      :keyword="keyword"
      :isNeedModeSwitch="false"
      :isNeedSortFunction="false"
      @updateKeyword="keyword = $event"
      @updateCurrentPage="paginationData.currentPage = $event"
    />
    <CardList
      :list="listByPage"
      routerName="ProposalEdit"
      :displayDraftNotice="true"
    />
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
import CardList from "@/components/proposalList/CardList.vue";
import ListPagination from "@/components/proposalList/ListPagination.vue";

import { handleApiError, addMetaData } from "@/utils/mixins";

export default {
  name: "PropasalManageList",
  mixins: [handleApiError, addMetaData],
  components: { ListHeader, CardList, ListPagination },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      vm.addMetaData(to.name);
      if (!vm.$store.getters.isLoggedIn) {
        vm.$router.push({ name: "Homepage" });
      }
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
            let title =
              lastVersion.title
                .toLowerCase()
                .search(this.keyword.toLowerCase()) != -1;
            let title_en =
              lastVersion.title_en
                .toLowerCase()
                .search(this.keyword.toLowerCase()) != -1;
            // 支援內文搜尋
            let summary =
              lastVersion.summary
                .toLowerCase()
                .search(this.keyword.toLowerCase()) != -1;
            let summary_en =
              lastVersion.summary_en
                .toLowerCase()
                .search(this.keyword.toLowerCase()) != -1;
            return [title, title_en, summary, summary_en].includes(true);
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
  min-height: calc(100vh - 80px);
}
</style>
