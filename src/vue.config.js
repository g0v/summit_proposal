module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/helper/mixins/mediaquery.scss";
          @import "@/assets/scss/helper/variables/_color.scss";
        `
      }
    }
  }
};
