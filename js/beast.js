(function() {
    $(function() {
        var e, n, t, r, o, a, s, d, c, l, u, f, p, h, m, v, y, g, b, w, I, C, T, x, E, k, M, Y;
        l = {};
        Y = {};
        y = {};
        r = {};
        w = {};
        I = {};
        o = {};
        c = [ "#d6f7fe", "#312cc0", "#f9a205", "#d89e46", "#4c9d5b", "#fbdd1b", "#ff6dd1" ];
        h = new Howl({
            urls: [ "sound/CLICK.mp3", "sound/CLICK.ogg" ],
            volume: .5
        });
        s = new Howl({
            urls: [ "sound/EXIT.mp3", "sound/EXIT.ogg" ],
            volume: .7
        });
        v = 0;
        m = function() {
            k();
            E();
            $("h1.colors").fitText(.7);
            setInterval(d, 250);
            return T();
        };
        C = function(e) {
            v = v + e;
            if (v === 4) {
                return m();
            }
        };
        k = function() {
            var e, n;
            n = document.createElement("script");
            n.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(n, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            w = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "yqXayqIrAYE",
                events: {
                    onReady: g
                },
                playerVars: {
                    modestbranding: true,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
            return I = new YT.Player("storyplayer", {
                height: "390",
                width: "640",
                videoId: "yqXayqIrAYE",
                events: {
                    onReady: b
                },
                playerVars: {
                    modestbranding: true,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
        };
        g = function(e) {
            return x("#player");
        };
        b = function(e) {
            return x("#storyplayer");
        };
        u = function() {
            var e, n, t, r;
            r = [];
            for (n = 0, t = iconCount.length; n < t; n++) {
                e = iconCount[n];
                ctx.drawImage(fallingIcons[i].image, fallingIcons[i].x, fallingIcons[i].y);
                fallingIcons[i].y += fallingIcons[i].speed;
                if (fallingIcons[i].y > 450) {
                    fallingIcons[i].y = -25;
                    r.push(fallingIcons[i].x = Math.random() * 600);
                } else {
                    r.push(void 0);
                }
            }
            return r;
        };
        E = function() {
            $("nav").bind("mouseenter", function() {
                return $(this).transition({
                    left: 0
                }, 200);
            });
            $("a").bind("click", function() {
                return s.play();
            });
            $("a").bind("mouseenter", function() {
                return h.play();
            });
            $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            });
            $("a.composer-title").bind("click", function(e) {
                e.preventDefault();
                return p();
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
                var n;
                n = $(this);
                return M(e, n);
            });
        };
        d = function() {
            var e;
            e = Math.floor(Math.random() * c.length);
            return $("h1.colors").css({
                color: c[e]
            });
        };
        p = function(e) {
            var n;
            n = Math.floor(Math.random() * c.length);
            return $(".composer-data").fadeIn();
        };
        a = function(e, n) {
            var t;
            t = n[e].fields;
            w.cueVideoById(t.ytVideoId);
            $(".videos h1").empty().text(t.episodeTitle);
            $(".videos p.body").empty().text(t.videoDescription);
            return $(".videos p.body").slideDown();
        };
        t = function(e, n, t) {
            var i, r, o, a, s, d, c, l, u;
            if (t === "main") {
                l = [];
                for (r = a = 0, d = e.length; a < d; r = ++a) {
                    o = e[r];
                    i = o.fields.episodeNumber;
                    l.push(n.append("<a class='episode' href='#episode' data-order=" + r + "><li>" + i + "</li>"));
                }
                return l;
            } else if (t === "additional") {
                u = [];
                for (r = s = 0, c = e.length; s < c; r = ++s) {
                    o = e[r];
                    i = o.fields.additionalVideoTitle;
                    u.push(n.append("<a class='additional-episode' href='#additional-episode' data-order=" + r + "><li>" + i + "</li>"));
                }
                return u;
            }
        };
        e = function(e) {
            var n, t, i, r, o, a, s, d;
            d = [];
            for (a = 0, s = e.length; a < s; a++) {
                n = e[a];
                o = n.fields;
                r = o.composerName;
                i = o.image.fields.file.url;
                t = "<div class='artist'><a id='" + o.firstNameInLowercase + "'><img src='" + i + "'/><h1>" + o.composerName + "</h1><p>" + o.bio + "</p></div>";
                d.push($(".composer-data .data-container").append(t));
            }
            return d;
        };
        n = function(e) {
            var n, t, i, r, o, a, s, d, c, l;
            l = [];
            for (d = 0, c = e.length; d < c; d++) {
                r = e[d];
                a = r.fields;
                s = a.artistName;
                t = a.rbmaRadioEmbedCode;
                n = a.descriptions;
                i = a.artistImage.fields.file.url;
                o = "<div class='show'><img src='" + i + "'/>" + t + "<p>" + n + "</p></div>";
                l.push($(".radio").append(o));
            }
            return l;
        };
        x = function(e) {
            var n, t, i, r, o, a, s, d;
            o = $(e);
            d = $(window).width();
            s = d / 1.5;
            r = o.attr("width");
            i = o.attr("height");
            a = r / i;
            o.attr("width", s);
            o.attr("height", s / a);
            n = d - s;
            t = n / 2;
            return o.css({
                marginLeft: t
            });
        };
        M = function(e, n, t) {
            var i, r;
            e.preventDefault();
            r = n.attr("href");
            i = $("" + r).position().top;
            if (n.hasClass("active")) {} else {
                $("nav ul a").each(function() {
                    return $(this).removeClass("active");
                });
                n.addClass("active");
                return $("body,html").animate({
                    scrollTop: i
                }, 300);
            }
        };
        T = function() {
            return $(".spinner").remove();
        };
        f = function() {
            var i;
            i = contentful.createClient({
                accessToken: "38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0",
                space: "s9bc5ah7p1d5"
            });
            i.entries({
                content_type: "42CpXYSUms44OskS6wUU6I",
                include: 1
            }).done(function(n) {
                e(n);
                return C(1);
            });
            i.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                Y = e;
                C(1);
                t(Y, $(".video-nav ul"), "main");
                return $("a.episode").bind("click", function(e) {
                    var n;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    n = $(this).data("order");
                    return a(n, Y);
                });
            });
            i.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                C(1);
                return n(e);
            });
            return i.entries({
                content_type: "6fwxAcXrxK4yqyaMUiWwWY",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                C(1);
                r = e;
                return t(r, $(".story-nav ul"), "additional");
            });
        };
        return f();
    });
}).call(this);