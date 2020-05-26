<template>
  <main>
    <Banner />
    <About />
    <Submit />
    <FAQ />
  </main>
</template>

<script>
import Banner from "@/components/homepage/Banner.vue";
import About from "@/components/homepage/About.vue";
import Submit from "@/components/homepage/Submit.vue";
import FAQ from "@/components/homepage/FAQ.vue";

export default {
  name: "Homepage",
  components: {
    Banner,
    About,
    Submit,
    FAQ
  }
};
</script>
