<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/login-customer"></ion-back-button>
                </ion-buttons>
                <ion-title>Create an account</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-item>
                            <ion-label position="floating">*Name</ion-label>
                            <ion-input v-model="customer.name" type="text"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">*Email</ion-label>
                            <ion-input v-model="customer.email" type="email"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">*Phone Number</ion-label>
                            <ion-input v-model="customer.phone_number" type="number"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">*Password</ion-label>
                            <ion-input v-model="customer.password" type="password"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">*Confirm Password</ion-label>
                            <ion-input v-model="customer.confirm_password" type="password"></ion-input>
                        </ion-item>
                        <ion-row>
                            <ion-col>
                                <ion-button @click="register" color="danger" expand="block" class="ion-margin-horizontal ion-margin-vertical">Create Account</ion-button>
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
    toastController,
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
    data: () => ({
        customer : {
            name: '',
            email: '',
            phone_number: null,
            password: '',
            confirm_password: ''
        }
    }),
    methods: {
        async register(){
            if(this.customer.confirm_password != this.customer.password){

                const toast = await toastController
                    .create({
                        message: 'Password does not match.',
                        duration: 1000,
                        color: 'danger'
                    })
                return toast.present();
            }
            else if(this.customer.name && this.customer.email && this.customer.phone_number && this.customer.password){
                this.$axios.post('user/register',this.customer).then(({data}) => {
                    data
                    this.$router.push('/login')
                })
            }
            else{
                const toast = await toastController
                    .create({
                        message: 'All fields are required.',
                        duration: 1000,
                        color: 'danger'
                    })
                return toast.present();
            }
        },
     
    }
}
</script>