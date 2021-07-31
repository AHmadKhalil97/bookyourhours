<template>
  <li>
    <div class="freelancer-overview manage-candidates">
      <div class="freelancer-overview-inner">
        <!-- Avatar -->
        <div class="freelancer-avatar">
          <a href="#"
            ><img src="images/user-avatar-placeholder.png" alt=""
          /></a>
        </div>

        <!-- Name -->
        <div class="freelancer-name">
          <h4>
            <a
              ref="FreeLancerProfilePopup"
              href="#freelancer-profile-dialog"
              @click="setFreelancer"
              class="popup-with-zoom-anim"
            >
              {{ bid.user.name }}
              <img
                class="flag"
                src="images/flags/sk.svg"
                alt=""
                title="Slovakia"
                data-tippy-placement="top"
            /></a>
          </h4>

          <!-- Details -->
          <span class="freelancer-detail-item"
            ><a href="#"
              ><i class="icon-feather-mail"></i> {{ bid.user.email }}</a
            ></span
          >
          <span class="freelancer-detail-item"
            ><i class="icon-feather-phone"></i> (+92){{
              bid.user.phoneNumber
            }}</span
          >

          <!-- Rating -->
          <br />
          <!-- <span class="company-not-rated">Minimum of 3 votes required</span> -->

          <!-- Bid Details -->
          <ul class="dashboard-task-info bid-info">
            <li>
              <strong>{{ bid.currency }} {{ bid.price }}</strong
              ><span>{{
                bid.jobType === "fixed" ? "Fixed Price" : "Hourly Rate"
              }}</span>
            </li>
            <li>
              <strong>{{ bid.time }}</strong
              ><span>Delivery Time</span>
            </li>
          </ul>

          <!-- Buttons -->
          <div
            class="
              buttons-to-right
              always-visible
              margin-top-25 margin-bottom-0
            "
          >
            <a
              v-if="user.accountType === 'employer'"
              :disabled="offerAccepted"
              @click="acceptOffer"
              class="acceptOffer button green ripple-effect"
              ><i class="icon-material-outline-check"></i>
              {{ offerAccepted ? "Offer Accepted !!" : "Accept Offer" }}
            </a>
            <!-- <a
              href="#small-dialog-2"
              class="popup-with-zoom-anim button dark ripple-effect"
              ><i class="icon-feather-mail"></i> Send Message</a
            > -->
            <a
              v-if="!offerAccepted"
              href="#delete-offer-dialog"
              class="popup-with-zoom-anim button red ripple-effect ico"
              title="Remove Bid"
              data-tippy-placement="top"
              @click="setOffer"
              ><i class="icon-feather-trash-2"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "JobBid",
  props: {
    bid: Object,
  },
  data() {
    return {
      offerAccepted: false,
    };
  },
  methods: {
    setFreelancer() {
      console.log(this.bid.user);
      this.$store.commit("setFreelancer", this.bid.user);
    },
    acceptOffer() {
      this.$store
        .dispatch("assignJobBid", {
          bidId: this.bid.id,
          jobPostId: this.$route.params.jobId,
        })
        .then(({ data: { isAssigned } }) => {
          this.offerAccepted = isAssigned;
          this.$toast.open({
            message: "Offer Accepted Successfully!",
            type: "success",
            duration: 2000,
            dismissible: true,
          });
          this.$router.push("/jobs");
        });
    },
    setOffer() {
      this.$store.commit("setOfferToDelete", this.bid.id);
    },
  },
  mounted() {
    if (!document.getElementById("customJs")) {
      let customScript = document.createElement("script");
      customScript.setAttribute("src", "/assets/js/custom.js");
      customScript.setAttribute("type", "text/javascript");
      customScript.setAttribute("id", "customJs");
      document.body.appendChild(customScript);
    } else {
      let customScript = document.getElementById("customJs");
      document.body.removeChild(customScript);
      document.body.removeChild(document.getElementById("backtotop"));
      customScript = document.createElement("script");
      customScript.setAttribute("src", "/assets/js/custom.js");
      customScript.setAttribute("type", "text/javascript");
      customScript.setAttribute("id", "customJs");
      document.body.appendChild(customScript);
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
