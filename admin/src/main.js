// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter

import 'simplemde/dist/simplemde.min.css' // 引入文本编辑器样式
import './global.less'
import VueDraggableResizable from 'vue-draggable-resizable'

import { Cascader } from 'ant-design-vue'
import { Timeline } from 'ant-design-vue'
Vue.use(Timeline)
import draggable from 'vuedraggable'

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.component('vue-draggable-resizable', VueDraggableResizable)
window.umi_plugin_ant_themeVar = themePluginConfig.theme
Vue.use(Cascader)
Vue.component('draggable', draggable)
import { FormModel } from 'ant-design-vue';
Vue.use(FormModel);
import { Tree } from 'ant-design-vue';
Vue.use(Tree);
import clipboard from 'clipboard';
//注册到vue原型上
Vue.prototype.clipboard = clipboard;

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
