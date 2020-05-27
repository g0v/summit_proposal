<template>
  <section class="faq" id="faq">
    <div class="faq-container container">
      <h2 class="main-title drark">FAQ</h2>
      <div class="item">
        <div class="q">
          <b-icon icon="question-square-fill" variant="danger"></b-icon
          >提案結果何時公佈？入選與未入選都會收到通知嗎？
        </div>
        <p class="a">
          <b-icon icon="chat-dots" variant="dark"></b-icon>提案審查將於 ??
          完成，我們將以 email 通知入選及未入選的提案人/團隊。
        </p>
      </div>
      <div class="item">
        <div class="q">
          <b-icon icon="question-square-fill" variant="danger"></b-icon
          >投稿後，是否還可以修改投稿內容？
        </div>
        <p class="a">
          <b-icon icon="chat-dots" variant="dark"></b-icon
          >可以。本次大會採開放協作式的投稿系統。提案者送出提案後，投稿內容將會呈現在大會網站上，供大眾提問及評論。提案者在
          xx 之前，都可利用提案系統與評論者互動，並修改提案。提案系統將於 xx
          關閉修改功能。
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FAQ"
};
</script>

<style lang="scss" scoped>
.faq {
  background-color: $sub-color;
}
.faq-container {
  padding: 45px 0;
  h2 {
    margin-bottom: 45px;
  }
  .item {
    text-align: left;
    background-color: #ffffffab;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    color: #000;
    &:hover {
      box-shadow: 0 0 5px #fdfdfe;
      background-color: #ffffffc7;
    }
    &:last-child {
      margin-bottom: 0;
    }
    .q {
      margin-bottom: 15px;
      color: $main-color;
    }
    .a {
      margin-bottom: 0;
    }
    svg {
      margin-right: 5px;
    }
  }
}
</style>
