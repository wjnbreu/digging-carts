(function() {
    $(function() {
        var t, e, n, r, o, i, a, s, c, u, d, l, f, p, h, m;
        i = {};
        d = {};
        e = {};
        s = new Howl({
            urls: [ "sound/CLICK.mp3", "sound/CLICK.ogg" ],
            volume: .5
        });
        r = new Howl({
            urls: [ "sound/EXIT.mp3", "sound/EXIT.ogg" ],
            volume: .7
        });
        a = function() {
            return $.ajax("data/data.json", {
                type: "GET",
                error: function(t, e, n) {
                    return console.log("AJAX Error: " + e);
                },
                success: function(t, e, n) {
                    i = t;
                    return c();
                }
            });
        };
        c = function() {
            h();
            p();
            t();
            $("h1.colors").fitText(.7);
            return setInterval(o, 250);
        };
        o = function() {
            var t, e;
            t = [ "#d6f7fe", "#312cc0", "#f9a205", "#d89e46", "#4c9d5b", "#fbdd1b", "#ff6dd1" ];
            e = Math.floor(Math.random() * t.length);
            return $("h1.colors").css({
                color: t[e]
            });
        };
        h = function() {
            var t, e;
            e = document.createElement("script");
            e.src = "https://www.youtube.com/iframe_api";
            t = document.getElementsByTagName("script")[0];
            return t.parentNode.insertBefore(e, t);
        };
        window.onYouTubeIframeAPIReady = function() {
            return d = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "FuLTIi7CyOk",
                events: {
                    onReady: u
                },
                playerVars: {
                    modestbranding: 1,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
        };
        u = function(t) {
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
                return s.play();
            });
            $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            });
            $("a.episode").bind("click", function() {
                var t;
                t = $(this).data("order");
                return n(t);
            });
            $(".composer-title").bind("click", function() {
                return $(this).parent().find(".composer-nav").slideToggle();
            });
            $("a.composer").bind("click", function(t) {
                t.preventDefault();
                return $(".composer-data").transition({
                    left: 0
                }, 200);
            });
            return $("a.scroll").bind("click", function(t) {
                var e;
                e = $(this);
                return m(t, e);
            });
        };
        f = function() {
            var t, e;
            e = Math.floor(Math.random() * -1e3);
            t = $(".hero").position().top * e;
            if (t >= $(".score").find("h2 span").text()) {
                return $(".score").find("h2 span").empty().text(t);
            }
        };
        n = function(t) {
            var e;
            e = i.videos;
            e = e[t];
            d.cueVideoById(e.id);
            $(".videos h1").empty().text(e.title);
            $(".videos p.body").empty().text(e.body);
            return $(".videos p.body").slideDown();
        };
        t = function(t, e) {
            var n;
            n = $(".composer-nav ul li");
            return n.each(function(t) {
                var e, n, r, o, a;
                a = $(this);
                o = i.composers[t + 1];
                r = o.name;
                a.text(r);
                n = "img/" + o.image;
                e = "<div class='composer-data'><img src='" + n + "'/><p>" + o.bio + "</p></div>";
                return a.append(e);
            });
        };
        l = function() {
            var t, e, n, r, o, i, a;
            a = $(window).width();
            i = a / 1.5;
            r = $("#player").attr("width");
            n = $("#player").attr("height");
            o = r / n;
            $("#player").attr("width", i);
            $("#player").attr("height", i / o);
            t = a - i;
            e = t / 2;
            return $("#player").css({
                marginLeft: e
            });
        };
        m = function(t, e) {
            var n, r;
            t.preventDefault();
            r = e.attr("href");
            n = $("" + r).position().top;
            if (e.hasClass("active")) {} else {
                $("nav ul a").each(function() {
                    return $(this).removeClass("active");
                });
                e.addClass("active");
                return $("body,html").animate({
                    scrollTop: n
                }, 300);
            }
        };
        return a();
    });
}).call(this);