import type { App } from "vue";
import { createI18n } from "vue-i18n";
import { useAppStoreHook } from "@/store";
// 本地语言包
import enLocale from "./package/en";
import zhCnLocale from "./package/zh-cn";

const appStore = useAppStoreHook();

// 定义多语言对象，键为语言标识（locale code），值为对应的翻译词典对象。
// vue-i18n 会根据当前设置的 locale 选择对应语言。
const messages = {
  "zh-cn": {
    ...zhCnLocale,
  },
  en: {
    ...enLocale,
  },
};

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 风格，而不是 Options API。
  locale: appStore.language, // 设置默认语言（如 'zh-cn'）。
  messages: messages, // 各语言翻译内容。
  globalInjection: true, //  允许在模板中使用 $t() 等函数而无需手动注入。
});

// 全局注册 i18n
export function setupI18n(app: App<Element>) {
  app.use(i18n);
}

export default i18n;
