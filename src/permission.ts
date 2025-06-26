// 鉴权文件
import router from "./router";
// @ts-ignore
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
nprogress.configure({ showSpinner: false });
import { useUserStoreHook } from "./store";
import { reqLogout } from "@/api/user";
import { GET_TOKEN } from "./utils/token";
// 全局前置守卫
router.beforeEach(async (to, from) => {
  nprogress.start();
  const userStoreHook = useUserStoreHook();
  let token = userStoreHook.token;
  let username = userStoreHook.username;
  let isAsyncRouteLoaded = false;
  if (token && GET_TOKEN() && !isAsyncRouteLoaded) {
    if (to.path == "/login") {
      return "/";
    } else {
      if (username) {
        return true;
      } else {
        try {
          await userStoreHook.getUserInfo();
          isAsyncRouteLoaded = true;
          return { ...to, replace: true };
        } catch (error) {
          // 路由过期或者token被修改
          await reqLogout();
          userStoreHook.token = "";
          userStoreHook.username = "";
          userStoreHook.avatar = "";
          isAsyncRouteLoaded = false;
          return { path: "/login" };
        }
      }
    }
  } else {
    if (to.path == "/login") {
      return true;
    } else {
      return { path: "/login" };
    }
  }
});

// 全局后置守卫
router.afterEach((to, from) => {
  document.title = `${to.meta.title}`;
  nprogress.done();
});
