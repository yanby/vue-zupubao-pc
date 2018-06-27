var getQueryString = function(name){
  var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
  var result = window.location.search.substr(1).match(reg);
  return result?decodeURIComponent(result[2]):null;
}
var GetRequest = function () {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}



var NewTime = function(s){
  var unixTimestamp = new Date( s ) ;
  Date.prototype.toLocaleString = function() {
    // return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
  };
  var commonTime = unixTimestamp.toLocaleString();
  return commonTime;
}
//获得年月日      得到日期oTime
var NowTime = function(str){
  function getzf(num){
    if(parseInt(num) < 10){
      num = '0'+num;
    }
    return num;
  }
  var oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth()+1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),
    oSen = oDate.getSeconds(),
    oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
  return oTime;
};


//获得年月日      得到日期oTime
var NewTime = function(str){
  function getzf(num){
    if(parseInt(num) < 10){
      num = '0'+num;
    }
    return num;
  }
  var oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth()+1,
    oDay = oDate.getDate(),
    oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay);//最后拼接时间
  return oTime;
};

let url = "http://api.zpb.youpuchina.com/"; // 正式服务器
// let url = "http://api.zpb.yingshangchina.com"; //测试服务器
//let url = "http://api.zpb.yingshangchina.com"; //测试服务器
export {getQueryString,GetRequest,NowTime,NewTime,url}
