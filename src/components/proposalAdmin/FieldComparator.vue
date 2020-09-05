<template>
  <div class="comparator" v-if="toBeVerified && hasBeenVerified">
    <div
      class="mv2 f6"
      v-for="field in fieldList"
      :key="field.id"
      v-show="hasContentToShow(field, toBeVerified, hasBeenVerified)"
    >
      <div class="br2 br--top bg-light-silver white dib f7 pv1 ph2">
        {{ labelPrefix }}{{ field.label }}
      </div>
      <div class="flex-l bt bl br b--moon-gray bg-white">
        <div class="flex-auto bb-l b--moon-gray pa2">
          {{ hasBeenVerified[field.id] }}
        </div>
        <div class="bb-l b--moon-gray flex items-center justify-center">
          <div class="dn db-l">
            <b-icon icon="arrow-right-circle-fill" />
          </div>
          <div class="dn-l db">
            <b-icon icon="arrow-down-circle-fill" />
          </div>
        </div>
        <div class="flex-auto bb b--moon-gray pa2">
          {{ toBeVerified[field.id] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    fieldList: {
      type: Array,
      required: true
    },
    hasBeenVerified: {
      required: true,
      validator(val) {
        return val === undefined || typeof val === "object";
      }
    },
    toBeVerified: {
      required: true,
      validator(val) {
        return val === undefined || typeof val === "object";
      }
    },
    labelPrefix: {
      type: String,
      default: ""
    },
    onlyShowDiff: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    hasContentToShow(field, toBe, hasBeen) {
      if (!toBe[field.id] || !hasBeen[field.id]) {
        return false;
      }
      if (this.onlyShowDiff) {
        return toBe[field.id] !== hasBeen[field.id];
      }
      return true;
    }
  }
};
</script>
