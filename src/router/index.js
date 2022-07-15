//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用router插件
Vue.use(VueRouter)
import routes from './routes'
//引入store
import store from '@/store'
//解决NavigationDuplicate警告错误
//先把VueRoute原型上的push方法进行备份
const originPush = VueRouter.prototype.push;
const originReplease = VueRouter.prototype.replace;
//重写push与replace方法
//第一个参数 告诉原来的push方法 跳转去哪里，传递什么参数
VueRouter.prototype.push = function (location,resolve,reject) {
    if(resolve && reject) {
        //call和apply的区别
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：参数传递不同 call传递参数用逗号隔开，apply需要传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
Vue.prototype.originReplease = function (location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
//配置路由
let router = new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})
//全局守卫：前置守卫(在路由跳转之前判断)
router.beforeEach(async (to,from,next) => {
    //接收三个参数
    //to:获取要跳转到的那个路由的信息
    //from:可以获取到从哪一个路由而来的信息
    //next：放行函数
   /*写法： next()意为直接放行
       next('path')放行到指定的路由
       next(false)中断当前的导航
    */
    let token = store.state.user.token;
    //获取用户信息
    let name = store.state.user.userInfo.name;
    //如果可以获取到token说明用户已经登陆
    if(token){
        //如果用户已经登陆，则无法跳转到登陆页面，停留在首页
        if (to.path == '/login' || to.path == '/register') {
          next('/');  
        }else{
            //用户已经登陆，但没有去login页面
            //判断用户名是否存在(不能判断userInfo对象，因为空对象通过布尔值转化后结果为true)
            if (name) {
               //若存在用户名则放行
               next();
            } else {
               //若没有用户信息则派发action，使仓库存储用户信息后再跳转
               try {
                 //获取用户信息成功则放行
                 await store.dispatch('getUserInfo');
                 next();
               } catch (error) {
                 //token失效 无法获取用户信息，需要清空当前token，并跳转到登录页重新登录
                 await store.dispatch('userLogout');
                 next('/login');
               }
            }
        }
    }else{
        let toPath = to.path;
        //用户未登陆的情况下，不能去交易页，个人中心页，订单页，支付相关页
        if(toPath.indexOf('/trade' ) != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 ){
            next('/login?redirect=' + toPath);
        }
        next();
    }
    
})
export default router;