webpackJsonp([2],{

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);


/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(36);


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37);
__webpack_require__(2);
__webpack_require__(1);
var ff = __webpack_require__(0);

var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
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
        // 注册按钮的点击
        $('#save').click(function () {
            that.submit()
        });
        //如果按下回车同样提交
        $('.panel').keyup(function (e) {
            // keyCode === 13 监听回车键
            if (e.keyCode === 13) {
                that.submit()
            }
        })
    },
    // 提交
    submit: function () {
        var formData = {
                username                   : $.trim($('#username').val()),
                phone                       : $.trim($('#phone').val()),
                email                       : $.trim($('#email').val()),
                question                    : $.trim($('#question').val()),
                answer                      : $.trim($('#answer').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        // 验证成功
        if (validateResult.status) {
            _user.register(formData, function (res) {
                window.location.href = './result.html?type=register'
            }, function (errMsg) {
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
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        // 验证用户名
        if (!ff.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        // 验证手机号
        if (!ff.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱
        if (!ff.validate(formData.email, 'email')) {
            result.msg = '邮箱不正确';
            return result;
        }
        // 密码提示问题
        if (!ff.validate(formData.question, 'require')) {
            result.msg = '提示问题不能为空';
            return result;
        }
        // 密码提示问题答案
        if (!ff.validate(formData.answer, 'require')) {
            result.msg = '答案不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function () {
    page.init()
})();

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[35]);