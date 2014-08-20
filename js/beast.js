(function() {
    $(function() {
        var e, t, i, r, n, a, o, d, s, l, c, u, p, f, v, h, m, y, w, g, b, C, T, I, E, S, V;
        d = {};
        V = {};
        v = {};
        r = {};
        f = {};
        y = {};
        w = {};
        n = {};
        p = 0;
        u = function() {
            I();
            $("h1.colors").fitText(.7);
            $(".video-nav ul a.episode li").first().addClass("active");
            $(".story-nav ul a.additional-episode li").first().addClass("active");
            setTimeout(T(l()), 500);
            return b();
        };
        g = function(e) {
            p = p + e;
            if (p === 4) {
                return u();
            }
        };
        T = function(e) {
            var t, i;
            t = {
                height: e
            };
            i = JSON.stringify(t);
            return window.parent.postMessage(i, "*");
        };
        l = function() {
            return $(document.body).height() + 300;
        };
        E = function() {
            var e, t;
            t = document.createElement("script");
            t.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(t, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            y = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "WYSupJ5r2zo",
                events: {
                    onReady: h
                },
                playerVars: {
                    modestbranding: true,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
            return w = new YT.Player("storyplayer", {
                height: "390",
                width: "640",
                videoId: "VsbG4pXrhr8",
                events: {
                    onReady: m
                },
                playerVars: {
                    modestbranding: true,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
        };
        h = function(e) {
            C("#player");
            return T(l());
        };
        m = function(e) {
            C("#storyplayer");
            return T(l());
        };
        I = function() {
            return window.addEventListener("resize", function() {
                C("#player");
                C("#storyplayer");
                return T(l());
            });
        };
        c = function(e) {
            $(".composer-data").fadeIn();
            $("body,html").animate({
                scrollTop: 0
            }, 50);
            return T(l());
        };
        o = function(e, t) {
            var i;
            i = t[e].fields;
            y.cueVideoById(i.ytVideoId);
            $(".videos h1").empty().text(i.episodeTitle);
            $(".videos p.body").empty().text(i.videoDescription);
            $(".videos p.body").slideDown();
            return T(l());
        };
        a = function(e, t) {
            var i;
            i = t[e].fields;
            w.cueVideoById(i.additionalYouTube);
            $(".stories h1").empty().text(i.additionalVideoTitle);
            return T(l());
        };
        i = function(e, t, i) {
            var r, n, a, o, d, s, l, c, u;
            if (i === "main") {
                c = [];
                for (n = o = 0, s = e.length; o < s; n = ++o) {
                    a = e[n];
                    r = a.fields.episodeNumber;
                    c.push(t.append("<a class='episode' href='#episode' data-order=" + n + "><li>" + r + "</li>"));
                }
                return c;
            } else if (i === "additional") {
                u = [];
                for (n = d = 0, l = e.length; d < l; n = ++d) {
                    a = e[n];
                    r = a.fields.additionalVideoTitle;
                    u.push(t.append("<a class='additional-episode' href='#additional-episode' data-order=" + n + "><li>" + r + "</li>"));
                }
                return u;
            }
        };
        e = function(e) {
            var t, i, r, n, a, o, d, s, l;
            l = [];
            for (r = d = 0, s = e.length; d < s; r = ++d) {
                t = e[r];
                o = t.fields;
                a = o.composerName;
                n = o.image.fields.file.url;
                i = "<div class='slide' data-order='" + r + "'><img src='" + n + "'/><h2>" + o.composerName + "</h2><p>" + o.bio + "</p></div>";
                $(".composers-wrap").append(i);
                l.push($(".slide").first().addClass("active"));
            }
            return l;
        };
        t = function(e) {
            var t, i, r, n, a, o, d, s, c, u;
            u = [];
            for (s = 0, c = e.length; s < c; s++) {
                n = e[s];
                o = n.fields;
                d = o.artistName;
                i = o.rbmaRadioEmbedCode;
                t = o.descriptions;
                r = o.artistImage.fields.file.url;
                a = "<div class='show'><img src='" + r + "'/>" + i + "<p>" + t + "</p></div>";
                $(".radio").append(a);
                u.push(T(l()));
            }
            return u;
        };
        C = function(e) {
            var t, i, r, n, a, o, d, s;
            a = $(e);
            s = $(window).width();
            d = s / 1.2;
            n = a.attr("width");
            r = a.attr("height");
            o = n / r;
            a.attr("width", d);
            a.attr("height", d / o);
            t = s - d;
            i = t / 2;
            a.css({
                marginLeft: i
            });
            return T(l());
        };
        S = function(e, t, i) {
            var r, n;
            e.preventDefault();
            n = t.attr("href");
            r = $("" + n).position().top;
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
        b = function() {
            $(".spinner").remove();
            return T(l());
        };
        s = function() {
            var n;
            n = contentful.createClient({
                accessToken: "38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0",
                space: "s9bc5ah7p1d5"
            });
            n.entries({
                content_type: "42CpXYSUms44OskS6wUU6I",
                include: 1
            }).done(function(t) {
                e(t);
                return g(1);
            });
            n.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                V = e;
                g(1);
                i(V, $(".video-nav ul"), "main");
                return $("a.episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return o(t, V);
                });
            });
            n.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                g(1);
                return t(e);
            });
            n.entries({
                content_type: "6fwxAcXrxK4yqyaMUiWwWY",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                g(1);
                r = e;
                i(r, $(".story-nav ul"), "additional");
                return $("a.additional-episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return a(t, r);
                });
            });
            return $.ajax("svg/svg.html", {
                type: "GET",
                dataType: "html",
                success: function(e, t, i) {
                    return $(".title svg path").attr("d", e);
                }
            });
        };
        $("a.arrow-right").click(function(e) {
            var t, i, r, n, a;
            e.preventDefault();
            t = $(".composers-wrap");
            a = t.find(".slide").length;
            r = $(".composers-wrap").find(".active");
            i = r.data("order");
            console.log("Current:" + i + ", Total:" + a);
            if (i <= a - 2) {
                n = $(".composers-wrap").find("[data-order=" + (i + 1) + "]");
                r.removeClass("active");
                return n.addClass("active");
            } else {
                alert("over");
                n = $(".composers-wrap").find("[data-order=0]");
                r.removeClass("active");
                return n.addClass("active");
            }
        });
        E();
        s();
        return window.addEventListener("load", T(l()));
    });
}).call(this);