(function() {
    $(function() {
        var e, t, n, r, o, i, a, s, c, u, l, d, p, f, m;
        o = {};
        u = {};
        t = {};
        a = new Howl({
            urls: [ "sound/CLICK.mp3", "sound/CLICK.ogg" ],
            volume: .5
        });
        r = new Howl({
            urls: [ "sound/EXIT.mp3", "sound/EXIT.ogg" ],
            volume: .7
        });
        i = function() {
            return $.ajax("data/data.json", {
                type: "GET",
                error: function(e, t, n) {
                    return console.log("AJAX Error: " + t);
                },
                success: function(e, t, n) {
                    o = e;
                    return s();
                }
            });
        };
        s = function() {
            f();
            p();
            return e();
        };
        f = function() {
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
                    onReady: c
                },
                playerVars: {
                    modestbranding: true,
                    controls: 0,
                    showinfo: 0
                }
            });
        };
        c = function(e) {
            return l();
        };
        p = function() {
            $("nav").bind("mouseenter", function() {
                return $(this).transition({
                    left: 0
                }, 200);
            });
            $("a").bind("click", function() {
                return r.play();
            });
            $("a").bind("mouseenter", function() {
                return a.play();
            });
            $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            });
            $("a.episode").bind("click", function() {
                var e;
                e = $(this).data("order");
                return n(e);
            });
            $(".composer-title").bind("click", function() {
                return $(this).parent().find(".composer-nav").slideToggle();
            });
            $("a.composer").bind("click", function(e) {
                var t;
                e.preventDefault();
                if ($(this).find("li").hasClass("active")) {
                    $(".composer-data").slideUp();
                    return $(this).find("li").removeClass("active");
                } else {
                    $(".composer-data").each(function() {
                        $(this).slideUp();
                        return $("a.composer").find("li").removeClass("active");
                    });
                    $(this).find(".composer-data").slideToggle();
                    $(this).find("li").toggleClass("active");
                    t = $("#composers").offset().top + 100;
                    return $("body,html").animate({
                        scrollTop: t
                    }, 500);
                }
            });
            $("a.scroll").bind("click", function(e) {
                var t;
                t = $(this);
                return m(e, t);
            });
            return $(document).bind("scroll", function(e) {
                return console.log($("#rapper").offset().top);
            });
        };
        d = function() {
            var e, t;
            t = Math.floor(Math.random() * -1e3);
            e = $(".hero").position().top * t;
            if (e >= $(".score").find("h2 span").text()) {
                return $(".score").find("h2 span").empty().text(e);
            }
        };
        n = function(e) {
            var t;
            t = o.videos;
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
                var t, n, r, i, a;
                a = $(this);
                i = o.composers[e + 1];
                r = i.name;
                a.text(r);
                n = "img/" + i.image;
                t = "<div class='composer-data'><img src='" + n + "'/><p>" + i.bio + "</p></div>";
                return a.append(t);
            });
        };
        l = function() {
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
        m = function(e, t) {
            var n, r;
            e.preventDefault();
            r = t.attr("href");
            n = $("" + r).position().top;
            if (t.hasClass("active")) {} else {
                $("nav ul a").each(function() {
                    return $(this).removeClass("active");
                });
                t.addClass("active");
                return $("body,html").animate({
                    scrollTop: n
                }, 300);
            }
        };
        return i();
    });
}).call(this);