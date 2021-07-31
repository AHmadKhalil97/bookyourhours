<template>
  <div
    id="job-post-dialog"
    class="simple-dialog zoom-anim-dialog mfp-hide dialog-with-tabs"
  >
    <div class="job-post-form">
      <div class="popup-tab-content">
        <JobPostForm />
      </div>
    </div>
  </div>
</template>
<script>
import JobPostForm from "@/components/JobPostForm";
export default {
  name: "JobPostDialog",
  components: {
    JobPostForm,
  },
};
</script>
