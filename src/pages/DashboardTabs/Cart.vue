<template>
    <ion-page>
        <div class="cart-wrapper">
        <ion-list>
        <!-- <ion-button expand="full" >Order Selected({{ordersNumber}})</ion-button> -->
            <!-- <ion-card v-for="cart in carts" :key="cart.id" >
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
            </ion-card> -->
            <ion-item v-for="cart in carts" :key="cart.id">
                <ion-grid>
                    <ion-row>
                        <ion-col size="1">
                            <ion-checkbox name="checked_product" mode="ios"></ion-checkbox>
                        </ion-col>
                        <ion-col size="4">
                            <ion-img src="https://e7.pngegg.com/pngimages/725/706/png-clipart-drinking-water-mineral-water-bottles-mineral-water.png"></ion-img>
                        </ion-col>
                        <ion-col size="7">
                            <h1>{{cart.product.name}}</h1>
                            <ion-row>
                                <!-- <ion-col size="6" style="padding-left:0;"> -->
                                <ion-col style="padding-left:0;">
                                    <p class="product-desc">cart.product.description</p>
                                    <p class="product-price">P3.00</p>
                                    <div class="product-add">
                                        <ion-buttons>
                                            <ion-button @click="updateProductQuantity(cart,-1)">-</ion-button>
                                        </ion-buttons>
                                        <ion-label>2</ion-label>
                                        <ion-buttons>
                                            <ion-button @click="updateProductQuantity(cart,1)">+</ion-button>
                                        </ion-buttons>
                                    </div>
                                </ion-col>
                                <!-- <ion-col size="6" style="place-self: center;">
                                    <div class="product-add">
                                        <ion-buttons>
                                            <ion-button>-</ion-button>
                                        </ion-buttons>
                                        <ion-label>2</ion-label>
                                        <ion-buttons>
                                            <ion-button>+</ion-button>
                                        </ion-buttons>
                                    </div>
                                </ion-col> -->
                            </ion-row>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-item>
        </ion-list>
        <div class="checkout-btn">
            <ion-button @click="openModal" expand="block" fill="solid" color="danger">Checkout ($total)</ion-button>
        </div>
        </div>
        
    </ion-page>
</template>

<script>
import { 
    IonPage,
    IonList,
    IonCheckbox,
    modalController
    // IonItem,
    // IonCheckbox,
    // IonLabel, 
    // IonButton,
    // IonIcon,
    // IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonCardSubtitle,IonRow,IonCol
} from '@ionic/vue'

import { trashOutline,addCircleOutline,removeCircleOutline,cartOutline,arrowForwardCircle } from 'ionicons/icons';
import Modal from '/src/layouts/CheckoutModal.vue';

export default {
    components: {
        IonPage,
        IonList,
        IonCheckbox,
        // IonItem,
        // IonCheckbox,
        // IonLabel, 
        // IonButton,
        // IonIcon,
        // IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonRow,IonCol
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
        },
        async openModal() {
            const modal = await modalController
                .create({
                component: Modal,
                componentProps: {
                    title: 'Title'
                },
                })
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
  bottom: 35px;
  transform: translate(-50%, 0);
}
ion-checkbox {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    --border-radius: 5px;
    --border-color: #433f3f;
}
</style>