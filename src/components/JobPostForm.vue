<template>
  <div class="job-post-form">
    <!-- Welcome Text -->
    <div class="welcome-text">
      <h3>We're glad to see you again!</h3>
      <span v-if="['login', 'register'].includes($route.name)">
        Don't have an account?
        <router-link to="/register">Sign Up!</router-link>
      </span>
    </div>
    <!-- Row -->
    <div class="row">
      <!-- Dashboard Box -->
      <div class="col-xl-12">
        <div class="dashboard-box margin-top-0">
          <!-- Headline -->
          <div class="headline">
            <h3>
              <i class="icon-feather-folder-plus"></i>
              Job Submission Form
            </h3>
          </div>

          <div class="content with-padding padding-bottom-10">
            <div class="row">
              <div class="col-xl-4">
                <div class="submit-field">
                  <h5>Job Title</h5>
                  <input v-model="title" type="text" class="with-border" />
                  <small v-if="error.title.status" class="error">
                    {{ error.title.message }}
                  </small>
                </div>
              </div>

              <div class="col-xl-4">
                <div class="submit-field">
                  <h5>Category</h5>
                  <multiselect
                    v-model="category"
                    deselect-label="Can't remove this value"
                    track-by="name"
                    label="name"
                    :close-on-select="true"
                    placeholder="All Categories"
                    :options="categories"
                    :searchable="false"
                    :allow-empty="false"
                    :loading="gettingCat"
                  >
                    <template slot="singleLabel" slot-scope="{ option }">{{
                      option.name
                    }}</template>
                  </multiselect>
                  <small v-if="error.category.status" class="error">
                    {{ error.category.message }}
                  </small>
                </div>
              </div>

              <div class="col-xl-4">
                <div class="submit-field">
                  <h5>Salary</h5>
                  <div class="row">
                    <div class="col">
                      <div class="input-with-icon">
                        <input
                          v-model="price"
                          class="with-border"
                          type="text"
                          placeholder="Price"
                        />
                        <i class="currency">USD</i>
                      </div>
                      <small v-if="error.price.status" class="error">
                        {{ error.price.message }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-6">
                <div class="submit-field">
                  <h5>
                    Tags
                    <i
                      class="help-icon"
                      data-tippy-placement="right"
                      title="Maximum of 5 tags"
                    ></i>
                  </h5>
                  <div class="keywords-container">
                    <div class="keyword-input-container">
                      <tags-input
                        placeholder="Add a skill"
                        element-id="tags"
                        :limit="5"
                        :allow-duplicates="false"
                        v-model="selectedTags"
                        :existing-tags="tags"
                        :typeahead="true"
                      ></tags-input>
                    </div>
                    <small v-if="error.tags.status" class="error">
                      {{ error.tags.message }}
                    </small>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="submit-field">
                  <h5>Days Required</h5>
                  <input
                    v-model="time"
                    type="number"
                    min="1"
                    class="with-border"
                    placeholder="no. of days"
                  />
                  <small v-if="error.time.status" class="error">
                    {{ error.time.message }}
                  </small>
                </div>
              </div>
              <!-- <div class="col-xl-12">
                <div class="submit-field">
                  <h5>Job Type</h5>
                  <div class="feedback-yes-no margin-top-0">
                    <div class="radio">
                      <input
                        v-model="jobType"
                        id="radio-1"
                        value="fixed"
                        name="radio"
                        type="radio"
                        checked
                      />
                      <label for="radio-1">
                        <span class="radio-label"></span>
                        Fixed Price Job
                      </label>
                    </div>

                    <div class="radio">
                      <input
                        v-model="jobType"
                        value="hourly"
                        id="radio-2"
                        name="radio"
                        type="radio"
                      />
                      <label for="radio-2"
                        ><span class="radio-label"></span> Hourly Job</label
                      >
                    </div>
                  </div>
                  <small v-if="error.jobType.status" class="error">
                    {{ error.jobType.message }}
                  </small>
                </div>
              </div> -->
              <div class="col-xl-12">
                <div class="submit-field">
                  <h5>Job Description</h5>
                  <textarea
                    v-model="description"
                    cols="30"
                    rows="5"
                    class="with-border"
                  ></textarea>
                  <small v-if="error.description.status" class="error">
                    {{ error.description.message }}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="error.response.status" class="notification error closeable">
        <p>{{ error.response.message }}</p>
        <a
          class="close"
          @click="error.response.status = !error.response.status"
        ></a>
      </div>
      <div class="col-xl-12">
        <button @click="submit" class="button ripple-effect big margin-top-30">
          <div v-if="isLoading" class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div v-else>
            <i
              :class="job && job.id ? 'icon-feather-save' : 'icon-feather-plus'"
            ></i>
            {{ job && job.id ? "Update Job" : "Post a Job" }}
          </div>
        </button>
      </div>
    </div>
    <!-- Row / End -->
  </div>
</template>

<script>
import Multiselect from "vue-multiselect/src/Multiselect";
import VoerroTagsInput from "@voerro/vue-tagsinput";
import "@voerro/vue-tagsinput/dist/style.css";
import { getCustomJs } from "../helpers";

export default {
  components: {
    "tags-input": VoerroTagsInput,
    Multiselect,
  },
  name: "JobPost",
  mounted() {
    this.$store.dispatch("getAllCategories").then((res) => {
      this.gettingCat = false;
      res.data.map((cat) => {
        this.categories.push({ name: cat.title, id: cat.id });
      });
    });
    this.$store.dispatch("getAllTags").then((res) => {
      res.data.map((tag) => {
        let refactorTag = {
          key: tag.id,
          value: tag.title,
        };
        this.tags.push(refactorTag);
      });
    });
    getCustomJs();
  },
  data() {
    return {
      isLoading: false,
      title: this.job && this.job.tile,
      description: null,
      price: null,
      currency: "USD",
      tags: [],
      categories: [],
      selectedTags: [],
      selectedQuestions: [],
      category: "",
      questions: [],
      time: null,
      gettingCat: true,
      error: {
        category: {
          status: false,
          message: "",
        },
        title: {
          status: false,
          message: "",
        },
        description: {
          status: false,
          message: "",
        },
        price: {
          status: false,
          message: "",
        },
        tags: {
          status: false,
          message: "",
        },
        questions: {
          status: false,
          message: "",
        },
        time: {
          status: false,
          message: "",
        },
        selectedTags: {
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
  methods: {
    submit() {
      this.job?.id ? this.updateJob() : this.postJob();
    },
    postJob() {
      if (this.validateForm()) {
        this.isLoading = true;
        this.$store
          .dispatch("postJob", {
            title: this.title,
            description: this.description,
            price: Number.parseInt(this.price),
            currency: "USD",
            jobType: "fixed",
            tags: this.selectedTags.map((tag) => tag.value),
            questions: this.selectedQuestions.map((quest) => quest.value),
            category: this.category.id,
            time: this.time,
          })
          .then(() => {
            this.popupClose();
            this.$store.dispatch("getAllJobs", {
              user: JSON.parse(localStorage.getItem("user")).id,
            });
            this.$toast.open({
              message: "Job posted successfully!",
              type: "success",
              duration: 2000,
              dismissible: true,
            });
            this.title = null;
            this.category = null;
            this.description = null;
            this.price = null;
            this.selectedQuestions = [];
            this.selectedTags = [];
            this.time = null;
            this.isLoading = false;
          })
          .catch((err) => {
            this.error.response.status = true;
            this.error.response.message = err.response.data.message
              ? err.response.data.message
              : "Something went wrong!";
            this.isLoading = false;

            setTimeout(() => {
              this.error.response.status = false;
              this.error.response.message = "";
            }, 3000);
          });
      }
    },
    updateJob() {
      if (this.validateForm()) {
        this.isLoading = true;
        this.$store
          .dispatch("editJob", {
            id: this.job.id,
            data: {
              title: this.title,
              description: this.description,
              price: Number.parseInt(this.price),
              currency: "USD",
              jobType: "fixed",
              tags: this.selectedTags.map((tag) => tag.value),
              questions: this.selectedQuestions.map((quest) => quest.value),
              category: this.category.id,
              time: this.time,
            },
          })
          .then(() => {
            this.popupClose();
            this.$store.dispatch("getAllJobs", {
              user: JSON.parse(localStorage.getItem("user")).id,
            });
            this.$toast.open({
              message: "Job updated successfully!",
              type: "success",
              duration: 2000,
              dismissible: true,
            });
            this.title = null;
            this.category = null;
            this.description = null;
            this.price = null;
            this.selectedQuestions = [];
            this.selectedTags = [];
            this.time = null;
            this.isLoading = false;
          })
          .catch((err) => {
            this.error.response.status = true;
            this.error.response.message = err.response.data.message
              ? err.response.data.message
              : "Something went wrong!";
            this.isLoading = false;

            setTimeout(() => {
              this.error.response.status = false;
              this.error.response.message = "";
            }, 3000);
          });
      }
    },
    validateForm() {
      if (
        this.title &&
        this.description &&
        this.price &&
        this.selectedTags.length !== 0 &&
        this.category &&
        this.time
      ) {
        this.error.category.status = false;
        this.error.title.status = false;
        this.error.description.status = false;
        this.error.price.status = false;
        this.error.selectedTags.status = false;
        this.error.time.status = false;
        return true;
      }
      if (!this.title) {
        this.error.title.status = true;
        this.error.title.message = "Title is required!";
      }
      if (!this.description) {
        this.error.description.status = true;
        this.error.description.message = "Description is required!";
      }
      if (!this.price) {
        this.error.price.status = true;
        this.error.price.message = "Price is required!";
      }
      if (this.selectedTags.length === 0) {
        this.error.tags.status = true;
        this.error.tags.message = "Tags is required!";
      }
      if (!this.time) {
        this.error.time.status = true;
        this.error.time.message = "Time period is required!";
      }
      if (!this.category) {
        this.error.category.status = true;
        this.error.category.message = "Category is required!";
      }
      setTimeout(() => {
        this.error.title.status = false;
        this.error.category.status = false;
        this.error.description.status = false;
        this.error.price.status = false;
        this.error.selectedTags.status = false;
        this.error.time.status = false;
      }, 5000);
    },
    popupClose() {
      document.querySelector("button.mfp-close").click();
    },
  },
  computed: {
    job() {
      return this.$store.state.job;
    },
  },
  watch: {
    job: function (val) {
      this.title = val?.title || null;
      this.description = val?.description || null;
      this.price = val?.price || null;
      this.currency = val?.currency || "USD";
      this.selectedTags = (val?.tags || []).map((tag) => {
        return {
          key: tag.id,
          value: tag.title,
        };
      });
      // this.questions = this.job.questions;
      this.category = val?.category
        ? {
            id: val.category.id,
            name: val.category.title,
          }
        : "";
      this.time = val?.time || null;
    },
  },
};
</script>

<style>
.multiselect__spinner:before,
.multiselect__spinner:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-color: #2a41e8 transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}
.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: #2a41e8;
  line-height: 1;
  background: rgba(42, 65, 232, 0.07);
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
.multiselect__tag-icon:after {
  content: "×";
  color: #2a41e8;
  font-size: 14px;
}
.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: #2a41e8;
}
.multiselect__option--highlight {
  background: #2a41e8;
  outline: none;
  color: white;
}
.multiselect__option--highlight:after {
  content: attr(data-select);
  background: #2a41e8;
  color: white;
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
/* The input */
.tags-input {
  display: flex;
  align-items: center;
  padding: 0 !important;
}

.tags-input input {
  min-width: 350px;
  background: transparent;
  border: none;
}

.tags-input input:focus {
  outline: none;
}

.tags-input input[type="text"] {
  color: #495057;
}

.tags-input-wrapper-default {
  padding: 0.5em 0.25em;
  background: #fff;
  border: 0px solid transparent;
  border-radius: 0.25em;
  border-color: #dbdbdb;
}

.tags-input-wrapper-default.active {
  border: 1px solid #8bbafe;
  box-shadow: 0 0 0 0.2em rgba(13, 110, 253, 0.25);
  outline: 0 none;
}

/* The tag badges & the remove icon */
.tags-input span {
  margin-right: 0.5em;
  margin-bottom: 0.5em;
}

.tags-input-remove {
  cursor: pointer;
  position: absolute;
  display: inline-block;
  right: 0.3em;
  top: 0.3em;
  padding: 0.5em;
  overflow: hidden;
}

.tags-input-remove:focus {
  outline: none;
}

.tags-input-remove:before,
.tags-input-remove:after {
  content: "";
  position: absolute;
  width: 75%;
  left: 0.15em;
  background: #5dc282;

  height: 2px;
  margin-top: -1px;
}

.tags-input-remove:before {
  transform: rotate(45deg);
}
.tags-input-remove:after {
  transform: rotate(-45deg);
}

/* Tag badge styles */
.tags-input-badge {
  position: relative;
  display: inline-block;
  padding: 0.25em 0.4em;
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25em;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tags-input-badge-pill {
  padding: 1rem;
  border-radius: 3px;
}
.tags-input-badge-selected-default {
  color: #2a41e8;
  background-color: rgba(42, 65, 232, 0.07);
}
.tags-input-remove:before,
.tags-input-remove:after {
  content: "";
  position: absolute;
  width: 75%;
  left: 0.15em;
  background: #2a41e8;

  height: 2px;
  margin-top: -1px;
}

/* Typeahead */
.typeahead-hide-btn {
  color: #999 !important;
  font-style: italic;
}

/* Typeahead - badges */
.typeahead-badges > span {
  margin-top: 0.5em;
}

.typeahead-badges > span {
  cursor: pointer;
  padding: 5px;
  margin-right: 0.3em;
}

/* Typeahead - dropdown */
.typeahead-dropdown {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  z-index: 1000;
}

.typeahead-dropdown li {
  padding: 0.25em 1em;
  cursor: pointer;
}

/* Typeahead elements style/theme */
.tags-input-typeahead-item-default {
  color: #2a41e8;
  background-color: rgba(42, 65, 232, 0.07) !important;
}

.tags-input-typeahead-item-highlighted-default {
  color: #fff;
  background-color: #2a41e8;
}
</style>
