犯的错误:
1:项目阶段，左侧菜单目录，只能有项目文件夹
2:联想电脑安装node_modules依赖包的时候，经常丢包。npm install --save axios --force
3：单词错误
4：路由理解
KV：K--->URL  V---->相应的组件
配置路由：
     ------路由组件
     -----router--->index.js
                  import Vue  from 'vue';
                  import VueRouter from 'vue-router';
                  //使用插件
                  Vue.use(VueRouter);
                  //对外暴露VueRouter类的实例
                  export default new VueRouter({
                       routes:[
                            {
                                 path:'/home',
                                 component:Home
                            }
                       ]
                  })
    ------main.js   配置项不能瞎写


$router:进行编程式导航的路由跳转
this.$router.push|this.$router.replace
$route:可以获取路由的信息|参数
this.$route.path
this.$route.params|query
this.$route.meta


1)编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。
为什么会出现这种现象:
由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调
第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；



2)将Home组件的静态组件拆分
2.1静态页面（样式）
2.2拆分静态组件
2.3发请求获取服务器数据进行展示
2.4开发动态业务
拆分组件：结构+样式+图片资源
一共要拆分为七个组件

postman测试接口
经过postman工具测试 接口无问题 如果服务器code字段返回200 代表请求成功
整个项目 接口前缀都会有api字样





3)axios二次封装
AJAX:客户端可以'敲敲的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
XMLHttpRequest、$、fetch、axios
跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
JSONP、CROS、代理
2.1:工作的时候src目录下的API文件夹，一般关于axios二次封装的文件
2.2进度条：nprogress模块实现进度条功能
工作的时候，修改进度条的颜色，修改源码样式.bar类名的
为什么要二次封装axios
主要用到请求拦截器和响应拦截器：
请求拦截器：可以在发请求之前处理一些业务 
响应拦截器：当服务器返回一些数据后可以处理一些事情
在项目中经常出现API文件夹 即用来封装axios请求
接口中路径都带有 /api

接口统一管理
项目很小时：可以在组件生命周期函数中发送请求
项目很大时：axios.get() 


http://localhost:8080/#/home -----前端项目本地服务器
http://39.98.123.211 ------后台服务器 
协议相同，域名不同，端口号不同

nprogress进度条的使用
start:进度条开始
done：进度条结束
进度条颜色可以修改 去css文件中找

4)vuex:今晚务必vuex复习一下
vuex:Vue官方提供的一个插件，插件可以管理项目共用数据。
vuex：书写任何项目都需要vuex？
项目大的时候，需要有一个地方‘统一管理数据’即为仓库store
Vuex基本使用:

vuex是什么：是官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据
并不是全部的项目都需要vuex，如果项目小，则不需要vuex，如果项目很大，组件很多，数据很多，维护不容易，需使用vuex
state mutations actions getters modules

vuex实现模块式开发
如果项目过大，组件很多，接口很多，数据很多，可以让Vuex实现模块式开发


















