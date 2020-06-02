<template>
  <div class="list">
    <div class="list-container container">
      <router-link
        v-for="item in list"
        :key="item._id"
        tag="div"
        class="item"
        :to="{ name: routerName, params: { id: item._id } }"
      >
        <div class="cover">
          <img
            :src="item.versions[item.versions.length - 1].cover_image"
            alt="project cover"
          />
          <div class="owner">
            <img
              v-for="(speaker, index) in item.versions[item.versions.length - 1]
                .speakers"
              :key="index"
              :src="speaker.avatar_url"
              alt="owner pic"
            />
          </div>
        </div>
        <div class="content">
          <h3>
            <span>{{ item.versions[item.versions.length - 1].title }}</span>
            <span>{{ item.versions[item.versions.length - 1].title_en }}</span>
          </h3>
          <p>
            {{ item.versions[item.versions.length - 1].summary }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    routerName: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.list-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    margin-bottom: 15px;
    padding: 40px 20px;
    box-shadow: 0px 0px 1px 0px #00000052, 0px 12px 8px -12px #000;
    border-radius: 5px;
    background-color: #ffffff94;
    text-decoration: none;
    @include mediaquery_phone {
      width: 46%;
      margin: 2%;
    }
    @include mediaquery_medium_devices {
      width: 31%;
      margin: 0 1% 2%;
    }
    &:hover {
      background-color: #ffffffbf;
      position: relative;
      top: -1px;
      left: -1px;
      box-shadow: 1px 2px 2px #333131;
    }
    .cover {
      width: 80%;
      height: 150px;
      position: relative;
      margin-bottom: 40px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
      }
      .owner {
        width: 50px;
        height: 50px;
        position: absolute;
        bottom: 0;
        left: -20px;
        display: flex;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }
    .content {
      color: #000;
      h3 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 5px;
        height: 70px;
        span {
          display: block;
        }
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        margin-bottom: 0;
        font-size: 15px;
      }
    }
  }
}
</style>
