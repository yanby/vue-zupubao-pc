<template>

  <div class="navbar">
    <ul>
      <li><span></span>
          <div class="tel-msg">
            <p>咨询热线</p>
            <p>4008988808</p>
          </div>
      </li>
      <li><span></span>
          <div class="code-msg">
            <b></b>
          </div>
      </li>
      <li class="top"><span></span>
          <div class="top-msg">点击右侧返回顶部</div>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "common/js/jquery.min.js";
export default {
  name: 'hello',
  data () {
    return {
        tel: false
    }
  },
  mounted(){
    $(".navbar ul .top").on("click",function () {
      $('html , body').animate({scrollTop: 0},300);
    })

    $(window).scroll(function(){
      var winTop = $(window).scrollTop();
      if(winTop >= 100){
        $(".navbar").fadeIn()
      }else{
        $(".navbar").fadeOut()
      }
    })
  },
  methods:{
    // telFun(){
    //
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>
  @import '../../common/css/navbar.css';
</style>
