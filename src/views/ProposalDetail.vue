<template>
  <section class="proposal-detail">
    <div class="loading-container container" v-if="!isProjectReady">
      <div class="loading">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
    <template v-else>
      <DetailHeader :projectDetail="$store.getters.projectDetail" />
      <DetailContent
        :projectDetail="$store.getters.projectDetail"
        @openVersionDetailLightboxOpen="openVersionDetailLightboxOpen"
      />
    </template>
    <VersionDetailLightbox
      :isVersionDetailLightboxOpen="isVersionDetailLightboxOpen"
      v-if="isVersionDetailLightboxOpen"
      @close="isVersionDetailLightboxOpen = false"
      :versionData="$store.getters.projectDetail.versions[openVersionIndex]"
    />
  </section>
</template>

<script>
import DetailHeader from "@/components/proposalDetail/DetailHeader.vue";
import DetailContent from "@/components/proposalDetail/DetailContent.vue";
import VersionDetailLightbox from "@/components/proposalDetail/VersionDetailLightbox.vue";

import { handleApiError, addMetaData } from "@/utils/mixins";

export default {
  name: "ProposalDetail",
  components: { DetailHeader, DetailContent, VersionDetailLightbox },
  mixins: [handleApiError, addMetaData],
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      vm.addMetaData(to.name);
      await vm.handleApiError(
        vm.$store.dispatch("getDetailProject", to.params.id)
      );
      let latestVersion =
        vm.$store.getters.projectDetail.versions[
          vm.$store.getters.projectDetail.versions.length - 1
        ];
      vm.addAPIMetaData(
        `g0v 雙年會 2020 議程徵集 - ${latestVersion.title}`,
        latestVersion.summary
      );
    });
  },
  data() {
    return {
      isVersionDetailLightboxOpen: false,
      openVersionIndex: 0
    };
  },
  computed: {
    isProjectReady() {
      const detail = this.$store.getters.projectDetail;
      return detail && detail._id && detail.versions.length > 0;
    }
  },
  methods: {
    openVersionDetailLightboxOpen(index) {
      this.isVersionDetailLightboxOpen = true;
      this.openVersionIndex = index;
    },
    addAPIMetaData(title, description) {
      document.title = title;

      let head = document.querySelector("head");
      let oldDescriptionMeta = document.querySelector("meta[name=description]");
      if (oldDescriptionMeta) {
        oldDescriptionMeta.remove();
      }
      let newOldDescriptionMeta = document.createElement("meta");
      newOldDescriptionMeta.setAttribute("name", "description");
      newOldDescriptionMeta.setAttribute("content", description);
      head.appendChild(newOldDescriptionMeta);

      // 社群系列
      let addMeta = [
        { property: "og:title", content: title },
        { property: "og:description", content: description }
      ];
      addMeta.forEach(meta => {
        let oldMeta = document.querySelector(
          `meta[property='${meta.property}']`
        );
        if (oldMeta) {
          oldMeta.remove();
        }
        let createMeta = document.createElement("meta");
        createMeta.setAttribute("property", `${meta.property}`);
        createMeta.setAttribute("content", `${meta.content}`);
        head.appendChild(createMeta);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.proposal-detail {
  padding: 60px 0 45px;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 190px);
}
.loading {
  height: 50px;
  display: flex;
  align-items: flex-end;
  .line {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: $main-color;
    margin: 0 3px;
    &:nth-child(1) {
      animation: loadingAnimation 1.5s 0s infinite;
    }
    &:nth-child(2) {
      animation: loadingAnimation 1.5s 0.5s infinite;
    }
    &:nth-child(3) {
      animation: loadingAnimation 1.5s 1s infinite;
    }
  }
}

@keyframes loadingAnimation {
  0% {
    height: 15px;
  }
  50% {
    height: 50px;
  }
  100% {
    height: 15px;
  }
}
</style>
