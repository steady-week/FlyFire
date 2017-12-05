require('../../PTools/unslider/unslider.min');
require('./banner.css');
(function bannerLoad() {
    if ($(' #banner').load) {
        $('#loading').hide();
    } else {
        $('#loading').show();
        $('#banner').hide()
    }
})();

$(function () {
    var slider = $('.banner').unslider({
        dots: true              //导航按钮
    });
    $('.banner-con .banner .banner-arrow').click(function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        slider.data('unslider')[forward]();
    });
});


