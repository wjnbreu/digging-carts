(function() {
    $(function() {
        var e, t, n, i, r, o, a, d, s, u, l, c, f, p, h, v, m, y, w, g, b, C, T, I, E, x, S, V, Y, k, N;
        l = {};
        N = {};
        w = {};
        i = {};
        y = {};
        C = {};
        T = {};
        r = {};
        u = [ "#5f41d5", "#ca0ab8", "#d5d041", "#d54141" ];
        h = new Howl({
            urls: [ "sound/CLICK.mp3", "sound/CLICK.ogg" ],
            volume: .5
        });
        d = new Howl({
            urls: [ "sound/EXIT.mp3", "sound/EXIT.ogg" ],
            volume: .7
        });
        m = 0;
        v = function() {
            V();
            $("h1.colors").fitText(.7);
            setInterval(s, 500);
            $(".video-nav ul a.episode li").first().addClass("active");
            $(".story-nav ul a.additional-episode li").first().addClass("active");
            setTimeout(S(f()), 500);
            return E();
        };
        I = function(e) {
            m = m + e;
            if (m === 4) {
                return v();
            }
        };
        S = function(e) {
            var t, n;
            t = {
                height: e
            };
            n = JSON.stringify(t);
            return window.parent.postMessage(n, "*");
        };
        f = function() {
            return $(document.body).height() + 300;
        };
        Y = function() {
            var e, t;
            t = document.createElement("script");
            t.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(t, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            C = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "WYSupJ5r2zo",
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
            return T = new YT.Player("storyplayer", {
                height: "390",
                width: "640",
                videoId: "VsbG4pXrhr8",
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
            x("#player");
            return S(f());
        };
        b = function(e) {
            x("#storyplayer");
            return S(f());
        };
        V = function() {
            $("nav").bind("mouseenter", function() {
                return $(this).transition({
                    left: 0
                }, 200);
            });
            $("a").bind("click", function() {
                return d.play();
            });
            $("a").bind("mouseenter", function() {
                return h.play();
            });
            $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            });
            $("a.scroll").bind("click", function(e) {
                var t;
                t = $(this);
                return k(e, t);
            });
            return window.addEventListener("resize", function() {
                x("#player");
                x("#storyplayer");
                return S(f());
            });
        };
        s = function() {
            var e;
            e = Math.floor(Math.random() * u.length);
            return $("h1.colors").css({
                color: u[e]
            });
        };
        p = function(e) {
            $(".composer-data").fadeIn();
            $("body,html").animate({
                scrollTop: 0
            }, 50);
            return S(f());
        };
        a = function(e, t) {
            var n;
            n = t[e].fields;
            C.cueVideoById(n.ytVideoId);
            $(".videos h1").empty().text(n.episodeTitle);
            $(".videos p.body").empty().text(n.videoDescription);
            $(".videos p.body").slideDown();
            return S(f());
        };
        o = function(e, t) {
            var n;
            n = t[e].fields;
            T.cueVideoById(n.additionalYouTube);
            $(".stories h1").empty().text(n.additionalVideoTitle);
            return S(f());
        };
        n = function(e, t, n) {
            var i, r, o, a, d, s, u, l, c;
            if (n === "main") {
                l = [];
                for (r = a = 0, s = e.length; a < s; r = ++a) {
                    o = e[r];
                    i = o.fields.episodeNumber;
                    l.push(t.append("<a class='episode' href='#episode' data-order=" + r + "><li>" + i + "</li>"));
                }
                return l;
            } else if (n === "additional") {
                c = [];
                for (r = d = 0, u = e.length; d < u; r = ++d) {
                    o = e[r];
                    i = o.fields.additionalVideoTitle;
                    c.push(t.append("<a class='additional-episode' href='#additional-episode' data-order=" + r + "><li>" + i + "</li>"));
                }
                return c;
            }
        };
        e = function(e) {
            var t, n, i, r, o, a, d, s;
            s = [];
            for (a = 0, d = e.length; a < d; a++) {
                t = e[a];
                o = t.fields;
                r = o.composerName;
                i = o.image.fields.file.url;
                n = "<div class='artist'><img src='" + i + "'/><h1>" + o.composerName + "</h1><p>" + o.bio + "</p></div>";
                s.push($(".data-container").append(n));
            }
            return s;
        };
        t = function(e) {
            var t, n, i, r, o, a, d, s, u, l;
            l = [];
            for (s = 0, u = e.length; s < u; s++) {
                r = e[s];
                a = r.fields;
                d = a.artistName;
                n = a.rbmaRadioEmbedCode;
                t = a.descriptions;
                i = a.artistImage.fields.file.url;
                o = "<div class='show'><img src='" + i + "'/>" + n + "<p>" + t + "</p></div>";
                $(".radio").append(o);
                l.push(S(f()));
            }
            return l;
        };
        x = function(e) {
            var t, n, i, r, o, a, d, s;
            o = $(e);
            s = $(window).width();
            d = s / 1.5;
            r = o.attr("width");
            i = o.attr("height");
            a = r / i;
            o.attr("width", d);
            o.attr("height", d / a);
            t = s - d;
            n = t / 2;
            o.css({
                marginLeft: n
            });
            return S(f());
        };
        k = function(e, t, n) {
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
            return S(f());
        };
        c = function() {
            var r;
            r = contentful.createClient({
                accessToken: "38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0",
                space: "s9bc5ah7p1d5"
            });
            r.entries({
                content_type: "42CpXYSUms44OskS6wUU6I",
                include: 1
            }).done(function(t) {
                e(t);
                return I(1);
            });
            r.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                N = e;
                I(1);
                n(N, $(".video-nav ul"), "main");
                return $("a.episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return a(t, N);
                });
            });
            r.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                I(1);
                return t(e);
            });
            r.entries({
                content_type: "6fwxAcXrxK4yqyaMUiWwWY",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                I(1);
                i = e;
                n(i, $(".story-nav ul"), "additional");
                return $("a.additional-episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return o(t, i);
                });
            });
            return $.ajax("svg/svg.html", {
                type: "GET",
                dataType: "html",
                success: function(e, t, n) {
                    return $(".title svg path").attr("d", e);
                }
            });
        };
        Y();
        c();
        return window.addEventListener("load", S(f()));
    });
}).call(this);