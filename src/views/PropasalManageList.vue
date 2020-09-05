<template>
  <section class="propasal-list">
    <ListHeader
      :keyword="keyword"
      :isNeedModeSwitch="false"
      :isNeedSortFunction="false"
      @updateKeyword="keyword = $event"
      @updateCurrentPage="paginationData.currentPage = $event"
    />
    <div
      class="propasal-list__warning mv3 pa3 center br3 bg-light-yellow"
      v-if="hasEditableItem"
    >
      編輯時限已到，僅能編輯已錄取的提案。<br />
      Only accepted proposal are editable due to exceed deadline.
    </div>
    <div
      class="propasal-list__warning mv3 pa3 center br3 bg-light-yellow"
      v-else
    >
      編輯時限已到，無法再編修稿件。<br />
      Unable to edit proposal due to exceed deadline.
    </div>
    <CardList :list="projects" :isEditable="true" :displayDraftNotice="true" />
    <!--
    <ListPagination
      :perPage="paginationData.perPage"
      :currentPage="paginationData.currentPage"
      :allDataLength="listByKeywordFilter.length"
      @updateCurrentPage="paginationData.currentPage = $event"
    />
    -->
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import ListHeader from "@/components/proposalList/ListHeader.vue";
import CardList from "@/components/proposalList/CardList.vue";
// import ListPagination from "@/components/proposalList/ListPagination.vue";

import { handleApiError, addMetaData } from "@/utils/mixins";

export default {
  name: "PropasalManageList",
  mixins: [handleApiError, addMetaData],
  components: { ListHeader, CardList },
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
      projects: [],
      keyword: ""
      // paginationData: {
      //   currentPage: 1,
      //   perPage: 12
      // }
    };
  },
  computed: {
    ...mapGetters(["myProjectList"]),
    // listByKeywordFilter() {
    //   if (this.keyword) {
    //     let listByKeywordFilter = this.$store.getters.myProjectList.filter(
    //       project => {
    //         let lastVersion = project.versions[project.versions.length - 1];
    //         if (!lastVersion) return false;
    //         let title =
    //           lastVersion.title
    //             .toLowerCase()
    //             .search(this.keyword.toLowerCase()) != -1;
    //         let title_en =
    //           lastVersion.title_en
    //             .toLowerCase()
    //             .search(this.keyword.toLowerCase()) != -1;
    //         // 支援內文搜尋
    //         let summary =
    //           lastVersion.summary
    //             .toLowerCase()
    //             .search(this.keyword.toLowerCase()) != -1;
    //         let summary_en =
    //           lastVersion.summary_en
    //             .toLowerCase()
    //             .search(this.keyword.toLowerCase()) != -1;
    //         return [title, title_en, summary, summary_en].includes(true);
    //       }
    //     );
    //     return listByKeywordFilter;
    //   } else {
    //     return this.$store.getters.myProjectList;
    //   }
    // },
    // listByPage() {
    //   return this.listByKeywordFilter.slice(
    //     (this.paginationData.currentPage - 1) * this.paginationData.perPage,
    //     this.paginationData.currentPage * this.paginationData.perPage
    //   );
    // },
    hasEditableItem() {
      return this.projects.some(item => item.selected);
    }
  },
  watch: {
    myProjectList() {
      this.getMyRealProjectList();
    }
  },
  created() {
    // always reload this on init, so we get latest version
    this.getMyRealProjectList();
  },
  methods: {
    async getMyRealProjectList() {
      // use `/project/<id>` instead of `/projects`
      // so to get list of version, instead of last verified
      const projectIds = this.myProjectList.map(project => project._id);
      const allProjects = await Promise.all(
        projectIds.map(id => this.$store.dispatch("getDetailProject", id))
      );
      this.projects = allProjects;
    }
  }
};
</script>
<style lang="scss" scoped>
.propasal-list {
  padding: 45px 0;
  min-height: calc(100vh - 80px);

  &__warning {
    max-width: 1280px;
  }

  .list-header ::v-deep .function {
    display: none;
  }
}
</style>
