<template>
  <section class="committee" id="committee">
    <div class="committee-container container">
      <h2 class="main-title light">議程委員會</h2>
      <b-card-group columns>
        <b-card
          title="ETBlue"
          img-src="@/assets/images/pics/ETBlue.png"
          img-alt="ETBlue"
          img-top
        >
          <b-card-text>
            曾深度參與 g0v
            多項跨界專案，分別和不同專業的共同作者將相關經驗整理成
            Blupa、Blulu、ETCC 等圖解模型，於包括 g0v summit
            在內的研討會發表。已淡出社群多年，可望在議程討論中提供外部的觀點。
            興趣是轉行，曾從事臨床醫療、科學繪圖、企畫管理、介面設計，最近剛轉行到程式設計。
          </b-card-text>
          <template v-slot:header>
            <small>網頁前端工程師</small>
          </template>
        </b-card>

        <b-card
          title="ky"
          img-src="@/assets/images/pics/ky.png"
          img-alt="ky"
          img-top
        >
          <b-card-text>
            g0v
            社群參與者，不務正業的法律人程序控，長年的台日交流小幫手，平常遊走於公私部門之間的協調者，2016
            年意外跌進了 vTaiwan 的坑 ，和大家一起探索開放社群永續發展的極限。
          </b-card-text>
          <template v-slot:header>
            <small>自由人</small>
          </template>
        </b-card>

        <b-card
          title="Hsinyi"
          img-src="@/assets/images/pics/Hsinyi.jpg"
          img-alt="Hsinyi"
          img-top
        >
          <b-card-text>
            目前正職的工作是台灣廢除死刑推動聯盟執行長。2003年參與廢死聯盟的成立、2007年成為廢死聯盟第一位全職工作人員至今，人生大部分的經驗及投入的工作就是廢死。
            關心各式的人權議題，但能投入的有限，目前也是人權公約施行監督聯盟和西藏台灣人權連線的理事。
            希望能活著見到台灣獨立以及廢除死刑。
            對於g0v只有遠遠的仰望及少少的接觸，但覺得這群人正在做很酷的事，很榮幸今年可以參與g0v-summit
            2020及學習。
          </b-card-text>
          <template v-slot:header>
            <small>台灣廢除死刑推動聯盟執行長</small>
          </template>
        </b-card>

        <b-card
          title="jsl"
          img-src="@/assets/images/pics/jsl.jpg"
          img-alt="jsl"
          img-top
        >
          <b-card-text>
            希望能夠紀錄、觀察、理解網路科技對社會影響的文字工作者。關注網路X人權、網路X政治、開放政府和網路科技的商業發展。賺錢求生的工作包括商業周刊、金融時報記者，華陽創投董事長特助。實現理想的工作是在台南開一家咖啡店。
            跟g0v的相遇是在報導完德國海盜黨之後，對Summit的期待是為更多人創造同等美好且有意義的相遇，而後開始一些事情。
          </b-card-text>
          <template v-slot:header>
            <small>報導者主筆</small>
          </template>
        </b-card>
        <b-card
          title="劉哲瑋"
          img-src="@/assets/images/pics/劉哲瑋.png"
          img-alt="劉哲瑋"
          img-top
        >
          <b-card-text>
            任職於經典工程顧問有限公司(http://www.classic1990.com/)，持續以社群志願者的身份，參與「零時政府揪松團
            (g0v Jothon)」、「公有地大行動 (POP on Fire)」、「資料申請小幫手
            (Dataopener.tw)」、「都市農耕網 (Farming Urbanism
            Network)」等開放知識公民社群的行動。
          </b-card-text>
          <template v-slot:header>
            <small>零時政府揪松團志工</small>
          </template>
        </b-card>

        <b-card
          title="張家豪"
          img-src="@/assets/images/pics/張家豪.png"
          img-alt="張家豪"
          img-top
        >
          <b-card-text>
            畢業於嘉義大學生物機電工程研究所，曾任職傳產系統工程師。喜愛學新技術及自造小玩意，碰巧搭上創客運動風潮，2016在Fablab
            Academy結業。在南方創客基地服務，主要負責場地設備維護管理、課程規畫執行及專案開發。
          </b-card-text>
          <template v-slot:header>
            <small>南方創客基地 技術總監</small>
          </template>
        </b-card>
        <b-card
          title="吳蕙如"
          img-src="@/assets/images/pics/吳蕙如.jpg"
          img-alt="吳蕙如"
          img-top
        >
          <b-card-text>
            從中山大學社會系畢業後就到新芽工作，現在四年了。即使現在從中央到地方政府都強調資料開放，但在地方議會，無論是議會預決算、會議資料、會議記錄等，都是非常不足夠，卻也少有人關注的。期待能在summit中得到更多催促議會進步的靈感。
          </b-card-text>
          <template v-slot:header>
            <small>台南新芽秘書長</small>
          </template>
        </b-card>
        <b-card
          title="Howard Wu"
          img-src="@/assets/images/pics/Howard.jpg"
          img-alt="Howard Wu"
          img-top
        >
          <b-card-text>
            好想工作室創辦人，在台南經營 co-working
            space，並且提供免費的資訊培育，以 mentor
            引導、學員自主學習的方式，量產好品質的工程師。好想工作室也是台南資訊社群聚集地，舉辦超過
            600
            場公開講座，同時對接國內外的業界，讓從事資訊相關的年輕人可以根留台南。
          </b-card-text>
          <template v-slot:header>
            <small>好想工作室 創辦人</small>
          </template>
        </b-card>

        <!-- <b-card
          img-src="@/assets/images/pics/g0v.png"
          img-alt="g0v"
          overlay
        ></b-card> -->
      </b-card-group>
    </div>
  </section>
</template>

<script>
export default {
  name: "Committee"
};
</script>

<style lang="scss" scoped>
.committee-container {
  padding: 45px 0;
  h2 {
    margin-bottom: 50px;
  }
  ::v-deep .card {
    &:hover {
      box-shadow: 1px 1px 2px #00000085;
      transform: translate(-2px, -2px);
    }
    .card-header {
      background-color: $sub-color;
      border-bottom: 3px solid $main-color;
      transition: background-color 0.3s;
      small {
        color: #fff;
        font-size: 15px;
      }
    }
    .card-text {
      text-align: left;
    }
  }
}
</style>
