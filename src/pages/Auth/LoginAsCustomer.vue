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
                    <ion-col>
                        <ion-item>
                            <ion-label position="floating">Email</ion-label>
                            <ion-input name="customer_email" type="email" v-model="user.email" required></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Password</ion-label>
                            <ion-input name="customer_pw" type="password" v-model="user.password" required></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col>
                        <ion-row>
                            <ion-col class="ion-text-center">
                                <ion-button default-href="/dashboard/home" color="danger" expand="block" class="ion-margin-horizontal ion-margin-vertical">Sign In</ion-button>
                                <!-- <ion-button @click="loginCustomer" color="danger" expand="block" class="ion-margin-horizontal ion-margin-vertical">Sign In</ion-button> -->
                                <div class="">
                                    <span class="divider line one-line">Or</span>
                                    <ion-button router-link="/create-account" expand="block" color="danger" class="ion-margin">Create an account</ion-button>
                                </div>
                            </ion-col>
                        </ion-row>
                    </ion-col>
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
            email: 'keno@renz.com',
            password: '123123123',
        }
    }),
    mounted () {

    },
    methods : {
        loginCustomer() {
            this.$axios.post('user/login', this.user).then(({data}) => {
                localStorage.setItem("token", data.token);
                this.$router.push('/dashboard/products');
            })
        }
    }
}
</script>
<style>
.divider {
    display: flex;
}
.divider::before, .divider::after {
    content: "";
    flex: 1;
}

.line {
    align-items: center;
    margin: 1em -1em;
    color: #000;
}
.line::after, .line::before{
    height: 1px;
    margin: 0 1em;

}

.one-line::before, .one-line::after {
        background: #000;
}
</style>