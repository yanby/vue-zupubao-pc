<template>
<div id="app">
    <Nav></Nav>
    <div class="mine w1200 clearfix">
      <div class="mine-left left">
          <div class="mine-msg">
            <div class="img"></div>
            <p>{{iphone}}<span></span></p>
            <div class="txt">
              今日已查看 <span class="red">{{pvCount - numIndex}}</span> 套铺源 <br>(共10套/日)
            </div>
          </div>
          <div class="mine-list">
            <ul>
              <li class="cur">我的收藏</li>
              <li @click="btn()">退出登录</li>
            </ul>
          </div>
      </div>
      <div class="mine-right right">
        <div class="noCollect" v-show="collect===0">
          <div class="wrap">
            <div class="img"></div>
            <div class="txt">您还没有收藏过任何商铺！ <br><a href="shopList.html">去抢旺铺</a></div>
          </div>
        </div>
        <div class="collect" v-show="collect===1">
          <h3>共 <span>{{totalCount}}</span> 套收藏铺源</h3>
          <ul class="shop-left shop-collect">
            <li v-for="item in shopList" @click="goShopDetail(item.id)">
              <div class="img">
                <img :src="item.img" alt="">
              </div>
              <div class="txt">
                <h5>{{item.title}}</h5>
                <p>{{item.shopName}}</p>
                <div class="tag">
                  <span v-if="index1 < 3" v-for="(item1,index1) in item.shopTags">{{item1}}</span>
                </div>
              </div>
              <div class="price">
                <p><span>{{item.monthlyRent}}</span> <b>{{item.unit}}</b></p>
                <div>转让费: <span>{{item.transferFee}}{{item.unitTransFerfee}}</span></div>
                <div class="cancel" @click.stop="cancelCollect(item.shopCollId)"><span></span>取消收藏</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="page" v-show="pageList">
          <el-pagination background layout="prev, pager, next" :page-size="10" :total="totalCount" @current-change="handleCurrentChange">
          </el-pagination>
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
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import axios from 'axios'
import qs from 'qs'
import {getQueryString,GetRequest,url} from 'common/js/common.js'
export default {
    name: 'app',
    components: {
      Nav,
      Footer,
      Navbar
    },
    data (){
      return {
        numIndex: 0,
        pvCount: 10,//次数总数
        iphone: "",//手机号好
        collect: "",//判断有没有收藏
        shopList: "",//收藏列表
        shopCollId: "",//收藏烌ID
        pageList: false,
        totalCount: 0,//总条数
        page: ""
      }
    },
    mounted(){
      this.iphoneFun()
      this.init();//次数
      this.collectFun();//收藏列表
    },
    methods:{
      iphoneFun(){
        var str = localStorage.iphone;
        this.iphone = str.substr(0,3)+"****"+str.substr(7);
      },
      init(){//次数
        axios(this.changeData() + '/user/shopCheckedRecords',{
          method: 'post',
          params: {
            account: localStorage.iphone,
            shopId: '0',
            type: "0",
            token: localStorage.token,
            page: 0
          }
        })
          .then(res => {
            console.log(res)
            if(res.data.code == "200"){
              this.pvCount = localStorage.pvCount
              this.numIndex = res.data.count;
            }else if(res.data.code == 401){
              localStorage.clear();
            }
          })
          .catch(err =>{
            console.log(err)
          })
      },
      collectFun(){//收藏列表
        axios(this.changeData() + '/shopCollection/getShopCollection',{
          method: 'post',
          params: {
            userId: localStorage.iphone,
            token: localStorage.token
          }
        })
          .then(res => {
            console.log(res)
            if(res.data.code == 200){
              this.shopList = res.data.content;
              this.totalCount = res.data.totals;

              if(this.totalCount == 0){
                this.collect = 0;
              }else{
                this.collect = 1;
              }
              if(this.totalCount > 10){
                this.pageList = true;
              }else{
                this.pageList = false;
              }
            }else if(res.data.code == 401){
              localStorage.clear();
            }
          })
          .catch(err =>{
            console.log(err)
          })
      },
      cancelCollect(id){//取消收藏
        var that = this;
        axios(this.changeData() + '/shopCollection/batchDele',{
          method: 'post',
          params: {
            shopIds : id,
            token: localStorage.token
          }
        })
        .then(res => {
          console.log(res)
          if(res.data.code == 200){
            that.$layer.msg("取消收藏")
            axios(this.changeData() + '/shopCollection/getShopCollection',{
              method: 'post',
              params: {
                userId: localStorage.iphone,
                token: localStorage.token,
                page: 0
              }
            })
            .then(res1 => {
              console.log(res1)
              if(res1.data.code == 200){
                that.shopList = res1.data.content;
                that.totalCount = res1.data.totals;
                console.log(that.totalCount)
                if(that.totalCount == 0){
                  that.collect = 0;
                }else{
                  that.collect = 1;
                }
                if(that.totalCount > 10){
                  that.pageList = true;
                }else{
                  that.pageList = false;
                }
              }
            })
            .catch(err =>{
              console.log(err)
            })
          }else if(res.data.code == 401){
            localStorage.clear();
          }
        })
          .catch(err =>{
            console.log(err)
          })
      },
      goShopDetail(id){//跳转到详情页面
        window.location.href = "shopDetail.html?shopId=" + id;
      },
      btn(){
        var that = this;
        this.$confirm('确认要退出登录么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          that.$layer.msg("退出成功")
          setTimeout(function(){
            window.localStorage.clear();
            window.location.href = "index.html";
          },1000)
        }).catch(() => {
          that.$layer.msg("已取消")
        });
      },
      handleCurrentChange(val){
        this.page = val - 1;
        var data = {
          userId: localStorage.iphone,
          token: localStorage.token,
          page: this.page
        }
        $('html , body').animate({scrollTop: 100},1000);
        axios(this.changeData() + 'shopCollection/getShopCollection',{
          method: 'post',
          params: {
            userId: localStorage.iphone,
            token: localStorage.token,
            page: this.page
          }
        })
          .then(res => {
            console.log(res)
            this.shopList = res.data.content;
          })
          .catch(err =>{
            console.log(err)
          })
      }
    },
    created() {
        // 保存全局地址
        this.api = url;

        // console.log(localStorage.token);

    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../common/css/mine.css';
  @import '../../common/css/shopMsg.css';
  @import '../../common/css/shopPages.css';
</style>
