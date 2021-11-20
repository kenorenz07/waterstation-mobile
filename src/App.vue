<template>
  <ion-app>
    <Menu></Menu>
    <DeliveryMenu></DeliveryMenu>
    <ion-router-outlet id="main-content"/>
  </ion-app>
</template>

<script >
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Menu from './layouts/Menu.vue';
import DeliveryMenu from './layouts/DeliveryMenu.vue';
export default {
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Menu, DeliveryMenu
  }
};
</script>