import { createRouter, createWebHistory } from '@ionic/vue-router';

import store from '../store';

import MemoriesPage from "../pages/MemoriesPage.vue";
import MemoriesDetails from "../pages/MemoriesDetails.vue";
import Login from "../pages/Auth/Login.vue";

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
      requiresAuth: true
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
    component : Login
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
    console.log(requiresAuth)

    if (!requiresAuth && user) {
        next(from)
    } else if (requiresAuth && !user) {
        next('/login');
    } else {
        next();
    }

})

export default router
