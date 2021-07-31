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
        <div>
          <div class="dashboard-box">
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

              <div class="row">
                <div class="col-4 bold-light">Category:</div>
                <div class="col-8">{{ job.category.title }}</div>
              </div>

              <div class="row">
                <div class="col-4 bold-light">Bids Recived:</div>
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
                <div class="col-4 bold-light">Salary:</div>
                <div class="col-8">{{ job.price }}</div>
              </div>

              <div class="row">
                <div class="col-4 bold-light">Status:</div>
                <div class="col-8">{{ job.status.toUpperCase() }}</div>
              </div>

              <div class="row">
                <div class="col-4 bold-light">Time Required:</div>
                <div class="col-8">{{ job.time }}</div>
              </div>

              <div class="row">
                <div class="col-4 bold-light">Tags:</div>
                <div class="col-8">
                  {{
                    job.tags
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
  mounted() {
    console.log(this.job);
  },
};
</script>
