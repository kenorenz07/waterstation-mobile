<template>
    <ion-page>
        <ion-page>
            <div class="cart-wrapper">
                <ion-list>
                    <ion-item v-for="cart in carts" :key="cart.id">
                        <ion-grid>
                            <ion-row>
                                <ion-col size="1">
                                    <ion-checkbox name="checked_product" v-model="cart.to_order" mode="ios" @ionChange="addToTempOrder(cart)"></ion-checkbox>
                                </ion-col>
                                <ion-col size="4">
                                    <ion-img :src="cart.product.image ? 'http://127.0.0.1:8000/storage/' + cart.product.image :'https://cdn.shopify.com/s/files/1/0297/0429/0397/products/Sip_Water_Bottle_500ml_800x.jpg?v=1588434244'"></ion-img>
                                </ion-col>
                                <ion-col size="5">
                                    <h1>{{cart.product.name}}</h1>
                                    <ion-row>
                                        <ion-col style="padding-left:0;">
                                            <p class="product-desc">{{cart.product.description}}</p>
                                            <p class="product-price">₱ {{cart.total_price}}</p>
                                            <p class="product-price"> {{cart.product.is_refill ? 'For refill' : 'Container is for sale'}}</p>
                                           
                                            <div class="product-add">
                                                <ion-buttons>
                                                    <ion-button :disabled="cart.quantity == 1" @click="updateProductQuantity(cart,-1)">-</ion-button>
                                                </ion-buttons>
                                                <ion-label>{{cart.quantity}}</ion-label>
                                                <ion-buttons>
                                                    <ion-button @click="updateProductQuantity(cart,1)">+</ion-button>
                                                </ion-buttons>
                                            </div>
                                        </ion-col>
                                
                                    </ion-row>
                                </ion-col>
                                <ion-col size="1">
                                    <ion-buttons >
                                        <ion-button @click="removeFromCart(cart.id)" color="danger" class="my-auto" >
                                            <ion-icon  :icon="trashOutline" slot="icon-only" ></ion-icon>
                                        </ion-button>   
                                    </ion-buttons>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-item>
                </ion-list>
            
            </div>
        </ion-page>
        <div class="checkout-btn">
            <ion-button @click="openModal" expand="block" :disabled="temp_orders.length < 1" fill="solid" color="danger">Checkout ({{temp_orders.length}})</ion-button>
        </div>
    </ion-page>
</template>

<script>
import { 
    IonPage,
    IonList,
    IonCheckbox,
    IonCol,
    IonImg,
    IonButton,
    IonButtons,
    IonLabel,
    IonRow,
    IonGrid,
    IonItem,
    IonIcon,
    modalController
} from '@ionic/vue'

import { trashOutline } from 'ionicons/icons';
import Modal from '/src/layouts/CheckoutModal.vue';

export default {
    components: {
        IonPage,
        IonList,
        IonCheckbox,
        IonCol,
        IonImg,
        IonButton,
        IonButtons,
        IonLabel,
        IonRow,
        IonGrid,
        IonItem,
        IonIcon,
    },
    data : () => ({

        trashOutline,
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
            console.log(cart)
            if(cart.to_order){
                this.temp_orders.push({
                    "id" : cart.id,
                    "product" : cart.product,
                    "quantity" : cart.quantity,
                    "total_price" : cart.total_price
                })
            }
            else{
                let index = this.temp_orders.findIndex(order => order.product_id == cart.product_id)

                this.temp_orders.splice(index, 1)
            }

            console.log(this.temp_orders,'order yarn')
        },
        async openModal() {
            const modal = await modalController
                .create({
                    component: Modal,
                    componentProps: {
                        items: this.temp_orders
                    },
                })
            modal.onDidDismiss()
            .then(() => {
                this.temp_orders = []
                this.initialize()
            });

            return modal.present();
        },
    }
}
</script>

<style scoped>

.ion-page{
    overflow-y: scroll;
}

.product-add {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 10px;
    /* justify-content: space-between; */
}
.product-add ion-button {
    font-size: 25px;
    border: 1px solid;
    border-radius: 50px;
    height: 30px;
    width: 30px;
}
.product-desc{
    font-size: 16px;
    color: #a19c9c;
}
.product-price{
        font-weight: 700;
    color: #269926;
}
.checkout-btn {
  position: absolute;
  width: 90%;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 0);
}
ion-checkbox,trash-btn{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    --border-radius: 5px;
    --border-color: #433f3f;
}
</style>