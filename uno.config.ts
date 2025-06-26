import {
  // UnoCSS 的配置函数，用于定义和导出配置。
  defineConfig,
  // 允许你在 HTML 标签上使用属性风格（如 <div text="center white"/>）来使用样式。
  presetAttributify,
  // 内置图标库预设，可以用类似 i-carbon-add 的类名来使用图标。
  presetIcons,
  // 提供更优雅的排版样式，例如文章内容排版。
  presetTypography,
  // 用于引入 Web 字体，比如 Google Fonts。
  presetWebFonts,
  //  UnoCSS 的类 Tailwind CSS 风格预设（支持如 flex、text-center 等类名）。即组件上写样式类名
  presetWind3,
  // 支持 @apply、@screen 等指令式写法。
  transformerDirectives,
  // 持如 hover:(bg-red text-white) 这种变体分组写法。
  transformerVariantGroup,
} from "unocss";
// 使用 defineConfig() 封装配置，提高类型提示和编辑器智能补全。
export default defineConfig({
  // 定义快捷类
  shortcuts: [
    // 快捷方式-将多个规则组合成一个简写。
    ["flex-center", "flex items-center justify-center"],
  ],
  theme: {
    // 主题 - 定义主题变量。
    colors: {},
  },
  // 添加 UnoCSS 预设
  presets: [
    // 提供类 Tailwind CSS 的语法支持。没有这个就没法在组件上写类目生成样式
    presetWind3(),
    // 支持属性风格写法（如 text="center gray-500"）。
    presetAttributify(),
    // 支持使用图标类名加载图标组件。
    presetIcons(),
    // 提供优秀的文字排版样式。
    presetTypography(),
    // 配置要加载的网络字体（目前是占位状态，未具体设置）。
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  // 配置转换器
  transformers: [
    // 持如 @apply bg-red text-white 等指令式语法。
    transformerDirectives(),
    // 持如 hover:(bg-red-500 text-white) 这种变体分组写法，提高可读性。
    transformerVariantGroup(),
  ],
});
