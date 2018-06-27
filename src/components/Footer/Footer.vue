<template>
    <div class="Footer">
        <div class="service">
            <h2>一站式开店服务</h2>
            <div>
                <dl>
                  <dt><img src="./images/li1.png"></dt>
                  <dd>在线预约</dd>
                </dl>
                <dl>
                  <dt><img src="./images/li2.png"></dt>
                  <dd>顾问沟通</dd>
                </dl>
                <dl>
                  <dt><img src="./images/li3.png"></dt>
                  <dd>精准配铺</dd>
                </dl>
                <dl>
                  <dt><img src="./images/li4.png"></dt>
                  <dd>陪同看铺</dd>
                </dl>
                <dl>
                  <dt><img src="./images/li5.png"></dt>
                  <dd>交易担保</dd>
                </dl>
                <dl>
                  <dt><img src="./images/li6.png"></dt>
                  <dd>成功开店</dd>
                </dl>
            </div>
        </div>
        <div class="wrap">
            <div class="wrap_box">
              <ul>
                  <li class="beijinShop">北京商铺出租转让:</li>
                  <li v-for="(item,index) in searchCity" @click="goShop(item.id,item.name)"><span v-if="index > 0">{{item.name}}商铺出租转让</span></li>
              </ul>

              <!-- <div class="friendship_link">
                  友情链接:&nbsp;<a href="https://bj.lianjia.com" target="_blank">链家</a><a href="http://www.fang.com" target="_blank">房天下</a><a href="https://beijing.anjuke.com" target="_blank">安居客</a><a href="http://bj.58.com" target="_blank">58同城</a><a href="http://www.ziroom.com" target="_blank">自如</a>
              </div> -->

              <div class="about_up">
                  <a href="aboutUp.html">关于优铺</a><a href="joinUp.html">加盟优铺</a><a href="http://www.zhongjinglianmeng.com" target="_blank">中经联盟</a>
                  <a href="contactUp.html">联系优铺</a><a href="recruitUp.html">优铺招聘</a><a href="shopMap.html">网站地图</a>
              </div>
              <div class="product">
                  优铺控股旗下产品:&nbsp;<a href="/module/index.html">租铺宝</a><a href="http://youpu100.cn/" target="_blank">卖铺宝</a><a href="collegeUp.html">优铺商学院</a>
              </div>

              <div class="youpu_code">
                  <dl>
                      <dt><img src="./images/zupubao.png"></dt>
                      <dd>优铺-租铺宝</dd>
                  </dl>
                  <dl>
                      <dt><img src="./images/fuwuhao.png"></dt>
                      <dd>优铺-服务号</dd>
                  </dl>
              </div>

              <div class="copyright">
                  <p>版权所有：北京优铺网络科技有限公司  Copyright 2016 Beijing Youpu Network Technology Co., Ltd</p>
                  <p>京ICP备16035060号 客服电话：4008988808</p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import {getQueryString,GetRequest,url} from 'common/js/common.js';
export default {
  name: 'Footer',
  data () {
    return {

      cityList: [
          {
            'id': '0',
            'city': '北京商铺出租：',
          }, {
            'id': '1',
            'city': '朝阳商铺出租'
          }, {
            'id': '2',
            'city': '海淀商铺出租'
          }, {
            'id': '3',
            'city': '西城商铺出租'
          }, {
            'id': '4',
            'city': '东城商铺出租'
          }, {
            'id': '5',
            'city': '丰台商铺出租'
          }, {
            'id': '6',
            'city': '石景山商铺出租'
          }, {
            'id': '7',
            'city': '大兴商铺出租'
          }, {
            'id': '8',
            'city': '昌平商铺出租'
          }, {
            'id': '9',
            'city': '通州商铺出租'
          }, {
            'id': '10',
            'city': '顺义商铺出租'
          }, {
            'id': '11',
            'city': '房山商铺出租'
          }, {
            'id': '12',
            'city': '门头沟商铺出租'
          }, {
            'id': '13',
            'city': '怀柔商铺出租'
          }, {
            'id': '14',
            'city': '平谷商铺出租'
          }, {
            'id': '15',
            'city': '密云商铺出租'
          }, {
            'id': '16',
            'city': '延庆商铺出租'
          }
      ],
      searchCity:[]
    }
  },
  methods:{
    squareList(id) {
        let _this = this;
        // let url =  this.api + '/shop/getShopList'
        // let url = "http://192.168.1.138:8080/shop/getShopList"
        let url =  this.api + '/shop/getShopListPC'
        axios(url,{
            method: 'post',
            params: {
                pageNumber: 0,
                pageSize: 4
            }
        }).then(data => {
            // 列表商铺展示
            // console.log(data);
            _this.searchCity = data.data.areas;
        }).catch(err => {
            console.log(err)
        });
    },
    goShop(id,name){
      // alert(id,name)
      window.location.href = "shopList.html?key=businessCircleId&id="+id+"&name="+name;

    }
  },
  created(){
    // 保存全局地址
    this.api = url;
    this.squareList();

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>
*{ padding: 0; margin: 0;}
.Footer{
    width: 100%;
}
.wrap{
    width: 100%;
    height: 340px;
    background: #888;
    background: url(images/footer_bg.jpeg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-weight: 400;
    .wrap_box{
        width: 1200px;
        height: 200px;
        /*background: red;*/
        margin: 0 auto;
        padding-top: .1px;
        position: relative;
        ul{
          width: 1200px;
          height: 88px;
          margin-top: 30px;
            li{
                float: left;
                margin-right: 22px;
                margin-bottom: 16px;
                font-size: 12px;
                color: #fff;
                cursor: pointer;
                font-family: "KaiGenGothicSC-Light";
                :hover{
                    color: #E8584F;
                }
            }
            /*:nth-child(13){
                margin-right: 10px;
            }*/
        }
        .friendship_link{
            color: #fff;
            a{
              margin-right: 20px;
              font-size: 14px;
              font-family: "KaiGenGothicSC-Light";
            }
        }
        .about_up{
            margin-top: 16px;
            a{
              margin-right: 40px;
              font-size: 14px;
              font-family: "KaiGenGothicSC-Light";
            }
        }
        .product{
            color: #fff;
            margin-top: 10px;
            font-size: 14px;
            font-family: "KaiGenGothicSC-Light";
            a{
                margin-right: 40px;
                font-size: 14px;
                font-family: "KaiGenGothicSC-Light";
            }
        }
        .copyright{
            width: 1200px;
            margin-top: 40px;
            border-top: 1px solid #444;
            padding-top: 14px;
            p{
                color: #fff;
                margin-top: 10px;
                font-size: 12px;
                font-family: "KaiGenGothicSC-Light";
            }
        }
        /*二维码*/
        .youpu_code{
            height: 110px;
            width: 280px;
            margin-top: 36px;
            position: absolute;
            right: 0px;
            top: 64px;
            dl{
                float: left;
                margin-right: 50px;
                dd{
                    text-align: center;
                    font-size: 12px;
                    margin-top: 8px;
                    color: #fff;
                    font-family: "KaiGenGothicSC-Light";
                }
            }
        }
    }
}
a{
    color: #fff;
    font-family: "KaiGenGothicSC-Light";
    font-weight: 400;
}
.service{
    width: 100%;
    height: 220px;
    background: #F9FCFB;
    padding-top: .1px;
    h2{
        font-size: 34px;
        color:  #333;
        text-align: center;
        margin-top: 40px;
        margin-bottom: 40px;
    }
    div{
        width: 1200px;
        height: 180px;
        margin: 0 auto;
        dl{
          float: left;
          width: 60px;
          height: 100px;
          /*background: red;*/
          margin-right: 168px;
          dt{
            width: 60px;
            height: 60px;
            text-align: center;
          }
          dd{
             text-align: center;
             font-size: 14px;
             color: #888;
          }
        }
        :nth-child(6){
            margin-right: 0px;
        }
    }
}
.beijinShop{
    margin-right: 0px!important;
}
a:hover{
    color: #E8584F;
}
</style>
