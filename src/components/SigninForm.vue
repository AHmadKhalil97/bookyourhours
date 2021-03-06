<template>
  <div class="login-register-page">
    <!-- Welcome Text -->
    <div class="welcome-text">
      <h3>We're glad to see you again!</h3>
      <span v-if="['login', 'register'].includes($route.name)"
        >Don't have an account?
        <router-link to="/register">Sign Up!</router-link></span
      >
    </div>
    <div v-if="error.response.status" class="notification error closeable">
      <p>{{ error.response.message }}</p>
      <a
        class="close"
        @click="error.response.status = !error.response.status"
      ></a>
    </div>

    <!-- Form -->
    <form id="login-form">
      <small v-if="error.email.status" class="error">
        {{ error.email.message }}
      </small>
      <div class="input-with-icon-left">
        <i class="icon-material-baseline-mail-outline"></i>
        <input
          id="emailaddress"
          v-model.trim="email"
          type="email"
          class="input-text with-border"
          placeholder="Email Address"
          required
        />
      </div>
      <small v-if="error.password.status" class="error">
        {{ error.password.message }}
      </small>
      <div class="input-with-icon-both">
        <i class="icon-material-outline-lock"></i>
        <i
          :class="`icon-feather-eye${passwordShowing ? '-off' : ''}`"
          @click="showPasswordToggle"
        ></i>
        <input
          id="password"
          v-model.trim="password"
          :type="passwordShowing ? 'text' : 'password'"
          class="input-text with-border"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <a href="#" class="forgot-password">Forgot Password?</a>
    </form>

    <!-- Button -->
    <button
      class="button full-width button-sliding-icon ripple-effect margin-top-10"
      @click="userLogin"
    >
      <div v-if="isLoading" class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div v-else>
        Log In <i class="icon-material-outline-arrow-right-alt"></i>
      </div>
    </button>

    <!-- Social Login -->
    <div class="social-login-separator"><span>or</span></div>
    <div class="social-login-buttons">
      <button class="facebook-login ripple-effect">
        <i class="icon-brand-facebook-f"></i> Log In via Facebook
      </button>
      <button class="google-login ripple-effect">
        <i class="icon-brand-google-plus-g"></i> Log In via Google+
      </button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "SigninForm",
  data() {
    return {
      isLoading: false,
      email: null,
      password: null,
      passwordShowing: false,
      error: {
        email: {
          status: false,
          message: "",
        },
        password: {
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
    showPasswordToggle() {
      this.passwordShowing = !this.passwordShowing;
    },
    userLogin() {
      if (this.validateForm()) {
        this.isLoading = true;
        this.$store
          .dispatch("loginUser", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.email = null;
            this.password = null;
            this.isLoading = false;
            $(".mfp-close").click();
            this.$router.push({ name: "Dashboard" });
          })
          .catch((err) => {
            this.error.response.status = true;
            this.error.response.message = err.response.data.message
              ? err.response.data.message
              : "Something went wrong!";
            this.isLoading = false;
          });
      }
    },
    validateForm() {
      if (this.email && this.password) {
        if (!this.validEmail(this.email)) {
          this.error.email.status = true;
          this.error.email.message = "Email address is not valid!";
        }
        if (
          this.error.email.status === false &&
          this.error.password.status === false
        ) {
          return true;
        }
      }
      if (!this.email) {
        this.error.email.status = true;
        this.error.email.message = "Email address is required!";
      }
      if (!this.password) {
        this.error.password.status = true;
        this.error.password.message = "Password is required!";
      }
      setTimeout(() => {
        this.error.password.status = false;
        this.error.email.status = false;
      }, 5000);
    },
    validEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
  },
};
</script>

<style scoped>
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
</style>
