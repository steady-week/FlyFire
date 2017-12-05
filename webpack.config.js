const path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};
var config = {
    entry: {
        'common': ['./src/page/common/layout.js'],
        'user-login': ['./src/page/user-login/user-login.js'],
        'user-register': ['./src/page/user-register/user-register.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/user-pass-reset.js'],
        'user-password-update': ['./src/page/user-password-update/user-password-update.js'],
        'user-center': ['./src/page/user-center/user-center.js'],
        'user-center-update': ['./src/page/user-center-update/user-center-update.js'],
        'result': ['./src/page/result/result.js'],
        'index': ['./src/page/floor/floor.js'],
        'banner': ['./src/page/banner/banner.js'],
        'list': ['./src/page/list/list.js'],

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/dist'
    },
    plugins: [
        //独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/layout.js'
        }),

        //单独打包CSS文件
        new ExtractTextPlugin("css/[name].css"),

        //HTML模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '忘记密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-password-update', '修改密码'))
    ],

    //CSS文件处理
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(gif|png|jpg|svg|psd)\??.*$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 200,
                        name: './image/[name].[ext]'
                    }
                }]
            }
        ]

    }
};

module.exports = config;