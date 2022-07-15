//登陆与注册的仓库
import { reqGetCode, reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from '@/api';
import {setToken , getToken , removeToken } from '@/utils/token'
const state = {
    code:'',
    token:getToken(),
    userInfo:{},
}

const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    CLEAR(state){
       state.token = '';
       state.userInfo = {};
       removeToken();
    },
}

const actions = {
    //获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone);
        if(result.code == 200){
            commit('GETCODE',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error(result.message));
        }
    },
    //用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok';
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    //用户的登陆
    async userLogin({commit},data){
        //关于token
        //当你登陆成功时，后台为了区分用户，服务器会下发一个token(令牌)
        //前台需要持久化储存token，然后带着token去找服务器索取用户信息进行展示
        //vuex存储数据不是持久化的
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            //用户已经登陆获取到了token
            commit('USERLOGIN',result.data.token);
            //持久化存储token
            setToken(result.data.token)
            return 'ok';
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    //获取用户信息
   async getUserInfo({commit}){
       let result = await reqUserInfo();
       if (result.code == 200) {
          commit('GETUSERINFO',result.data);
          return 'ok'
       }else{
          return Promise.reject(new Error(result.message))
       }
    },
    //退出登陆
    async userLogout({commit}){
        let result = await reqLogout();
        //action不能操作state，需要提交mutation去修改state
        if(result.code == 200){
           commit('CLEAR')
           return 'ok';
        }else{
            return Promise.reject(new Error(result.message))
        }
        
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters,
}