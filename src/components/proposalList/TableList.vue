<template>
  <div class="table-list">
    <div class="table-list__content br2 ba b--moon-gray overflow-hidden">
      <row-view :row="header" :is-header="true" />
      <row-view
        v-for="row in list"
        :key="row._id"
        :row="row"
        :router-name="routerName"
      />
    </div>
  </div>
</template>

<script>
import RowView from "./RowView";

export default {
  name: "TableList",
  components: {
    RowView
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    routerName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      header: {
        versions: [
          {
            topic: "類型 Topic",
            title: "標題 Title"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss">
.table-list {
  background: #efefef;
  padding: 1rem;
  &__content {
    background: white;
    max-width: $width--proposal-list;
    margin: 0 auto;
  }
}
</style>
