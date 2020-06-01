<template>
  <div class="list">
    <div class="list-container container">
      <router-link
        teg="div"
        class="item"
        :to="{ name: 'ProposalDetail', params: { id: 1 } }"
      >
        <div class="cover">
          <img src="@/assets/images/cover-2.png" alt="project cover" />
          <div class="owner">
            <img src="@/assets/images/pics/吳蕙如.jpg" alt="owner pic" />
          </div>
        </div>
        <div class="content">
          <h3>思考方塊 Thinking Cube</h3>
          <p>
            目前台灣大眾面對假新聞、公眾議題普遍欠缺獨立思考與懷疑的精神，常只以情緒反應代替有效溝通的狀況，在各年齡層都有這個狀況，希望透過這個專案能建立一個批判性思考學習工具、公眾討論工具平台，為社會帶來「促成社會大眾能夠理性和有效的溝通」的改變。
          </p>
        </div></router-link
      >
      <router-link teg="div" class="item" :to="{ name: 'ProposalDetail' }">
        <div class="cover">
          <img src="@/assets/images/cover.png" alt="project cover" />
          <div class="owner">
            <img src="@/assets/images/pics/ky.png" alt="owner pic" />
          </div>
        </div>
        <div class="content">
          <h3>思考方塊 Thinking Cube</h3>
          <p>
            目前台灣大眾面對假新聞、公眾議題普遍欠缺獨立思考與懷疑的精神，常只以情緒反應代替有效溝通的狀況，在各年齡層都有這個狀況，希望透過這個專案能建立一個批判性思考學習工具、公眾討論工具平台，為社會帶來「促成社會大眾能夠理性和有效的溝通」的改變。
          </p>
        </div>
      </router-link>
      <router-link teg="div" class="item" :to="{ name: 'ProposalDetail' }">
        <div class="cover">
          <img src="@/assets/images/cover-2.png" alt="project cover" />
          <div class="owner">
            <img src="@/assets/images/pics/吳蕙如.jpg" alt="owner pic" />
          </div>
        </div>
        <div class="content">
          <h3>思考方塊 Thinking Cube</h3>
          <p>
            目前台灣大眾面對假新聞、公眾議題普遍欠缺獨立思考與懷疑的精神，常只以情緒反應代替有效溝通的狀況，在各年齡層都有這個狀況，希望透過這個專案能建立一個批判性思考學習工具、公眾討論工具平台，為社會帶來「促成社會大眾能夠理性和有效的溝通」的改變。
          </p>
        </div>
      </router-link>
      <router-link teg="div" class="item" :to="{ name: 'ProposalDetail' }">
        <div class="cover">
          <img src="@/assets/images/cover.png" alt="project cover" />
          <div class="owner">
            <img src="@/assets/images/pics/ky.png" alt="owner pic" />
          </div>
        </div>
        <div class="content">
          <h3>思考方塊 Thinking Cube</h3>
          <p>
            目前台灣大眾面對假新聞、公眾議題普遍欠缺獨立思考與懷疑的精神，常只以情緒反應代替有效溝通的狀況，在各年齡層都有這個狀況，希望透過這個專案能建立一個批判性思考學習工具、公眾討論工具平台，為社會帶來「促成社會大眾能夠理性和有效的溝通」的改變。
          </p>
        </div>
      </router-link>
      <router-link teg="div" class="item" :to="{ name: 'ProposalDetail' }">
        <div class="cover">
          <img src="@/assets/images/cover.png" alt="project cover" />
          <div class="owner">
            <img src="@/assets/images/pics/ky.png" alt="owner pic" />
          </div>
        </div>
        <div class="content">
          <h3>思考方塊 Thinking Cube</h3>
          <p>
            目前台灣大眾面對假新聞、公眾議題普遍欠缺獨立思考與懷疑的精神，常只以情緒反應代替有效溝通的狀況，在各年齡層都有這個狀況，希望透過這個專案能建立一個批判性思考學習工具、公眾討論工具平台，為社會帶來「促成社會大眾能夠理性和有效的溝通」的改變。
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { handleApiError } from "@/utils/mixins";

export default {
  name: "List",
  mixins: [handleApiError],
  computed: {
    ...mapGetters(["allProjectList"])
  },
  async mounted() {
    await this.handleApiError(this.$store.dispatch("listProjects"));
  }
};
</script>

<style lang="scss" scoped>
.list-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .item {
    width: 31%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    margin: 0 1% 2%;
    padding: 40px 20px;
    box-shadow: 0px 0px 1px 0px #00000052, 0px 12px 8px -12px #000;
    border-radius: 5px;
    background-color: #ffffff94;
    text-decoration: none;
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
        right: -10%;
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
        margin-bottom: 15px;
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
