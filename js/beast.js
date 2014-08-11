(function() {
    $(function() {
        var e, n, t, r, o, a, d, s, l, c, u, f, p, h, v, m, y, g, b, w, I, C, T, x, k, M, D, E, N, S, V;
        u = {};
        V = {};
        b = {};
        r = {};
        C = {};
        T = {};
        o = {};
        c = [ "#d6f7fe", "#312cc0", "#f9a205", "#d89e46", "#4c9d5b", "#fbdd1b", "#ff6dd1" ];
        m = new Howl({
            urls: [ "sound/CLICK.mp3", "sound/CLICK.ogg" ],
            volume: .5
        });
        s = new Howl({
            urls: [ "sound/EXIT.mp3", "sound/EXIT.ogg" ],
            volume: .7
        });
        g = 0;
        y = function() {
            N();
            E();
            $("h1.colors").fitText(.7);
            setInterval(l, 250);
            $(".video-nav ul a.episode li").first().addClass("active");
            $(".story-nav ul a.additional-episode li").first().addClass("active");
            return D(h());
        };
        x = function(e) {
            g = g + e;
            if (g === 4) {
                return y();
            }
        };
        D = function(e) {
            var n, t;
            n = {
                height: e
            };
            t = JSON.stringify(n);
            return window.parent.postMessage(t, "*");
        };
        h = function() {
            return $(document.body).height();
        };
        N = function() {
            var e, n;
            n = document.createElement("script");
            n.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(n, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            C = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "WYSupJ5r2zo",
                events: {
                    onReady: w
                },
                playerVars: {
                    modestbranding: true,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
            return T = new YT.Player("storyplayer", {
                height: "390",
                width: "640",
                videoId: "VsbG4pXrhr8",
                events: {
                    onReady: I
                },
                playerVars: {
                    modestbranding: true,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
        };
        w = function(e) {
            return M("#player");
        };
        I = function(e) {
            return M("#storyplayer");
        };
        f = function() {
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
                return m.play();
            });
            $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            });
            $("a.composer-title").bind("click", function(e) {
                e.preventDefault();
                return v();
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
            $("a.scroll").bind("click", function(e) {
                var n;
                n = $(this);
                return S(e, n);
            });
            $(window).bind("resize", function(e) {
                M("#player");
                return M("#storyplayer");
            });
            return window.addEventListener("resize", function() {
                return D(h());
            });
        };
        l = function() {
            var e;
            e = Math.floor(Math.random() * c.length);
            return $("h1.colors").css({
                color: c[e]
            });
        };
        v = function(e) {
            var n;
            n = Math.floor(Math.random() * c.length);
            return $(".composer-data").fadeIn();
        };
        d = function(e, n) {
            var t;
            t = n[e].fields;
            C.cueVideoById(t.ytVideoId);
            $(".videos h1").empty().text(t.episodeTitle);
            $(".videos p.body").empty().text(t.videoDescription);
            return $(".videos p.body").slideDown();
        };
        a = function(e, n) {
            var t;
            console.log(n);
            t = n[e].fields;
            T.cueVideoById(t.additionalYouTube);
            $(".stories h1").empty().text(t.additionalVideoTitle);
            $(".stories p.body").empty().text(t.description);
            return $(".stories p.body").slideDown();
        };
        t = function(e, n, t) {
            var i, r, o, a, d, s, l, c, u;
            if (t === "main") {
                c = [];
                for (r = a = 0, s = e.length; a < s; r = ++a) {
                    o = e[r];
                    i = o.fields.episodeNumber;
                    c.push(n.append("<a class='episode' href='#episode' data-order=" + r + "><li>" + i + "</li>"));
                }
                return c;
            } else if (t === "additional") {
                u = [];
                for (r = d = 0, l = e.length; d < l; r = ++d) {
                    o = e[r];
                    i = o.fields.additionalVideoTitle;
                    u.push(n.append("<a class='additional-episode' href='#additional-episode' data-order=" + r + "><li>" + i + "</li>"));
                }
                return u;
            }
        };
        e = function(e) {
            var n, t, i, r, o, a, d, s;
            s = [];
            for (a = 0, d = e.length; a < d; a++) {
                n = e[a];
                o = n.fields;
                r = o.composerName;
                i = o.image.fields.file.url;
                t = "<div class='artist'><a id='" + o.firstNameInLowercase + "'><img src='" + i + "'/><h1>" + o.composerName + "</h1><p>" + o.bio + "</p></div>";
                s.push($(".composer-data .data-container").append(t));
            }
            return s;
        };
        n = function(e) {
            var n, t, i, r, o, a, d, s, l, c;
            c = [];
            for (s = 0, l = e.length; s < l; s++) {
                r = e[s];
                a = r.fields;
                d = a.artistName;
                t = a.rbmaRadioEmbedCode;
                n = a.descriptions;
                i = a.artistImage.fields.file.url;
                o = "<div class='show'><img src='" + i + "'/>" + t + "<p>" + n + "</p></div>";
                c.push($(".radio").append(o));
            }
            return c;
        };
        M = function(e) {
            var n, t, i, r, o, a, d, s;
            o = $(e);
            s = $(window).width();
            d = s / 1.5;
            r = o.attr("width");
            i = o.attr("height");
            a = r / i;
            o.attr("width", d);
            o.attr("height", d / a);
            n = s - d;
            t = n / 2;
            return o.css({
                marginLeft: t
            });
        };
        S = function(e, n, t) {
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
        k = function() {
            return $(".spinner").remove();
        };
        p = function() {
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
                return x(1);
            });
            i.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                V = e;
                x(1);
                t(V, $(".video-nav ul"), "main");
                return $("a.episode").bind("click", function(e) {
                    var n;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    n = $(this).data("order");
                    return d(n, V);
                });
            });
            i.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                x(1);
                return n(e);
            });
            return i.entries({
                content_type: "6fwxAcXrxK4yqyaMUiWwWY",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                x(1);
                r = e;
                t(r, $(".story-nav ul"), "additional");
                return $("a.additional-episode").bind("click", function(e) {
                    var n;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    n = $(this).data("order");
                    return a(n, r);
                });
            });
        };
        return p();
    });
}).call(this);