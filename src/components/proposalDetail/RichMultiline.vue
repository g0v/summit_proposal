<template>
  <div class="richmultiline">
    <p
      class="richmultiline__paragraph"
      v-for="(paragraph, i) in paragraphList"
      :key="i"
    >
      {{ paragraph }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    paragraphList() {
      // remove empty line
      return this.text.split("\n").filter(line => !!line);
    }
  }
};
</script>
<style lang="scss" scoped>
.richmultiline {
  &__paragraph {
    &:last-child {
      margin-bottom: 0rem !important;
    }
  }
}
</style>
