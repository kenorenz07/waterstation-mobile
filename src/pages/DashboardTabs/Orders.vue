<template>
    <ion-page>
        <ion-page>
            <ion-list>
                <ion-card @click="openModal(order)" v-for="order in orders" :key="order.id" class="loii-align-center">
                        <!-- <figure> -->
                        <ion-row>
                            <ion-col >
                                <h1 class="text-2xl">ORDER ID : #{{order.id}}</h1>
                            </ion-col> 
                            <ion-col>
                                <h1 class="text-xl text-white text-center rounded-2xl " :class="`bg-${getStatus(order.status)}-600`">{{order.status}}</h1>
                            </ion-col>
                        </ion-row>
                        <ion-row >
                            <ion-col class="pl-1">
                                <h1 class="text-xl ">Total : ₱ {{order.total}} </h1>
                                <h1  >Time to deliver : </h1>
                                <h1 class="pl-2">{{ order.date_to_deliver ? order.date_to_deliver : 'Not defined'}}</h1>
                                <h1  >Date to Deliver: </h1>
                                <h1 class="pl-2">{{ order.time_to_deliver ? order.time_to_deliver : 'Not defined'}}</h1>
                            </ion-col>
                            <ion-col>
                                <h1  >Delivery man : </h1>
                                <div class="flex justify-between" v-if="order.delivery_man_id">
                                    <div class="mt-2">
                                      <h1>{{order.delivery_man.name}}</h1>
                                      <h1>{{order.delivery_man.phone_number}}</h1>
                                    </div>
                                    <ion-avatar class="w-14 h-12">
                                        <ion-img  :src="'http://3.144.168.4/storage/' + order.delivery_man.image"></ion-img>
                                    </ion-avatar>
                                </div>
                                <div v-else>Not defined</div>
                            </ion-col>
                        </ion-row>
                        <!-- </figure> -->
                </ion-card>
            </ion-list>
        </ion-page>
        <ion-fab vertical="top" horizontal="end" slot="fixed">
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
    IonRow,
    IonCol,
    IonFab,
    IonFabButton,
    IonIcon,
    IonImg,
    IonAvatar,
    modalController
    } from '@ionic/vue'
import { addCircleOutline,removeCircleOutline,cartOutline,reloadOutline } from 'ionicons/icons';
import Modal from '/src/layouts/OrdersModal.vue';

export default {
    components : {
        IonList, 
        IonCard,
        IonPage,
        IonRow,
        IonCol,
        IonFab,
        IonFabButton,
        IonIcon,
        IonImg,
        IonAvatar,
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
            console.log('sgs')
            this.$axios.get('/user/v1/order/all').then(({data}) => {
                this.orders = data
            })
        },
        getStatus(status){
            if(status == 'on-the-way')  return 'blue'
            else if(status == 'assinged-to-driver')  return 'orange'
            else if(status == 'pending')  return 'yellow'
            else if(status == 'delivered')  return 'green'
            else if(status == 'accepted')  return 'pink'
            else if(status == 'denied')  return 'red'
            else return "black"
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
</style>