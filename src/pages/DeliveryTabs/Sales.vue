<template>

    <ion-page>
        <ion-page>
            <ion-list>
                <ion-card @click="openModal(sale)" v-for="sale in sales" :key="sale.id" class="loii-align-center">
                    <ion-card-header>
                          

                        <ion-card-title>
                            <span>SOLD ID : #{{sale.id}}</span>
                            </ion-card-title>
                        <ion-card-subtitle>
                            <p>Delivered To: {{sale.user_id ? sale.user.name : "Not Assigned"}}</p>
                            <span>Total: ₱ {{sale.total}}</span>
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
import Modal from '/src/layouts/DeliverySale.vue';

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
        sales : []
    }),
    ionViewWillEnter () {
        this.initialize()
    },
    mounted (){
        this.initialize()
    },
    methods : {
        initialize(){
            this.$axios.get('/delivery_man/v1/sale/all').then(({data}) => {
                this.sales = data
            })
        },
        async openModal(sale) {
            const modal = await modalController
                .create({
                component: Modal,
                    componentProps: {
                        sale
                    },
                })
            modal.onDidDismiss()
            .then(() => {
                this.initialize()
            });
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