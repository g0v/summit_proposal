<template>
  <main>
    <Banner />
    <About />
  </main>
</template>

<script>
import Banner from "@/components/homepage/Banner.vue";
import About from "@/components/homepage/About.vue";

export default {
  name: "Homepage",
  components: {
    Banner,
    About
  }
};
</script>
