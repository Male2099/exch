import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: 'user/login-v2' },
		{ path: '/:pathMatch(.*)*', component: () => import('../views/Error.vue') },
    { path: '/dashboard/v2', component: () => import('../views/Dashboard-v2.vue') },
    { path: '/user/login-v2', component: () => import('../views/User-login-v2.vue') },
    { path: '/user/', component: () => import('../views/User/User.vue') },
    { path: '/user/profile', component: () => import('../views/User/View.vue') },
    { path: '/user/add', component: () => import('../views/User/Add.vue') },

    { path: '/supplier/', component: () => import('../views/Supplliers/suppliers.vue') },
    { path: '/supplier/add', component: () => import('../views/Supplliers/Add.vue') },
    { path: '/supplier/:id', component: () => import('../views/Supplliers/View.vue') },


    { path: '/customer/', component: () => import('../views/Customer/customer.vue') },
    { path: '/customer/add', component: () => import('../views/Customer/Add.vue') },
    { path: '/customer/:id', component: () => import('../views/Customer/View.vue') },

    { path: '/category', component: () => import('../views/Category/category.vue') },
    { path: '/category/add', component: () => import('../views/Category/Add.vue') },
    { path: '/category/:id', component: () => import('../views/Category/View.vue') },

    { path: '/product/', component: () => import('../views/Product/product.vue') },
    { path: '/product/add', component: () => import('../views/Product/Add.vue') },
    { path: '/product/:id', component: () => import('../views/Product/View.vue') },

    { path: '/order/', component: () => import('../views/Order/order.vue') },
    { path: '/order/add', component: () => import('../views/Order/Add.vue') },

    { path: '/stock/', component: () => import('../views/Stocking/Stocking.vue') },
    { path: '/stock/add', component: () => import('../views/Stocking/Add.vue') },

    { path: '/stocking_item/', component: () => import('../views/Stocking_item/stocking_item.vue') },
    { path: '/stocking_item/view', component: () => import('../views/Stocking_item/View.vue') },
    { path: '/stocking_item/add', component: () => import('../views/Stocking_item/Add.vue') },



  ],
});

export default router;
