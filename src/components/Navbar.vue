<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#"
      ><h1><img src="@/assets/images/logo.png" alt="g0v" /></h1
    ></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">投稿列表</b-nav-item>
        <b-nav-item href="#">投稿辦法</b-nav-item>
        <b-nav-item href="#">FAQ</b-nav-item>
        <b-nav-item-dropdown text="關於我們" right>
          <b-dropdown-item href="#">主辦單位</b-dropdown-item>
          <b-dropdown-item href="#">合作夥伴</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item href="#">歷年議程</b-nav-item>
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
