<template>
  <!-- Features Jobs -->
  <div class="section gray margin-top-45 padding-top-65 padding-bottom-75">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <!-- Section Headline -->
          <div class="section-headline margin-top-0 margin-bottom-35">
            <h3>Recent Jobs</h3>
            <router-link class="headline-link" :to="{ name: 'BrowseJobs' }"
              >Browse All jobs</router-link
            >
          </div>

          <!-- Jobs Container -->
          <div class="tasks-list-container compact-list margin-top-35">
            <!-- Task -->
            <div
              v-if="jobs"
              class="tasks-list-container compact-list margin-top-35"
            >
              <!-- Task -->
              <router-link
                v-for="job in jobs"
                :key="job.id"
                :to="{ path: '/job/' + job.id }"
                class="task-listing"
              >
                <!-- Job Listing Details -->
                <div class="task-listing-details">
                  <!-- Details -->
                  <div class="task-listing-description">
                    <h3 class="task-listing-title">{{ job.title }}</h3>
                    <ul class="task-icons">
                      <li>
                        <i class="icon-material-outline-location-on"></i>
                        {{ job.type }}
                      </li>
                      <li>
                        <i class="icon-material-outline-access-time"></i>
                        {{ job.time }}
                      </li>
                    </ul>
                    <p
                      v-html="$options.filters.truncate(job.description)"
                      class="task-listing-text"
                    ></p>
                    <div class="task-tags">
                      <span v-for="tag in job.tags" :key="tag.id">{{
                        tag.title
                      }}</span>
                    </div>
                  </div>
                </div>

                <div class="task-listing-bid">
                  <div class="task-listing-bid-inner">
                    <div class="task-offers">
                      <strong>${{ job.price }}</strong>
                      <span>Fixed Price</span>
                    </div>
                    <span class="button button-sliding-icon ripple-effect"
                      >Bid Now
                      <i class="icon-material-outline-arrow-right-alt"></i
                    ></span>
                  </div>
                </div>
              </router-link>
            </div>
            <div v-else class="main">
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <!-- Jobs Container / End -->
        </div>
      </div>
    </div>
  </div>
  <!-- Featured Jobs / End -->
</template>

<script>
export default {
  name: "RecentTasks",
  data() {
    return {
      jobs: null,
    };
  },
  filters: {
    truncate: function (text) {
      if (text.length > 30) {
        return text.substring(0, 30) + "...";
      } else {
        return text;
      }
    },
  },
  mounted() {
    this.$store.dispatch("getAllJobs").then((res) => {
      this.jobs = res.data.results;
    });
  },
};
</script>

<style scoped>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #2a41e8;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #2a41e8 transparent transparent transparent;
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
.main {
  width: 100%;
  display: grid;
  place-items: center;
}
</style>
