//对于axios进行二次封装
import axios from 'axios';
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css';
//在当前模块中引入store仓库
import store from '@/store';

//nprogress.start方法代表进度条开始 nprogress.done代表进度条结束

//1：利用axios对象的方法 创建create实例
//2：request就是axios
const requests = axios.create({
    //配置对象
    //基础路径，发请求时候，路径中会出现api
    baseURL:'/api',
    //timeout:表示请求超时的时间
    timeout: 5000,
})
//请求拦截器：在发请求之前，请求拦截器可以监测到，可以在请求发出器前做一些事情
//语法：
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象中有一个属性很重要：headers请求头
    //进度条开始动
    nprogress.start();
    if(store.state.detail.uuid_token){
        //给请求头添加一个字段,该字段需与后台商议
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    return config;
})
//响应拦截器：
//语法：
requests.interceptors.response.use((res)=>{
    //服务器成功的回调函数：服务器响应数据回来后，响应拦截器可以监测到，可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data
},(err)=>{
    //服务器响应失败的回调函数
    return Promise.reject(new Error('fail'))
})

//对外暴露
export default requests