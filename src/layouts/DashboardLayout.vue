<template>
  <div>
    <Navbar v-if="user === 'employer'" />
    <NavbarFreelancer v-if="user === 'freelancer'" />
    <JobPostPopup />
    <DeleteJobPopup />
    <DeleteOfferPopup />
    <div class="dashboard-container">
      <SideBar v-if="user === 'employer'" />
      <SideFreelancer v-if="user === 'freelancer'" />
      <router-view />
    </div>
  </div>
</template>

<script>
// import { Fragment } from "vue-fragment";

import Navbar from "@/components/Navbar";
import NavbarFreelancer from "@/components/NavbarFreelancer";
import SideBar from "@/components/SideBar";
import SideFreelancer from "@/components/SideFreelancer";
import JobPostPopup from "@/components/JobPostPopup";
import DeleteJobPopup from "@/components/DeleteJobPopup";
import DeleteOfferPopup from "@/components/DeleteOfferPopup";

export default {
  name: "dashboard-layout",
  components: {
    // Fragment,
    Navbar,
    NavbarFreelancer,
    SideFreelancer,
    SideBar,
    JobPostPopup,
    DeleteJobPopup,
    DeleteOfferPopup,
  },
  computed: {
    user() {
      return this.$store.getters.user.accountType;
    },
  },
};
</script>
