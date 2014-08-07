(function($) {
    $.fn.fitText = function(t, n) {
        var i = t || 1, e = $.extend({
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY
        }, n);
        return this.each(function() {
            var t = $(this);
            var n = function() {
                t.css("font-size", Math.max(Math.min(t.width() / (i * 10), parseFloat(e.maxFontSize)), parseFloat(e.minFontSize)));
            };
            n();
            $(window).on("resize.fittext orientationchange.fittext", n);
        });
    };
})(jQuery);