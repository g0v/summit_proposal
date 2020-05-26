<template>
  <section class="agenda">
    <div class="agenda-container container">
      <h2 class="main-title light">歷年議程</h2>
      <div class="links">
        <div class="item">
          <h3>2018 開放了？然後咧！</h3>
          <b-button variant="dark" size="lg"
            ><a href="https://summit.g0v.tw/2018/agenda/" target="_blank"
              >點我去看看</a
            ></b-button
          >
        </div>
        <div class="item">
          <h3>2016 拆後重建</h3>
          <b-button variant="dark" size="lg"
            ><a href="https://summit.g0v.tw/2016/schedules" target="_blank"
              >點我去看看</a
            ></b-button
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
  padding: 45px 0;
  h2 {
    margin-bottom: 50px;
  }
  .links {
    display: flex;
    justify-content: space-between;
    .item {
      width: 47%;
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
    }
    .item:nth-child(1) {
      background-image: url("../../assets/images/2018banner.png");
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
    ::v-deep button {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      a {
        display: block;
        width: 100%;
        height: 100%;
        color: #fff;
      }
    }
  }
}
</style>
