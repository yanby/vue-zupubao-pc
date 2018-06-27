<template>
<div id="app">
    <Nav></Nav>
    <div class="login_bg">
        <div class="login_box">
            <ul>
                <li><a href="index.html">首页</a>></li>
                <li>用户登录</li>
            </ul>
            <div class="login_wrap">
                <table>
                    <tr>
                        <td class="td1">手机号码</td>
                        <td><input type="" name="" class="login_tel" placeholder="请输入您的手机号码" v-model="phoneVal" maxlength="11" @blur="blur_tel()" @focus="gotFocus()">
                            <!-- <span class="get_code" style="background: #ccc;" v-if="showCode">获得验证码</span> -->
                            <button type="button" :disabled="disabled" @click="sendcode"  class="get_code">{{btntxt}}</button>
                        </td>
                    </tr>
                    <tr>
                        <td class="td1"></td>
                        <!-- <td class="text_verify">请输入手机号</td> -->
                        <td class="text_verify">{{text_tel}}</td>
                    </tr>
                    <tr>
                        <td class="td1">手机验证码</td>
                        <td><input type="" name="" class="login_code" v-model="securityCode" placeholder="请输入验证码" maxlength="6" @blur="blur_code()"></td>
                    </tr>
                    <tr>
                        <td class="td1"></td>
                        <!-- <td class="text_verify">请输入验证码</td> -->
                        <td class="text_verify">{{text_code}}</td>
                    </tr>
                    <tr>
                        <td class="td1"></td>
                        <td><span class="text_promp">无需注册，输入手机号即可登录</span></td>
                    </tr>
                    <tr>
                        <td class="td1"></td>
                        <td><div class="login_btn" @click="loginBtn($event)">登录</div></td>
                    </tr>
                </table>

                <div class="imgs-box">
                    <img src="./images/youpu.png">
                </div>
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
import axios from 'axios'
import qs from 'qs'
import {getQueryString,GetRequest,url} from 'common/js/common.js'
const countdown = 60;
export default {
    name: 'app',
    components: {
        Nav,
        Footer,
        Navbar
    },
    data (){
        return {
            // 全局地址
            api: "",
            phoneVal: '', // 手机号码
            securityCode: '', // 验证码
            disabled:false,
            time:0,
            btntxt:"获取验证码",
            text_tel: "",
            text_code: "",
            showCode: true
        }
    },
    mounted(){

    },
    methods:{
        //获取验证码
        sendcode() {
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            let _this = this;
            if(this.phoneVal==''){
                this.text_tel = '请输入手机号'
            }else if(!reg.test(this.phoneVal)){
                this.text_tel = '请输入正确的手机号'
            }else{
                // 接口调用
                let _this = this
                let url =  _this.api + '/user/sendsms'
                let str = _this.phoneVal;
                let num = str.replace(/[^0-9]/ig,"");

                // console.log(num);
                axios(url,{
                    method: 'post',

                    params: {
                        phoneNumber: num
                    }
                }).then(data => {
                    // console.log(data);
                    if(data.data.code = 200){
                        this.text_tel = "";
                        this.time=60;
                        this.disabled=true;
                        this.timer();
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
        },

        // 倒计时
        timer() {
            if (this.time > 0) {
                this.time--;
                // this.btntxt=this.time+"s后重新获取";
                this.btntxt= "重新获取(" + this.time + ")";
                setTimeout(this.timer, 1000);
            } else{
                this.time=0;
                this.btntxt="获取验证码";
                this.disabled=false;
            }
        },

        // 点击登录按钮
        loginBtn() {
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            let _this = this;
            if(this.phoneVal==''){
                this.text_tel = '请输入手机号'
            }else if(!reg.test(this.phoneVal)){
                this.text_tel = '请输入正确的手机号'
            }else if(this.securityCode == ""){
                this.text_code = '请输入验证码'
            }else{
                this.text_code = ""
                this.text_tel = ""
                let url = _this.api + '/login';
                let str = _this.phoneVal;
                let num = str.replace(/[^0-9]/ig,"");
                axios(url,{
                    method: 'post',
                    params:
                    {
                        account: num,
                        password: _this.securityCode,
                    }
                }).then(data => {
                    // console.log(data);
                    let tel = data.data.phone
                    if(data.data.code == 200){
                        // window.location.href = "http://www.youpuchina.com/member.html";
                        var filename=window.location.href;
                        if(filename.indexOf("goId=1") != -1){
                            window.history.back(-1);
                        }else{
                            // window.location.href = "http://www.youpuchina.com/member.html";
                            window.location.href = "member.html";
                        }
                        window.localStorage.setItem("token",data.data.token);
                        window.localStorage.setItem("iphone",data.data.phone);
                        window.localStorage.setItem("pvCount",data.data.pvCount);
                    }else if(data.data.code == 500){
                      this.text_code = '请输入正确验证码'
                    } else{
                        this.$message({
                            message: '登录失败',
                            // type: 'success'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
        },

        // 电话号码失去焦点
        blur_tel() {

            if(this.phoneVal.length == 11){
                // alert(1)
                this.showCode = false;
            }

            // let reg=/^1([38]\d|4[57]|5[0-35-9]|7[06-8])(\-\d{4}){2}$/;
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            let _this = this;
            if(this.phoneVal==''){
                this.text_tel = '请输入手机号'
            }else if(!reg.test(this.phoneVal)){
                this.text_tel = '请输入正确的手机号'
            }else{
                this.text_tel = ''
            }
        },
        // 验证码失去焦点
        blur_code() {

            let codeReg = /\d{6}/;
            let _this = this;

            if(this.securityCode == ""){
                this.text_code = '请输入验证码'
            }else if(!codeReg.test(this.securityCode)){
                this.text_code = '请输入正确验证码'
            }else{
                this.text_code = ''
            }
        },

        // 获得焦点
        gotFocus(){
            // console.log(this.phoneVal.length);
            if(this.phoneVal.length == 11){
                // alert(1)
                this.showCode = false;
            }
        }
    },
    created() {
        // 保存全局地址
        this.api = url;
    },
    watch: {
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

.login_bg{
    width: 100%;
    height: 688px;
    background: url(images/login_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding-top: 0.1px;
    .login_wrap{
        width: 935px;
        height: 370px;
        margin: 110px auto 0px;
        background: url(images/youpu_bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding-top: 0.1px;
    }
}
table{
    width: 500px;
    height: 280px;
    margin-left: 50px;
    margin-top: 44px;
    float: left;
    .td1{
        width: 100px;
        color: #224E8F;
    }
    input{
        line-height: 40px;
        border-radius: 4px;
        border: 1px solid #224E8F;
        outline: none;
        font-family: "KaiGenGothicSC-Light";
    }
    .login_tel{
        width: 208px;
    }
    .login_code{
        width: 343px;
    }
    .get_code{
        display: inline-block;
        width: 119px;
        height: 42px;
        background: #224e8f;
        text-align: center;
        line-height: 42px;
        font-size: 16px;
        color: #fff;
        border-radius: 4px;
        margin-left: 16px;
        position: relative;
        top: 3px;
        font-family: "KaiGenGothicSC-Light";
    }
    .text_promp{
        font-size: 14px;
        color: #333;
        padding-left: 6px;
        font-family: "KaiGenGothicSC-Light";
    }
    .text_verify{
        font-size: 14px;
        color: #E11212;
        padding-left: 6px;
        font-family: "KaiGenGothicSC-Light";
    }
    .login_btn{
        width: 220px;
        height: 45px;
        background: #224e8f;
        text-align: center;
        line-height: 45px;
        border-radius: 4px;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        font-family: "KaiGenGothicSC-Light";
    }
}
.imgs-box {
    float: right;
    width: 260px;
    height: 80px;
    margin-top: 120px;
    margin-right: 80px;
}

.login_box{
    width: 1200px;
    margin: 0 auto;
    padding-top: .1px;
    ul{
        margin-top: 18px;
        li{
            float: left;
            color: #fff;
            font-size: 14px;
            font-family: "KaiGenGothicSC-Light";
            a{
                color: #fff;
                font-size: 14px;
                font-weight: 400;
                font-family: "KaiGenGothicSC-Light";
            }
        }
    }
}
input{
    padding-left: 6px;
}
</style>
