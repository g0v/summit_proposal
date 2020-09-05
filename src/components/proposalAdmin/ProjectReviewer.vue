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
        <b-button size="sm" @click="toggleDetail" variant="info">
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
      class="reviewer__detail relative bt b--moon-gray br2 br--bottom"
      v-show="isOpened"
    >
      <div class="pa3" v-if="hasBeenVerified">
        <component
          :is="fieldComponent"
          :field-list="contentFields"
          :to-be-verified="toBeVerified"
          :has-been-verified="hasBeenVerified"
          :only-show-diff="onlyShowDiff"
        />
        <component
          :is="fieldComponent"
          v-for="(dummy, index) in speakers"
          :key="index"
          :label-prefix="`講者 ${index + 1} - `"
          :field-list="speakerFields"
          :to-be-verified="speakersToBeVerified[index]"
          :has-been-verified="hasBeenVerified.speakers[index]"
          :only-show-diff="onlyShowDiff"
        />
      </div>
      <div
        class="reviewer__tooltip flex-l justify-between items-center pa3 bt b--moon-gray br2 br--bottom bg-white"
      >
        <div class="tr tl-l">
          <b-button variant="info" size="sm" @click="toggleDetail">
            <b-icon icon="chevron-up"></b-icon>
            隱藏詳細資訊
          </b-button>
          <b-button
            v-if="requireVerify"
            variant="info"
            class="ml2"
            size="sm"
            @click="toggleShowDiff"
          >
            <template v-if="onlyShowDiff">
              <b-icon icon="union"></b-icon>
              顯示完整資訊
            </template>
            <template v-else>
              <b-icon icon="exclude"></b-icon>
              只看更新欄位
            </template>
          </b-button>
        </div>
        <div class="tr tl-l mt3 mt0-l">
          <b-button
            size="sm"
            variant="outline-secondary"
            class="reviewer__author"
            v-clipboard:copy="authorEmail"
            v-clipboard:success="copyDone"
          >
            提案人： {{ authorEmail }}
            <b-icon icon="envelope-open"></b-icon>
          </b-button>
          <b-button
            class="ml2"
            size="sm"
            variant="danger"
            v-if="requireVerify"
            @click="acceptChange"
          >
            同意變更
          </b-button>
        </div>
      </div>
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
import FieldViewer from "./FieldViewer";

// author may change format, so use static max speaker
const MAX_SPEAKER = 4;

export default {
  mixins: [handleApiError],
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
      onlyShowDiff: true,

      contentFields: CONTENT_FIELD_DEFINITIONS,
      speakerFields: SPEAKER_FIELD_DEFINITIONS
    };
  },
  computed: {
    fieldComponent() {
      if (this.requireVerify) {
        return FieldComparator;
      }
      return FieldViewer;
    },
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
    speakersToBeVerified() {
      if (this.toBeVerified) {
        return this.toBeVerified.speakers;
      }
      return [];
    },
    hasBeenVerified() {
      if (!this.projectDetail) {
        return null;
      }
      return _.findLast(this.projectDetail.versions, ver => ver.verified);
    },
    requireVerify() {
      return !!this.project.verify.current;
    },
    authorEmail() {
      const user = this.project.user;
      return `${user.name} <${user.email}>`;
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
    async getProjectDetail(force = false) {
      if (this.projectDetail && !force) {
        return;
      }
      const data = await this.handleApiError(
        this.$store.dispatch("getDetailProject", this.project._id)
      );
      this.projectDetail = data;
    },
    toggleDetail() {
      this.isOpened = !this.isOpened;
    },
    toggleShowDiff() {
      this.onlyShowDiff = !this.onlyShowDiff;
    },
    copyDone() {
      this.$bvToast.toast("信箱已複製到剪貼簿", {
        title: "★~(◠‿◕✿)",
        toaster: "b-toaster-bottom-center",
        solid: true,
        variant: "info"
      });
    },
    async acceptChange() {
      await this.handleApiError(
        this.$store.dispatch("acceptProject", {
          id: this.project._id
        })
      );
      this.$store.dispatch("listProjects");
    }
  }
};
</script>
<style lang="scss" scoped>
.reviewer {
  &__detail {
    background-image: linear-gradient(
      180deg,
      #f3f3f3 0%,
      #fff 30rem,
      #fff calc(100% - 30rem),
      #f3f3f3 100%
    );
  }
  &__tooltip {
    position: sticky;
    bottom: 0;
    box-shadow: 0px -2px 3px #f3f3f3;
  }
}
</style>
