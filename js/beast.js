(function() {
    $(function() {
        var e, t, n, r, i, o, a, s, c, d, u, l, f, p, m, h, v, y, b, w, g;
        s = {};
        g = {};
        f = {};
        m = {};
        n = {};
        a = [ "#d6f7fe", "#312cc0", "#f9a205", "#d89e46", "#4c9d5b", "#fbdd1b", "#ff6dd1" ];
        u = new Howl({
            urls: [ "sound/CLICK.mp3", "sound/CLICK.ogg" ],
            volume: .5
        });
        i = new Howl({
            urls: [ "sound/EXIT.mp3", "sound/EXIT.ogg" ],
            volume: .7
        });
        l = function() {
            b();
            y();
            $("h1.colors").fitText(.7);
            setInterval(o, 250);
            return h();
        };
        b = function() {
            var e, t;
            t = document.createElement("script");
            t.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(t, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            return m = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "yqXayqIrAYE",
                events: {
                    onReady: p
                },
                playerVars: {
                    modestbranding: true,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
        };
        p = function(e) {
            return v();
        };
        y = function() {
            $("nav").bind("mouseenter", function() {
                return $(this).transition({
                    left: 0
                }, 200);
            });
            $("a").bind("click", function() {
                return i.play();
            });
            $("a").bind("mouseenter", function() {
                return u.play();
            });
            $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            });
            $("a.composer-title").bind("click", function(e) {
                e.preventDefault();
                return d();
            });
            $("a.exit").bind("click", function(e) {
                e.preventDefault();
                return $(".composer-data").fadeOut(100, function() {
                    var e;
                    e = $("#composers").offset().top;
                    return $("body,html").animate({
                        scrollTop: e
                    }, 50);
                });
            });
            return $("a.scroll").bind("click", function(e) {
                var t;
                t = $(this);
                return w(e, t);
            });
        };
        o = function() {
            var e;
            e = Math.floor(Math.random() * a.length);
            return $("h1.colors").css({
                color: a[e]
            });
        };
        d = function(e) {
            var t;
            t = Math.floor(Math.random() * a.length);
            return $(".composer-data").fadeIn();
        };
        r = function(e, t) {
            var n;
            n = t[e - 1].fields;
            m.cueVideoById(n.ytVideoId);
            $(".videos h1").empty().text(n.episodeTitle);
            $(".videos p.body").empty().text(n.videoDescription);
            return $(".videos p.body").slideDown();
        };
        e = function(e) {
            var t, n, r, i, o, a, s, c;
            c = [];
            for (a = 0, s = e.length; a < s; a++) {
                t = e[a];
                o = t.fields;
                i = o.composerName;
                r = o.image.fields.file.url;
                n = "<div class='artist'><a id='" + o.firstNameInLowercase + "'><img src='" + r + "'/><h1>" + o.composerName + "</h1><p>" + o.bio + "</p></div>";
                c.push($(".composer-data .data-container").append(n));
            }
            return c;
        };
        t = function(e) {
            var t, n, r, i, o, a, s, c, d, u;
            u = [];
            for (c = 0, d = e.length; c < d; c++) {
                i = e[c];
                a = i.fields;
                s = a.artistName;
                n = a.rbmaRadioEmbedCode;
                t = a.descriptions;
                r = a.artistImage.fields.file.url;
                o = "<div class='show'><img src='" + r + "'/>" + n + "<p>" + t + "</p></div>";
                u.push($(".radio").append(o));
            }
            return u;
        };
        v = function() {
            var e, t, n, r, i, o, a;
            a = $(window).width();
            o = a / 1.5;
            r = $("#player").attr("width");
            n = $("#player").attr("height");
            i = r / n;
            $("#player").attr("width", o);
            $("#player").attr("height", o / i);
            e = a - o;
            t = e / 2;
            return $("#player").css({
                marginLeft: t
            });
        };
        w = function(e, t, n) {
            var r, i;
            e.preventDefault();
            i = t.attr("href");
            r = $("" + i).position().top;
            if (t.hasClass("active")) {} else {
                $("nav ul a").each(function() {
                    return $(this).removeClass("active");
                });
                t.addClass("active");
                return $("body,html").animate({
                    scrollTop: r
                }, 300);
            }
        };
        h = function() {
            return $(".spinner").fadeOut();
        };
        c = function() {
            var n;
            n = contentful.createClient({
                accessToken: "38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0",
                space: "s9bc5ah7p1d5"
            });
            n.entries({
                content_type: "42CpXYSUms44OskS6wUU6I",
                include: 1
            }).done(function(t) {
                return e(t);
            });
            n.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1
            }).done(function(e) {
                return g = e;
            });
            n.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                t(e);
                return $("a.episode").bind("click", function() {
                    var e;
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    e = $(this).data("order");
                    return r(e, g);
                });
            });
            return l();
        };
        return c();
    });
}).call(this);