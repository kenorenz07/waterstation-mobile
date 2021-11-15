<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons>
                    <ion-button  color="medium" slot="end" @click="closeModal" fill="outline">
                        <ion-icon  :icon="arrowBackOutline" slot="icon-only" ></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid class="user-message">
                <ion-col>
                    <div>
                        <ion-row>
                            <ion-col>
                                <h4>Your review</h4>
                                <span>{{moment(reviews.created_at)}}</span>
                            </ion-col>
                            <ion-col>
                                <ion-button @click="editAlert(reviews.id,reviews.review)"> <ion-icon :icon="createOutline"></ion-icon></ion-button>
                                <ion-button @click="removeAlert(reviews.id)"> <ion-icon :icon="trashOutline"></ion-icon></ion-button>
                            </ion-col>
                        </ion-row>
                    </div>
                    <div>
                        <p>{{reviews.review}}</p>
                    </div>
                </ion-col>
            </ion-grid>
            <ion-grid class="admin">
                <ion-col>
                    <div v-if="Object.keys(reviews.replies).length === 0">
                        <h4 style="text-align:center;">No response from admin</h4>
                    </div>
                    <div v-else>
                        <h4>Answered by admin</h4>
                        <div v-for="adminReview in reviews.replies" :key="adminReview">
                            <span style="padding:0 15px;">{{moment(adminReview.created_at)}}</span>
                            <ion-textarea class="admin-message" :value="adminReview.reply"></ion-textarea>
                        </div>
                    </div>
                </ion-col>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonContent,
    IonTextarea,
    IonGrid,
    IonCol,
    modalController,
    alertController

} from '@ionic/vue';
import { arrowBackOutline, trashOutline, createOutline } from 'ionicons/icons';
import moment from 'moment';

export default {
    name: 'Modal',
    props : {
        reviews: {
            required: true,
            type: Object,
        },
    },
    data : () => ({
        arrowBackOutline,
        trashOutline,
        createOutline
    }),
    ionViewWillEnter () {
        console.log(this.reviews)
    },
    mounted (){
        // var admin = this.reviews.replies;
        console.log(this.reviews.replies);
        

    },
    components : {
        IonPage,
        IonHeader,
        IonToolbar,
        IonButton,
        IonButtons,
        IonIcon,
        IonContent,
        IonTextarea,
        IonGrid,
        IonCol,
    },
    methods: {
        closeModal(){
          return modalController.dismiss();
        },
        moment: function (date) {
            // return moment(date).startOf('day').fromNow();
            return moment(date).format('lll');
        },
        
        async editAlert(id , text) {
            const alert = await alertController
                .create({
                    header: 'Edit Review',
                    inputs: [
                        {
                            type: 'textarea',
                            name: 'name1',
                            value: text,
                        },
                    ],
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => {
                                console.log('Cancel clicked');
                            }
                        },
                        {
                            text: 'Submit',
                            handler: (alertData) => {
                                // console.log(id + alertData.name1);
                                this.editReview(id, alertData.name1);
                            }
                        }
                    ],
                });
            await alert.present();
        },
        async removeAlert(id) {
            const alert = await alertController
                .create({
                    header: 'Remove Review',
                    subHeader: '',
                    message: 'Are you sure you want to permanently delete your review?',
                    buttons: [
                        {
                            text: 'No',
                            role: 'cancel',
                            handler: () => {
                                console.log('No');
                            }
                        },
                        {
                            text: 'Yes',
                            handler: () => {
                                console.log(id);
                                this.deleteReview(id);
                                
                            }
                        },
                    ]
                });
            await alert.present();
        },
        deleteReview(data) {
            this.$axios.delete('user/v1/reviews/delete/'+ data).then(({data}) => {
                console.log(data);
                this.closeModal();
            });
        },
        editReview(id, data){
            this.$axios.put(`user/v1/reviews/update/${id}`, {review: data}).then(({data})=> {
                console.log(data);
                this.closeModal();
            });
        },

    },
}
</script>
<style>
ion-grid.user-message ion-col{
    padding: 0 20px;
    direction: rtl;
}
ion-grid {
    padding: 0 20px;
}
ion-grid.user-message ion-col p {
    background: #e4e6eb;
    padding: 15px;
    margin-top: 16px;
    border-radius: 16px;
    color: #000;
    width: fit-content;
}
ion-grid.admin {
    margin-bottom: 50px;
}
.loii-textarea>div{
    max-height: -webkit-fill-available;
    height: inherit;
}
.loii-textarea>div>textarea{
    height: inherit;
}
.admin-message {
    border-radius: 16px;
    padding: 0 15px;
    width: max-content;
    background: rgb(0, 132, 255);
    color: white;
    margin: 4px 0;
}
/* ion-content div:last-child {
    position: relative;
} */
/* ion-content div:last-child>ion-grid {
    position: fixed;
    bottom: 0;
    z-index: 9;
    width: 100%;
    background: white;
} */
</style>