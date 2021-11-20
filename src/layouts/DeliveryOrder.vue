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
                <h2>₱ {{item_to_order.total_price}}</h2>
              </ion-col>
            </ion-row>
          </ion-grid>
      </ion-item>
    </div>
    <div class="order-details">
      <ion-grid>
        <ion-row>
          <ion-col>
            <div  v-if="order.user_id">
              <div>
                  <p><strong>Customer:</strong></p>
              </div>
              <div>
                <ion-avatar class="">
                    <ion-img :src="'http://3.144.168.4/storage/' + order.user.image"></ion-img>
                </ion-avatar>
                <div class="">
                    <span><strong>{{order.user.name}}</strong></span><br>
                    <span>{{order.user.phone_number}}</span>
                </div>
              </div>
            </div>
            <div v-else><span><strong>Deliver by:</strong>Not yet assinged</span></div>
            <div>
              <ion-row>
                <span style="margin: 5px 0;"><strong> Total Price:</strong> ₱ {{order.total}}</span>
              </ion-row>
            </div>
          </ion-col>
          <ion-col>
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
        </ion-row>
        <ion-row>
            <ion-col>
              <p><strong>Customer Address:</strong></p>
              <p>
                <span><strong>Purok : </strong></span><br>
                <span>{{ order.user.purok ? order.user.purok : 'Not defined'}}</span>
              </p>
              <p>
                <span><strong>Barangay : </strong></span><br>
                <span>{{ order.user.brgy ? order.user.brgy : 'Not defined'}}</span>
              </p>
              <p>
                <span><strong>City : </strong></span><br>
                <span>{{ order.user.city ? order.user.city : 'Not defined'}}</span>
              </p>
          </ion-col>
          <ion-col>
              <p style="margin-top:55px">
                <span><strong>Landmark : </strong></span><br>
                <span>{{ order.user.landmark ? order.user.landmark : 'Not defined'}}</span>
              </p>
              <p >
                <span><strong>Additional address : </strong></span><br>
                <span>{{ order.user.additional_address ? order.user.additional_address : 'Not defined'}}</span>
              </p>
          </ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
                <ion-item>
                    <ion-label position="floating">Set Time</ion-label>
                    <ion-datetime display-format="h:mm a" v-model="time_to_deliver"></ion-datetime>
                </ion-item>
            </ion-col>
            <ion-col>
                <ion-item>
                    <ion-label position="floating">Set Date("MM/DD/YYYY")</ion-label>
                    <ion-datetime display-format="MM/DD/YYYY" v-model="date_to_deliver"></ion-datetime>
                </ion-item>
            </ion-col>
        </ion-row>
        <ion-button expand="block" color="warning" @click="setDateAndTimeToDeliver">Set Time</ion-button>
        <ion-button expand="block" color="secondary" @click="changeStatus('on-the-way')">Update to OTW</ion-button>
        <ion-button expand="block" color="success" @click="changeStatus('delivered')">Update to Delivered</ion-button>
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
    IonDatetime,
    IonLabel,

  },
  ionViewWillEnter () {
    console.log(this.order)
    this.date_to_deliver = this.order.date_to_deliver? this.order.date_to_deliver :  (new Date()).toISOString().split('T')[0]
    this.time_to_deliver = this.order.time_to_deliver? this.order.time_to_deliver :  "12:00"
  },
  data : () => ({
    arrowBackOutline,
    date_to_deliver: (new Date()).toISOString().split('T')[0],
    time_to_deliver: "12:00", 
  }), 
  mounted (){
    console.log(this.order)
    this.date_to_deliver = this.order.date_to_deliver? this.order.date_to_deliver :  (new Date()).toISOString().split('T')[0]
    this.time_to_deliver = this.order.time_to_deliver? this.order.time_to_deliver :  "12:00"
  },
  computed : {
    orders_products(){
        return JSON.parse(this.order.orders)
    }
  },
  watch : {
      time_to_deliver(val) {
          console.log(val,'time_to_deliver')
      }
  },
  methods : {
    setDateAndTimeToDeliver(){
        this.$axios.post('/delivery_man/v1/order-set-delivery-time-date/'+this.order.id,
        {
            time_filter:this.time_to_deliver,
            date_filter:this.date_to_deliver
        }).then(({data}) => {
            data
            this.closeModal()
        })
    },
    changeStatus(status) {
        this.$axios.post('/delivery_man/v1/order/status/'+this.order.id,{status:status}).then(({data}) => {
            data
            this.closeModal()
        })
    },
    closeModal(){
      return modalController.dismiss();
    },
    getStatus(status){
        if(status == 'on-the-way')  return '#e98797'
        else if(status == 'assigned-to-driver')  return '#d8a648'
        else if(status == 'pending')  return '#c0c038'
        else if(status == 'delivered')  return '#337382'
        else if(status == 'accepted')  return '#40bb40'
        else if(status == 'denied')  return '#c24242'
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
  height: 200px;
  overflow-y: scroll;
}
.order-details {
  border-top: 1px solid; 
}
.order-details>ion-grid {
  padding: 0;
}
.order-details>ion-grid ion-row ion-col{
  padding: 0;
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