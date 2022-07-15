//引入moke模块
import Mock from "mockjs";
//把json数据引入进来
//json数据格式没有对外暴露，但却可以引入
//webpack默认对外暴露的资源：图片，json数据格式
import banner from "./banner";
import floor from "./floor";
//moke数据
//mock()对象需要传入的参数：1.参数请求的地址 2.请求的数据
Mock.mock('/mock/banner',{code:200,data:banner})//模拟首页轮播图数据
Mock.mock('/mock/floor',{code:200,data:floor})//模拟楼层数据