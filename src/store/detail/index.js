//detail模块的小仓库
import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api';
//封装临时游客身份的模块，生成随机身份
import { getUUID } from '@/utils/uuid_token'
const state = { 
    goodInfo:{},
    //游客的临时身份
    uuid_token:getUUID(),
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    },
};
const actions = {
    //获取产品信息
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code == 200){
            commit('GETGOODINFO',result.data)
        }
    }, 
    //将产品添加到购物车中
    async AddOrUpdateShopCart({commit},{skuId,skuNum}){
        //当前函数如果执行会返回一个promise
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        if(result.code == 200){
            //代表返回成功
            return 'ok'
        }else{
            //代表加入购物车失败
            return Promise.reject(new Error('failed'))
        }
    },
};
const getters = {
    //路径导航简化的数据
    categoryView(state){
        //当服务器数据未返回时，goodInfo是空对象，没有categoryView这个属性，所以后方需要加一个空对象
       return state.goodInfo.categoryView || {};
    },
    //简化产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //产品售卖属性的简化
    spuSaleAttrList(state){
       return state.goodInfo.spuSaleAttrList || [];
    }
};
export default {
    state,
    mutations,
    actions,
    getters,
}