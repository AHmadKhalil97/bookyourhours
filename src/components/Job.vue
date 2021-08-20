<template>
  <li>
    <!-- Job Listing -->
    <div class="job-listing">
      <!-- Job Listing Details -->
      <div class="job-listing-details">
        <!-- Logo -->
        <!-- 											<a href="#" class="job-listing-company-logo">
												<img src="images/company-logo-05.png" alt="">
											</a> -->

        <!-- Details -->
        <div class="job-listing-description">
          <h3 class="job-listing-title">
            {{ job.title }}
            <a
              v-if="job.assignedTo"
              ref="JobDetailsDialog"
              href="#job-details-dialog"
              @click="setJob"
              class="popup-with-zoom-anim"
            >
              <i class="icon-line-awesome-info-circle"></i>
            </a>
            <span v-else class="dashboard-status-button yellow"
              >Unassigned</span
            >
          </h3>

          <!-- Job Listing Footer -->
          <div class="job-listing-footer">
            <ul>
              <li>
                <i class="icon-material-outline-date-range"></i>
                Posted on {{ job.createdAt.split("T")[0] }}
              </li>
              <br />
              <li v-if="job.assignedTo">
                <i class="icon-material-outline-person-pin"></i>
                Assigned To '{{ job.assignedTo.name }}'
              </li>
              <!-- <li>
                <i class="icon-material-outline-date-range"></i>
                Expiring on 10 August, 2019
              </li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="job.assignedTo">
      <span v-if="job.status === 'completed'" class="countdown green">
        <i class="icon-material-outline-access-time"></i>
        Completed
      </span>

      <span
        v-else-if="computedTimeLeft.status === 'ON_TIME'"
        class="countdown green"
      >
        <i class="icon-material-outline-access-time"></i>
        {{ computedTimeLeft.days }} days left in delivery.
      </span>

      <span
        v-else-if="computedTimeLeft.status === 'DEADLINE_NEAR'"
        class="countdown yellow"
      >
        <i class="icon-material-outline-access-time"></i>
        {{ computedTimeLeft.days }} days left in delivery.
      </span>

      <span v-else-if="timeLeft.status === 'LATE'" class="countdown red">
        <i class="icon-material-outline-access-time"></i>
        {{ computedTimeLeft.days }} days late.
      </span>
    </div>

    <!-- Buttons -->
    <div v-if="!job.assignedTo" class="buttons-to-right always-visible">
      <!-- <a class="button ripple-effect"> -->
      <router-link
        class="button ripple-effect"
        :to="{ path: `/Job-bids/${job.id}` }"
        :jobId="job.id"
      >
        <i class="icon-material-outline-supervisor-account"></i> Manage
        canididates bids <span class="button-info">{{ job.bidCount }}</span>
      </router-link>

      <!-- </a> -->
      <a
        ref="JobPostDialog"
        href="#job-post-dialog"
        class="popup-with-zoom-anim button gray ripple-effect ico"
        title="Edit"
        data-tippy-placement="top"
        @click="setJob"
        ><i class="icon-feather-edit"></i
      ></a>
      <a
        ref="JobDetailsDialog"
        href="#job-details-dialog"
        class="popup-with-zoom-anim button info ripple-effect ico"
        title="Details"
        data-tippy-placement="top"
        @click="setJob"
        ><i class="icon-material-outline-info"></i
      ></a>
      <a
        ref="deleteDialog"
        href="#delete-job-dialog"
        class="popup-with-zoom-anim button red ripple-effect ico"
        title="Remove"
        data-tippy-placement="top"
        @click="setJob"
      >
        <i class="icon-feather-trash-2"></i
      ></a>
    </div>
  </li>
</template>
<script>
import { getCustomJs, getTimeLeft } from "../helpers";
export default {
  name: "Job",
  props: {
    job: Object,
  },
  methods: {
    editPost() {
      this.$store
        .dispatch("editJob", {
          id: this.job.id,
          data: { title: "Vue" },
        })
        .then(() => {
          this.$store.dispatch("getAllJobs", {
            user: JSON.parse(localStorage.getItem("user")).id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setJob() {
      this.$store.commit("setJob", this.job);
    },
  },
  mounted() {
    getCustomJs();
  },
  computed: {
    computedTimeLeft() {
      return getTimeLeft(this.job);
    },
  },
};
</script>

<style scoped>
.countdown {
  width: unset;
  display: inline-block;
  font-size: unset;
  padding: 14px 28px;
  margin: 0.5rem 0;
}
.icon-line-awesome-info-circle {
  color: #5bc0de !important;
}
</style>
