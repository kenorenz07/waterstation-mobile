<template>
    <ion-content>
        <div>
            <div>
                <ion-label position="stacked">How can we make it better?</ion-label>
                <ion-textarea v-model="review"></ion-textarea>
            </div>
        </div>
        <div>
            <ion-grid>
                <ion-row>
                    <ion-button fill="clear" color="medium" @click="closeModal">
                        Cancel
                    </ion-button>
                    <ion-button fill="clear" color="danger" @click="getReviewData">
                        Submit
                    </ion-button>
                </ion-row>
            </ion-grid>
        </div>
    </ion-content>
</template>

<script>
import {
    IonContent,
    // IonItem,
    IonLabel,
    // IonInput,
    IonTextarea,
    IonButton,
    IonGrid,
    IonRow,
    modalController

} from '@ionic/vue';

import { closeCircleOutline } from 'ionicons/icons';

export default{
    setup() {
        
    },
    components: {
        IonContent,
        // IonItem,
        IonLabel,
        // IonInput,
        IonTextarea,
        IonButton,
        IonGrid,
        IonRow,
    },
    data : () => ({
    closeCircleOutline,
    review: '',
    }), 
    methods: {
        closeModal(){
          return modalController.dismiss();
        },
        getReviewData(){
            this.$axios.post('user/v1/reviews/add', {review: this.review}).then(({data}) => {
                console.log(data);
                return modalController.dismiss();
            })
        },
    },
}
</script>

<style>
.loii-wrapper .modal-wrapper {
    width: 90vw;
    height: 35vh;
    border-radius: 10px;
}
ion-content>div:not(:last-child){
    padding: 20px;
}
ion-content>div:not(:last-child)>div{
    display: flex;
    flex-direction: column;
}
ion-content>div:not(:last-child)>div ion-label{
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    text-align: center;
    padding: 10px 0;
}
ion-content>div:not(:last-child)>div ion-textarea{
    border: 1px solid;
    padding: 10px 15px;
    border-radius: 5px;
}
ion-content>div:last-child ion-row{
    justify-content: center;
}
</style>