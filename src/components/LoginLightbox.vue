<template>
  <section class="login">
    <div class="agree-container" v-if="!isAgree" v-body-scroll-lock="!isAgree">
      <div class="title">
        <h2>
          g0v Summit 2020 個人資料蒐集、處理及利用同意書<br />g0v Summit 2020
          Personal Data Collection Agreement
        </h2>
        <b-icon icon="x-square" @click="$emit('close')"></b-icon>
      </div>
      <div class="content">
        <span>
          為遵守「個人資料保護法」規定，並保障當事人之權利，謹依法告知下列事項：<br />
          In respect to the “Personal Information Protection Act”, notify you of
          your responsibilities and rights by the following:
        </span>
        <ul class="list">
          <li>
            機關單位名稱：g0v summit 2020 籌備團隊<br />
            Institution: g0v Summit 2020 Working Group.
          </li>
          <li>
            蒐集之特定目的：g0v Summit 活動籌備使用<br />
            Purpose: g0v Summit event usage.
          </li>
          <li>
            個人資料之項目：參考上述投稿方法之內容<br />
            Collected data: Personal data on Application form.
          </li>
          <li>
            <span>個人資料利用之期間、地區、對象及方式：</span>
            <ul class="list-detail">
              <li>
                期間: g0v Summit 2020 及未來 g0v Summit 籌備期間
                （籌備時間認定為該屆總召確認當日起，至活動結束後 30 天內）
              </li>
              <li>地區：台灣</li>
              <li>對象：於 g0v summit 2020 網頁提案者</li>
              <li>方式：蒐集、處理、利用</li>
            </ul>
            <span>Personal data usaging detail:</span>
            <ul class="list-detail">
              <li>
                duration: g0v Summit 2020 perparation and 30 days after event
                days.
              </li>
              <li>Area: Taiwan (R.O.C)</li>
              <li>
                Data usage subjcet: g0v Summit 2020 website and its proposal.
              </li>
              <li>methods: Collecting, Editing, using.</li>
            </ul>
          </li>
          <li>
            <span>依個人資料保護法第 3條規定，當事人可行使以下權利：</span>
            <ul class="list-detail">
              <li>查詢或請求閱覽。</li>
              <li>請求製給複製本。</li>
              <li>請求補充或更正</li>
              <li>請求停止蒐集、處理及利用。</li>
              <li>請求刪除</li>
            </ul>
            <span>
              In terms of the 3rd paragraph of the Act, you may request the
              following rights:
            </span>
            <ul class="list-detail">
              <li>Inquire or request to view.</li>
              <li>Request for a hard copy.</li>
              <li>Request for annotation or correction.</li>
              <li>Request for stop collecting, edit, using.</li>
              <li>Request for Deletion.</li>
            </ul>
          </li>
          <li>
            依個人資料保護法第14條規定，當事人查詢或請求閱覽個人資料或製給複製本。<br />
            In terms of the 14th paragraph of the Act, you can Inquire or
            request for viewing your personal data or request for a hard copy.
          </li>
          <li>
            若遇行使第5及6條權利，請寫信至
            <a href="mailto:g0v-summit-host@googlegroups.com"
              >g0v-summit-host@googlegroups.com</a
            >
            ，本團隊將依法進行回覆。<br />
            If the purpose of 5th, 6th right, please email
            <a href="mailto:programming@summit.g0v.tw">
              g0v-summit-host@googlegroups.com
            </a>
            .
          </li>
        </ul>
      </div>
      <b-button @click="isAgree = true">同意，繼續下一步</b-button>
    </div>
    <div class="login-container" v-else v-body-scroll-lock="isAgree">
      <div class="title">
        <h2>登入</h2>
        <b-icon icon="x-square" @click="$emit('close')"></b-icon>
      </div>
      <div class="content">
        <a :href="`${baseURL}/auth/facebook?authCallback=${domain}/redirect`"
          ><b-button>Facebook</b-button></a
        >
        <a :href="`${baseURL}/auth/google?authCallback=${domain}/redirect`"
          ><b-button>Google</b-button></a
        >
        <a :href="`${baseURL}/auth/github?authCallback=${domain}/redirect`"
          ><b-button>Github</b-button></a
        >
        <a :href="`${baseURL}/auth/slack?authCallback=${domain}/redirect`"
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
      isAgree: false,
      baseURL: location.href.includes("propose.summit2020.g0v.tw")
        ? `https://api.summit2020.g0v.tw`
        : `https://api.summit2020.pre-stage.cc`
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
  z-index: 5;
}
// 共同
.title {
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  h2 {
    font-size: 20px;
    margin-bottom: 0;
  }
  svg {
    position: absolute;
    top: -15px;
    right: -15px;
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
  max-width: 90%;
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
