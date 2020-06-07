<template>
  <footer>
    <div class="footer-container container">
      <div>
        <div class="mb2">
          <a
            rel="license"
            class="dim"
            href="http://creativecommons.org/licenses/by/4.0/"
          >
            <img class="w2 mr2" src="/cc_icon_white_x2.png" alt="CC" />
            <img class="w2" src="/attribution_icon_white_x2.png" alt="BY" />
          </a>
        </div>
        <span class="f7">
          本站內容係採用
          <a
            class="hover-light-gray light-gray dim"
            rel="license"
            href="http://creativecommons.org/licenses/by/4.0/"
          >
            創用 CC 姓名標示 4.0 國際 授權條款
          </a>
          授權
          <br />
          Content on this site is licensed under
          <a
            class="hover-light-gray light-gray dim"
            rel="license"
            href="http://creativecommons.org/licenses/by/4.0/"
          >
            Creative Commons Attribution 4.0 International license
          </a>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
footer {
  background-color: $sub-color;
  padding: 40px 0;
  color: #fff;
}
</style>
