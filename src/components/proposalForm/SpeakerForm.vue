<template>
  <div class="speaker">
    <h2 class="h2">講者資訊 Speaker Information</h2>
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
import { SPEAKER_FIELD_DEFINITIONS } from "@/utils/projectFields";
import FormField from "./FormField";
let lastId = 0;

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

      fieldDefinitions: SPEAKER_FIELD_DEFINITIONS
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
