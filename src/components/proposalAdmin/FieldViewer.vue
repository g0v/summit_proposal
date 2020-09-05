<template>
  <div class="comparator" v-if="hasBeenVerified">
    <div
      class="mv2 f6"
      v-for="field in fieldList"
      :key="field.id"
      v-show="hasBeenVerified[field.id]"
    >
      <div class="br2 br--top bg-light-silver white dib f7 pv1 ph2">
        {{ labelPrefix }}{{ field.label }}
      </div>
      <div class="ba b--moon-gray bg-white pa2">
        {{ hasBeenVerified[field.id] }}
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
    labelPrefix: {
      type: String,
      default: ""
    }
  }
};
</script>
