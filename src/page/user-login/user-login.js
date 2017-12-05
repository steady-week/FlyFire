require('./user-login.css');
require('../common/nav-simple/nav-simple');
var ff = require('../../PTools/ff');
var _user   = require('../../service/user-service');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page逻辑部分
var page = {
    init: function () {
        this.bindEvent()
    },
    bindEvent: function () {
        var that = this;
        // 登录按钮的点击
        $('#btn-submit').click(function () {
            that.submit()
        });
        //如果按下回车同样提交
        $('.user-content').keyup(function (e) {
            // keyCode === 13 监听回车键
            if (e.keyCode === 13) {
                that.submit()
            }
        })
    },
    // 提交
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        },
         // 表单验证结果
         validateResult = this.formValidate(formData);
        // 验证成功
        if (validateResult.status) {
            _user.login(formData, function(res){
                window.location.href = ff.getUrlParam('redirect') || '../../view/floor.html';
            },function(errMsg){
                formError.show(errMsg);
            })
        }
        //验证失败
        else {
         //错误提示
         formError.show(validateResult.msg);
        }
    },
    // 表单的字段验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!ff.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!ff.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
$(function () {
    page.init()
})();