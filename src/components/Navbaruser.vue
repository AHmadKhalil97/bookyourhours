<template>
  <div>
    <!-- Header Container
================================================== -->
    <header id="header-container" v-bind:class="dashboardRoute">
      <!-- Header -->
      <div id="header">
        <div class="container">
          <!-- Left Side Content -->
          <div class="left-side">
            <!-- Logo -->
            <div id="logo">
              <router-link exact to="/"
                ><img src="/assets/images/logo.png" alt=""
              /></router-link>
            </div>

            <!-- Main Navigation -->
            <nav id="navigation">
              <ul id="responsive">
                <li>
                  <router-link exact to="/" class="">Home</router-link>
                </li>

                <!-- <li> -->
                <!-- <a>Find Work</a> -->
                <!-- <ul class="dropdown-nav"> -->
                <li>
                  <router-link :to="{ name: 'BrowseJobs' }"
                    >Browse Jobs</router-link
                  >
                </li>
                <!-- </ul>
                </li> -->

                <!-- <li>
                  <a href="#">For Employers</a>
                </li> -->

                <li>
                  <router-link to="/dashboard">Dashboard</router-link>
                </li>

                <!-- <li>
                  <a href="#">Pages</a>
                </li> -->
              </ul>
            </nav>
            <div class="clearfix" />
            <!-- Main Navigation / End -->
          </div>
          <!-- Left Side Content / End -->
          <!-- Right Side Content / End -->
          <div v-if="loggedIn" class="right-side">
            <!--  User Notifications -->
            <div class="header-widget hide-on-mobile" style="display: none">
              <!-- Notifications -->
              <div class="header-notifications">
                <!-- Trigger -->
                <div class="header-notifications-trigger">
                  <a href="#"
                    ><i class="icon-feather-bell"></i><span>4</span></a
                  >
                </div>

                <!-- Dropdown -->
                <div class="header-notifications-dropdown">
                  <div class="header-notifications-headline">
                    <h4>Notifications</h4>
                    <button
                      class="mark-as-read ripple-effect-dark"
                      title="Mark all as read"
                      data-tippy-placement="left"
                    >
                      <i class="icon-feather-check-square"></i>
                    </button>
                  </div>

                  <div class="header-notifications-content">
                    <div class="header-notifications-scroll" data-simplebar>
                      <ul>
                        <!-- Notification -->
                        <li class="notifications-not-read">
                          <a href="dashboard-manage-candidates.html">
                            <span class="notification-icon"
                              ><i class="icon-material-outline-group"></i
                            ></span>
                            <span class="notification-text">
                              <strong>Michael Shannah</strong> applied for a job
                              <span class="color"
                                >Full Stack Software Engineer</span
                              >
                            </span>
                          </a>
                        </li>

                        <!-- Notification -->
                        <li>
                          <a href="dashboard-manage-bidders.html">
                            <span class="notification-icon"
                              ><i class="icon-material-outline-gavel"></i
                            ></span>
                            <span class="notification-text">
                              <strong>Gilbert Allanis</strong> placed a bid on
                              your
                              <span class="color">iOS App Development</span>
                              project
                            </span>
                          </a>
                        </li>

                        <!-- Notification -->
                        <li>
                          <a href="dashboard-manage-jobs.html">
                            <span class="notification-icon"
                              ><i class="icon-material-outline-autorenew"></i
                            ></span>
                            <span class="notification-text">
                              Your job listing
                              <span class="color"
                                >Full Stack PHP Developer</span
                              >
                              is expiring.
                            </span>
                          </a>
                        </li>

                        <!-- Notification -->
                        <li>
                          <a href="dashboard-manage-candidates.html">
                            <span class="notification-icon"
                              ><i class="icon-material-outline-group"></i
                            ></span>
                            <span class="notification-text">
                              <strong>Sindy Forrest</strong> applied for a job
                              <span class="color"
                                >Full Stack Software Engineer</span
                              >
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Messages -->
              <div class="header-notifications">
                <div class="header-notifications-trigger">
                  <a href="#"
                    ><i class="icon-feather-mail"></i><span>3</span></a
                  >
                </div>

                <!-- Dropdown -->
                <div class="header-notifications-dropdown">
                  <div class="header-notifications-headline">
                    <h4>Messages</h4>
                    <button
                      class="mark-as-read ripple-effect-dark"
                      title="Mark all as read"
                      data-tippy-placement="left"
                    >
                      <i class="icon-feather-check-square"></i>
                    </button>
                  </div>

                  <div class="header-notifications-content">
                    <div class="header-notifications-scroll" data-simplebar>
                      <ul>
                        <!-- Notification -->
                        <li class="notifications-not-read">
                          <a href="dashboard-messages.html">
                            <span class="notification-avatar status-online"
                              ><img
                                src="/assets/images/user-avatar-small-03.jpg"
                                alt=""
                            /></span>
                            <div class="notification-text">
                              <strong>David Peterson</strong>
                              <p class="notification-msg-text">
                                Thanks for reaching out. I'm quite busy right
                                now on many...
                              </p>
                              <span class="color">4 hours ago</span>
                            </div>
                          </a>
                        </li>

                        <!-- Notification -->
                        <li class="notifications-not-read">
                          <a href="dashboard-messages.html">
                            <span class="notification-avatar status-offline"
                              ><img
                                src="/assets/images/user-avatar-small-02.jpg"
                                alt=""
                            /></span>
                            <div class="notification-text">
                              <strong>Sindy Forest</strong>
                              <p class="notification-msg-text">
                                Hi Tom! Hate to break it to you, but I'm
                                actually on vacation until...
                              </p>
                              <span class="color">Yesterday</span>
                            </div>
                          </a>
                        </li>

                        <!-- Notification -->
                        <li class="notifications-not-read">
                          <a href="dashboard-messages.html">
                            <span class="notification-avatar status-online"
                              ><img
                                src="/assets/images/user-avatar-placeholder.png"
                                alt=""
                            /></span>
                            <div class="notification-text">
                              <strong>Marcin Kowalski</strong>
                              <p class="notification-msg-text">
                                I received payment. Thanks for cooperation!
                              </p>
                              <span class="color">Yesterday</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- <a
                    href="dashboard-messages.html"
                    class="
                      header-notifications-button
                      ripple-effect
                      button-sliding-icon
                    "
                    >View All Messages<i
                      class="icon-material-outline-arrow-right-alt"
                    ></i
                  ></a> -->
                </div>
              </div>
            </div>
            <!--  User Notifications / End -->

            <!-- User Menu -->
            <div class="header-widget">
              <!-- Messages -->
              <div class="header-notifications user-menu">
                <div class="header-notifications-trigger">
                  <a href="#"
                    ><div class="user-avatar status-online">
                      <img
                        :src="
                          user.pictures[0] ||
                          'https://ui-avatars.com/api/?name=' + user.name
                        "
                        alt=""
                      /></div
                  ></a>
                </div>

                <!-- Dropdown -->
                <div class="header-notifications-dropdown">
                  <!-- User Status -->
                  <div class="user-status">
                    <!-- User Name / Avatar -->
                    <div class="user-details">
                      <div class="user-avatar status-online">
                        <img
                          :src="
                            user.pictures[0] ||
                            'https://ui-avatars.com/api/?name=' + user.name
                          "
                          alt=""
                        />
                      </div>
                      <div class="user-name">
                        {{ user.name }}
                        <span>{{
                          capitalizeFirstLetter(user.accountType)
                        }}</span>
                      </div>
                    </div>

                    <!-- User Status Switcher -->
                    <!-- <div id="snackbar-user-status" class="status-switch"> -->
                    <!-- <label class="user-online current-status">Online</label> -->
                    <!-- <label class="user-invisible">Invisible</label> -->
                    <!-- Status Indicator -->
                    <!-- <span class="status-indicator" aria-hidden="true"></span> -->
                    <!-- </div> -->
                  </div>

                  <ul class="user-menu-small-nav">
                    <li>
                      <router-link :to="{ name: 'Dashboard' }"
                        ><i class="icon-material-outline-dashboard"></i>
                        Dashboard</router-link
                      >
                    </li>
                    <li>
                      <router-link :to="{ name: 'Profile' }">
                        <i class="icon-material-outline-settings"></i>
                        Settings</router-link
                      >
                    </li>
                    <li>
                      <router-link :to="{ name: 'Logout' }">
                        <i class="icon-material-outline-power-settings-new"></i>
                        Logout
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- User Menu / End -->

            <!-- Mobile Navigation Button -->
            <span class="mmenu-trigger">
              <button class="hamburger hamburger--collapse" type="button">
                <span class="hamburger-box">
                  <span class="hamburger-inner"></span>
                </span>
              </button>
            </span>
          </div>
          <!-- Right Side Content / End -->

          <!-- Right Side Content / End -->
          <div
            v-if="!loggedIn && !['login', 'register'].includes($route.name)"
            class="right-side"
          >
            <div class="header-widget">
              <a
                ref="signInDialog"
                href="#sign-in-dialog"
                class="popup-with-zoom-anim log-in-button"
                ><i class="icon-feather-log-in" />
                <span>Log In / Register</span></a
              >
            </div>

            <!-- Mobile Navigation Button -->
            <span class="mmenu-trigger">
              <button class="hamburger hamburger--collapse" type="button">
                <span class="hamburger-box">
                  <span class="hamburger-inner" />
                </span>
              </button>
            </span>
          </div>
          <!-- Right Side Content / End -->
        </div>
      </div>
      <!-- Header / End -->
    </header>
    <div class="clearfix"></div>
  </div>
</template>
<script>
// import { div } from "vue-fragment";
import { inializeHeaderDropDown } from "@/helpers/index";
export default {
  components: {
    // Fragment
  },
  name: "Navbar",
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    user() {
      return this.$store.getters.user;
    },
    dashboardRoute: function () {
      return ["Dashboard", "JobPost"].includes(this.$route.name)
        ? "fullwidth dashboard-header not-sticky"
        : "fullwidth";
    },
  },
  mounted() {
    inializeHeaderDropDown();
  },
};
</script>
