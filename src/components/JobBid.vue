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
            {{ bid.jobPost.title }}
            <a
              ref="JobDetailsDialog"
              href="#job-details-dialog"
              @click="setJob"
              class="popup-with-zoom-anim"
            >
              <i class="icon-line-awesome-info-circle"></i>
            </a>
          </h4>

          <!-- Details -->
          <!-- <span class="freelancer-detail-item"
            ><i class="icon-feather-dollar-sign"></i>
            {{ bid.jobPost.price }}
          </span> -->
          <span class="freelancer-detail-item">
            <i class="icon-material-outline-access-time"></i>
            Placed On: {{ bid.createdAt.split("T")[0] }}</span
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
              <strong>{{ bid.time }} Days</strong><span>Delivery Time</span>
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
              v-if="!bid.isAssigned"
              @click="acceptOffer"
              class="acceptOffer button green ripple-effect"
              ><i class="icon-material-outline-check"></i>
              {{ offerAccepted ? "Offer Accepted !!" : "Accept Offer" }}
            </a>
            <a
              v-if="!bid.isAssigned"
              href="#delete-offer-dialog"
              class="popup-with-zoom-anim button red ripple-effect ico"
              title="Remove Bid"
              data-tippy-placement="top"
              @click="setOffer"
              ><i class="icon-feather-trash-2"></i
            ></a>
            <a
              v-if="bid.isAssigned"
              class="button ripple-effect green"
              title="Bid has been accepted."
              data-tippy-placement="top"
            >
              BID ACCEPTED
            </a>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { getCustomJs } from "../helpers";
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
    setJob() {
      this.$store.commit("setJob", {
        loading: true,
      });
      if (this.bid.jobPost?.id) {
        this.$store
          .dispatch("getAJob", { id: this.bid.jobPost.id })
          .then((res) => {
            this.$store.commit("setJob", res.data);
          });
      } else {
        this.$store.commit("setJob", null);
      }
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
          this.$router.push("/manage-jobs");
        });
    },
    setOffer() {
      this.$store.commit("setOfferToDelete", this.bid.id);
    },
  },
  mounted() {
    getCustomJs();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
<style scoped>
.icon-line-awesome-info-circle {
  color: #5bc0de !important;
}
</style>
