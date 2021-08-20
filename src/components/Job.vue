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
      <span v-if="job.status === 'submitted'" class="countdown green">
        <i class="icon-feather-thumbs-up"></i>
        Job has been submitted by the freelancer

        <ul class="tags">
          <li v-for="file in job.projectFiles" :key="file">
            <a :href="file" target="_blank" class="tag">{{
              re.exec(file)[1]
            }}</a>
          </li>
        </ul>

        <button @click="completeJob" class="button green ripple-effect">
          Complete Job
        </button>
      </span>
      <span v-else-if="job.status === 'completed'" class="countdown green">
        <i class="icon-feather-thumbs-up"></i>
        Completed
      </span>
      <div v-else>
        <span
          v-if="computedTimeLeft.status === 'ON_TIME'"
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
  data() {
    return {
      re: /(?:\/([^/]+))?$/,
    };
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
    completeJob() {
      this.$store
        .dispatch("completeAJob", {
          id: this.job.id,
        })
        .then(() => {
          this.$store.dispatch("getAllJobs", {
            user: JSON.parse(localStorage.getItem("user")).id,
          });
          this.$toast.open({
            message: "Job has been completed Successfully!",
            type: "success",
            duration: 2000,
            dismissible: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
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

.tags {
  list-style: none;
  overflow: hidden;
  padding: 0;
  text-align: left;
}

.tag {
  color: inherit;
  border-radius: 3px 0 0 3px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  padding: 0 20px 0 23px;
  position: relative;
  margin: 12px 10px 10px 0;
  text-decoration: underline;
}

.tag::before {
  background: #fff;
  border-radius: 10px;
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
  content: "";
  height: 8px;
  left: 10px;
  position: absolute;
  width: 8px;
  top: 10px;
}

button.green {
  margin-top: 1rem;
  width: 100%;
}
</style>
