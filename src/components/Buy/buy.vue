<template>
    <div class="buy-wrap" @click="closeFun()" v-if="buy===1 || buy===2">
      <div class="buy">
        <div class="close" @click="closeFun()"></div>
        <div class="buy-title">
          <span :class="{'cur':tab===0}" @click="tab=0">优铺会员</span>
          <span :class="{'cur':tab===1}" @click="tab=1">VIP服务</span>
        </div>
        <div class="tab">
          <div class="huiyuan" v-if="tab===0">
            <h3>优铺会员福利</h3>
            <div class="jieshao">
              <p>为您提供<span>最新、最全、最真</span>商铺信息</p>
              <p>商铺不好找？</p>
              <p>马上升级优铺会员，</p>
              <p>每日查看次数升至<span>50次</span>！找铺速度提升<span>5倍</span>！</p>
            </div>
            <div class="price">
              <div class="price-list clearfix" v-for="(item,index) in msg">
                <div class="yuan">
                  <span>{{item.huiyuan}}</span>
                  <b>{{item.price}}<i>元</i></b>
                </div>
                <div class="btn" @click="huiyuanFun(item)">购买</div>
              </div>
            </div>
            <h4></h4>
            <div class="yiwen">
              <p><span></span>会员的服务期是怎么计算的？</p>
              <p><b></b>按整月计算，如您是<i>1月2日</i>成功升级的会员（3个月），则服务期到<i>4月1日</i></p>
              <p><span></span>普通会员当日10次看铺次数用完后，升级会员的,当日的查看次数如何计算？</p>
              <p><b></b>升级会员成功后，当日的查看次数增加至<i>50次</i>，服务期内每日都可以查看<i>50套</i></p>
            </div>
          </div>
          <div class="vip" v-if="tab===1">
            <h3>优铺VIP选址管家服务</h3>
            <div class="vip-msg">
              <p>1、优铺金牌选址顾问<span>一对一</span>开店专属服务</p>
              <p>2、基于大数据系统，提供符合VIP客户需求的商铺信息</p>
              <p>3、VIP客户可预约选址顾问协助洽谈、议价、签约等相关服务</p>
              <p>4、签约推荐商铺，租赁后一年内拆迁10倍赔偿</p>
              <p>5、如您购买了VIP服务，拨打业主电话会由每日免费拨打<span>10次升至50次</span>,开</p>
              <p style="text-indent: 23px;">店速度提升<span>5</span>倍哦</p>
            </div>
            <div class="vip-list">
              <h4>
                <span>选址面积</span>
                <b>价格</b>
                <i>服务时长</i>
              </h4>
              <div v-for="item in fuwu">
                <span>{{item.vip}}</span>
                <b>{{item.price}}</b>
                <i>{{item.month}}</i>
                <s @click="vipFun(item)">购买</s>
              </div>
            </div>
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
  data () {
    return {
      buy: this.childBuy,
      tab:0,
      msg: [
        {huiyuan:"1个月会员",price:300,id:1},
        {huiyuan:"3个月会员",price:500,id:2},
        {huiyuan:"6个月会员",price:1000,id:3},
        {huiyuan:"1年会员",price:2000,id:4}
      ],
      fuwu: [
        {vip:"小于50m²",price:3000,month:"3个月",id:5},
        {vip:"51-150m²",price:4000,month:"3个月",id:6},
        {vip:"151-300m²",price:5000,month:"3个月",id:7},
        {vip:"301m²以上",price:6000,month:"3个月",id:8}
      ]
    }
  },
  props: ['childBuy'],
  mounted(){
    console.log(this.childBuy)
    if(this.childBuy == 1){
      this.tab = 0;
    }else if(this.childBuy == 2){
      this.tab = 1;
    }
  },
  methods:{
    huiyuanFun(item){
      console.log(item.id
      )
      axios(this.changeData() + '/pc/WXPayApi/createOrder',{
        method: 'post',
        params: {
          account: localStorage.iphone,
          token: localStorage.token,
          productId : item.id
        }
      })
        .then(res => {
          console.log(res)
          if(res.data.code == "200"){
            window.location.href = "pay.html?id="+ res.data.data +'&type='+ item.price;
          }
        })
        .catch(err =>{
          console.log(err)
        })
    },
    vipFun(item){
      axios(this.changeData() + '/pc/WXPayApi/createOrder',{
        method: 'post',
        params: {
          account: localStorage.iphone,
          token: localStorage.token,
          productId : item.id
        }
      })
        .then(res => {
          console.log(res)
          if(res.data.code == "200"){
            window.location.href = "pay.html?id="+ res.data.data +'&type='+ item.price;
          }
        })
        .catch(err =>{
          console.log(err)
        })
    },
    closeFun(){
      this.buy = false;
      this.$emit('buyFun','false');
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.buy-wrap{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  z-index: 9999;
  .buy{
    width:600px;
    height:694px;
    position: absolute;
    left: 50%;
    margin-left: -300px;
    top: 50%;
    margin-top: -347px;
    background: #fff;
   .close{
     width: 30px;
     height: 30px;
     position: absolute;
     top: -26px;
     right:-23px;
     cursor: pointer;
     background: url("images/close.png") no-repeat;
   }
    .buy-title{
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 0;
      span{
        display: inline-block;
        width: 50%;
        height: 60px;
        background: #F7F8FA;
        color: #666;
        font-size: 18px;
        cursor: pointer;
        text-align: center;
        &.cur{
          color: #fff;
          background: url("images/title.png") no-repeat;
        }
      }
    }
    .tab{
      .huiyuan{
        h3{
          font-size: 20px;
          color: #333;
          margin: 35px 0 10px;
          text-align: center;
          font-weight: bold;
        }
        .jieshao{
          text-align: center;
          p{
            font-size: 16px;
            margin-bottom: 10px;
            color: #333;
            span{
              color: #E85850;
              font-weight: bold;
            }
          }
        }
        .price{
          width: 488px;
          margin: 20px auto 30px;
          .price-list{
            margin-bottom: 14px;
          }
          .yuan{
            float: left;
            width: 388px;
            background: #FFE3E1;
            height: 42px;
            line-height: 42px;
            border-radius: 5px;
            span {
              display: inline-block;
              width: 100px;
              text-align: center;
              font-size: 16px;
              color: #111;
              margin-left: 74px;
            }
            b{
              display: inline-block;
              width: 100px;
              text-align: center;
              font-size: 16px;
              color: #E85850;
              margin-left: 50px;
              font-weight: bold;
              i{
                color: #111;
                font-weight: normal;
              }
            }
          }
          .btn{
            border-radius: 5px;
            float: left;
            display: inline-block;
            width: 100px;
            height: 42px;
            line-height: 42px;
            background: #E85850;
            font-size: 16px;
            color: #fff;
            text-align: center;
            cursor: pointer;
          }
        }
        h4{
          width: 272px;
          height: 16px;
          background: url("images/wenti.png") no-repeat;
          margin:0 auto 30px;
        }
        .yiwen{
          padding: 0 30px;
          p{
            margin-bottom: 10px;
            font-size: 14px;
            color: #666;
            i{
              color: #E85850;
              font-weight: bold;
            }
            span,b{
              vertical-align: -3px;
              margin-right: 10px;
              display:inline-block;
              width: 14px;
              height: 14px;
              display: inline-block;
              background: url("images/wenhao.png") no-repeat;
            }
            b{
              background: url("images/yiwen.png") no-repeat;
            }
          }
        }
      }
      .vip{
        h3{
          font-size: 20px;
          color: #333;
          margin: 35px auto 20px;
          text-align: center;
          font-weight: bold;
        }
        .vip-msg{
          width: 538px;
          margin: 0 auto;
          p{
            font-size: 16px;
            color: #666;
            margin-bottom: 10px;
            span{
              color: #E8584F;
              font-weight: bold;
            }
          }
        }
        .vip-list{
          width: 488px;
          margin: 30px auto;
          h4{
            width: 100%;
            height: 52px;
            line-height: 52px;
            background: #FFE3E1;
            border-bottom: 1px solid #EAEAEA;
            border-left: 1px solid #FFE3E1;
            border-right: 1px solid #FFE3E1;
            span,b,i{
              text-align: center;
              display: inline-block;
              width: 100px;
              font-size: 16px;
              color: #111;
            }
            b{
              margin-left: 20px;
            }
            i{
              margin-left: 20px;
            }
          }
          div{
            width: 100%;
            height: 52px;
            line-height: 52px;
            border-bottom: 1px solid #EAEAEA;
            border-left: 1px solid #EAEAEA;
            border-right: 1px solid #EAEAEA;
            span,b,i{
              text-align: center;
              width: 100px;
              display: inline-block;
              color: #666;
              font-size: 16px;
            }
            b{
              margin-left: 20px;
            }
            i{
              margin-left: 20px;
            }
            s{
              width: 100px;
              border-radius: 5px;
              display: inline-block;
              height: 34px;
              line-height: 34px;
              background: #E85850;
              text-align: center;
              color: #fff;
              cursor: pointer;
            }
          }
        }
      }
    }

  }
}

</style>
