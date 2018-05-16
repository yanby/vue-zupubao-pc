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

// let url = "http://xin.youpuchina.com/";
let url = "http://api.zpb.youpuchina.com/";
export {getQueryString,GetRequest,url}
