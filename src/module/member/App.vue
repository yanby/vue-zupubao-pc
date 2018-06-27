<template>
<div id="app">
    <Nav></Nav>
    <Buy v-if="buy===1 || buy===2" :child-buy="buy" @buyFun="myFun()"></Buy>
    <div class="mine w1200 clearfix">
      <Mine></Mine>
      <div class="mine-right right">
        <div class="member-wrap" v-if="member===1">
          <div class="allOrder" v-for="item in list">
            <div class="navTime">购买日：<span>{{item.createTime}}</span></div>
            <div class="order-template">
              <dl class="up_member" v-if="item.memberType === '0'">
                <dt><img src="./images/up.png"></dt>
                <dd>优铺会员</dd>
              </dl>
              <dl class="up_member" v-if="item.memberType === '1'">
                <dt><img src="./images/vip.png"></dt>
                <dd>VIP服务</dd>
              </dl>
              <div class="member-msg" v-if="item.memberType === '0'">
                <h3>今日特权：<span>您今日还可免费查看<b>{{item.restNum}}套</b>商铺（共{{item.totalNum}}套/日）</span></h3>
                <h4>到 期 日：<span>{{item.endTime}}</span></h4>
              </div>
              <div class="vip-msg" v-if="item.memberType === '1'">
                <h3>今日特权：<span>您今日还可免费查看<b>{{item.restNum}}套</b>商铺（共{{item.totalNum}}套/日）一对一开店专属服务，服务</span></h3>
                <p>期内帮您匹配{{item.size}}的商铺</p>
                <h4>到 期 日：<span>{{item.endTime}}</span></h4>
              </div>
              <div class="btn">
                <div class="already" v-if="item.memberType === '0'" @click="buy=1">会员延期</div>
                <div class="already" v-if="item.memberType === '1'" @click="buy=2">VIP延期</div>
              </div>
            </div>
          </div>
        </div>
        <div class="member-no" v-if="member===0">
          <div class="img"></div>
          <p>您还不是会员，立即升级会员享受更多服务</p>
          <div class="btn" @click="buy=1">升级会员</div>
        </div>
      </div>
    </div>
    <Navbar></Navbar>
    <Footer></Footer>
</div>
</template>

<script>
import 'common/css/reset.css';
import Nav from 'components/Nav/Nav';
import Buy from 'components/Buy/Buy';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import Mine from 'components/Mine/Mine';
import axios from 'axios'
import $ from "common/js/jquery.min.js";
import qs from 'qs'
import {getQueryString,GetRequest,NowTime,NewTime,url} from 'common/js/common.js'
export default {
    name: 'app',
    components: {
      Nav,
      Buy,
      Footer,
      Navbar,
      Mine
    },
    data (){
      return{
        list: "",
        huiyuan: "",
        vip: "",
        member: '',
        buy: false
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        var that = this;
        var data = {
          account : localStorage.iphone,
          token: localStorage.token
        }
        axios(this.changeData() + "/member/getMyMember",{
          method: 'post',
          params: data
        }).then(res => {
          console.log(res)
          this.list = res.data.data;
          try{
            if(this.list.length == 0){
              this.member = 0;
            }else{
              this.member = 1;
              this.list.forEach(function (item,index) {
                item.createTime = NewTime(item.createTime);
                item.endTime = NewTime(item.endTime);
              })
            }
          }catch(e){
            console.log(e)
          }
        }).catch(err => {
          console.log(err)
        });
      },
      myFun(){
        this.buy = false;
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../common/css/mine.css';
  @import '../../common/css/shopPages.css';
  .member-wrap{
    padding: 40px 0 50px;
    min-height: 460px;
    background: #fff;
  }
  .allOrder{
    height: 155px;
    border: 1px solid #EAEAEA;
    width: 860px;
    margin: 20px auto 0;
    .navTime{
      color: #888888;
      background: #F7F8FA;
      border-bottom: 1px solid #EAEAEA;
      line-height: 40px;
      width: 790px;
      padding-left: 35px;
      padding-right: 35px;
      span{
        margin-right: 10px;
      }
    }
    .order-template{
      height: 75px;
      padding: 20px 30px;
      .up_member{
        float: left;
        width: 92px;
        dt{
          margin-bottom: 10px;
          img{
            width: 50px;
            height: 50px
          }
        }
        dt{
          color: #333333;
          font-size: 14px;
        }
      }
      .member-msg,.vip-msg{
        float: left;
        width: 588px;
        h3{
          font-size: 14px;
          color: #898989;
          margin-bottom: 20px;
          margin-top: 12px;
          span{
            color: #333333;
            b{
              color: #E8584F;
            }
          }
        }
        h4{
          font-size: 14px;
          color: #898989;
          span{
            color: #333333;
          }
        }
      }
      .vip-msg{
        h3{
          margin-bottom: 0;
          margin-top: 0;
        }
        p{
          color:#333;
          text-indent: 70px;
        }
        h4{
          margin-top: 15px;
        }
      }
      .btn{
        cursor: pointer;
        width: 120px;
        line-height: 35px;
        border-radius: 4px;
        float: right;
        color: #fff;
        background: #E8584F;
        font-size: 14px;
        margin-top: 18px;
        text-align: center;
      }
      .immediate{
        background: #E8584F;
        border-radius: 4px;
        color: #fff;
      }
    }
  }
  .member-no{
    background: #fff;
    padding: 40px 0 50px;
    min-height: 460px;
    text-align: center;
    .img{
      width: 74px;
      height: 58px;
      margin: 110px auto 20px;
      background: url("images/no-member.png") no-repeat;
    }
    p{
      font-size: 18px;
      color: #333;
      text-align: center;
    }
    .btn{
      cursor: pointer;
      width:151px;
      margin: 40px auto 0;
      height:40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background:rgba(34,78,143,1);
      border-radius:4px;
    }
  }
</style>
