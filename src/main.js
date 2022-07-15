import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ripple from "vuetify/lib/directives/ripple";

Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  directives: {
    ripple
  },
  render: h => h(App)
}).$mount('#app')
