<template>
  <section class="redirect">
    <div class="redirect-container container">
      <h2>登入中，請稍等</h2>
      <div class="loading">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Redirect",
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch("updateToken", to.query.token);
      vm.$store.dispatch("fetchUserInfo");
      vm.$router.push({ name: "Homepage" });
    });
  }
};
</script>

<style lang="scss" scoped>
.redirect-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 90px - 104px);
}
h2 {
  font-size: 20px;
  color: $sub-color;
}
.loading {
  height: 50px;
  display: flex;
  align-items: flex-end;
  .line {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: $main-color;
    margin: 0 3px;
    &:nth-child(1) {
      animation: loadingAnimation 1.5s 0s infinite;
    }
    &:nth-child(2) {
      animation: loadingAnimation 1.5s 0.5s infinite;
    }
    &:nth-child(3) {
      animation: loadingAnimation 1.5s 1s infinite;
    }
  }
}

@keyframes loadingAnimation {
  0% {
    height: 15px;
  }
  50% {
    height: 50px;
  }
  100% {
    height: 15px;
  }
}
</style>
