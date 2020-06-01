<template>
  <section class="agenda" id="agenda">
    <div class="agenda-container container">
      <h2 class="main-title light">歷年議程</h2>
      <div class="links">
        <div class="item">
          <h3>2018 開放了？然後咧！</h3>
          <a href="https://summit.g0v.tw/2018/agenda/" target="_blank"
            ><b-button variant="dark" size="lg">點我去看看</b-button></a
          >
        </div>
        <div class="item">
          <h3>2016 拆後重建</h3>
          <a href="https://summit.g0v.tw/2016/schedules" target="_blank"
            ><b-button variant="dark" size="lg">點我去看看</b-button></a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Agenda"
};
</script>

<style lang="scss" scoped>
.agenda-container {
  padding-top: 45px;
  padding-bottom: 45px;
  h2 {
    margin-bottom: 50px;
  }
  .links {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      width: 100%;
      height: 300px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      overflow: hidden;
      position: relative;
      box-shadow: 0px 0px 3px 1px #000000a8;
      transition: transform 700ms;
      &:hover {
        transform: scale(1.05);
      }
      @include mediaquery_pad {
        width: 47%;
      }
    }
    .item:nth-child(1) {
      background-image: url("../../assets/images/2018banner.png");
      margin-bottom: 20px;
      @include mediaquery_pad {
        margin-bottom: 0;
      }
    }
    .item:nth-child(2) {
      background-image: url("../../assets/images/2016banner.png");
    }
    h3 {
      background-color: $sub-color;
      transform: rotate(-12deg);
      color: #fff;
      width: 110%;
      position: relative;
      left: -5%;
      top: 20%;
    }
    a {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
