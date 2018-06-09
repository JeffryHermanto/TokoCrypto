<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item">
        <router-link to="/">
          <img src="../assets/TokoCrypto.png" alt="TokoCrypto: Top 100 Cryptocurrencies by Market Capitalization">
        </router-link>
        </a>
      <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
            <router-link to="aset">Aset Saya</router-link>
          </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="/documentation/overview/start/">
              Referensi
            </a>
          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item" href="https://en.wikipedia.org/wiki/Cryptocurrency" target="_blank">
                Apa itu Cryptocurrency?
              </a>
            <a class="navbar-item" href="https://coinmarketcap.com/" target="_blank">
                CoinMarketCap
              </a>
            <hr class="navbar-divider">
            <a class="navbar-item" href="http://www.jhproject.id/" target="_blank">
                Situs Pengembang
              </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="https://goo.gl/nm8kyL" target="_blank" href="https://twitter.com/intent/tweet?text=TokoCrypto: Simulasi trading 100 Cryptocurrency terpopuler&amp;hashtags=Tokopedia&amp;url=https://goo.gl/nm8kyL&amp;via=jeffryhermanto">
                  <span class="icon">
                    <i class="fab fa-twitter"></i>
                  </span>
                  <span>
                    Tweet
                  </span>
                </a>
            </p>
            <p class="control">
              <a class="button is-primary" href="https://github.com/JeffryHermanto/TokoCrypto" target="_blank">
                  <span class="icon">
                    <i class="fab fa-github"></i>
                  </span>
                  <span>Source Code</span>
                </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>
