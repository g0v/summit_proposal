<template>
  <div class="adminlist pa3 pv0-l mv4 center tl">
    <h2 class="adminlist__header pa4 white br3 f3 mv3">
      審核更新
    </h2>
    <div class="mv3" v-if="projectsToBeReviews.length">
      <h3 class="mv3 f4">待審核的稿件 x {{ projectsToBeReviews.length }}</h3>
      <project-reviewer
        v-for="project in projectsToBeReviews"
        :key="project._id"
        :project="project"
        :open-on-init="project._id === targetProjectId"
      />
    </div>
    <div class="mv3" v-if="projectsVerified.length">
      <h3 class="mv3 f4">其他已錄取的稿件</h3>
      <project-reviewer
        v-for="project in projectsVerified"
        :key="project._id"
        :project="project"
        :open-on-init="project._id === targetProjectId"
      />
    </div>
  </div>
</template>
<script>
import { handleApiError, addMetaData } from "@/utils/mixins";
import ProjectReviewer from "@/components/proposalAdmin/ProjectReviewer";

export default {
  name: "ProposalAdminList",
  mixins: [handleApiError, addMetaData],
  components: {
    ProjectReviewer
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      vm.addMetaData(to.name);
      if (!vm.$store.getters.isLoggedIn) {
        vm.$router.push({ name: "Homepage" });
      }
      await vm.handleApiError(vm.$store.dispatch("listProjects"));
    });
  },
  computed: {
    targetProjectId() {
      return this.$route.query.id || "";
    },
    acceptedProjects() {
      return this.$store.getters.displayProjectList.filter(
        // also check verify object, as we need it to show project info
        project => project.selected && project.verify
      );
    },
    projectsToBeReviews() {
      return this.acceptedProjects.filter(project => !!project.verify.current);
    },
    projectsVerified() {
      return this.acceptedProjects.filter(project => !project.verify.current);
    }
  }
};
</script>
<style lang="scss" scoped>
.adminlist {
  max-width: 80rem;
  &__header {
    background: #1b1b1b;
  }
}
</style>
