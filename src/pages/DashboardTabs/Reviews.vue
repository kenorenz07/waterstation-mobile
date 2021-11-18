<template>
    <ion-page>
        <ion-content>
            <ion-list>
                <ion-card @click="openModal(review)" v-for="review in reviews" :key="review.id">
                    <ion-card-header>
                            <ion-label class="ion-float-right">{{moment(review.created_at)}}</ion-label>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-row>
                            Your Review:
                        </ion-row>
                        <ion-row>
                            <ion-col v-if="review.review.length > 30">
                                {{review.review.substring(0,29) + '...'}}
                            </ion-col>
                            <ion-col v-else>
                                {{review.review}}
                            </ion-col>
                        </ion-row>
                        <ion-row></ion-row>
                    </ion-card-content>
                </ion-card>
            </ion-list>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openCreateReviewModal()">
            <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
        </ion-fab>
        </ion-content>
    </ion-page>
</template>

<script>

import { 
    IonPage,
    IonContent,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonRow,
    IonCol,
    IonLabel,
    IonFab,
    IonIcon,
    IonFabButton,
    modalController
} from '@ionic/vue'
import { add } from 'ionicons/icons';
import moment from 'moment';
import Modal from '/src/layouts/ReviewModal.vue';
import AddReviewModal from '/src/layouts/AddReviewModal.vue';

export default {
    components: {
        IonPage,
        IonContent,
        IonList,
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonRow,
        IonCol,
        IonLabel,
        IonFab,
        IonIcon,
        IonFabButton,
    },
    data: () => ({
        add,
        reviews: [],
    }),
    ionViewWillEnter() {
        this.test()
    },
    mounted() {
        this.test()
    },
    methods: {
        test() {
            this.$axios.get('user/v1/reviews').then(({data}) => {
                this.reviews = data
                // console.log(this.reviews)
            });
        },
        moment: function (date) {
            // return moment(date).startOf('day').fromNow();
            return moment(date).format('lll');
        },
        async openModal(reviews) {
            const modal = await modalController
                .create({
                component: Modal,
                    componentProps: {
                        reviews: reviews,
                    },
                })
            modal.onDidDismiss()
            .then(() => {
                this.test()
                console.log('gumawas');
            });
            return modal.present();
        },
        async openCreateReviewModal() {
            const modal = await modalController
                .create({
                    component: AddReviewModal,
                    showBackdrop: true,
                    backdropDismiss: true,
                    animated: true,
                    cssClass: 'loii-wrapper',
                })
            modal.onDidDismiss()
            .then(() => {
                this.test()
                // console.log('review deleted');
            });
            return modal.present();
        },
    },
}
</script>

<style>
.modal-wrapper {
    width: 90vw;
    height: 50vh;
}
</style>