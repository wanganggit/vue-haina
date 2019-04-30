// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'

import router from './router'

// 导入全局样式
import '@/assets/index.css'

import axios from 'axios'

import "babel-polyfill"

import echarts from 'echarts'

Vue.use(ElementUI)

// 将axios添加到Vue的原型中
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

// 配置公共路径
// 配置好公共路径后，每次使用axios 发送请求，只需要些当前路径就行了
// axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
axios.defaults.baseURL = 'https://cloudapi.usr.cn/usrCloud/user'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
