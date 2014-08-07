(function() {
    $(function() {
        var t, e, n, r, o, i, a, c, s, u, d, f, l, p, h, m, v, y, b;
        i = {};
        b = {};
        d = {};
        e = {};
        c = new Howl({
            urls: [ "sound/CLICK.mp3", "sound/CLICK.ogg" ],
            volume: .5
        });
        r = new Howl({
            urls: [ "sound/EXIT.mp3", "sound/EXIT.ogg" ],
            volume: .7
        });
        a = function() {
            var e;
            e = contentful.createClient({
                accessToken: "38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0",
                space: "s9bc5ah7p1d5"
            });
            e.entries({
                content_type: "42CpXYSUms44OskS6wUU6I",
                include: 1
            }).done(function(e) {
                i = e;
                return t(i);
            });
            e.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1
            }).done(function(t) {
                b = t;
                return $("a.episode").bind("click", function() {
                    var t;
                    t = $(this).data("order");
                    return n(t, b);
                });
            });
            return s();
        };
        p = function(t) {
            return i = t;
        };
        s = function() {
            v();
            m();
            $("h1.colors").fitText(.7);
            setInterval(o, 250);
            return f();
        };
        o = function() {
            var t, e;
            t = [ "#d6f7fe", "#312cc0", "#f9a205", "#d89e46", "#4c9d5b", "#fbdd1b", "#ff6dd1" ];
            e = Math.floor(Math.random() * t.length);
            return $("h1.colors").css({
                color: t[e]
            });
        };
        f = function() {
            return $(".spinner").fadeOut();
        };
        v = function() {
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
                videoId: "yqXayqIrAYE",
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
        m = function() {
            $("nav").bind("mouseenter", function() {
                return $(this).transition({
                    left: 0
                }, 200);
            });
            $("a").bind("click", function() {
                return r.play();
            });
            $("a").bind("mouseenter", function() {
                return c.play();
            });
            $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            });
            $("a.composer").bind("click", function(t) {
                var e, n, r;
                t.preventDefault();
                e = $(this).attr("href");
                r = $(".composer-data").offset().top;
                n = $(".artist " + e).position().top;
                return $(".composer-data").transition({
                    left: 0
                }, 300, function() {
                    return $(".data-container").animate({
                        scrollTop: n
                    }, 200);
                });
            });
            $("a.exit").bind("click", function(t) {
                t.preventDefault();
                return $(".composer-data").transition({
                    left: "100%"
                }, 200);
            });
            return $("a.scroll").bind("click", function(t) {
                var e;
                e = $(this);
                return y(t, e);
            });
        };
        h = function() {
            var t, e;
            e = Math.floor(Math.random() * -1e3);
            t = $(".hero").position().top * e;
            if (t >= $(".score").find("h2 span").text()) {
                return $(".score").find("h2 span").empty().text(t);
            }
        };
        n = function(t, e) {
            var n;
            console.log(e);
            n = e[t - 1].fields;
            d.cueVideoById(n.ytVideoId);
            $(".videos h1").empty().text(n.ytVideoId);
            $(".videos p.body").empty().text(n.videoDescription);
            return $(".videos p.body").slideDown();
        };
        t = function(t) {
            var e;
            console.log(i);
            e = $(".composer-nav ul li");
            return e.each(function(t) {
                var e, n, r, o, a, c;
                c = $(this);
                a = i[t].fields;
                o = a.composerName;
                c.text(o);
                c.parent().attr("href", "#" + a.firstNameInLowercase);
                r = a.image.sys.id;
                n = "//images.contentful.com/s9bc5ah7p1d5/54GVDo7wj6ciwaeCMGoGKI/e8137bb3537549c4114200d062dc921e/akio-dobashi.jpg";
                e = "<a id='" + a.firstNameInLowercase + "'><img src='" + n + "'/><h1>" + a.composerName + "</h1><p>" + a.bio + "</p>";
                return $(".composer-data .artist:nth-child(" + (t + 1) + ")").append(e);
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
        y = function(t, e) {
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