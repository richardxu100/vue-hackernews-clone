import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'
import ProgressBar from './components/ProgressBar'
import storeConfig from './store/store-config'

const store = new Vuex.Store(storeConfig)

Vue.use(Vuex)
Vue.config.productionTip = false

const bar = new Vue(ProgressBar).$mount()
Vue.prototype.$bar = bar
document.body.appendChild(bar.$el)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
