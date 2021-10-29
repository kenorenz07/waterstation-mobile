<template>
  <ion-header>
    <ion-toolbar style="--background: transparent; --border-width: 0; padding: 30px 10px 15px;">
      <ion-buttons slot="start">
        <ion-button  color="primary" slot="end" @click="closeModal" fill="clear">
            <ion-icon  :icon="arrowBackOutline" slot="icon-only" ></ion-icon>
        </ion-button>   
      </ion-buttons>
      <p slot="end" class="loii-product-refill-sale">{{product.is_refill ? 'For refill' : 'Container is for sale'}}</p>
      <!-- <ion-title>{{ title }}</ion-title> -->
      <!-- <ion-avatar slot="end">
        <ion-img :src="'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'"></ion-img>
      </ion-avatar> -->
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
      <div class="product-thumbnail">
        <ion-img :src="product.image ? 'http://3.144.168.4/storage/' + product.image :'../assets/img/no-image.png'">
        </ion-img>
      </div>
      <div class="product-header">
        <h1 class="loii-title">{{product.name}}</h1>
        <span class="loii-price">{{product.description}}</span>
      </div>
      <!-- <ion-grid>
        <ion-row class="loii-align-center">
          <ion-col> -->
            <div class="product-details">
              <div class="product-variant">
                <!-- <ion-row> -->
                  <!-- <ion-col> -->
                    <div>
                    <!-- <p class="loii-desc-head">Price per Product</p> -->
                    <p class="loii-desc"><span>Price: </span> ₱ {{product.price}}</p>
                    </div>
                    <!-- <p class="loii-desc-head">Total Price</p> -->
                    <!-- <p class="loii-desc-price">₱ {{ total_price_calculated.toFixed(2)}}</p> -->
                    <div class="loii-quantity">
                    <p>Quantity</p>
                      <div class="product-add">
                        <ion-buttons>
                          <ion-button :disabled="quantity == 1" @click="quantity--">-</ion-button>
                        </ion-buttons>
                        <ion-label>{{quantity}}</ion-label>
                        <ion-buttons>
                          <ion-button @click="quantity++">+</ion-button>
                        </ion-buttons>
                      </div>
                    </div>
                  <!-- </ion-col> -->
                <!-- </ion-row> -->
              </div>
            </div>
          <!-- </ion-col>
          <ion-col>
            
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
          </ion-col>
          <ion-col>
             
          </ion-col>
        </ion-row> -->
      <!-- </ion-grid> -->
       <div class="addToCart">
            <ion-button expand="block" fill="solid" color="primary" @click="addToCart(product.id,)">Add to Cart</ion-button>
        </div>
  </ion-content>
</template>

<script>
import { 
  IonContent,
  IonHeader,
  // IonAvatar,  
  IonToolbar,
  IonButton,
  IonButtons,
  IonImg,
  // IonCol,
  // IonRow,
  IonLabel,
  // IonGrid,
  IonIcon,
  modalController,
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';

export default {
  components: { 
    IonContent,
    IonHeader,
    // IonAvatar, 
    IonToolbar,
    IonButton,
    IonButtons,
    IonImg,
    // IonCol,
    // IonRow,
    IonLabel,
    // IonGrid,
    IonIcon,
  },
  props: {
    product : {
      required: true,
      default: {
        id:null,
        name : '',
        description:'',
        is_refill: true,
        price: 0.0,
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F2180657%2Fadd_add_photo_upload_plus_icon&psig=AOvVaw2bCaC6AsrefFBHZ3Id8IAP&ust=1632066273765000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIC3-ejuiPMCFQAAAAAdAAAAABAD',
      }
    }
  },
  data : () => ({
    arrowBackOutline,
    quantity: 1,
  }),
  computed : {
    total_price_calculated(){
      return this.product.price * this.quantity
    }
  },
  ionViewWillEnter () {
    console.log(this.product)
  },
  mounted (){
    console.log(this.product)
  },
  methods : {
    closeModal(){
      return modalController.dismiss();
    },
    addToCart(){
        this.$axios.post(`user/v1/cart/add/${this.product.id}`,{quantity : this.quantity}).then(({data})=> {
            console.log(data,'cart')
            return modalController.dismiss();

        })
    },
  }
};
</script>
<style scoped>
.loii-align-center {
    align-items: center;
}
.loii-desc {
  font-weight: 500;
  font-size: 24px;
}
.loii-desc span{
  font-weight: 500;
  font-weight: 400;
  font-size: 24px;
}
.loii-title{
  font-size: 36px;
  font-weight: 500;
}
.loii-price{
  font-size: 18px;
  font-weight: 400;
  color: #6490dd;
  line-height: 1rem;
}
.loii-desc-price {
  color: #40ae19;
  font-size: 26px;
}
.loii-desc-head {
  margin-top:10px;
  color: #9d9595;
  font-size: 18px;
}
.loii-product-refill-sale {
  color: #000;
}
.product-add {
    display: flex;
    align-items: center;
    justify-content: space-around;
        width: 50%;
    padding: 5px 0px;
    margin: 25px 0;
    background: linear-gradient(
337deg, #fd1d1d, #fcb045);
    border-radius: 5px;
}
.product-add ion-label,
.product-add ion-button{
  color: #fff;
  font-size: 28px;
}
/* .addToCart {
  position: absolute;
  width: 90%;
  left: 50%;
  bottom: 35px;
  transform: translate(-50%, 0);
} */
.loii-quantity {
  display: flex;
  align-items: center;
  gap: 20px;
}
.product-header {
      display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}
</style>