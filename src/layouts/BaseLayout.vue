<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button :default-href="pageBackLink"></ion-back-button>
            </ion-buttons>
            <ion-title >{{pageTitle}}</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <slot></slot>
    </ion-content>
    <ion-footer >
        <ion-toolbar >
            <ion-title>Footer</ion-title>
        </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
<script>
import {  IonPage, IonHeader, IonTitle, IonContent,IonToolbar,IonBackButton, IonButtons, IonFooter} from '@ionic/vue'

export default {
    components: {
        IonPage, IonHeader, IonTitle, IonContent,IonToolbar,IonBackButton, IonButtons, IonFooter
    },
    props: {
        pageTitle: {
            type: String,
            default: "default title"
        },
        pageBackLink : {
            type : String
        }
    }

}
</script>