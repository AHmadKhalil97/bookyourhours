<template>
  <div class="col-xl-9 col-lg-8 content-left-offset">
    <!-- <h3 class="page-title">Search Results</h3>
    <div class="notify-box margin-top-15">
      <div class="sort-by">
        <span>Sort by:</span>
        <select v-model="orderBy" class="selectpicker">
          <option value="">Select</option>
          <option value="asc">Ascending</option>
          <option value="desc">Desending</option>
        </select>
      </div>
    </div> -->

    <!-- Tasks Container -->
    <div v-if="showAlert" class="notification error closeable">
      <p>Nothing found!</p>
      <a class="close" href="#"></a>
    </div>
    <div
      v-if="jobs"
      class="tasks-list-container compact-list margin-top-35 margin-bottom-35"
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
              <!-- <li>
                <i class="icon-material-outline-location-on"></i>
                {{ job.jobType }}
              </li> -->
              <li>
                <i class="icon-material-outline-access-time"></i>
                {{ job.time }} Days
              </li>
            </ul>
            <p
              v-html="$options.filters.truncate(job.description)"
              class="task-listing-text"
            ></p>
            <div class="task-tags">
              <span v-for="tag in job.tags" :key="tag.id">{{ tag.title }}</span>
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
              >Bid Now <i class="icon-material-outline-arrow-right-alt"></i
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
    <!-- Tasks Container / End -->
  </div>
</template>

<script>
import { getCustomJs } from "../helpers";
export default {
  props: ["tags", "value", "price"],
  data() {
    return {
      orderBy: "",
      filterPrice: [],
      filterTags: [],
      filterCats: [],
      showAlert: false,
      jobs: null,
    };
  },
  created() {
    if (this.$store.getters.user.accountType === "employer")
      this.$router.push("/404");
  },
  watch: {
    price: function (newPrice) {
      this.filterPrice = [...newPrice];
      this.getAllJobs();
    },
    tags: function (newTags) {
      this.filterTags = [];
      newTags.map((tag) => {
        this.filterTags.push(tag.key);
      });
      this.getAllJobs();
    },
    value: function (newCat) {
      this.filterCats = [];
      newCat.map((cat) => {
        this.filterCats.push(cat.id);
      });
      this.getAllJobs();
    },
    orderBy: function () {
      this.getAllJobs();
    },
  },
  methods: {
    getAllJobs() {
      this.showAlert = false;
      this.jobs = null;
      this.$store
        .dispatch("getAllJobs", {
          sortBy: this.orderBy,
          tags: this.filterTags,
          cats: this.filterCats,
          price: this.filterPrice,
          status: "notAssigned",
        })
        .then((res) => {
          this.jobs = res.data.results;
          if (this.jobs.length > 0) {
            this.showAlert = false;
          } else {
            this.showAlert = true;
          }
        });
    },
  },
  filters: {
    truncate: function (text) {
      if (text.length > 100) {
        return text.substring(0, 100) + "...";
      } else {
        return text;
      }
    },
  },
  mounted() {
    let data = this.$route.params.data;
    if (data) {
      if (data.tags) {
        data.tags.map((t) => this.tags.push(t));
      }
      if (data.cats) {
        this.$emit("update", data.cats);
      }
    }
    getCustomJs();
    this.getAllJobs();
  },
};
</script>

<style scoped>
.notification {
  margin-top: 30px;
}
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
