import { createRouter, createWebHistory } from '@ionic/vue-router';

import MemoriesPage from "../pages/MemoriesPage.vue";
import MemoriesDetails from "../pages/MemoriesDetails.vue";
import Menu from "../pages/Menu.vue";

const routes = [
  {
    path: '/',
    redirect: '/memories'
  },
  {
    path: '/memories',
    component : MemoriesPage
  },
  {
    path: '/memory-details/:id',
    component : MemoriesDetails
  },
  {
    path: '/menu',
    component : Menu
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
