import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import host from 'common/js/host.js';
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill'
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);
Vue.use(ElementUI);
Vue.use(host);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
