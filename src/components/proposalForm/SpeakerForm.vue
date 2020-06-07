<template>
  <div class="speaker">
    <h2>講者資訊 Speaker Information</h2>
    <div class="flex flex-wrap">
      <div
        class="speaker__item w-50-l mv3"
        v-for="speaker in speakers"
        :key="speaker.id"
      >
        <div class="pa3 pa4-l bg-white br3 shadow-1 w-100">
          <form-field
            v-for="field in fieldDefinitions"
            :key="field.id"
            :definition="makeDefinition(speaker, field)"
            v-model="speaker[field.id]"
            :other-value="speaker[field.otherId] || ''"
            @input="handleInput"
            @other-input="handleOtherInput(speaker, $event)"
            @valid-change="handleValidChange"
          ></form-field>
          <div class="tr mt3">
            <b-button variant="outline-dark" @click="removeSpeakers(speaker)">
              移除講者 Remove this speaker
            </b-button>
          </div>
        </div>
      </div>
      <div
        class="speaker__item w-50-l mt3 pv4 flex items-center justify-center"
      >
        <b-button
          class="speaker__add o-70"
          variant="danger"
          @click="addSpeakers"
          v-show="canAddSpeader"
        >
          <b-icon-plus />
          <br />
          增加講者
          <br />
          Add more speaker
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import FormField from "./FormField";
let lastId = 0;
const PRIVATE_DESP =
  "此欄位不會公開顯示 This field is only visible to organizer";

const GENDER_OPTIONS = [
  "女 female",
  "男 male",
  "非二元性別 non-binary",
  "其它認同 other gender identity",
  "不希望透漏 prefer not to disclose"
];

const DEFAULT_SPAKER = {
  id: lastId,
  private_name: "",
  private_email: "",
  private_gender: "",
  private_phone_number: "",
  private_accept_travel: null,
  private_channel: "",
  private_channel_other: "",
  private_misc: "",
  display_name: "",
  organization: "",
  avatar_url: "",
  city: "",
  info_url: "",
  bio: "",
  bio_en: ""
};

const FIELD_DEFINITIONS = [
  {
    label: "顯示於網頁的講者名稱 Speaker’s display name",
    id: "display_name",
    type: "text",
    maxCount: 60,
    required: true
  },
  {
    label: "組織或社群名稱",
    labelEn: "Speaker’s organization or community affiliation",
    id: "organization",
    maxCount: 60,
    type: "text",
    required: true
  },
  {
    label: "講者頭像 Speaker’s avatar",
    id: "avatar_url",
    type: "image",
    uploadLabel: "上傳照片 Upload photo",
    changeLabel: "更改照片 Change photo",
    height: "8rem",
    required: true
  },
  {
    label: "講者所在城市 Speaker’s location (city)",
    id: "city",
    type: "text",
    maxCount: 60,
    required: true
  },
  {
    label: "講者資訊連結 Speaker info URL ",
    id: "info_url",
    type: "text",
    textType: "url"
  },
  {
    label: "講者簡介 Short bio",
    id: "bio",
    description: "最多 150 字 Max 150 words",
    maxCount: 150,
    type: "textarea",
    required: true
  },
  {
    label: "講者英語簡介 Speaker’s bio in English",
    id: "bio_en",
    description: "最多 100 字 Max 100 words",
    maxCount: 100,
    type: "textarea"
  },
  {
    label: "姓名 Name",
    id: "private_name",
    description: PRIVATE_DESP,
    maxCount: 60,
    type: "text",
    required: true
  },
  {
    label: "性別 Gender",
    id: "private_gender",
    description: PRIVATE_DESP,
    type: "select",
    options: GENDER_OPTIONS
  },
  {
    label: "電子信箱 Email",
    id: "private_email",
    description: PRIVATE_DESP,
    type: "text",
    textType: "email",
    required: true
  },
  {
    label: "聯絡電話 Phone number",
    id: "private_phone_number",
    maxCount: 20,
    description: PRIVATE_DESP,
    type: "text"
  },
  {
    label:
      "因應 COVID-19 全球疫情，如果稿件入選，且相關旅行限制允許，你願意前往台灣參與 g0v Summit 2020 嗎？",
    labelEn:
      "Due to uncertainties of the COVID-19 pandemic, if your proposal is selected and you are allowed to travel, would you be willing to travel to Taiwan to attend g0v Summit 2020?",
    id: "private_accept_travel",
    description: PRIVATE_DESP,
    type: "boolean",
    required: true
  },
  {
    label: "你是如何知道 g0v 雙年會的？",
    labelEn: "How did you learn about the g0v Summit 2020?",
    id: "private_channel",
    description: PRIVATE_DESP,
    type: "select-with-other",
    required: true,
    maxCount: 60,
    otherOption: "其它（請描述）Other (please specify)",
    otherId: "private_channel_other",
    options: [
      "社交媒體 Social media (Facebook, Twitter, Istagram)",
      "g0v 黑客松 g0v hackathon",
      "其它開源或公民科技社群 Open source and civic tech communities",
      "揪松電子報 Jothon’s newsletter",
      "親朋好友 Families and friends",
      // TODO: please specify
      "其它（請描述）Other (please specify)"
    ]
  },
  {
    label: "其他個人需求，或其他想說的話",
    labelEn: "Other personal needs or anything you want to let us know",
    id: "private_misc",
    description: PRIVATE_DESP,
    maxCount: 150,
    type: "textarea"
  }
];

export default {
  components: {
    FormField
  },
  props: {
    maxSpeakers: {
      type: Number,
      default: 1
    },
    initSpeakers: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    let speakers = [this.createSpeaker()];
    if (this.initSpeakers.length > 0) {
      speakers = _.cloneDeep(this.initSpeakers).map(speaker => {
        lastId += 1;
        return {
          id: lastId,
          ...speaker
        };
      });
    }
    return {
      speakers,
      private_channel: "",
      private_misc: "",

      fieldDefinitions: FIELD_DEFINITIONS
    };
  },
  computed: {
    canAddSpeader() {
      return this.speakers.length < this.maxSpeakers;
    }
  },
  watch: {
    speakers() {
      this.handleInput();
    }
  },
  methods: {
    handleValidChange(id, isValid) {
      this.$emit("valid-change", id, isValid);
    },
    handleOtherInput(speaker, { definition, value }) {
      speaker[definition.otherId] = value;
      this.handleInput();
    },
    handleInput() {
      const cleanSpeakers = this.speakers.map(speaker => {
        const cleanSpeaker = { ...speaker };
        delete cleanSpeaker.id;
        return cleanSpeaker;
      });
      this.$emit("change", cleanSpeakers);
    },
    createSpeaker() {
      lastId += 1;
      return {
        ...DEFAULT_SPAKER,
        id: lastId
      };
    },
    addSpeakers() {
      if (!this.canAddSpeader) {
        return;
      }
      lastId += 1;
      this.speakers.push(this.createSpeaker());
    },
    removeSpeakers(speakerToRemove) {
      if (this.speakers.length > 1) {
        this.speakers = this.speakers.filter(
          speaker => speaker !== speakerToRemove
        );
      } else {
        this.speakers = [this.createSpeaker()];
      }
    },
    uniqLabel(speaker, label) {
      return `${label}-${speaker.id}`;
    },
    makeDefinition(speaker, field) {
      return {
        ...field,
        id: `${field.id}-${speaker.id}`
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.speaker {
  &__item {
    &:nth-child(2n + 1) {
      padding-right: 1rem;
    }
    &:nth-child(2n) {
      padding-left: 1rem;
    }
  }
  &__add {
    border-radius: 0.5em;
    // background: $main-color;
    color: white;
    .b-icon {
      font-size: 2em;
    }
  }
}
</style>
