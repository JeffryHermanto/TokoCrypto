<template>
  <div class="home">
    <Listing />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Listing from '@/components/Listing.vue'

  export default {
    name: 'home',
    components: {
      Listing
    }
  }
</script>
