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
                    <ion-item>
                        <ion-label position="floating">*Username</ion-label>
                        <ion-input v-model="delivery_man.username" type="text"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">*Password</ion-label>
                        <ion-input v-model="delivery_man.password" type="password"></ion-input>
                    </ion-item>

                    <ion-row>
                        <ion-col class="ion-text-center">
                            <ion-button @click="loginDelivery" color="danger" expand="block" class="ion-margin-horizontal ion-margin-vertical">Sign In</ion-button>
                        </ion-col>
                    </ion-row>
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
    data: () => ({
        delivery_man: {
            username: 'delivery1',
            password: 123123
        }
    }),
    methods : {
        loginDelivery() {
            this.$axios.post('delivery_man/login', this.delivery_man).then(({data}) => {
                localStorage.setItem("token", data.token);
                this.$router.push('/delivery/orders');
            })
        }
    }
}
</script>