import Vue from 'vue'
import App from './App.vue'
//三级联动组件（全局）
import TapeNav from '@/components//TapeNav'
//引入路由
import router from './router'
//引入仓库
import store from './store'
//引入mock
import '@/mock/mockServe'
//引入swiper样式
import "swiper/css/swiper.css"
//引入全局轮播图组件
import Carousel from '@/components/Carousel'
//引入分页器组件
import Pagination from '@/components/Pagination'
// 统一接口api文件夹中全部请求函数
import * as API from '@/api';
import erciyuan from '@/assets/erciyuan.gif'
//引入自定义插件
import myPlugin from './myPlugins/myPlugin'
//使用vue.use()相当于调用了插件的install方法
Vue.use(myPlugin);
//引入vue懒加载插件
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading: erciyuan,
});
//引入校验插件
import '@/myPlugins/validate.js'
//elementui注册组件的方式
import { Button,MessageBox } from 'element-ui';
//挂载到Vue原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(Carousel.name,Carousel)
Vue.component(TapeNav.name,TapeNav)
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name,Button)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  //注册路由
  //注册路由信息：当这里书写router的时候，组件身上都有$route和$router属性
  //$route：一般获取路由信息【路径，quary,params】等等
  //$router：一般用于编程式导航，进行路由跳转【push replace】
  //push replace的区别 push可以记住历史记录 replace不可以
  router,
  //注册仓库 组件实例上就会多出一个$store属性
  store,
  //配置全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
   
  },
}).$mount('#app')
