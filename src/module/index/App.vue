<template>
    <div id="app">
      <Nav></Nav>
      <!-- 轮播图 -->
      <div class="playImg">
          <el-carousel trigger="click" height="400px" :interval="5000">
              <el-carousel-item v-for="(item,index) in lbtArr">
                  <h3 @click="goNewInfo(item.artitleId,item.type)"><img :src="item.url"></h3>
                  <!-- <h3><img src="./images/lunbo.png"></h3> -->
              </el-carousel-item>
          </el-carousel>
          <!-- 搜索 -->
          <div class="playImg_wrap">
              <div class="playImg_box">
                  <div class="playImg_top">
                      <input type="text" name="" placeholder="区域/面积/租金/商铺编号" v-model="searchShop">
                      <button @click="searchBtn">搜索商铺</button>
                  </div>
                  <div class="playImg_main">
                      <dl class="dl1">
                          <dt><img src="./images/site.png"></dt>
                          <dd>区域</dd>
                          <ul>
                              <li><span v-for="(item,index) in searchCity" v-if="index > 0 && index < 11" @click="goSearch1(item.id,item.name)">{{item.name}}</span></li>
                          </ul>
                      </dl>

                      <dl class="dl2">
                          <dt><img src="./images/area.png"></dt>
                          <dd>面积</dd>
                          <ul>
                              <li><span v-for="(item,index) in squareTitleArr" v-if="index > 0" @click="goSearch2(item.id)">{{item.name}}</span></li>
                          </ul>
                      </dl>

                      <dl class="dl3">
                          <dt><img src="./images/money.png"></dt>
                          <dd>月租</dd>
                          <ul>
                              <li><span v-for="(item,index) in monthRent" v-if="index > 0" @click="goSearch3(item.childId)">{{item.childName}}</span></li>
                          </ul>
                      </dl>
                  </div>
              </div>             
          </div>
      </div>

      <!-- 我要委托 -->
      <div class="head_title">
          <h2>我要委托</h2>
          <h4>I WANT TO ENTRUST</h4>
      </div>
      <div class="entrust_wrap">
          <div class="entrust_box">
              <div class="entrust_input">
                  <input type="text" name="" placeholder="请输入手机号" maxlength="11" v-model="telVal">
                  <img src="./images/phone.png">
              </div>
              <div class="entrust_dl">
                  <dl class="dl_left">
                      <dt @click="seekBtn">委托找铺</dt>
                      <dd>已有<span>{{this.seekShopObj}}</span>人委托找铺</dd>
                  </dl>
                  <dl class="dl_right">
                      <dt @click="turnBtn">委托转铺</dt>
                      <dd>已有<span>{{this.turnShopObj}}</span>人委托转铺</dd>
                  </dl>
              </div>
          </div>          
      </div>

      <!-- 优选旺铺 -->
      <div class="head_title">
          <h2>优选旺铺</h2>
          <h4>OPTIMIZATION WINPORT</h4>
      </div>
      <div class="shoplist_wrap clearfloat">
          <div class="shoplist_dl" v-for="(item,index) in shopListArr" v-if="index < 8" @click="goShop(item.id)">
              <dl>
                  <dt>
                      <!-- <img :src="item.img" alt=""> -->
                      <img :src="item.img" alt="" v-if="isIEObj == 100">
                      <img v-lazy="item.img" alt="" v-else>
                  </dt>
                  <dd>              
                      <h3>{{item.title}}</h3>
                      <p><b>月租金：</b><span class="span1">{{item.monthlyRent}}{{item.unit}}</span></p>
                      <p><b>转让费：</b><span>{{item.transferFee}}</span>{{item.unitTransFerfee}}</p>
                  </dd>
              </dl>
          </div>         
      </div>
      <div class="more_wrap">
          <div class="more_box" @click="more_box">
              更多<span>北京在转/在租商铺</span>
          </div>
      </div>

      <!--  区域 -->
      <div class="area_wrap">
          <div class="area_nav">
              <ul>                  
                  <li :class="{'on1' :tab1 == item.id}" @click="areaShopList(item.city,item.id)" v-for="(item,index) in cityList">{{item.city}}</li>
              </ul>
          </div>
          <div class="shoplist_wrap clearfloat">
              <div class="shoplist_dl" v-for="(item,index) in areaShopArr" v-if="index < 4" @click="goShop(item.id)">
                  <dl>
                      <dt>
                          <img :src="item.img" alt="" v-if="isIEObj == 100">
                          <img v-lazy="item.img" alt="" v-else>
                      </dt>
                      <dd>              
                          <h3>{{item.title}}</h3>
                          <p><b>月租金：</b><span class="span1">{{item.monthlyRent}}{{item.unit}}</span></p>
                          <p><b>转让费：</b><span>{{item.transferFee}}</span>{{item.unitTransFerfee}}</p>
                      </dd>
                  </dl>
              </div>         
          </div>           
      </div>
      <div class="more_wrap">
          <div class="more_box" @click="more_box">更多</div>
      </div>
      
      <!-- 面积 -->
      <div class="square_wrap area_wrap">
          <div class="square_nav area_nav">
              <ul>                  
                  <li :class="{'on2' :tab2 == item.id}" @click="squareShopList(item.id)" v-for="(item,index) in squareTitleArr" v-if="index > 0">{{item.name}}</li>
                   <!-- <li :class="{'on2' :tab2 == item.id}" @click="squareShopList(item.id)" v-for="(item,index) in squareTitleArr">{{item.name}}</li> -->
              </ul>
          </div>

          <div class="shoplist_wrap clearfloat">
              <div class="shoplist_dl" v-for="(item,index) in squareShopArr" v-if="index < 4" @click="goShop(item.id)">
                  <dl class="dl_shade">
                      <dt>
                          <img :src="item.img" alt="" v-if="isIEObj == 100">
                          <img v-lazy="item.img" alt="" v-else>                        
                      </dt>
                      <dd>              
                          <h3>{{item.title}}</h3>
                          <p><b>月租金：</b><span class="span1">{{item.monthlyRent}}{{item.unit}}</span></p>
                          <p><b>转让费：</b><span>{{item.transferFee}}</span>{{item.unitTransFerfee}}</p>
                      </dd>
                  </dl>
              </div>         
          </div>           
      </div>
      <div class="more_wrap">
          <div class="more_box" @click="more_box">更多</div>
      </div>

      <!-- 投资机构 -->
      <div class="head_title">
          <h2>投资机构</h2>
          <h4>INVESTMENT INSTITUTION</h4>
      </div>
      <div class="investment">
          <ul>
             <li @mouseenter="investment_li1"><img src="./images/one.png"></li>
             <li @mouseenter="investment_li2"><img src="./images/two.png"></li>
             <li @mouseenter="investment_li3"><img src="./images/three.png"></li>
             <li @mouseenter="investment_li4"><img src="./images/four.png"></li>
          </ul>
          <div v-if="investment_info1">
              <p>东方邦信置业有限公司成立于2013年12月27日。东方邦信置业系中国东方资产管理公司的二级子公司，由邦信资产管理有限公司100%控股，为邦信资产的房地产业务主要投资平台。</p>
              <p>公司业务以房地产金融为主，以房地产开发和持有型物业经营管理为辅。打造一体化的房地产金融运作模式，形成封闭的全产业链，具有房地产融资、基金募集管理，住宅、商业、写字楼等地产投资开发，持有物业运营等全产业链运作能力。</p>
          </div>

          <div v-if="investment_info2">
              <p>优享创智（5Lmeet）成立于 2015 年 12 月，由毛大庆博士发起成立。汇集了包括红杉资本中国基金、真格基金、信中利、歌斐资产、新加坡政府投资公司（GIC）、君紫资本、金运电气、领势投资、盛景网联、中融融优、东方华盖、高榕资本、北极光创投、大宏集团、泰合集团、百福嘉、创合汇、三磊设计、光辉建业、开封文投等数十个顶级投资机构及各领域知名企业家, 旗下主打的第一条产品线名称为“共享际”系列。</p>
              <p>基于对中国大城市的城市更新、共享经济发展和地产领域创新这三个投资主题相融合所蕴藏的巨大战略机会的把握，共享际立志将城市存量资产升级改造为囊括居住、工作、健康、休闲、文化、娱乐等立体内容的一站式空间，由优享创智共享际开创的、继“联合办公”后又一个代表未来趋势的业态——共享生活方式应运而生。截止目前，优享创智已完成 A+轮融资，估值近 30 亿元人民币。</p>
          </div>

          <div v-if="investment_info3">
              <p>北京中投置地投资管理有限公司当前主要从事中国新型城镇化的投资运营管理，通过搭建城镇开发战略资源联盟，共同参与城镇新区的规划、建设和运营，实现“土地、人口、产业、资本”四要素的融合发展，推进中国新型城镇化内涵式、可持续发展。</p>
              <p>北京中投置地投资管理有限公司董事长王军先生为中经联盟第6任轮值主席,庆峰基金合伙人,中海地产营销体系的创建者,中国新型城镇开发领军人物,现担任伟光汇通文化旅游投资有限公司总裁。</p>
          </div>

          <div v-if="investment_info4">
              <p>中经大业资本管理有限公司是依托中经联盟创立的投资基金，专注于扶持房地产高管创业。在房地产公司担任过项目总经理或集团副总裁职务，及在上市公司对外公告名单中的房地产高管，即是中经大业资本重点投资的对象，这些房地产高管具有专业的操盘经验、深厚的人脉资源和对行业的深刻理解，在从职业经理人转型创业的过程中具有非常高的成功率，优客工场毛大庆、高和资本苏鑫、中城新产业刘爱明等就是其中杰出的代表。</p>
          </div>
      </div>
      <div class="ballWrap" v-if="ballWrap">
        <p>{{this.ballWrapTxt}}</p>
      </div>
      <Navbar></Navbar>
      <Footer></Footer>
    </div>
</template>

<script>
import 'common/css/reset.css';
import Nav from 'components/Nav/Nav';
import Navbar from 'components/Navbar/Navbar'
import Footer from 'components/Footer/Footer';
import $ from "common/js/jquery.min.js";
import axios from 'axios'
import qs from 'qs'
import {getQueryString,GetRequest,url} from 'common/js/common.js'
export default {
  name: 'app',
  components: {
      Nav,
      Navbar,
      Footer
  },
  data (){
    return {
      tab1: '0',
      tab2: '21',
      // 全局地址
      api: "",
      // 旺铺数据
      shopListArr: [],
      // 区域数据
      areaShopArr: [],
      // 区域表头
      cityList: [
          {
            'id': '0',
            'city': '朝阳',

          }, {
            'id': '1',
            'city': '海淀'
          }, {
            'id': '2',
            'city': '西城'
          }, {
            'id': '3',
            'city': '东城'
          }, {
            'id': '4',
            'city': '丰台'
          }, {
            'id': '5',
            'city': '石景山'
          }
      ],
      // 搜索区域表头
      searchCity:[],

      lbtArr: [
          {
            'artitleId': 33,
            'imgId': 5,
            'title': "零售地产积极转型",
            'url': "http://up-img.oss-cn-beijing.aliyuncs.com/upload/WechatIMG74.png",
            'type': false,
          }, {
            'artitleId': 33,
            'imgId': 5,
            'title': "零售地产积极转型",
            'url': "https://up-img.oss-cn-beijing.aliyuncs.com/logo/11526287117_.pic_hd.jpg",
            'type': true,
          }, {
            'artitleId': 34,
            'imgId': 2,
            'title': "优铺商学院",
            'url': "https://up-img.oss-cn-beijing.aliyuncs.com/logo/31526282640_.pic_hd.jpg",
            'type': false,
          }
      ],

      // 

      // searchCity: [
      //     {
      //       'id': '0',
      //       'city': '朝阳',

      //     }, {
      //       'id': '1',
      //       'city': '海淀'
      //     }, {
      //       'id': '2',
      //       'city': '西城'
      //     }, {
      //       'id': '3',
      //       'city': '东城'
      //     }, {
      //       'id': '4',
      //       'city': '丰台'
      //     }, {
      //       'id': '5',
      //       'city': '通州'
      //     }, {
      //       'id': '6',
      //       'city': '大兴'
      //     }, {
      //       'id': '7',
      //       'city': '昌平'
      //     }
      // ],
      // 面积表头
      // squareTitleArr: [
      //     {
      //       'id': 21,
      //       'name': '20㎡以下',
      //     }, {
      //       'id': 22,
      //       'name': '20-50㎡',
      //     }, {
      //       'id': 23,
      //       'name': '50-100㎡',
      //     }, {
      //       'id': 24,
      //       'name': '100-200㎡',
      //     }, {
      //       'id': 25,
      //       'name': '200-500㎡',
      //     }, {
      //       'id': 26,
      //       'name': '500㎡以上',
      //     }
      //   ], 

      // 投资机构
      investment_info1: true,
      investment_info2: false,
      investment_info3: false,
      investment_info4: false,

      // 面积表头
      squareTitleArr: [],
      // 月租金标题
      monthRent: [],

      // 轮播图
      picArr: [],
      
      // 委托找铺
      seekShopObj: null,
      // 委托转铺
      turnShopObj: null,   

      // 我要委托电话号码
      telVal: "",

      // 搜索
      searchShop: "",

      // 判断是否为IE
      isIEObj: null,

      // 弹窗
      ballWrap: false,
      // 弹窗文字
      ballWrapTxt: "",

    }
  },
  methods:{
      // 首页展示
      listData() {
          let _this = this
          let url = this.api + '/show/showInfo'
          // console.log(url);
          axios(url,{
              method: 'get',
              // data: obj
              params: {
                  type: "pc",
              }
          }).then(data => {
              console.log(data);    
              // 轮播图
              _this.picArr = data.data.data.imgUrl;
              console.log(_this.picArr);

              // 委托转铺
              _this.turnShopObj = data.data.data.shopLineNum;
              // 委托找铺
              _this.seekShopObj = data.data.data.peopleNum;  

          }).catch(err => {
              console.log(err)
          });
      },

      // 列表接口调用
      dataPost() {
          let _this = this
          let url =  this.api + '/shop/getTopDjsk'
          // let url = "http://192.168.1.138:8080/shop/getTopDjsk"
          axios(url,{
              method: 'post',
          }).then(data => {
              // 列表商铺展示
              // console.log(data);
              _this.shopListArr = data.data.content;
              // console.log(_this.shopListArr);
          }).catch(err => {
              console.log(err)
          });
      },

      // 区域
      areaShopList(city,id) {
          this.tab1 = id;
          let _this = this;
          this.isActive = true;
          let url =  this.api + '/shop/getSearch'
          axios(url,{
              method: 'post',
              params: {
                  search: city,
              }
          }).then(data => {
              // 列表商铺展示
              // console.log(data);
              _this.areaShopArr = data.data.content;
          }).catch(err => {
              console.log(err)
          });
      },

      // 面积
      squareList(id) {
          this.tab2 = id;
          let _this = this;
          // this.isActive = true;
          let url =  this.api + '/shop/getShopListPC'
          // let url = "http://192.168.1.138:8080/shop/getShopList"
          axios(url,{
              method: 'post',
              params: {
                  pageNumber: 0,
                  pageSize: 10
              }
              
          }).then(data => {
              // 列表商铺展示

              // console.log(data);
              _this.squareTitleArr = data.data.mg;
              _this.searchCity = data.data.areas;
              // console.log(_this.searchCity);


              _this.monthRent = data.data.prices[1].childList;
              // console.log("月租金");
              // console.log(_this.monthRent);
          }).catch(err => {
              console.log(err)
          });
      },

      // 面积列表
      squareShopList(id){
        // alert(id)
          this.squareList(id)
          this.tab2 = id;
          let _this = this;
          this.isActive = true;
          let url =  this.api + '/shop/getShopListPC'
          axios(url,{
              method: 'post',
              params: {
                  areaId: id,
                  pageNumber: 0,
                  pageSize: 4
              }
          }).then(data => {
              // 列表商铺展示
              // console.log(data);
              _this.squareShopArr = data.data.content;
          }).catch(err => {
              console.log(err)
          });
      },

      // 委托找铺
      seekBtn(){
          this.entrust("1");

      },
      
      // 委托转铺
      turnBtn(){
          this.entrust("2");
      }, 

      // 我要委托接口封装
      entrust(type) {
          let _this = this
          // 手机号码验证
          // let reg=/^1\d{10}$/;
          var reg = /^[1][3,4,5,7,8][0-9]{9}$/;  
          if(this.telVal == ""){
              this.ballWrapTxt = "请输入手机号码";
              this.ballWrap = true;
              setTimeout(function(){
                  _this.ballWrap = false;
              }, 3000)
          }else if(!reg.test(this.telVal)){
             // _this.$layer.msg("请输入正确手机号");
              this.ballWrapTxt = "请输入正确手机号";
              this.ballWrap = true;
              setTimeout(function(){
                  _this.ballWrap = false;
              }, 3000)
          }else {
              // 接口调用
              let url =  _this.api + '/show/addCutomer'
              // let url =  "http://192.168.1.138:8080//show/addCutomer"
              axios(url,{
                  method: 'post',
                  params: {
                      account: _this.telVal,
                      type: type
                  }
              }).then(data => {
                // console.log(data);
                if(data.data.code == 200 && data.data.flag == "success"){
                    this.ballWrapTxt = (data.data.msg);
                    this.ballWrap = true;
                    setTimeout(function(){
                        _this.ballWrap = false;
                    }, 3000)
                    _this.telVal = "";
                } else if(data.data.code == 200){
                    this.ballWrapTxt = (data.data.msg);
                    this.ballWrap = true;
                    setTimeout(function(){
                        _this.ballWrap = false;
                    }, 3000)
                    _this.telVal = "";
                }
              }).catch(err => {
                  console.log(err)
              });
          }
        },

      // 投资机构
      investment_li1(){
          this.investment_info1 = true;
          this.investment_info2 = false;
          this.investment_info3 = false;
          this.investment_info4 = false;
      },
      investment_li2(){
          this.investment_info2 = true;
          this.investment_info1 = false;  
          this.investment_info3 = false;
          this.investment_info4 = false;        
      },
      investment_li3(){
          this.investment_info3 = true;
          this.investment_info1 = false;  
          this.investment_info2 = false;
          this.investment_info4 = false;        
      },
      investment_li4(){
          this.investment_info4 = true;
          this.investment_info1 = false;  
          this.investment_info2 = false;
          this.investment_info3 = false;        
      },

      // 跳转到找店开铺页面
      goSearch1(id,name){
          // window.location.href = "shopList.html?search="+text;
          window.location.href = "shopList.html?key=businessCircleId&id="+id+"&name="+name;
      },
      // 面积
      goSearch2(id){
          window.location.href = "shopList.html?key=areaId&id="+id;
      },
      // 月租金
      goSearch3(id){
          window.location.href = "shopList.html?key=priceId&id="+id;
      },

      // 跳转商铺列表
      goShop(id){
          // window.location.href = "shopDetail.html?shopId="+id;
          // /module/shopDetail.html?shopId=1316
          window.open("shopDetail.html?shopId=" + id);
      },
      // 点击更多
      more_box(){
          window.location.href = "shopList.html";
      },
      // 搜索商铺
      searchBtn() {
          let _this = this;
          var reg = /^\s*$/g;
          if(this.searchShop == "") {
              this.ballWrapTxt = "搜索内容不能为空";
              this.ballWrap = true;
              setTimeout(function(){
                  _this.ballWrap = false;
              }, 3000)
          } else if(reg.test(this.searchShop)) {
              this.ballWrapTxt = "搜索内容不能为空";
              this.ballWrap = true;
              setTimeout(function(){
                  _this.ballWrap = false;
              }, 3000)
          } else{
              window.location.href = "shopList.html?search="+ this.searchShop;
          }         
      },

      // 点击轮播图 跳转详情页
      goNewInfo(id,type) {
          // alert(id);
          // window.open("newsDetail.html?id=" + id);
          // alert(type);
          if(type == true){
              window.location.href = "turnShop.html";
          }else{
              window.location.href = "newsDetail.html?id=" + id;
          }         
      },

      isIEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
          var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
          reIE.test(userAgent);
          var fIEVersion = parseFloat(RegExp["$1"]);
          if(fIEVersion == 7) {
            this.isIEObj = '100';
            return 7;
          } else if(fIEVersion == 8) {
            this.isIEObj = '100';
            return 8;
          } else if(fIEVersion == 9) {
            this.isIEObj = '100';
            return 9;
          } else if(fIEVersion == 10) {
            this.isIEObj = '100';
            return 10;
          } else {
            // this.isIEObj = '100';
            return 6;//IE版本<=7
          }
        } else if(isEdge) {
          alert('edge')
          return 'edge';//edge
        } else if(isIE11) {
          return 11; //IE11
        }else{
          return -1;//不是ie浏览器
        }
      }

  },
  created() { 

      this.isIEVersion();

      // 保存全局地址
      this.api = url;
      // 接口调用
      this.dataPost();
      this.listData();
      // 区域数据初始化
      let defaultCity = "朝阳";
      let defaultId = "0"
      // console.log("初始化");
      this.areaShopList("朝阳","0");

      // 面积
      // let squareId = "21"
      this.squareList(21);
      
      this.squareShopList(21);
  }

  }
</script>

<style lang="scss" type="text/scss" scoped>
*{padding: 0; margin: 0;}
html{font-weight: "微软雅黑";}
img{border: none;}
input::-webkit-input-placeholder {
    color: #ccc;
    font-size: 14px;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #ccc;
    font-size: 14px;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #ccc;
    font-size: 14px;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color: #ccc;
    font-size: 14px;
}
/*清除浮动代码*/
.clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
}
.clearfloat {
    zoom: 1;
}

/*轮播图*/
.playImg{
    width: 100%;
    height: 400px;
    /*background: pink;*/
    position: relative;
    .playImg_wrap{
        /*width: 1200px;*/
        /*height: 400px;*/
        margin: 0 auto;
        /*background: red;*/
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -600px;
        z-index: 1000000;
        .playImg_box{
            width: 325px;
            height: 350px;
            background: #fff;  
            margin-top: 25px;
            border-radius: 6px;
            z-index: 1000000;
            .playImg_top{
                /*width: 323px;*/
                height: 40px;
                background: #F7F8FA;
                border-radius: 6px 6px 0 0;
                padding: 15px;
                input{
                    width: 216px;
                    height: 40px;
                    background: #fff;
                    float: left;
                    font-size: 14px;
                    border-radius: 4px 0 0 4px;
                    text-indent: 1em;
                }
                button{
                    width: 76px;
                    height: 40px;
                    background: #E8584F;
                    float: left;
                    border-radius: 0 4px 4px 0;
                    color: #fff;
                    font-size: 14px;
                }
            }
            .playImg_main{
                dl{
                    height: 60px;
                    margin-top: 20px;
                    margin-left: 20px;
                    dt{
                      float: left;
                      position: relative;
                      top: -1px;
                    }
                    dd{
                      float: left;
                      color: #333333;
                      font-size: 16px;
                      margin-left: 6px;
                      margin-bottom: 6px;
                    }
                    ul{
                        width: 100%;
                        height: 40px;
                        float: left;
                        li{
                          span{
                            margin-right: 20px;
                            color: #666;
                            display: inline-block;
                            font-size: 14px;
                            cursor: pointer;
                            &:hover {
                                color: #E8584F;
                            }  
                          }
                        }
                    }
                }
            }
        }
    }   
}
/*标题-公用样式*/
.head_title{
    width: 100%;
    height: 180px;
    text-align: center;
    h2{
        color: #333;
        font-size: 34px;
        font-weight: 600;
        padding-top: 80px;
        margin-bottom: 22px;
    }
    h4{
        color: #333;
        font-size: 20px;
        font-weight: 400;
    }
}
/*更多-公用样式*/
.more_wrap{
    width: 100%;
    height: 40px;  
    .more_box{
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #F3F3F3;
        margin: 0 auto;
        font-size: 16px;
        color: #666;
        border: 1px solid #ddd;
        border-radius: 2px;
        cursor: pointer;       
        span{
            font-size: 14px;
            margin-left: 8px;
            cursor: pointer;
        }
    }
    :hover{
        border: 1px solid #E8584F;
        color: #E8584F;
        span{
            color: #E8584F;
            border: none;
        }
    }

}
/*商铺列表-公共样式*/
.shoplist_wrap{
    width: 1200px;
    margin: 0 auto;
    /*display: flex;*/
  /*  display:inline-flex;*/
    /*flex-wrap: wrap;
    -moz-justify-content: flex-start;
    -ms-justify-content: flex-start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start; */ 
    .shoplist_dl{
        width: 274px;
        height: 300px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-right: 34px;
        margin-bottom: 34px;
        box-sizing: border-box;  
        float: left;  
        &:hover {
            width:274px; 
            height:300px;                  
            background:rgba(255,255,255,1);                   
            border-radius: 4px;           
            box-shadow:0px 0px 14px rgba(0,0,0,0.18);
        }      
        dt{
            height: 208px;
            width: 274px;
            img{ 
                height: 100%;
                width: 272px;
            }
        }  
        dd{
          h3{
              color: #333333;
              font-size: 18px;
              /*margin: 10px 0px 15px 10px;*/
              margin: 10px;
          }
          p{
              font-size: 16px;
              margin-left: 10px;
              line-height: 22px;
              b{
                font-weight: 400;
                color: #888;
                font-size: 16px;
              }
              .span1{
                color: #E8584F;
                font-weight: 600;
                font-size: 18px;
              }
          }
        }         
    }
    :nth-child(4){
        margin-right: 0px;
    }
    :nth-child(8){
        margin-right: 0px;
    }
}

/*我要委托*/
.entrust_wrap{
    width: 1200px;
    height: 185px;
    margin: 0 auto;
    background: url(images/entrust_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    .entrust_box{
       width: 436px;
       height: 185px;
       position: absolute;
       right: 0px;
       margin-right: 82px;
       /*background: red;*/
        .entrust_input{
            width: 436px;
            height: 46px;
            position: relative;
            /*top: 23px;*/
            /*background: pink;*/
            margin-top: 23px;
            margin-bottom: 23px;
            input{
                width: 436px;
                height: 46px;
                border: 1px solid #ddd;
                border-radius: 4px;
                text-indent: 2em;
                outline: none;
                color: #666;
                font-size: 16px;
            }
            img{
                position: absolute;
                top: 14px;
                left: 14px;
            }
        }
        .entrust_dl{
            width: 436px;
            height: 72px;
            position: relative;
            dl{
                width: 190px;
                height: 72px;   
                cursor: pointer;         
                dt{
                    width: 190px;
                    height: 46px;
                    text-align: center;
                    line-height: 46px;
                    font-size: 18px;
                    color: #fff;                    
                    border-radius: 4px;
                }
                dd{
                    text-align: center;
                    color: #333333;
                    font-size: 16px;
                    margin-top: 10px;
                    span{
                        color: #E8584F;
                    }
                }
            }
            .dl_left{
                float: left;               
                dt{
                    background: #224E8F;
                }
            }
            .dl_right{
                float: right;
                dt{
                    background: #E8584F;
                }                
            }
        }
    }
}

/*区域*/
.area_wrap{
    width: 100%;
    height: 450px;
    background: #F7F7FA;
    margin-top: 90px;
    margin-bottom: 40px;
    .area_nav{
        width: 100%;
        height: 108px;
        ul{
            width: 620px;
            height: 108px;
            line-height: 108px;
            margin: 0 auto;
            text-align: center;
            li{
                width: 70px;
                height: 30px;
                background: #F7F7FA;
                margin-right: 40px;
                text-align: center;
                line-height: 30px;
                color: #888;
                float: left;
                list-style-type: none;
                margin-top: 40px;
                cursor: pointer;
                &.on1{
                  background: #E8584F;
                  color: #fff;            
              }          
            }           
            :nth-child(6){
              margin-right: 0px;
            }
        }
    }
}

/*面积*/
.square_wrap{
    width: 100%;
    height: 450px;
    background: #fff;
    margin-top: 90px;
    margin-bottom: 40px;
    .square_nav{
        width: 100%;
        height: 108px;
        ul{
            width: 956px;
            height: 108px;
            line-height: 108px;
            margin: 0 auto;
            text-align: center;
            li{
                width: 126px;
                height: 30px;
                background: #fff;
                margin-right: 40px;
                text-align: center;
                line-height: 30px;
                color: #888;
                float: left;
                list-style-type: none;
                margin-top: 40px;
                cursor: pointer;
                &.on2{
                  background: #E8584F;
                  color: #fff;            
              }          
            }           
            :nth-child(6){
              margin-right: 0px;
            }
        }
    }
}
/*投资机构*/
.investment{
    width: 1200px;
    height: 388px;
    background: url(images/investment_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
    margin-bottom: 160px;
    ul{
        width: 826px;
        height: 195px;
        margin: 0 auto;
        li{
            margin: 40px 40px 25px 40px;
            float: left;           
        }
    }
    div{
        width: 1111px;
        height: 106px;
        margin: 0 auto;
        p{
           font-size: 16px;
           color: #fff;
           line-height: 30px;
           text-align: justify;
        }
    }
}

/*弹窗*/
.ballWrap{
    /*width: 300px;*/
    height: 45px;
    position: fixed;
    left: 50%;
    top: 40%;
    margin-left: -150px;
    background: rgba(0,0,0,0.7);
    border-radius: 6px;   
    z-index: 9999999999;
    p{
      margin-left: 30px;
      margin-right: 30px;
      font-size: 16px;
      color: #fff;
      line-height: 45px;
      font-weight: 500;
      font-family: "微软雅黑";
    }

}

</style>

<style>
.el-carousel__item h3 {
    margin: 0 auto;
    width: 100%;
    height: 400px;    
}
.el-carousel {
  /*overflow-x: visible!important;*/
}

.el-carousel__item h3>img {
    height: 400px;
    position: relative;
    left: 50%;
    margin-left: -960px; 
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.el-carousel__button {
    width: 12px!important;
    height: 12px!important;
    /*background-color: red!important;*/
    border-radius: 50%!important;
}
.el-carousel__arrow--right {
    right:  50px!important;
}
</style>
