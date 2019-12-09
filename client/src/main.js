import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import "@/assets/vars.css"
import "@/assets/titles.css"
import "@/assets/buttons.css"
import "@/assets/inputs.css"

new Vue({
  render: h => h(App),
}).$mount('#app')
