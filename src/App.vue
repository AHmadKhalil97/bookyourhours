<template>
  <!-- <div id="wrapper" v-bind:class="transparentHeader"> -->
  <div id="wrapper">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    user() {
      return this.$store.getters.user.accountType;
    },
    // transparentHeader: function () {
    //   return this.user === "freelancer"
    //     ? "wrapper-with-transparent-header"
    //     : "";
    // }
  },

  created() {
    this.$store.dispatch("refreshUserToken").catch(() => {
      this.$router.push("/");
    });
  },
};
</script>

<style></style>
