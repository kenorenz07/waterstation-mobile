import { createRouter, createWebHistory } from '@ionic/vue-router';

import store from '../store';

import MemoriesPage from "../pages/MemoriesPage.vue";
import MemoriesDetails from "../pages/MemoriesDetails.vue";
import CreateAccount from "../pages/CreateAccount.vue";

import LoginFirst from "../pages/Auth/LoginFirst.vue";
import LoginAsCustomer from "../pages/Auth/LoginAsCustomer.vue";
import LoginAsDeliveryMan from "../pages/Auth/LoginAsDeliveryMan.vue";

const routes = [
  {
    path: '/',
    redirect: '/memories'
  },
  {
    path: '/memories',
    name : 'memories',
    component : MemoriesPage,
    meta : {
      requiresAuth: true,
    }
  },
  {
    path: '/memory-details/:id',
    name : 'memory-details',
    component : MemoriesDetails,
    meta : {
      requiresAuth: true
    }
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
           
    if(to.path == "/login") {
       localStorage.removeItem("user_type")
    }
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if(requiresAuth){

      try {
        user = await store.dispatch('updateUser')
      } catch (error) {
        user = null
      }
    }

    if (!requiresAuth && user) {
        next(from)
    } else 
    if (requiresAuth && !user) {
        next('/login');
    } else {
        next();
    }

})

export default router
