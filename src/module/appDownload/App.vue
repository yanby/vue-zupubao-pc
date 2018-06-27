<template>
<div id="app">
    <Nav></Nav>
    <div>
        <div class="app_code">
            <dl>
                <dt><img src="./images/zupubao.png"></dt>
                <dd>
                    <p class="p1">扫描下载</p>
                    <p>租铺宝客户端</p>
                </dd>
            </dl>
        </div>
        <el-carousel trigger="click" height="888px">
            <el-carousel-item v-for="(item,index) in picArr">
                <h3>
                    <img :src="item.img">
                    <div class="app_img">
                        <div class="img_left">
                            <img :src="item.tel">
                        </div>
                        <div class="img_right">
                            <div class="img_right_top"><img :src="item.txt"></div>
                            <div class="img_right_bttom">
                                <!-- <p class="img1" @click="android_app"></p>
                                <p class="img2" @click="ipone_app"></p> -->
                                
                                <div class="img1" @click="android_app">
                                    <li></li>
                                    <p>Android市场下载</p>
                                </div>
                                <div class="img2" @click="ipone_app">
                                    <li></li>
                                    <p>AppStore下载</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </h3>
            </el-carousel-item>
        </el-carousel>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import 'common/css/reset.css';
import Nav from 'components/Nav/Nav'
import Footer from 'components/Footer/Footer'

export default {
    name: 'app',
    components: {
        Nav,
        Footer
    },
    data (){
    return {
        picArr: [
            {
                'id': '0',
                'img': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/bg_1.png',
                'txt': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/1.png',
                'tel': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/tel_1.png'
            }, {
                'id': '1',
                'img': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/bg_1.png',
                'txt': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/2.png',
                'tel': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/tel_2.png'
            }, {
                'id': '2',
                'img': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/bg_1.png',
                'txt': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/3.png',
                'tel': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/tel_3.png'
            }, {
                'id': '3',
                'img': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/bg_1.png',
                'txt': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/4.png',
                'tel': 'https://up-img.oss-cn-beijing.aliyuncs.com/logos/tel_4.png'
            }],
        }
    },
    mounted(){
   
    },
    methods:{
        android_app(){
            window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.example.dc.zupubao");
        },
        ipone_app(){
            window.open("https://itunes.apple.com/cn/app/%E7%A7%9F%E9%93%BA%E5%AE%9D-%E4%B8%93%E4%B8%9A%E5%95%86%E9%93%BA%E5%87%BA%E7%A7%9F%E8%BD%AC%E8%AE%A9%E5%B9%B3%E5%8F%B0/id1371978896?mt=8");
        }
      
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
.app_code{
    position: fixed;
    right: 0px;
    top: 120px;
    width: 132px;
    height: 188px;
    background: #333;
    z-index: 2000000;
    border-top: 2px solid #E8584F;
    border-radius: 2px;
    dl{
        width: 110px;
        padding: 13px;
        dd{
            p{
                text-align: center;
                font-weight: 300;
                line-height: 20px;
                font-size: 16px;
                color: #fff;
                font-family: "KaiGenGothicSC-Light";
            }
            .p1{
                margin-top: 10px;
                margin-bottom: 6px;
            }
        }
       
    }
}
.app_img{
    width: 1060px;
    height: 800px;
    text-indent: 10000;
    position: absolute;
    left: 50%;
    top: 0;
    margin-left: -530px;
    .img_left{
        width: 340px;
        height: 696px;
        margin-top: 100px;
        float: left;
    }
    .img_right{
        width: 630px;
        height: 696px;
        margin-top: 100px;
        float: left;
        margin-left: 80px;
        .img_right_top{
            margin-top: 111px;
        }
        .img_right_bttom{
            margin-top: 120px;
            .img1{
                width: 306px;
                height: 76px;
                margin-bottom: 20px;
                background: #fff;
                border-radius: 4px;     
                cursor: pointer;          
                li{
                    width: 32px;
                    height: 32px;
                    background: url('images/androidIcon1.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    list-style-type: none;
                    float: left;
                    margin-top: 24px;
                    margin-left: 15px;
                    margin-right: 15px;
                }
                p{
                    float: left;
                    color: #666;
                    font-size: 28px;
                    margin-top: 30px;
                    font-weight: 430;
                    font-family: "KaiGenGothicSC-Light";
                }
            }
            .img1:hover{
                background: #E8584F;
                li{
                    background: url('images/androidIcon2.png');
                }
                p{
                    color: #fff;
                }
            }
            .img2{
                width: 306px;
                height: 76px;
                background: #fff;
                border-radius: 4px;  
                cursor: pointer;             
                li{
                    width: 32px;
                    height: 32px;
                    background: url('images/iphoneIcon1.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    list-style-type: none;
                    float: left;
                    margin-top: 22px;
                    margin-left: 15px;
                    margin-right: 15px;
                }
                p{
                    float: left;
                    color: #666;
                    font-size: 28px;
                    margin-top: 26px;
                    font-weight: 430;
                    font-family: "KaiGenGothicSC-Light";
                }
            }
            .img2:hover{
                background: #E8584F;
                li{
                    background: url('images/iphoneIcon2.png');
                }
                p{
                    color: #fff;
                }           
            }
        }
    }
}
</style>
<style>
.el-carousel__item h3 {
    width: 100%;
    margin: 0 auto;
    /*text-align: center;*/
    position: relative;
    /*vertical-align:middle;*/
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.el-carousel__button {
    width: 12px!important;
    height: 12px!important;
    border-radius: 50%!important;
}

.el-carousel__arrow{
    font-size: 26px!important;
}
.el-carousel__arrow--right {
    width:  60px!important;
    height: 60px!important;
}
.el-carousel__arrow--left {
    width:  60px!important;
    height: 60px!important;
}

</style>
