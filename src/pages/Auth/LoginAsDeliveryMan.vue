<template>
<ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
        
                <ion-back-button default-href="/login" color="light"></ion-back-button>
            </ion-buttons>
            <ion-title>Login as Delivery Man</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col>

                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <form>
                        <ion-item lines="full">
                            <ion-label position="floating">Email</ion-label>
                            <ion-input type="text" required></ion-input>
                        </ion-item>

                        <ion-item lines="full">
                            <ion-label position="floating">Password</ion-label>
                            <ion-input type="password" required></ion-input>
                        </ion-item>

                        <ion-row>
                            <ion-col class="ion-text-center">
                                <ion-button type="submit" color="danger" expand="block" class="ion-margin-horizontal ion-margin-vertical">Sign In</ion-button>
                            </ion-col>
                        </ion-row>
                    </form>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</ion-page>
</template>

<script>
import { 
    IonItem ,
    IonButton,
    IonLabel,
    IonInput,
    IonContent, 
    IonGrid,
    IonRow,
    IonCol,
    IonPage,
    IonBackButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
} from '@ionic/vue'

export default {
    components : {
        IonItem ,
        IonButton,
        IonLabel,
        IonInput,
        IonContent, 
        IonGrid,
        IonRow,
        IonCol,
        IonPage,
        IonBackButton,
        IonButtons,
        IonTitle,
        IonToolbar,
        IonHeader,
    },
    mounted () {

    },
    methods : {
    }
}
</script>