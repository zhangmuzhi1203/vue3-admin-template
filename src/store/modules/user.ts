import { store } from "@/store";
import { GET_TOKEN } from "@/utils/token";
import type { RouteRecordRaw } from "vue-router";
import { reqUserInfo } from "@/api/user";
import { constantRoutes, asyncRoutes, anyRoute } from "@/router";
//引入深拷贝方法
//@ts-ignore
import cloneDeep from "lodash/cloneDeep";
import router from "@/router";
export const useUserStore = defineStore("user", () => {
  const token = ref<string>("");
  const routeList = ref<RouteRecordRaw[]>([]);
  routeList.value = constantRoutes;
  token.value = GET_TOKEN();
  const avatar = ref<string>("");
  const username = ref<string>("");
  const buttons = ref<string[]>([]);
  //用于过滤当前用户需要展示的异步路由
  function filterAsyncRoute(asnycRoute: any, routes: any) {
    return asnycRoute.filter((item: any) => {
      if (routes.includes(item.name)) {
        if (item.children && item.children.length > 0) {
          //硅谷333账号:product\trademark\attr\sku
          item.children = filterAsyncRoute(item.children, routes);
        }
        return true;
      }
    });
  }
  const getUserInfo = async () => {
    const result = await reqUserInfo();
    avatar.value = result.data.avatar;
    username.value = result.data.name;
    //计算当前用户需要展示的异步路由
    let userAsyncRoute = filterAsyncRoute(
      cloneDeep(asyncRoutes),
      result.data.routes
    );
    routeList.value = [...constantRoutes, ...userAsyncRoute, anyRoute];
    //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
    [...userAsyncRoute, anyRoute].forEach((route: any) => {
      router.addRoute(route);
    });
  };
  return {
    token, //  返回一个对象，token 作为属性
    routeList,
    avatar,
    username,
    buttons,
    getUserInfo,
  };
});

export function useUserStoreHook() {
  return useUserStore(store);
}
