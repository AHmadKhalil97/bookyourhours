<template>
  <!-- Dashboard Sidebar
	================================================== -->
  <div class="dashboard-sidebar">
    <div class="dashboard-sidebar-inner" data-simplebar>
      <div class="dashboard-nav-container">
        <!-- Responsive Navigation Trigger -->
        <a href="#" class="dashboard-responsive-nav-trigger">
          <span class="hamburger hamburger--collapse">
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </span>
          <span class="trigger-title">Dashboard Navigation</span>
        </a>

        <!-- Navigation -->
        <div class="dashboard-nav">
          <div class="dashboard-nav-inner">
            <ul data-submenu-title="Start">
              <li :class="`${$route.name === 'Dashboard' ? 'active' : ''}`">
                <router-link :to="{ name: 'Dashboard' }"
                  ><i class="icon-material-outline-dashboard"></i>
                  Dashboard</router-link
                >
              </li>
            </ul>
            <ul data-submenu-title="Organize and Manage">
              <li :class="`${$route.name === 'Bids' ? 'active' : ''}`">
                <router-link to="/bids">
                  <i class="icon-material-outline-business-center"></i>
                  Bids
                </router-link>
              </li>
              <li :class="`${$route.name === 'Jobs' ? 'active' : ''}`">
                <router-link to="/jobs">
                  <i class="icon-material-outline-business-center"></i>
                  Jobs
                </router-link>
              </li>
            </ul>

            <ul data-submenu-title="Account">
              <li :class="`${$route.name === 'Profile' ? 'active' : ''}`">
                <router-link :to="{ name: 'Profile' }"
                  ><i class="icon-material-outline-settings"></i>
                  Settings</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'Logout' }"
                  ><i class="icon-material-outline-power-settings-new"></i>
                  Logout</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <!-- Navigation / End -->
      </div>
    </div>
  </div>
  <!-- Dashboard Sidebar / End -->
</template>

<script>
import { getCustomJs } from "../helpers";
export default {
  name: "SideFreelancer",
  mounted() {
    getCustomJs();
  },
};
</script>

<style></style>
