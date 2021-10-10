<template>
    <ion-page>
        <ion-header>
            
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/login" color="light"></ion-back-button>
                </ion-buttons>
                <ion-title>Login as Customer</ion-title>
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
                                <ion-label position="floating">Email</ion-label>
                                <ion-input name="customer_email" type="email" v-model="user.email" required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Password</ion-label>
                                <ion-input name="customer_pw" type="password" v-model="user.password" required></ion-input>
                            </ion-item>
                            <ion-row>
                                <ion-col class="ion-text-center">
                                    <ion-button @click="loginCustomer" color="danger" expand="block" class="ion-margin-horizontal ion-margin-vertical">Sign In</ion-button>
                                    <a class="small-text">Forgot Password?</a>
                                </ion-col>
                            </ion-row>
                        <hr>
                        <ion-row>
                            <ion-col class="ion-text-center">
                                <div class="">

                                    <span class="divider line one-line">Or</span>
                                    <ion-button router-link="/create-account" expand="block" color="danger" class="ion-margin">Create an account here</ion-button>
                                </div>
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
    data : () => ({
        user: {
            email: '',
            password: '',
        }
    }),
    mounted () {

    },
    methods : {
        loginCustomer() {
            this.$axios.post('user/test/', this.user).then(({data}) => {
                console.log(data,"LOGIN NA")
            })

        
        }
    }
}
</script>