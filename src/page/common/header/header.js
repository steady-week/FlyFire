require('./header.css');
var ff = require('../../../PTools/ff');
//通用页面头部
var header = {
    init: function (){
        this.bindEvent();
        this.onLoad();
    },
    onLoad : function () {
      var keyword = ff.getUrlParam('keyword');
      //如果keyword存在回填输入框
      if(keyword){
          $('#search-input').val(keyword)
      }
      //此处有待检查
    },
    bindEvent : function () {
        var that = this;
        //点击搜一下时候触发的事件
        $('#search-btn').click(function () {
            that.searchSubmit();
        });
        $('#search-input').keyup(function (e) {
            if(e.keyCode ===13){
                that.searchSubmit();
            }
        })
    },
    //搜索的提交
    searchSubmit : function () {
            var keyword = $.trim($('#search-input').val());
            if(keyword){
                window.location.href = './list.html?keyword='+ keyword;
            }else {
                ff.goHome();
            }
    }
};
header.init();