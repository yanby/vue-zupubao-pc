<template>

  <div class="mine-left left">
    <div class="mine-msg">
      <div class="img"></div>
      <p>{{iphone}}<span></span></p>
      <div class="txt">
        今日已查看<span class="red">{{pvCount - numIndex}}</span>套铺源<br>(共{{pvCount}}套/日)
      </div>
    </div>
    <div class="mine-list">
      <ul>
        <li><a href="member.html">会员服务</a></li>
        <li><a href="order.html">我的订单</a></li>
        <li><a href="mine.html">我的收藏</a></li>
        <li @click="btn()"><a href="javascript:;">退出登录</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import $ from "common/js/jquery.min.js";
export default {
  name: 'hello',
  data () {
   return{
     numIndex: 0,
     pvCount: 0,//次数总数
     iphone: "",
   }
  },
  mounted(){
    this.init()
    this.iphoneFun()
    this.activeUrl()
  },
  methods:{
    init(){//次数
      axios(this.changeData() + '/user/shopCheckedRecords',{
        method: 'post',
        params: {
          account: localStorage.iphone,
          shopId: '0',
          type: "0",
          token: localStorage.token,
          page: 0
        }
      })
        .then(res => {
          console.log(res)
          if(res.data.code == "200"){
            this.pvCount = res.data.pvCount;
            this.numIndex = res.data.count;
          }else if(res.data.code == 401){
            localStorage.clear();
          }
        })
        .catch(err =>{
          console.log(err)
        })
    },
    iphoneFun(){
      var str = localStorage.iphone;
      this.iphone = str.substr(0,3)+"****"+str.substr(7);
    },
    activeUrl(){
      var filename=window.location.href;
      if(filename.indexOf("member") != -1){
        $(".mine-list ul li").eq(0).addClass("cur").siblings().removeClass("cur");
      }
      else if(filename.indexOf("order") != -1){
        $(".mine-list ul li").eq(1).addClass("cur").siblings().removeClass("cur");
      }
      else if(filename.indexOf("mine") != -1){
        $(".mine-list ul li").eq(2).addClass("cur").siblings().removeClass("cur");
      }
    },
    btn(){
      var that = this;
      this.$confirm('确认要退出登录么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        that.$layer.msg("退出成功")
        setTimeout(function(){
          window.localStorage.clear();
          window.location.href = "index.html";
        },1000)
      }).catch(() => {
        that.$layer.msg("已取消")
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>
  /*@import '../../common/css/mine.css';*/
</style>
