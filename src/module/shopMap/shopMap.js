import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import host from 'common/js/host.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



Vue.use(host);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
