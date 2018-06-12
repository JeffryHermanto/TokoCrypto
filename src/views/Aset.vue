<template>
  <div class="aset">
    <div class="container">
      <h1 class="title">Aset Saya</h1>
      <p v-if="coinsFilled">
        Anda belum memiliki Cryptocurrency.<br />
        Silahkan analisa dan beli terlebih dahulu untuk menambah koleksi pertama Anda.
      </p>
      <!-- BOX -->
      <div class="columns is-multiline">
        <div class="column is-one-third" v-for="(coin, index) in coins" :key="index">
          <div class="box">
            <article class="media">
              <div class="media-left">
                <h1 class="title">{{ coin.symbol }}</h1>
              </div>
              <div class="media-content">
                <div class="content">
                  <p><strong>{{ coin.name }}</strong></p>
                  <p>Harga saat ini: <strong>Rp. {{ formatPrice(arrayPosition(coin.id)) }},-</strong></p>
                  <div class="field is-grouped is-grouped-multiline">
                    <div class="control">
                      <div class="tags has-addons">
                        <span class="tag is-dark">Tanggal Beli</span>
                        <span class="tag is-info">{{ formatDate(coin.buyDate) }}</span>
                      </div>
                    </div>
                    <div class="control">
                      <div class="tags has-addons">
                        <span class="tag is-dark">Beli Di Harga Satuan</span>
                        <span class="tag is-success">Rp. {{ formatPrice(coin.buyPrice) }},-</span>
                      </div>
                    </div>
                    <div class="control">
                      <div class="tags has-addons">
                        <span class="tag is-dark">Jumlah Stok</span>
                        <span class="tag is-primary">{{ coin.coinStock }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="profitLossPercentage(coin.id, coin.buyPrice) == 0" class="control">
                  <div class="tags has-addons">
                    <span class="tag is-large"><small>P/L: <span>{{ profitLossPercentage(coin.id, coin.buyPrice) }} %</span></small></span>
                    <a class="tag is-warning is-large" @click="formulirJual(coin)">Jual</a>
                  </div>
                </div>

                <div v-else-if="profitLossPercentage(coin.id, coin.buyPrice) > 0" class="control">
                  <div class="tags has-addons">
                    <span class="tag is-success is-large"><small>P/L: <span>{{ profitLossPercentage(coin.id, coin.buyPrice) }} %</span></small></span>
                    <a class="tag is-warning is-large" @click="formulirJual(coin)">Jual</a>
                  </div>
                </div>

                <div v-else-if="profitLossPercentage(coin.id, coin.buyPrice) < 0" class="control">
                  <div class="tags has-addons">
                    <span class="tag is-danger is-large"><small>P/L: <span>{{ profitLossPercentage(coin.id, coin.buyPrice) }} %</span></small></span>
                    <a class="tag is-warning is-large" @click="formulirJual(coin)">Jual</a>
                  </div>
                </div>

              </div>
            </article>
          </div>
        </div>
      </div>
      <!-- AKHIR BOX -->

      <!-- KONFIRMASI TUTUP POSISI -->
      <div :class="isOrdered">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Tutup Posisi</p>
            <button class="delete" aria-label="close" @click="cancelOrder()"></button>
          </header>
          <section class="modal-card-body">
            <h1 class="title">{{ name }} ({{ symbol }})</h1>
            <h2 class="subtitle">Yakin mau dijual?</h2>
          </section>
          <footer class="modal-card-foot">
            <a class="button is-danger is-large tombolJual" @click="jual()">Jual</a>
          </footer>
        </div>
      </div>
      <!-- AKHIR KONFIRMASI TUTUP POSISI -->

      <!-- SUKSES JUAL -->
      <div :class="suksesJual">
        <div class="modal-background"></div>
        <div class="modal-content">
          <i class="fas fa-check fa-10x suksesJual"></i>
          <div class="successNotes">
            <h1 class="title">Selamat!</h1>
            <h2 class="subtitle">Posisi Anda Sudah Terjual</h2>
          </div>
          <router-link to="/" class="button is-info tombolAset">Kembali ke Beranda</router-link>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="closeSuksesJual()"></button>
      </div>
      <!-- AKHIR SUKSES JUAL -->

    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import {
    mapGetters
  } from 'vuex'

  export default {
    computed: mapGetters([
      'coins', 'listing', 'coinsFilled'
    ]),
    data() {
      return {
        profitLoss: null,
        isOrdered: 'modal',
        id: null,
        elementPos: null,
        name: null,
        symbol: null,
        price: null,
        nilaiJual: null,
        suksesJual: 'modal'
      }
    },
    methods: {
      formatPrice(value) {
        let val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      formatDate(date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a')
      },
      arrayPosition(id) {
        let elementPos = this.listing.map(x => x.id).indexOf(id);
        return this.listing[elementPos].quotes.IDR.price
      },
      elementPosition(id) {
        let elementPos = this.coins.map(x => x.id).indexOf(id);
        return elementPos
      },
      profitLossPercentage(id, buyPrice) {
        let elementPos = this.listing.map(x => x.id).indexOf(id);
        let hasil = (((this.listing[elementPos].quotes.IDR.price - buyPrice) / buyPrice) * 100).toFixed(2)
        if (hasil == 0) {
          this.profitLoss = 'profitLossNetral'
        } else if (hasil > 0) {
          this.profitLoss = 'profitBox'
        } else if (hasil < 0) {
          this.profitLoss = 'lossBox'
        }
        return hasil
      },
      formulirJual(coin) {
        this.isOrdered = 'modal is-active',
          this.id = coin.id,
          this.elementPos = this.elementPosition(coin.id)
        this.name = coin.name,
          this.symbol = coin.symbol,
          this.price = coin.buyPrice
        this.nilaiJual = this.arrayPosition(coin.id) * coin.coinStock
        console.log(this.elementPos)
      },
      cancelOrder() {
        this.isOrdered = 'modal'
      },
      jual() {
        this.$store.state.saldo = this.$store.state.saldo + this.nilaiJual
        this.$store.state.coins.splice(this.elementPos, 1)
        this.isOrdered = 'modal'
        this.suksesJual = 'modal is-active'
      },
      closeSuksesJual() {
        this.suksesJual = "modal"
      }
    }
  }
</script>

<style>
  .aset {
    margin-top: 30px
  }

  .jual {
    width: 100px;
    font-weight: bold
  }

  small span {
    font-weight: bold
  }

  .tombolJual {
    width: 100%
  }

  .suksesJual {
    color: red
  }

  .tombolAset {
    margin-top: 30px;
    width: 225px;
    font-weight: bold
  }
</style>
