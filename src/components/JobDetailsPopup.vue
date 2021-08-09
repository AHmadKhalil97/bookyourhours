<template>
  <div
    id="job-details-dialog"
    class="simple-dialog info-dialog zoom-anim-dialog mfp-hide dialog-with-tabs"
  >
    <div class="popup-tab-content">
      <!-- Welcome Text -->
      <div class="welcome-text">
        <h3>Job Details</h3>
      </div>
      <!-- Row -->
      <div>
        <div v-if="job">
          <div v-if="job.loading" class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div v-else class="dashboard-box">
            <!-- Headline -->
            <div class="headline">
              <h3>
                <i class="icon-material-outline-info"></i>
                Details for the job '{{ job.title }}'
              </h3>
            </div>

            <div class="content with-padding padding-bottom-10">
              <div class="row">
                <div class="col-4 bold-light">Title:</div>
                <div class="col-8">{{ job.title }}</div>
              </div>

              <div class="row" v-if="job.category && job.category.title">
                <div class="col-4 bold-light">Category:</div>
                <div class="col-8">
                  {{ job.category.title }}
                </div>
              </div>

              <div class="row" v-if="job.bidCount">
                <div class="col-4 bold-light">Bids Received:</div>
                <div class="col-8">{{ job.bidCount }}</div>
              </div>

              <div class="row">
                <div class="col-4 bold-light">Currency:</div>
                <div class="col-8">{{ job.currency }}</div>
              </div>

              <div class="row">
                <div class="col-4 bold-light">Active:</div>
                <div class="col-8">{{ job.isActive ? "YES" : "NO" }}</div>
              </div>

              <div class="row">
                <div class="col-4 bold-light">Budget:</div>
                <div class="col-8">{{ job.price }}</div>
              </div>

              <div class="row">
                <div class="col-4 bold-light">Status:</div>
                <div class="col-8">{{ (job.status || "").toUpperCase() }}</div>
              </div>

              <div class="row" v-if="job.assignedTo">
                <div class="col-4 bold-light">Assigned To:</div>
                <div class="col-8">{{ job.assignedTo.name }}</div>
              </div>

              <div class="row">
                <div class="col-4 bold-light">Time Required:</div>
                <div class="col-8">{{ job.time }} Days</div>
              </div>

              <div class="row">
                <div class="col-4 bold-light">Tags:</div>
                <div class="col-8">
                  {{
                    (job.tags || [])
                      .map((tag) => tag.title)
                      .toString()
                      .replace(/,/g, ", ")
                  }}
                </div>
              </div>

              <div class="row">
                <div class="col-4 bold-light">Description:</div>
                <div class="col-8">{{ job.description }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="job_placeholder">
          <i class="icon-feather-alert-triangle"></i>
          <br />
          No related job found, it may has been deleted by the employer or
          admin.
        </div>
        <button @click="close" class="button info ripple-effect">Okay</button>
      </div>
      <!-- Row / End -->
    </div>
  </div>
</template>

<script>
export default {
  name: "JobDetailsDialog",
  methods: {
    close() {
      this.$el.querySelector("button.mfp-close").click();
    },
  },
  computed: {
    job() {
      return this.$store.state.job;
    },
  },
};
</script>

<style scoped>
.job_placeholder {
  text-align: center;
}

.job_placeholder i {
  font-size: 2.5rem;
  color: red !important;
}

.lds-ring {
  display: inherit;
  position: relative;
  width: 40px;
  height: 40px;
  margin: auto;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: inherit;
  height: inherit;
  margin: 8px;
  border: 4px solid #5bc0de;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #5bc0de transparent transparent transparent;
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
.main {
  width: 100%;
  display: grid;
  place-items: center;
}
</style>
