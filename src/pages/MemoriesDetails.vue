<template>
  <base-layout :pageTitle="memoryRequest ? memoryRequest.title: 'Not Loaded'" pageBackLink="/memories">
    <h2 v-if="!memoryRequest">error</h2>
    <h2 v-else>Found</h2>
  </base-layout>
</template>
<script>
export default {
  data : () => ({
    
  }),
  computed : {
    memoryRequest(){
      return this.$store.getters.memory(this.$route.params.id)
    }
  },
  mounted (){
    console.log(this.$store.getters.memory(this.$route.params.id),'page')

  },
  watch : {
  }
    
}
</script>