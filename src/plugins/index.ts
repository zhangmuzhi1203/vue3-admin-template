import type { App } from "vue";
import { setupStore } from "@/store";
import { setupI18n } from "@/lang";
import { setupRouter } from "@/router";
import { setupElIcons } from "@/plugins/icons";
import { isHasButton } from "@/directive/has";
export default {
  // install 是 Vue 插件的标准生命周期钩子函数。
  // 在 App<Element> 中的 Element 指的是 DOM 的元素类型，也就是浏览器中 HTMLElement 的一个泛型约束。
  // install() 函数的作用是在 Vue 应用初始化时，统一注册和配置各种插件、功能模块或全局资源，
  // 让主入口的 main.ts 保持整洁，并实现模块化、可维护的架构设计。
  install(app: App<Element>) {
    setupStore(app);
    setupI18n(app);
    setupRouter(app);
    setupElIcons(app);
    isHasButton(app);
  },
};
