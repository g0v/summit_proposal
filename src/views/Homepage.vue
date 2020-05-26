<template>
  <main>
    <Banner />
    <About />
    <Submit />
  </main>
</template>

<script>
import Banner from "@/components/homepage/Banner.vue";
import About from "@/components/homepage/About.vue";
import Submit from "@/components/homepage/Submit.vue";

export default {
  name: "Homepage",
  components: {
    Banner,
    About,
    Submit
  }
};
</script>
