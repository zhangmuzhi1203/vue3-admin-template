import { type App } from "vue";
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: { title: "登录", hidden: true },
  },
  {
    path: "/",
    name: "layout",
    component: Layout,
    meta: {
      hidden: false,
      icon: "",
      title: "",
    },
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "首页",
          icon: "HomeFilled",
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/index.vue"),
    meta: { title: "404", hidden: true, icon: "" },
  },
];

// 异步路由
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/acl",
    component: Layout,
    name: "Acl",
    meta: {
      title: "权限管理",
      icon: "Lock",
    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        component: () => import("@/views/acl/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          icon: "User",
        },
      },
      {
        path: "/acl/role",
        component: () => import("@/views/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          icon: "UserFilled",
        },
      },
    ],
  },
];

//任意路由
export const anyRoute = {
  //任意路由
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  name: "Any",
  meta: {
    title: "任意路由",
    hidden: true,
    icon: "DataLine",
  },
};

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

//全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router);
}

// 导出路由
export default router;
