(function() {
    $(function() {
        var e, t, n, r, o, i, a, s, u, c, l, d, f;
        r = {};
        u = {};
        i = new Howl({
            urls: [ "sound/CLICK.mp3", "sound/CLICK.ogg" ],
            volume: .5
        });
        n = new Howl({
            urls: [ "sound/EXIT.mp3", "sound/EXIT.ogg" ],
            volume: .7
        });
        o = function() {
            return $.ajax("data/data.json", {
                type: "GET",
                error: function(e, t, n) {
                    return console.log("AJAX Error: " + t);
                },
                success: function(e, t, n) {
                    r = e;
                    return a();
                }
            });
        };
        a = function() {
            d();
            l();
            return e();
        };
        d = function() {
            var e, t;
            t = document.createElement("script");
            t.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(t, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            return u = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "FuLTIi7CyOk",
                events: {
                    onReady: s
                },
                playerVars: {
                    modestbranding: true,
                    controls: 0,
                    showinfo: 0
                }
            });
        };
        s = function(e) {
            return c();
        };
        l = function() {
            console.log(r);
            $("nav").bind("mouseenter", function() {
                return $(this).transition({
                    left: 0
                }, 200);
            });
            $("a").bind("click", function() {
                return n.play();
            });
            $("a").bind("mouseenter", function() {
                return i.play();
            });
            $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            });
            $("a.episode").bind("click", function() {
                var e;
                e = $(this).data("order");
                return t(e);
            });
            $(".composer-title").bind("click", function() {
                return $(this).parent().find(".composer-nav").slideToggle();
            });
            $("a.composer").bind("click", function() {
                $(this).find(".composer-data").slideToggle();
                return $(this).find("li").toggleClass("active");
            });
            return $("a.scroll").bind("click", function(e) {
                var t;
                t = $(this);
                return f(e, t);
            });
        };
        t = function(e) {
            var t;
            t = r.videos;
            t = t[e];
            u.cueVideoById(t.id);
            $(".videos h2").empty().text(t.title);
            $(".videos p.body").empty().text(t.body);
            return $(".videos p.body").slideDown();
        };
        e = function(e, t) {
            var n;
            n = $(".composer-nav ul li");
            return n.each(function(e) {
                var t, n, o, i, a;
                a = $(this);
                i = r.composers[e + 1];
                o = i.name;
                a.text(o);
                n = "img/" + i.image;
                t = "<div class='composer-data'><img src='" + n + "'/><p>" + i.bio + "</p></div>";
                return a.append(t);
            });
        };
        c = function() {
            var e, t, n, r, o, i, a;
            a = $(window).width();
            i = a / 1.5;
            r = $("#player").attr("width");
            n = $("#player").attr("height");
            o = r / n;
            $("#player").attr("width", i);
            $("#player").attr("height", i / o);
            e = a - i;
            t = e / 2;
            return $("#player").css({
                marginLeft: t
            });
        };
        f = function(e, t) {
            var n, r;
            e.preventDefault();
            r = t.attr("href");
            n = $("" + r).offset().top;
            console.log(n);
            if (t.hasClass("active")) {} else {
                $("nav ul a").each(function() {
                    return $(this).removeClass("active");
                });
                t.addClass("active");
                return $(".content").animate({
                    scrollTop: n
                }, 300);
            }
        };
        return o();
    });
}).call(this);