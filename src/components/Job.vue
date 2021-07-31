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
            <a href="#">{{ job.title }}</a>
            <span
              class="dashboard-status-button"
              :class="job.assignedTo ? 'green' : 'yellow'"
              >{{ job.assignedTo ? "Assigned" : "Pending Approval" }}</span
            >
          </h3>

          <!-- Job Listing Footer -->
          <div class="job-listing-footer">
            <ul>
              <li>
                <i class="icon-material-outline-date-range"></i>
                Posted on 10 July, 2019
              </li>
              <li>
                <i class="icon-material-outline-date-range"></i>
                Expiring on 10 August, 2019
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="buttons-to-right always-visible">
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
import { getJquery } from "../helpers";
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
        .then((res) => {
          this.$store.dispatch("getAllJobs", {
            user: JSON.parse(localStorage.getItem("user")).id,
          });
          console.log(res, "Updted Successfully");
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
    getJquery();
    console.log(this.job);
  },
};
</script>
