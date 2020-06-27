<template>
  <section class="propasal-list">
    <ListHeader
      :keyword="keyword"
      @updateKeyword="setKeyword"
      @updateCurrentPage="switchPage"
    />
    <List :list="listByPage" routerName="ProposalDetail" />
    <ListPagination
      v-if="listByKeywordFilter.length"
      :perPage="paginationData.perPage"
      :currentPage="paginationData.currentPage"
      :allDataLength="listByKeywordFilter.length"
      @updateCurrentPage="switchPage"
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
    const keyword = this.$route.query.q || "";
    const page = Number.parseInt(this.$route.query.page || 1, 10);
    return {
      keyword: keyword.trim(),
      paginationData: {
        currentPage: page > 0 ? page : 1,
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
  },
  watch: {
    listByKeywordFilter(newList) {
      const page = this.paginationData.currentPage;
      const perPage = this.paginationData.perPage;
      if (newList.length < (page - 1) * perPage) {
        this.switchPage(1);
      }
    }
  },
  methods: {
    updateUrlCursor() {
      const route = this.$router;
      const query = {
        page: this.paginationData.currentPage
      };
      if (this.keyword) {
        query.q = this.keyword;
      }
      this.$router.push({
        name: route.name,
        query
      });
    },
    switchPage(page) {
      if (page !== this.paginationData.currentPage) {
        this.paginationData.currentPage = page;
        this.updateUrlCursor();
      }
    },
    setKeyword(keyword) {
      if (keyword !== this.keyword) {
        this.keyword = keyword;
        this.updateUrlCursor();
      }
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
