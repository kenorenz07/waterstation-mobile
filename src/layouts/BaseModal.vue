<template>
  <ion-header>
    <ion-toolbar style="--background: transparent; --border-width: 0; padding: 30px 10px 15px;">
      <ion-buttons slot="start">
          <ion-back-button defaultHref="/dashboard/products" color="dark"></ion-back-button>
      </ion-buttons>
      <!-- <ion-title>{{ title }}</ion-title> -->
      <ion-avatar slot="end">
        <ion-img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"></ion-img>
      </ion-avatar>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
      <div class="product-header">
        <h1 class="loii-title">Product Name</h1>
        <span class="loii-price">total Price ex. P100.00</span>
      </div>
      <ion-grid>
        <ion-row>
          <ion-col>
            <div class="product-details">
              <div class="product-variant">
                <ion-row>
                  <ion-col>
                    <ion-img src="../assets/img/water.png"></ion-img>
                  </ion-col>
                  <ion-col>
                    <span class="loii-desc-head">Size</span>
                    <p class="loii-desc">Medium</p>
                    <p class="loii-desc-price">P 20.00</p>
                  </ion-col>
                </ion-row>
              </div>
              <!-- <div class="product-shipment-fee">
                <ion-row>
                  <ion-col>
                    <ion-icon name="card-outline"></ion-icon>
                  </ion-col>
                  <ion-col>
                    <span class="loii-desc-head">Shipping Fee</span>
                    <p class="loii-desc">2.5 km</p>
                    <p class="loii-desc-price">P 5.00</p>
                  </ion-col>
                </ion-row>
              </div>
              <div class="product-delivery-time">
                <ion-row>
                  <ion-col>
                    <ion-img src="../assets/img/water.png"></ion-img>
                  </ion-col>
                  <ion-col>
                    <span class="loii-desc-head">Delivery in</span>
                    <p class="loii-desc">10 Min</p>
                    <p class="loii-desc-price">Motobike</p>
                  </ion-col>
                </ion-row>
              </div> -->
            </div>
          </ion-col>
          <ion-col>
            <div class="product-thumbnail">
              <ion-img src="https://cdn.shopify.com/s/files/1/0297/0429/0397/products/Sip_Water_Bottle_500ml_800x.jpg?v=1588434244">
              </ion-img>
            </div>
            <div class="product-add">
              <ion-buttons>
                <ion-button>-</ion-button>
              </ion-buttons>
              <ion-label>2</ion-label>
              <ion-buttons>
                <ion-button>+</ion-button>
              </ion-buttons>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
       <div class="addToCart">
            <ion-button expand="block" fill="solid" color="danger">Add to Cart</ion-button>
        </div>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonAvatar, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  // data() {
  //   return {
  //     content: 'Content',
  //   }
  // },
  components: { IonContent, IonHeader, IonAvatar, IonToolbar }
});
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
.product-add {
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
}
</style>