import "@fortawesome/fontawesome-free/scss/brands.scss";
import "@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "@fortawesome/fontawesome-free/scss/regular.scss";
import "@fortawesome/fontawesome-free/scss/solid.scss";
import "@fortawesome/fontawesome-free/scss/v4-shims.scss";
import { Vue3ProgressPlugin } from "@marcoschulte/vue3-progress";
import "@marcoschulte/vue3-progress/dist/index.css";
import "bootstrap";
import mitt from "mitt";
import { createPinia } from "pinia";
import { createApp } from "vue";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
// add bootstrap icon
import "bootstrap-icons/font/bootstrap-icons.css";

import "./scss/vue.scss";

import App from "./App.vue";
import router from "./router";

import Panel from "@/components/bootstrap/Panel.vue";
import PanelBody from "@/components/bootstrap/PanelBody.vue";
import PanelFooter from "@/components/bootstrap/PanelFooter.vue";
import PanelHeader from "@/components/bootstrap/PanelHeader.vue";
import PanelTitle from "@/components/bootstrap/PanelTitle.vue";
import PanelToolbar from "@/components/bootstrap/PanelToolbar.vue";

import VCalendar from "v-calendar";
import "v-calendar/dist/style.css";

//store auth
import { userAuthStore } from "./stores/app-auth";

const emitter = mitt();
const app = createApp(App);

app.component("Panel", Panel);
app.component("PanelBody", PanelBody);
app.component("PanelHeader", PanelHeader);
app.component("PanelFooter", PanelFooter);
app.component("PanelToolbar", PanelToolbar);
app.component("PanelTitle", PanelTitle);

app.use(createPinia());

const authStore = userAuthStore();
//init the auth user,
authStore.setUser();

app.use(router);
app.use(Vue3ProgressPlugin);
app.use(PerfectScrollbar);
app.use(VCalendar);

app.config.globalProperties.emitter = emitter;


app.mount("#app");


