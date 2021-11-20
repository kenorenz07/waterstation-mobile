<template>
  <ion-header>
    <ion-toolbar style="--background: transparent; --border-width: 0; padding: 30px 10px 15px;">
      <ion-buttons slot="start">
        <ion-button  color="primary" slot="end" @click="closeModal" fill="outline">
          <ion-icon  :icon="arrowBackOutline" slot="icon-only" ></ion-icon>
        </ion-button>
      </ion-buttons>
      <div class="loii-modal-title">
        <h4 class="ion-text-center">SOLD ID : #{{sale.id}}</h4>
      </div>
     
    </ion-toolbar>
    <div>
      <ion-row>
        <ion-col>
          <span style="color: #000;"><strong>Items ordered:</strong> {{sale_products.length}}</span>
        </ion-col>
        <ion-col>
                <span style="margin: 5px 0;"><strong> Total Price:</strong> ₱ {{sale.total}}</span>
        </ion-col>
      </ion-row>
    </div>
  </ion-header>
  <ion-content class="ion-padding">
    
    <div class="product-list">
      <ion-item v-for="(item_from_sale,i) in sale_products" :key="i">
          <ion-grid>
            <ion-row>
                <ion-col style="display: flex; align-items: center; gap: 20px;">
                <ion-img style="width:25%;" :src="'http://3.144.168.4/storage/' + item_from_sale.product.image"></ion-img>
                <div>
                  <span style="font-size: 18px;"><strong>Product Name:</strong> {{item_from_sale.product.name}}</span><br>
                  <span style="font-size: 14px;"><strong>Item Description:</strong> {{item_from_sale.product.description}}</span>
                </div>
                </ion-col>
            </ion-row>
            <ion-row style="align-items: center;">
              <ion-col>
                <div>
                  <span>{{item_from_sale.product.is_refill ? 'For refill' : 'Container is for sale'}}</span><br>
                  <span style="font-size: 14px;"><strong>Quantity: </strong>{{item_from_sale.quantity}}</span>
                </div>
              </ion-col>
              <ion-col>
                <h2>₱ {{item_from_sale.total_price}}</h2>
              </ion-col>
            </ion-row>
          </ion-grid>
      </ion-item>
    </div>
    <div class="sale-details">
      <ion-grid>
        <ion-row>
          <ion-col size="8">
            <div  v-if="sale.user_id">
              <div>
                  <p><strong>Customer:</strong></p>
              </div>
              <div>
                <ion-avatar class="">
                    <ion-img :src="'http://3.144.168.4/storage/' + sale.user.image"></ion-img>
                </ion-avatar>
                <div class="">
                    <span><strong>{{sale.user.name}}</strong></span><br>
                    <span>{{sale.user.phone_number}}</span>
                </div>
              </div>
            </div>
            <div>
              <ion-row>
              </ion-row>
            </div>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
              <p><strong>Customer Address:</strong></p>
              <p>
                <span><strong>Purok : </strong></span><br>
                <span>{{ sale.user.purok ? sale.user.purok : 'Not defined'}}</span>
              </p>
              <p>
                <span><strong>Barangay : </strong></span><br>
                <span>{{ sale.user.brgy ? sale.user.brgy : 'Not defined'}}</span>
              </p>
              <p>
                <span><strong>City : </strong></span><br>
                <span>{{ sale.user.city ? sale.user.city : 'Not defined'}}</span>
              </p>
          </ion-col>
          <ion-col>
              <p style="margin-top:55px">
                <span><strong>Landmark : </strong></span><br>
                <span>{{ sale.user.landmark ? sale.user.landmark : 'Not defined'}}</span>
              </p>
              <p >
                <span><strong>Additional address : </strong></span><br>
                <span>{{ sale.user.additional_address ? sale.user.additional_address : 'Not defined'}}</span>
              </p>
          </ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
                <div>
                    <p>
                        <span><strong>Time Delivered : </strong></span><br>
                        <span>{{ sale.date_delivered ? sale.date_delivered : 'Not defined'}}</span>
                    </p>
                </div>
          </ion-col>
            <ion-col>
                <p>
                    <span><strong>Date Delivered: </strong></span><br>
                    <span>{{ sale.time_delivered ? sale.time_delivered : 'Not defined'}}</span>
                </p>
            </ion-col>
        </ion-row>
      </ion-grid>
    </div>
    
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
  IonDatetime,
  IonLabel,
  modalController
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';

export default {
  name: 'Modal',
  props: {
    sale: {
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
    IonDatetime,
    IonLabel,

  },
  ionViewWillEnter () {
    console.log(this.sale)
  },
  data : () => ({
    arrowBackOutline,
  }), 
  mounted (){
  },
  computed : {
    sale_products(){
        return JSON.parse(this.sale.orders)
    }
  },
  watch : {
      time_to_deliver(val) {
          console.log(val,'time_to_deliver')
      }
  },
  methods : {
    closeModal(){
      return modalController.dismiss();
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
  height: 200px;
  overflow-y: scroll;
}
.sale-details {
  border-top: 1px solid; 
}
.sale-details>ion-grid {
  padding: 0;
}
.sale-details>ion-grid ion-row ion-col{
  padding: 0;
}
.sale-details>ion-grid ion-row ion-col:last-child div{
  padding: 0 15px;
}
.sale-details>ion-grid ion-row ion-col:first-child>div{
  padding: 0 15px;
}
.sale-details>ion-grid ion-row ion-col:first-child>div>div:first-child p{
  margin: 5px 0;
}
.sale-details>ion-grid ion-row ion-col:first-child>div>div:last-child{
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