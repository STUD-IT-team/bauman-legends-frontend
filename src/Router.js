import {createRouter, createWebHistory} from 'vue-router'

// Components:
import Profile from "~/views/Profile.vue";
import Register from "~/views/register.vue";
import Page404 from "./views/Page404.vue";


export default function createVueRouter(Store) {
  const routes = [
    {path: '/register', name: 'registration', component: Register, meta: {noLoginRequired: true}},
    {path: '/login', name: 'signin', component: Register, meta: {noLoginRequired: true}},
    {path: '/profile', name: 'profile', component: Profile, meta: {loginRequired: true}},

    {path: '/:pathMatch(.*)*', name: 'default', component: Page404},
  ];

  const Router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });


  Router.beforeEach(async (to, from, next) => {
    const notLoginedRedirect = {
      name: 'signin'
    }
    const loginedRedirect = {
      name: 'profile',
    }

    if (to.path === '/' || to.path === '') {
      if (Store.state.user.isSignedIn) {
        next(loginedRedirect);
        return;
      }
      next(notLoginedRedirect);
      return;
    }


    // Login required redirects
    if (to.matched.some(record => record.meta.loginRequired)) {
      if (Store.state.user.isSignedIn) {
        return;
      }
      next(notLoginedRedirect);
      return;
    } else if (to.matched.some(record => record.meta.noLoginRequired)) {
      if (!Store.state.user.isSignedIn) {
        return;
      }
      next(loginedRedirect);
      return;
    }
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
