//home模块的小仓库
import { reqCategoryList, reqGetBannerList , reqFloorList} from "@/api"
 //state: 仓库存储数据的地方，也就是状态
const state = {
    //state中的数据默认值不能随便写，需要根据接口的返回值初始化
    //home仓库中存储三级菜单的数据
    categorylist:[],
    //存储轮播图的数据
    bannerlist:[],
    //存储floor数据
    floorlist:[],
}
//mutations：修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categorylist){
        state.categorylist = categorylist;
    },
    GETBANNERLIST(state,bannerlist){
        state.bannerlist = bannerlist;
    },
    GETFLOORLIST(state,floorlist){
        state.floorlist = floorlist;
    }
}
//action:可以书写自己的业务逻辑，可以处理异步
const actions = {
    //通过api里面的接口函数调用，向服务器发请求，获取服务器数据
    async categorylist({commit}){
        let result = await reqCategoryList();
        if(result.code == 200) {
            commit('CATEGORYLIST',result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code == 200) {
            commit('GETBANNERLIST',result.data)
        }
    },
    //获取floor组件的数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code == 200) {
            commit('GETFLOORLIST',result.data)
        }
    }
}
//getters：理解为计算属性，用于简化数据，让组件获取仓库的数据更方便
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}