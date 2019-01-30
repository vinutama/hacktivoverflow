import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import wysiwyg from 'vue-wysiwyg'
import "vue-wysiwyg/dist/vueWysiwyg.css"
import axios from 'axios'

Vue.use(Vuetify)
Vue.use(wysiwyg)

Vue.prototype.$axios = axios.create({
  baseURL: `http://localhost:3000`
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
