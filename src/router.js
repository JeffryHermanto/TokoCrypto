import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Aset from './views/Aset.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/aset',
      name: 'aset',
      component: Aset
    }
  ]
})
