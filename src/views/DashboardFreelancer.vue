<template>
  <!-- Dashboard Content
	================================================== -->
  <div class="dashboard-content-container" data-simplebar>
    <div class="dashboard-content-inner">
      <!-- Dashboard Headline -->
      <div class="dashboard-headline">
        <h3>{{ user.name }}!</h3>
        <span>We are glad to see you again!</span>

        <!-- Breadcrumbs -->
        <nav id="breadcrumbs" class="dark">
          <ul>
            <li><a href="#">Home</a></li>
            <li>Dashboard</li>
          </ul>
        </nav>
      </div>

      <!-- Fun Facts Container -->
      <div class="fun-facts-container">
        <div class="fun-fact" data-fun-fact-color="#36bd78">
          <div class="fun-fact-text">
            <span>No of Freelancers</span>
            <h4 v-if="noOfFreelancer">{{ noOfFreelancer }}</h4>
            <vue-skeleton-loader
              v-else
              :width="100"
              :height="50"
              animation="fade"
              class="mtt"
            />
          </div>
          <div class="fun-fact-icon">
            <i class="icon-feather-users"></i>
          </div>
        </div>
        <div class="fun-fact" data-fun-fact-color="#b81b7f">
          <div class="fun-fact-text">
            <span>No of Jobs</span>
            <h4 v-if="noOfJobs">{{ noOfJobs }}</h4>
            <vue-skeleton-loader
              v-else
              :width="100"
              :height="50"
              animation="fade"
              class="mtt"
            />
          </div>
          <div class="fun-fact-icon">
            <i class="icon-material-outline-business-center"></i>
          </div>
        </div>
        <!-- <div class="fun-fact" data-fun-fact-color="#efa80f">
          <div class="fun-fact-text">
            <span>Reviews</span>
            <h4>28</h4>
          </div>
          <div class="fun-fact-icon">
            <i class="icon-material-outline-rate-review"></i>
          </div>
        </div> -->

        <!-- Last one has to be hidden below 1600px, sorry :( -->
        <div class="fun-fact" data-fun-fact-color="#2a41e6">
          <div class="fun-fact-text">
            <span>This Month Views</span>
            <h4>987</h4>
          </div>
          <div class="fun-fact-icon">
            <i class="icon-feather-trending-up"></i>
          </div>
        </div>
      </div>

      <!-- Row -->
      <!-- <div class="row"> -->
      <!-- <div class="col-xl-8"> -->
      <!-- Dashboard Box -->
      <!-- <div class="dashboard-box main-box-in-row"> -->
      <!-- <div class="headline">
              <h3>
                <i class="icon-feather-bar-chart-2"></i> Your Profile Views
              </h3>
              <div class="sort-by">
                <select class="selectpicker hide-tick">
                  <option>Last 6 Months</option>
                  <option>This Year</option>
                  <option>This Month</option>
                </select>
              </div>
            </div> -->
      <!-- <div class="content">
              <div class="chart">
                <canvas id="chart" width="100" height="45"></canvas>
              </div>
            </div> -->
      <!-- </div> -->
      <!-- Dashboard Box / End -->
      <!-- </div> -->
      <!-- <div class="col-xl-4"> -->
      <!-- <div class="dashboard-box child-box-in-row"> -->
      <!-- <div class="headline">
              <h3><i class="icon-material-outline-note-add"></i> Notes</h3>
            </div> -->

      <!-- <div class="content with-padding"> -->
      <!-- <div class="dashboard-note">
                <p>
                  Meeting with candidate at 3pm who applied for Bilingual Event
                  Support Specialist
                </p>
                <div class="note-footer">
                  <span class="note-priority high">High Priority</span>
                  <div class="note-buttons">
                    <a href="#" title="Edit" data-tippy-placement="top"
                      ><i class="icon-feather-edit"></i
                    ></a>
                    <a href="#" title="Remove" data-tippy-placement="top"
                      ><i class="icon-feather-trash-2"></i
                    ></a>
                  </div>
                </div>
              </div> -->
      <!-- Note -->
      <!-- <div class="dashboard-note">
                <p>Extend premium plan for next month</p>
                <div class="note-footer">
                  <span class="note-priority low">Low Priority</span>
                  <div class="note-buttons">
                    <a href="#" title="Edit" data-tippy-placement="top"
                      ><i class="icon-feather-edit"></i
                    ></a>
                    <a href="#" title="Remove" data-tippy-placement="top"
                      ><i class="icon-feather-trash-2"></i
                    ></a>
                  </div>
                </div>
              </div> -->
      <!-- Note -->
      <!-- <div class="dashboard-note">
                <p>Send payment to David Peterson</p>
                <div class="note-footer">
                  <span class="note-priority medium">Medium Priority</span>
                  <div class="note-buttons">
                    <a href="#" title="Edit" data-tippy-placement="top"
                      ><i class="icon-feather-edit"></i
                    ></a>
                    <a href="#" title="Remove" data-tippy-placement="top"
                      ><i class="icon-feather-trash-2"></i
                    ></a>
                  </div>
                </div>
              </div> -->
      <!-- </div> -->
      <!-- <div class="add-note-button">
              <a
                href="#small-dialog"
                class="popup-with-zoom-anim button full-width button-sliding-icon"
                >Add Note <i class="icon-material-outline-arrow-right-alt"></i
              ></a>
            </div> -->
      <!-- </div> -->
      <!-- Dashboard Box / End -->
      <!-- </div> -->
      <!-- </div> -->
      <!-- Row / End -->

      <!-- Row -->
      <!-- <div class="row"> -->
      <!-- Dashboard Box -->

      <!-- Dashboard Box -->
      <!-- <div class="col-xl-6">
          <div class="dashboard-box"> -->
      <!-- <div class="headline">
              <h3><i class="icon-material-outline-assignment"></i> Orders</h3>
            </div> -->
      <!-- <div class="content">
              <ul class="dashboard-box-list"> -->
      <!-- <li> -->
      <!-- <div class="invoice-list-item">
                    <strong>Professional Plan</strong>
                    <ul>
                      <li><span class="unpaid">Unpaid</span></li>
                      <li>Order: #326</li>
                      <li>Date: 12/08/2019</li>
                    </ul>
                  </div> -->
      <!-- Buttons -->
      <!-- <div class="buttons-to-right">
                    <a href="pages-checkout-page.html" class="button"
                      >Finish Payment</a
                    >
                  </div> -->
      <!-- </li> -->
      <!-- <li> -->
      <!-- <div class="invoice-list-item">
                    <strong>Professional Plan</strong>
                    <ul>
                      <li><span class="paid">Paid</span></li>
                      <li>Order: #264</li>
                      <li>Date: 10/07/2019</li>
                    </ul>
                  </div> -->
      <!-- Buttons -->
      <!-- <div class="buttons-to-right">
                    <a href="pages-invoice-template.html" class="button gray"
                      >View Invoice</a
                    >
                  </div> -->
      <!-- </li> -->
      <!-- <li> -->
      <!-- <div class="invoice-list-item">
                    <strong>Professional Plan</strong>
                    <ul>
                      <li><span class="paid">Paid</span></li>
                      <li>Order: #211</li>
                      <li>Date: 12/06/2019</li>
                    </ul>
                  </div> -->
      <!-- Buttons -->
      <!-- <div class="buttons-to-right">
                    <a href="pages-invoice-template.html" class="button gray"
                      >View Invoice</a
                    >
                  </div> -->
      <!-- </li> -->
      <!-- <li> -->
      <!-- <div class="invoice-list-item">
                    <strong>Professional Plan</strong>
                    <ul>
                      <li><span class="paid">Paid</span></li>
                      <li>Order: #179</li>
                      <li>Date: 06/05/2019</li>
                    </ul>
                  </div> -->
      <!-- Buttons -->
      <!-- <div class="buttons-to-right">
                    <a href="pages-invoice-template.html" class="button gray"
                      >View Invoice</a
                    >
                  </div> -->
      <!-- </li> -->
      <!-- </ul>
            </div>
          </div>
        </div>
      </div> -->
      <!-- Row / End -->

      <!-- Footer -->
      <div class="dashboard-footer-spacer"></div>
      <div class="small-footer margin-top-15">
        <div class="small-footer-copyrights">
          © 2019 <strong>Hireo</strong>. All Rights Reserved.
        </div>
        <ul class="footer-social-links">
          <li>
            <a href="#" title="Facebook" data-tippy-placement="top">
              <i class="icon-brand-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="#" title="Twitter" data-tippy-placement="top">
              <i class="icon-brand-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#" title="Google Plus" data-tippy-placement="top">
              <i class="icon-brand-google-plus-g"></i>
            </a>
          </li>
          <li>
            <a href="#" title="LinkedIn" data-tippy-placement="top">
              <i class="icon-brand-linkedin-in"></i>
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <!-- Footer / End -->
    </div>
  </div>
  <!-- Dashboard Content / End -->
</template>

<script>
import VueSkeletonLoader from "skeleton-loader-vue";

export default {
  name: "Dasboard",
  data() {
    return {
      noOfFreelancer: "",
      noOfJobs: "",
    };
  },
  components: {
    VueSkeletonLoader,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    this.$store.dispatch("commonAnalytics").then((res) => {
      this.noOfFreelancer = res.data.freelancerCount;
      this.noOfJobs = res.data.jobPostCount;
    });
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
};
</script>

<style></style>
