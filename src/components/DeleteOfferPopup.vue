<template>
  <div
    id="delete-offer-dialog"
    class="
      simple-dialog
      delete-dialog
      zoom-anim-dialog
      mfp-hide
      dialog-with-tabs
    "
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
              <div class="row">
                Are you sure you want to delete this offer ?
              </div>
            </div>
          </div>
        </div>
        <div class="actions">
          <button @click="close" class="button ripple-effect">Cancel</button>
          <button @click="removeOffer" class="button ripple-effect red">
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
  name: "DeleteOfferPopup",
  methods: {
    removeOffer() {
      this.$store
        .dispatch("deleteJobBid", {
          id: this.offerToDelete,
        })
        .then(() => {
          let obj = {};
          this.close();
          if (this.$route.params.jobId) {
            obj = {
              jobId: this.$route.params.jobId,
            };
          } else {
            obj = {
              user: this.$store.getters.user.id,
            };
          }

          this.$store.dispatch("getJobBids", obj);
          this.$store.commit("setOfferToDelete", null);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    close() {
      this.$el.querySelector("button.mfp-close").click();
      this.$store.commit("setOfferToDelete", null);
    },
  },
  computed: {
    offerToDelete() {
      return this.$store.state.offerToDelete;
    },
  },
};
</script>
