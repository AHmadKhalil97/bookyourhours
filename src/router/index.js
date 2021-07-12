import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/job/:id",
        name: "Job",
        component: () => import("@/views/Job.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/dashboard",
    component: () => import("@/layouts/DashboardLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
      // {
      //   path: "/post-a-job",
      //   name: "JobPost",
      //   component: () => import("@/views/JobPost.vue")
      // },
      {
        path: "/jobs",
        name: "Jobs",
        component: () => import("@/views/ManageJobs.vue"),
      },
      {
        params: true,
        path: "/job-bids/:jobId",
        name: "JobBids",
        component: () => import("@/views/JobBids.vue"),
      },
      {
        path: "/bids",
        name: "Bids",
        component: () => import("@/views/JobBids.vue"),
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/Profile.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/browse-jobs",
    component: () => import("@/layouts/BrowseLayout.vue"),
    children: [
      {
        path: "/browse-jobs",
        name: "BrowseJobs",
        component: () => import("@/views/BrowseJobs.vue"),
      },
    ],
  },

  {
    path: "/logout",
    name: "Logout",
    component: () => import("@/views/Logout.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkExactActiveClass: "current",
  routes,
});

export default router;
