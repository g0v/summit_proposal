<template>
  <div class="reviewer br2 ba mv3 b--moon-gray">
    <div class="flex-l flex-row pa3 items-center">
      <div class="black flex-auto">
        {{ meta.title }}<br />
        {{ meta.title_en }}
      </div>
      <div class="gray f6 mv3 mv0-l mh3-l tr">
        {{ project._id }}<br />
        更新於：{{ createdAt }}
      </div>
      <div class="tr">
        <b-button size="sm" @click="toggleDetail">
          <template v-if="!isOpened">
            <b-icon icon="chevron-down"></b-icon>
            詳細資訊
          </template>
          <template v-else>
            <b-icon icon="chevron-up"></b-icon>
            隱藏詳細資訊
          </template>
        </b-button>
      </div>
    </div>
    <div
      class="reviewer__detail bt b--moon-gray pa3"
      v-if="isOpened && hasBeenVerified"
    >
      <template v-if="requireVerify">
        <field-comparator
          :field-list="contentFields"
          :to-be-verified="toBeVerified"
          :has-been-verified="hasBeenVerified"
          :only-show-diff="onlyShowDiff"
        />
        <field-comparator
          v-for="(dummy, index) in speakers"
          :key="index"
          :label-prefix="`講者 ${index + 1} - `"
          :field-list="speakerFields"
          :to-be-verified="toBeVerified.speakers[index]"
          :has-been-verified="hasBeenVerified.speakers[index]"
          :only-show-diff="onlyShowDiff"
        />
      </template>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import moment from "moment";

import { handleApiError } from "@/utils/mixins";
import {
  SPEAKER_FIELD_DEFINITIONS,
  CONTENT_FIELD_DEFINITIONS
} from "@/utils/projectFields";

import FieldComparator from "./FieldComparator";

// author may change format, so use static max speaker
const MAX_SPEAKER = 4;

export default {
  mixins: [handleApiError],
  components: {
    FieldComparator
  },
  props: {
    project: {
      type: Object,
      required: true
    },
    openOnInit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      projectDetail: null,
      speakers: _.fill(Array(MAX_SPEAKER), 1),
      isOpened: this.openOnInit,
      onlyShowDiff: false,

      contentFields: CONTENT_FIELD_DEFINITIONS,
      speakerFields: SPEAKER_FIELD_DEFINITIONS
    };
  },
  computed: {
    meta() {
      return this.project.verify.current || this.project.verify.prev;
    },
    createdAt() {
      return moment(this.meta.createdAt || new Date()).format(
        "YYYY-MM-DD hh:mm:ss"
      );
    },
    toBeVerified() {
      if (!this.projectDetail || !this.project.verify.current) {
        return null;
      }
      return _.findLast(this.projectDetail.versions, ver => !ver.verified);
    },
    hasBeenVerified() {
      if (!this.projectDetail) {
        return null;
      }
      return _.findLast(this.projectDetail.versions, ver => ver.verified);
    },
    requireVerify() {
      return !!this.project.verify.current;
    }
  },
  watch: {
    isOpened(newVal) {
      if (newVal) {
        this.getProjectDetail();
      }
    }
  },
  created() {
    if (this.openOnInit) {
      this.getProjectDetail();
    }
  },
  methods: {
    async getProjectDetail() {
      if (this.projectDetail) {
        return;
      }
      const data = await this.handleApiError(
        this.$store.dispatch("getDetailProject", this.project._id)
      );
      this.projectDetail = data;
    },
    toggleDetail() {
      this.isOpened = !this.isOpened;
    }
  }
};
</script>
<style lang="scss" scoped>
.reviewer {
  &__detail {
    background: linear-gradient(180deg, #f3f3f3 0%, #fff 20rem);
  }
}
</style>
