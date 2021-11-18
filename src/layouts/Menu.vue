<template>
  <ion-menu side="end" type="overlay" menu-id="app-menu" content-id="main-content">
    <ion-header>
      <ion-toolbar>
          <ion-button @click="closeMenu" slot="start">
              <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
          </ion-button>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <div style="text-align:-webkit-center;">
            <div class="user-profile">
                <ion-avatar style="height:100px; width:100px;">
                    <ion-img :src="'http://3.144.168.4/storage/' + $store.getters.user.image"></ion-img>
                </ion-avatar>
                <h4>{{$store.getters.user.name}}</h4>
                <span>{{$store.getters.user.phone_number}}</span>
            </div>
        </div>
        <div style="position: absolute; bottom: 0; width: 100%;">
            <ion-button @click="logoutCustomer" expand="full" style="margin: 0;">
                <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
                Logout
            </ion-button>
        </div>
    </ion-content>
  </ion-menu>
</template>
<script>
import {
  IonMenu,IonHeader,IonContent,IonToolbar,IonTitle,/* IonItem,IonList,IonLabel, */menuController
} from "@ionic/vue";
import { closeOutline,logOutOutline } from 'ionicons/icons';

export default {
  components: {
    IonMenu,IonHeader,IonContent,IonToolbar,IonTitle,/* IonItem,IonList,IonLabel, */
  },
  data: () => ({
      closeOutline,
      logOutOutline
  }),
  ionViewWillEnter () {
      console.log(this.$store.getters.user);
    },
  mounted() {
      console.log(this.$store.getters.user);
  },
  methods:{
    
    closeMenu(){
      menuController.close("app-menu");
    //   this.$router.push(url);
    },
    logoutCustomer(){
        this.$axios.post('user/v1/logout').then(({data}) => {
            if(data){
                localStorage.removeItem("token")
                this.$router.push('/login')
                menuController.close("app-menu");

            }
        })
    },
  }
};
</script>
<style>
.user-profile {
    align-items: center;
    margin-top: 25px;
}
.user-profile h4{
    font-size: 22px;
    margin-bottom: 0;
}
.user-profile span{
    font-size: 14px;
}
</style>