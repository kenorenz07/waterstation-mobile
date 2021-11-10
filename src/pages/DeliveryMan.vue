<template>
   <ion-page>
       <ion-header>
            <ion-toolbar>
                <ion-title>{{title}}</ion-title>
                 <ion-button @click="logoutCustomer" color="light" slot="end" fill="outline">
                    <ion-icon  slot="icon-only" :icon="logOutOutline"></ion-icon>
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
                    <ion-tab-button tab="home" @click="title = 'My Orders'" :href="'/delivery/orders'">
                        <ion-icon :icon="reorderFourOutline"></ion-icon>
                        <ion-label>Orders</ion-label>
                    </ion-tab-button>
                    <ion-tab-button tab="sales" @click="title = 'My Sales'" :href="'/delivery/sales'">
                        <ion-icon :icon="cashOutline"></ion-icon>
                        <ion-label>Sales</ion-label>
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
    IonButton
} from '@ionic/vue'


import { reorderFourOutline,cashOutline,logOutOutline,} from 'ionicons/icons';

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
        IonButton,

    },
    data: () => ({
     reorderFourOutline,cashOutline,logOutOutline,
     title: null,
    }),
    computed : {
    },
    methods : {
        logoutCustomer(){
            this.$axios.post('delivery_man/v1/logout').then(({data}) => {
                if(data){
                    localStorage.removeItem("token")
                    this.$router.push('/login')
                }
            })
        },
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