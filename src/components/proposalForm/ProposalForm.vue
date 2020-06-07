<template>
  <div class="proposal form-container" v-if="!isOnInit">
    <b-form @submit="onSubmit">
      <h2 class="h2">稿件資訊 Proposal Information</h2>
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
      <b-button type="submit" variant="danger" size="lg">
        提交投稿 Submit Proposal
      </b-button>
    </b-form>
  </div>
</template>
<script>
// import { ValidationProvider } from "vee-validate";
import _ from "lodash";
import { handleApiError } from "@/utils/mixins";
import SpeakerForm from "./SpeakerForm";
import FormField from "./FormField";

const TOPIC_OPTIONS = [
  "「沒有人」的島 Nobody’s island",
  "島嶼大聯盟 Island’s federation",
  "大島開放 Open island",
  "沒有島是局外島 No island is outside island",
  "第四個島 The fourth island",
  "賢者之島 Academia Formosa",
  "海海人聲 Voice of the islanders"
];

const FORMAT_OPTIONS = [
  { name: "演講 （20 分鐘）Talk (20 min)", maxSpeakers: 2 },
  ...[60, 90, 120].map(minute => ({
    name: `主題論壇 （${minute} 分鐘）Panel discussion (${minute} min)`,
    maxSpeakers: 4
  })),
  ...[60, 90, 120].map(minute => ({
    name: `工作坊 （${minute} 分鐘）Workshop (${minute} min)`,
    maxSpeakers: 3
  }))
];

const ORAL_LANGUAGE_OPTIONS = ["華語", "English", "其他 Others"];

const TIPS_WE_WILL_TRANSLATE =
  "若無提供，主辦單位將代為翻譯 or we will help you translate it";

const FIELD_DEFINITIONS = [
  {
    label: "稿件標題 Proposal Title",
    id: "title",
    placeholder: "請填寫稿件標題 Please enter proposal title",
    type: "text",
    maxCount: 150,
    required: true
  },
  {
    label: "英語標題 Title in English",
    id: "title_en",
    placeholder: "請填寫英語標題 Please enter proposal title",
    maxCount: 150,
    description: TIPS_WE_WILL_TRANSLATE,
    type: "text"
  },
  {
    label: "摘要 Summary",
    id: "summary",
    description: "最多 350 字 Max 350 Words",
    placeholder: "請填寫摘要 Please enter summary",
    type: "textarea",
    maxCount: 350,
    required: true
  },
  {
    label: "英語摘要 Summary in English",
    id: "summary_en",
    description: `最多 250 字 Max 250 Words ${TIPS_WE_WILL_TRANSLATE}`,
    maxCount: 250,
    type: "textarea"
  },
  {
    label: "使用語言 Language",
    placeholder: "請填寫語言 Please enter language",
    id: "oral_language",
    description: "",
    type: "select-with-other",
    otherOption: _.last(ORAL_LANGUAGE_OPTIONS),
    otherId: "oral_language_other",
    options: ORAL_LANGUAGE_OPTIONS,
    maxCount: 60,
    required: true
  },
  {
    label: "形式 Format",
    id: "format",
    type: "select",
    options: FORMAT_OPTIONS.map(format => format.name),
    required: true
  },
  {
    label: "主題分類 Topic",
    id: "topic",
    type: "select",
    options: TOPIC_OPTIONS,
    required: true
  },
  {
    label: "三個關鍵字 3 keywords",
    id: "three_keywords",
    description: "",
    type: "text",
    maxCount: 60,
    required: true
  },
  {
    label: "主圖 Cover image",
    id: "cover_image",
    type: "image",
    uploadLabel: "上傳圖片 Upload image",
    changeLabel: "更改圖片 Change image",
    height: "12rem"
  },
  {
    label:
      "你的議程是否可以接受錄影、錄音、拍照、共筆、直播等形式的記錄，且以開放授權釋出？",
    labelEn:
      "Do you agree that your presentation will be live-streamed and recorded in the forms of text, photo, audio, and video, and released publicly with an CC BY 4.0 International license?",
    id: "is_presentation_cc40",
    type: "boolean",
    required: true
  },
  {
    label: "你的投影片是否可以以開放授權釋出？",
    labelEn:
      "Do you agree that your slides will be released publicly with an CC BY 4.0 International license",
    id: "is_slide_cc40",
    type: "boolean",
    required: true
  }
];

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
        is_presentation_cc40: null,
        is_slide_cc40: null
      },
      speakers: [],
      fieldDefinitions: FIELD_DEFINITIONS,
      validMap: {},
      isAllValid: true,
      isOnInit: true,
      backupTimer: null
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
      const data = await this.handleApiError(
        this.$store.dispatch("getDetailProject", this.id)
      );
      // 如果非講者本人不能進入此頁面
      if (!data.owner) {
        this.$router.push({ name: "Homepage" });
        return;
      }
      let formPointer = null;
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
      await this.$store.dispatch("createProjectVersion", {
        id: this.id,
        data: this.lastDraft
      });
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
