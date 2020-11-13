import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// TODO: access control
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
    path: "/proposal-manage-list",
    name: "PropasalManageList",
    component: () => import("@/views/PropasalManageList.vue")
  },
  {
    path: "/proposal-detail/:id",
    name: "ProposalDetail",
    component: () => import("@/views/ProposalDetail.vue")
  },
  // {
  //   path: "/proposal-edit/:id",
  //   name: "ProposalEdit",
  //   component: () => import("@/views/ProposalEdit.vue")
  // },
  // {
  //   path: "/proposal-create",
  //   name: "ProposalCreate",
  //   component: () => import("@/views/ProposalCreate.vue")
  // },
  {
    path: "/proposal-admin",
    name: "ProposalAdminList",
    component: () => import("@/views/ProposalAdminList.vue")
  },
  {
    path: "/redirect",
    name: "Redirect",
    component: () => import("@/views/Redirect.vue")
  },
  {
    path: "*",
    redirect: {
      name: "Homepage"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
