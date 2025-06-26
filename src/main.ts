import { createApp } from "vue";
import "virtual:uno.css";
import "virtual:svg-icons-register";
import "@/styles/index.scss";
import "./permission";
import setupPlugins from "./plugins";
import App from "./App.vue";
const app = createApp(App);
// 注册插件
app.use(setupPlugins);

app.mount("#app");
