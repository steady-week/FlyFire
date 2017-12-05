require('./nav-side.css');
// var ff = require('../../../PTools/ff');

// var navSide = {
//     option: {
//         name: "",
//         navList: [
//             {
//                 name: 'user-center',
//                 desc: '个人中心',
//                 href: './user-center.html'
//             },
//             {
//                 name: 'user-password-update',
//                 desc: '修改密码',
//                 href: './user-password-update.html'
//             },
//             {
//                 name: 'user-center',
//                 desc: '购物车(0)',
//                 href: './pass-update.html'
//             },
//             {
//                 name: 'user-center',
//                 desc: '关于飞火',
//                 href: './about.html'
//             }
//         ]
//     },
//     init: function (option) {
//         $.extend(this.option, option);
//         //合并选项，后一项会合并到前一项，并且改变前一项的那内容，想要不改需要在前一项的前面就一个空对象{}
//         this.renderNav();
//     },
//     //渲染导航菜单
//     renderNav: function () {
//         //计算active的数据
//         for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
//             if (this.option.navList[i].name === this.option.name) {
//                 this.option.navList[i].isActive = true;
//             }
//         }
//         var navHtml = ff.renderHtml(templateIndex, {
//             navList: this.option.navList
//         })
//     }
// };
//
//
// module.exports = navSide.init();