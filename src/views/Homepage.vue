<template>
  <main>
    <Banner />
    <AboutSummit />
    <Submit />
    <FAQ />
    <Committee />
    <AboutUS />
    <Agenda />
  </main>
</template>

<script>
import Banner from "@/components/homepage/Banner.vue";
import AboutSummit from "@/components/homepage/AboutSummit.vue";
import Submit from "@/components/homepage/Submit.vue";
import FAQ from "@/components/homepage/FAQ.vue";
import Committee from "@/components/homepage/Committee.vue";
import AboutUS from "@/components/homepage/AboutUS.vue";
import Agenda from "@/components/homepage/Agenda.vue";
import { addMetaData } from "@/utils/mixins";

export default {
  name: "Homepage",
  components: {
    Banner,
    AboutSummit,
    Submit,
    FAQ,
    Committee,
    AboutUS,
    Agenda
  },
  mixins: [addMetaData],
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.addMetaData(to.name);
    });
  }
};
</script>
