//路由配置的信息
export default [{
    path: '/home',
    //路由懒加载
    /**
     当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
     如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
     */
    //当用户访问该组件时，该函数会执行，并且返回相应的组件 称为路由懒加载
    component: () => import('@/pages/Home') ,
    //配置路由时，可以给路由添加路由元信息【meta】
    meta: { show: true }
},
{
    path: '/center',
    component: () => import('@/pages/Center'),
    meta: { show: true },
    //二级路由组件
    children: [{
        path: 'myorder',
        component: () => import('@/pages/Center/myOrder'),
    }, {
        path: 'groupOrder',
        component: () => import('@/pages/Center/groupOrder'),
    }, {
        path: '/center',
        redirect: '/center/myorder'
    }]
}, {
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { show: false },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
        //进入交易页面前首先判断是否从购物车页面进入，如果是则放行，如果不是则停留在当前页面
        if (from.path == '/shopcart') {
            next();
        } else {
            //中断当前导航,停留在当前路由
            next(false);
        }
    }

}, {
    path: '/paysuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true }

}, {
    path: '/pay',
    component:() => import('@/pages/Pay'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
            next();
        } else {
            next(false);
        }
    }

}, {
    path: '/shopcart',
    component:() => import('@/pages/ShopCart'),
    meta: { show: true }

}, {
    path: '/login',
    component:() => import('@/pages/Login'),
    meta: { show: false }

}, {
    //如何指定param可以传递或不传，在配置路由时，在站位后方加一个问号？，代表传递不传递都可以
    path: '/search/:keyword?',
    component:() => import('@/pages/Search'),
    meta: { show: true },
    name: 'search',
    //路由组件能不能传递props数据? 可以
    //布尔值的写法：只可以传递params参数
    // props:true,
    //对象写法：额外给路由组件传递一些参数
    // props:{a:1,b:2}
    //函数写法，可以将params参数，query参数，通过props传递给组件
    props: ($route) => {
        return {
            keyword: $route.params.keyword,
            k: $route.query.k
        }
    }
}, {
    path: '/register',
    component:() => import('@/pages/Register'),
    meta: { show: false }

}, {
    path: '/addcartsuccess',
    component:() => import('@/pages/AddCartSuccess'),
    name: 'addcartsuccess',
    meta: { show: true }

}, {
    path: '/detail/:skuid',
    component:() => import('@/pages/Detail'),
    meta: { show: true }

},
//重定向：当项目启动时，访问/，立刻定向到首页
{
    path: '*',
    redirect: '/home',
}]