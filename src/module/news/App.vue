<template>
<div id="app">
    <Nav></Nav>
    <!-- 轮播图 -->
    <div class="playImg">
        <!-- <el-carousel trigger="click" height="400px" :interval="5000">
            <el-carousel-item v-for="(item,index) in picArr">
                <h3 @click="goNewInfo(item.artitleId)"><img :src="item.url"></h3>
            </el-carousel-item>
        </el-carousel> -->
        <img src="./images/newsBg.png">
    </div>

    <!-- 新闻列表展示 -->
    <div class="news_list" v-for="(item,index) in newArr" @click="goNews(item.id)">
        <dl>
            <img :src="item.url">
            <dt>
                <h3>{{item.title}}</h3>
                <div>
                    <h5>{{item.content}}</h5>
                </div>
            </dt>
            <dd>
                <h2>{{item.time}}</h2>
                <h4>{{item.date}}</h4>
            </dd>
        </dl>
    </div>

    <!-- 分页 -->
    <div class="page">
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="5"
            :total="total">
        </el-pagination>

        <!-- <el-pagination background layout="prev, pager, next" :current-page="curPage" :page-size="10" :total="totalCount" @current-change="handleCurrentChange"> -->
        </el-pagination>
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
  export default {
    name: 'app',
    data () {
        return {
            // 轮播图数组
            picArr: [],
            // 新闻数组
            newArr: [],
            // 全局地址
            api: "",
            // 分页
            page: "0",
            rows: "5",
            total:0,  //接收渲染数据总数的参数
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
        //分页
        handleCurrentChange(val) {
            //console.log(val);
            this.page = val - "1";
            if(this.page < 1){
                this.page = 0;
            }
            $('html , body').animate({scrollTop: 100},1000);
            this.listData();
        },

        // 新闻展示
        listData() {
            let _this = this
            let url = this.api + '/show/getAticleList'
            // let url = 'http://192.168.1.153:8080/show/getAticleList'
            axios(url,{
                method: 'post',
                // data: obj
                url: url,
                params: {
                    start:_this.page,
                    end:  _this.rows
                }
            }).then(data => {
                //console.log(data);
                // 新闻列表
                this.newArr = data.data.data.info;
                this.total = data.data.data.count;
                // console.log(this.total);
            }).catch(err => {
                console.log(err)
            });
        },
        // 轮播图展示
        picData() {
            let url = this.api + '/show/showInfo'
            axios(url,{
                method: 'get',
                // data: obj
                url: url,
            }).then(data => {
                //console.log(data);
                // 轮播图
                this.picArr = data.data.data.imgUrl;
            }).catch(err => {
                console.log(err)
            });
        },

        goNews(id){
            window.location.href = "newsDetail.html?id="+id;
        },

        // 点击轮播图 跳转详情页
        goNewInfo(id) {
            // window.open("newsDetail.html?id=" + id);
            window.location.href = "newsDetail.html?id=" + id;
        }

    },
    created() {
        // 保存全局地址
        this.api = url;
        // 轮播图展示
        this.picData()
        // 接口调用
        this.listData();
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../common/css/shopPages.css';
*{padding: 0; margin: 0;}
html{font-family: "KaiGenGothicSC-Light";};
.playImg{
    width: 100%;
    height: 400px;
    overflow: hidden;
    img{
        /*width: 100%;*/
        height: 400px;
        position: relative;
        left: 50%;
        margin-left: -960px;
    }
}

.news_list{
    width: 100%;
    height: 180px;
    border-bottom: 1px solid #eaeaea;
    padding-top: 0.1px;
    cursor: pointer;
    position: relative;
    dl{
        width: 1200px;
        height: 150px;
        margin: 30px auto;
        position: absolute;
        left: 50%;
        margin-left: -600px;
        transition: left .5s;
        img{
            width: 220px;
            height: 120px;
            border: none;
            display: inline-block;
            float: left;
        }
        dt{
            width: 720px;
            height: 150px;
            float: left;
            margin-left: 32px;
            margin-right: 78px;
            h3{
                font-size: 20px;
                color: #333;
                margin-bottom: 10px;
                font-family: "KaiGenGothicSC-Light";
            }
            div{
                width: 720px;
                height: 90px;
                overflow: hidden;
                h5{
                    font-size: 16px;
                    color: #666;
                    line-height: 30px;
                    font-weight: 400;
                    text-align: justify;
                    font-family: "KaiGenGothicSC-Light";
                }
            }
        }
        dd{
            width: 90px;
            float: left;
            text-align: center;
            margin-top: 30px;
            h2{
                font-size: 60px;
                color: #999;
                font-weight: 400;
                height: 50px;
                font-family: "KaiGenGothicSC-Light";
            }
            h4{
                font-size: 20px;
                color: #999;
                font-weight: 400;
                font-family: "KaiGenGothicSC-Light";
            }
        }
    }
    &:hover{
        background: #eaeaea;
        dl{
            position: relative;
            left: 51%;
        }
    }
}

/*分页*/
.page{
    width: 100%;
    margin: 50px auto;
    text-align: center;
}
</style>
