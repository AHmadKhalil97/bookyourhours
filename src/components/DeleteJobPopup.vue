<template>
  <div
    id="delete-job-dialog"
    class="simple-dialog delete-dialog zoom-anim-dialog mfp-hide dialog-with-tabs"
  >
    <div class="popup-tab-content">
      <!-- Welcome Text -->
      <div class="welcome-text">
        <h3>Alert!</h3>
      </div>
      <!-- Row -->
      <div>
        <div>
          <div class="dashboard-box">
            <!-- Headline -->
            <div class="headline">
              <h3>
                <i class="icon-line-awesome-warning red"></i>
                Are you sure ?
              </h3>
            </div>

            <div class="content with-padding padding-bottom-10">
              <div class="row">Are you sure you want to delete this job ?</div>
            </div>
          </div>
        </div>
        <div class="actions">
          <button @click="close" class="button ripple-effect">Cancel</button>
          <button @click="removePost" class="button ripple-effect red">
            Yes, Delete
          </button>
        </div>
      </div>
      <!-- Row / End -->
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteJobPopup",
  methods: {
    removePost() {
      this.$store
        .dispatch("deleteJob", {
          id: this.job.id,
        })
        .then((res) => {
          console.log(res, "Removed Successfully");
          this.close();
          this.$store.dispatch("getAllJobs", {
            user: JSON.parse(localStorage.getItem("user")).id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
