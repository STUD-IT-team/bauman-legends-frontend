import {createRouter, createWebHistory} from 'vue-router'

// Components:
import Registration from "./views/Registration.vue";
import Page404 from "./views/Page404.vue";
import Authorization from "./views/Authorization.vue";



export default function createVueRouter(Store) {
  const routes = [
    {path: '/register', name: 'registration', component: Registration},

    {path: '/authorization', name: 'authorization', component: Authorization},

    {path: '/:pathMatch(.*)*', name: 'default', component: Page404},

  ];

  const Router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });

  Router.beforeResolve(async (to) => {
    if (window?.onbeforeunload) {
      if (confirm("Изменения не сохранены. Вы уверены, что хотите покинуть страницу?")) {
        window.onbeforeunload = null;
      } else {
        return false;
      }
    }
  });

  return Router;
}
