<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!--使用路由元信息进行判断-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'',
  components: {
    Header,
    Footer
  },
  mounted() {
     //通知vuex发请求，派发action,获取数据放在仓库中
     //获取商品分类三级列表的数据
     //因为app.vue根组件最先执行，所以仓库中已经有了从服务器获取的数据，且根组件的mounted只会执行一次，若想获取数据直接去仓库即可
     //这行代码不能放在main.js中，因为此时的this是undefined
    this.$store.dispatch('categorylist')
  },
}
</script>

<style lang="scss" scoped>

</style>
