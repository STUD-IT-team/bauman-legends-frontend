import {createRouter, createWebHistory} from 'vue-router'

// Components:
import Profile from "~/views/Profile.vue";
import MainPage from "~/views/MainPage.vue";
import Register from "~/views/register.vue";

export default function createVueRouter(Store) {
  const routes = [
    {path: '/', name: 'mainPage', component: MainPage},
    {path: '/profile', name: 'profile', component: Profile},
    {path: '/reg', name: 'registration', component: Register}
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });

  return router;
}
