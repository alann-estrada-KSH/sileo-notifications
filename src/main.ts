import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { vReveal } from "./directives/reveal";
import "@alann-estrada-ksh/sileo-vue/styles.css";
import "./style.css";

createApp(App).use(router).directive("reveal", vReveal).mount("#app");
