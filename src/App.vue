<template>
  <div id="app">
    <NavBar />
    <UserArea />
    <router-view />
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import UserArea from './components/UserArea.vue'

  export default {
    name: 'app',
    mounted() {
      let navbar = document.querySelector('.navbar-burger');
      navbar.addEventListener('click', function() {
        let target = navbar.dataset.target;
        let $target = document.getElementById(target);
        navbar.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    },
    components: {
      NavBar,
      UserArea
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
