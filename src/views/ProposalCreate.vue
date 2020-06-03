<template>
  <section class="proposal-create">
    <div class="proposal-create-container container">
      <ProposalFormHeader :is-creation="true" />
      <ProposalForm v-if="projectId" :id="projectId" @done="finishCreate" />
    </div>
  </section>
</template>

<script>
import { handleApiError } from "@/utils/mixins";

import ProposalForm from "@/components/proposalForm/ProposalForm.vue";
import ProposalFormHeader from "@/components/proposalForm/ProposalFormHeader.vue";

// Store project id in local storage,
// so we can retrieve project info during unexpected corruption
// this id will be destroyed after user save project
const CUR_PROJECT_ID_KEY = "summit-cur-project-id";

export default {
  name: "ProposalCreate",
  components: { ProposalForm, ProposalFormHeader },
  mixins: [handleApiError],
  data() {
    return {
      projectId: null
    };
  },
  async created() {
    const existingId = localStorage.getItem(CUR_PROJECT_ID_KEY);
    if (existingId) {
      this.projectId = existingId;
    } else {
      this.projectId = await this.handleApiError(
        this.$store.dispatch("createEmptyProject")
      );
      localStorage.setItem(CUR_PROJECT_ID_KEY, this.projectId);
    }
  },
  methods: {
    finishCreate() {
      localStorage.setItem(CUR_PROJECT_ID_KEY, "");
    }
  }
};
</script>
<style lang="scss" scoped>
.proposal-create-container {
  padding: 45px 0;
  .title {
    position: relative;
    top: 20px;
    background-color: $sub-color;
    padding: 50px 0;
    z-index: 1;
    border-radius: 10px;
    h2 {
      color: #fff;
      margin-bottom: 5px;
    }
    span {
      color: #ffffff7d;
    }
  }
}
</style>
