<template>
  <div>Redirect</div>
</template>

<script>
export default {
  name: "Redirect",
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch("updateToken", to.query.token);
      vm.$store.dispatch("fetchUserInfo", to.query.token);
      vm.$router.push({ name: "Homepage" });
    });
  }
};
</script>
