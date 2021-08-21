<template>
  <div>
    <div class="margin-top-90"></div>
    <!-- Titlebar
================================================== -->
    <div
      class="single-page-header"
      data-background-image="/assets/images/single-task.jpg"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="single-page-header-inner">
              <div class="left-side">
                <div class="header-image">
                  <a href="#"
                    ><img src="images/browse-companies-02.png" alt=""
                  /></a>
                </div>
                <div class="header-details">
                  <h3 v-if="job.title">{{ job.title }}</h3>
                  <vue-skeleton-loader
                    v-else
                    :width="300"
                    :height="50"
                    animation="fade"
                  />
                  <h5>About the Employer</h5>
                  <ul>
                    <li>
                      <a href="#"
                        ><i class="icon-material-outline-business"></i> Acue</a
                      >
                    </li>
                    <li><div class="star-rating" data-rating="5.0"></div></li>
                    <li>
                      <img class="flag" src="images/flags/de.svg" alt="" />
                      Germany
                    </li>
                    <li>
                      <div class="verified-badge-with-title">Verified</div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="right-side">
                <div class="salary-box">
                  <div class="salary-type">Project Budget</div>
                  <div v-if="job.price" class="salary-amount">
                    ${{ job.price }}
                  </div>
                  <vue-skeleton-loader
                    v-else
                    :width="100"
                    :height="30"
                    animation="fade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <!-- Content -->
        <div class="col-xl-8 col-lg-8 content-right-offset">
          <!-- Description -->
          <div class="single-page-section">
            <h3 class="margin-bottom-25">Project Description</h3>
            <p v-if="job.description">
              {{ job.description }}
            </p>
            <p v-else>
              <vue-skeleton-loader
                :width="500"
                :height="30"
                animation="fade"
                class="mtt"
              />
              <vue-skeleton-loader
                :width="700"
                :height="30"
                animation="fade"
                class="mtt"
              />
              <vue-skeleton-loader
                :width="700"
                :height="30"
                animation="fade"
                class="mtt"
              />
              <vue-skeleton-loader
                :width="700"
                :height="30"
                animation="fade"
                class="mtt"
              />
              <vue-skeleton-loader
                :width="700"
                :height="30"
                animation="fade"
                class="mtt"
              />
            </p>
          </div>

          <!-- Atachments -->
          <div class="single-page-section">
            <h3>Attachments</h3>
            <div class="attachments-container">
              <a href="#" class="attachment-box ripple-effect"
                ><span>Project Brief</span><i>PDF</i></a
              >
            </div>
          </div>

          <!-- Questions -->
          <div v-if="job.questions" class="single-page-section">
            <h3>Questions</h3>
            <div class="numbered">
              <ol>
                <li v-for="(question, i) in job.questions" :key="i">
                  {{ question }}
                </li>
              </ol>
            </div>
          </div>

          <!-- Skills -->
          <div class="single-page-section">
            <h3>Skills and Expertise</h3>
            <div v-if="job.tags" class="task-tags">
              <span v-for="tag in job.tags" :key="tag.id">{{ tag.title }}</span>
            </div>
            <div v-else class="task-tags">
              <span
                ><vue-skeleton-loader
                  :width="150"
                  :height="30"
                  animation="fade"
                  class="mtt"
              /></span>
              <span
                ><vue-skeleton-loader
                  :width="150"
                  :height="30"
                  animation="fade"
                  class="mtt"
              /></span>
              <span
                ><vue-skeleton-loader
                  :width="150"
                  :height="30"
                  animation="fade"
                  class="mtt"
              /></span>
            </div>
          </div>
          <div class="clearfix"></div>
          <!-- Freelancers Bidding -->
          <div class="boxed-list margin-bottom-60">
            <div class="boxed-list-headline">
              <h3>
                <i class="icon-material-outline-group"></i> Freelancers Bidding
              </h3>
            </div>
            <ul v-if="bids.length > 0" class="boxed-list-ul">
              <li v-for="bid in bids" :key="bid.id">
                <div class="bid">
                  <!-- Avatar -->
                  <div class="bids-avatar">
                    <div class="freelancer-avatar">
                      <div class="verified-badge"></div>
                      <a href="#"
                        ><img
                          src="/assets/images/user-avatar-big-01.jpg"
                          alt=""
                      /></a>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="bids-content">
                    <!-- Name -->
                    <div class="freelancer-name">
                      <h4>
                        <a href="#"
                          >{{ bid.user.name }}
                          <img
                            class="flag"
                            src="/assets/images/flags/gb.svg"
                            alt=""
                            title="United Kingdom"
                            data-tippy-placement="top"
                        /></a>
                      </h4>
                      <div class="star-rating" data-rating="4.9"></div>
                    </div>
                  </div>

                  <!-- Bid -->
                  <div class="bids-bid">
                    <div class="bid-rate">
                      <div class="rate">${{ bid.price }}</div>
                      <span>in {{ bid.time }} Days</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="boxed-list-ul mtt" v-else>
              <div class="notification warning closeable mtt">
                <p>No bid yet! Be first to add bid.</p>
              </div>
            </ul>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-xl-4 col-lg-4">
          <div class="sidebar-container">
            <!-- <div class="countdown green margin-bottom-35">
              6 days, 23 hours left
            </div> -->

            <div class="sidebar-widget">
              <div class="bidding-widget">
                <div class="bidding-headline"><h3>Bid on this job!</h3></div>
                <div class="bidding-inner">
                  <!-- Headline -->
                  <div
                    v-if="error.response.status"
                    class="notification error closeable"
                  >
                    <p>{{ error.response.message }}</p>
                    <a
                      class="close"
                      @click="error.response.status = !error.response.status"
                    ></a>
                  </div>
                  <div
                    v-if="success.status"
                    class="notification success closeable"
                  >
                    <p>{{ success.message }}</p>
                    <a
                      class="close"
                      @click="success.status = !success.status"
                    ></a>
                  </div>
                  <span class="bidding-detail"
                    >Select your <strong>suitable rate</strong></span
                  >

                  <!-- Price Slider -->
                  <div class="bidding-value">
                    $<span id="biddingVal">{{ price }}</span>
                  </div>
                  <Slider :max="job.price" v-model="price" />
                  <div class="mtt">
                    <input v-model="price" type="number" class="with-border" />
                  </div>
                  <div>
                    <div
                      class="section-headline margin-top-25 margin-bottom-12"
                    >
                      <h5>How many days will this project take?</h5>
                    </div>

                    <div class="mtt">
                      <input
                        type="number"
                        min="1"
                        v-model="time"
                        placeholder="no. of days"
                        class="with-border margin-bottom-25"
                      />
                    </div>

                    <!-- <select v-model="time" class="selectpicker">
                      <option value="Select project length">
                        Select project length
                      </option>
                      <option value="More than 6 months">
                        More than 6 months
                      </option>
                      <option value="3 to 6 months">3 to 6 months</option>
                      <option value="1 to 3 months">1 to 3 months</option>
                      <option value="Less than 1 month">
                        Less than 1 month
                      </option>
                    </select> -->
                    <small v-if="error.time.status" class="error">
                      {{ error.time.message }}
                    </small>
                  </div>
                  <!-- Headline -->
                  <div class="submit-field mtt">
                    <h5>Any message</h5>
                    <textarea
                      v-model="description"
                      cols="30"
                      rows="3"
                      placeholder="Enter your message"
                      class="with-border"
                    ></textarea>
                    <small v-if="error.description.status" class="error">
                      {{ error.description.message }}
                    </small>
                  </div>

                  <!-- Button -->
                  <button
                    v-bind:disabled="isLoading"
                    @click="addBid"
                    id="snackbar-place-bid"
                    class="
                      button
                      ripple-effect
                      move-on-hover
                      full-width
                      margin-top-30
                    "
                  >
                    <div v-if="isLoading" class="lds-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div v-else><span>Place a Bid</span></div>
                  </button>
                </div>
                <!-- <div class="bidding-signup">
                  Don't have an account?
                  <a
                    href="#sign-in-dialog"
                    class="register-tab sign-in popup-with-zoom-anim"
                    >Sign Up</a
                  >
                </div> -->
              </div>
            </div>

            <!-- Sidebar Widget -->
            <div class="sidebar-widget">
              <h3>Share this job!</h3>

              <!-- Bookmark Button -->
              <!-- <button class="bookmark-button margin-bottom-25">
                <span class="bookmark-icon"></span>
                <span class="bookmark-text">Bookmark</span>
                <span class="bookmarked-text">Bookmarked</span>
              </button> -->

              <!-- Copy URL -->
              <div class="copy-url">
                <input id="copy-url" type="text" value="" class="with-border" />
                <button
                  class="copy-url-button ripple-effect"
                  data-clipboard-target="#copy-url"
                  title="Copy to Clipboard"
                  data-tippy-placement="top"
                >
                  <i class="icon-material-outline-file-copy"></i>
                </button>
              </div>

              <!-- Share Buttons -->
              <!-- <div class="share-buttons margin-top-25">
                <div class="share-buttons-trigger">
                  <i class="icon-feather-share-2"></i>
                </div>
                <div class="share-buttons-content">
                  <span>Interesting? <strong>Share It!</strong></span>
                  <ul class="share-buttons-icons">
                    <li>
                      <a
                        href="#"
                        data-button-color="#3b5998"
                        title="Share on Facebook"
                        data-tippy-placement="top"
                        ><i class="icon-brand-facebook-f"></i
                      ></a>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-button-color="#1da1f2"
                        title="Share on Twitter"
                        data-tippy-placement="top"
                        ><i class="icon-brand-twitter"></i
                      ></a>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-button-color="#dd4b39"
                        title="Share on Google Plus"
                        data-tippy-placement="top"
                        ><i class="icon-brand-google-plus-g"></i
                      ></a>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-button-color="#0077b5"
                        title="Share on LinkedIn"
                        data-tippy-placement="top"
                        ><i class="icon-brand-linkedin-in"></i
                      ></a>
                    </li>
                  </ul>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Spacer -->
    <div class="margin-top-15"></div>
    <!-- Spacer / End-->
  </div>
</template>
<script>
// import { Fragment } from "vue-fragment";
import Slider from "@vueform/slider/dist/slider.vue2.js";
import VueSkeletonLoader from "skeleton-loader-vue";
import "@vueform/slider/themes/default.css";
import { getCustomJs } from "../helpers";

export default {
  data() {
    return {
      bids: [],
      isLoading: false,
      time: "",
      description: "",
      price: 20,
      job: {},
      success: {
        status: false,
        message: "Added successfully!",
      },
      error: {
        time: {
          status: false,
          message: "",
        },
        description: {
          status: false,
          message: "",
        },
        days: {
          status: false,
          message: "",
        },
        price: {
          status: false,
          message: "",
        },
        response: {
          status: false,
          message: "",
        },
      },
    };
  },
  components: { Slider, VueSkeletonLoader },
  methods: {
    addBid() {
      if (this.validateBid()) {
        this.isLoading = true;
        this.$store
          .dispatch("createBid", {
            time: this.time,
            price: this.price,
            currency: "USD",
            jobType: this.job.jobType,
            jobPost: this.job.id,
            description: this.description,
          })
          .then(() => {
            this.description = "";
            this.time = "";
            this.price = 20;
            this.isLoading = false;
            // this.success.status = true;
            // setTimeout(() => {
            //   this.success.status = false;
            // }, 5000);
            this.$toast.open({
              message: "Bid placed successfully!",
              type: "success",
              duration: 3000,
              dismissible: true,
            });
            this.$store
              .dispatch("getJobBids", { jobId: this.job.id })
              .then((res) => {
                this.bids = res;
              });
          })
          .catch((err) => {
            // this.error.response.status = true;
            // this.error.response.message =
            //   err.response.data.message || "Something went wrong!";

            this.$toast.open({
              message: err.response.data.message || "Something went wrong!",
              type: "error",
              duration: 3000,
              dismissible: true,
            });
            this.isLoading = false;
          });
      }
    },
    validateBid() {
      if (this.description && this.time && this.price) {
        if (!this.price || this.price <= 0) {
          this.error.price.status = true;
          this.error.price.message = "Price is required!";
          return false;
        }
        if (this.time < 1) {
          this.error.time.status = true;
          this.error.time.message = "Invalid time!";
          return false;
        }
        this.error.time.status = false;
        this.error.description.status = false;
        this.error.price.status = false;
        return true;
      }
      if (!this.description) {
        this.error.description.status = true;
        this.error.description.message = "Description is required!";
      }
      if (this.time < 1) {
        this.error.time.status = true;
        this.error.time.message = "Invalid time!";
      }

      setTimeout(() => {
        this.error.time.status = false;
        this.error.description.status = false;
        this.error.price.status = false;
      }, 5000);
    },
  },
  mounted() {
    this.$store
      .dispatch("getAJob", { id: this.$route.params.id })
      .then((res) => {
        this.job = res.data;
        if (this.job.price < 20) this.price = this.job.price;
        this.$store
          .dispatch("getJobBids", { jobId: this.job.id })
          .then((res) => {
            this.bids = res;
          });
      });

    getCustomJs();
  },
};
</script>
<style>
.slider-connect,
.slider-base {
  background: #2a41e8 !important;
}
.slider-tooltip {
  background: #2a41e8 !important;
}
.slider-horizontal {
  height: 6px;
  margin-top: 50px;
  margin-bottom: 20px;
}
.error {
  color: red;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 24px;
  height: 24px;
  border: 3px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.ti-tag {
  background-color: rgba(42, 65, 232, 0.07) !important;
  color: #2a41e8 !important;
}
.ti-new-tag-input {
  padding: 0px 10px !important;
}
</style>
