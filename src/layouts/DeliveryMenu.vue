<template>
  <ion-menu side="end" type="overlay" @ionDidOpen="setDeliveryMan" menu-id="delivery" content-id="main-content">
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
                    <ion-img :src="delivery.image ? 'http://3.144.168.4/storage/' +delivery.image : '/assets/img/no-image.png'"  @click="takePhoto"></ion-img>
                </ion-avatar>
                <ion-item>
                    <ion-label class="required" position="floating">Name</ion-label>
                    <ion-input  :value="delivery.name" type="text" 
                    @IonInput="delivery.name = $event.target.value"
                    required></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label class="required" position="floating">Username</ion-label>
                    <ion-input :value="delivery.username"  @IonInput="delivery.username = $event.target.value" type="text" required></ion-input>
                </ion-item>
                 <ion-item>
                    <ion-label class="required" position="floating">Phone Number</ion-label>
                    <ion-input :value="delivery.phone_number" @IonInput="delivery.phone_number = $event.target.value" type="text" required></ion-input>
                </ion-item>
                 <ion-item>
                    <ion-label class="required" position="floating">Input new Password</ion-label>
                    <ion-input :value="delivery.password" @IonInput="delivery.password = $event.target.value" type="password" required></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label class="required" position="floating">Confirm new Password</ion-label>
                    <ion-input :value="delivery.confirm_password" @IonInput="delivery.confirm_password = $event.target.value" type="password" required></ion-input>
                </ion-item>
            </div>
        </div>
        <div style="position: absolute; bottom: 0; width: 100%;">
            <ion-button @click="update" expand="full" color="warning" style="margin: 0;">
                <ion-icon slot="start" :icon="create"></ion-icon>
                Update
            </ion-button>
            <ion-button @click="logout" expand="full" style="margin: 0;">
                <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
                Logout
            </ion-button>
        </div>
    </ion-content>
  </ion-menu>
</template>
<script>
import {
  IonMenu,IonHeader,IonContent,IonToolbar,IonTitle,IonIcon,IonButton,IonImg,IonAvatar,IonLabel,IonInput,IonItem,/* IonItem,IonList,IonLabel, */menuController,toastController
} from "@ionic/vue";
import { closeOutline,logOutOutline,create } from 'ionicons/icons';
import { Camera, CameraResultType,CameraSource} from '@capacitor/camera';

export default {
  components: {
    IonMenu,IonHeader,IonContent,IonToolbar,IonTitle,IonIcon,IonButton,IonImg,IonAvatar,IonLabel,IonInput,IonItem,/* IonItem,IonList,IonLabel, */
  },
  data: () => ({
      delivery: {
          image: '',
          name: '',
          username: '',
          phone_number: null,
          password: '',
          confirm_password: '',
      },
      create,
      closeOutline,
      logOutOutline
  }),
  ionViewWillEnter () {
    console.log(this.$store.getters.user);
  },
  mounted() {
    
  },
  watch: {
    delivery : {
      handler(val) {
        console.log(val.name,"name")
      },
      deep : true,
    }
  },
  methods:{
    setDeliveryMan(){
      let tempdel = JSON.parse(JSON.stringify(this.$store.getters.user))
      this.delivery.image = tempdel.image 
      this.delivery.name = tempdel.name 
      this.delivery.username = tempdel.username 
      this.delivery.phone_number = tempdel.phone_number 
    },
    async takePhoto(){
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            source: CameraSource.Camera,
            resultType: CameraResultType.Base64,
        });

        this.delivery.image ="data:image/jpeg;base64," + image.base64String;
    },
    closeMenu(){
      menuController.close("delivery");
    //   this.$router.push(url);
    },
    update(){
      this.$axios.post('delivery_man/v1/update', this.delivery).then(({data}) => {
          if(data.error){
             this.errorMessage()
          }
          else{
            menuController.close("delivery");
          }
        })
    },
    async errorMessage(){
      const toast = await toastController
        .create({
            message: 'Password does not match.',
            duration: 1000,
            color: 'danger'
        })
      return toast.present();
    },
    logout(){
        this.$axios.post('delivery_man/v1/logout').then(({data}) => {
            if(data){
                localStorage.removeItem("token")
                this.$router.push('/login')
                menuController.close("delivery");

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