<template>
  <div
    class="intro-banner"
    data-background-image="/assets/images/home-background.jpg"
  >
    <div class="container">
      <!-- Intro Headline -->
      <div class="row">
        <div class="col-md-12">
          <div class="banner-headline">
            <h3>
              <strong>Hire experts or be hired for any job, any time.</strong>
              <br />
              <span
                >Thousands of small businesses use
                <strong class="color">Hireo</strong> to turn their ideas into
                reality.</span
              >
            </h3>
          </div>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="row">
        <div class="col-md-12">
          <div class="intro-banner-search-form margin-top-95">
            <!-- Search Field -->
            <div class="intro-search-field">
              <label for="intro-keywords" class="field-title ripple-effect"
                >Where</label
              >
              <tags-input
                element-id="tags"
                :max="2"
                :allow-duplicates="false"
                :only-existing-tags="true"
                v-model="selectedTags"
                :existing-tags="tags"
                :typeahead="true"
              ></tags-input>
            </div>

            <!-- Search Field -->
            <div class="intro-search-field">
              <multiselect
                v-model="value"
                :options="categories"
                :multiple="true"
                :searchable="false"
                :close-on-select="false"
                :clear-on-select="false"
                :loading="gettingCat"
                placeholder="All Categories"
                label="name"
                track-by="name"
                :preselect-first="true"
              >
                <template
                  slot="selection"
                  slot-scope="{ values, search, isOpen }"
                  ><span
                    class="multiselect__single"
                    v-if="values.length &amp;&amp; !isOpen"
                    >{{ values.length }} options selected</span
                  ></template
                >
              </multiselect>
            </div>

            <!-- Search Field -->
            <!-- <div class="intro-search-field">
              <label for="intro-keywords" class="field-title ripple-effect"
                >What job you want?</label
              >
              <input
                id="intro-keywords"
                type="text"
                placeholder="Job Title or Keywords"
              />
            </div> -->

            <!-- Button -->
            <div class="intro-search-button">
              <button class="button ripple-effect" @click="search">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="row">
        <div class="col-md-12">
          <ul class="intro-stats margin-top-45 hide-under-992px">
            <li>
              <strong class="counter">1,586</strong>
              <span>Jobs Posted</span>
            </li>
            <li>
              <strong class="counter">3,543</strong>
              <span>Tasks Posted</span>
            </li>
            <li>
              <strong class="counter">1,232</strong>
              <span>Freelancers</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VoerroTagsInput from "@voerro/vue-tagsinput";
import "@voerro/vue-tagsinput/dist/style.css";
import Multiselect from "vue-multiselect/src/Multiselect";
export default {
  components: {
    "tags-input": VoerroTagsInput,
    Multiselect,
  },
  name: "Header_Employer",
  data() {
    return {
      gettingCat: true,
      value: [],
      options: [],
      categories: [],
      tags: [],
      selectedTags: [],
    };
  },
  methods: {
    search() {
      let data = {
        tags: this.selectedTags,
        cats: this.value,
      };
      this.$router.push({
        name: "BrowseJobs", //use name for router push
        params: { data },
      });
    },
  },
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
/* The input */
.tags-input {
  width: 100%;
  display: flex;
  align-items: center;
}

.tags-input input {
  width: 100%;
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
  width: 100%;
  padding: 0.5em 0.25em;
  background: #fff;
  border: 0px solid transparent;
  border-radius: 0.25em;
  border-color: #dbdbdb;
}

.tags-input-wrapper-default.active {
  width: 100%;
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
