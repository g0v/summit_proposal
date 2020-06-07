<template>
  <b-form-group
    class="formfield"
    :label="label"
    :label-for="definition.id"
    :description="definition.description"
    :state="isValid"
    :invalid-feedback="invalidMessage"
    :class="{ 'formfield--long': definition.labelEn }"
  >
    <label v-if="definition.labelEn" :for="definition.id">
      {{ labelEn }}
    </label>
    <b-form-input
      v-if="definition.type === 'text'"
      :id="definition.id"
      :placeholder="definition.placeholder"
      :type="definition.textType || 'text'"
      :required="definition.required"
      :state="isValid"
      :value="value"
      @input="handleInput"
    ></b-form-input>
    <b-form-textarea
      v-if="definition.type === 'textarea'"
      :id="definition.id"
      max-rows="8"
      :placeholder="definition.placeholder"
      :required="definition.required"
      :state="isValid"
      :value="value"
      @input="handleInput"
    ></b-form-textarea>
    <b-form-select
      v-if="definition.type === 'select'"
      :id="definition.id"
      :options="definition.options"
      :required="definition.required"
      :state="isValid"
      :value="value"
      @input="handleInput"
    ></b-form-select>
    <div
      class="selectother"
      :class="{ 'selectother--other': isOtherOptionSelected }"
    >
      <b-form-select
        v-if="isSelectWithOther"
        :id="definition.id"
        :options="definition.options"
        :required="definition.required"
        :value="value"
        @input="handleInput"
      ></b-form-select>
      <b-form-input
        v-show="isOtherOptionSelected"
        class="mt2"
        type="text"
        :required="isOtherTextRequired"
        :state="isValid"
        :value="otherValue"
        @input="handleOtherInput"
      ></b-form-input>
    </div>
    <b-form-radio-group
      v-if="definition.type === 'boolean'"
      :id="definition.id"
      v-model="binaryValue"
      :options="binaryOptions"
      :name="definition.id"
      :state="isValid"
      :required="definition.required"
    ></b-form-radio-group>
    <div :id="definition.id" v-if="definition.type === 'image'">
      <img
        class="formfield__img mr3"
        v-if="value"
        :src="value"
        :alt="definition.label"
      />
      <b-button class="o-70" variant="danger" @click.prevent="openFileSelector">
        {{ imageCtaLabel }}
      </b-button>
      <input type="file" ref="fileSelector" @change="handleFileUpload" hidden />
    </div>
  </b-form-group>
</template>
<script>
import axios from "axios";

const CJK_RANGE = "\u4E00-\u9FFF";
const cjkRegex = new RegExp(`[${CJK_RANGE}]|\n|[^${CJK_RANGE} \n\t]+`, "g");

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
    },
    otherValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      binaryValue: this.value,
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
        return "";
      }
      if (this.definition.required) {
        return this.definition.labelEn + "*";
      }
      return this.definition.labelEn;
    },
    imageCtaLabel() {
      if (this.value) {
        return this.definition.changeLabel;
      }
      return this.definition.uploadLabel;
    },
    isSelectWithOther() {
      return this.definition.type === "select-with-other";
    },
    isOtherOptionSelected() {
      const def = this.definition;
      return this.isSelectWithOther && this.value === def.otherOption;
    },
    isOtherTextRequired() {
      const def = this.definition;
      return this.isOtherOptionSelected && def.required;
    },
    invalidMessage() {
      const def = this.definition;
      // TODO: img reguired
      if (def.maxCount) {
        const value = this.isOtherOptionSelected ? this.otherValue : this.value;
        const matches = value.match(cjkRegex) || [];
        const exceed = matches.length - def.maxCount;
        if (exceed > 0) {
          return `超過字數上限，請減少 ${exceed} 字 / ${exceed} words over limit`;
        }
      }
      if (def.type === "image" && def.required && !this.value) {
        return `請${def.uploadLabel}`;
      }
      return "";
    },
    isValid() {
      if (this.invalidMessage) {
        return false;
      }
      return null;
    }
  },
  watch: {
    binaryValue() {
      this.$emit("input", this.binaryValue);
    },
    isValid: {
      immediate: true,
      handler() {
        this.$emit("valid-change", this.definition.id, this.isValid !== false);
      }
    }
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    },
    handleOtherInput(value) {
      this.$emit("other-input", {
        definition: this.definition,
        value
      });
    },
    openFileSelector() {
      if (this.$refs.fileSelector) {
        this.$refs.fileSelector.click();
      }
    },
    async handleFileUpload() {
      let formData = new FormData();
      formData.append("image", this.$refs.fileSelector.files[0]);
      let imgur = await axios.post("https://api.imgur.com/3/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Client-ID c5dc0de7bf21467"
        }
      });
      const imgId = imgur.data.data.id;
      this.$emit("input", `https://i.imgur.com/${imgId}h.jpg`);
    }
  }
};
</script>
<style lang="scss" scoped>
.formfield {
  margin-bottom: 1.2rem;
  &--long {
    ::v-deep > label {
      margin-bottom: 0;
    }
  }
  &__img {
    max-height: 12rem;
  }
}
</style>
