<template>
  <div class="pagination-container container">
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
  padding: 20px 0;
  padding-left: calc(15px + 1.5%);
  padding-right: calc(15px + 1.5%);
  .pagination {
    margin: 0;
  }
}
</style>
