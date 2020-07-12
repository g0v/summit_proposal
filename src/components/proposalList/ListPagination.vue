<template>
  <div class="pagination-container">
    <b-pagination
      align="right"
      :total-rows="allDataLength"
      :per-page="perPage"
      :value="currentPage"
      @change="$emit('updateCurrentPage', $event)"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  name: "ListPagination",
  props: {
    perPage: {
      type: Number
    },
    currentPage: {
      type: Number
    },
    allDataLength: {
      type: Number
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination-container {
  padding: 20px 1rem;
  max-width: calc(#{$width--proposal-list} + 2rem);
  margin: 0 auto;
  .pagination {
    margin: 0;
  }
}
</style>
