<template>
    <div class="nav">
        <div class="nav_top">
            <dl>
                <dt><a href="index.html"><img src="./images/up.png"></a></dt>
                <dd><span>北京</span><img src="./images/locating.png"></dd>
            </dl>
            <ul>
                <li><a href="index.html" :class="{active: isActive1}">首页</a></li>
                <li><a href="shopList.html" :class="{active: isActive2}">找铺开店</a></li>
                <li><a href="seekShop.html" :class="{active: isActive3}">委托找铺</a></li>
                <li><a href="turnShop.html" :class="{active: isActive4}">委托转铺</a></li>
                <li><a href="news.html" :class="{active: isActive5}">行业资讯</a></li>
                <li><img src="./images/phone.png"><a href="appDownload.html" :class="{active: isActive6}">APP下载</a></li>
            </ul>
            <div class="user_login">
                <p v-if="this.token"><img src="./images/user.png"><a href="mine.html" :class="{active: isActive8}">我的优铺</a><i></i></p>
                <p v-else><img src="./images/user.png"><a href="login.html" :class="{active: isActive7}">用户登录</a><i></i></p>
                <div class="info_tel"><img src="./images/tel.png">咨询热线4008988808<i></i></div>
                <span><a href="http://youpu100.cn" target="_blank" style="color: #224E8F; font-weight: 500;">卖铺宝</a></span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import {getQueryString,GetRequest,url} from 'common/js/common.js';
export default {
  name: 'hello',
  data () {
    return {
        url: "",
        token: null,
        isActive1: false,
        isActive2: false,
        isActive3: false,
        isActive4: false,
        isActive5: false,
        isActive6: false,
        // isActive7: false,
        // isActive8: false,
    }
  },
  methods:{
    // 获取页面路径
    achieveUrl(){
        var filename=window.location.href;
        if(filename.indexOf("shopList") != -1){
            this.isActive2 = true;
        } else if(filename.indexOf("seekShop") != -1){
            this.isActive3 = true;
        } else if(filename.indexOf("turnShop") != -1){
            this.isActive4 = true;
        } else if(filename.indexOf("news") != -1){
            this.isActive5 = true;
        } else if(filename.indexOf("appDownload") != -1){
            this.isActive6 = true;
        } else if(filename.indexOf("shopDetail") != -1){
            this.isActive2 = true;
        } else if(filename.indexOf("newsDetail") != -1){
            this.isActive5 = true;
        }else{
            this.isActive1 = true;
        }

        // else if(filename.indexOf("login") != -1){
        //     this.isActive7 = true;
        // } else if(filename.indexOf("mine") != -1){
        //     this.isActive8 = true;
        // }
    },
    // 判断Token是否过期
    isToken(){
        let url =  this.api + '/user/shopCheckedRecords'
        // console.log(localStorage.iphone);
        // console.log(localStorage.token);
        axios(url,{
            method: 'post',
            params: {
                account: localStorage.iphone,
                shopId: '0',
                type: "0",
                token: localStorage.token
            },
        }).then(data => {
            // console.log("11111")
            // console.log(data)
            if(data.data.code == 401){
                localStorage.clear();
            }
        }).catch(err => {
            console.log(err)
        });
    }

  },
  created(){
    // 保存全局地址
    this.api = url;
    // 调用获取页面路径方法
    this.achieveUrl();
    this.token = localStorage.token;
    this.isToken();
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
h1, h2 {
    font-weight: normal;
}
html{font-family: "微软雅黑"};
.nav{
    height: 70px;
    width: 100%;
    line-height: 70px;
    background: #fff;
    /*border-bottom: 1px solid #ccc;*/
    box-shadow: 0px 0px  6px 1px #eaeaea;
    .nav_top{
        width: 1200px;
        height: 70px;
        margin: 0 auto;
        background: #fff;
        dl{
            width: 320px;
            height: 70px;
            float: left;
            dt{
                width: 200px;
                height: 70px;
                float: left;
                img{
                    width: 100%;
                    position: relative;
                    top: -1px;
                }
            }
            dd{
                width: 100px;
                height: 70px;
                float: left;
                margin-left: 16px;
                span{
                    font-size: 16px;
                    color: #888;
                    display: inline-block;
                }
                img{
                    margin-left: 6px;
                    position: relative;
                    top: -2px;
                }
            }
        }
        ul{
            width: 550px;
            height: 70px;
            list-style-type: none;
            padding: 0;
            z-index: 100000;
            float: left;
            /*background: pink;*/
            li{
                display: inline-block;
                float: left;
                margin-right: 26px;
                /*background: yellow;*/
                img{
                    margin-right: 6px;
                    position: relative;
                    top: -1px;
                }
              a {
                color: #888;
                text-decoration: none;
                font-size: 16px;
                /*设置导航动态样式*/
                &.active{
                  color: #224E8F;
                  font-weight:bold;
                }
              }
            }
        }
        .user_login{
            width: 330px;
            /*background: red;*/
            float: right;
            p{
                width: 105px;
                display: inline-block;
                float: left;
                color: #888;
                font-size: 14px;
                img{
                    margin-right: 4px;
                    position: relative;
                    top: -1.6px;
                }
                i{
                    width: 1px;
                    height: 16px;
                    background: #ddd;
                    display: inline-block;
                    margin-left: 10px;
                    margin-right: 10px;
                    position: relative;
                    top: 2px;
                }
            }
            .info_tel{
                display: inline-block;
                float: left;
                font-size: 14px;
                color: #888;
                img{
                    margin-right: 4px;
                    position: relative;
                    top: -1.6px;
                }
                i{
                    width: 1px;
                    height: 16px;
                    background: #ddd;
                    display: inline-block;
                    margin-left: 10px;
                    margin-right: 10px;
                    position: relative;
                    top: 2px;
                }
                span{
                    a{
                        color: #224E8F;
                    }
                }

            }
        }
    }
}







</style>
