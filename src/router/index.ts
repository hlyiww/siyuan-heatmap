import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: readonly RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/heat-map",
    children: [
      {
        path: "/heat-map",
        component: () => import("@/components/HeatMap/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
