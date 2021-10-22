<template>
    <ion-page>
        <!-- <ion-content> -->
            <!-- <section id="search-wrapper">
                <div class="content">
                    <ion-searchbar animated></ion-searchbar>
                </div>
            </section>
            <section id="dashboard-content">
                <ion-card>
                    <ion-card-content>
                        <ion-img src="https://e7.pngegg.com/pngimages/725/706/png-clipart-drinking-water-mineral-water-bottles-mineral-water.png"></ion-img>
                        <ion-grid>
                            <ion-row>
                                <h1>Product Name Kens</h1>
                                <p>This is short description of product</p>
                                <ion-button fill="solid" shape="round">
                                    <ion-icon slot="start" :icon="addCircleOutline"></ion-icon>
                                    Add to cart
                                </ion-button>
                            </ion-row>
                        </ion-grid>
                    </ion-card-content>
                </ion-card>
            </section> -->
            <ion-list>
                <ion-card @click="openModal" v-for="product in products" :key="product.id">
                    <ion-row class="loii-align-center">
                        <figure>
                            <ion-row class="loii-align-center">
                                <ion-col>
                                    <ion-img class="loii-img" src="'http://3.144.168.4/storage/' + product.image"></ion-img>
                                </ion-col>
                                <ion-col>
                                    <figcaption>
                                        <h1 class="mb-3 ml-5">{{product.name}}</h1>
                                        <h1 class="mb-5 ml-5">{{product.description}}</h1>
                                        <span class="mb-10 ml-5">₱ {{product.price}}</span>
                                    </figcaption>
                                </ion-col>
                            </ion-row>
                        </figure>
                    </ion-row>
                </ion-card>
                    <!-- <ion-card v-for="product in products" :key="product.id">
                        <ion-row class="loii-align-center">
                            <figure>
                                <ion-row class="loii-align-center">
                                    <ion-col>
                                        <ion-img class="loii-img" :src="'http://192.168.254.118:8000/storage/' + product.image"></ion-img>
                                    </ion-col>
                                    <ion-col>
                                        <figcaption>
                                            <h1 class="mb-3 ml-5">{{product.name}}</h1>
                                            <h1 class="mb-5 ml-5">{{product.name}}</h1>
                                            <span class="mb-10 ml-5">₱ {{product.price}}</span>
                                        </figcaption>
                                    </ion-col>
                                </ion-row>
                            </figure>
                            
                        </ion-row>

                    </ion-card> -->
                    <!-- <ion-col>
                        <ion-row>
                            <ion-col>
                                <ion-input type="text" disabled>
                                    {{product.quantity}}
                                </ion-input>
                            </ion-col>
                            <ion-col>
                                <ion-button @click="product.quantity--" fill="solid">
                                    <ion-icon  slot="icon-only" :icon="removeCircleOutline"></ion-icon>
                                </ion-button>
                                <ion-button @click="product.quantity++" fill="solid">
                                    <ion-icon  :icon="addCircleOutline"></ion-icon>
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-col>
                        <ion-button @click="addToCart(product.id,product.quantity)">
                            <ion-icon  :icon="cartOutline" slot="end" ></ion-icon>
                        </ion-button> -->
            </ion-list>
        <!-- </ion-content> -->
    </ion-page>
</template>

<script>
// import {   
//     IonSearchbar,
//     IonCard,
//     IonCardContent,
//     IonImg,
//     IonGrid,
//     IonRow,
//     IonButton,
//     IonIcon,
//     IonPage
// } from '@ionic/vue'
// import { addCircleOutline} from 'ionicons/icons';
import { 
    IonList, 
    // IonItem,
    IonCard,
    // IonCardContent,
    // IonLabel, 
    IonPage,
    // IonIcon,
    // IonButton,
    IonRow,
    modalController
    // IonContent
    } from '@ionic/vue'
import { addCircleOutline,removeCircleOutline,cartOutline } from 'ionicons/icons';
import Modal from '/src/layouts/ProductModal.vue';



export default {
    components : {
        // IonSearchbar,
        // IonCard,
        // IonCardContent,
        // IonImg,
        // IonGrid,
        // IonRow,
        // IonButton,
        // IonIcon,
        // IonPage

        IonList, 
        // IonItem,
        IonCard,
        // IonCardContent, 
        // IonLabel, 
        IonPage,
        // IonIcon,
        // IonButton,
        IonRow,
        // IonContent


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
         async openModal() {
            const modal = await modalController
                .create({
                component: Modal,
                componentProps: {
                    // product: this.data(this.products),
                    // productName: product.name,
                    // productPrice: product.price,
                    // productDesc: product.description,
                    // productImg: "'http://3.144.168.4/storage/' + product.image"
                },
                })
            return modal.present();
        },
    },
}
</script>

<style scoped>
.loii-align-center {
    align-items: center;
}
.loii-margin {
    margin: 24px 0;
}
.loii-img{
    height: auto;
    width: 75%;
    margin: auto;
}
/* ion-card-content {
    display: flex;
} */
.ion-page{
    overflow-y: scroll;
}
</style>