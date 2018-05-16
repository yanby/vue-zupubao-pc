<template>
  <div id="app">
    <Nav></Nav>
    <div class="shopMap w1200">
      <h2><a href="index.html">首页</a>>网站地图</h2>
      <div class="wrap">
        <h3><span></span>北京商铺出租/转让热搜词</h3>
        <ul class="clearfix">
          <li><a href="shopList.html">商铺出租</a></li>
          <li><a href="shopList.html">店铺转让</a></li>
          <li><a href="shopList.html">生意转让</a></li>
          <li><a href="shopList.html?key=businessTypeId&id=2">饭店生意转让</a></li>
          <li><a href="shopList.html?key=businessTypeId&id=9">百货超市转让</a></li>
          <li><a href="shopList.html?key=businessTypeId&id=3">美发店生意转让</a></li>
          <li><a href="shopList.html?key=businessTypeId&id=7">汽修美容店转让</a></li>
          <li><a href="shopList.html?key=businessTypeId&id=8">酒店生意转让</a></li>
        </ul>
        <h3><span></span>北京各业态商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in yetai" @click="yetaiFun(item)">{{item.name}}商铺出租/转让</li>
        </ul>
        <h3><span></span>北京行政区商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in areas" @click="areasFun(item)">{{item.name}}商铺出租/店铺转让</li>
        </ul>
        <h3><span></span>北京朝阳商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in chaoyang" @click="chaoyangFun(item)">{{item.childName}}商铺出租/店铺转让</li>
        </ul>
        <h3><span></span>北京海淀商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in haidian" @click="haidianFun(item)">{{item.childName}}商铺出租/店铺转让</li>
        </ul>
        <h3><span></span>北京西城商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in xicheng" @click="xichengFun(item)">{{item.childName}}商铺出租/店铺转让</li>
        </ul>
        <h3><span></span>北京东城商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in dongcheng" @click="dongchengFun(item)">{{item.childName}}商铺出租/店铺转让</li>
        </ul>
        <h3><span></span>北京丰台商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in fentai" @click="fentaiFun(item)">{{item.childName}}商铺出租/店铺转让</li>
        </ul>
        <h3><span></span>北京石景山商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in shijingshan" @click="shijingshanFun(item)">{{item.childName}}商铺出租/店铺转让</li>
        </ul>
        <h3><span></span>北京大兴商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in daxing" @click="daxingFun(item)">{{item.childName}}商铺出租/店铺转让</li>
        </ul>
        <h3><span></span>北京昌平商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in changping" @click="changpingFun(item)">{{item.childName}}商铺出租/店铺转让</li>
        </ul>
        <h3><span></span>北京通州商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in tongzhou" @click="tongzhouFun(item)">{{item.childName}}商铺出租/店铺转让</li>
        </ul>
        <h3><span></span>北京顺义商铺出租/转让</h3>
        <ul class="clearfix">
          <li v-if="index > 0" v-for="(item,index) in shunyi" @click="shunyiFun(item)">{{item.childName}}商铺出租/店铺转让</li>
        </ul>
        <!--<h3><span></span>北京房山商铺出租/转让</h3>-->
        <!--<ul class="clearfix">-->
          <!--<li v-if="index > 0" v-for="(item,index) in fangshan" @click="fangshanFun(item)">{{item.childName}}商铺出租/店铺转让</li>-->
        <!--</ul>-->
      </div>
    </div>
    <Navbar></Navbar>
    <Footer></Footer>
  </div>
</template>

<script>
import 'common/css/reset.css';
import qs from 'qs';
import axios from 'axios';
import $ from "common/js/jquery.min.js";
import Nav from 'components/Nav/Nav'
import Navbar from 'components/Navbar/Navbar'
import Footer from 'components/Footer/Footer'
import {getQueryString,GetRequest,url} from 'common/js/common.js'

export default {
    name: 'app',
    data(){
     return{
       areas:"",//区域
       yetai: "",//业态
       chaoyang: "",//朝阳
       haidian: "",//海淀
       xicheng: "",
       dongcheng: "",
       fengtai: "",
       shijingshan:"",
       daxing: "",
       changping:"",
       tongzhou: "",
       shunyi:"",
       fangshan: ""
     }
    },
    components: {
      Nav,
      Navbar,
      Footer
    },
    created(){
      this.init();
    },
    mounted(){

    },
    updated(){

    },
    methods:{
       init(){
         axios(this.changeData() + '/shop/getShopListPC',{
           method: 'post',
           params: {
             pageNumber: 0,
             pageSize: 10
           }
         })
         .then(res => {
           console.log(res)
           this.areas = res.data.areas;//商铺列表
           this.yetai = res.data.shopBusinessTypes;
           this.chaoyang = res.data.areas[1].childList;
           this.haidian = res.data.areas[2].childList;
           this.xicheng = res.data.areas[3].childList;
           this.dongcheng = res.data.areas[4].childList;
           this.fentai = res.data.areas[5].childList;
           this.shijingshan = res.data.areas[6].childList;
           this.daxing = res.data.areas[7].childList;
           this.changping = res.data.areas[8].childList;
           this.tongzhou = res.data.areas[9].childList;
           this.shunyi = res.data.areas[10].childList;
           this.fangshan = res.data.areas[11].childList;
         })
         .catch(err =>{
           console.log(err)
         })
       },
      areasFun(item){//点击区域
        window.location.href = "shopList.html?key=businessCircleId&id="+item.id+"&name="+item.name;
      },
      yetaiFun(item){//点击业态
        window.location.href = "shopList.html?key=businessTypeId&id="+item.id;
      },
      chaoyangFun(item){//点击朝阳下面的区域
        window.location.href = "shopList.html?key=businessCircleId&childId="+item.childId;
      },
      haidianFun(item){//点击朝阳下面的区域
        window.location.href = "shopList.html?key=businessCircleId&childId="+item.childId;
      },
      xichengFun(item){//点击朝阳下面的区域
        window.location.href = "shopList.html?key=businessCircleId&childId="+item.childId;
      },
      dongchengFun(item){//点击朝阳下面的区域
        window.location.href = "shopList.html?key=businessCircleId&childId="+item.childId;
      },
      fentaiFun(item){//点击朝阳下面的区域
        window.location.href = "shopList.html?key=businessCircleId&childId="+item.childId;
      },
      shijingshanFun(item){//点击朝阳下面的区域
        window.location.href = "shopList.html?key=businessCircleId&childId="+item.childId;
      },
      daxingFun(item){//点击朝阳下面的区域
        window.location.href = "shopList.html?key=businessCircleId&childId="+item.childId;
      },
      changpingFun(item){//点击朝阳下面的区域
        window.location.href = "shopList.html?key=businessCircleId&childId="+item.childId;
      },
      tongzhouFun(item){//点击朝阳下面的区域
        window.location.href = "shopList.html?key=businessCircleId&childId="+item.childId;
      },
      shunyiFun(item){//点击朝阳下面的区域
        window.location.href = "shopList.html?key=businessCircleId&childId="+item.childId;
      },
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../common/css/shopMap.css';
</style>
