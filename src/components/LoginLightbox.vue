<template>
  <section class="login">
    <div class="login-container">
      <div class="title">
        <h2>登入</h2>
        <b-icon icon="x-square" @click="$emit('close')"></b-icon>
      </div>
      <div class="content">
        <a
          :href="
            `https://api.summit2020.pre-stage.cc/auth/facebook?authCallback=${domain}/redirect`
          "
          ><b-button>Facebook</b-button></a
        >
        <a
          :href="
            `https://api.summit2020.pre-stage.cc/auth/google?authCallback=${domain}/redirect`
          "
          ><b-button>Google</b-button></a
        >
        <a
          :href="
            `https://api.summit2020.pre-stage.cc/auth/github?authCallback=${domain}/redirect`
          "
          ><b-button>Github</b-button></a
        >
        <a
          :href="
            `https://api.summit2020.pre-stage.cc/auth/slack?authCallback=${domain}/redirect`
          "
          ><b-button>Slack</b-button></a
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginLightbox",
  data() {
    return {
      domain: window.location.origin
    };
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff7d;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  border-radius: 5px;
  padding: 20px;
  background-color: #292828;
  width: 300px;
  .title {
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h2 {
      font-size: 20px;
      margin-bottom: 0;
    }
    svg {
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    button {
      width: 100%;
      margin-bottom: 10px;
      background-color: $main-color;
      color: #fff;
      border: 3px solid $main-color;
      transition: background-color 500ms;
      font-weight: 600;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
