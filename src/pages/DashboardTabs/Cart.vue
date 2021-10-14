<template>
    <ion-page>
        <ion-list>
            <ion-card v-for="cart in carts" :key="cart.id" >
                <ion-card-header>
                    <ion-card-subtitle>Quantity : {{cart.quantity}}</ion-card-subtitle>
                    <ion-card-title> {{cart.product.name}}</ion-card-title>
                        <ion-button @click="cart.quantity--" fill="outline">
                            <ion-icon  slot="icon-only" :icon="removeCircleOutline"></ion-icon>
                        </ion-button>
                        <ion-label>
                            {{cart.quantity}}
                        </ion-label>
                        <ion-button @click="cart.quantity++" fill="outline">
                            <ion-icon  :icon="addCircleOutline"></ion-icon>
                        </ion-button>
                </ion-card-header>

                <ion-card-content>
                    <ion-row>
                        <ion-col size="9">
                            <ion-label>
                            Total : {{cart.total_price}}
                            </ion-label>
                        </ion-col>
                        <ion-col size="3">
                            <ion-button @click="removeFromCart(cart.id)">
                                <ion-icon  :icon="trashOutline" ></ion-icon>
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-card-content>
            </ion-card>
        </ion-list>
        
    </ion-page>
</template>

<script>

import { 
    IonPage,
    IonList,
    // IonItem,
    IonLabel, 
    IonButton,
    IonIcon,
    IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonCardSubtitle,IonRow,IonCol
} from '@ionic/vue'

import { trashOutline,addCircleOutline,removeCircleOutline,cartOutline } from 'ionicons/icons';

export default {
    components: {
        IonPage,
        IonList,
        // IonItem,
        IonLabel, 
        IonButton,
        IonIcon,
        IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonRow,IonCol
    },
    data : () => ({

        trashOutline,addCircleOutline,removeCircleOutline,cartOutline,
        carts : []
    }),
    ionViewWillEnter() {
        this.initialize()
    },
    mounted (){
        this.initialize()
    },
    methods : {
        initialize(){
            this.$axios.get('user/v1/cart/all').then(({data}) => {
                this.carts = data
            })
        },
        removeFromCart(id){
            this.$axios.delete(`user/v1/cart/delete/${id}`).then(({data})=> {
                data
                this.initialize()
            })
        }
    }
}
</script>

<style scoped>

.ion-page{
    overflow-y: scroll;
}

</style>