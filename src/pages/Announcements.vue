<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/dashboard/" color="light"></ion-back-button>
                </ion-buttons>
                <ion-title>Announcements</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-card v-for="anunsyo in anunsyos" :key="anunsyo.id">
                    <ion-card-header>
                        <span style="float:right;">{{moment(anunsyo.created_at)}}</span>
                    </ion-card-header>
                    <ion-card-content>
                        <p>{{anunsyo.content}}</p>
                    </ion-card-content>
                    <span></span>
                </ion-card>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons, IonContent, IonList, IonCard, IonCardHeader, IonCardContent, /* IonCardTitle */ } from "@ionic/vue";
import moment from 'moment';

export default {
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons, IonContent, IonList, IonCard, IonCardHeader, IonCardContent, /* IonCardTitle */
    },
    data: () => ({
        // add,
        anunsyos: [],
    }),
    ionViewWillEnter() {
        console.log(this.anunsyo());
        
    },
    mounted() {
        console.log(this.anunsyo());
        // this.anunsyo()
    },
    methods: {
        anunsyo() {
            this.$axios.get('user/v1/announcement').then(({data}) => {
                this.anunsyos = data
                console.log(this.anunsyos)
            });
        },
        moment: function (date) {
            // return moment(date).startOf('day').fromNow();
            return moment(date).format('ll');
        },
    }
}
</script>