import Vue from "vue";
import VueRouter from "vue-router";
import Form from "../views/Form.vue";
import Locality from "../views/Locality.vue";
import Favourites from "../views/Favourites.vue";
import About from "../views/About.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/geo/",
    name: "Form",
    component: Form
  },
  {
    path: "/geo/about",
    name: "About",
    component: About
  },
  {
    path: "/geo/favourites",
    name: "favourites",
    component: Favourites
  },

  { path: "/geo/locality/:id", name: "locality", component: Locality }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
