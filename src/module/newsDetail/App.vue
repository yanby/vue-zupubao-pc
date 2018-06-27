<template>
<div id="app">
    <Nav></Nav>
    <div class="wrap">
        <h1 title="文章"></h1>
        <h2>{{this.newTitle}}</h2>
        <h5>发布时间{{this.newTime}}</h5>
        <div class="wrap_box" v-html="newMain">           
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
import axios from 'axios';
import qs from 'qs';
import {getQueryString,GetRequest,url} from 'common/js/common.js'
const newsTitle = "标题标题"

export default {
    name: 'app',
    data(){
        return{
            api: "",
            id: "",
            newMain: "",
            newTitle: "",
            newTime: "",
            titleObj: "文章 文章"
        }},
    components: {       
        Nav,
        Footer,
        Navbar
    },
    
    mounted(){
    
    },
    methods:{
        listData() {
            let _this = this
            let url = _this.api + '/show/getMediaList'
            // let url = 'http://192.168.1.153:8080//show/getMediaList'
            axios(url,{
                method: 'post',
                params: {
                    titleId: this.id,
                }
            }).then(data => {
                // console.log(data);
                this.newTitle = data.data.data.info[0].title;
                this.newTime = data.data.data.info[0].date;
                this.newMain = data.data.data.info[0].content;
            }).catch(err => {
                console.log(err)
            });
        },      
    },
    created() {
        // 保存全局地址
        this.api = url;
        function GetQueryString(name){  
             var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
             var r = window.location.search.substr(1).match(reg);  
             if(r!=null)return  unescape(r[2]); return null;  
        }  
        var id;   
        if(GetQueryString("id") !=null && GetQueryString("id").toString().length>1){  
           id = GetQueryString("id");  
        }  
        this.id = id;        
        this.listData();
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
*{padding: 0; margin: 0;}
html{font-family: "KaiGenGothicSC-Light"};
h2{
    color: #333;
    font-size: 30px;
    text-align: center;
    margin-top: 50px;
    font-family: "KaiGenGothicSC-Light";
}
h5{
    color: #999899;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
    font-family: "KaiGenGothicSC-Light";
}
.wrap{
    width: 1176px;
    margin: 0px auto 60px;
    overflow: hidden;
    font-family: "KaiGenGothicSC-Light";
}
.wrap_box img{
    margin-top: 100px;
    width: 100px!important;
}


</style>
