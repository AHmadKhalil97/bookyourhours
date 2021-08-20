<template>
  <div>
    <NavbarFreelancer v-if="user === 'freelancer'" />
    <Navbar v-else />

    <router-view />
    <SigninPopup v-if="!['login', 'register'].includes($route.name)" />
    <Footer />
  </div>
</template>
<script>
// import { div } from "vue-fragment";
import NavbarFreelancer from "@/components/NavbarFreelancer";
import Navbar from "@/components/Navbar";
import SigninPopup from "@/components/SigninPopup";
import Footer from "@/components/Footer";
export default {
  name: "default-layout",
  components: {
    // Fragment,
    Navbar,
    SigninPopup,
    Footer,
    NavbarFreelancer,
  },
  computed: {
    user() {
      return this.$store.getters.user.accountType;
    },
  },
};
</script>
