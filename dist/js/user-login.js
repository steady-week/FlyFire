webpackJsonp([4],{

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

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(22);


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(5);
var ff = __webpack_require__(0);
var _user   = __webpack_require__(1);

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

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[21]);