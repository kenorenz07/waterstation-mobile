<template>
    <ion-page >
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
                <ion-item v-for="product in products" :key="product.id" >
                    <ion-label>
                        {{product.name}}
                    </ion-label>
                </ion-item>
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
    IonItem , 
    IonLabel, 
    IonPage,
    // IonContent
    } from '@ionic/vue'

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
        IonItem , 
        IonLabel, 
        IonPage,
        // IonContent

    },
    data : () => ({
        products : []
    }),
    mounted () {
        this.initialize()
    },
    methods : {
        initialize(){
            this.$axios.get('/user/v1/product/all').then(({data}) => {
                this.products = data
            })
        }
    },
}
</script>

<style scoped>


ion-card-content {
    display: flex;
}
.ion-page{
    overflow-y: scroll;
}
</style>