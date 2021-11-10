<template>
    <ion-page>
        <div>
            <h1>orders</h1>
            <g-map></g-map>
        </div>
    </ion-page>
</template>

<script>

import Gmap from './../../layouts/DeliveryModal.vue'

import { IonPage } from '@ionic/vue'
export default {
    components: {
        IonPage,
        Gmap
    }
}
</script>