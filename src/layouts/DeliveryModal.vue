<template>
    
    <g-map
    v-if="false"
        :disableUI="false"
        :zoom="15"
        mapType="roadmap"
        :center="{ lat: 12.0668, lng: 124.5962 }">
    ></g-map>
</template>

<script>
import GMap from './../components/Gmap.vue' 

export default {
    components : {
        GMap
    }
}
</script>