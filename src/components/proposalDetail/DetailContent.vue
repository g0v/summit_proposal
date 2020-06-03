<template>
  <div class="detail-content">
    <div class="detail-content-container container">
      <div class="side">
        <div class="item">
          <h4>關注中</h4>
          <div class="content">
            <img src="@/assets/images/pics/劉哲瑋.png" alt="follower" />
            <img src="@/assets/images/pics/劉哲瑋.png" alt="follower" />
            <img src="@/assets/images/pics/劉哲瑋.png" alt="follower" />
          </div>
        </div>
        <div class="item">
          <h4>修訂紀錄</h4>
          <div class="content record">
            <span>a year ago</span>
            <span>a year ago</span>
          </div>
        </div>
      </div>
      <main>
        <div class="item">
          <h3>你需要多少錢？（30 ~ 50 萬之間）</h3>
          <p>500000</p>
        </div>
        <div class="item">
          <h3>
            請以簡短且非專業人士也能理解的方式介紹此專案。
          </h3>
          <p>
            目前台灣大眾面對假新聞、公眾議題普遍欠缺獨立思考與懷疑的精神，常只以情緒反應代替有效溝通的狀況，在各年齡層都有這個狀況，希望透過這個專案能建立一個批判性思考學習工具、公眾討論工具平台，為社會帶來「促成社會大眾能夠理性和有效的溝通」的改變。
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailContent",
  props: {
    projectDetail: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-content-container {
  padding: 20px;
  background-color: #ece8e8;
  display: flex;
  justify-content: space-between;
  .side {
    width: 20%;
  }
  main {
    width: 75%;
  }
  .side {
    text-align: left;
    .item {
      margin-bottom: 30px;
      h4 {
        font-size: 16px;
        color: #000;
        border-bottom: 3px solid $main-color;
        text-align: center;
        padding: 5px 0;
        font-weight: 600;
      }
      .content {
        img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 50%;
          margin: 8px;
        }
        span {
          display: block;
        }
      }
    }
  }
  main {
    text-align: left;
    color: #000;
    .item {
      margin-bottom: 50px;
      position: relative;
      &:not(:last-child)::after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background-color: #827d7d1f;
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    h3 {
      font-size: 20px;
    }
    p {
      margin-bottom: 0;
    }
  }
}
</style>
