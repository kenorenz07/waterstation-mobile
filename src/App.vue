<template>
  <ion-app>
    <Menu></Menu>
    <ion-router-outlet id="main-content"/>
  </ion-app>
</template>

<script >
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Menu from './layouts/Menu.vue';
export default {
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Menu
  }
};
</script>