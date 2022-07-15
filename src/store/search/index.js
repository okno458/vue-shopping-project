//search模块的小仓库
import { reqGetSearchInfo } from '@/api'
const state = {
    //仓库初始状态
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchlist){
        state.searchList = searchlist;
    }
}
const actions = {
    //获取search模块的数据
    async getSearchList({commit},params={}){
        //params形参：当用户派发action时，第二个参数传递过来，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code == 200) {
            commit('GETSEARCHLIST',result.data)
        }
    }
}
//计算属性 getter主要作用是简化仓库中的数据
const getters = {
    //state为当前仓库中的state，不是大仓库中的state
    goodsList(state){
        //如果服务器的数据已经返回，是一个数组
        //如果网速慢或者没有网络的情况下，应该返回undefined，undefined不能被遍历
        //计算属性的属性值应该至少是一个空数组
        return state.searchList.goodsList || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    },
    attrsList(state){
        return state.searchList.attrsList || [];
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}