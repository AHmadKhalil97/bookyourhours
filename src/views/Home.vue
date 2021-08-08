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
import { getCustomJs } from "../helpers";
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
    getCustomJs();
  },
};
</script>
