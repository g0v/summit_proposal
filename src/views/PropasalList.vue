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
      :perPage="perPage"
      :currentPage="currentPage"
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

const ITEM_PER_PAGE = 12;

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
      perPage: ITEM_PER_PAGE
    };
  },
  computed: {
    listByKeywordFilter() {
      let listByKeywordFilter = this.$store.getters.displayProjectList.filter(
        project => {
          let lastVersion = project.versions[project.versions.length - 1];
          // 支援標題與內文搜尋
          let title =
            lastVersion.title
              .toLowerCase()
              .search(this.keyword.toLowerCase()) != -1;
          let title_en =
            lastVersion.title_en
              .toLowerCase()
              .search(this.keyword.toLowerCase()) != -1;
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
    },
    listByPage() {
      return this.listByKeywordFilter.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
    keyword() {
      const keyword = this.$route.query.q || "";
      return keyword.trim();
    },
    currentPage() {
      const page = Number.parseInt(this.$route.query.page || 1, 10);
      return page > 0 ? page : 1;
    }
  },
  watch: {
    listByKeywordFilter(newList) {
      const page = this.currentPage;
      const perPage = this.perPage;
      if (newList.length < (page - 1) * perPage) {
        this.switchPage(1, true);
      }
    }
  },
  methods: {
    updateUrlCursor({ page, keyword, replaceRoute }) {
      const route = this.$router;
      page = page || this.currentPage;
      keyword = keyword === undefined ? this.keyword : keyword;
      const query = { page };
      if (keyword) {
        query.q = keyword;
      }
      const newRoute = {
        name: route.name,
        query
      };
      if (replaceRoute) {
        this.$router.replace(newRoute);
      } else {
        this.$router.push(newRoute);
      }
    },
    switchPage(page, replaceRoute = false) {
      if (page !== this.currentPage) {
        // just in case someone pass invalid stuff
        replaceRoute = replaceRoute === true;
        this.updateUrlCursor({ page, replaceRoute });
      }
    },
    setKeyword(keyword) {
      if (keyword !== this.keyword) {
        this.updateUrlCursor({ keyword });
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
