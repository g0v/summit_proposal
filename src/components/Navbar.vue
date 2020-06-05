<template>
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand :to="{ name: 'Homepage' }"
      ><h1><img src="@/assets/images/logo.png" alt="g0v" /></h1
    ></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{ name: 'PropasalList' }">
          瀏覽投稿<br />
          Proposals
        </b-nav-item>

        <b-nav-item :to="{ name: 'Homepage', hash: '#submit' }">
          投稿辦法<br />
          Process
        </b-nav-item>
        <b-nav-item :to="{ name: 'Homepage', hash: '#faq' }">FAQ</b-nav-item>
        <b-nav-item :to="{ name: 'Homepage', hash: '#committee' }">
          議程委員會<br />
          Committee
        </b-nav-item>
        <b-nav-item :to="{ name: 'Homepage', hash: '#about-us' }">
          g0v 介紹<br />
          About g0v
        </b-nav-item>
        <!-- <b-nav-item-dropdown text="關於我們" right>
          <b-dropdown-item :to="{ name: 'Homepage', hash: '#committee' }"
            >議程委員會</b-dropdown-item
          >
          <b-dropdown-item :to="{ name: 'Homepage', hash: '#about-us' }"
            >g0v 介紹</b-dropdown-item
          >
        </b-nav-item-dropdown> -->
        <b-nav-item href="#agenda">
          歷年議程<br />
          Prev Events
        </b-nav-item>
        <b-nav-item
          v-if="$store.getters.isLoggedIn"
          :to="{ name: 'PropasalManageList' }"
          >管理投稿<br />
          Manage Proposals
        </b-nav-item>
        <b-nav-item
          v-if="!$store.getters.isLoggedIn"
          @click="isLoginLightboxOpen = true"
          >登入<br />
          Sign In
        </b-nav-item>
        <b-nav-item v-else @click="logout">
          登出<br />
          Sign Out
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <LoginLightbox
      v-body-scroll-lock="isLoginLightboxOpen"
      v-if="isLoginLightboxOpen"
      @close="isLoginLightboxOpen = false"
    />
  </b-navbar>
</template>

<script>
import LoginLightbox from "@/components/LoginLightbox.vue";
export default {
  name: "Navbar",
  components: { LoginLightbox },
  data() {
    return {
      isLoginLightboxOpen: false
    };
  },
  methods: {
    logout() {
      // TODO: better user notification
      this.$store.dispatch("logout");
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
nav {
  background-color: $sub-color;
  h1 {
    img {
      width: 200px;
    }
  }
  .navbar-nav {
    align-items: center;
  }
}
</style>
