// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [
  { path: '/', component: goods },
  { path: '/goods', component: goods },
  { path:'/seller',component: seller},
  { path:'/ratings',component: ratings}
];
const router = new VueRouter({
  routes,
  linkActiveClass:'active'
});

new Vue({
  el:'#app',
  router,
  render: h => h(App)
});
