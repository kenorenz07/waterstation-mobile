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
    <div class="product-lists">
      <ion-list>
        <ion-item>
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-img src="https://e7.pngegg.com/pngimages/725/706/png-clipart-drinking-water-mineral-water-bottles-mineral-water.png"></ion-img>
              </ion-col>
              <ion-col>
                <h1>Product Title</h1>
                <span>Product Desc</span>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-list>
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