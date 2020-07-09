<template>
  <div class="table-list">
    <div class="container">
      <b-table
        hover
        :fields="fields"
        :items="list"
        responsive
        outlined
        head-variant="light"
      >
        <template v-slot:cell(topic)="data">
          {{ data.item.versions[data.item.versions.length - 1].topic }}
        </template>
        <template v-slot:cell(title)="data">
          {{ data.item.versions[data.item.versions.length - 1].title }}
          {{ data.item.versions[data.item.versions.length - 1].title_en }}
        </template>
        <template v-slot:cell(speakers)="data">
          <div class="speakers">
            <img
              class="speaker"
              v-for="(speaker, index) in data.item.versions[
                data.item.versions.length - 1
              ].speakers"
              :key="index"
              :src="speaker.avatar_url"
              alt="speaker"
            />
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableList",
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      fields: [
        {
          key: "topic",
          label: "主題分類 Topic",
          thClass: "table-no-wrap",
          tdClass: "table-no-wrap"
        },
        {
          key: "title",
          label: "投稿標題 Title",
          thClass: "table-no-wrap",
          tdClass: "table-no-wrap"
        },
        {
          key: "speakers",
          label: "講者 Speakers",
          thClass: "table-no-wrap",
          tdClass: "table-no-wrap"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.table-list {
  table {
    text-align: left;
    td {
      vertical-align: middle;
      padding: 0.5rem;
    }
    .table-no-wrap {
      white-space: nowrap;
    }
  }
  .speakers {
    display: flex;
    .speaker {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 15px;
    }
  }
}
</style>
