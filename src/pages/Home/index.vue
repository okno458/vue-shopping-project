
<template>
  <div>
    <!-- 三级联动全局组件 -->
      <TypeNav></TypeNav>
      <!-- 轮播图及尚品汇快报 -->
      <ListContainer></ListContainer>
      <!-- 今日推荐 -->
      <Recommend></Recommend>
      <!-- 商品排行 -->
      <Rank></Rank>
      <!-- 猜你喜欢 -->
      <Like></Like>
      <!-- 家用电器 手机通讯 -->
      <!-- v-for也可以在自定义标签（组件）中 使用-->
      <!-- 
          组件通信的方式有哪些？
          1.props:用于父组件传递子组件
          2.$emit $on :用于实现子组件给父组件传值
          3.$bus： 全局事件总线 全能
          4.pubsub vue中基本不用
          5.插槽：默认插槽 具名插槽 作用域插槽
          6.vuex
       -->
      <Floor v-for="floor in floorlist" :key="floor.id" :list="floor"></Floor>
      <!-- 商标 -->
      <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/index.vue';
import Recommend from '@/pages/Home/Recommend/index.vue';
import Rank from '@/pages/Home/Rank/index.vue';
import Like from '@/pages/Home/Like/index.vue';
import Floor from '@/pages/Home/Floor/index.vue';
import Brand from '@/pages/Home/Brand/index.vue';
import {mapState} from "vuex";
export default {
  name:'',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  data() {
    return {
      
    }
  },
  mounted(){
    //不能在floor组件内部发送action，因为这样无法v-for遍历组件
    //获取floor组件的数据
    this.$store.dispatch('getFloorList');
  },
  computed:{
    ...mapState({
      floorlist: state => state.home.floorlist
    })
  }
}
</script>

<style>

</style>