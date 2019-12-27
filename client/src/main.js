import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import "@/assets/vars.css"
import "@/assets/container.css"
import "@/assets/titles.css"
import "@/assets/buttons.css"
import "@/assets/inputs.css"
import router from './router'
import store from './store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
