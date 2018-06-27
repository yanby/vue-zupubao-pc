<template>
<div id="app">
    <Nav></Nav> 
    <div class="seek_wrap">
        <div class="seek_box">
            <div class="seek_box1">
                <div class="box_free">
                    <h3>免费委托转铺</h3>
                    <h5>已有<span>{{this.turnShopObj}}</span>人成功开店</h5>
                    <input type="text" name="" placeholder="请输入手机号,专属顾问5分钟内与您联系" maxlength="11" v-model="telVal">
                    <div class="submit_btn" @click="turnBtn()">提交</div>
                    <h6>客服电话：400-898-8808</h6>
                </div>
                <div class="seek_right">
                    <h1>在线委托转铺平均<span>32</span>天成功转出</h1>
                    <h3>专属转铺顾问竭诚为您服务</h3>
                    <dl>
                        <dt>多</dt>
                        <dd>
                            <p>5万+找铺客户</p>
                            <p>智能匹配</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>快</dt>
                        <dd>
                            <p>转铺周期平均</p>
                            <p>32天</p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>好</dt>
                        <dd>
                            <p>专属顾问一对</p>
                            <p>一服务</p>
                        </dd>
                    </dl>
                    <dl class="shen">
                        <dt>省</dt>
                        <dd>
                            <p>精准推荐免打</p>
                            <p>扰省时省心</p>
                        </dd>
                    </dl>                   
                </div>
            </div>
        </div>

        <div class="seek_present">
            <h2>转铺无忧四大服务保障</h2>
            <!-- <ul>
                <li><img src="./images/li1.png"></li>
                <li><img src="./images/li2.png"></li>
                <li><img src="./images/li3.png"></li>
                <li><img src="./images/li4.png"></li>
            </ul> -->
            <dl>
                <dt><img src="./images/li1.png"></dt>
                <dd>
                    <h3>置顶推荐，海量曝光</h3>
                    <p>独享优铺租铺宝平台置顶展示，独占全平台海量曝光机会</p>
                </dd>
            </dl>
            <dl>
                <dt><img src="./images/li2.png"></dt>
                <dd>
                    <h3>全网推广，效果倍增</h3>
                    <p>20大网络平台全覆盖推广，转店效率10倍提升</p>
                </dd>
            </dl>
            <dl>
                <dt><img src="./images/li3.png"></dt>
                <dd>
                    <h3>智能匹配，专属服务</h3>
                    <p>智能大数据匹配客源，专属顾问人工推荐客源</p>
                </dd>
            </dl>
            <dl>
                <dt><img src="./images/li4.png"></dt>
                <dd>
                    <h3>资金托管，客户验真</h3>
                    <p>过户交割转让费全程免费托管，客户资质100%核查验证</p>
                </dd>
            </dl>

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
import {getQueryString,GetRequest,url} from 'common/js/common.js';
export default {
    name: 'app',
    components: {
        Nav,
        Footer,
        Navbar
    },
    data (){
        return {
            turnShopObj: null,
            telVal: ""
        }
    },   
    mounted(){
    
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
                url: url,
            }).then(data => {
                // console.log(data);    
                // 委托转铺
                _this.turnShopObj = data.data.data.shopLineNum;
            }).catch(err => {
                console.log(err)
            });
        },  
        // 我要委托接口封装
        turnBtn(type) {
            let _this = this
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/; 
            if(this.telVal == ""){
                 _this.$layer.msg("请输入手机号码");
            }else if(!reg.test(this.telVal)){
                _this.$layer.msg("请输入正确手机号");
            }else {
                // 接口调用
                let url =  _this.api + '/show/addCutomer'
                // let url =  "http://192.168.1.138:8080//show/addCutomer"
                axios(url,{
                    method: 'post',
                    params: {
                        account: _this.telVal,
                        type: "2",
                        source: "3"
                    }
                }).then(data => {
                    // console.log(data);
                    if(data.data.code == 200 && data.data.flag == "success"){
                        _this.$layer.msg(data.data.msg);
                        _this.telVal = "";
                    } else if(data.data.code == 200){
                        _this.$layer.msg(data.data.msg);
                        _this.telVal = "";
                    }
                }).catch(err => {
                      console.log(err)
                });
            }
        },     
    },
    created() {
        this.telVal = window.localStorage.getItem("iphone");        
        // 保存全局地址
        this.api = url;
        // 接口调用
        this.listData();
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
*{padding: 0; margin: 0;}
input::-webkit-input-placeholder{
    color: #ccc;
    font-size: 14px;
    font-family: "KaiGenGothicSC-Light";
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #ccc;
    font-size: 14px;
    font-family: "KaiGenGothicSC-Light";
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #ccc;
    font-size: 14px;
    font-family: "KaiGenGothicSC-Light";
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color: #ccc;
    font-size: 14px;
    font-family: "KaiGenGothicSC-Light";
}
.seek_wrap{
    width: 100%;
    font-family: "KaiGenGothicSC-Light";
}
.seek_box{
    width: 100%;
    height: 525px;
    background: url(images/turn_bg.png);
    background-size: 100% 100%;
    /*background-position: center center;*/
    background-repeat: no-repeat;
    .seek_box1{
        width: 1200px;
        height: 525px;
        margin: 0 auto;
        padding-top: .1px;
        .box_free{
            width: 322px;
            height: 282px;
            padding: 25px;
            background: #fff;
            border-radius: 4px;
            margin-top: 65px;
            float: left;
            h3{
                color: #333;
                font-size: 24px;
                text-align: center;
                font-weight: 600;
                font-family: "KaiGenGothicSC-Light";
            }
            input{
                height: 46px;
                width: 310px;
                border: 2px solid #E8584F;
                border-radius: 4px;
                margin-bottom: 26px;
                padding-left: 8px;
                font-family: "KaiGenGothicSC-Light";
            }
            h5{
                color: #666;
                margin-top: 40px;
                margin-bottom: 8px;
                font-size: 16px;
                font-family: "KaiGenGothicSC-Light";
                span{
                    color: #E8584F;
                }
            }
            .submit_btn{
                width: 320px;
                border-radius: 4px;
                background: #E8584F;
                color: #fff;
                font-size: 16px;
                line-height: 50px;
                text-align: center;
                margin-bottom: 40px;
                cursor: pointer;
                font-family: "KaiGenGothicSC-Light";
            }
            h6{
                text-align: center;
                color: #333;
                font-size: 16px;
                font-weight: 400;
                font-family: "KaiGenGothicSC-Light";
            }
        }
    }
}
.seek_right{
    width: 722px;
    height: 300px;
    float: right;
    margin-top: 80px;
    color: #fff;
    font-family: "KaiGenGothicSC-Light";
    h1{
        font-size: 48px;
        color: #fff;
        font-weight: 600;
        font-family: "KaiGenGothicSC-Light";
        span{
            color: #E8584F;
            font-family: "KaiGenGothicSC-Light";
        }
    }
    h3{
        font-size: 22px;
        text-align: center;
        margin-top: 40px;
        margin-bottom: 72px;
        font-family: "KaiGenGothicSC-Light";
    }
    /*ul{
        margin-top: 70px;
        li{
            float: left;
            margin-right: 76px;
        }
        :nth-child(4){
            margin-right: 0px;
        }
    }*/
    dl{
        width: 130px;
        float: left;
        margin-right: 50px;
        dt{
            width: 62px;
            font-size: 34px;
            line-height: 62px;
            text-align: center;
            background: #E8584F;
            color: #fff;
            border-radius: 50%;
            margin-left: 34px;
            margin-bottom: 23px;
            font-family: "KaiGenGothicSC-Light";
        }
        dd{          
            p{
                font-size: 20px;
                color: #fff;
                text-align: center;
                margin-bottom: 10px;
                font-weight: 300;
                font-family: "KaiGenGothicSC-Light";
            }
        }
    }
    .shen{
        margin-right: 0px;
    }
    /*dl:nth-child(6){
        margin-right: 0px;
    }*/
}
.seek_present{
    width: 1200px;
    height: 380px;
    margin: 0 auto;
    h2{
        color: #000;
        font-size: 24px;
        margin-top: 80px;
        margin-bottom: 44px;
        text-align: center;
        font-weight: 600;
        font-family: "KaiGenGothicSC-Light";
    }
    dl{
        width:259px; height:240px;                   
        background:rgba(255,255,255,1);                   
        border-radius: 4px;                   
        box-shadow: 0px 0px 6px rgba(0,0,0,0.18);
        float: left;
        margin-right: 54px;
        dt{
            width: 70px;
            height: 70px;
            margin-left: 95px;
            margin-top: 32px;
        }
        dd{
            text-align: center;
            h3{
                color: #224E8F;
                margin-top: 30px;
                margin-bottom: 16px;
                font-size: 20px;
            }
            p{
                color: #000;
                font-size: 14px;
                width: 230px;
                margin-left: 15px;
                font-family: "KaiGenGothicSC-Light";
            }
        }
    }
    dl:nth-child(5){
        margin-right: 0px;
    }
}
</style>
