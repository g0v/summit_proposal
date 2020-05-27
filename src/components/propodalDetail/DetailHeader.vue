<template>
  <div class="detail-header">
    <div class="detail-header-container container">
      <div class="cover">
        <img src="@/assets/images/cover.png" alt="cover" />
      </div>
      <div class="title">
        <h2>思考方塊 <br />Thinking Cube 2019A</h2>
        <div class="owner">
          <img src="@/assets/images/pics/張家豪.png" alt="owner" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailHeader"
};
</script>

<style lang="scss" scoped>
.detail-header-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 45px;
  .cover {
    width: 45%;
  }
  .owner {
    width: 50%;
  }
  .cover {
    height: 150px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      position: relative;
      z-index: 2;
    }
    &::after {
      content: "";
      display: block;
      height: 200px;
      width: 50%;
      position: absolute;
      top: -25px;
      left: -10px;
      background-color: $main-color;
      z-index: 1;
    }
  }
  .title {
    position: relative;
    text-align: left;
    h2 {
      font-size: 40px;
      font-weight: 600;
    }
    .owner {
      width: 50px;
      height: 50px;
      position: absolute;
      bottom: 0;
      right: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
}
</style>
