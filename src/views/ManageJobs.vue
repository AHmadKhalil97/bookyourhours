<template>
  <!-- Dashboard Content
	================================================== -->
  <div class="dashboard-content-container" data-simplebar>
    <div class="dashboard-content-inner">
      <!-- Dashboard Headline -->
      <div id="jobs" class="dashboard-headline">
        <h3>Manage Jobs</h3>

        <!-- Breadcrumbs -->
        <!-- nav id="breadcrumbs" class="dark">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Dashboard</a></li>
            <li>Manage Jobs</li>
          </ul>
        </nav -->

        <a
          ref="JobPostPopup"
          href="#job-post-dialog"
          class="popup-with-zoom-anim button ripple-effect"
          @click="clearJob"
        >
          Post a Job
        </a>
      </div>

      <!-- Row -->
      <div class="row">
        <!-- Dashboard Box -->
        <div class="col-xl-12">
          <div class="dashboard-box margin-top-0">
            <!-- Headline -->
            <div class="headline">
              <h3>
                <i class="icon-material-outline-business-center"></i> My Job
                Listings
              </h3>
            </div>

            <div class="content">
              <ul v-if="jobs && jobs.data" class="dashboard-box-list">
                <job
                  v-for="job in jobs.data.results"
                  :key="job.id"
                  :job="job"
                ></job>
              </ul>
            </div>

            <!-- <div class="pagination">
              <h3>
                <i class="icon-material-outline-business-center"></i> My Job
                Listings
              </h3>
            </div> -->
          </div>
        </div>
      </div>
      <!-- Row / End -->

      <!-- Footer -->
      <div class="dashboard-footer-spacer"></div>
      <div class="small-footer margin-top-15">
        <div class="small-footer-copyrights">
          © 2019 <strong>Hireo</strong>. All Rights Reserved.
        </div>
        <ul class="footer-social-links">
          <li>
            <a href="#" title="Facebook" data-tippy-placement="top">
              <i class="icon-brand-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="#" title="Twitter" data-tippy-placement="top">
              <i class="icon-brand-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#" title="Google Plus" data-tippy-placement="top">
              <i class="icon-brand-google-plus-g"></i>
            </a>
          </li>
          <li>
            <a href="#" title="LinkedIn" data-tippy-placement="top">
              <i class="icon-brand-linkedin-in"></i>
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <!-- Footer / End -->
    </div>
  </div>
  <!-- Dashboard Content / End -->
</template>

<script>
import Job from "../components/Job.vue";
import { getJquery } from "../../src/helps";
export default {
  components: { Job },
  name: "ManageJobs",
  methods: {
    async getUserJobs() {
      const { id } = JSON.parse(localStorage.getItem("user"));
      this.$store.dispatch("getAllJobs", {
        user: id,
      });
    },
    clearJob() {
      this.$store.commit("setJob", {});
    },
  },
  mounted() {
    this.getUserJobs();
    getJquery();
  },
  computed: {
    jobs() {
      return this.$store.getters.jobs;
    },
  },
};
</script>
