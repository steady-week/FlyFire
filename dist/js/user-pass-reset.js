webpackJsonp([3],{

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

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(28);


/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29);
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
    data :{
        username: '',
        question: '',
        answer : '',
        token : ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent()
    },
    onLoad : function () {
      this.loadStepUsername()
    },
    bindEvent: function () {
        var that = this;
        // 输入用户名下一步密码的点击
        $('#step-username').click(function () {
            var username = $.trim($('#username').val());
            // 用户名存在
            if (username){
                _user.getQuestion(username,function (res) {
                    that.data.username = username;
                    that.data.question = res;
                    that.loadStepQuestion();
                },function (errMsg) {
                    formError.show(errMsg);
                });
                // 用户名不存在
            }else {
                formError.show('请输入用户名')
            }
        });
        // 输入密码是提问题的点击
        $('#step-question').click(function () {
            // 检查密码提示问题的答案
            var answer = $.trim($('#username').val());
            // 密码答案存在
            if (answer){
                // 检查密码提示问世问题的答案
                _user.checkAnswer({
                        username:that.data.username,
                        question :that.data.question,
                        answer :answer
                    }
                ,function (res) {
                    that.data.answer = answer;
                    that.data.token = res;
                    that.loadStepPassword();
                },function (errMsg) {
                    formError.show(errMsg);
                });
                // 用户名不存在
            }else {
                formError.show('密码提示问题的答案')
            }
        });
        // 输入新密码的点击
        $('#step-password').click(function () {
            // 检查密码提示问题的答案
            var password = $.trim($('#password').val());
            // 密码答案存在
            if (password && password.length>=6){
                // 检查密码提示问世问题的答案
                _user.resetPassword({
                        username        :that.data.username,
                        passwordNew     :password,
                        forgetToken     :that.data.token
                    }
                    ,function (res) {
                        window.location.href='./user-register.html?type=pass-reset';
                    },
                    function (errMsg) {
                        formError.show(errMsg);
                    });
                // 密码为空
            }else {
                formError.show('请输入至少6位新密码')
            }
        });
    },
    //加载输入用户名的那一步
    loadStepUsername : function () {
        $('.step-username').show();
    },
    //加载输入密码提示问题那一步
    loadStepQuestion : function () {
        formError.hide();
        $('.step-username').hide();
        $('.step-question').show().find('.question').text(rhis.data.question);
    },
    //加载输入密码提示答案那一步
    loadStepPassword : function () {
        formError.hide();
        $('.step-question').hide();
        $('.step-password').show();
    }
};
$(function () {
    page.init()
})();





/***/ }),

/***/ 29:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[27]);