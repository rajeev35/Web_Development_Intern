$(document).ready(function(){
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        var target = this.hash;
        var menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;  
        });
    });
});