import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'

import App from './App'
import ProgressBar from './components/ProgressBar'
import storeConfig from './store/store-config'
import routerConfig from './routes/router-config'

Vue.use(Vuex)
Vue.use(Router)
Vue.config.productionTip = false

const store = new Vuex.Store(storeConfig)
const router = new Router(routerConfig)

sync(store, router)

const bar = new Vue(ProgressBar).$mount()
Vue.prototype.$bar = bar
document.body.appendChild(bar.$el)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
