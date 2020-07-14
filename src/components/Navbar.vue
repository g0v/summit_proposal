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
        <b-nav-item :to="{ name: 'Homepage', hash: '#faq' }">
          常見問題<br />
          FAQ
        </b-nav-item>
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
        <b-nav-item :to="{ name: 'Homepage', hash: '#agenda' }">
          歷年議程<br />
          Prev Events
        </b-nav-item>
        <b-nav-item class="relative" href="https://discuss.summit2020.g0v.tw">
          討論區<br />
          Forum
          <div
            class="unread-count br-pill bg-light-red white f7"
            v-show="unreadCommentCount"
          >
            {{ unreadCommentCount }}
          </div>
        </b-nav-item>
        <b-nav-item v-if="isLoggedIn" :to="{ name: 'PropasalManageList' }"
          >管理投稿<br />
          Manage Proposals
        </b-nav-item>
        <b-nav-item v-if="!isLoggedIn" @click="isLoginLightboxOpen = true"
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
      v-if="isLoginLightboxOpen"
      @close="isLoginLightboxOpen = false"
    />
  </b-navbar>
</template>

<script>
import LoginLightbox from "@/components/LoginLightbox.vue";
import FORUM_API from "@/utils/FORUM_API.js";

// sync every 5 min
const COMMENT_SYNC_INTERVAL = 5 * 60 * 1000;

export default {
  name: "Navbar",
  components: { LoginLightbox },
  data() {
    return {
      isLoginLightboxOpen: false,
      unreadCommentCount: 0
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  watch: {
    isLoggedIn(newVal) {
      if (newVal) {
        // sync immediately when login
        this.syncUnreadCommentCount();
      }
    }
  },
  created() {
    this.syncUnreadCommentCount();
    setInterval(() => {
      this.syncUnreadCommentCount();
    }, COMMENT_SYNC_INTERVAL);
  },
  methods: {
    async logout() {
      // TODO: better user notification
      await this.$store.dispatch("logout");
      alert("登出成功");
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
    async syncUnreadCommentCount() {
      if (!this.isLoggedIn) {
        return;
      }
      let resp = null;
      try {
        resp = await FORUM_API.GET("/api/notifications", {
          withCredentials: true
        });
      } catch (err) {
        // that's ok
      }
      if (resp && resp.notifications) {
        this.unreadCommentCount = resp.notifications.length;
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
  .nav-item {
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
  .unread-count {
    position: absolute;
    bottom: 0.5rem;
    right: -2rem;
    padding: 0.125rem 0.25rem;
    min-width: 1.5rem;
    @include mediaquery_pad {
      bottom: 0;
      right: -0.5rem;
    }
  }
  .nav-item:hover .unread-count {
    background: rgba(255, 114, 92, 0.7);
  }
}
</style>
