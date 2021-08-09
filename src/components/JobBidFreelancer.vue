<template>
  <li :class="jobStatus === 'PENDING' ? '' : 'job_expired'">
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
              ref="JobDetailsDialog"
              href="#job-details-dialog"
              @click="setJob"
              class="popup-with-zoom-anim"
            >
              {{ (bid.jobPost || {}).title || "Job Not Found !!" }}
              <img
                class="flag"
                src="images/flags/sk.svg"
                alt=""
                title="Slovakia"
                data-tippy-placement="top"
            /></a>
          </h4>

          <!-- Details -->
          <span v-if="jobStatus === 'PENDING'" class="freelancer-detail-item"
            ><i class="icon-feather-dollar-sign"></i>
            {{ bid.jobPost.price }}
          </span>
          <span v-if="jobStatus === 'PENDING'" class="freelancer-detail-item">
            <i class="icon-material-outline-access-time"></i>
            {{ bid.jobPost.time + " Days" }}</span
          >
          <span v-if="jobStatus === 'DELETED'" class="freelancer-detail-item">
            <i class="icon-feather-alert-triangle"></i>
            Job may has been deleted by the creator.</span
          >
          <span
            v-if="jobStatus === 'ASSIGNED_TO_OTHER'"
            class="freelancer-detail-item"
          >
            <i class="icon-feather-alert-triangle"></i>
            Job has already been assigned to another bidder.</span
          >

          <!-- Rating -->
          <br />
          <!-- <span class="company-not-rated">Minimum of 3 votes required</span> -->

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
              href="#delete-offer-dialog"
              class="popup-with-zoom-anim button red ripple-effect ico"
              title="Remove Bid"
              data-tippy-placement="top"
              @click="setOffer"
              ><i class="icon-feather-trash-2"></i
            ></a>
            <span v-if="bid.isAssigned">
              <span
                v-if="bid.jobPost.status === 'completed'"
                class="countdown green"
              >
                <i class="icon-material-outline-access-time"></i>
                Completed
              </span>

              <span
                v-else-if="timeLeft.status === 'ON_TIME'"
                class="countdown green"
              >
                <i class="icon-material-outline-access-time"></i>
                {{ timeLeft.days }} days left in delivery.
              </span>

              <span
                v-else-if="timeLeft.status === 'DEADLINE_NEAR'"
                class="countdown yellow"
              >
                <i class="icon-material-outline-access-time"></i>
                {{ timeLeft.days }} days left in delivery.
              </span>

              <span
                v-else-if="timeLeft.status === 'LATE'"
                class="countdown red"
              >
                <i class="icon-material-outline-access-time"></i>
                {{ timeLeft.days }} days late.
              </span>
            </span>
          </div>

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
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { getCustomJs, getTimeLeft } from "../helpers";
export default {
  name: "JobBidFreelancer",
  props: {
    bid: Object,
  },
  data() {
    return {
      jobStatus: this.bid.jobPost
        ? this.bid.jobPost.status === "assigned" && !this.bid.isAssigned
          ? "ASSIGNED_TO_OTHER"
          : "PENDING"
        : "DELETED",
      timeLeft: {},
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
    setOffer() {
      this.$store.commit("setOfferToDelete", this.bid.id);
    },
  },
  mounted() {
    getCustomJs();
    this.timeLeft = getTimeLeft(this.bid.jobPost);
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style scoped>
@media (min-width: 1366px) {
  .countdown {
    width: unset;
    display: unset;
    font-size: unset;
    padding: 14px 28px;
  }
}
</style>
