<template>
  <section class="banner">
    <div class="banner-container container">
      <div class="info">
        <h2>
          <span>g0v Summit 2020 <br />Call for Proposal</span><br />2020
          台灣零時政府<br />雙年會議程徵集
        </h2>
        <!--
        <span class="time">徵集日期 ：2020/06/04</span>
        <span class="time">活動日期 ：2020/12/03（四）~ 2020/12/06（日）</span>
        -->
        <div class="buttons">
          <router-link :to="{ name: 'PropasalList' }">
            <b-button variant="danger" size="lg">
              瀏覽投稿<br />Read Proposals
            </b-button>
          </router-link>
          <b-button variant="danger mt2 mt0-l" size="lg" @click="goSummit">
            我要投稿<br />Submit a Proposal
          </b-button>
        </div>
      </div>
      <div class="image">
        <img src="@/assets/images/banner2020.png" alt="banner image" />
      </div>
    </div>
    <LoginLightbox
      v-body-scroll-lock="isLoginLightboxOpen"
      v-if="isLoginLightboxOpen"
      @close="isLoginLightboxOpen = false"
    />
  </section>
</template>

<script>
import LoginLightbox from "@/components/LoginLightbox.vue";

export default {
  name: "Banner",
  components: { LoginLightbox },
  data() {
    return {
      isLoginLightboxOpen: false
    };
  },
  methods: {
    goSummit() {
      if (this.$store.getters.isLoggedIn) {
        this.$router.push({ name: "ProposalCreate" });
      } else {
        this.isLoginLightboxOpen = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.banner-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 90px);
  padding-top: 45px;
  padding-bottom: 45px;
  @include mediaquery_medium_devices {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }
  .info,
  .image {
    width: 100%;
    @include mediaquery_medium_devices {
      width: 50%;
    }
  }
  .info {
    order: 2;
    @include mediaquery_medium_devices {
      order: 1;
    }
  }
  .image {
    order: 1;
    @include mediaquery_medium_devices {
      order: 2;
    }
  }
  .info {
    h2 {
      font-weight: 900;
      font-size: 35px;
      margin-bottom: 20px;
      color: #000;
      span {
        color: $main-color;
      }
      @include mediaquery_medium_devices {
        font-size: 45px;
      }
    }
    .time {
      display: block;
      font-weight: 900;
    }
    .time:nth-child(3) {
      margin-bottom: 20px;
    }
    button {
      margin-right: 10px;
    }
  }
  .image {
    margin-bottom: 20px;
    @include mediaquery_medium_devices {
      margin-bottom: 0;
    }
    img {
      width: 100%;
      border-radius: 50%;
      box-shadow: 0 0 5px #c37171;
    }
  }
}
</style>
