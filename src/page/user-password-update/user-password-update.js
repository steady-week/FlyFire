require('./user-password-update.css');
require('../common/header/header');
require('../common/nav/nav');
var ff = require('../../PTools/ff');
var _user = require('../../service/user-service.js');


var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};
// page 逻辑部分
var page = {
    init: function () {
        // this.userRegister();
        this.bindEvent();
    },
    bindEvent: function () {
        var that = this;
        // 点击提交按钮后的动作
        $('#btn-submit').click(function () {
            that.btnSubmit();
        });
    },
    btnSubmit: function () {
        var userInfo = {
                password: $.trim($('#password').val()),
                passwordNew: $.trim($('#password-new').val()),
                passwordConfirm: $.trim($('#password-confirm').val())
            },
            // 验证结果
            validateResult = this.validateForm(userInfo);
        // 验证成功
        if (validateResult.status) {
            // 更改用户密码
            _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                },
                function (res, msg) {
                    ff.successTips(msg);
                },
                function (errMsg) {
                    ff.errorTips(errMsg);
                });
        }
        else {
            formError.show(validateResult.msg);
        }
    },
    userRegister:function () {
        window.location.href="../view/user-register.html"
    },
    // 验证字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        // 验证原密码是否为空
        if (!ff.validate(formData.password, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证新密码长度
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '密码长度不得少于6位';
            return result;
        }
        // 验证两次输入的密码是否一致
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function () {
    page.init();
});