<template>
  <ion-header>
    <ion-toolbar style="--background: transparent; --border-width: 0; padding: 30px 10px 15px;">
      <ion-buttons slot="start">
        <ion-button  color="primary" slot="end" @click="closeModal" fill="outline">
          <ion-icon  :icon="arrowBackOutline" slot="icon-only" ></ion-icon>
        </ion-button>   
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <h1 class="text-2xl font-bold flex justify-center mb-2">Products</h1>
    <div class="product-lists border-2">
      <ion-list>
        <ion-item v-for="(item_to_order,i) in items " :key="i">
          <ion-grid>
            <ion-row>
              <ion-col>
                <h1>Name : {{item_to_order.product.name}}</h1>
                <span>Desc. : {{item_to_order.product.description}}</span>
                <h1>{{item_to_order.product.is_refill ? 'For refill' : 'Container is for sale'}}</h1>
              </ion-col>
              <ion-col>
                <h1>Price : ₱ {{item_to_order.total_price}}</h1>
                <span>Quantity : {{item_to_order.quantity}}</span>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-list>
    </div>
    <div class="mt-2">
        <h1 class="text-2xl font-bold flex justify-center ">Selected items : {{items.length}}</h1>
        <h1 class="text-2xl font-bold flex justify-center ">Total : ₱ {{total_price_products.toFixed(2)}}</h1>
        <ion-button @click="placeOrder" class="mt-5 text-2xl " expand="block" color="danger">Place order</ion-button>
    </div>
    
  </ion-content>
</template>

<script>
import { 
  IonContent,
  IonHeader,
  // IonAvatar,
  // IonImg,
  IonToolbar,
  IonButtons,
  IonCol,
  IonRow,
  IonGrid,
  IonList,
  IonItem,
  IonButton,
  IonIcon,
  modalController
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';

export default {
  name: 'Modal',
  props: {
    items: {
      required: true,
    }
  },
  //  "product" : cart.product,
  //   "quantity" : cart.quantity,
  //   "total_price" : cart.total_price
  // },
  components: { 
    IonContent,
    IonHeader,
    // IonAvatar,  
    // IonImg,
    IonToolbar,
    IonButtons,
    IonCol,
    IonRow,
    IonGrid,
    IonList,
    IonItem,
    IonButton,
    IonIcon,

  },
  ionViewWillEnter () {
    console.log(this.items)
  },
  data : () => ({
    arrowBackOutline,
    
  }), 
  mounted (){
    console.log(this.items)
  },
  computed : {
    total_price_products() {
      if(this.items.lenght < 1) return 0;
      else {
        let total = 0;
        this.items.forEach(item => {
          total += item.total_price
        });

        return total;
      }
    }
  },
  methods : {
    closeModal(){
      return modalController.dismiss();
    },
    placeOrder(){
      this.$axios.post('user/v1/place-order/', {orders: this.items}).then(({data}) => {
        data
        return modalController.dismiss();
      })
    }
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
.product-lists {
  max-height: 65%;
  overflow-y: scroll;
}
/* .product-add {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 5px 0px;
    margin: 25px;
    background: linear-gradient(
337deg, #fd1d1d, #fcb045);
    border-radius: 5px;
}
.product-add ion-label,
.product-add ion-button{
  color: #fff;
  font-size: 28px;
}
.addToCart {
  position: absolute;
  width: 90%;
  left: 50%;
  bottom: 35px;
  transform: translate(-50%, 0);
} */
</style>