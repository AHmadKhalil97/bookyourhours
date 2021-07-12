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
                  bids
                </router-link>
              </li>
            </ul>
            <!-- <li>
                <a href="dashboard-messages.html"
                  ><i class="icon-material-outline-question-answer"></i>
                  Messages <span class="nav-tag">2</span></a
                >
              </li> -->
            <!-- <li>
                <a href="dashboard-bookmarks.html"
                  ><i class="icon-material-outline-star-border"></i>
                  Bookmarks</a
                >
              </li>
              <li>
                <a href="dashboard-reviews.html"
                  ><i class="icon-material-outline-rate-review"></i> Reviews</a
                >
              </li> -->

            <!-- <ul data-submenu-title="Organize and Manage"> -->
            <!-- <li
              :class="`${
                ['JobPost'].includes(this.$route.name) ? 'active-submenu' : ''
              }`"
            >
              <a href="#"
                ><i class="icon-material-outline-business-center ml-50"></i>
                Jobs list</a
              >
              <ul>
                <li>
                  <router-link :to="{ name: 'ManageJobs' }"
                    >Manage Jobs <span class="nav-tag">3</span></router-link
                  >
                </li> -->
            <!-- <li>
                  <a href="dashboard-manage-candidates.html"
                    >Manage Candidates</a
                  >
                </li> -->
            <!-- <li>
                  <router-link :to="{ name: 'JobPost' }"
                    >Post a Job</router-link
                  >
                </li>
              </ul>
            </li> -->
            <!-- <li>
              <a href="#"
                ><i class="icon-material-outline-assignment"></i> Tasks</a
              >
              <ul>
                <li>
                  <a href="dashboard-manage-tasks.html"
                    >Manage Tasks <span class="nav-tag">2</span></a
                  >
                </li>
                <li>
                  <a href="dashboard-manage-bidders.html">Manage Bidders</a>
                </li>
                <li>
                  <a href="dashboard-my-active-bids.html"
                    >My Active Bids <span class="nav-tag">4</span></a
                  >
                </li>
                <li><a href="dashboard-post-a-task.html">Post a Task</a></li>
              </ul>
            </li> -->
            <!-- </ul> -->

            <ul data-submenu-title="Account">
              <li>
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
export default {
  name: "SideFreelancer"
};
</script>

<style></style>
