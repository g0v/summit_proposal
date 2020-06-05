import Vue from "vue";
import VueRouter from "vue-router";
import metaData from "@/utils/metaData.js";

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
  {
    path: "/proposal-edit/:id",
    name: "ProposalEdit",
    component: () => import("@/views/ProposalEdit.vue")
  },
  {
    path: "/proposal-create",
    name: "ProposalCreate",
    component: () => import("@/views/ProposalCreate.vue")
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

router.beforeEach(function(to, from, next) {
  document.title = metaData[to.name].title;

  let head = document.querySelector("head");
  let oldDescriptionMeta = document.querySelector("meta[name=description]");
  if (oldDescriptionMeta) {
    oldDescriptionMeta.remove();
  } else {
    let newOldDescriptionMeta = document.createElement("meta");
    newOldDescriptionMeta.setAttribute("name", "description");
    newOldDescriptionMeta.setAttribute(
      "content",
      metaData[to.name].description
    );
    head.appendChild(newOldDescriptionMeta);
  }

  // 社群系列
  metaData[to.name].propertyMeta.forEach(meta => {
    let oldMeta = document.querySelector(`meta[property='${meta.property}']`);
    if (oldMeta) {
      oldMeta.remove();
    } else {
      let createMeta = document.createElement("meta");
      createMeta.setAttribute("property", `${meta.property}`);
      createMeta.setAttribute("content", `${meta.content}`);
      head.appendChild(createMeta);
    }
  });
  next();
});

export default router;
