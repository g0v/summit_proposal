<template>
  <main>
    <Banner />
    <AboutSummit />
    <Submit />
    <FAQ />
  </main>
</template>

<script>
import Banner from "@/components/homepage/Banner.vue";
import AboutSummit from "@/components/homepage/AboutSummit.vue";
import Submit from "@/components/homepage/Submit.vue";
import FAQ from "@/components/homepage/FAQ.vue";

export default {
  name: "Homepage",
  components: {
    Banner,
    AboutSummit,
    Submit,
    FAQ
  }
};
</script>
