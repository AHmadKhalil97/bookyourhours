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
                <i class="icon-material-outline-business-center"></i>
                <div v-if="loading" class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div v-else class="jobs-header">
                  <span> My Job Listings </span>
                  <span>
                    Total Jobs:
                    {{ jobs && jobs.data ? jobs.data.results.length : 0 }}
                  </span>
                </div>
              </h3>
            </div>

            <div v-if="!loading" class="content">
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
import { getCustomJs } from "../helpers";
export default {
  created() {
    if (this.$store.getters.user.accountType !== "employer")
      this.$router.push("/404");
  },
  components: { Job },
  name: "ManageJobs",
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    async getUserJobs() {
      const { id } = JSON.parse(localStorage.getItem("user"));
      await this.$store.dispatch("getAllJobs", {
        user: id,
      });
      this.loading = false;
    },
    clearJob() {
      this.$store.commit("setJob", {});
    },
  },
  mounted() {
    this.getUserJobs();
    getCustomJs();
  },
  computed: {
    jobs() {
      return this.$store.getters.jobs;
    },
  },
};
</script>

<style scoped>
.jobs-header {
  display: inline;
  width: calc(100% - 32px);
}
.jobs-header span:nth-child(2) {
  float: right;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  margin-left: 8px;
  padding-top: 4px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: inherit;
  height: inherit;
  border: 3px solid #2a41e8;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #2a41e8 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
