<template>
  <div id="app">
    <Nav></Nav>
    <Buy v-if="buy===1 || buy===2" :child-buy="buy" @buyFun="myFun()"></Buy>
    <div class="model-wrap" v-if="modelPu===1">
      <div class="model">
        <h2>您找到满意的铺源了吗？</h2>
        <p>输入手机号专家免费帮您找铺</p>
        <div class="input"><input v-model="modelTxt" type="text" placeholder="输入手机号，专家免费帮您找铺"><span>*请输入手机号</span></div>
        <div class="btn"><span @click="zhaoFun()">我要找铺</span><b @click="zhuanFun()">我要转铺</b></div>
        <div class="close" @click="modelPu=0"></div>
      </div>
    </div>
    <div class="model-inner" v-if="modelSuccee===1">
      <div class="model">
        <p>委托成功,优铺客服会在<span>24小时内</span>与您联系， 请保持手机畅通！</p>
        <div @click="modelSuccee=0">我知道了</div>
      </div>
    </div>
    <div class="shopDetail w1200">
      <h2><span><a href="index.html">首页</a>><a href="shopList.html">北京</a>>{{wzxx.areaName}}>{{businessAreaName}}>商铺详情</span>
        <div class="search">
          <input type="text" placeholder="区域/商圈/业态/商铺编号" v-model="search" @keyup.enter="searchFun()"><button @click="searchFun()"></button>
        </div>
      </h2>
      <div class="shopDetail-msg">
        <div class="shop-banner clearfix">
          <div class="shop-left left">
            <div class="big">
              <div class="prev"></div>
              <div class="next"></div>
              <ul>
                <li v-for="item in imgs"><img :src="item" alt=""></li>
              </ul>
            </div>
            <div class="small">
              <ol>
                <li v-for="item in imgs"><img :src="item" alt=""></li>
              </ol>
            </div>
          </div>
          <div class="shop-right right">
            <h3>{{wzxx.areaName}}{{businessAreaName}}{{wzxx.road}}{{useArea}}m²&nbsp;,<b v-show="rentType">&nbsp;{{rentType}}&nbsp;,</b>&nbsp;{{license}}</h3>
            <div class="bianhao">
              <span>商铺编号：{{shopNumber}}</span>
              <div class="shoucang" @click="shoucang($event)">
                收藏
              </div>
            </div>
            <ul class="price">
              <li>
                <p><span>{{monthlyRent}} </span><i>{{unitMonthRent}}</i> <s>{{dailyRent}} {{unitDailyRent}}</s></p>
                <p>租金</p>
                <div class="line"></div>
              </li>
              <li v-if="dailyRent">
                <p><span>{{dailyRent}}</span> <b>{{unitDailyRent}}</b></p>
                <p>日租金</p>
                <div class="line"></div>
              </li>
              <li>
                <p><span>{{zrfy.transferFee}}</span> <b>{{zrfy.unitTransFerfee}}</b></p>
                <p>转让费</p>
              </li>
            </ul>
            <div class="tag">
              <span v-for="item in shopTags">{{item}}</span>
            </div>
            <div class="address">
              <div v-if="add===1" class="clearfix"><span>地址：</span><b>{{wzxx.road}} &nbsp;附近</b><i @click="address()">查看详细地址</i><a href="javascript:;"><em></em><s @click="mapBtn()">查看地图</s></a></div>
              <div v-else-if="add===2" class="look clearfix"><span>地址：</span><b>{{wzxx.areaName}}{{wzxx.road}}{{realAddress}}</b><a href="javascript:;"><em></em><s @click="mapBtn()">查看地图</s></a></div>
            </div>
            <div v-if="tel===1" class="telPhone" @click="telPhone()">
              <span></span><b>查看店主电话</b>
              <div class="telPhone-msg">已有{{browseCount}}人浏览了本铺，建议尽快联系看铺 <i class="jiao"></i></div>
            </div>
            <div v-else-if="tel===2" class="telPhone">
              <span></span><b>{{iphone}}</b>
            </div>
          </div>
        </div>
        <div class="title-list">
          <div class="title">
            <span class="cur">配套设施</span>
            <span>经营状态</span>
            <span>物业信息</span>
            <span>费用信息</span>
            <span class="m0">位置信息</span>
          </div>
        </div>
        <div class="shop-msg clearfix">
         <div class="shopMsg-left left">

            <div class="sheshi" id="sheshi">
              <h3><span></span>配套设施</h3>
              <div class="list clearfix">
                <dl>
                  <dt class="dian"></dt>
                  <dd>380伏</dd>
                </dl>
                <dl>
                  <dt class="pai"></dt>
                  <dd>排污管道</dd>
                </dl>
                <dl>
                  <dt class="yan"></dt>
                  <dd>烟管道</dd>
                </dl>
                <dl>
                  <dt class="xia"></dt>
                  <dd>下水</dd>
                </dl>
                <dl>
                  <dt class="shang"></dt>
                  <dd>上水</dd>
                </dl>
                <dl>
                  <dt class="wai"></dt>
                  <dd>外摆区</dd>
                </dl>
                <dl>
                  <dt class="ting"></dt>
                  <dd>停车位</dd>
                </dl>
                <dl>
                  <dt class="mei"></dt>
                  <dd>煤气</dd>
                </dl>
                <dl>
                  <dt class="tian"></dt>
                  <dd>天然气</dd>
                </dl>
                <dl>
                  <dt class="ming"></dt>
                  <dd>明火</dd>
                </dl>
              </div>
            </div>
           <div class="jingying" id="jingyin">
             <h3><span></span>经营状态</h3>
             <ul class="clearfix">
               <li v-show="manageType"><span>当前经营：</span><b class="manageType" :title="manageType">{{manageType1}}</b></li>
               <li v-show="license"><span><b>证</b>照：</span><b>{{license}}</b></li>
               <li v-show="shopPapers.length > 0"><span>已有证件：</span><b v-if="index < 1" class="teshu" v-for="(item,index) in shopPapers">{{item}} &nbsp;</b><b v-if="shopPapers.length > 1">等{{shopPapers.length}}项 &nbsp;</b><a
                 href="javascript:;" class="blue" @click="certificateFun()" v-if="shopPapers.length > 2">详情</a>
                 <div class="look" v-if="certificate"><b v-for="(item,index) in shopPapers">{{item}} &nbsp;</b><s @click="delcertificateFun()"></s></div>
               </li>
               <li v-show="jyzt.manageStatus"><span>经营状态：</span><b>{{jyzt.manageStatus}}</b></li>
               <li v-show="shopAdvantages.length > 0"><span>本店优势：</span><b v-if="index < 1" class="teshu" v-for="(item,index) in shopAdvantages">{{item}} &nbsp;</b><b v-if="shopAdvantages.length > 1">等{{shopAdvantages.length}}项 &nbsp;</b><a
                 href="javascript:;" class="blue" @click="advantageFun()" v-if="shopAdvantages.length > 2">详情</a>
                 <div class="look" v-if="advantage"><b v-for="(item,index) in shopAdvantages">{{item}}</b><s @click="deladvantageFun()"></s></div>
               </li>
               <li v-show="jyzt.brandStatus"><span>品牌情况：</span><b v-for="item in jyzt.brandStatus">{{item}}</b></li>
               <li v-show="jyzt.noManageType" class="m0"><span>不可经营业态：</span><b>{{jyzt.noManageType}}</b></li>
               <div class="transfer" v-show="shopIssues.length > 0"><span>过往经营最的大问题：</span><b v-if="index < 1" class="teshu" v-for="(item,index) in shopIssues">{{item}} &nbsp;</b><b v-if="shopIssues.length > 1">等{{shopIssues.length}}项 &nbsp;</b><a
                 href="javascript:;" class="blue" @click="issueFun()" v-if="shopIssues.length > 2">详情</a>
                 <div class="look lookBig" v-if="issue"><b v-for="(item,index) in shopIssues">{{item}} &nbsp;</b><s @click="delissueFun()"></s></div>
               </div>
             </ul>
           </div>
           <div class="jingying wuye" id="wuye">
             <h3><span></span>物业信息</h3>
             <ul class="clearfix">
               <li v-show="wyxx.typeName"><span>商铺类型：</span><b>{{wyxx.typeName}}</b></li>
               <li v-show="wyxx.buildArea"><span>建筑面积：</span><b>{{wyxx.buildArea}}m²</b></li>
               <li v-show="useArea"><span>使用面积：</span><b>{{useArea}}m²</b></li>
               <li v-show="wyxx.floor"><span><b>楼</b>层：</span><b>{{wyxx.floor}}</b></li>
               <li v-show="wyxx.spearate"><span>是否分隔：</span><b>{{wyxx.spearate}}</b></li>
               <li v-show="wyxx.froutage"><span>临主干道：</span><b>{{wyxx.froutage}}</b></li>
               <li v-show="wyxx.floorHeight"><span><b>层</b>高：</span><b>{{wyxx.floorHeight}}m</b></li>
               <li v-show="wyxx.faceWidth"><span><b>面</b>宽：</span><b>{{wyxx.faceWidth}}m</b></li>
               <li v-show="wyxx.depth"><span><b>进</b>深：</span><b>{{wyxx.depth}}m</b></li>
               <li v-show="wyxx.orientation"><span><b>朝</b>向：</span><b>{{wyxx.orientation}}</b></li>
               <li v-show="wyxx.propertyName"><span><b>产</b>权：</span><b>{{wyxx.propertyName}}</b></li>
               <li v-show="" class="m0"><span>其他产权：</span><b>{{}}</b></li>
             </ul>
           </div>
           <div class="jingying zuyue" id="feiyong">
             <h3><span></span>费用信息</h3>
             <ul class="clearfix">
               <li v-show="monthlyRent"><span><i>月</i><i>租</i>金：</span><b>{{monthlyRent}}{{unitMonthRent}}</b></li>
               <li v-show="wyxx.pledgeCash"><span><b>押</b>金：</span><b>{{wyxx.pledgeCash}}</b></li>
               <li v-show="wyxx.payType"><span>支付方式：</span><b>{{wyxx.payType}}</b></li>
               <li v-show="wyxx.timeRent"><span>分时出租：</span><b>{{wyxx.timeRent}}</b></li>
               <li v-show="wyxx.maxLease"><span>最长租约：</span><b>{{wyxx.maxLease}}个月</b></li>
               <li v-show="wyxx.currLease"><span>当前租约：</span><b>{{wyxx.currLease}}个月</b></li>
               <li v-show="wyxx.residue"><span><i>还</i><i>剩</i>余：</span><b>{{wyxx.residue}}个月</b></li>
               <li v-show="wyxx.leaseCase" class="m0"><span>续约情况：</span><b>{{wyxx.leaseCase}}</b></li>
               <li><span><i>转</i><i>让</i>费：</span><b>{{zrfy.transferFee}}{{zrfy.unitTransFerfee}}</b></li>
             </ul>
           </div>
         </div>
         <div class="shopMsg-right right">
           <a href="appDownload.html"></a>
         </div>
        </div>
        <div class="weizhi w1200" id="map">
          <h3><span></span>位置信息</h3>
          <div id="allmap"></div>
        </div>
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
import Buy from 'components/Buy/Buy'
import Navbar from 'components/Navbar/Navbar'
import Footer from 'components/Footer/Footer'
import {getQueryString,GetRequest,url} from 'common/js/common.js'

export default {
    name: 'app',
    data(){
      return{
        buy: false,
        pvCount: "",
        browseCount: "",//多少人看了该商铺
        modelTxt: "",
        modelSuccee:"",//委托成功
        modelPu: "",//找铺转铺
        certificate: false,//证件显示
        advantage: false,//本店优势显示
        issue: false,//过往经营最大问题显示
        shopId: "",//商铺id
        imgs: '',//商铺图片
        tel: 1,
        add: 1,//控制查看详细地址按钮
        monthlyRent: "",
        dailyRent: "",
        shopTags:"",//标签
        realAddress: "",
        shopPapers: "",
        license: "",
        manageType: "",
        manageType1: "",
        shopNumber: "",
        shopSupportings: "",
        wyxx: "",
        useArea: "",
        wzxx: "",
        jyzt: "",
        imgs: "",
        gnote: "",
        zrfy: "",
        shopIssues: "",
        shopAdvantages: "",
        brandStatus: "",
        iphone: "",
        rentType: "",
        businessAreaName: "",
        fenxiangID: "",
        unitDailyRent: "",
        unitMonthRent: "",
        unitTransFerfee: "",
        numIndex: "",  // 查看商铺次数
        bolClick: true,  // 是否点击
        shopIdObj: "", // 判断是否收藏id
        checkedLook: false, // 判断此商铺是否被查看过
        countNum: false, //
        search:"",//搜索字段
      }
    },
    components: {
      Nav,
      Buy,
      Navbar,
      Footer
    },
    created(){

    },
    mounted(){
      var that = this;
      //没有登录30秒后弹框
      if(localStorage.token == undefined){
        setTimeout(function () {
          that.modelPu = 1;
        },30000)
      }
      this.shopId = getQueryString("shopId");
      this.init();//初始化信息
      this.dataPost();//判断有没有查看过该商铺
    },
    updated(){
      this.map();//地图
      this.banner();//图片功能
      this.navTop();//导航栏功能
      // $(".small ol").css({"width":this.imgs.length * 148 + "px"})
      var manageType =  $(".manageType").text();
      if(manageType.length >= 10){
       this.manageType1 =  manageType.substring(0,10)+"...";
      }
    },
    methods: {
      myFun(){
        this.buy = false;
      },
      zhaoFun(){
        let that = this;
        let kong = /^\s*$/g;
        let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(kong.test(this.modelTxt)){
          $(".input span").show();
          $(".input span").html("*请输入手机号");
        }else if(!reg.test(this.modelTxt)){
          $(".input span").show();
          $(".input span").html("*请输入正确手机号");
        }else{
          axios(this.changeData() + '/show/addCutomer',{
            method: 'post',
            params: {
              account: this.modelTxt,
              type: '1',
              source: "3"
            }
          }).then(data => {
            if(data.data.code == 200){
              that.modelPu = 0;
              that.modelSuccee = 1;
            }
          }).catch(err => {
            console.log(err)
          });
        }
      },
      zhuanFun(){
        let that = this;
        let kong = /^\s*$/g;
        let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(kong.test(this.modelTxt)){
          $(".input span").show();
          $(".input span").html("*请输入手机号");
        }else if(!reg.test(this.modelTxt)){
          $(".input span").show();
          $(".input span").html("*请输入正确手机号");
        }else{
          axios(this.changeData() + '/show/addCutomer',{
            method: 'post',
            params: {
              account: this.modelTxt,
              type: '2',
              source: "3"
            }
          }).then(data => {
            if(data.data.code == 200){
              that.modelPu = 0;
              that.modelSuccee = 1;
            }
          }).catch(err => {
            console.log(err)
          });
        }
      },
      certificateFun(){ //已有证件点击详情
        this.certificate = true;
      },
      delcertificateFun(){
        this.certificate = false;
      },
      advantageFun(){ //本店优势点击详情
        this.advantage = true;
      },
      deladvantageFun(){
        this.advantage = false;
      },
      issueFun(){ //过往经营最大问题点击详情
        this.issue = true;
      },
      delissueFun(){
        this.issue = false;
      },
      init(){
        axios(this.changeData() + '/shop/getShopDetail',{
          method: 'post',
          params: {
            shopId : this.shopId
          }
        })
        .then(res => {
          console.log(res)
          this.browseCount = res.data.browseCount;
          this.imgs = res.data.imgs;//图片
          this.dailyRent = res.data.dailyRent;
          this.monthlyRent = res.data.monthlyRent;
          this.shopTags = res.data.shopTags;//标签
          this.realAddress = res.data.realAddress;
          this.shopPapers = res.data.shopPapers;//已有证件
          this.useArea = res.data.useArea;
          this.license = res.data.license;
          this.manageType = res.data.manageType;
          this.manageType1 = res.data.manageType;
          this.shopNumber = res.data.shopNumber;
          this.shopSupportings = res.data.shopSupportings;
          this.wyxx = res.data.wyxx;
          this.wzxx = res.data.wzxx;
          this.jyzt = res.data.jyzt;
          this.zrfy = res.data.zrfy;
          this.lng = res.data.lng;//纬度
          this.lat = res.data.lat;//经度
          this.shopIssues = res.data.jyzt.shopIssues;
          this.shopAdvantages = res.data.jyzt.shopAdvantages;
          this.brandStatus = res.data.jyzt.brandStatus;
          this.iphone = res.data.phone;//手机号
          this.rentType = res.data.rentType;
          this.businessAreaName = res.data.businessAreaName;
          this.unitMonthRent = res.data.unitMonthRent;
          this.unitDailyRent = res.data.unitDailyRent;
          this.unitTransFerfee = res.data.unitTransFerfee;
          //配套设施
          try{
            this.shopSupportings.forEach(function (item) {
              $(".list dl").each(function (index,item1) {
                if(item == $(item1).find("dd").html()){
                  $(item1).addClass("cur");
                }
              })
            })
          }catch(e){
            console.log(e)
          }
          if( this.shopTags.length > 5){
            $(".telPhone").css({"margin":"30px auto 0"})
          }
        })
        .catch(err =>{
          console.log(err)
        })
      },
      dataPost(){
        var that = this;
        axios(this.changeData() + '/user/shopCheckedRecords',{
          method: 'post',
          params: {
            account: localStorage.iphone,
            shopId: this.shopId,
            type: "0",
            token: localStorage.token
          }
        })
        .then(res => {
          console.log(res)
          if(res.data.code == "200"){
            this.shopIdObj = res.data.shopId;
            // 'true' 查看过  false 没有查看过
            if(res.data.checkedStatus == 'true'){
              this.add = 2;
              this.checkedLook = "true";
            }
            if(res.data.count == 1){
              this.countNum = true;
            }
            if(res.data.collectionStatus == 'true') {
              $(".shoucang").addClass("cur");
            }
          }else if(res.data.code == "401"){
            localStorage.clear();
          }
        })
        .catch(err =>{
          console.log(err)
        })
      },
      searchFun(){//搜索
        var reg = /^\s*$/g;
        if(reg.test(this.search) || this.search == null || this.search == ""){
          this.$layer.msg("搜索内容不能为空")
        }else{
          window.location.href = "shopList.html?search=" + this.search;
        }
      },
      banner(){
        var that = this;
        var index = 0;
        var num = 0;
        var len = this.imgs.length;

        $(".big ul li").eq(0).show().siblings().hide();
        $(".small ol li").eq(index).addClass("cur").siblings().removeClass("cur");
        $(".small ol li").on("click",function () {
          index = $(this).index();
          $(this).addClass("cur").siblings().removeClass("cur");
          $(".big ul li").eq(index).show().siblings().hide();
          console.log(index+"---")
        })
        $(".big .prev").on("click",function () {
          if(index == 0){
            index = 0;
            that.$layer.msg("已经是第一张了")
          }
          else{
            index--;
            if(index <= 3){
              var small = index - 4;
              $(".small ol li:lt("+small+")").show();
            }
          }

          $(".small ol li").eq(index).addClass("cur").siblings().removeClass("cur");
          $(".big ul li").eq(index).show().siblings().hide();
        })
        $(".big .next").on("click",function () {
          if(index == that.imgs.length-1){
            index = that.imgs.length-1;
            that.$layer.msg("已经是最后一张了")
          }else{
            index++;
            num++;

            if(index >= 4){
              var small = index - 3;
              var big = index + 1;
              $(".small ol li:lt("+small+")").hide();
            }
          }

          $(".small ol li").eq(index).addClass("cur").siblings().removeClass("cur");
          $(".big ul li").eq(index).show().siblings().hide();
        })
      },
      map(){
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(this.lat,this.lng);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.centerAndZoom(point, 15);
        var opts = {
          width : 200,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title : this.wzxx.areaName+"-"+this.businessAreaName , // 信息窗口标题
          enableMessage:true,//设置允许信息窗发送短息
          message:""
        }
        var infoWindow = "";
        if(this.numIndex == 0 && this.checkedLook == false && this.countNum == false){
          infoWindow = new BMap.InfoWindow(this.wzxx.road + "附近", opts);  // 次数用完
        }else{
          infoWindow = new BMap.InfoWindow(this.wzxx.areaName+this.wzxx.road+this.realAddress, opts);  // 次数还没用完
        }
        map.openInfoWindow(infoWindow,point); //开启信息窗口
      },
      navTop(){
        var navTop = $(".title").offset().top;
        var allTop = [
          $("#sheshi").offset().top -80,
          $("#jingyin").offset().top -80,
          $("#wuye").offset().top -80,
          $("#feiyong").offset().top -80,
          $("#map").offset().top -80,
          0
        ]

        $(window).scroll(function() {
          var winTop = $(window).scrollTop();
          if( winTop >= navTop){
            $(".title").addClass("cur");
          }else{
            $(".title").removeClass("cur");
          }

          if(winTop < allTop[1]){
            $(".title span").eq(0).addClass("cur").siblings().removeClass("cur")
          }else if(winTop < allTop[2]){
            $(".title span").eq(1).addClass("cur").siblings().removeClass("cur")
          }else if(winTop < allTop[3]){
            $(".title span").eq(2).addClass("cur").siblings().removeClass("cur")
          }else if(winTop < allTop[4]){
            $(".title span").eq(3).addClass("cur").siblings().removeClass("cur")
          }else{
            $(".title span").eq(4).addClass("cur").siblings().removeClass("cur")
          }
        })

        $(".title span").on("click",function () {
          var index = $(this).index();
          $('html,body').animate({scrollTop:allTop[index]}, 100);
        })
      },
      address(){//查看地址
        let that = this
        axios(this.changeData() + '/user/shopCheckedRecords',{
          method: 'post',
          params: {
            account: localStorage.iphone,
            shopId: this.shopId,
            type: "1",
            token: localStorage.token
          }
        })
        .then(res => {
          console.log(res)
          if(res.data.code == 200){
            this.numIndex = res.data.count;
            this.pvCount = res.data.pvCount;
            if(this.checkedLook != 'true'){
              if(this.bolClick){
                that.$alert('您今日还可免费查看 <span class="red">'+that.numIndex+'</span> 套商铺（共'+that.pvCount+'套/日）', {
                  confirmButtonText: '确定',
                  dangerouslyUseHTMLString: true,
                  center: true
                });
                this.bolClick = false;
              }
            }
            //如果次数等于0并且没有查看过并且
            if(res.data.count == 0 && this.checkedLook == false && this.countNum == false){
              // that.$alert('温馨提示，您今日'+that.pvCount+'次看铺机会已用完，可明天再来哦~', {
              //   confirmButtonText: '明天再来',
              //
              //   center: true
              // });

              that.$confirm('温馨提示，您今日'+that.pvCount+'次看铺机会已用完，可明天再来哦~', {
                confirmButtonText: '立即开通',
                cancelButtonText: '明天再来',
                center: true
              }).then(() => {
                //立即开通
                that.buy = 1;
              }).catch(() => {
               //明天再来
              });
            }else{
              this.add = 2;
            }
          }else if(res.data.code=="401"){
            localStorage.clear();
            that.$layer.msg("请先登录")
            setTimeout(function () {
              window.location.href = "login.html?goId=1";
            },2000)
          }
        })
        .catch(err =>{
          console.log(err)
        })
      },
      mapBtn(){//查看地图
        let that = this;
        var top =  $("#map").offset().top -80;
        axios(this.changeData() + '/user/shopCheckedRecords',{
          method: 'post',
          params: {
            account: localStorage.iphone,
            shopId: this.shopId,
            type: "1",
            token: localStorage.token
          }
        })
        .then(res => {
          console.log(res)
          if(res.data.code == "200"){
            $('html,body').animate({scrollTop:top}, 100);
            this.numIndex = res.data.count;
            this.pvCount = res.data.pvCount;
            if(this.checkedLook != 'true'){
              if(this.bolClick){
                that.$alert('您今日还可免费查看 <span class="red">'+that.numIndex+'</span> 套商铺（共'+that.pvCount+'套/日）', {
                  confirmButtonText: '确定',
                  dangerouslyUseHTMLString: true,
                  center: true
                });
                this.bolClick = false;
              }
            }
            if(res.data.count == 0 && this.checkedLook == false && this.countNum == false){
              // that.$alert('温馨提示，您今日'+that.pvCount+'次看铺机会已用完，可明天再来哦~', {
              //   confirmButtonText: '明天再来',
              //   center: true
              // });
              that.$confirm('温馨提示，您今日'+that.pvCount+'次看铺机会已用完，可明天再来哦~', {
                confirmButtonText: '立即开通',
                cancelButtonText: '明天再来',
                center: true
              }).then(() => {
                //立即开通
                that.buy = 1;
              }).catch(() => {
                //明天再来
              });
            }else{
              this.map();
            }
          }else if(res.data.code=="401"){
            localStorage.clear();
            that.$layer.msg("请先登录")
            setTimeout(function () {
              window.location.href = "login.html?goId=1";
            },2000)
          }
        })
        .catch(err =>{
          console.log(err)
        })
      },
      telPhone(){//直播店主
        let that = this;
        axios(this.changeData() + '/user/shopCheckedRecords',{
          method: 'post',
          params: {
            account: localStorage.iphone,
            shopId: this.shopId,
            type: "1",
            token: localStorage.token
          }
        })
        .then(res => {
          console.log(res)
          if(res.data.code=="200"){
            this.numIndex = res.data.count;
            this.pvCount = res.data.pvCount;
            if(this.checkedLook != 'true'){
              if(this.bolClick){
                that.$alert('您今日还可免费查看 <span class="red">'+that.numIndex+'</span> 套商铺（共'+that.pvCount+'套/日）', {
                  confirmButtonText: '确定',
                  dangerouslyUseHTMLString: true,
                  center: true
                });
                this.bolClick = false;
              }
            }
            if(res.data.count == 0 && this.checkedLook == false && this.countNum == false){
              // that.$alert('温馨提示，您今日'+that.pvCount+'次看铺机会已用完，可明天再来哦~', {
              //   confirmButtonText: '明天再来',
              //   center: true
              // });
              that.$confirm('温馨提示，您今日'+that.pvCount+'次看铺机会已用完，可明天再来哦~', {
                confirmButtonText: '立即开通',
                cancelButtonText: '明天再来',
                center: true
              }).then(() => {
                //立即开通
                that.buy = 1;
              }).catch(() => {
                //明天再来
              });
            }else{
              this.tel=2;
            }
          }else if(res.data.code=="401"){
            localStorage.clear();
            that.$layer.msg("请先登录")
            setTimeout(function () {
              window.location.href = "login.html?goId=1";
            },2000)
          }
        })
        .catch(err =>{
          console.log(err)
        })
      },
      shoucang(e){
        var that = this;
        if($(e.srcElement).hasClass("cur")){
          axios(this.changeData() + '/shopCollection/dele',{
            method: 'post',
            params: {
              shopId: this.shopIdObj,
              token: localStorage.token
            }
          })
          .then(res => {
            console.log(res)
            if(res.data.code=="200"){
              $(e.srcElement).removeClass("cur");
              this.$layer.msg("取消收藏");
            }else if(res.data.code=="401"){
              localStorage.clear();
            }
          })
          .catch(err =>{
            console.log(err)
          })
        }else{
          axios(this.changeData() + '/shopCollection/save',{
            method: 'post',
            params: {
              shopId: this.shopId,
              userId: localStorage.iphone,
              token: localStorage.token
            }
          })
          .then(res => {
            console.log(res)
            if(res.data.code=="200"){
              that.shopIdObj = res.data.shopCollId;
              $(e.srcElement).addClass("cur");
              this.$layer.msg("收藏成功");
            }else if(res.data.code=="401"){
              localStorage.clear();
              that.$layer.msg("请先登录")
              setTimeout(function () {
                window.location.href = "login.html?goId=1";
              },2000)
            }
          })
          .catch(err =>{
            console.log(err)
          })
        }
      },
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../common/css/shopDetail.css';
</style>
