<template>
  <section class="about-summit">
    <div class="about-summit-container container">
      <h2 class="main-title drark">關於 g0v Summit</h2>
      <article>
        <h3>
          <img
            class="idea-icon"
            src="@/assets/images/idea.svg"
            alt="idea icon"
          />簡介
        </h3>
        <p>
          g0v Summit
          國際雙年會兩年舉辦一次，關注開放政府、開源協作、公民參與等面向，是國際開放政府社群的焦點活動，過去三屆吸引多達23國講者投稿。雙年會全部由社群參與者志願籌辦，議程也秉持開放協作精神，全部議程皆有口譯、文字記錄和直播。議程除了大會籌辦，也開放完整時段的開放工作坊（Unconference）由參與者提案決定議程內容，以演講、討論、自由對話等形式創造新的協作空間。閉幕前自由報名的全場閃電講更是開源社群傳統，以開放分享的精神貫穿年會。
        </p>
      </article>
      <article>
        <h3>
          <img
            class="idea-icon"
            src="@/assets/images/idea.svg"
            alt="idea icon"
          />g0v summit 2020 特色
        </h3>
        <h4>特色一／全球公民科技盛會</h4>
        <p>
          皆有來自全球各國的講者、參與者來到台灣，帶著豐富的經驗，透過演講、討論、工作坊，與近千名與會者交流經驗。
        </p>
        <h4>特色二／開放開源群眾協作 g0v Summit</h4>
        <p>
          專注於實作者的經驗交流。我們希望聽到講者和與會者就社會問題提出解決方案，不論是分享鼓舞人心的成功案例，或是從失敗經驗中學習成長，g0v
          Summit
          透過會場安排與議程設計，讓真誠的交流得以發生，讓動手做事的人找到更多前進的動力。
        </p>
        <h4>特色三／深度連結在地社群 g0v</h4>
        <p>
          Summit 2020 首次離開台北，在台南舉辦。g0v Summit
          工作小組與台南在地伙伴協作一年，連結台南及鄰近縣市的 maker
          社群、NGO、文化工作者、教育工作者，讓習慣虛擬空間的公民黑客與在實體空間中奔走的社群貢獻者們齊聚一堂，聆聽彼此的故事，用對話了解彼此。
        </p>
      </article>
      <article>
        <h3>
          <img
            class="idea-icon"
            src="@/assets/images/idea.svg"
            alt="idea icon"
          />g0v Summit 2020 內容
        </h3>
        <p>
          相較於過去的 g0v Summit，為期 2-3 天，在單一會場集中舉行，g0v Summit
          2020 擴大參與，聯合在地社群，推出連續 4
          天的黑客松、短講、主題論壇、自由對話與開放工作坊，活動場所也擴大到 5
          個會場，包含各在地社群經營多年的空間與群眾。
        </p>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutSummit"
};
</script>

<style lang="scss" scoped>
.about-summit {
  background-color: $sub-color;
}
.about-summit-container {
  padding: 45px 0;
  h2 {
    margin-bottom: 30px;
  }
  article {
    text-align: left;
    color: #fff;
    margin-bottom: 45px;
    h3 {
      font-size: 25px;
      margin-bottom: 30px;
      .idea-icon {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
    }
    h4 {
      font-size: 20px;
    }
    p {
      font-size: 17px;
    }
  }
}
</style>
