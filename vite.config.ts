import { type ConfigEnv, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import UnoCSS from "unocss/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
const pathSrc = path.resolve(__dirname, "src");
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        imports: [
          "vue",
          "vue-router",
          "pinia",
          "vue-i18n",
          {
            "element-plus": ["dayjs"],
          },
        ],
        resolvers: [
          ElementPlusResolver({ importStyle: "sass" }),
          IconsResolver({
            prefix: "Icon",
            enabledCollections: ["ep"],
          }),
        ],
        eslintrc: {
          enabled: false,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: false,
        },
        vueTemplate: true,
        dts: "src/types/auto-imports.d.ts",
        // dts: false,
      }),
      Components({
        resolvers: [
          ElementPlusResolver({ importStyle: "sass" }),
          IconsResolver({
            enabledCollections: ["ep"],
          }),
        ],
        dirs: ["src/components"],
        // dts: "src/types/components.d.ts",
        dts: false,
      }),
      UnoCSS(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
    ],
    //代理跨域
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT),
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
  };
});
