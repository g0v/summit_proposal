<template>
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand :to="{ name: 'Homepage' }"
      ><h1><img src="@/assets/images/logo.png" alt="g0v" /></h1
    ></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{ name: 'PropasalList' }">投稿列表</b-nav-item>

        <b-nav-item :to="{ name: 'Homepage', hash: '#submit' }"
          >投稿辦法</b-nav-item
        >
        <b-nav-item :to="{ name: 'Homepage', hash: '#faq' }">FAQ</b-nav-item>
        <b-nav-item-dropdown text="關於我們" right>
          <b-dropdown-item :to="{ name: 'Homepage', hash: '#committee' }"
            >議程委員會</b-dropdown-item
          >
          <b-dropdown-item :to="{ name: 'Homepage', hash: '#about-us' }"
            >g0v 介紹</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-item href="#agenda">歷年議程</b-nav-item>
        <b-nav-item href="#">登入</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar"
};
</script>
<style lang="scss" scoped>
nav {
  background-color: $sub-color;
}
</style>
