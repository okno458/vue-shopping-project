//当前模块：将api接口进行统一的管理
import request from './request'
//引入mock模拟的接口数据
import mockRequest from './mockAjax'
//三级联动的接口 发送请求 axios发送请求返回结果是promise对象
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'GET' });
//获取banner轮播图数据
export const reqGetBannerList = () => mockRequest.get('/banner');
//获取floor组件的数据
export const reqFloorList = () => mockRequest.get('/floor');
//获取搜索模块的数据 需传递一个空对象，否则发请求会失败
export const reqGetSearchInfo = (params) => request({ url: '/list', method: 'POST', data: params });
//获取产品详情信息
export const reqGoodsInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'GET' });
//将产品添加到购物车中或更新某一个商品的个数
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' });
//获取购物车列表数据
export const reqCartList = () => request({ url: '/cart/cartList', method: 'GET' });
//删除购物车产品
export const reqDeleteCartById = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' });
//修改商品选中的状态
export const reqUpdateCheckedBId = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' });
//获取验证码
export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'GET' });
//注册用户
export const reqUserRegister = (data) => request({ url: `/user/passport/register`, method: 'POST', data });
//用户登陆
export const reqUserLogin = (data) => request({ url: `/user/passport/login`, method: 'POST', data });
//获取用户信息，需要携带token
export const reqUserInfo = () => request({ url: `/user/passport/auth/getUserInfo`, method: 'GET' });
//退出登陆
export const reqLogout = () => request({ url: `/user/passport/logout`, method: 'GET' });
//获取用户地址信息
export const reqAddressInfo = () => request({ url: `/user/userAddress/auth/findUserAddressList`, method: 'GET' });
//获取订单交易页的信息
export const reqOrderInfo = () => request({ url: `/order/auth/trade`, method: 'GET' });
//提交订单
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'POST', data });
//获取订单支付信息
export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'GET' });
//获取订单支付状态
export const reqPayStatus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET' });
//获取个人中心的数据(我的订单)
export const reqMyOrderList = (page,limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'GET' });


