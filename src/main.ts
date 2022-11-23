import { createApp } from "vue";
import "./style.css";
import "uno.css";
import App from "./App.vue";
import VueCalendarHeatmap from "vue3-calendar-heatmap";
import router from "@/router/index";

const app = createApp(App);
app.use(router).use(VueCalendarHeatmap).mount("#app");
