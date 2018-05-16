<template>
  <div id="app">
    <Nav></Nav>
    <div class="shopList w1200">
      <h2><span><a href="index.html">首页</a>><b @click="allRemove()">北京</b><i v-if="quyu">>{{quyu}}</i><i v-if="quyuChild">>{{quyuChild}}</i></span>
        <div class="search">
          <input type="text" placeholder="区域/面积/租金/商铺编号" v-model="search" @keyup.enter="searchFun()"><button @click="searchFun()"></button>
        </div>
      </h2>
      <div class="search-list">
        <ul class="one">
          <li class="oneArea">
            <span>区<b>域</b></span>
            <div id="areasChildren" class="two">
             <b @click="areasFun($event,item)" v-for="item in areas">{{item.name}}</b>
            </div>
            <div class="three threeArea clearfix" id="areasChildrens">
              <i v-for="item in areaChild.childList" @click="areaChildFun($event,item)">{{item.childName}}</i>
            </div>
          </li>
          <li>
            <span>适合经营</span>
            <div class="two" id="yetai">
              <b @click="yetaiFun($event,item)" v-for="item in yetai">{{item.name}}</b>
            </div>
            <div class="three threeYetai clearfix" id="yetaiChild">
              <i v-for="item in yetaiChild.childList" @click="yetaiChildFun($event,item)">{{item.childName}}</i>
            </div>
          </li>
          <li class="mianji">
            <span>面<b>积</b></span>
            <div id="mianjiChildren" class="two">
              <b @click="mianjiFun($event,item)" v-for="item in mianji">{{item.name}}</b>
            </div>
          </li>
          <li>
            <span>月<i>租</i><i>金</i></span>
            <div class="two" id="monthChildren">
              <b @click="monthFun($event,item)" v-for="item in month">{{item.childName}}</b>
            </div>
          </li>
          <div class="search-hide" v-show="packUp">
            <li>
              <span>转<i>让</i><i>费</i></span>
              <div class="two" id="transferChildren">
                <b @click="transferFun($event,item)" v-for="item in transfer">{{item.childName}}</b>
              </div>
            </li>
          </div>
          <div class="search-click" @click="searchClick()">
              更多选项 <span></span>
          </div>
        </ul>
      </div>
      <div class="shop-list">
        <h3 v-if="allClick">
          <div class="list">
            <span>已选条件：</span>
            <span class="select" v-for="item in areasParent">{{item}}<b @click="areasParentRemove()"></b></span>
            <span class="select" v-for="item in areasName">{{item}}<b @click="areaRemove()"></b></span>
            <span class="select" v-for="item in yetaiParent">{{item}}<b @click="yetaiParentRemove()"></b></span>
            <span class="select" v-for="item in yetaiName">{{item}}<b @click="yetaiRemove()"></b></span>
            <span class="select" v-for="item in mianjiName">{{item}}<b @click="mianjiRemove()"></b></span>
            <span class="select" v-show="clickChild===1" v-for="item in monthName">{{item}}<b @click="monthRemove()"></b></span>
            <span class="select" v-show="clickChild===2" v-for="item in transferName">{{item}}<b @click="transferRemove()"></b></span>
          </div>
          <div class="clear">
            <b></b><i @click="allRemove()">清空</i>
          </div>
        </h3>
        <h4>共 <span class="red">{{totalCount}}</span> 套铺源</h4>
        <div class="shop-msg clearfix">
          <ul class="shop-left left">
            <li v-for="item in shopList" @click="goShopDetail(item.id)">
              <div class="img">
                <img :src="item.img" alt="">
              </div>
              <div class="txt">
                <h5>{{item.title}}</h5>
                <p>{{item.shopName}}</p>
                <div class="tag">
                  <span v-if="index1 < 3" v-for="(item1,index1) in item.shopTags">{{item1}}</span>
                </div>
              </div>
              <div class="price">
                <p><span>{{item.monthlyRent}}</span> <b>{{item.unit}}</b></p>
                <div>转让费: <span>{{item.transferFee}}{{item.unitTransFerfee}}</span></div>
              </div>
            </li>
          </ul>
          <div class="shop-right right">
            <a href="appDownload.html"></a>
          </div>
        </div>
      </div>
      <div class="page" v-show="pageList">
        <el-pagination background layout="prev, pager, next" :current-page="curPage" :page-size="10" :total="totalCount" @current-change="handleCurrentChange">
        </el-pagination>
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
        areas : '',//区域
        areaChild: '',//区域子级
        yetai: '',//业态
        yetaiChild: '',//业态子级
        mianji: '',//面积
        prices: '',//价格
        month: "",//月租金
        transfer: "",//转让费
        packUp: false,//选项收起
        shopList:"",//商铺列表
        next: "",//下一页
        page: 0,//第几页
        pageList: true,//分页显示
        search: "",//搜索
        shopDetailSearch: "",//商铺详情
        key:"",//首页传递的key
        id:"",//首页传递过来的Id
        childId: "",//地图页面传过来的子ID
        quyu: "",//区域显示字段
        quyuChild: "",//区域显示字段
        name: "",//首页点击区域名称
        areasId: "",//区域ID
        areasParentId: "",//区域ID
        yetaiId: "",//业态ID
        yetaiParentId: "",//业态ID
        mianjiId: "",//面积ID
        monthId: "",//月租金ID
        transferId: "",//转让费ID
        areasParent: [],//区域名称
        areasName: [],//区域字级名称
        yetaiName: [],//业态名称
        yetaiParent: [],//业态父级
        mianjiName: [],//面积名称
        monthName: [],//月租金名称
        transferName: [],//转让费名称
        allClick: false,//已选区域显示
        clickChild: "",//转让费和月租金显示
        totalCount: 0,//铺源总数
        shopTags: "",//特色标签
        curPage: 0,
        myTitle: "标题"
      }
    },
    // metaInfo(){
    //   return{
    //     title: this.myTitle, // set a title
    //     meta: [{                 // set meta
    //       name: 'Keywords',
    //       content: 'My Example App'
    //     }]
    //   }
    //
    // },
    components: {
      Nav,
      Navbar,
      Footer
    },
    created(){

    },
    mounted(){
      //如果是从商铺列表进来烌
      this.search = getQueryString("search");
      this.name = getQueryString("name");
      this.key = getQueryString("key");
      this.id = getQueryString("id");
      this.childId = getQueryString("childId");
      this.quyu = this.name || this.search;


      //页面初始化
      this.init();
    },
    updated(){

    },
    methods: {
      init(){
        this.curPage = 0;
        // axios.post(this.changeData() + '/shop/getShopListPC',qs.stringify(data))
        axios(this.changeData() + '/shop/getShopListPC',{
          method: 'post',
          params: {
            pageNumber: 0,
            pageSize: 10
          }
        })
        .then(res => {
          console.log(res)
          this.areas = res.data.areas;//区域
          this.yetai = res.data.shopBusinessTypes;//业态
          this.mianji = res.data.mg;//面积
          this.prices = res.data.prices;//价格
          this.month = this.prices[1].childList;//月租金
          this.transfer = this.prices[2].childList;//转让费

          if(this.search == null && this.key == null){
            this.shopList = res.data.content;//商铺列表
            this.totalCount = res.data.count; //总铺源数
          }

          setTimeout(function () {
            $("#areasChildren b").eq(0).addClass("cur");
            $("#yetai b").eq(0).addClass("cur");
            $("#mianjiChildren b").eq(0).addClass("cur");
            $("#monthChildren b").eq(0).addClass("cur");
          },100)

          //判断从那个页面跳过来的
          if(this.search){
            this.searchFun()
            $(".shop-left").css({"background":"#fff"})
          }else if(this.key){
            this.screen()
          }

        })
        .catch(err =>{
          console.log(err)
        })
      },
      screen(){//判断首页面传递烌参数
        this.curPage = 0;
        if(this.key == "areaId"){
          var data = {
            pageNumber: 0,
            pageSize: 10,
            areaId: this.id
          }
          this.screenFun(data);
        }else if(this.key == "priceId"){
          var data = {
            pageNumber: 0,
            pageSize: 10,
            priceId: this.id
          }
          this.screenFun(data);
        }else if(this.key == "businessCircleId"){
          var data = {
            pageNumber: 0,
            pageSize: 10,
            businessCircleId: this.id
          }
          this.screenFun(data);
        }else if(this.key == "businessTypeId"){
          var data = {
            pageNumber: 0,
            pageSize: 10,
            businessTypeId: this.id
          }
          this.screenFun(data);
        }
      },
      screenFun(data){//判断首页面传递过来的参数需要调用的接口
        this.curPage = 0;
        var that = this;
        axios(this.changeData() + '/shop/getShopListPC',{
          method: 'post',
          params: data
        })
        // axios.post('http://192.168.1.138:8080/shop/getShopListPC',qs.stringify(data))
          .then(res => {
            console.log(res)
            this.shopList = res.data.content;//商铺列表
            this.totalCount = res.data.count; //总铺源数
            if(this.shopList.length == 0){
              this.pageList = false;
              $(".shop-left").css({"background":"#fff"})
            }
            if(this.key == "areaId"){
              this.mianji.forEach(function (item,index) {
                if(item.id == that.id){
                  $("#mianjiChildren b").eq(index).click();
                }
              })
            }else if(this.key == "priceId"){
              this.month.forEach(function (item,index) {
                if(item.childId == that.id){
                  $("#monthChildren b").eq(index).click();
                }
              })
            }else if(this.key == "businessCircleId"){
              this.areas.forEach(function (item,index) {

                if(that.childId){
                  item.childList.forEach(function (item1,index1) {
                    if(item1.childId == that.childId){
                      $("#areasChildren b").eq(index).click();
                      setTimeout(function () {
                        $("#areasChildrens i").eq(index1).click();
                      },200)
                    }
                  })
                }else{
                  if(item.id == that.id){
                    $("#areasChildren b").eq(index).click();
                    setTimeout(function () {
                      $("#areasChildrens i").eq(0).click();
                    },200)
                  }
                }

              })
            }else if(this.key == "businessTypeId"){
              this.yetai.forEach(function (item,index) {
                if(item.id == that.id){
                  $("#yetai b").eq(index).click();
                  setTimeout(function () {
                    $("#yetaiChild i").eq(0).click();
                  },200)
                }
              })
            }
          })
          .catch(err =>{
            console.log(err)
          })
      },
      getShopListPC(){
        axios(this.changeData() + '/shop/getShopListPC',{
          method: 'post',
          params: {
            pageNumber: 0,
            pageSize: 10,
            search: this.search,
            businessCircleId: this.areasId || this.areasParentId,
            businessTypeId : this.yetaiId || this.yetaiParentId,
            areaId: this.mianjiId,
            priceId: this.monthId || this.transferId,
          }
        })
          .then(res => {
            console.log(res)
            this.shopList = res.data.content;//商铺列表
            this.totalCount = res.data.count; //总铺源数
            if(this.shopList.length == 0){
              this.pageList = false;
              $(".shop-left").css({"background":"#fff"})
            }
          })
          .catch(err =>{
            console.log(err)
          })
      },
      searchFun(){
        this.curPage = 0;
        var that = this;
        var reg = /^\s*$/g;
        if(reg.test(this.search) || this.search == null || this.search == ""){
          this.$layer.msg("搜索内容不能为空")
        }else{
          this.getShopListPC();
        }
      },
      areasFun(e,item){ //区域
        console.log(e);
        this.areasParentId = "";
        this.areasId = "";
        this.areasName = [];
        this.quyuChild = "";

        this.curPage = 0;
        this.areaChild = item;
        this.quyu = item.name;
        this.areasParent = [];

        this.areasParentId = item.id;
        if(item.name == "不限"){
          this.allClick = false;
          $(".threeArea").hide();
        }else{
          this.areasParent.push(item.name);
          this.allClick = true;
          $(".threeArea").show();
        }

        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        if(this.search){
          this.search = "";
        }

        this.getShopListPC();
        setTimeout(function () {
        //   if(!$("#areasChildrens i").hasClass("cur")){
            $("#areasChildrens i").eq(0).addClass("cur").siblings().removeClass("cur");
        //   }
        },100)
      },
      areaChildFun(e,item){//区域字级点击
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.areasId = item.childId;
        this.quyuChild = item.childName;
        this.areasName = [];
        this.allClick = true;
        this.curPage = 0;
        this.areasName.push(item.childName);

        this.getShopListPC();
      },
      yetaiChildFun(e,item){//业态字级点击
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.yetaiId = item.childId;
        this.yetaiName = [];
        this.allClick = true;
        this.curPage = 0;
        this.yetaiName.push(item.childName);

        this.getShopListPC();
      },
      yetaiFun(e,item){//业态一级点击
        this.curPage = 0;
        this.yetaiParent = [];
        this.yetaiName = [];
        this.yetaiChild = item;
        this.yetaiParentId = item.id;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");

        if(item.name == "不限"){
          this.allClick = false;
          $(".threeYetai").hide();
        }else{
          this.allClick = true;
          $(".threeYetai").show();
          this.yetaiParent.push(item.name);
        }
        if(this.search){
          this.search = "";
        }
        this.getShopListPC();
        setTimeout(function () {
          $("#yetaiChild i").eq(0).addClass("cur").siblings().removeClass("cur");
        },100)
      },
      mianjiFun(e,item){//面积一级点击
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.mianjiId = item.id;
        this.mianjiName = [];
        this.curPage = 0;

        if(item.name == "不限"){
          this.allClick = false;
        }else{
          this.allClick = true;
          this.mianjiName.push(item.name);
        }

        this.getShopListPC();
      },
      monthFun(e,item){//月租金点击
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        $("#transferChildren b").removeClass("cur");
        this.monthId = item.childId;
        this.monthName = [];
        this.clickChild = 1;
        this.curPage = 0;
        this.curPage = 0;
        this.transferId = "";

        if(item.childName == "不限"){
          this.allClick = false;
        }else{
          this.allClick = true;
          this.monthName.push(item.childName);
        }
        this.getShopListPC();
      },
      transferFun(e,item){//转让费点击
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        $("#monthChildren b").removeClass("cur");
        this.transferId = item.childId;
        this.monthId = "";
        this.transferName = [];
        this.clickChild = 2;
        this.curPage = 0;

        if(item.childName == "不限"){
          this.allClick = false;
        }else{
          this.allClick = true;
          this.transferName.push(item.childName);
        }
        this.getShopListPC();
      },
      areasParentRemove(){//已选区域父级
        this.areasParentId = "";
        this.areasId = "";
        this.areasParent = [];
        this.areasName = [];
        this.curPage = 0;
        this.search = "";
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
        }
        this.getShopListPC();
        $("#areasChildren b").eq(0).addClass("cur").siblings().removeClass("cur");
        $("#areasChildrens").hide()
        $("#areasChildrens i").removeClass("cur");

      },
      areaRemove(){//已选区域删除
        this.areasId = "";
        this.areasName = [];
        this.curPage = 0;
        this.quyuChild = "";
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
        }
        this.getShopListPC();
        $("#areasChildrens i").eq(0).addClass("cur").siblings().removeClass("cur");
      },
      yetaiParentRemove(){//已选区域父级
        this.yetaiParentId = "";
        this.yetaiParent = [];
        this.yetaiId = "";
        this.yetaiName = [];
        this.curPage = 0;
        this.search = "";
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
        }
        this.getShopListPC();
        $("#yetai b").eq(0).addClass("cur").siblings().removeClass("cur");

        $("#yetaiChild i").removeClass("cur");
        $("#yetaiChild").hide();
      },
      yetaiRemove(){
        this.curPage = 0;
        this.yetaiId = "";
        this.yetaiName = [];
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
        }
        $("#yetaiChild i").eq(0).addClass("cur").siblings().removeClass("cur");

        this.getShopListPC();
      },
      mianjiRemove(){
        this.curPage = 0;
        this.mianjiId = "";
        this.mianjiName = [];
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
        }
        $("#mianjiChildren b").eq(0).addClass("cur").siblings().removeClass("cur");

        this.getShopListPC();

      },
      monthRemove(){
        this.curPage = 0;
        this.monthId = "";
        this.monthName = [];
        this.transferName = [];
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
        }
        $("#monthChildren b").eq(0).addClass("cur").siblings().removeClass("cur");
        console.log(this.yetaiName)
        axios(this.changeData() + '/shop/getShopListPC',{
          method: 'post',
          params: {
            pageNumber: 0,
            pageSize: 10,
            search: this.search,
            businessCircleId: this.areasId || this.areasParentId,
            businessTypeId : this.yetaiId || this.yetaiParentId,
            areaId: this.mianjiId,
            priceId: this.monthId
          }
        })
          .then(res => {
            console.log(res)
            this.shopList = res.data.content;//商铺列表
            this.totalCount = res.data.count; //总铺源数
            if(this.shopList.length == 0){
              this.pageList = false;
              $(".shop-left").css({"background":"#fff"})
            }
          })
          .catch(err =>{
            console.log(err)
          })
      },
      transferRemove(){
        this.curPage = 0;
        this.transferId = "transfer";
        this.monthName = [];
        this.transferName = [];
        if(this.areasParent.length == 0 && this.areasName.length == 0 && this.yetaiParent.length == 0 && this.yetaiName.length == 0 && this.mianjiName.length == 0 && this.monthName.length == 0 && this.transferName.length == 0){
          this.allClick = false;
          this.quyu = "";
        }
        $("#transferChildren b").eq(0).addClass("cur").siblings().removeClass("cur");

        axios(this.changeData() + '/shop/getShopListPC',{
          method: 'post',
          params: {
            pageNumber: 0,
            pageSize: 10,
            search: this.search,
            businessCircleId: this.areasId || this.areasParentId,
            businessTypeId : this.yetaiId || this.yetaiParentId,
            areaId: this.mianjiId,
            priceId: this.transferId
          }
        })
          .then(res => {
            console.log(res)
            this.shopList = res.data.content;//商铺列表
            this.totalCount = res.data.count; //总铺源数
            if(this.shopList.length == 0){
              this.pageList = false;
              $(".shop-left").css({"background":"#fff"})
            }
          })
          .catch(err =>{
            console.log(err)
          })

      },
      allRemove(){
        this.curPage = 0;
        //选择的数组滞空
        this.areasParent = [];
        this.yetaiParent = [];
        this.areasName=[];//区域名称
        this.yetaiName=[];//业态名称
        this.mianjiName=[];//面积名称
        this.monthName=[];//月租金名称
        //筛选烌条件滞空
        this.quyu = "";
        this.quyuChild = "";
        this.areasId = "";
        this.areasParentId = "";
        this.yetaiId = "";
        this.yetaiParentId = "";
        this.mianjiId = "";
        this.monthId = "";
        this.transferId = "";
        this.search = "";
        this.allClick = false;//已选择的html不显示

        $("#areasChildren b").removeClass("cur");
        $("#areasChildrens i").removeClass("cur");
        $("#yetai b").removeClass("cur");
        $("#yetaiChild i").removeClass("cur");
        $("#mianjiChildren b").removeClass("cur");
        $("#monthChildren b").removeClass("cur");
        $("#transferChildren b").removeClass("cur");

        $("#areasChildren b").eq(0).addClass("cur");
        $("#yetai b").eq(0).addClass("cur");
        $("#mianjiChildren b").eq(0).addClass("cur");
        $("#monthChildren b").eq(0).addClass("cur");

        $("#yetaiChild").hide();
        $("#areasChildrens").hide();
        this.getShopListPC();
      },
      searchClick(){//收起选项
        this.packUp = !this.packUp;
        if($(".search-click span").hasClass("cur")){
          $(".search-click").html("更多选项 <span></span>");
        }else{
          $(".search-click").html("收起选项 <span class='cur'></span>");
          // $("#transferChildren b").eq(0).addClass("cur");
        }
      },
      handleCurrentChange(val){//分页
        console.log(val)
        this.page = val - 1;
        this.curPage = val;
        if(this.page < 0){
          this.page = 0;
        }
        $('html,body').animate({scrollTop: 100},100);

        axios(this.changeData() + '/shop/getShopListPC',{
          method: 'post',
          params: {
            pageNumber: this.page,
            pageSize: 10,
            search: this.search,
            businessCircleId: this.areasId || this.areasParentId,
            businessTypeId : this.yetaiId || this.yetaiParentId,
            areaId: this.mianjiId,
            priceId: this.monthId || this.transferId,
          }
        })
        // axios.post('http://192.168.1.138:8080/shop/getShopListPC',qs.stringify(data))
        .then(res => {
          console.log(res)
          this.shopList = res.data.content;//商铺列表
        })
        .catch(err =>{
          console.log(err)
        })
      },
      goShopDetail(id){//跳转到详情页面
        // window.location.href = "shopDetail.html?shopId=" + id;
        window.open("shopDetail.html?shopId=" + id);
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../common/css/shoplist.css';
  @import '../../common/css/shopMsg.css';
  @import '../../common/css/shopPages.css';
</style>
