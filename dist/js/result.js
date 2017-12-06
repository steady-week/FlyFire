webpackJsonp([6],{

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(39);


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40);
var ff = __webpack_require__(0);
// var navSide = require('../../page/common/nav-side/nav-side');

$(function () {
   var type = ff.getUrlParam('type') ||'default',
       $element = $('.'+type+'-success');
   //显示操作的对应数据
   $element.show()
});

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[38]);