<template>
  <component
    :is="isHeader ? 'div' : 'router-link'"
    :to="detailLink"
    class="rowview relative db flex-l bb b--moon-gray pa2 tl"
    :class="{ 'rowview--header': isHeader }"
  >
    <div class="flex-l flex-auto-l items-start-l">
      <div class="rowview__topic mr3">
        <template v-if="isHeader">{{ topic }}</template>
        <template v-else>
          {{ zhTopic }}
          <br />
          {{ enTopic }}
        </template>
      </div>
      <div class="rowview__title mv3 mv0-l">
        <div class="truncate">{{ lastVersion.title }}</div>
        <div class="truncate">{{ lastVersion.title_en }}</div>
      </div>
    </div>
    <div class="flex justify-between justify-start-l">
      <div class="rowview__speakers flex items-center">
        <div
          class="rowview__speaker mr1"
          v-for="(speaker, index) in speakers"
          :key="index"
        >
          <div class="aspect-ratio aspect-ratio--1x1">
            <div class="aspect-ratio--object overflow-hidden br-100">
              <img
                class="h-100 w-100"
                :src="speaker.avatar_url"
                :alt="speaker.display_name"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </component>
</template>
<script>
import _ from "lodash";

export default {
  props: {
    row: {
      type: Object,
      required: true
    },
    routerName: {
      type: String,
      default: ""
    },
    isHeader: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    detailLink() {
      if (this.routerName) {
        return {
          name: this.routerName,
          params: { id: this.row._id }
        };
      }
      return "";
    },
    lastVersion() {
      return _.last(this.row.versions) || {};
    },
    speakers() {
      return this.lastVersion.speakers || [];
    },
    topic() {
      return this.lastVersion.topic || "";
    },
    zhTopic() {
      return _.first(this.topic.split(" ")) || "";
    },
    enTopic() {
      return this.topic
        .split(" ")
        .slice(1)
        .join(" ");
    }
  }
};
</script>
<style lang="scss" scoped>
$topic-width: 10rem;

.rowview {
  color: black;
  &:hover {
    text-decoration: none;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.25);
  }
  &:last-child {
    border: none;
  }
  &--header {
    background: white;
    filter: invert(1);
  }
  &__topic {
    width: $topic-width;
    color: #555;
  }
  &__title {
    max-width: calc(100% - #{$topic-width} - 3rem);
  }
  &__speaker {
    width: 2.5rem;
    img {
      object-fit: cover;
    }
  }
}
</style>
