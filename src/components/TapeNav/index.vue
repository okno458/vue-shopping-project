<template>
<div class="type-nav">
  <div class="container">
    <div @mouseleave="leaveShow()" @mouseenter="enterShow()">
      <h2 class="all">全部商品分类</h2>
      <!-- 过渡动画 前提：元素或组件必须带有v-if或者v-show指令才可以进行过渡动画-->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 依靠事件的委派进行路由跳转 -->
            <div class="all-sort-list2" @click="goSearch">
              <div class="item bo" v-for=" (c1,index) in categorylist " :key="c1.categoryId" :class="{cur:currentIndex == index}">
                <h3 @mouseenter="changeIndex(index)" >
                  <!-- 通过添加自定义属性：判断是否为a标签，以及获取三级目录的id -->
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId"> {{c1.categoryName}} </a>
                </h3>
                <!-- 通过动态绑定display样式 来显示二级和三级菜单 -->
                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                  <div class="subitem" v-for=" (c2) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId"> {{c2.categoryName}} </a>
                      </dt>
                      <dd>
                        <em v-for="(c3) in c2.categoryChild " :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}} </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
    </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//引入lodash
//这种引入把lodash全部的方法引入,最好的方法是按需加载
import throttle from 'lodash/throttle'
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移动上哪一个一级分类
      currentIndex:-1,
      show: true,
    }
  },
  //当组件挂载完毕，就可以向服务器发送请求
  mounted() {
    //当组件挂在完毕，show的属性变为false
    //如果不是home路由组件，将typenav进行隐藏
    if(this.$route.path != '/home'){
      this.show = false;
    }
  },
  computed:{
    ...mapState({
      //在组件中使用categorylist属性时，右侧函数会立即执行一次 会注入一个参数state，即为大仓库中的数据
      categorylist : state => state.home.categorylist.slice(0, 16)
    })
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性
    //使用throttle函数时，回调不能使用箭头函数，会产生上下文this指向问题
    changeIndex:throttle(function (index) {
      //index是鼠标移动上一个一级菜单分类的索引值
      //正常情况，用户缓慢操作 鼠标进入，每一个一级分类都会触发
      //非正常情况，用户快速操作 全部分类都应该触发鼠标进入事件，但经过测试，只有部分h3触发
      //由于用户操作行为过快，导致浏览器反应不过来，如果当前回调函数中有大量业务，就有可能出现卡顿现象
      this.currentIndex = index
    },50),
    //一级分类鼠标移除事件的回调
    //当鼠标移入的时候让商品分类列表进行展示
    enterShow(){
      if(this.$route.path != '/home'){
        this.show = true;
      }
    },
    //当鼠标移除的时候让商品分类列表进行隐藏
    leaveShow(){
      this.currentIndex = -1;
      //判断路由组件是search时才会执行
      if(this.$route.path != '/home'){
        this.show = false;
      }
    },
    //进行路由跳转的方法
    goSearch(event){
      //最好的解决方案：编程式导航+事件的委派
      //利用事件的委派存在一些问题：1.点击一定是a标签 2.如何获取参数【1,2,3分类产品的名字，id】
      //点击a标签时才会跳转，如何确定点击的一定是a标签 解决方法：将子节点当中的a标签添加自定义属性data-categoryName，其他属性则没有
      //已经可以确认点击的是a标签，如何区分点击的是一级二级三级分类的a标签
      let e = event.target;
      //获取到当前触发这个事件的节点【h3，a，dt，dl】需要带有data-categoryName这样的节点，一定是a标签
      //节点有一个dataset属性，可以获取节点的自定义属性与属性值
      let {categoryname,category1id,category2id,category3id} = e.dataset;
      if(categoryname){
        //整理路由跳转的参数
        let location = {name:'search'};
        let query = {categoryName:categoryname};
        //判断一定是a标签：1级目录
        if(category1id){
            query.category1Id = category1id;
            //一定是a标签：二级目录
        }else if(category2id){
            query.category2Id = category2id;
            //一定是a标签：三级目录
        }else if(category3id){
            query.category3Id = category3id;
        }
        //整理完参数 将query属性添加到location对象中
        location.query = query;
        //路由跳转
        //判断 如果路由跳转的时候带有params参数，也要传递
        if(this.$route.params){
          location.params = this.$route.params
          this.$router.push(location);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      cursor: pointer;
      .all-sort-list2 {
        
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur{
          background-color: skyblue;
        }
      }
    }
     //过渡动画开始的状态（进入）
    .sort-enter {
      height: 0px;
    }
    //过渡动画结束的状态（进入）
    .sort-enter-to {
        height: 461px;
    }
    //定义动画的时间，速率
    .sort-enter-action {
      //所有元素 0.5秒 匀速
      transition: all 5s linear;
    }
  }
}
</style>