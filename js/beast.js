(function() {
    $(function() {
        var e, t, i, r, n, a, d, o, s, l, c, u, f, p, v, h, m, y, w, g, C, b, T, I, S;
        o = {};
        S = {};
        p = {};
        r = {};
        f = {};
        m = {};
        y = {};
        n = {};
        u = 0;
        c = function() {
            T();
            $(".video-nav ul a.episode li").first().addClass("active");
            $(".story-nav ul a.additional-episode li").first().addClass("active");
            setTimeout(b(l()), 500);
            return g();
        };
        w = function(e) {
            u = u + e;
            if (u === 4) {
                return c();
            }
        };
        b = function(e) {
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
        I = function() {
            var e, t;
            t = document.createElement("script");
            t.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(t, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            m = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "WYSupJ5r2zo",
                events: {
                    onReady: v
                },
                playerVars: {
                    modestbranding: true,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
            return y = new YT.Player("storyplayer", {
                height: "390",
                width: "640",
                videoId: "VsbG4pXrhr8",
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
        };
        v = function(e) {
            C("#player");
            return b(l());
        };
        h = function(e) {
            C("#storyplayer");
            return b(l());
        };
        T = function() {
            return window.addEventListener("resize", function() {
                C("#player");
                C("#storyplayer");
                return b(l());
            });
        };
        d = function(e, t) {
            var i;
            i = t[e].fields;
            m.cueVideoById(i.ytVideoId);
            $(".videos h1").empty().text(i.episodeTitle);
            $(".videos p.body").empty().text(i.videoDescription);
            $(".videos p.body").slideDown();
            return b(l());
        };
        a = function(e, t) {
            var i;
            i = t[e].fields;
            y.cueVideoById(i.additionalYouTube);
            $(".stories h1").empty().text(i.additionalVideoTitle);
            return b(l());
        };
        i = function(e, t, i) {
            var r, n, a, d, o, s, l, c, u;
            if (i === "main") {
                c = [];
                for (n = d = 0, s = e.length; d < s; n = ++d) {
                    a = e[n];
                    r = a.fields.episodeNumber;
                    c.push(t.append("<a class='episode' href='#episode' data-order=" + n + "><li>" + r + "</li>"));
                }
                return c;
            } else if (i === "additional") {
                u = [];
                for (n = o = 0, l = e.length; o < l; n = ++o) {
                    a = e[n];
                    r = a.fields.additionalVideoTitle;
                    u.push(t.append("<a class='additional-episode' href='#additional-episode' data-order=" + n + "><li>" + r + "</li>"));
                }
                return u;
            }
        };
        e = function(e) {
            var t, i, r, n, a, d, o, s, l;
            l = [];
            for (r = o = 0, s = e.length; o < s; r = ++o) {
                t = e[r];
                d = t.fields;
                a = d.composerName;
                n = d.image.fields.file.url;
                i = "<div class='slide' data-order='" + r + "'><div class='img-wrap'><img src='" + n + "'/></div><h2>" + d.composerName + "</h2><p>" + d.bio + "</p></div>";
                $(".composers-wrap").append(i);
                l.push($(".slide").first().addClass("active"));
            }
            return l;
        };
        t = function(e) {
            var t, i, r, n, a, d, o, s, c, u;
            u = [];
            for (s = 0, c = e.length; s < c; s++) {
                n = e[s];
                d = n.fields;
                o = d.artistName;
                i = d.rbmaRadioEmbedCode;
                t = d.descriptions;
                r = d.artistImage.fields.file.url;
                a = "<div class='show'><img src='" + r + "'/>" + i + "<p>" + t + "</p></div>";
                $(".radio").append(a);
                u.push(b(l()));
            }
            return u;
        };
        C = function(e) {
            var t, i, r, n, a, d, o, s;
            a = $(e);
            s = $(window).width();
            o = s / 1.2;
            n = a.attr("width");
            r = a.attr("height");
            d = n / r;
            a.attr("width", o);
            a.attr("height", o / d);
            t = s - o;
            i = t / 2;
            a.css({
                marginLeft: i
            });
            return b(l());
        };
        g = function() {
            $(".spinner").remove();
            return b(l());
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
                return w(1);
            });
            n.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                S = e;
                w(1);
                i(S, $(".video-nav ul"), "main");
                return $("a.episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return d(t, S);
                });
            });
            n.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                w(1);
                return t(e);
            });
            return n.entries({
                content_type: "6fwxAcXrxK4yqyaMUiWwWY",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                w(1);
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
        };
        $("a.arrow-right").click(function(e) {
            var t, i, r, n, a;
            e.preventDefault();
            t = $(".composers-wrap");
            a = t.find(".slide").length;
            r = t.find(".active");
            i = r.data("order");
            if (i <= a - 2) {
                n = t.find("[data-order=" + (i + 1) + "]");
                r.removeClass("active");
                n.addClass("active");
                return b(l());
            } else {
                n = t.find("[data-order=0]");
                r.removeClass("active");
                n.addClass("active");
                return b(l());
            }
        });
        $("a.arrow-left").click(function(e) {
            var t, i, r, n, a;
            e.preventDefault();
            t = $(".composers-wrap");
            a = t.find(".slide").length;
            r = t.find(".active");
            i = r.data("order");
            if (i >= 1) {
                n = t.find("[data-order=" + (i - 1) + "]");
                r.removeClass("active");
                n.addClass("active");
                return b(l());
            } else {
                n = t.find("[data-order=" + (a - 1) + "]");
                r.removeClass("active");
                n.addClass("active");
                return b(l());
            }
        });
        I();
        s();
        return window.addEventListener("load", b(l()));
    });
}).call(this);