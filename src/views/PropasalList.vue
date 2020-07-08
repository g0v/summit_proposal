<template>
  <section class="propasal-list">
    <ListHeader
      :keyword="keyword"
      :topicOptions="topicOptions"
      :topic="topic"
      @updateKeyword="setKeyword"
      @updateTopic="setTopic"
      @updateCurrentPage="switchPage"
    />
    <ListPagination
      v-if="listByKeywordFilter.length"
      :perPage="perPage"
      :currentPage="currentPage"
      :allDataLength="listByKeywordFilter.length"
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
const TOPIC_OPTIONS = [
  "「沒有人」的島 Nobody’s island",
  "島嶼大聯盟 Island’s federation",
  "大島開放 Open island",
  "沒有島是局外島 No island is outside island",
  "第四個島 The fourth island",
  "賢者之島 Academia Formosa",
  "海海人聲 Voice of the islanders"
];

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
      perPage: ITEM_PER_PAGE,
      topicOptions: TOPIC_OPTIONS
    };
  },
  computed: {
    listByKeywordFilter() {
      let listByKeywordFilter = this.$store.getters.displayProjectList.filter(
        project => {
          let lastVersion = project.versions[project.versions.length - 1];
          // 支援標題搜尋
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
          // 支援過濾主題
          let topicfilter =
            this.topic.length !== 0
              ? this.topic.includes(lastVersion.topic)
              : true;
          return [title, title_en, summary, summary_en].includes(
            true && topicfilter
          );
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
    topic() {
      const topic = this.$route.query.topic
        ? this.$route.query.topic.split(",")
        : [];
      return topic;
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
    updateUrlCursor({ page, keyword, topic, replaceRoute }) {
      const route = this.$router;
      page = page || this.currentPage;
      keyword = keyword === undefined ? this.keyword : keyword;
      topic = topic === undefined ? this.topic : topic;
      const query = { page };
      if (keyword) {
        query.q = keyword;
      }
      if (topic) {
        query.topic = topic;
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
    },
    setTopic(topic) {
      if (topic !== this.topic) {
        this.updateUrlCursor({ topic });
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
