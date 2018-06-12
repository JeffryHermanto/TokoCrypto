<template>
  <div class="container listing">
    <div class="tableWrapper">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th><span class="sortColor" @click="sortToggleRank()"><i class="fas fa-sort"></i></span> Rank</th>
            <th>Nama</th>
            <th>Kapitalisasi Pasar</th>
            <th><span class="sortColor" @click="sortTogglePrice()"><i class="fas fa-sort"></i></span> Harga (IDR)</th>
            <th><span class="sortColor" @click="sortToggleVol()"><i class="fas fa-sort"></i></span> Volume (24h)</th>
            <th>Sirkulasi Supply</th>
            <th><span class="sortColor" @click="sortToggleChange()"><i class="fas fa-sort"></i></span> Perubahan (24h)</th>
          </tr>
        </thead>
        <tbody v-for="list in listing" :key="list.rank">
          <tr @click="formulir(list)">
            <th>{{ list.rank }}</th>
            <td>{{ list.name }}</td>
            <td>Rp. {{ formatPrice(list.quotes.IDR.market_cap) }},-</td>
            <td>Rp. {{ formatPrice(list.quotes.IDR.price) }},-</td>
            <td>Rp. {{ formatPrice(list.quotes.IDR.volume_24h) }},-</td>
            <td>{{ formatPrice(list.circulating_supply) }} {{ list.symbol }}</td>
            <div v-if="list.quotes.IDR.percent_change_24h >= 0">
              <td class="greenText"><i class="fas fa-arrow-up"></i>&nbsp;&nbsp; {{ list.quotes.USD.percent_change_24h }}%</td>
            </div>
            <div v-else>
              <td class="redText"><i class="fas fa-arrow-down"></i>&nbsp;&nbsp; {{ list.quotes.USD.percent_change_24h }}%</td>
            </div>
          </tr>
        </tbody>
      </table>
    </div>

<!-- FORMULIR ORDER -->
    <div :class="isOrdered">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Formulir Order</p>
          <button class="delete" aria-label="close" @click="cancelOrder()"></button>
        </header>

        <section class="modal-card-body">
          <h1 class="title">{{ name }}</h1>
          <p class="is-size-5">Harga satuan: Rp. {{ formatPrice(price) }},-</p>
          <div class="field has-addons">
            <p class="control">
              <span class="select">
                <select>
                  <option>{{ symbol }}</option>
                </select>
              </span>
            </p>
            <p class="control is-expanded">
              <input class="input" type="number" min="0" placeholder="Jumlah" v-model="jumlah">
            </p>
            <p class="control">
              <a class="button is-info" @click="hitung()">
                Hitung
              </a>
            </p>
          </div>

          <p class="is-size-5">Total: <strong>Rp. {{ formatPrice(total) }},-</strong></p>

          <article v-if="feedback" class="message is-danger">
            <div class="message-header">
              <p>SALDO TIDAK CUKUP</p>
              <button class="delete" aria-label="delete" @click="clearNotification()"></button>
            </div>
            <div class="message-body">
              Silahkan <em>top-up</em> saldo terlebih dahulu.
            </div>
          </article>

        </section>

        <footer class="modal-card-foot">
          <a v-if="saldoCukup" class="button is-success is-large tombolBeli" @click="beli">Beli</a>
        </footer>
      </div>
    </div>
<!-- AKHIR FORMULIR ORDER -->

<!-- ORDER SUKSES -->
    <div :class="orderSuccess">
      <div class="modal-background"></div>
      <div class="modal-content">
        <i class="fas fa-check fa-10x orderSukses"></i>
        <div class="successNotes">
          <h1 class="title">Selamat!</h1>
          <h2 class="subtitle">Pembelian Anda Berhasil</h2>
        </div>
        <router-link to="aset" class="button is-info tombolAset">Lihat Aset Saya</router-link>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeOrderSuccess()"></button>
    </div>
<!-- AKHIR ORDER SUKSES -->

  </div>
</template>

<script>
  import axios from 'axios'
  import _ from 'lodash'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Listing',
    data() {
      return {
        timer: '',
        isAscending: true,
        isOrdered: 'modal',
        id: null,
        name: null,
        symbol: null,
        price: null,
        jumlah: null,
        total: null,
        feedback: false,
        saldoCukup: false,
        orderSuccess: 'modal'
      }
    },
    created() {
      this.loadData()
      this.timer = setInterval(this.loadData, 300000)
    },
    methods: {
      loadData () {
        axios.get('https://api.coinmarketcap.com/v2/ticker/?convert=IDR&limit=100')
          .then(response => {
            this.$store.state.listing = response.data.data
            this.$store.state.listing = _.orderBy(this.$store.state.listing, 'rank', 'asc');
          })
          .catch(err => {
            console.log(err)
          })
      },
      formatPrice (value) {
        let val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      sortToggleRank () {
        this.isAscending = !this.isAscending
        if (this.isAscending === true) {
          this.$store.state.listing = _.orderBy(this.$store.state.listing, 'rank', 'asc');
        } else {
          this.$store.state.listing = _.orderBy(this.$store.state.listing, 'rank', 'desc');
        }
      },
      sortTogglePrice () {
        this.isAscending = !this.isAscending
        if (this.isAscending === true) {
          this.$store.state.listing = _.orderBy(this.$store.state.listing, 'quotes.IDR.price', 'asc');
        } else {
          this.$store.state.listing = _.orderBy(this.$store.state.listing, 'quotes.IDR.price', 'desc');
        }
      },
      sortToggleVol () {
        this.isAscending = !this.isAscending
        if (this.isAscending === true) {
          this.$store.state.listing = _.orderBy(this.$store.state.listing, 'quotes.IDR.volume_24h', 'asc');
        } else {
          this.$store.state.listing = _.orderBy(this.$store.state.listing, 'quotes.IDR.volume_24h', 'desc');
        }
      },
      sortToggleChange () {
        this.isAscending = !this.isAscending
        if (this.isAscending === true) {
          this.$store.state.listing = _.orderBy(this.$store.state.listing, 'quotes.IDR.percent_change_24h', 'asc');
        } else {
          this.$store.state.listing = _.orderBy(this.$store.state.listing, 'quotes.IDR.percent_change_24h', 'desc');
        }
      },
      formulir (list) {
        this.isOrdered = 'modal is-active'
        this.id = list.id
        this.name = list.name
        this.symbol = list.symbol
        this.price = list.quotes.IDR.price
        this.jumlah = null
        this.total = null
        this.feedback = false
        this.saldoCukup = false
      },
      cancelOrder () {
        this.isOrdered = 'modal'
      },
      hitung () {
        this.total = this.jumlah * this.price
        if (this.jumlah === null || this.total === 0) {
          this.saldoCukup = false
        } else if (this.total > this.saldo) {
          this.feedback = true
          this.saldoCukup = false
        } else {
          this.feedback = false
          this.saldoCukup = true
        }
      },
      clearNotification () {
        this.feedback = false
      },
      beli () {
        let timeStamp = Math.floor(Date.now())
        this.$store.state.saldo = this.$store.state.saldo - this.total
        this.$store.state.coins.push({
          id: this.id,
          name: this.name,
          symbol: this.symbol,
          buyPrice: this.price,
          coinStock: this.jumlah,
          buyDate: timeStamp
        })
        this.$store.state.coinsFilled = false
        this.isOrdered = 'modal'
        this.orderSuccess = 'modal is-active'
      },
      closeOrderSuccess () {
        this.orderSuccess = "modal"
      }
    },
    computed: mapGetters([
      'listing', 'saldo'
    ])
  }
</script>

<style>
  .listing {
    margin-top: 30px;
    font-size: 0.9em;
  }

  .tableWrapper {
    overflow-x: auto
  }

  .greenText {
    color: green;
    font-weight: bold
  }

  .redText {
    color: red;
    font-weight: bold
  }

  .sortColor {
    color: orange
  }

  .tombolBeli {
    width: 100%;
  }

  .field {
    margin-top: 20px;
    padding-bottom: 10px
  }

  .message {
    margin-top: 20px
  }

  .orderSukses {
    color: green
  }

  .successNotes * {
    color: #fff;
    margin-top: 20px;
  }

  .tombolAset {
    margin-top: 30px;
    width: 225px;
    font-weight: bold
  }
</style>
