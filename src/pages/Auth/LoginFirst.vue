<template>
    <ion-page>
        <ion-content>
            <div slot="fixed">
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <div class="ion-text-center">
                                <ion-img src="/assets/img/icon.png"></ion-img>
                                <h1 color="dark">Welcome</h1>
                            </div>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col align-self-center>
                            <div class="ion-text-center">
                                <ion-button @click="goTo('customer')" expand="block" color="primary" class="ion-margin-horizontal">Login as customer</ion-button>
                                <ion-button @click="goTo('delivery')" expand="block" color="primary" class="ion-margin-vertical ion-margin-horizontal">Login as delivery man</ion-button>
                            </div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage,IonContent, IonGrid,IonRow,IonCol,IonImg,IonButton } from '@ionic/vue'

export default {
    components : {
        IonPage,IonContent, IonGrid,IonRow,IonCol,IonImg,IonButton 
    },
    mounted () {
    },
    methods : {
        goTo(path) {
            localStorage.setItem("user_type",path)
            this.$router.push("/login-"+path)
        },
        
    }
}
</script>
<style scoped>
ion-content ion-grid {
    height: 100%;
    justify-content: center;
}

.divider {
    display: flex;
}
.divider::before,.divider::after {
    content: "";
    flex: 1;
}

.line {
    align-items: center;
    margin: 1em -1em;
    color: #000;
}
.line::before,.line::after {
    height: 1px;
    margin: 0 1em;
}
.one-line::before,.one-line::after {
    background: #000;
}
</style>