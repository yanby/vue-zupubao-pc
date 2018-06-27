import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件
import 'babel-polyfill'
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

Vue.use(ElementUI);
Vue.use(VueLazyload)
/* eslint-disable no-new */
Vue.use(VueLazyload, { 
  error: "https://up-img.oss-cn-beijing.aliyuncs.com/11525861563_.pic_hd.jpg",
  loading: "https://up-img.oss-cn-beijing.aliyuncs.com/11525861563_.pic_hd.jpg",
  preLoad: 1.3,
  attempt: 1
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
