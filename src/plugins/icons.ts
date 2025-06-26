import type { App } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 注册所有图标
export function setupElIcons(app: App<Element>) {
  // 遍历 ElementPlusIconsVue 中的所有图标组件，
  // 例如：[ElUser, ElSearch, ElEdit, ...]，然后使用 app.component() 全局注册每一个图标。
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}
