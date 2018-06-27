<template>
<div id="app">
    <Nav></Nav>
    <div class="seek_wrap">
        <div class="seek_box">
            <div class="seek_box1">
                <div class="box_free">
                    <h3>免费委托找铺</h3>
                    <h5>已有<span>{{this.seekShopObj}}</span>人成功开店</h5>
                    <input type="text" name="" placeholder="请输入手机号,专属顾问5分钟内与您联系" maxlength="11" v-model="telVal">
                    <div class="submit_btn" @click="seekBtn">提交</div>
                    <h6>客服电话：400-898-8808</h6>
                </div>
                <div class="seek_right">
                    <h1>在线委托找铺平均<span>28</span>天成功开店</h1>
                    <h3>专属选址顾问竭诚为您服务</h3>
                    <dl>
                        <dt>
                            <div>全</div>
                        </dt>
                        <dd>
                            <span>●</span><li>全网铺源整合+众包地面采集+店主平台提交，铺源覆盖全渠道</li>
                            <span>●</span><li>商业街、购物中心、社区底商、独立商业铺源覆盖全业态</li>
                            <span>●</span><li>商铺直租、转让、招商多种租赁形式一应俱全</li>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <div>真</div>
                        </dt>
                        <dd>
                            <span>●</span><li>真实铺源，铺源100%人工核查证照、资质、产权全面核验</li>
                            <span>●</span><li>真实价格，拒绝虚报价格，实际保障，不吃差价</li>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <div>鲜</div>
                        </dt>
                        <dd>
                            <span>●</span><li>铺源时时上新，最快速度抢旺铺</li>
                            <span>●</span><li>独家铺源优先发布，新鲜供应不错过</li>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>

        <div class="seek_present">
            <h2>委托找铺六大安心服务承诺</h2>
            <dl>
                <dt><img src="./images/li1.png"></dt>
                <dd>
                    <h3>不成交 服务费全额退</h3>
                    <p>服务费仅为传统中介费1/10，合作期内未成功找到满意店铺，全额退还服务费</p>
                </dd>
            </dl>
            <dl>
                <dt><img src="./images/li2.png"></dt>
                <dd>
                    <h3>铺源全、真、鲜</h3>
                    <p>全网整合+人工采集铺源全覆盖，铺源100%人工核验，独家铺源新鲜上架</p>
                </dd>
            </dl>
            <dl>
                <dt><img src="./images/li3.png"></dt>
                <dd>
                    <h3>实价保障 不吃差价</h3>
                    <p>专业选址顾问全程陪同谈判议价，拒绝虚高报价，杜绝吃差价</p>
                </dd>
            </dl>
            <dl>
                <dt><img src="./images/li4.png"></dt>
                <dd>
                    <h3>拆迁担保  10倍赔付</h3>
                    <p>推荐商铺签约成功一年内遇拆迁，保障资金10倍赔付</p>
                </dd>
            </dl>
            <dl>
                <dt><img src="./images/li5.png"></dt>
                <dd>
                    <h3>法律担保  规避风险</h3>
                    <p>知名律师事务所战略合作，签约过程中遇到法律纠纷，全程免费协助</p>
                </dd>
            </dl>
            <dl>
                <dt><img src="./images/li6.png"></dt>
                <dd>
                    <h3>过户担保  安全交易</h3>
                    <p>专业选址顾问全程陪签，交易过户资金托管，平稳交易无风险</p>
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
            seekShopObj: null,
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
            // let url = 'http://192.168.1.154:8080/show/showInfo'
            // console.log(url);
            axios(url,{
                method: 'get',
                // data: obj
                url: url,
            }).then(data => {
                // console.log(data);    
                // 委托找铺
                _this.seekShopObj = data.data.data.peopleNum;
            }).catch(err => {
                console.log(err)
            });
        },  
        // 我要委托接口封装
        seekBtn(type) {
            let _this = this
            // 手机号码验证
            // let reg=/^1\d{10}$/;
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/; 
            if(this.telVal == ""){
                _this.$layer.msg("请输入手机号码");
                // this.$message({
                //     message: '请输入手机号码',
                //     type: 'error'
                // });
            }else if(!reg.test(this.telVal)){
                _this.$layer.msg("请输入正确手机号");
                // this.$message({
                //     message: '请输入正确手机号',
                //     type: 'error'
                // });
            }else {
                // 接口调用
                let url =  _this.api + '/show/addCutomer'
                // let url =  "http://192.168.1.154:8080//show/addCutomer"
                axios(url,{
                    method: 'post',
                    params: {
                        account: _this.telVal,
                        type: "1",
                        source: "3"
                    }
                }).then(data => {
                    console.log(data);
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
    background: url(images/seek.png);
    background-size: 100% 100%;
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
                margin-top: 38px;
                margin-bottom: 8px;
                font-size: 16px;
                font-family: "KaiGenGothicSC-Light";
                span{
                    color: #E8584F;
                    font-family: "KaiGenGothicSC-Light";
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
    height: 400px;
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
        margin-top: 30px;
        margin-bottom: 52px;
        font-family: "KaiGenGothicSC-Light";
    }
    dl{
        width: 220px;
        height: 268px;
        float: left;
        margin-right: 20px;
        dt{
            width: 62px;
            border-radius: 50%;
            color: #fff;
            font-size: 34px;
            line-height: 62px;
            background: #E8584F;
            text-align: center;
            margin-bottom: 22px;
            margin-left: 75px;
        }
        dd{
            span{
                float: left;
                width: 20px;
                margin-top: 3px;
                font-family: "KaiGenGothicSC-Light";
            }
            li{
                float: left;
                list-style-type: none;
                text-align: justify;
                font-size: 14px;
                width: 200px;
                margin-bottom: 15px;
                line-height: 24px;
                font-weight: 300;
                font-family: "KaiGenGothicSC-Light";
            }
        }

    }
}
.seek_present{
    width: 1200px;
    height: 620px;
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
        width:551px; height:134px;                   
        background:rgba(255,255,255,1);           
        border-radius: 4px;            
        box-shadow:0px 0px 6px rgba(0,0,0,0.18);
        float: left;
        margin-right: 96px;
        margin-bottom: 35px;
        dt{
            width: 70px;
            height: 70px;
            margin-left: 30px;
            margin-top: 28px;
            margin-right: 20px;
            float: left;
        }
        dd{
            width: 391px;
            float: left;
            h3{
                font-size: 18px;
                color: #224E8F;
                margin-top: 35px;
                margin-bottom: 14px;
                font-weight: 600;
                font-family: "KaiGenGothicSC-Light";
            }
            p{
                color: #000000;
                font-size: 14px;
                font-family: "KaiGenGothicSC-Light";
            }
        }
    }
    dl:nth-child(odd){
        margin-right: 0px;
    }
}
</style>
