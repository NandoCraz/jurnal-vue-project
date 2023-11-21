import { createApp, h } from "vue";
import "./style.css";
import App from "./App.vue";
// import VueRouter from "vue-router";
import * as VueRouter from "vue-router";

import Dashboard from "./components/Dashboard.vue";

import Jurnals from "./components/jurnals/Jurnals.vue";
import NewJurnal from "./components/jurnals/NewJurnal.vue";
import DetailJurnal from "./components/jurnals/DetailJurnal.vue";
import EditJurnal from "./components/jurnals/EditJurnal.vue";

import Links from "./components/links/Links.vue";
import NewLink from "./components/links/NewLink.vue";
import EditLink from "./components/links/EditLink.vue";

const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/jurnals", name: "Jurnals", component: Jurnals },
  { path: "/links", name: "Links", component: Links },
  { path: "/new-jurnal", name: "New Jurnal", component: NewJurnal },
  { path: "/jurnal/detail/:jurnal_id", name: "Jurnal Detail", component: DetailJurnal },
  { path: "/jurnal/edit/:jurnal_id", name: "Jurnal Edit", component: EditJurnal },
  { path: "/new-link", name: "New Link", component: NewLink },
  { path: "/link/edit/:link_id", name: "Link Edit", component: EditLink },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = createApp({
  render: () => h(App),
});
app.use(router);
app.mount("#app");
