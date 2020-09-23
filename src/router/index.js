import Vue from 'vue';
import VueRouter from 'vue-router';

import ProductIndex from '../pages/Product/Index.vue';
import ProductNew from '../pages/Product/New.vue';
import ProductEdit from '../pages/Product/Edit.vue';

import Shipping from '../pages/Shipping/Index.vue';
import Search from '../pages/Search/Index.vue';

Vue.use(VueRouter);

const routers = new VueRouter({
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'products',
      component: ProductIndex,
    },
    {
      path: '/product/new',
      name: 'product.new',
      component: ProductNew,
    },
    {
      path: '/product/:id/edit',
      name: 'product.edit',
      props: true,
      component: ProductEdit,
    },
    {
      path: '/product/shipping',
      name: 'product.shipping',
      component: Shipping,
    },
    {
      path: '/product/search',
      name: 'product.search',
      props: true,
      component: Search,
    },
  ],
});

export default routers;