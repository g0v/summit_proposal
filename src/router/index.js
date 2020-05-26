import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: () => import("@/views/Homepage.vue")
  },
  {
    path: "/proposal-list",
    name: "PropasalList",
    component: () => import("@/views/PropasalList.vue")
  },
  {
    path: "/proposal-detail",
    name: "ProposalDetail",
    component: () => import("@/views/ProposalDetail.vue")
  },
  {
    path: "/proposal-edit",
    name: "ProposalEdit",
    component: () => import("@/views/ProposalEdit.vue")
  },
  {
    path: "/redirect",
    name: "Redirect",
    component: () => import("@/views/Redirect.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
