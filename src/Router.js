import {createRouter, createWebHistory} from 'vue-router'

// Components:
import Profile from "./views/Profile.vue";
import Registration from "./views/Registration.vue";
import Page404 from "./views/Page404.vue";
import SignIn from "./views/SignIn.vue";


export default function createVueRouter(Store) {
  const routes = [
    {path: '/register', name: 'register', component: Registration, meta: {noLoginRequired: true}},
    {path: '/login', name: 'login', component: SignIn, meta: {noLoginRequired: true}},
    {path: '/profile', name: 'profile', component: Profile, meta: {}},
    {path: '/login/email', name: 'signInByEmail', component: SignIn, meta: {noLoginRequired: true}},
    {path: '/password/restore', name: 'restorePassword', component: SignIn, meta: {noLoginRequired: true}},
    {path: '/password/change', name: 'changePassword', component: SignIn, meta: {loginRequired: true}},

    {path: '/:pathMatch(.*)*', name: 'default', component: Page404},
  ];

  const Router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });


  let router_got_user = false;
  Router.beforeEach(async (to, from, next) => {
    if (!router_got_user) {
      await Store.dispatch('GET_USER');
      router_got_user = true;
    }

    const notLoginedRedirect = {
      name: 'login'
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
        next();
        return;
      }
      next(notLoginedRedirect);
      return;
    } else if (to.matched.some(record => record.meta.noLoginRequired)) {
      if (!Store.state.user.isSignedIn) {
        next();
        return;
      }
      next(loginedRedirect);
      return;
    }
    next();
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
