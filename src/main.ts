import { createApp } from "vue";
//import './style.css'
import App from "./App.vue";
import { createPinia } from "pinia";
import { createRouter, createWebHashHistory } from "vue-router";
import "./index.css";
import Home from "../src/views/HomeView.vue";
import MarketplaceView from "../src/views/MarketplaceView.vue";
import PersonToPersonView from "../src/views/PersonToPersonView.vue";
import "bootstrap-icons/font/bootstrap-icons.css";
import "/public/datafeeds/udf/dist/bundle";

const pinia = createPinia();

const About = { template: "<div>About</div>" };

const routes = [
  { path: "/", component: Home },
  { path: "/marketplace", component: MarketplaceView },
  { path: "/p2p", component: PersonToPersonView },
  { path: "/about", component: About },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

createApp(App).use(pinia).use(router).mount("#app");
