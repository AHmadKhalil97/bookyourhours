<template>
  <li :class="`job_${jobStatus.toLowerCase()}`">
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
            {{ (bid.jobPost || {}).title || "Job Not Found !!" }}
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
          <span class="freelancer-detail-item">
            <i class="icon-material-outline-access-time"></i>
            Placed On: {{ bid.createdAt.split("T")[0] }}</span
          >
          <span
            v-if="
              jobStatus === 'PENDING_DELIVERY' ||
              jobStatus === 'SUBMITTED' ||
              jobStatus === 'COMPLETED'
            "
            class="freelancer-detail-item"
          >
            <i class="icon-material-outline-access-time"></i>
            Assigned at: {{ bid.jobPost.assignedAt.split("T")[0] }}</span
          >
          <br />
          <span
            v-if="jobStatus === 'SUBMITTED'"
            class="text_submitted freelancer-detail-item"
          >
            <i class="icon-feather-thumbs-up"></i>
            Job has been submitted and pending for employer's review.</span
          >
          <span v-if="jobStatus === 'COMPLETED'" class="freelancer-detail-item">
            <i class="icon-feather-thumbs-up"></i>
            Job has been completed.</span
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
            <span
              v-if="
                bid.isAssigned &&
                jobStatus !== 'SUBMITTED' &&
                jobStatus !== 'COMPLETED'
              "
            >
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
          <div v-if="jobStatus === 'PENDING_DELIVERY'">
            <button
              v-if="deliveredFiles.length < 1"
              @click="uploadFiles"
              class="deliver button green ripple-effect"
            >
              <i class="icon-line-awesome-cloud-upload margin-right-8"></i>
              Deliver Now!
            </button>
            <div v-else class="files_uploaded">
              <div class="desc">
                <h4>
                  Delivery Message <span class="text-muted">(Optional)</span>
                </h4>
                <textarea
                  v-model="deliveryMessage"
                  class="with-border"
                ></textarea>
              </div>
              <div class="actions">
                <button @click="submit" class="button green ripple-effect">
                  <i class="icon-feather-send margin-right-8"></i>
                  Submit
                </button>

                <button
                  @click="deliveredFiles = []"
                  class="button red ripple-effect"
                >
                  Cancel
                </button>
              </div>
              <ul class="tags">
                <li v-for="file in deliveredFiles" :key="file.filename">
                  <span class="tag">{{ file.filename }}</span>
                </li>
              </ul>
            </div>
          </div>
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
    let jobStatus = "";
    if (this.bid.jobPost)
      if (this.bid.jobPost.status === "submitted") jobStatus = "SUBMITTED";
      else if (this.bid.jobPost.status === "completed") jobStatus = "COMPLETED";
      else if (this.bid.jobPost.status === "notAssigned")
        jobStatus = "NOT_ASSIGNED";
      else if (this.bid.jobPost.status === "assigned" && !this.bid.isAssigned)
        jobStatus = "ASSIGNED_TO_OTHER";
      else jobStatus = "PENDING_DELIVERY";
    else jobStatus = "DELETED";

    return {
      jobStatus,
      timeLeft: {},
      deliveredFiles: [],
      deliveryMessage: "",
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
    uploadFiles() {
      window.cloudinary
        .openUploadWidget(
          {
            cloud_name: "dnmge13ki",
            upload_preset: "qutpmtl3",
            sources: ["local"],
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              const { url, public_id, format } = result.info;
              this.deliveredFiles.push({
                url,
                filename: `${public_id}.${format}`,
              });
            }
          }
        )
        .open();
    },
    submit() {
      if (this.deliveredFiles.length)
        this.$store
          .dispatch("submitAJob", {
            id: this.bid.jobPost.id,
            files: this.deliveredFiles.map((file) => file.url),
            deliveryMessage: this.deliveryMessage,
          })
          .then(() => {
            this.$toast.open({
              message: "Job has been submitted Successfully!",
              type: "success",
              duration: 2000,
              dismissible: true,
            });
            this.jobStatus = "SUBMITTED";
            this.deliveredFiles = [];
          });
      else
        this.$toast.open({
          message: "No files attached",
          type: "error",
          duration: 2000,
          dismissible: true,
        });
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
.icon-line-awesome-info-circle {
  color: #5bc0de !important;
}
button.deliver {
  font-size: 18px;
  padding: 13px 22px;
  margin: auto;
  margin-top: 1.6rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.files_uploaded {
  margin-top: 1.6rem;
}

.files_uploaded .actions {
  display: flex;
  justify-content: space-around;
}

.files_uploaded .actions button {
  width: 48%;
  font-size: 18px;
  padding: 13px 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tags {
  list-style: none;
  margin: 1.4% 1%;
  overflow: hidden;
  padding: 0;
}

.tags li {
  float: left;
}

.tag {
  background: #eee;
  border-radius: 3px 0 0 3px;
  color: #999;
  display: inline-block;
  height: 26px;
  line-height: 26px;
  padding: 0 20px 0 23px;
  position: relative;
  margin: 0 10px 10px 0;
}

.tag::before {
  background: #fff;
  border-radius: 10px;
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
  content: "";
  height: 6px;
  left: 10px;
  position: absolute;
  width: 6px;
  top: 10px;
}

.tag::after {
  background: #fff;
  border-bottom: 13px solid transparent;
  border-left: 10px solid #eee;
  border-top: 13px solid transparent;
  content: "";
  position: absolute;
  right: 0;
  top: 0;
}

@media (min-width: 1200px) {
  button.deliver {
    max-width: 576px;
  }
}
</style>
