import { createRouter, createWebHashHistory } from "vue-router";
import { getRouteConfig, getMenuConfig } from "@/config/menu.js";
let modules = import.meta.glob("../views/Com/**/**.vue")
const routes = [
  {
    path: "/",
    redirect: "/test"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home.vue"),
    children: []
  },
  {
    path: "/AI_Human_Iframe",
    name: "AI_Human_Iframe",
    component: () => import("@/views/Com/AI_Human/AI_Human.vue"),
    children: []
  },
  {
    path: "/univerOpen",
    name: "univerOpen",
    component: () => import("@/views/Com/univer/univer.vue"),
    children: []
  },

];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const routeConfig = getRouteConfig();
console.log(routeConfig);
routeConfig.forEach(item => {
  router.addRoute("Home", item);
});
console.log(router.getRoutes());






export default router;
