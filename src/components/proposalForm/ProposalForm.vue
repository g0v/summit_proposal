<template>
  <div class="proposal form-container" v-if="!isOnInit">
    <b-form @submit="onSubmit">
      <h2 class="h2">稿件資訊 Proposal Information</h2>
      <div class="mv3 pa3 center br3 bg-light-yellow">
        注意：在提交編輯後，仍須經審核確認，才會完成更新，以確保相關工作的完整性。<br />
        Notice: All futher modification will be reviewed by g0v Summit before
        published, so to ensure all related people get informed.
      </div>
      <form-field
        v-for="field in fieldDefinitions"
        :key="field.id"
        :definition="field"
        :other-value="proposalContent[field.otherId] || ''"
        @other-input="handleOther"
        @valid-change="handleValidChange"
        v-model="proposalContent[field.id]"
      ></form-field>
      <div class="proposal__speakers-wrapper">
        <speaker-form
          :max-speakers="maxSpeakers"
          :init-speakers="speakers"
          @change="updateSpeakers"
          @valid-change="handleValidChange"
        ></speaker-form>
      </div>
      <div class="mv3 pa3 center br3 bg-light-yellow">
        注意：在提交編輯後，仍須經審核確認，才會完成更新，以確保相關工作的完整性。<br />
        Notice: All futher modification will be reviewed by g0v Summit before
        published, so to ensure all related people get informed.
      </div>
      <b-button
        type="submit"
        variant="danger"
        size="lg"
        v-if="isHaveAnyVersion"
      >
        提交投稿 Submit Proposal
      </b-button>
      <b-button
        class="proposal__nosubmit"
        disabled
        variant="danger"
        size="lg"
        v-else
      >
        投稿已截止 Submission closed
      </b-button>
    </b-form>
  </div>
</template>
<script>
// import { ValidationProvider } from "vee-validate";
import _ from "lodash";
import { handleApiError } from "@/utils/mixins";
import {
  CONTENT_FIELD_DEFINITIONS,
  ORAL_LANGUAGE_OPTIONS,
  FORMAT_OPTIONS
} from "@/utils/projectFields";
import SpeakerForm from "./SpeakerForm";
import FormField from "./FormField";

// backup every 30 seconds
const BACKUP_PERIOD = 30 * 1000;

export default {
  name: "ProposalForm",
  components: {
    // ValidationProvider,
    SpeakerForm,
    FormField
  },
  mixins: [handleApiError],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      proposalContent: {
        title: "",
        title_en: "",
        summary: "",
        summary_en: "",
        oral_language: "",
        oral_languate_other: "",
        format: "",
        topic: "",
        three_keywords: "",
        cover_image: "",
        is_content_cc40: null,
        is_presentation_cc40: null,
        is_slide_cc40: null
      },
      speakers: [],
      fieldDefinitions: CONTENT_FIELD_DEFINITIONS,
      validMap: {},
      isAllValid: true,
      isOnInit: true,
      backupTimer: null,
      // 投稿截止後，無任何版本者，不能在更新投稿了
      isHaveAnyVersion: false
    };
  },
  computed: {
    isOtherLanguageSelected() {
      return (
        this.proposalContent.oral_language ===
        ORAL_LANGUAGE_OPTIONS[ORAL_LANGUAGE_OPTIONS.length - 1]
      );
    },
    maxSpeakers() {
      const format =
        FORMAT_OPTIONS.find(opt => opt.name === this.proposalContent.format) ||
        FORMAT_OPTIONS[0];

      return format.maxSpeakers;
    },
    lastDraft() {
      return {
        ...this.proposalContent,
        speakers: this.speakers
      };
    }
  },
  watch: {
    lastDraft(newVal, oldValue) {
      if (oldValue.title && !this.backupTimer) {
        // only start backup when sth really changed
        this.startPeriodicBackup();
      }
    },
    id() {
      this.initProposal();
    }
  },
  beforeDestroy() {
    this.stopPeriodicBackup();
  },
  async created() {
    await this.initProposal();
  },
  methods: {
    handleValidChange(id, isValid) {
      if (isValid) {
        delete this.validMap[id];
      } else {
        this.validMap[id] = false;
      }
      // Simple but dirty hack, as empty object is not observable
      this.isAllValid = Object.keys(this.validMap).length === 0;
    },
    handleOther({ definition, value }) {
      this.proposalContent[definition.otherId] = value;
    },
    async initProposal() {
      this.isOnInit = true;
      // TODO: handle invalid id as we pass url directly into it
      const data = await this.handleApiError(
        this.$store.dispatch("getDetailProject", this.id)
      );
      // 如果非講者本人不能進入此頁面
      // 2020-09-04 如果未錄取，就不能修改
      if (!data || !data.owner || !data.selected) {
        this.$emit("access-denied");
        return;
      }
      let formPointer = null;
      // 投稿截止後，無任何版本者，不能在更新投稿了
      if (data.versions.length !== 0) {
        this.isHaveAnyVersion = true;
      }
      if (data.draft && data.draft.title) {
        // use draft first
        formPointer = data.draft;
      } else if (data.versions.length > 0) {
        // or use last version
        formPointer = _.last(data.versions);
      }
      if (!formPointer) {
        this.isOnInit = false;
        return;
      }
      const content = { ...formPointer };
      delete content.speakers;

      this.proposalContent = content;
      this.speakers = _.cloneDeep(formPointer.speakers);
      this.isOnInit = false;
    },
    stopPeriodicBackup() {
      clearInterval(this.backupTimer);
    },
    startPeriodicBackup() {
      this.backupTimer = setInterval(() => {
        this.backupDraft();
      }, BACKUP_PERIOD);
    },
    async backupDraft() {
      this.$store.dispatch("updateProjectDraft", {
        id: this.id,
        data: this.lastDraft
      });
    },
    async onSubmit(evt) {
      evt.preventDefault();
      if (!this.isAllValid) {
        const firstInvalid = Object.keys(this.validMap)[0];
        const invalidDom = document.querySelector(`#${firstInvalid}`);
        if (invalidDom) {
          invalidDom.scrollIntoView();
        }
        return;
      }
      this.stopPeriodicBackup();
      let isSucceeded = false;
      try {
        await this.$store.dispatch("createProjectVersion", {
          id: this.id,
          data: this.lastDraft
        });
        isSucceeded = true;
      } catch (err) {
        alert(err);
      }
      if (!isSucceeded) {
        return;
      }
      this.$emit("done");
      this.$router.push({
        name: "ProposalDetail",
        params: {
          id: this.id
        }
      });
    },
    updateSpeakers(speakers) {
      this.speakers = speakers;
    }
  }
};
</script>

<style lang="scss" scoped>
.proposal {
  padding: 50px 40px;
  box-shadow: 0 0 11px #6f3f3f;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  z-index: 2;
  form {
    text-align: left;
    background-color: #fff;
    button {
      box-shadow: -1px 6px 8px -3px black;
      position: absolute;
      bottom: -13px;
      left: 50%;
      transform: translateX(-50%);
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
  }

  $horizontal-padding: 40px;
  &__speakers-wrapper {
    position: relative;
    left: -$horizontal-padding;
    width: calc(100% + #{$horizontal-padding} * 2);
    padding: $horizontal-padding;
    background: rgba(0, 0, 0, 0.05);
  }

  &__long-en {
    ::v-deep > label {
      margin-bottom: 0;
    }
  }

  &__nosubmit.btn.disabled {
    cursor: not-allowed;
    opacity: 1;
  }

  &__lang {
    $selector-width: 11rem;
    input {
      display: none;
      width: calc(100% - #{$selector-width});
    }

    &--other {
      select {
        width: calc(#{$selector-width} - 1rem);
        margin-right: 1rem;
      }
      input {
        display: inline-block;
      }
    }
  }
}
</style>
