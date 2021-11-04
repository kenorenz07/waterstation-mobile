<template>
  <ion-header>
    <ion-toolbar style="--background: transparent; --border-width: 0; padding: 30px 10px 15px;">
      <ion-buttons slot="start">
        <ion-button  color="primary" slot="end" @click="closeModal" fill="outline">
          <ion-icon  :icon="arrowBackOutline" slot="icon-only" ></ion-icon>
        </ion-button>
      </ion-buttons>
      <div class="loii-modal-title">
        <h4 class="ion-text-center">ORDER ID : #{{order.id}}</h4>
      </div>
     
    </ion-toolbar>
    <div>
      <ion-row>
        <ion-col>
          <span style="color: #000;"><strong>Items ordered:</strong> {{orders_products.length}}</span>
        </ion-col>
        <ion-col>
           <div class="loii-container">
              <p><strong style="color: #000;">STATUS:</strong><span :style="`background-color: ${getStatus(order.status)};`">{{order.status}}</span></p>
              
            </div>
        </ion-col>
      </ion-row>
    </div>
  </ion-header>
  <ion-content class="ion-padding">
    
    <div class="product-list">
      <ion-item v-for="(item_to_order,i) in orders_products" :key="i">
          <ion-grid>
            <ion-row>
                <ion-col style="display: flex; align-items: center; gap: 20px;">
                <ion-img style="width:25%;" :src="'http://3.144.168.4/storage/' + item_to_order.product.image"></ion-img>
                <div>
                  <span style="font-size: 18px;"><strong>Product Name:</strong> {{item_to_order.product.name}}</span><br>
                  <span style="font-size: 14px;"><strong>Item Description:</strong> {{item_to_order.product.description}}</span>
                </div>
                </ion-col>
            </ion-row>
            <ion-row style="align-items: center;">
              <ion-col>
                <div>
                  <span>{{item_to_order.product.is_refill ? 'For refill' : 'Container is for sale'}}</span><br>
                  <span style="font-size: 14px;"><strong>Quantity: </strong>{{item_to_order.quantity}}</span>
                </div>
              </ion-col>
              <ion-col>
                <h2>₱ {{item_to_order.product.total_price}}</h2>
              </ion-col>
            </ion-row>
          </ion-grid>
      </ion-item>
    </div>
    <div class="order-details">
      <ion-grid>
        <ion-row>
          <ion-col>
            <div  v-if="order.delivery_man_id">
              <div>
                  <p><strong>Delivery Man:</strong></p>
              </div>
              <div>
                <ion-avatar class="">
                    <ion-img :src="'http://3.144.168.4/storage/' + order.delivery_man.image"></ion-img>
                </ion-avatar>
                <div class="">
                    <span><strong>{{order.delivery_man.name}}</strong></span><br>
                    <span>{{order.delivery_man.phone_number}}</span>
                </div>
              </div>
            </div>
            <div v-else><span><strong>Deliver by:</strong>Not yet assinged</span></div>
            <div>
              <p>
                <span><strong>Time to deliver : </strong></span><br>
                <span>{{ order.date_to_deliver ? order.date_to_deliver : 'Not defined'}}</span>
              </p>
              <p>
                <span><strong>Date to Deliver: </strong></span><br>
                <span>{{ order.time_to_deliver ? order.time_to_deliver : 'Not defined'}}</span>
              </p>
            </div>
          </ion-col>
          <ion-col>
            <div>
              <ion-row>
                <span style="margin: 5px 0;"><strong>Price:</strong> ₱ </span>
              </ion-row>
              <ion-row>
                <span style="margin: 5px 0;"><strong>Total price:</strong> ₱ </span>
              </ion-row>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>

    <!-- <div class="border-2 product-lists">
      <ion-list>
        <ion-item v-for="(item_to_order,i) in orders_products" :key="i">
          <ion-grid>
            <ion-row>
              <ion-col>
                <h1>Name : {{item_to_order.product.name}}</h1>
                <span>Desc. : {{item_to_order.product.description}}</span>
                <h1>{{item_to_order.product.is_refill ? 'For refill' : 'Container is for sale'}}</h1>
                <span>Quantity : {{item_to_order.quantity}}</span>
              </ion-col>
              <ion-col>
                <h1>Product price : </h1>
                <h1 class="pl-2 font-semibold">₱ {{item_to_order.product.price}}</h1>
                <h1>Total Price :</h1>
                <h1 class="pl-2 font-semibold"> ₱ {{item_to_order.total_price}}</h1>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-list>
    </div>
    <h1 class="text-2xl text-center text-white rounded-2xl " :class="`bg-${getStatus(order.status)}-600`">STATUS {{order.status}}</h1>
    <ion-grid>
        <ion-row>
            <ion-col>
                <h1 class="mt-3 text-2xl font-semibold">Total : </h1>
                <h1 class="pl-2 text-2xl font-semibold"> ₱ {{order.total}} </h1>
                <h1  class="text-2xl">Time to deliver : </h1>
                <h1 class="pl-2 text-xl">{{ order.date_to_deliver ? order.date_to_deliver : 'Not defined'}}</h1>
                <h1  class="text-2xl">Date to Deliver: </h1>
                <h1 class="pl-2 text-xl">{{ order.time_to_deliver ? order.time_to_deliver : 'Not defined'}}</h1>

            </ion-col>
            <ion-col>
                <h1 class="mt-3 text-xl font-semibold">Delivery man : </h1>
                <div  v-if="order.delivery_man_id">
                    <ion-avatar class="w-20 h-20">
                        <ion-img :src="'http://3.144.168.4/storage/' + order.delivery_man.image"></ion-img>
                    </ion-avatar>

                    <div class="mt-3 text-xl font-semibold">
                        <h1>{{order.delivery_man.name}}</h1>
                        <h1>{{order.delivery_man.phone_number}}</h1>
                    </div>
                </div>
                <div v-else>Not defined</div>
            </ion-col>
        </ion-row>

    </ion-grid> -->
    <!-- <div class="mt-2">
        <h1 class="flex justify-center text-2xl font-bold ">Selected order : {{order.length}}</h1>
        <h1 class="flex justify-center text-2xl font-bold ">Total : ₱ {{total_price_products.toFixed(2)}}</h1>
        <ion-button @click="placeOrder" class="mt-5 text-2xl " expand="block" color="danger">Place order</ion-button>
    </div> -->
    
  </ion-content>
</template>

<script>
import { 
  IonContent,
  IonHeader,
  IonAvatar,
  IonImg,
  IonToolbar,
  IonButtons,
  IonCol,
  IonRow,
  IonGrid,
  // IonList,
  IonItem,
  IonButton,
  IonIcon,
  modalController
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';

export default {
  name: 'Modal',
  props: {
    order: {
        required: true,
        type: Object,
    }
  },
  components: { 
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonCol,
    IonRow,
    IonGrid,
    // IonList,
    IonItem,
    IonButton,
    IonIcon,
    IonImg,
    IonAvatar,

  },
  ionViewWillEnter () {
    console.log(this.order)
  },
  data : () => ({
    arrowBackOutline,
    
  }), 
  mounted (){
    console.log(this.order)
  },
  computed : {
    orders_products(){
        return JSON.parse(this.order.orders)
    }
  },
  methods : {
    closeModal(){
      return modalController.dismiss();
    },
    getStatus(status){
        if(status == 'on-the-way')  return '#2ECC71'
        else if(status == 'assinged-to-driver')  return '#fab000'
        else if(status == 'pending')  return '#FBD254'
        else if(status == 'delivered')  return '#2ECC71'
        else if(status == 'accepted')  return '#2C3E50'
        else if(status == 'denied')  return '#E74C3C'
        else return 'black'
    },
  }
};
</script>
<style scoped>
.loii-desc {
  font-weight: 500;
  font-size: 24px;
}
.loii-title{
  font-size: 36px;
  font-weight: 500;
}
.loii-price{
    font-size: 24px;
    font-weight: 700;
    color: #914a91;
}
.loii-desc-price {
  color: #40ae19;
  font-size: 20px;
}
.loii-desc-head {
  color: #9d9595;
  font-size: 18px;
}
.product-list {
  height: 275px;
  overflow-y: scroll;
}
.order-details {
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  border-top: 1px solid; 
}
.order-details>ion-grid {
  padding: 0;
}
.order-details>ion-grid ion-row ion-col{
  padding: 0;
  border-right: 1px solid;
}
.order-details>ion-grid ion-row ion-col:last-child div{
  padding: 0 15px;
}
.order-details>ion-grid ion-row ion-col:first-child>div{
  padding: 0 15px;
}
.order-details>ion-grid ion-row ion-col:first-child>div>div:first-child p{
  margin: 5px 0;
}
.order-details>ion-grid ion-row ion-col:first-child>div>div:last-child{
    display: flex;
    justify-content: space-between;
}
.loii-modal-title {
  color: #000;
}
.loii-modal-title h4 {
  margin: 0;
}
.loii-container {
  border-radius: 6px;
}
.loii-container strong {
  margin-right: 5px;
}
.loii-container p {
    text-align: center;
    margin: 0;
    margin-bottom: 5px;
}
.loii-container span {
    color: rgb(255, 255, 255);
    text-transform: capitalize;
    font-weight: 600;
    padding: 5px 15px;
    border-radius: 25px;
}
</style>