(function() {
    $(function() {
        var e, t, n, i, r, a, o, d, s, u, l, c, f, p, h, v, m, y, g, b, w, C, I, T, k, E, Y, x, S, V, D, N;
        c = {};
        N = {};
        b = {};
        r = {};
        g = {};
        I = {};
        T = {};
        a = {};
        l = [ "#d6f7fe", "#312cc0", "#f9a205", "#d89e46", "#4c9d5b", "#fbdd1b", "#ff6dd1" ];
        v = new Howl({
            urls: [ "sound/CLICK.mp3", "sound/CLICK.ogg" ],
            volume: .5
        });
        s = new Howl({
            urls: [ "sound/EXIT.mp3", "sound/EXIT.ogg" ],
            volume: .7
        });
        y = 0;
        m = function() {
            V();
            S();
            $("h1.colors").fitText(.7);
            setInterval(u, 250);
            $(".video-nav ul a.episode li").first().addClass("active");
            $(".story-nav ul a.additional-episode li").first().addClass("active");
            setTimeout(x(p()), 500);
            return E();
        };
        k = function(e) {
            y = y + e;
            if (y === 5) {
                return m();
            }
        };
        x = function(e) {
            var t, n;
            t = {
                height: e
            };
            n = JSON.stringify(t);
            return window.parent.postMessage(n, "*");
        };
        p = function() {
            return $(document.body).height() + 300;
        };
        V = function() {
            var e, t;
            t = document.createElement("script");
            t.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(t, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            I = new YT.Player("player", {
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
                    onReady: C
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
            Y("#player");
            return x(p());
        };
        C = function(e) {
            Y("#storyplayer");
            return x(p());
        };
        S = function() {
            $("nav").bind("mouseenter", function() {
                return $(this).transition({
                    left: 0
                }, 200);
            });
            $("a").bind("click", function() {
                return s.play();
            });
            $("a").bind("mouseenter", function() {
                return v.play();
            });
            $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            });
            $("a.scroll").bind("click", function(e) {
                var t;
                t = $(this);
                return D(e, t);
            });
            return window.addEventListener("resize", function() {
                Y("#player");
                Y("#storyplayer");
                return x(p());
            });
        };
        u = function() {
            var e;
            e = Math.floor(Math.random() * l.length);
            return $("h1.colors").css({
                color: l[e]
            });
        };
        h = function(e) {
            $(".composer-data").fadeIn();
            $("body,html").animate({
                scrollTop: 0
            }, 50);
            return x(p());
        };
        d = function(e, t) {
            var n;
            n = t[e].fields;
            I.cueVideoById(n.ytVideoId);
            $(".videos h1").empty().text(n.episodeTitle);
            $(".videos p.body").empty().text(n.videoDescription);
            $(".videos p.body").slideDown();
            return x(p());
        };
        o = function(e, t) {
            var n;
            n = t[e].fields;
            T.cueVideoById(n.additionalYouTube);
            $(".stories h1").empty().text(n.additionalVideoTitle);
            $(".stories p.body").empty().text(n.description);
            $(".stories p.body").slideDown();
            return x(p());
        };
        i = function(e, t, n) {
            var i, r, a, o, d, s, u, l, c;
            if (n === "main") {
                l = [];
                for (r = o = 0, s = e.length; o < s; r = ++o) {
                    a = e[r];
                    i = a.fields.episodeNumber;
                    l.push(t.append("<a class='episode' href='#episode' data-order=" + r + "><li>" + i + "</li>"));
                }
                return l;
            } else if (n === "additional") {
                c = [];
                for (r = d = 0, u = e.length; d < u; r = ++d) {
                    a = e[r];
                    i = a.fields.additionalVideoTitle;
                    c.push(t.append("<a class='additional-episode' href='#additional-episode' data-order=" + r + "><li>" + i + "</li>"));
                }
                return c;
            }
        };
        e = function(e) {
            var t, n, i, r, a, o, d, s;
            s = [];
            for (o = 0, d = e.length; o < d; o++) {
                t = e[o];
                a = t.fields;
                r = a.composerName;
                i = a.image.fields.file.url;
                n = "<div class='artist'><img src='" + i + "'/><h1>" + a.composerName + "</h1><p>" + a.bio + "</p></div>";
                s.push($(".composer-data .data-container").append(n));
            }
            return s;
        };
        t = function(e) {
            var t, n, i, r, a, o, d, s, u, l, c;
            c = [];
            for (r = u = 0, l = e.length; u < l; r = ++u) {
                i = e[r];
                t = i.fields;
                s = t.magazineFeatureTitle;
                n = t.magazineDescription;
                o = t.rbmaLink;
                a = t.magazineImage.fields.file.url;
                d = "<div class='magFeature'><a href='" + o + "' target='blank'><img src='" + a + "'/></a><h3>" + s + "</h3><p>" + n + "</p></div>";
                if (r % 2 === 0) {
                    c.push($(".feature-wrapper .col1").append(d));
                } else if (r & 2 >= 0 || !r) {
                    c.push($(".feature-wrapper .col2").append(d));
                } else {
                    c.push(void 0);
                }
            }
            return c;
        };
        n = function(e) {
            var t, n, i, r, a, o, d, s, u, l;
            l = [];
            for (s = 0, u = e.length; s < u; s++) {
                r = e[s];
                o = r.fields;
                d = o.artistName;
                n = o.rbmaRadioEmbedCode;
                t = o.descriptions;
                i = o.artistImage.fields.file.url;
                a = "<div class='show'><img src='" + i + "'/>" + n + "<p>" + t + "</p></div>";
                $(".radio").append(a);
                l.push(x(p()));
            }
            return l;
        };
        Y = function(e) {
            var t, n, i, r, a, o, d, s;
            a = $(e);
            s = $(window).width();
            d = s / 1.5;
            r = a.attr("width");
            i = a.attr("height");
            o = r / i;
            a.attr("width", d);
            a.attr("height", d / o);
            t = s - d;
            n = t / 2;
            a.css({
                marginLeft: n
            });
            return x(p());
        };
        D = function(e, t, n) {
            var i, r;
            e.preventDefault();
            r = t.attr("href");
            i = $("" + r).position().top;
            if (t.hasClass("active")) {} else {
                $("nav ul a").each(function() {
                    return $(this).removeClass("active");
                });
                t.addClass("active");
                return $("body,html").animate({
                    scrollTop: i
                }, 300);
            }
        };
        E = function() {
            $(".spinner").remove();
            return x(p());
        };
        f = function() {
            var a;
            a = contentful.createClient({
                accessToken: "38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0",
                space: "s9bc5ah7p1d5"
            });
            a.entries({
                content_type: "42CpXYSUms44OskS6wUU6I",
                include: 1
            }).done(function(t) {
                e(t);
                return k(1);
            });
            a.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                N = e;
                k(1);
                i(N, $(".video-nav ul"), "main");
                return $("a.episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return d(t, N);
                });
            });
            a.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                k(1);
                return n(e);
            });
            a.entries({
                content_type: "6fwxAcXrxK4yqyaMUiWwWY",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                k(1);
                r = e;
                i(r, $(".story-nav ul"), "additional");
                return $("a.additional-episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return o(t, r);
                });
            });
            return a.entries({
                content_type: "H38r2ErKi2cGueYeumikO",
                include: 1
            }).done(function(e) {
                k(1);
                g = e;
                return t(g);
            });
        };
        f();
        return window.addEventListener("load", x(p()));
    });
}).call(this);