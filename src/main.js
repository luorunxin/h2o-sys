import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Element from 'element-ui'
import initAjax from './plugins/ajax.js'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/filters.js'
import './plugins/router-guard.js'
import './static/base.scss'
import './static/iconfont.css'

Vue.config.productionTip = false;

Vue.use(Element)
Vue.use(initAjax)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
