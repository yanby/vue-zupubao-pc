import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import host from 'common/js/host.js';
import ElementUI from 'element-ui';
import 'babel-polyfill';
import 'element-ui/lib/theme-chalk/index.css';
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);



Vue.use(host);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
