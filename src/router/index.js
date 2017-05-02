import Vue from 'vue'
import Router from 'vue-router'
import store from 'store'
import menuModule from 'store/modules/Route'
import Index from 'views/Index'
Vue.use(Router);
let router = new Router({
  mode: 'hash',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'index',
      path: '/',
      meta: {
        slider: true,
      },
      component: Index
    },
    ...menuModule.state.items,
    {
      path: '*',
      redirect: '/'
    }
  ]
});
router.beforeEach((route, redirect, next) => {
  window.scrollTo(0,0);
  next()
});
export default router