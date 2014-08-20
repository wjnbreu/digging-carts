(function() {
    $(function() {
        var e, t, n, i, r, a, o, d, s, u, l, c, f, p, h, v, m, y, w, g, b, C, T, I, E, x, S, V, Y;
        s = {};
        Y = {};
        m = {};
        i = {};
        v = {};
        g = {};
        b = {};
        r = {};
        f = new Howl({
            urls: [ "sound/CLICK.mp3", "sound/CLICK.ogg" ],
            volume: .5
        });
        d = new Howl({
            urls: [ "sound/EXIT.mp3", "sound/EXIT.ogg" ],
            volume: .7
        });
        h = 0;
        p = function() {
            x();
            $("h1.colors").fitText(.7);
            $(".video-nav ul a.episode li").first().addClass("active");
            $(".story-nav ul a.additional-episode li").first().addClass("active");
            setTimeout(E(l()), 500);
            return T();
        };
        C = function(e) {
            h = h + e;
            if (h === 4) {
                return p();
            }
        };
        E = function(e) {
            var t, n;
            t = {
                height: e
            };
            n = JSON.stringify(t);
            return window.parent.postMessage(n, "*");
        };
        l = function() {
            return $(document.body).height() + 300;
        };
        S = function() {
            var e, t;
            t = document.createElement("script");
            t.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(t, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            g = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "WYSupJ5r2zo",
                events: {
                    onReady: y
                },
                playerVars: {
                    modestbranding: true,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
            return b = new YT.Player("storyplayer", {
                height: "390",
                width: "640",
                videoId: "VsbG4pXrhr8",
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
        };
        y = function(e) {
            I("#player");
            return E(l());
        };
        w = function(e) {
            I("#storyplayer");
            return E(l());
        };
        x = function() {
            $("nav").bind("mouseenter", function() {
                return $(this).transition({
                    left: 0
                }, 200);
            });
            $("a").bind("click", function() {
                return d.play();
            });
            $("a").bind("mouseenter", function() {
                return f.play();
            });
            $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            });
            $("a.scroll").bind("click", function(e) {
                var t;
                t = $(this);
                return V(e, t);
            });
            return window.addEventListener("resize", function() {
                I("#player");
                I("#storyplayer");
                return E(l());
            });
        };
        c = function(e) {
            $(".composer-data").fadeIn();
            $("body,html").animate({
                scrollTop: 0
            }, 50);
            return E(l());
        };
        o = function(e, t) {
            var n;
            n = t[e].fields;
            g.cueVideoById(n.ytVideoId);
            $(".videos h1").empty().text(n.episodeTitle);
            $(".videos p.body").empty().text(n.videoDescription);
            $(".videos p.body").slideDown();
            return E(l());
        };
        a = function(e, t) {
            var n;
            n = t[e].fields;
            b.cueVideoById(n.additionalYouTube);
            $(".stories h1").empty().text(n.additionalVideoTitle);
            return E(l());
        };
        n = function(e, t, n) {
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
                s.push($(".data-container").append(n));
            }
            return s;
        };
        t = function(e) {
            var t, n, i, r, a, o, d, s, u, c;
            c = [];
            for (s = 0, u = e.length; s < u; s++) {
                r = e[s];
                o = r.fields;
                d = o.artistName;
                n = o.rbmaRadioEmbedCode;
                t = o.descriptions;
                i = o.artistImage.fields.file.url;
                a = "<div class='show'><img src='" + i + "'/>" + n + "<p>" + t + "</p></div>";
                $(".radio").append(a);
                c.push(E(l()));
            }
            return c;
        };
        I = function(e) {
            var t, n, i, r, a, o, d, s;
            a = $(e);
            s = $(window).width();
            d = s / 1.2;
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
            return E(l());
        };
        V = function(e, t, n) {
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
        T = function() {
            $(".spinner").remove();
            return E(l());
        };
        u = function() {
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
                return C(1);
            });
            r.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                Y = e;
                C(1);
                n(Y, $(".video-nav ul"), "main");
                return $("a.episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return o(t, Y);
                });
            });
            r.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                C(1);
                return t(e);
            });
            r.entries({
                content_type: "6fwxAcXrxK4yqyaMUiWwWY",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                C(1);
                i = e;
                n(i, $(".story-nav ul"), "additional");
                return $("a.additional-episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return a(t, i);
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
        S();
        u();
        return window.addEventListener("load", E(l()));
    });
}).call(this);