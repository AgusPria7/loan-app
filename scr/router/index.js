import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import LoanDetailPage from '@/views/LoanDetailPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/loan/:id',
      name: 'LoanDetailPage',
      component: LoanDetailPage,
    },
  ],
});
