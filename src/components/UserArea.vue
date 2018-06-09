<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <img id="avatar" src="../assets/profile.jpg" alt="Avatar" width="100px">
        <h1 class="title is-size-4">
          Selamat datang, {{ nama }}!
        </h1>
        <h2 class="subtitle">
          Saldo: <span>Rp. {{ formatPrice(saldo) }},-</span>
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'UserArea',
    computed: mapGetters([
      'nama', 'saldo'
    ]),
    methods: {
      formatPrice (value) {
        let val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }
    }
  }
</script>

<style>
  #avatar {
    border-radius: 50%
  }

  h2 span {
    color: #333;
  }
</style>
