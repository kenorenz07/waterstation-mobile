<template>
  <ion-page>
    <section>
      <ion-list>
        <ion-card
          @click="openModal(product)"
          v-for="product in products"
          :key="product.id"
        >
          <ion-row class="loii-align-center">
            <figure>
              <ion-row class="loii-align-center">
                <ion-col>
                  <ion-img
                    class="loii-img"
                    :src="'http://3.144.168.4/storage/' + product.image"
                  ></ion-img>
                </ion-col>
                <ion-col>
                  <figcaption>
                    <h1 class="mb-3 loii-product-title">
                      <strong>{{ product.name }}</strong>
                    </h1>
                    <h1 class="mb-5 loii-white-space">
                      {{ product.description }}
                    </h1>
                    <!-- <h1 class="mb-5">{{product.is_refill ? 'For refill' : 'Container is for sale'}}</h1> -->
                    <span class="mb-10 loii-price">₱ {{ product.price }}</span>
                  </figcaption>
                </ion-col>
              </ion-row>
            </figure>
          </ion-row>
        </ion-card>
      </ion-list>
    </section>
  </ion-page>
</template>

<script>
import { 
    IonList, 
    IonCard,
    IonPage,
    IonRow,
    IonImg,
    IonCol,
    modalController
    } from '@ionic/vue'
import { addCircleOutline,removeCircleOutline,cartOutline } from 'ionicons/icons';
import Modal from '/src/layouts/ProductModal.vue';

export default {
    components : {
        IonList, 
        IonCard,
        IonPage,
        IonRow,
        IonImg,
        IonCol,
    },
    data : () => ({
        addCircleOutline,
        removeCircleOutline,
        cartOutline,
        products : []
    }),
    ionViewWillEnter () {
        this.initialize()
    },
    mounted (){
        this.initialize()
    },
    methods : {
        initialize(){
            this.$axios.get('/user/v1/product/all').then(({data}) => {
                this.products = data

                this.products.forEach((product) => {
                    product.quantity = 0
                })
            })
        },
        addToCart(product_id,quantity){
            this.$axios.post(`user/v1/cart/add/${product_id}`,{quantity}).then(({data})=> {
                console.log(data,'cart')
            })
        },
         async openModal(product) {
            const modal = await modalController
                .create({
                component: Modal,
                    componentProps: {
                        product : {
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            is_refill: product.is_refill,
                            price: product.price,
                            image: product.image,
                        }
                    },
                })

            modal.onDidDismiss()
            .then(() => {
                this.$store.dispatch('updateCartNumber')
            });
            return modal.present();
        },
    },
}
</script>

<style scoped>
.filter-container {
  padding: 20px;
  padding-bottom: 0;
}
.loii-align-center {
  align-items: center;
}
.loii-margin {
  margin: 24px 0;
}
.loii-img {
  height: auto;
  width: 75%;
  margin: auto;
}
/* ion-card-content {
    display: flex;
} */
.ion-page {
  overflow-y: scroll;
}
.loii-price {
  color: #2b9adf;
  font-size: 20px;
}
.loii-white-space {
  white-space: break-spaces;
}
.loii-product-title {
  font-size: 24px;
}
</style>