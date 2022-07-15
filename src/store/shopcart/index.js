//shopcart模块的小仓库
import { reqCartList,reqDeleteCartById,reqUpdateCheckedBId } from '@/api';
const state = {
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,cartlist){
        state.cartList = cartlist;
    }
}
const actions = {
    //获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList();
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    //删除购物车列表产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code == 200){
            return 'ok'
        }else {
            return Promise.reject(new Error('fail'))
        }
    },
    //修改购物车某一个产品选中时的状态
    async UpdateCheckedBId({commit},{skuId,isChecked}){
       let result = await reqUpdateCheckedBId(skuId,isChecked);
       if(result.code == 200){
        return 'ok'
        }else {
            return Promise.reject(new Error('fail'))
        }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        //context可以理解为小仓库
        //它的身上有commit(提交mutations修改state),getters(计算属性)，dispatch(派发action)，state当前仓库的数据
        let PromiseAll = [];//定义一个数组接收返回的promise对象
        //获取购物车中全部的产品，是一个数组
        getters.cartList.cartInfoList.forEach(item => {
            //判断是否选中
           let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId',item.skuId) : '';
           //将返回的promise添加到PromiseAll数组中(async函数必定返回一个promise，数组中有几个元素就返回几)
           PromiseAll.push(promise)
        })
        //Promise.all中为一个数组，数组中放置的都是promise对象，只有全部的对象都返回成功，返回结果才为成功，若有一个返回失败，返回结果就为失败
        return Promise.all(PromiseAll)
    },
    //修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
          let promise = dispatch('UpdateCheckedBId',{skuId:item.skuId,isChecked});
          PromiseAll.push(promise);
        })
        return Promise.all(PromiseAll);
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || {};
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}