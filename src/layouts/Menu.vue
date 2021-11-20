<template>
  <ion-menu side="start" type="overlay" @ionDidOpen="setCustomer" menu-id="customer" content-id="main-content">
    <ion-header>
      <ion-toolbar>
          <ion-button @click="closeMenu" slot="start">
              <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
          </ion-button>
        <ion-title>PROFILE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
        <div style="text-align:-webkit-center; padding: 0 15px">
            <div class="user-profile">
                <span> Click image to change</span>
                <ion-avatar style="height:100px; width:100px;">
                    <ion-img :src="updateCustomer.image ? updateCustomer.image : ($store.getters.user.image ? 'http://3.144.168.4/storage/' + $store.getters.user.image :'/assets/img/no-image.png')" @click="updatePhoto"></ion-img>
                </ion-avatar>
                <div>
                  <ion-item>
                    <ion-label position="stacked">Name</ion-label>
                    <ion-input @ionInput="updateCustomer.name = $event.target.value;" :value="$store.getters.user.name"></ion-input>
                    <!-- <ion-input v-model="updateCustomer.name" :value="$store.getters.user.name"></ion-input> -->
                  </ion-item>
                  <ion-item>
                    <ion-label position="stacked">Email</ion-label>
                    <ion-input @ionInput="updateCustomer.email = $event.target.value;" :value="$store.getters.user.email"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="stacked">Phone Number</ion-label>
                    <ion-input @ionInput="updateCustomer.phone_number = $event.target.value;" :value="$store.getters.user.phone_number"></ion-input>
                  </ion-item>
                   <ion-item>
                    <ion-label class="required" position="floating">Input new Password</ion-label>
                    <ion-input :value="updateCustomer.password" @IonInput="updateCustomer.password = $event.target.value" type="password" required></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label class="required" position="floating">Confirm new Password</ion-label>
                      <ion-input :value="updateCustomer.confirm_password" @IonInput="updateCustomer.confirm_password = $event.target.value" type="password" required></ion-input>
                  </ion-item>
                </div>
                <div>
                  <div>
                    <h4>Address</h4>
                  </div> 
                  <ion-item>
                  <ion-label position="stacked">Purok</ion-label>
                  <ion-input @ionInput="updateCustomer.purok = $event.target.value;" :value="$store.getters.user.purok"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="stacked">Barangay/Bario</ion-label>
                  <ion-input @ionInput="updateCustomer.brgy = $event.target.value;" :value="$store.getters.user.brgy"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="stacked">City</ion-label>
                  <ion-input @ionInput="updateCustomer.city = $event.target.value;" :value="$store.getters.user.city"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="stacked">Landmark</ion-label>
                  <ion-input @ionInput="updateCustomer.landmark = $event.target.value;"  :value="$store.getters.user.landmark"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="stacked">Additional Address</ion-label>
                  <ion-input @ionInput="updateCustomer.additional_address = $event.target.value;" :value="$store.getters.user.additional_address"></ion-input>
                </ion-item>
                </div>
            </div>
        </div>
        <div style="position: absolute; width: 100%;">
            <ion-button @click="updateDetails" color="warning" expand="full" style="margin: 0;"> <ion-icon slot="start" :icon="create"></ion-icon>
                Update</ion-button>
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
  IonMenu,IonHeader,IonContent,IonToolbar,IonTitle,IonIcon,IonButton,IonImg,IonAvatar,IonLabel,IonInput,IonItem,toastController,/* IonItem,IonList,IonLabel, */menuController
} from "@ionic/vue";
import { Camera, CameraResultType,CameraSource} from '@capacitor/camera';
import { closeOutline,logOutOutline,createOutline,create } from 'ionicons/icons';

export default {
  components: {
    IonMenu,IonHeader,IonContent,IonToolbar,IonTitle,IonIcon,IonButton,IonImg,IonAvatar,IonLabel,IonInput,IonItem,/* IonItem,IonList,IonLabel, */
  },
  data: () => ({
      closeOutline,
      logOutOutline,
      createOutline,
      create,
      updateCustomer: {
        image: '',
        name: '',
        email: '',
        phone_number: '',
        purok: '',
        brgy: '',
        city: '',
        landmark: '',
        additional_address: '',
        password: '',
        confirm_password: ''
      }
  }),
  ionViewWillEnter () {
      console.log(this.$store.getters.user);
      this.setCustomer()
    },
  mounted() {
      console.log(this.$store.getters.user);
      this.setCustomer()
  },
  methods:{
      setCustomer(){
      let tempdel = JSON.parse(JSON.stringify(this.$store.getters.user))
      this.updateCustomer.name = tempdel.name 
      this.updateCustomer.email = tempdel.email 
      this.updateCustomer.phone_number = tempdel.phone_number 
      this.updateCustomer.purok = tempdel.purok 
      this.updateCustomer.brgy = tempdel.brgy 
      this.updateCustomer.city = tempdel.city 
      this.updateCustomer.landmark = tempdel.landmark 
      this.updateCustomer.additional_address = tempdel.additional_address 
    },
    closeMenu(){
      menuController.close("customer");
    //   this.$router.push(url);
    },
    logoutCustomer(){
        this.$axios.get('user/v1/logout').then(({data}) => {
            if(data){
                localStorage.removeItem("token")
                this.$router.push('/login')
                menuController.close("customer");

            }
        })
    },
    updateDetails(){
      console.log(this.updateCustomer);
      this.$axios.post('user/v1/update', this.updateCustomer).then(({data}) => {
          console.log(data);
           if(data.error){
             this.errorMessage()
          }
          else{
            menuController.close("customer");
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
    async updatePhoto(){
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            source: CameraSource.Camera,
            resultType: CameraResultType.Base64,
        });

        this.updateCustomer.image ="data:image/jpeg;base64," + image.base64String;
    },
  }
};
</script>
<style>
ion-toolbar>ion-button:last-child{
  font-size: 16px;
}
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
.user-profile p.user-num{
  margin: 0;
  opacity: 0.6;
  font-size: 16px;
}
</style>