<template>
  <div class="dashboard-content-container" data-simplebar>
    <div class="dashboard-content-inner">
      <!-- Dashboard Headline -->
      <div class="dashboard-headline">
        <h3>Settings</h3>

        <!-- Breadcrumbs -->
        <nav id="breadcrumbs" class="dark">
          <ul>
            <li>
              <router-link :to="{ name: 'Home' }">Home</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
            </li>
            <li>Settings</li>
          </ul>
        </nav>
      </div>

      <!-- Row -->
      <div class="row">
        <!-- Dashboard Box -->
        <div class="col-xl-12">
          <div class="dashboard-box margin-top-0">
            <!-- Headline -->
            <div class="headline">
              <h3>
                <i class="icon-material-outline-account-circle"></i> My Account
              </h3>
            </div>

            <div class="content with-padding padding-bottom-0">
              <div class="row">
                <div class="col-auto">
                  <div
                    class="avatar-wrapper"
                    data-tippy-placement="bottom"
                    title="Change Avatar"
                  >
                    <img
                      class="profile-pic"
                      :src="
                        pictures[0] ||
                        'https://ui-avatars.com/api/?name=' + user.name
                      "
                      alt=""
                    />
                    <div @click="uploadFiles" class="upload-button"></div>
                    <!-- <input
                      v-on:change="onFileChange"
                      class="file-upload"
                      type="file"
                      accept="image/*"
                    /> -->
                  </div>
                </div>

                <div class="col">
                  <div class="row">
                    <div class="col-xl-6">
                      <div class="submit-field">
                        <h5>Name</h5>
                        <input
                          type="text"
                          class="with-border"
                          v-model="user.name"
                        />
                      </div>
                    </div>

                    <!-- <div class="col-xl-6">
                      <div class="submit-field">
                        <h5>Last Name</h5>
                        <input type="text" class="with-border" value="Smith" />
                      </div>
                    </div> -->

                    <div class="col-xl-6">
                      <div class="submit-field">
                        <h5>Email</h5>
                        <input
                          disabled
                          type="text"
                          class="with-border"
                          v-model="user.email"
                        />
                      </div>
                    </div>
                    <!-- <div class="col-xl-6">
                      <div class="submit-field">
                        <h5>Nationality</h5>
                        <select
                          class="selectpicker with-border"
                          data-size="7"
                          v-model="user.nationality"
                          title="Select Job Type"
                          data-live-search="true"
                        >
                          <option
                            v-bind:key="country.value"
                            v-for="country in countries"
                            :value="country.value"
                          >
                            {{ country.label }}
                          </option>
                        </select>
                      </div>
                    </div> -->

                    <div class="col-xl-6">
                      <div class="submit-field">
                        <h5>Phone #</h5>
                        <input
                          type="text"
                          class="with-border"
                          v-model="user.phoneNumber"
                        />
                      </div>
                    </div>

                    <!-- <div class="col-xl-6">
                      <div class="submit-field">
                        <h5>Account Type</h5>
                        <div class="account-type">
                          <div>
                            <input
                              type="radio"
                              name="account-type-radio"
                              id="freelancer"
                              value="freelancer"
                              v-model="accountType"
                              class="account-type-radio"
                              :checked="accountType === 'freelancer'"
                            />
                            <label for="freelancer" class="ripple-effect-dark"
                              ><i
                                class="icon-material-outline-account-circle"
                              ></i>
                              Freelancer</label
                            >
                          </div>

                          <div>
                            <input
                              type="radio"
                              name="account-type-radio"
                              id="employer"
                              value="employer"
                              v-model="accountType"
                              :checked="accountType === 'employer'"
                              class="account-type-radio"
                            />
                            <label for="employer" class="ripple-effect-dark"
                              ><i
                                class="icon-material-outline-business-center"
                              ></i>
                              Employer</label
                            >
                          </div>
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dashboard Box -->
        <div class="col-xl-12" v-if="accountType === 'freelancer'">
          <div class="dashboard-box">
            <!-- Headline -->
            <div class="headline">
              <h3><i class="icon-material-outline-face"></i> My Profile</h3>
            </div>

            <div class="content">
              <ul class="fields-ul">
                <li v-if="accountType == 'freelancer'">
                  <div class="row">
                    <!-- <div class="col-xl-6"> -->
                    <!-- <div class="submit-field"> -->
                    <!-- <div class="bidding-widget"> -->
                    <!-- Headline -->
                    <!-- <span class="bidding-detail" -->
                    <!-- >Set your <strong>minimal hourly rate</strong> in -->
                    <!-- <strong>$</strong></span -->
                    <!-- > -->

                    <!-- Slider -->
                    <!-- <div class="bidding-value margin-bottom-10"> -->
                    <!-- $<span id="biddingVal"></span> -->
                    <!-- <Slider :max="200" v-model="rate" /> -->
                    <!-- </div> -->
                    <!-- </div> -->
                    <!-- </div> -->
                    <!-- </div> -->

                    <div class="col-xl-6">
                      <div class="submit-field">
                        <h5>
                          Skills
                          <i
                            class="help-icon"
                            data-tippy-placement="right"
                            title="Add up to 10 skills"
                          ></i>
                        </h5>

                        <!-- Skills List -->
                        <!-- <div class="keywords-container">
                          <div class="keyword-input-container">
                            <input
                              type="text"
                              class="keyword-input with-border"
                              placeholder="e.g. Angular, Laravel"
                            />
                            <button class="keyword-input-button ripple-effect">
                              <i class="icon-material-outline-add"></i>
                            </button>
                          </div>
                          <div class="keywords-list">
                            <span class="keyword"
                              ><span class="keyword-remove"></span
                              ><span class="keyword-text">Angular</span></span
                            >
                            <span class="keyword"
                              ><span class="keyword-remove"></span
                              ><span class="keyword-text">Vue JS</span></span
                            >
                            <span class="keyword"
                              ><span class="keyword-remove"></span
                              ><span class="keyword-text">iOS</span></span
                            >
                            <span class="keyword"
                              ><span class="keyword-remove"></span
                              ><span class="keyword-text">Android</span></span
                            >
                            <span class="keyword"
                              ><span class="keyword-remove"></span
                              ><span class="keyword-text">Laravel</span></span
                            >
                          </div>
                          <div class="clearfix"></div>
                        </div> -->
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
                        </div>
                      </div>
                    </div>

                    <!-- <div class="col-xl-4">
                      <div class="submit-field">
                        <h5>Attachments</h5>

                        <div
                          class="attachments-container margin-top-0 margin-bottom-0"
                        >
                          <div class="attachment-box ripple-effect">
                            <span>Cover Letter</span>
                            <i>PDF</i>
                            <button
                              class="remove-attachment"
                              data-tippy-placement="top"
                              title="Remove"
                            ></button>
                          </div>
                          <div class="attachment-box ripple-effect">
                            <span>Contract</span>
                            <i>DOCX</i>
                            <button
                              class="remove-attachment"
                              data-tippy-placement="top"
                              title="Remove"
                            ></button>
                          </div>
                        </div>
                        <div class="clearfix"></div>

                        <div class="uploadButton margin-top-0">
                          <input
                            class="uploadButton-input"
                            type="file"
                            accept="image/*, application/pdf"
                            id="upload"
                            multiple
                          />
                          <label
                            class="uploadButton-button ripple-effect"
                            for="upload"
                            >Upload Files</label
                          >
                          <span class="uploadButton-file-name"
                            >Maximum file size: 10 MB</span
                          >
                        </div>
                      </div>
                    </div> -->
                  </div>
                </li>
                <li>
                  <div class="row">
                    <div class="col-xl-6">
                      <div class="submit-field">
                        <h5>Tagline</h5>
                        <input
                          v-model="user.tagLine"
                          type="text"
                          class="with-border"
                        />
                      </div>
                    </div>

                    <!-- <div class="col-xl-6">
                      <div class="submit-field">
                        <h5>Nationality</h5>
                        <select
                          class="selectpicker with-border"
                          data-size="7"
                          v-model="user.nationality"
                          title="Select Job Type"
                          data-live-search="true"
                        >
                          <option
                            v-bind:key="country.value"
                            v-for="country in countries"
                            :value="country.value"
                          >
                            {{ country.label }}
                          </option>
                        </select>
                      </div>
                    </div> -->

                    <div class="col-xl-12">
                      <div class="submit-field">
                        <h5>Introduce Yourself</h5>
                        <textarea cols="30" rows="5" class="with-border">
Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</textarea
                        >
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Dashboard Box -->
        <!-- <div class="col-xl-12">
          <div id="test1" class="dashboard-box">
            <div class="headline">
              <h3>
                <i class="icon-material-outline-lock"></i> Password & Security
              </h3>
            </div>

            <div class="content with-padding">
              <div class="row">
                <div class="col-xl-4">
                  <div class="submit-field">
                    <h5>Current Password</h5>
                    <input type="password" class="with-border" />
                  </div>
                </div>

                <div class="col-xl-4">
                  <div class="submit-field">
                    <h5>New Password</h5>
                    <input type="password" class="with-border" />
                  </div>
                </div>

                <div class="col-xl-4">
                  <div class="submit-field">
                    <h5>Repeat New Password</h5>
                    <input type="password" class="with-border" />
                  </div>
                </div>

                <div class="col-xl-12">
                  <div class="checkbox">
                    <input type="checkbox" id="two-step" checked />
                    <label for="two-step"
                      ><span class="checkbox-icon"></span> Enable Two-Step
                      Verification via Email</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <!-- Button -->
        <div class="col-xl-12">
          <button
            @click="updateProfile"
            class="button ripple-effect big margin-top-30"
          >
            Save Changes
          </button>
        </div>
      </div>
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
  <!-- <tags-input
          placeholder="Add a skill"
          element-id="tags"
          :limit="5"
          :allow-duplicates="false"
          v-model="selectedTags"
          :existing-tags="tags"
          :typeahead="true"
        ></tags-input> -->
  <!-- <Slider :max="1000" v-model="rate" /> -->
  <!-- img
                      class="profile-pic"
                      :src="'https://ui-avatars.com/api/?name=' + user.name"
                      alt=""
                    /> -->
</template>
<script>
// import Slider from "@vueform/slider/dist/slider.vue2.js";
import VoerroTagsInput from "@voerro/vue-tagsinput";
import "@voerro/vue-tagsinput/dist/style.css";
import { countries } from "../utils";
import { getCustomJs, avatarSwitcher } from "../helpers";

export default {
  components: {
    // Slider,
    "tags-input": VoerroTagsInput,
  },
  data() {
    return {
      isLoading: false,
      rate: 0,
      user: {},
      tags: [],
      countries: [...countries],
      selectedTags: [],
      accountType: "",
      pictures: [],
    };
  },
  computed: {
    isDisabled() {
      return true;
    },
  },
  methods: {
    updateProfile() {
      this.isLoading = true;
      let filterTags = [];
      this.selectedTags.map((tag) => {
        filterTags.push(tag.value);
      });
      this.$store
        .dispatch("updateProfile", {
          id: this.user.id,
          name: this.user.name,
          introduction: this.user.introduction,
          tagLine: this.user.tagLine,
          nationality: this.user.nationality,
          hourlyRate: this.rate,
          skills: filterTags,
          pictures: this.pictures,
          phoneNumber: this.user.phoneNumber,
          accountType: this.user.accountType,
        })
        .then(() => {
          this.isLoading = false;
          this.$toast.open({
            message: "Profile updated successfully!",
            type: "success",
            duration: 2000,
            dismissible: true,
          });
          setTimeout(() => {
            this.user = {};
            this.user = this.$store.getters.user;
          }, 5000);
        });
    },
    getUser() {
      this.user = this.$store.getters.user;
      this.accountType = this.user.accountType;
      this.pictures = this.user.pictures;
      if (this.user.skills.length > 0) {
        this.user.skills.map((skill) => {
          this.$store.dispatch("getTagById", skill.id).then((res) => {
            let refSkill = {
              key: res.data.id,
              value: res.data.title,
            };
            this.selectedTags.unshift(refSkill);
          });
        });
      }
      this.rate = this.user.hourlyRate ? this.user.hourlyRate : 15;
      this.$store.dispatch("getAllTags").then((res) => {
        res.data.map((tag) => {
          let refactorTag = {
            key: tag.id,
            value: tag.title,
          };
          this.tags.push(refactorTag);
        });
      });
    },
    uploadFiles() {
      window.cloudinary
        .openUploadWidget(
          {
            cloud_name: "dnmge13ki",
            upload_preset: "qutpmtl3",
            multiple: false,
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              this.pictures.push(result.info.url);
            }
          }
        )
        .open();
    },
  },
  mounted() {
    this.getUser();
    getCustomJs();
    avatarSwitcher();
  },
};
</script>

<style>
@import "~@vueform/slider/themes/default.css";

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
