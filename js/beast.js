(function() {
    $(function() {
        var t, e, n, r, i, o, a, u, c;
        e = {};
        o = {};
        n = function() {
            return $.ajax("data/data.json", {
                type: "GET",
                error: function(t, e, n) {
                    return console.log("AJAX Error: " + e);
                },
                success: function(t, n, i) {
                    e = t;
                    return r();
                }
            });
        };
        r = function() {
            c();
            return u();
        };
        c = function() {
            var t, e;
            e = document.createElement("script");
            e.src = "https://www.youtube.com/iframe_api";
            t = document.getElementsByTagName("script")[0];
            return t.parentNode.insertBefore(e, t);
        };
        window.onYouTubeIframeAPIReady = function() {
            return o = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "FuLTIi7CyOk",
                events: {
                    onReady: i
                },
                playerVars: {
                    modestbranding: true,
                    controls: 0,
                    showinfo: 0
                }
            });
        };
        i = function(t) {
            return a();
        };
        u = function() {
            console.log(e);
            $("nav").bind("mouseenter", function() {
                return $(this).transition({
                    left: 0
                }, 200);
            });
            $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            });
            return $("a.episode").bind("click", function() {
                var e;
                e = $(this).data("order");
                return t(e);
            });
        };
        t = function(t) {
            var n;
            n = e.videos;
            n = n[t];
            o.cueVideoById(n.id);
            $(".videos h2").empty().text(n.title);
            return $(".videos p.body").empty().text(n.body);
        };
        a = function() {
            var t, e, n, r, i, o, a;
            a = $(window).width();
            o = a / 1.5;
            r = $("#player").attr("width");
            n = $("#player").attr("height");
            i = r / n;
            $("#player").attr("width", o);
            $("#player").attr("height", o / i);
            t = a - o;
            e = t / 2;
            return $("#player").css({
                marginLeft: e
            });
        };
        return n();
    });
}).call(this);