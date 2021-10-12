<template>
   <ion-page>
       <ion-header>
            <ion-toolbar>
                <ion-title>Dashboard</ion-title>
                <ion-avatar slot="end">
                    <img src="https://scontent-xsp1-3.xx.fbcdn.net/v/t1.6435-1/p100x100/241439838_4465586350227792_3670855029139333701_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=7206a8&_nc_ohc=lqD4hS-c1O4AX_Y2yHi&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-xsp1-3.xx&oh=bf8f060cb6ededc794279164509bf4cc&oe=61804851">
                </ion-avatar>
            </ion-toolbar>

        </ion-header>
        <ion-content>
            <ion-router-outlet />
        </ion-content>

        <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="home" :href="'/dashboard/home'">
                    <ion-icon :icon="home"></ion-icon>
                    <ion-label>Home</ion-label>
                </ion-tab-button>
                <ion-tab-button tab="products" :href="'/dashboard/products'">
                    <ion-icon :icon="grid"></ion-icon>
                </ion-tab-button>
                <ion-tab-button tab="cart" :href="'/dashboard/cart'">
                    <ion-icon :icon="cart"></ion-icon>
                    <ion-label>Cart</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
   </ion-page>
</template>
<script>
import { 
    IonPage,
    IonHeader,
    IonTabs,
    IonToolbar,
    IonTitle,
    IonAvatar,
    IonIcon,
    IonTabBar,
    IonTabButton,
    IonLabel, IonContent,
    IonRouterOutlet
} from '@ionic/vue'

import {  home, grid, cart} from 'ionicons/icons';


export default {
    components: {
        IonPage,
        IonHeader,
        IonTabs,
        IonToolbar,
        IonTitle,
        IonAvatar,
        IonIcon,
        IonTabBar,
        IonTabButton,
        IonLabel, IonContent,
        IonRouterOutlet

    },
    data: () => ({
     home,
     grid,
     cart
    }),
    computed : {
    },
    methods : {
        beforeTabChange(){

        },
        afterTabChange(){
            
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
    --border: none;
    --background: #363636;
    margin: 16px 20px;
    padding: 10px 0px;
    border-radius: 14px;
    box-shadow: 0 3px 6px 0px rgba(0, 0, 0, .04), 0 1px 3px 0px rgba(0, 0, 0, .02);
}

ion-tab-button.ion-activated {
    color: #fff;
}

ion-tab-button:not(:first-child):not(:last-child) ion-icon {
    border-radius: 50px;
}
</style>