<template>
<!-- 
    分页器的功能需要什么数据(条件) 
    1.需要知道当前是第几页，一般用pageNo代表
    2.每一页展示多少条数据，一般用pagesize进行代表
    3.一共有多少页，取决于一共有多少数据，一般用total进行代表，获取另外一条信息：一共多少页
    4.需要知道服务器连续页面个数，一般是5或者7，因为奇数对称(continues)
-->
  <div class="pagination" >
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo - 1)">上一页</button> 
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{active:pageNo == 1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 中间部分 -->
    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" 
            v-show="page >= startNumAndEndNum.start" 
            @click="$emit('getPageNo', page)"
            :class="{active:pageNo == page}">
        {{page}}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)" :class="{active:pageNo == totalPage}">
      {{totalPage}}
    </button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo',pageNo + 1)">下一页</button>
  
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: ['pageNo','pageSize','total','continues'],
    mounted() {
      
    },  
    computed:{
      //计算出总共多少页
      totalPage(){
        //向上取整
        return  Math.ceil(this.total / this.pageSize);  
      },
      //计算出连续页码的起始数字和结束数字
      startNumAndEndNum(){
        //解构连续页码，当前页码，总页数
          const {pageNo,continues,totalPage} = this;
          let start = 0;
          let end = 0;
          //连续页码数至少是5
          //总页数少于连续页码数
          if(continues > totalPage){
              start = 1;//起始页为1
              end = totalPage;//结束页为总页码数
          }else{
            //总页数比连续页码多
            start = pageNo - parseInt(continues / 2) ;
            end = pageNo + parseInt(continues / 2) ;
            //【start出现0或者负数】现象纠正
            if(start < 1){
               start = 1;
               end = continues;
            }
            //end大于总页码纠正
            if(end > totalPage){
              end = totalPage;
              start = totalPage - continues + 1;
            }
          }
          return {start, end}
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
      text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .active{
    background-color: skyblue;
  }
</style>