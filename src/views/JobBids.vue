<template>
  <div class="dashboard-content-container" data-simplebar>
    <div class="dashboard-content-inner">
      <!-- Dashboard Headline -->
      <div class="dashboard-headline">
        <h3>Manage Bids</h3>
        <span class="margin-top-7"
          >Bids for <a href="#">Food Delivery Mobile Application</a></span
        >

        <!-- Breadcrumbs -->
        <nav id="breadcrumbs" class="dark">
          <ul>
            <li><a href="#">Home</a></li>
            <li>
              <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
            </li>
            <li>Manage Bids</li>
          </ul>
        </nav>
      </div>

      <!-- Row -->
      <div class="row">
        <!-- Dashboard Box -->
        <div class="col-xl-12">
          <div class="dashboard-box margin-top-0">
            <!-- Headline -->
            <div class="headline">
              <h3>
                <i class="icon-material-outline-supervisor-account"></i>
                {{ jobBids.length }}
                {{ jobBids.length === 1 ? "Bid" : "Bids" }}
              </h3>
              <!-- <div class="sort-by">
                <select class="selectpicker hide-tick">
                  <option>Highest First</option>
                  <option>Lowest First</option>
                  <option>Fastest First</option>
                </select>
              </div> -->
            </div>

            <div class="content">
              <ul v-if="jobBids.length" class="dashboard-box-list">
                <job-bid
                  v-for="bid in jobBids"
                  :key="bid.id"
                  :bid="bid"
                ></job-bid>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- Row / End -->
    </div>
    <free-lancer-profile-popup />
  </div>
</template>
<script>
import FreeLancerProfilePopup from "../components/FreeLancerProfilePopup.vue";
import JobBid from "../components/JobBid.vue";
export default {
  name: "JobBids",
  components: {
    FreeLancerProfilePopup,
    JobBid,
  },
  mounted() {
    this.getJobBids();
    // this.$store.dispatch("getJobBids", {
    //   jobId: this.$route.params.jobId,
    // });

    if (!document.getElementById("customJs")) {
      let customScript = document.createElement("script");
      customScript.setAttribute("src", "/assets/js/custom.js");
      customScript.setAttribute("type", "text/javascript");
      customScript.setAttribute("id", "customJs");
      document.body.appendChild(customScript);
    } else {
      let customScript = document.getElementById("customJs");
      // document.body.removeChild(customScript);
      // document.body.removeChild(document.getElementById("backtotop"));
      customScript = document.createElement("script");
      customScript.setAttribute("src", "/assets/js/custom.js");
      customScript.setAttribute("type", "text/javascript");
      customScript.setAttribute("id", "customJs");
      document.body.appendChild(customScript);
    }
  },
  methods: {
    async getJobBids() {
      let obj = {};
      if (this.$route.params.jobId) {
        obj = {
          jobId: this.$route.params.jobId,
        };
      } else {
        obj = {
          sortBy: "asc",
          user: this.$store.getters.user.id,
        };
      }
      this.$store.dispatch("getJobBids", obj);
    },
  },
  computed: {
    jobBids() {
      return this.$store.getters.jobBids;
    },
  },
};
</script>
