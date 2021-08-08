<template>
  <div class="dashboard-content-container" data-simplebar>
    <div class="dashboard-content-inner">
      <!-- Dashboard Headline -->
      <div class="dashboard-headline">
        <h3>Your Assigned Jobs</h3>
        <!-- <span class="margin-top-7"
          >Bids for <a href="#">Food Delivery Mobile Application</a></span
        > -->

        <!-- Breadcrumbs -->
        <nav id="breadcrumbs" class="dark">
          <ul>
            <li>
              <router-link :to="{ name: 'Home' }">Home</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
            </li>
            <li>Jobs</li>
          </ul>
        </nav>
      </div>

      <!-- Row -->
      <div class="row">
        <!-- Dashboard Box -->
        <div class="col-xl-12 margin-bottom-35">
          <div class="dashboard-box margin-top-0">
            <!-- Headline -->
            <div class="headline">
              <h3>
                <i class="icon-material-outline-supervisor-account"></i>
                <div v-if="loading" class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span v-else>
                  {{ jobBids.length }}
                  {{ jobBids.length === 1 ? "Job" : "Jobs" }}
                </span>
              </h3>
            </div>

            <div v-if="jobBids.length" class="content">
              <ul class="dashboard-box-list">
                <job-bid-freelancer
                  v-for="bid in jobBids"
                  :key="bid.id"
                  :bid="bid"
                ></job-bid-freelancer>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- Row / End -->
    </div>
  </div>
</template>
<script>
import JobBidFreelancer from "../components/JobBidFreelancer.vue";
import { getCustomJs } from "../helpers";
export default {
  name: "JobsFreelancer",
  data() {
    return {
      loading: true,
    };
  },
  components: {
    JobBidFreelancer,
  },
  created() {
    if (
      this.$store.getters.user.accountType !== "freelancer" &&
      this.$route.name !== "JobBids"
    )
      this.$router.push("/404");
  },
  mounted() {
    this.getJobBids();
    getCustomJs();
  },
  methods: {
    async getJobBids() {
      let filters = {
        sortBy: "asc",
        user: this.$store.getters.user.id,
        isAssigned: true,
      };
      await this.$store.dispatch("getJobBids", filters);
      this.loading = false;
    },
  },
  computed: {
    jobBids() {
      return this.$store.getters.jobBids;
    },
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style scoped>
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
