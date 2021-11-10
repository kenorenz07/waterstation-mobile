<template>

    <ion-page>
        <ion-page>
            <ion-list>
                <ion-card @click="openModal(order)" v-for="order in orders" :key="order.id" class="loii-align-center">
                    <ion-card-header>
                            <div>
                                <span>Status</span>
                                <div :style="`background-color:${getStatus(order.status)};`"></div>
                            </div>

                        <ion-card-title>
                            <span>ORDER ID : #{{order.id}}</span>
                            </ion-card-title>
                        <ion-card-subtitle>
                            <p>To be Delivered by: {{order.delivery_man_id ? order.delivery_man.name : "Not Assigned"}}</p>
                            <span>Total: {{order.total}}</span>
                        </ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <span>tap for more info</span>
                    </ion-card-content>
                </ion-card>
            </ion-list>
        </ion-page>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button @click="initialize">
                <ion-icon :icon="reloadOutline"></ion-icon>
            </ion-fab-button>
        </ion-fab>
    </ion-page>
</template>

<script>
import { 
    IonList, 
    IonCard,
    IonPage,
    // IonRow,
    // IonCol,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
    // IonImg,
    // IonAvatar,
    modalController
    } from '@ionic/vue'
import { addCircleOutline,removeCircleOutline,cartOutline,reloadOutline } from 'ionicons/icons';
import Modal from '/src/layouts/OrdersModal.vue';

export default {
    components : {
        IonList, 
        IonCard,
        IonPage,
        IonCardTitle,
        IonCardSubtitle,
        IonCardHeader,
        IonCardContent,
        // IonRow,
        // IonCol,
        IonFab,
        IonFabButton,
        IonIcon,
        // IonImg,
        // IonAvatar,
    },
    data : () => ({
        addCircleOutline,
        removeCircleOutline,
        cartOutline,
        reloadOutline,
        orders : []
    }),
    ionViewWillEnter () {
        this.initialize()
    },
    mounted (){
        this.initialize()
    },
    methods : {
        initialize(){
            this.$axios.get('/user/v1/order/all').then(({data}) => {
                this.orders = data
            })
        },
        getStatus(status){
            if(status == 'on-the-way')  return '#e98797'
            else if(status == 'assigned-to-driver')  return '#d8a648'
            else if(status == 'pending')  return '#c0c038'
            else if(status == 'delivered')  return '#337382'
            else if(status == 'accepted')  return '#40bb40'
            else if(status == 'denied')  return '#c24242'
            else return 'black'
        },
        async openModal(order) {
            const modal = await modalController
                .create({
                component: Modal,
                    componentProps: {
                        order
                    },
                })
            return modal.present();
        },
    },
}
</script>

<style scoped>
.loii-align-center {
    padding: 10px;
    align-items: center;
}
.loii-margin {
    margin: 24px 0;
}
.loii-img{
    height: auto;
    width: 75%;
    margin: auto;
}
/* ion-card-content {
    display: flex;
} */
.ion-page{
    overflow-y: scroll;
}
ion-card-header>div{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
}
ion-card-header>div>div{
    height: 20px;
    width: 20px;
    float: right;
    /* border: 1px solid; */
    border-radius: 25px;
}
</style>