<template>
   <ion-page>
       <ion-header>
            <ion-toolbar>
                <ion-title>{{title}}</ion-title>
                 <!-- <ion-button @click="logoutCustomer" color="light" slot="start" fill="outline">
                    <ion-icon  slot="icon-only" :icon="logOutOutline"></ion-icon>
                </ion-button> -->
                <ion-button  slot="start">
                    <ion-icon  slot="icon-only" :icon="notificationsOutline"></ion-icon>
                </ion-button>
                <ion-button @click="openMenu" slot="end">
                    <!-- <ion-icon  slot="icon-only" :icon="menuOutline"></ion-icon> -->
                    <ion-avatar>
                        <ion-img :src="'http://3.144.168.4/storage/' + $store.getters.user.image"></ion-img>
                    </ion-avatar>
                </ion-button>
                <!-- <ion-avatar slot="end" >
                    <img src="https://scontent-xsp1-3.xx.fbcdn.net/v/t1.6435-1/p100x100/241439838_4465586350227792_3670855029139333701_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=7206a8&_nc_ohc=lqD4hS-c1O4AX_Y2yHi&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-xsp1-3.xx&oh=bf8f060cb6ededc794279164509bf4cc&oe=61804851">
                </ion-avatar> -->
            </ion-toolbar>

        </ion-header>
        <ion-content  >

            <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
                <ion-router-outlet />
                <ion-tab-bar slot="bottom">
                    <ion-tab-button tab="home" @click="title = 'My Orders'" :href="'/dashboard/home'">
                        <ion-icon :icon="reorderFourOutline"></ion-icon>
                        <ion-label>Orders</ion-label>
                    </ion-tab-button>
                    <ion-tab-button tab="products" @click="title = 'Products'" :href="'/dashboard/products'">
                        <ion-icon :icon="waterOutline"></ion-icon>
                        <ion-label>Products</ion-label>
                    </ion-tab-button>
                    <ion-tab-button tab="cart" @click="title = 'My Cart'" :href="'/dashboard/cart'">
                        <ion-icon :icon="cart"></ion-icon>
                        <ion-label>Cart</ion-label>
                    </ion-tab-button>
                    <ion-tab-button tab="review" @click="title = 'My Reviews'" :href="'/dashboard/reviews'">
                        <ion-icon :icon="starHalfOutline"></ion-icon>
                        <ion-label>Reviews</ion-label>
                    </ion-tab-button>
                </ion-tab-bar>
            </ion-tabs>
        </ion-content>

   </ion-page>
</template>
<script>
import { 
    IonPage,
    IonHeader,
    IonTabs,
    IonToolbar,
    IonTitle,
    // IonAvatar,
    IonIcon,
    IonTabBar,
    IonTabButton,
    IonLabel, 
    IonContent,
    IonRouterOutlet,
    IonButton,
    menuController,
} from '@ionic/vue'

import {  waterOutline, cart,logOutOutline,reorderFourOutline,starHalfOutline, menuOutline,notificationsOutline} from 'ionicons/icons';

export default {

    components: {
        IonPage,
        IonHeader,
        IonTabs,
        IonToolbar,
        IonTitle,
        // IonAvatar,
        IonIcon,
        IonTabBar,
        IonTabButton,
        IonLabel, 
        IonContent,
        IonRouterOutlet,
        IonButton

    },
    data: () => ({
     reorderFourOutline,
     waterOutline,
     cart,
     starHalfOutline,
     logOutOutline,
     menuOutline,
     notificationsOutline,
     user: {},
     title: null,
    }),
    computed : {
    },
    methods : {
        // logoutCustomer(){
        //     this.$axios.post('user/v1/logout').then(({data}) => {
        //         if(data){
        //             localStorage.removeItem("token")
        //             this.$router.push('/login')
        //         }
        //     })
        // },
        beforeTabChange(){

        },
        afterTabChange(){
            
        },
        openMenu(){
            menuController.open('app-menu');
        }

    }
}
</script>

<style scoped>
ion-avatar {
    margin: 2%;
    height: 40px;
    width: 40px;
}
ion-tab-bar {
    border-top: 1px solid #7c7c7c;
    box-shadow: 0px 0px 10px #7c7c7c;
}

/* ion-tab-button.ion-activated {
    color: #fff;
}

ion-tab-button:not(:first-child):not(:last-child) ion-icon {
    border-radius: 50px;
} */
</style>