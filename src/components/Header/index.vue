<template>
  <div class="outer">
    <!-- 头部 -->
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <!-- 没有用户名：显示未登录 -->
            <p v-if="!username">
              <span>请</span>
              <!-- 声明式导航必须要有to属性 router-link的实质就是a标签-->
              <router-link to="/Login">登录</router-link>
              <router-link to="/Register" class="register">免费注册</router-link>
            </p>
            <!-- 有用户名：显示已登陆 -->
            <p v-else>
              <a>{{username}} </a>
              <a class="register" @click="logout">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center/myorder">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link to="/home" class="btn">
            <img src="./images/logo.png" alt="" />
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSearch"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
    name:'',
    data() {
        return {
            keyword:''
        }
    },
    mounted() {
       //通过全局事件总线清除关键字
       this.$bus.$on("clear", () => {
          this.keyword = "";
       })
    },
    methods: {
        //搜索按钮的回调函数：需要向search路由进行跳转
        goSearch(){
            //路由传参的方式：
            //字符串形式
            // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
            //模板字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            //对象写法
            // this.$router.push({name:'search',params:{'keyword':this.keyword},query:{'k':this.keyword.toUpperCase()}})
            // 面试题1：路由传递参数（对象写法）path是否可以结合params参数一起使用?
            //答：不可以 路由跳转传参时，对象的写法是path，name的形式，path不能与params一起使用
            // this.$router.push({path:'/search',params:{'keyword':this.keyword},query:{'k':this.keyword.toUpperCase()}})
            //面试题2：如何指定param可以传递或不传
            //在配置路由时，在站位后方加一个问号？，代表传递不传递都可以
             // 答：路径会出现问题 如果路由要求传递params参数，但是不传递，跳转成功后url会出现问题
            // this.$router.push({name:'search',query:{'k':this.keyword.toUpperCase()}});
            // 面试题3：params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
            //答：使用unidefined解决 否则路径会出问题
            // this.$router.push({name:'search',params:{'keyword':'' || unidefined } ,query:{'k':this.keyword.toUpperCase()}});
            //面试题4：路由组件能不能传递props数据?
            //可以 有三种方法 详见router index页面
            //判断，若路由上有query参数，则需要带上query参数
            if(this.$route.query){
                let location =  {
                  name:'search',
                  params:{'keyword':this.keyword || undefined }
                };
                location.query = this.$route.query;
                this.$router.push(location);
            }
        },
        //退出登陆
        async logout(){
          //退出登陆需要做的事情：发送请求通知服务器退出登陆，服务器会清除一些数据(token)；
          try {
              await this.$store.dispatch('userLogout');
              this.$router.push('/login')
          } catch (error) {
            
          }
        }
    },
    computed:{
      //用户名信息
      username(){
        return this.$store.state.user.userInfo.name;
      }
    }
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>