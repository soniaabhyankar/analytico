import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Stats from "./views/Stats.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/stats",
      name: "stats",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Stats
    }
  ]
});
