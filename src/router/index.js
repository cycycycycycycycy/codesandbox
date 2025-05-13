import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home.vue"),
    children: []
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});




export default router;
