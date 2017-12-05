var conf = {
    serverHost: ''
};
var Hogan = require('hogan.js');
var ff = {
    request: function (param) {
        var that = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                //请求成功
                if (res.status === 1) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                //需要强制登录
                else if (res.status === 10) {
                    that.doLogin();
                }
                //请求数据出现错误
                else if (res.status === 1) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            //请求失败出现异常错误
            error: function (e) {
                //出现错误调出statusText状态内容
                typeof param.error === 'function' && param.error(e.statusText);

            }
        });
    },
    //获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    //获取URL参数
    getUrlParam: function (name) {
        //正则表达式匹配键值对
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');

        //从？问号开始的URL查询的部分
        //subster开始指定字符数从第一个字符开始，包含一个字符
        //match返回符合索引处的值
        //search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串
        var result = window.location.search.substr(1).match(reg);

        //返回数值，第二项，排除了?这个字符串，decodeURIComponent进行解码
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染HTML
    renderHtml :function(htmlTemplate,data){
        //传入模板和数据
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
            return result;
    },
    //成功提示
    successTips : function (msg) {
        alert(msg||'操作成功');
    },
    //错误提示
    errorTips : function (msg) {
        alert(msg||'貌似失误了');
    },
    //字段的验证，支持是否为空，手机号验证，邮箱验证
    validate :function (value, type) {
        //验证是否为有效字符
        var value = $.trim(value);
        if('require'===type){
            return value;
        }
        //手机号验证
        if ('phone'===type){
            //以数字一开头的十位数字
            return /^1\d{10}$/.test(value);
        }
        //邮箱的验证
        if ('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录
    doLogin: function () {
        //跳转到登录界面，登录成功后返回之前页面，将网站进行转码，encodeURIComponent避免造成乱码的错误
        window.location.href = './user-login/user-login.html?redirect' + encodeURIComponent(window.location);
    },
    //跳转主页
    goHome :function () {
        window.location.href = './view.index.html';
    }
};

module.exports = ff;