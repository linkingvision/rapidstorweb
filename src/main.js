import 'core-js/stable'
import Vue from 'vue'
import CoreuiVue from '@coreui/vue/src'
import App from './App'
import router from './router/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import VueI18n from 'vue-i18n'
import LangEn from '../static/lang/en'
import LangZhCHS from '../static/lang/zhchs'
import LangZhCHT from '../static/lang/zhcht'
import './assets/icon/iconfont.css'//字体
import $ from 'jquery'
import "babel-polyfill";

import axios from 'axios';
Vue.prototype.$http = axios;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(CoreuiVue)
Vue.use(VueI18n)
const bus = new Vue()
const i18n = new VueI18n({
  locale: 'zhchs',
  messages: {
    'en': LangEn,
    'zhchs': LangZhCHS,
    'zhcht': LangZhCHT
  }
})
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  template: '<App/>',
  components: {
    App
  },
  data: {
    bus
  }
})
