<template>
  <b-form-group
    class="formfield"
    :label="label"
    :label-for="definition.id"
    :description="definition.description"
    :class="{ 'formfield--long': definition.labelEn }"
  >
    <label v-if="definition.labelEn" :for="definition.id">
      {{ labelEn }}
    </label>
    <b-form-input
      v-if="definition.type === 'text'"
      :id="definition.id"
      :placeholder="definition.placeholder"
      type="text"
      :value="value"
      @input="handleInput"
    ></b-form-input>
    <b-form-textarea
      v-if="definition.type === 'textarea'"
      :id="definition.id"
      max-rows="8"
      :placeholder="definition.placeholder"
      :value="value"
      @input="handleInput"
    ></b-form-textarea>
    <b-form-select
      v-if="definition.type === 'select'"
      :id="definition.id"
      :options="definition.options"
      :value="value"
      @input="handleInput"
    ></b-form-select>
    <b-form-radio-group
      v-if="definition.type === 'boolean'"
      :id="definition.id"
      :value="value"
      @input="handleInput"
      :options="binaryOptions"
      :name="definition.id"
    ></b-form-radio-group>
  </b-form-group>
</template>
<script>
const BINARY_OPTIONS = [
  { text: "是 Yes", value: true },
  { text: "否 No", value: false }
];

export default {
  props: {
    definition: {
      type: Object,
      required: true
    },
    value: {
      type: [String, Boolean, Number],
      default: ""
    }
  },
  data() {
    return {
      binaryOptions: BINARY_OPTIONS
    };
  },
  computed: {
    label() {
      if (this.definition.required) {
        return this.definition.label + "*";
      }
      return this.definition.label;
    },
    labelEn() {
      if (!this.definition.labelEn) {
        return ""
      }
      if (this.definition.required) {
        return this.definition.labelEn + "*";
      }
      return this.definition.labelEn;
    }
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    }
  }
}
</script>
<style lang="scss" scoped>
.formfield {
  margin-bottom: 1.2rem;
  &--long {
    ::v-deep > label {
      margin-bottom: 0;
    }
  }
}
</style>