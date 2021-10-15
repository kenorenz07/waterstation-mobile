import { createRouter, createWebHistory } from '@ionic/vue-router';

import store from '../store';

import Dashboard from "../pages/Dashboard.vue";
// import Cart from "../pages/DashboardTabs/Cart.vue";
// import Home from "../pages/DashboardTabs/Home.vue";
// import Products from "../pages/DashboardTabs/Products.vue";


import CreateAccount from "../pages/CreateAccount.vue";
import LoginFirst from "../pages/Auth/LoginFirst.vue";
import LoginAsCustomer from "../pages/Auth/LoginAsCustomer.vue";
import LoginAsDeliveryMan from "../pages/Auth/LoginAsDeliveryMan.vue";

const routes = [
  {
    path: '',
    redirect: '/dashboard/products'
  },
  {
    path: '/dashboard/',
    name : 'dashboard',
    component : Dashboard,
    meta : {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        redirect: 'products'
      },
      {
        path: 'home',
        name: 'home',
        // component: Home,
        component: () => import('../pages/DashboardTabs/Home.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        // component: Cart,
        component: () => import('../pages/DashboardTabs/Cart.vue')
      },
      {
        path: 'products',
        name: 'products',
        // component: Products,
        component: () => import('../pages/DashboardTabs/Products.vue')
      },
    ]
  },
  {
    path: '/login',
    name : 'login',
    component : LoginFirst
  },
  {
    path: '/login-customer',
    name : 'login_customer',
    component : LoginAsCustomer
  },
  {
    path: '/login-delivery',
    name : 'login_delivery',
    component : LoginAsDeliveryMan
  },
  {
    path: '/create-account',
    name : 'create_account',
    component : CreateAccount
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
    localStorage.setItem('from', from.fullPath)
    let user = null
           
    try {
        user = await store.dispatch('updateUser') 
    } catch (error) {
      user = null
    }

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    console.log(requiresAuth,'requiresAuth',!user,'no user')
    
    if (!requiresAuth && user) {
        console.log('not require auth but there is user')
        next(from)
    } else if (requiresAuth && !user) {
        console.log('require auth there is no user')
        next('/login');
    } else {
        console.log('next')
        next();
    }

})

export default router
