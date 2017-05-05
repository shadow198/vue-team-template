import Vue from 'vue'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'
import App from './App.vue'

import { Button } from 'element-ui'
Vue.component(Button.name, Button);

// Enable devtools
Vue.config.devtools = true;
sync(store,router);

//Vue.prototype.$http = axios;Vue.axios = axios; //TODO 所有请求单独配置，统一接口 文件：serves/api-send.js

const app = new Vue({
  router,
  store,
  ...App
});

export { app, router, store }