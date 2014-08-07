(function() {
    $(function() {
        var t, e, n, r, o, a, i, c, s, u, d, l, f, p, m, h, v, y, b;
        i = {};
        b = {};
        f = {};
        e = {};
        a = [ "#d6f7fe", "#312cc0", "#f9a205", "#d89e46", "#4c9d5b", "#fbdd1b", "#ff6dd1" ];
        u = new Howl({
            urls: [ "sound/CLICK.mp3", "sound/CLICK.ogg" ],
            volume: .5
        });
        r = new Howl({
            urls: [ "sound/EXIT.mp3", "sound/EXIT.ogg" ],
            volume: .7
        });
        d = function() {
            v();
            h();
            $("h1.colors").fitText(.7);
            setInterval(o, 250);
            return p();
        };
        v = function() {
            var t, e;
            e = document.createElement("script");
            e.src = "https://www.youtube.com/iframe_api";
            t = document.getElementsByTagName("script")[0];
            return t.parentNode.insertBefore(e, t);
        };
        window.onYouTubeIframeAPIReady = function() {
            return f = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "yqXayqIrAYE",
                events: {
                    onReady: l
                },
                playerVars: {
                    modestbranding: 1,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
        };
        l = function(t) {
            return m();
        };
        h = function() {
            $("nav").bind("mouseenter", function() {
                return $(this).transition({
                    left: 0
                }, 200);
            });
            $("a").bind("click", function() {
                return r.play();
            });
            $("a").bind("mouseenter", function() {
                return u.play();
            });
            $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            });
            $("a.composer").bind("click", function(t) {
                t.preventDefault();
                return s($(this));
            });
            $("a.exit").bind("click", function(t) {
                t.preventDefault();
                return $(".composer-data").transition({
                    left: "100%"
                }, 200, function() {
                    var t;
                    t = $("#composers").position().top;
                    return $("body,html").animate({
                        scrollTop: t
                    }, 50);
                });
            });
            return $("a.scroll").bind("click", function(t) {
                var e;
                e = $(this);
                return y(t, e);
            });
        };
        o = function() {
            var t;
            t = Math.floor(Math.random() * a.length);
            return $("h1.colors").css({
                color: a[t]
            });
        };
        s = function(t) {
            var e, n, r, o;
            e = Math.floor(Math.random() * a.length);
            $(".composer-data").css({
                backgroundColor: a[e]
            });
            n = t.attr("href");
            o = $(".composer-data").offset().top;
            r = $(".artist " + n).position().top;
            return $(".composer-data").transition({
                left: 0
            }, 300, function() {
                return $(".data-container").delay(100).animate({
                    scrollTop: o
                }, 200);
            });
        };
        n = function(t, e) {
            var n;
            console.log(e);
            n = e[t - 1].fields;
            f.cueVideoById(n.ytVideoId);
            $(".videos h1").empty().text(n.episodeTitle);
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
                n = a.image.fields.file.url;
                e = "<a id='" + a.firstNameInLowercase + "'><img src='" + n + "'/><h1>" + a.composerName + "</h1><p>" + a.bio + "</p>";
                return $(".composer-data .artist:nth-child(" + (t + 1) + ")").append(e);
            });
        };
        m = function() {
            var t, e, n, r, o, a, i;
            i = $(window).width();
            a = i / 1.5;
            r = $("#player").attr("width");
            n = $("#player").attr("height");
            o = r / n;
            $("#player").attr("width", a);
            $("#player").attr("height", a / o);
            t = i - a;
            e = t / 2;
            return $("#player").css({
                marginLeft: e
            });
        };
        y = function(t, e, n) {
            var r, o;
            t.preventDefault();
            o = e.attr("href");
            r = $("" + o).position().top;
            if (e.hasClass("active")) {} else {
                $("nav ul a").each(function() {
                    return $(this).removeClass("active");
                });
                e.addClass("active");
                return $("body,html").animate({
                    scrollTop: r
                }, 300);
            }
        };
        p = function() {
            return $(".spinner").fadeOut();
        };
        c = function() {
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
            return d();
        };
        return c();
    });
}).call(this);