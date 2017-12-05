require('./result.css');
var ff = require('../../PTools/ff');
// var navSide = require('../../page/common/nav-side/nav-side');

$(function () {
   var type = ff.getUrlParam('type') ||'default',
       $element = $('.'+type+'-success');
   //显示操作的对应数据
   $element.show()
});