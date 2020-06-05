<template>
  <section class="login">
    <div class="agree-container" v-if="!isAgree">
      <div class="title">
        <h2>g0v summit 2020 個人資料蒐集、處理及利用同意書</h2>
        <b-icon icon="x-square" @click="$emit('close')"></b-icon>
      </div>
      <div class="content" v-if="!isAgree">
        <span
          >為遵守「個人資料保護法」規定，並保障當事人之權利，謹依法告知下列事項：</span
        >
        <ul class="list">
          <li>機關單位名稱：g0v summit 2020 籌備團隊</li>
          <li>蒐集之特定目的：g0v summit 活動籌備使用</li>
          <li>個人資料之項目：參考上述投稿方法之內容</li>
          <li>
            <span>個人資料利用之期間、地區、對象及方式：</span>
            <ul class="list-detail">
              <li>
                期間: g0v summit 2020 及未來 g0v summit 籌備期間
                （籌備時間認定為該屆總召確認當日起，至活動結束後30天內）
              </li>
              <li>地區：台灣</li>
              <li>對象：於 g0v summit 2020 網頁提案者</li>
              <li>方式：蒐集、處理、利用</li>
            </ul>
          </li>
          <li>
            <span>依個人資料保護法第3條規定，當事人可行使以下權利：</span>
            <ul>
              <li>查詢或請求閱覽。</li>
              <li>請求製給複製本。</li>
              <li>請求補充或更正</li>
              <li>請求停止蒐集、處理及利用。</li>
              <li>請求刪除</li>
            </ul>
          </li>
          <li>
            依個人資料保護法第14條規定，當事人查詢或請求閱覽個人資料或製給複製本。
          </li>
          <li>
            若遇行使第5及6條權利，請寫信至
            <a href="mailto:g0v-summit-host@googlegroups.com"
              >g0v-summit-host@googlegroups.com</a
            >
            ，本團隊將依法進行回覆。
          </li>
        </ul>
      </div>
      <b-button @click="isAgree = true">同意，繼續下一步</b-button>
    </div>
    <div class="login-container" v-else>
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
      domain: window.location.origin,
      isAgree: false
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
  z-index: 2;
}
// 共同
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
button {
  width: 100%;
  margin-bottom: 10px;
  transition: background-color 500ms;
  font-weight: 600;
  background-color: $main-color;
  color: #fff;
  border: 1px solid $main-color;
  &:hover {
    opacity: 0.8;
    background-color: $main-color;
    color: #fff;
    border: 1px solid $main-color;
  }
}
.login-container {
  border-radius: 5px;
  padding: 20px;
  background-color: #292828;
  width: 300px;
  .content {
    display: flex;
    flex-direction: column;
  }
}
.agree-container {
  border-radius: 5px;
  padding: 20px;
  background-color: #292828;
  color: #fff;
  text-align: center;
  max-height: 85vh;
  overflow: scroll;
  .title {
    h2 {
      color: $main-color;
      text-align: left;
    }
  }
  .content {
    text-align: left;
    .list {
      list-style: decimal;
      padding-left: 20px;
    }
    .list-detail {
      list-style: lower-alpha;
      padding-left: 30px;
    }
    li {
      margin-bottom: 10px;
    }
  }
  button {
    width: 200px;
  }
}
</style>
