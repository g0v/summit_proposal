<template>
  <section class="about-summit">
    <div class="about-summit-container container">
      <h2 class="main-title drark">g0v Summit</h2>
      <article>
        <h3>
          <b-icon icon="brightness-high-fill" variant="warning"></b-icon>關於
          About
        </h3>
        <p>
          g0v Summit
          國際雙年會兩年舉辦一次，關注開放政府、開源協作、公民參與等面向，是國際開放政府社群的焦點活動，過去三屆吸引多達
          33 國講者投稿。
        </p>
        <p>
          雙年會大部份由社群貢獻者志願籌辦，議程秉持開放協作精神，籌備大會的討論文件皆以共筆形式公開，也鼓勵參與者協作議程的文字紀錄，會中也有現場口譯和影像直播輔助，減少參與的負擔。議程除了大會籌辦，也開放完整時段的開放工作坊（Unconference）由參與者提案決定議程內容，以演講、討論、自由對話等形式創造新的協作空間。會中自由報名的全場閃電講更是開源社群傳統，以開放分享的精神貫穿年會。
        </p>
        <p>
          g0v Summit is a biennial gathering focuses on open government,
          open-source collaboration, and citizen participation. It is a
          high-profile event of the international open government community. The
          past 3 times have attracted speakers from 33 countries.
        </p>
        <p>
          All the Summit sections are organized by community contributors, and
          the agenda adheres to an open and collaborative spirit. Documents and
          discussions during preparation are made public as collaborative notes.
          Participants are encouraged to share and cowork their notes during
          sessions. Simultaneous interpretation and live streaming are provided
          to lower the barrier of participation. In addition to the planned
          agenda, we also have “Unconference” with a full period of time in
          which content is determined by participants’ proposals, to create new
          collaborative spaces in the form of speeches, discussions, and free
          dialogue. Finally, lightning-talks, which everyone is free to sign up,
          is more of an open-source community tradition, signifies the open and
          shared spirit which runs through this Summit.
        </p>
      </article>
      <article class="feature">
        <h3>
          <b-icon icon="brightness-high-fill" variant="warning"></b-icon>特色
          Features
        </h3>
        <h4>
          特色一／全球公民科技盛會<br />Feature 1 / Global citizen technology
          event
        </h4>
        <p>
          歷屆 g0v Summit
          皆有來自全球各國的參與者來到台灣，帶著豐富的經驗，透過演講、討論、工作坊，與近千名會眾交流經驗。。<br />In
          previous g0v Summits, participants with rich experience from all over
          the world came to Taiwan. They exchanged experiences with nearly 1,000
          congregations through speeches, discussions, and workshops.
        </p>
        <h4>
          特色二／開放開源群眾協作<br />Feature 2 / Open source collaboration
        </h4>
        <p>
          g0v Summit
          專注於實作者的經驗交流。我們希望聽到講者和與會者就社會問題提出解決方案，不論是分享鼓舞人心的成功案例，或是從失敗經驗中學習成長，g0v
          Summit
          透過會場安排與議程設計，讓真誠的交流得以發生，讓動手做事的人找到更多前進的動力。<br />g0v
          Summit focuses on the exchange of experience of activists. We hope to
          hear speakers and participants put forward solutions to social
          problems, whether it is to share inspirational success stories or
          learn from failures. Through venue arrangements and agenda design, g0v
          Summit aims for sincere exchanges to happen, let action-takers find
          motivations from each other to move forward.
        </p>
        <h4>
          特色三／深度連結在地社群<br />Feature 3 / Deeply Connecting Local
          Communities
        </h4>
        <p>
          g0v Summit 2020 首次離開台北，在台南舉辦。g0v Summit 2020
          工作小組與台南在地伙伴協作一年，連結台南及鄰近縣市的 maker
          社群、NGO、文化工作者、教育工作者，讓習慣虛擬空間的公民黑客與在實體空間中奔走的社群貢獻者們齊聚一堂，聆聽彼此的故事，用對話了解彼此。<br />g0v
          Summit 2020 leave Taipei for the first time and will be held in
          Tainan. The g0v Summit 2020 working group collaborated with local
          partners in Tainan for one year to connect the maker communities,
          NGOs, cultural workers, educators in Tainan and neighboring cities, to
          gather community contributors and civic hackers, who are accustomed to
          virtual space, together to listen to each other’s stories and
          understand each other through dialogue.
        </p>
      </article>
      <article>
        <h3>
          <b-icon icon="brightness-high-fill" variant="warning"></b-icon>內容
          content
        </h3>
        <p>
          相較於過去的 g0v Summit，為期 2-3 天，在單一會場集中舉行，g0v Summit
          2020 擴大參與，聯合在地社群，推出連續 4
          天的黑客松、短講、主題論壇、自由對話與開放工作坊，活動場所也擴大到散佈在市區的數個會場，包含各在地社群經營多年的空間與群眾。
        </p>
        <p>
          Compared to the previous g0v Summit, which lasted for 2-3 days with a
          single venue, g0v Summit 2020 expanded its participation and connected
          the local communities, launching 4 consecutive days of hackathons,
          short talks, themed forums, free dialogue, and unconference. Workshops
          and event venues have also been extended to several locations in
          different places in the urban area, including spaces and masses that
          have been operated by local communities for many years.
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
  padding-top: 45px;
  padding-bottom: 45px;
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
      svg {
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
  .feature {
    h4 {
      margin-bottom: 12px;
    }
    p {
      margin-bottom: 40px !important;
    }
  }
}
</style>
