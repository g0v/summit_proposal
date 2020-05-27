<template>
  <section class="submit" id="submit">
    <div class="submit-container container">
      <h2 class="main-title light">投稿辦法</h2>
      <section class="item">
        <h3><b-icon icon="heart-fill" variant="danger"></b-icon>投稿主題</h3>
        <div class="categories">
          <div class="category">
            <div class="icon">
              <img src="@/assets/images/category/school.svg" alt="教育科技" />
            </div>
            <h4>教育科技</h4>
          </div>
          <div class="category">
            <div class="icon">
              <img src="@/assets/images/category/school.svg" alt="教育科技" />
            </div>
            <h4>教育科技</h4>
          </div>
          <div class="category">
            <div class="icon">
              <img src="@/assets/images/category/school.svg" alt="教育科技" />
            </div>
            <h4>教育科技</h4>
          </div>
          <div class="category">
            <div class="icon">
              <img src="@/assets/images/category/school.svg" alt="教育科技" />
            </div>
            <h4>教育科技</h4>
          </div>
          <div class="category">
            <div class="icon">
              <img src="@/assets/images/category/school.svg" alt="教育科技" />
            </div>
            <h4>教育科技</h4>
          </div>
        </div>
      </section>
      <section class="item">
        <h3><b-icon icon="calendar3" variant="primary"></b-icon>投稿時程</h3>
        <ul class="time">
          <li>徵件開始：2020/06/04</li>
          <li>徵件截止：2020/06/28</li>
          <li>公開討論截止：2020/07/30</li>
          <li>投稿文字修改截止：2020/08/02</li>
          <li>通知投稿結果：八月底</li>
          <li>講者報名截止：待議</li>
        </ul>
      </section>
      <section class="item">
        <h3>
          <b-icon icon="pencil-square" variant="success"></b-icon
          >投稿方法(以下文字待 finalize)
        </h3>
        <p>
          議程除基調講者及共同主辦單位之部分議程為邀請制外，其餘所有議程皆由大會進行線上公開徵件。
        </p>
        <p>
          提案送出後，你的提案將摒除不公開個資，公開顯示在 g0v summit 2020 CFP
          網頁上，並開設提案討論區供大眾發表評論。我們鼓勵提案者在討論區與提問者互動討論，進而調整與修改提案內容。
        </p>
        <p>
          線上投稿系統將於 6/28 截止，但提案者仍可以持續在 g0v summit 2020 CFP
          系統中修改提案內容，並在討論區持續與大眾互動。討論功能將於 7/30
          關閉，提案修改則於 8/2 關閉。提案與修改皆凍結後，g0v summit 2020
          議程委員將會選出本屆 summit 的議程，並於八月底陸續在 g0v summit 2020
          網站上公布。
        </p>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: "Submit"
};
</script>

<style lang="scss" scoped>
.submit-container {
  padding: 45px 0;
  h2 {
    margin-bottom: 45px;
  }
  .item {
    text-align: left;
    color: #000;
    margin-bottom: 45px;
    font-size: 17px;
    h3 {
      font-size: 25px;
      margin-bottom: 30px;
      svg {
        margin-right: 5px;
      }
    }
    .categories {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .category {
        width: 23%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1%;
        .icon {
          width: 100px;
          height: 100px;
          border: 5px solid #717071fa;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        h4 {
          font-size: 20px;
        }
      }
    }
    .time {
      list-style-type: disc;
      padding: 0 20px;
      li {
        font-weight: 400;
        line-height: 2;
      }
    }
  }
}
</style>
