webpackJsonp([0],{

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

var ff = __webpack_require__(0);

var _user = {
    // 用户登录
    login: function (userInfo, resolve, reject) {
        ff.request({
            url: ff.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查用户名
    checkUsername: function (username, resolve, reject) {
        ff.request({
            url: ff.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 用户注册
    register: function (userInfo, resolve, reject) {
        ff.request({
            url: ff.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查登录状态
    checkLogin: function (resolve, reject) {
        ff.request({
            url: ff.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 获取用户密码提示问题
    getQuestion: function (username, resolve, reject) {
        ff.request({
            url: ff.getServerUrl('/user/forget_get_question.do'),
            data: {
                username: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查密码提示问题答案
    checkAnswer: function (userInfo, resolve, reject) {
        ff.request({
            url: ff.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 重置密码
    resetPassword: function (userInfo, resolve, reject) {
        ff.request({
            url: ff.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 获取用户信息
    getUserInfo: function (resolve, reject) {
        ff.request({
            url: ff.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 更新个人信息
    updateUserInfo: function (userInfo, resolve, reject) {
        ff.request({
            url: ff.getServerUrl('/user/update_information.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 登录状态下更新密码
    updatePassword: function (userInfo, resolve, reject) {
        ff.request({
            url: ff.getServerUrl('/user/reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 登出
    logout: function (resolve, reject) {
        ff.request({
            url: ff.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
};
module.exports = _user;

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(31);


/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(3);
__webpack_require__(2);
var ff = __webpack_require__(0);
var _user = __webpack_require__(1);


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

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[30]);