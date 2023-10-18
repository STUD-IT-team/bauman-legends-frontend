import {createRouter, createWebHistory} from 'vue-router'

// Components:
import Profile from "./views/Profile.vue";
import Registration from "./views/Registration.vue";
import Page404 from "./views/Page404.vue";
import SignIn from "./views/SignIn.vue";
import ChangePassword from "./views/ChangePassword.vue";
import Task from "./views/Task.vue";
import Admin from "./views/Admin.vue";


export default function createVueRouter(Store) {
  const routes = [
    {path: '/register', name: 'register', component: Registration, meta: {noLoginRequired: false}},
    {path: '/login', name: 'login', component: SignIn, meta: {noLoginRequired: false}},
    {path: '/profile', name: 'profile', component: Profile, meta: {loginRequired: false}},
    {path: '/login/email', name: 'signInByEmail', component: SignIn, meta: {noLoginRequired: false}},
    {path: '/task', name: 'task', component: Task, meta: {loginRequired: false}},
    {path: '/password/change', name: 'changePassword', component: ChangePassword, meta: {loginRequired: false}},
    {path: '/password/restore', name: 'restorePassword', component: SignIn, meta: {noLoginRequired: false}},
    {path: '/admin', name: 'admin', component: Admin, meta: {loginRequired: false}},

    {path: '/:pathMatch(.*)*', name: 'page404', component: Page404},
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
    if (to.matched.some(record => record.meta.loginRequired === true)) {
      if (Store.state.user.isSignedIn) {
        next();
        return;
      }
      next(notLoginedRedirect);
      return;
    } else if (to.matched.some(record => record.meta.noLoginRequired === true)) {
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
