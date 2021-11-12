<template>
    <div class="map" ref="mapDivRef"></div>
</template>
<script>
import { ref,onMounted } from 'vue'

export default {
    name : "GMap",
    props: {
        center: { lat: Number, lng: Number },
        zoom: Number,
        mapType: String,
        disableUI: Boolean
    },
    setup (props) {
        // gogle maap object
        const map = ref(null);
        // map element
        const mapDivRef = ref(null);

        // script elemet to load 
        onMounted(() =>{
            let key= 'AIzaSyCvdTuWiI69qMfAnI2S2eFOuI-6akx051A'

            const googleMapScript = document.createElement("SCRIPT");

            googleMapScript.setAttribute(
                "src",
                `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`
            );
            googleMapScript.setAttribute("defer", "");
            googleMapScript.setAttribute("async", "");
            document.head.appendChild(googleMapScript);
        })

        /**
            * this function is called as soon as the map is initialized
        */
        window.initMap = () => {
            map.value = new window.google.maps.Map(mapDivRef.value, {
                mapTypeId: props.mapType || "hybrid",
                zoom: props.zoom || 8,
                disableDefaultUI: props.disableUI || false,
                center: props.center || { lat: 12.0668, lng: 124.5962 }
            });
        };
        
        return {
            mapDivRef
        };
    },
    
}
</script>
<style scoped>
    .map{
        width: 100%;
        height: 300px;
        background: black;
    }
</style>