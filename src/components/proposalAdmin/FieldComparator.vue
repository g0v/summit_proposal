<template>
  <div class="comparator" v-if="toBeVerified || hasBeenVerified">
    <div
      class="mv2 f6"
      v-for="field in fieldList"
      :key="field.id"
      v-show="hasContentToShow(field, toBeVerified, hasBeenVerified)"
    >
      <div class="br2 br--top bg-light-silver white dib f7 pv1 ph2">
        {{ labelPrefix }}{{ field.label }}
      </div>
      <div class="flex-l ba b--moon-gray bg-white br2 br--bottom">
        <div class="comparator__col pa2">
          {{ val(hasBeenVerified, field) }}
        </div>
        <div class="flex items-center justify-center">
          <div class="dn db-l">
            <b-icon icon="arrow-right-circle-fill" />
          </div>
          <div class="dn-l db">
            <b-icon icon="arrow-down-circle-fill" />
          </div>
        </div>
        <div class="comparator__col pa2">
          {{ val(toBeVerified, field) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";

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
    val(obj, field) {
      return _.get(obj, field.id, "N/A");
    },
    hasContentToShow(field, toBe, hasBeen) {
      if (!toBe && !hasBeen) {
        return false;
      }
      const valToBe = _.get(toBe, field.id);
      const valHasBeen = _.get(hasBeen, field.id);
      if (valToBe === undefined && valHasBeen === undefined) {
        return false;
      }
      if (this.onlyShowDiff) {
        return valToBe !== valHasBeen;
      }
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
.comparator {
  &__col {
    flex-basis: 50%;
  }
}
</style>
