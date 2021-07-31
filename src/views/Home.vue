<template>
  <div>
    <div v-if="user === 'freelancer'">
      <HeaderFreelancer />
      <!-- <Categories /> -->
      <RecentTasks />
    </div>
    <div v-else>
      <HeaderEmployer />
      <Price />
    </div>
  </div>
</template>
<script>
import HeaderEmployer from "@/components/HeaderEmployer";
import HeaderFreelancer from "@/components/HeaderFreelancer";
// import Categories from "@/components/Categories";
import RecentTasks from "@/components/RecentTasks";
import Price from "@/components/Price";
// import { Fragment } from "vue-fragment";
export default {
  components: {
    // Fragment,
    // Categories,
    RecentTasks,
    HeaderFreelancer,
    HeaderEmployer,
    Price,
  },
  computed: {
    user() {
      return this.$store.getters.user.accountType;
    },
  },
  mounted() {
    if (!document.getElementById("customJs")) {
      let customScript = document.createElement("script");
      customScript.setAttribute("src", "/assets/js/custom.js");
      customScript.setAttribute("type", "text/javascript");
      customScript.setAttribute("id", "customJs");
      document.body.appendChild(customScript);
    } else {
      let customScript = document.getElementById("customJs");
      document.body.removeChild(customScript);
      document.body.removeChild(document.getElementById("backtotop"));
      customScript = document.createElement("script");
      customScript.setAttribute("src", "/assets/js/custom.js");
      customScript.setAttribute("type", "text/javascript");
      customScript.setAttribute("id", "customJs");
      document.body.appendChild(customScript);
    }
  },
};
</script>
