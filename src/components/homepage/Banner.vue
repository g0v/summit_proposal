<template>
  <section class="banner">
    <div class="banner-container container">
      <div class="info">
        <h2>
          <span>g0v summit 2020 <br />Call for Paperbr</span><br />2020
          台灣零時政府<br />高峰會議程招募
        </h2>
        <span class="time">招募日期：2020/06/04</span>
        <span class="time">活動日期：2020/12/03（四）~ 2020/12/06（日）</span>
        <div class="buttons">
          <router-link :to="{ name: 'PropasalList' }">
            <b-button variant="danger" size="lg">提案瀏覽</b-button>
          </router-link>
          <router-link :to="{ name: 'ProposalCreate' }">
            <b-button variant="danger" size="lg">我要提案</b-button>
          </router-link>
        </div>
      </div>
      <div class="image">
        <img src="@/assets/images/banner.svg" alt="banner image" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Banner"
};
</script>

<style lang="scss" scoped>
.banner-container {
  text-align: left;
  display: flex;
  align-items: center;
  height: calc(100vh - 90px);
  .info,
  .image {
    width: 50%;
  }
  .info {
    h2 {
      font-weight: 900;
      font-size: 45px;
      margin-bottom: 20px;
      color: #000;
      span {
        color: $main-color;
      }
    }
    .time {
      display: block;
      font-weight: 900;
    }
    .time:nth-child(3) {
      margin-bottom: 20px;
    }
    button {
      margin-right: 10px;
    }
  }
  .image {
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
