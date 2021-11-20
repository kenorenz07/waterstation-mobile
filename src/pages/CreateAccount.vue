<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/login-customer" color="light"></ion-back-button>
                </ion-buttons>
                <ion-title>Create an account</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col style="text-align: center; margin-top: 10px">
                        <!-- <ion-thumbnail> -->
                            <span> Click image to change</span>
                            <ion-img :src="customer.image ? customer.image : '/assets/img/no-image.png'" @click="takePhoto" class="loii-customer-pic"></ion-img>
                                <!-- <ion-button @click="takePhoto">take Pic</ion-button> -->
                        <!-- </ion-thumbnail> -->
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-item>
                            <ion-label class="required" position="floating">Name</ion-label>
                            <ion-input v-model="customer.name" type="text" required></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label class="required" position="floating">Email</ion-label>
                            <ion-input v-model="customer.email" type="email"></ion-input>
                        </ion-item>
                        <!-- <ion-item>
                            <ion-label class="required" position="floating">Address</ion-label>
                            <ion-input type="text" required></ion-input>
                            <ion-input v-model="customer.email" type="text" required></ion-input>
                        </ion-item> -->
                        <ion-row>
                            <ion-item style="width: calc(100%/2)">
                                <ion-label class="required" position="floating">Purok</ion-label>
                                <ion-input v-model="customer.purok" type="text" required></ion-input>
                            </ion-item>
                            <ion-item style="width: calc(100%/2)">
                                <ion-label class="required" position="floating">Barangay/Bario</ion-label>
                                <ion-input v-model="customer.brgy" type="text" required></ion-input>
                            </ion-item>
                        </ion-row>
                        <ion-row>
                            <ion-item style="width: calc(100%/2)">
                                <ion-label class="required" position="floating">City</ion-label>
                                <ion-input v-model="customer.city" type="text" required></ion-input>
                            </ion-item>
                            <ion-item style="width: calc(100%/2)">
                                <ion-label class="required" position="floating">Landmark</ion-label>
                                <ion-input v-model="customer.landmark" type="text" required></ion-input>
                            </ion-item>
                        </ion-row>
                            <ion-item>
                                <ion-label class="required" position="floating">Additional address</ion-label>
                                <ion-input v-model="customer.additional_address" type="text" required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label class="required" position="floating">Phone Number</ion-label>
                                <ion-input v-model="customer.phone_number" type="number" required></ion-input>
                            </ion-item>
                        <ion-item>
                            <ion-label class="required" position="floating">Password</ion-label>
                            <ion-input v-model="customer.password" type="password" required></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label class="required" position="floating">Confirm Password</ion-label>
                            <ion-input v-model="customer.confirm_password" type="password" required></ion-input>
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
import {camera,trash,close} from 'ionicons/icons';
import { Camera, CameraResultType,CameraSource} from '@capacitor/camera';
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
    IonImg
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
        IonImg
    },
    data: () => ({
        customer : {
            image: '',
            purok: '',
            brgy: '',
            city: '',
            landmark: '',
            additional_address: '',
            name: '',
            email: '',
            phone_number: null,
            password: '',
            confirm_password: ''
        }
    }),
    methods: {
        async takePhoto(){
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                source: CameraSource.Camera,
                resultType: CameraResultType.Base64,
            });

            this.customer.image ="data:image/jpeg;base64," + image.base64String;
        },
        async register(){
            console.log(this.customer);

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
     
    },
    setup(){
        return {
            camera, trash, close
        }
    }
}
</script>

<style scoped>
.required::before{
    content: "* ";
    color: red;
}
.loii-customer-pic {
    width: 250px;
    margin: 10px auto;
}
</style>