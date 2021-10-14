<template>
    <ion-page>
        <ion-list>
        <ion-button expand="full" >Order Selected({{ordersNumber}})</ion-button>

            <ion-card v-for="cart in carts" :key="cart.id" >
                <ion-card-header>
                    <ion-card-subtitle>Quantity : {{cart.quantity}}</ion-card-subtitle>
                    <ion-card-title> {{cart.product.name}}</ion-card-title>
                    <ion-button @click="updateProductQuantity(cart,-1)" fill="outline">
                        <ion-icon  slot="icon-only" :icon="removeCircleOutline"></ion-icon>
                    </ion-button>
                    <ion-label>
                        {{cart.quantity}}
                    </ion-label>
                    <ion-button @click="updateProductQuantity(cart,1)" fill="outline">
                        <ion-icon  :icon="addCircleOutline"></ion-icon>
                    </ion-button>
                </ion-card-header>

                <ion-card-content>
                    <ion-row>
                        <ion-col size="6">
                            <ion-label>
                            Total : {{cart.total_price}}
                            </ion-label>
                        </ion-col>
                        <ion-col >
                            <ion-checkbox v-model="cart.to_order" @ionChange="addToTempOrder(cart)"></ion-checkbox>
                            <ion-label>add to orders</ion-label>
                        </ion-col>
                        <ion-col >
                            <ion-button color="danger" @click="removeFromCart(cart.id)">
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
    IonCheckbox,
    IonLabel, 
    IonButton,
    IonIcon,
    IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonCardSubtitle,IonRow,IonCol
} from '@ionic/vue'

import { trashOutline,addCircleOutline,removeCircleOutline,cartOutline,arrowForwardCircle } from 'ionicons/icons';

export default {
    components: {
        IonPage,
        IonList,
        // IonItem,
        IonCheckbox,
        IonLabel, 
        IonButton,
        IonIcon,
        IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonRow,IonCol
    },
    data : () => ({

        trashOutline,addCircleOutline,removeCircleOutline,cartOutline,arrowForwardCircle,
        carts : [],
        temp_orders: [],
    }),
    ionViewWillEnter() {
        this.initialize()
    },
    mounted (){
        this.initialize()
    },
    computed : {
        ordersNumber(){
            return this.temp_orders.length
        }
    },
    methods : {
        initialize(){
            this.$axios.get('user/v1/cart/all').then(({data}) => {
                this.carts = data

                this.carts.forEach((item) => {
                    item.to_order = false
                })
            })
        },
        updateProductQuantity(cart_item,value){
            this.$axios.put(`user/v1/cart/update/${cart_item.id}`,{quantity: cart_item.quantity+value})
                .then(({data})=> {
                    data
                    this.initialize()
                })
        },
        removeFromCart(id){
            this.$axios.delete(`user/v1/cart/delete/${id}`).then(({data})=> {
                data
                this.initialize()
            })
        },
        addToTempOrder(cart){
            if(cart.to_order){
                this.temp_orders.push({
                    "product_id" : cart.product_id,
                    "quantity" : cart.quantity,
                    "total_price" : cart.total_price
                })
            }
            else{
                let index = this.temp_orders.findIndex(order => order.product_id == cart.product_id)

                this.temp_orders.splice(index, 1)
            }

            console.log(this.temp_orders,'order yarn')
        }
    }
}
</script>

<style scoped>

.ion-page{
    overflow-y: scroll;
}

</style>