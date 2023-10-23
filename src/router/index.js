import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/:pathMatch(.*)*", component: () => import("../views/Error.vue") },
    { path: "/login", component: () => import("../views/Login.vue") },
    {
      path: "/internal-server-error",
      component: () => import("../views/ServerError.vue"),
    },
    {
      path: "/admin",
      redirect: "/admin/dashboard",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      children: [
        {
          path: "dashboard",
          component: () => import("../views/Dashboard/Dashboard.vue"),
        },
        { path: "user", component: () => import("../views/User/User.vue") },
        {
          path: "user/:id",
          component: () => import("../views/User/Update.vue"),
        },
        { path: "user/add", component: () => import("../views/User/Add.vue") },

        {
          path: "supplier",
          component: () => import("../views/Supplliers/suppliers.vue"),
        },
        {
          path: "supplier/add",
          component: () => import("../views/Supplliers/Add.vue"),
        },
        {
          path: "supplier/:id",
          component: () => import("../views/Supplliers/View.vue"),
        },

        {
          path: "customer",
          component: () => import("../views/Customer/customer.vue"),
        },
        {
          path: "customer/:id",
          component: () => import("../views/Customer/View.vue"),
        },

        {
          path: "category",
          component: () => import("../views/Category/category.vue"),
        },
        {
          path: "category/add",
          component: () => import("../views/Category/Add.vue"),
        },
        {
          path: "category/:id",
          component: () => import("../views/Category/View.vue"),
        },

        {
          path: "product",
          component: () => import("../views/Product/product.vue"),
        },
        {
          path: "product/add",
          component: () => import("../views/Product/Add.vue"),
        },
        {
          path: "product/:id",
          component: () => import("../views/Product/View.vue"),
        },

        { path: "order", component: () => import("../views/Order/order.vue") },
        {
          path: "order/:id",
          component: () => import("../views/Order/view.vue"),
        },

        {
          path: "stock",
          component: () => import("../views/Stocking/Stocking.vue"),
        },
        {
          path: "stock/add",
          component: () => import("../views/Stocking/Add.vue"),
        },

        {
          path: "stocking_item/:id",
          component: () => import("../views/Stocking_item/stocking_item.vue"),
        },
        {
          path: "stocking_item/view/:id",
          component: () => import("../views/Stocking_item/View.vue"),
        },
        {
          path: "stocking_item/add/:id",
          component: () => import("../views/Stocking_item/Add.vue"),
        },
        {
          path: "me",
          redirect: "/admin/me/profile",
          // component: () => import("@/views/AuthProfile/Profile.vue"),
          children: [
            {
              path: "profile",
              component: () => import("@/views/AuthProfile/Profile.vue"),
            },
            {
              path: "reset-password",
              component:()=>import("@/views/AuthProfile/ResetPassword.vue")
            }
          ],
        },
      ],
    },
  ],
});

import { userAuthStore } from "../stores/app-auth";

router.beforeEach((to, from, next) => {
  const authStore = userAuthStore();

  // user not yet logged in
  if (!authStore.user && !to.path.includes("/login")) {
    next("/login");
    //user already loggin, block path to login
  } else if (authStore.user && to.path.includes("/login")) {
    next("/admin");
  }


  next();
});

export default router;
