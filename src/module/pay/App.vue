<template>
<div id="app">
    <Nav></Nav>
    <!-- <div>支付</div> -->
    <div class="payment">
        <div class="payment_nav">
            <img src="./images/right.png">
            <span>您选择的订单提交成功</span>
        </div>
        <div class="payment_recharge">
            <img src="./images/recharge.png"><p>一个月会员<span>{{money}}</span>元</p>
        </div>
        <div class="select_payment">
            <p>请选择支付方式:</p>
            <dl>
                <dt :class="{'on':tab===0}" @click="tab=0"></dt>
                <dd><img src="./images/alipay.png"></dd>
            </dl>
            <dl>
                <dt :class="{'on':tab===1}" @click="tab=1"></dt>
                <dd><img src="./images/wechat.png"></dd>
            </dl>
        </div>
        <div class="goPay" @click="goPay">去支付</div>
        <!-- 微信支付页面 -->
        <div class="wxPayWrap" v-if="wxPayWrap">
            <div class="wxPayBox" v-if="wxPayBox">
                <div class="wxPayTop">
                    <div class="closeBtn">
                       <img src="./images/close.png" @click="closeBtn()">
                    </div>
                </div>
                <!-- 生成二维码 -->
                <div class="wxCode">
                    <img :src="wxPay">
                </div>
                <p>请使用<span>微信扫一扫</span>，轻松完成支付</p> 
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
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import $ from "common/js/jquery.min.js";
import axios from 'axios';
import qs from 'qs';
import {getQueryString,GetRequest,url} from 'common/js/common.js'
const theLastTime = null;
  export default {
    name: 'app',
    data () {
        return {
            id: null,
            money: null,
            wxPay:null,
            radio: '1',
            wxPayWrap: false,
            wxPayBox: false,
            // 订单检测定时器
            theLastTime: null,
            tab: 0
        }
    },
    components: {
        Nav,
        Navbar,
        Footer
    },
    mounted(){       
    },
    methods:{
        closeBtn(){
            this.wxPayWrap = false;
            this.wxPayBox = false;
        },
        goPay(){
            let _this = this;
            let phone = window.localStorage.getItem("iphone");   
            let token = window.localStorage.getItem("token"); 
            let idIndex = this.id;
            console.log(phone);
            console.log(token);
            console.log(idIndex);
            if(this.tab == 0){
                // 支付宝
                window.location.href = _this.api+'/pc/aliPayApi/getAliOrder?&account='+phone+'&orderNo='+idIndex +'&token='+token;
                this.wxTestPayment(); 
            }else if(this.tab == 1){
                // 微信
                this.wxPay = _this.api+'/pc/WXPayApi/getWXOrder?account='+phone+'&orderNo='+idIndex +'&token='+token;
                console.log(this.wxPay);
                this.wxTestPayment();               
                console.log(this.wxPay);
                this.wxPayWrap = true;
                this.wxPayBox = true;
            }           
        },
        // 支付状态检测
        wxTestPayment(){
            let _this = this;
            _this.theLastTime = setInterval(function () {
                let token = window.localStorage.getItem("token"); 
                // let url = 'http://t7n5gs.natappfree.cc/order/isFee?token='+token+'&orderNo='+_this.id;
                let url = _this.api+'/order/isFee?token='+token+'&orderNo='+_this.id;
                axios.get(url)
                .then(data => {
                    console.log(data.data.data);
                    if(data.data.data == true){
                        clearInterval(_this.theLastTime);
                        window.location.href = "member.html";
                    } 
                })
                .catch(error => {
                    console.log(error);
                });
            },1000)
        },       
    },
    created() {
        // 保存全局地址
        this.api = url;
        //截取Url里面的参数
        function GetRequest() {
            var urlInfo = location.search; //获取url中"?"符后的字串      
            var theRequest = new Object();
            if (urlInfo.indexOf("?") != -1) {
                var str = urlInfo.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        //通过url取数
        var request = new Object();
        request = GetRequest();
        var urlId = request['id'];
        var urlIndex = request['type'];
        if(urlId){
            this.id = urlId;        
        }
        if(urlIndex){
            this.money = urlIndex; 
        }        
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
*{padding: 0; margin: 0;}
html{font-family: "KaiGenGothicSC-Light";};
.payment{
    width: 1120px;
    height: 360px;
    margin: 20px auto 84px;
    padding: 40px;
    background: #fff;
}
.payment_nav{
    margin-bottom: 40px;
    img{
        width: 26px;
        height: 27px;
        display: inline-block;
        position: relative;
        top: -6px;
        margin-right: 15px;
    }
    span{
        color: #333333;
        font-size: 24px;
    }
}
.payment_recharge{
    height: 80px;
    background: #F7F8FA;
    text-align: center;
    img{
        width: 47px;
        height: 20px;
        display: inline-block;
        margin-right: 10px;
        position: relative;
        top: -3px;
    }
    p{
        display: inline-block;
        font-size: 20px;
        line-height: 80px;
        span{
            color: #E8584F;
        }
    }
}
.select_payment{
    margin-top: 60px;
    margin-bottom: 40px;
    text-align: center;
    p{
        color: #333333;
        font-size: 16px;
        display: inline-block;
        margin-right: 38px;
    }
    dl{
        display: inline-block;
        dt{
            width: 16px;
            height: 16px;
            background: url(./images/round.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            display: inline-block;
            position: relative;
            top: 2px;
            cursor: pointer;
            &.on{
                width: 16px;
                height: 16px;
                background: url(./images/selected.png);
                background-repeat: no-repeat;
                background-size: 100% 100%;
                display: inline-block;
                position: relative;
                top: 2px;
            }
        }
        dd{
            /*float: left;*/
            display: inline-block;
            margin-left: 10px;
            margin-right: 40px;
        }
    }
}
.goPay{
    background: #E8584F;
    color: #fff;
    text-align: center;
    line-height: 42px;
    width: 214px;
    margin: 0 auto;
    border-radius: 4px;
    cursor: pointer;
}
/*微信支付弹窗*/
.wxPayWrap{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 200;
}
.wxPayBox{
    width: 400px;
    height: 280px;
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -80px;
    p{
        font-size: 18px;
        color: #333333;
        text-align: center;
        span{
            color: #07B906;
        }
    }
}
.wxPayTop{
    height: 34px;
    position: relative;
    .closeBtn{
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
    }
}
.wxCode{
    width: 200px;
    height: 200px;
    /*border: 1px solid #eee;*/
    margin-left: 100px;
    img{
        width: 200px;
        height: 200px;
        display: inline-block;
        border: none;
    }
}
</style>
