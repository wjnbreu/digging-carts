(function() {
    $(function() {
        var e, t, i, n, r, a, d, s, o, l, c, u, f, p, v, h, m, w, y, g, C, b, T, k, D, I;
        s = {};
        I = {};
        v = {};
        n = {};
        p = {};
        w = {};
        y = {};
        r = {};
        f = 0;
        o = new Showdown.converter();
        u = function() {
            k();
            D();
            $(".video-nav ul a.episode li").first().addClass("active");
            $(".story-nav ul a.additional-episode li").first().addClass("active");
            setTimeout(T(c()), 500);
            return C();
        };
        g = function(e) {
            f = f + e;
            if (f === 4) {
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
        c = function() {
            return $(document.body).height() + 300;
        };
        D = function() {
            var e, t;
            t = document.createElement("script");
            t.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(t, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            w = new YT.Player("player", {
                height: "39",
                width: "64",
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
            return y = new YT.Player("storyplayer", {
                height: "39",
                width: "64",
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
            b("#player");
            return T(c());
        };
        m = function(e) {
            b("#storyplayer");
            return T(c());
        };
        k = function() {
            return window.addEventListener("resize", function() {
                b("#player");
                b("#storyplayer");
                return T(c());
            });
        };
        d = function(e, t, i) {
            var n;
            n = i[t].fields;
            if (e.find("li").hasClass("unreleased")) {
                w.cueVideoById("T8k44ryj5DQ");
                w.playVideo();
                return $(".videos h1").empty().text(n.episodeTitle);
            } else {
                w.cueVideoById(n.ytVideoId);
                $(".videos h1").empty().text(n.episodeTitle);
                return T(c());
            }
        };
        a = function(e, t) {
            var i;
            i = t[e].fields;
            y.cueVideoById(i.additionalYouTube);
            $(".stories h1").empty().text(i.additionalVideoTitle);
            return T(c());
        };
        i = function(e, t, i) {
            var n, r, a, d, s, o, l, c, u, f, p;
            if (i === "main") {
                f = [];
                for (d = o = 0, c = e.length; o < c; d = ++o) {
                    s = e[d];
                    r = s.fields.episodeNumber;
                    n = new Date();
                    a = new Date(s.fields.datetimeOfLaunch);
                    if (moment() < a) {
                        t.append("<a class='episode' href='#episode' data-order=" + d + "><li class='unreleased' data-release='" + a + "'>" + r + "</li>");
                    } else {
                        t.append("<a class='episode' href='#episode' data-order=" + d + "><li class='released'>" + r + "</li>");
                    }
                    f.push(t.find("li").each(function() {
                        var e, t, i, n;
                        n = $(this);
                        if (n.hasClass("unreleased")) {
                            t = n.text();
                            i = n.data("release");
                            e = new Date(i);
                            n.bind("mouseenter", function() {
                                return n.empty().text(moment(i).format("ddd, MMM Do"));
                            });
                            return n.bind("mouseleave", function() {});
                        }
                    }));
                }
                return f;
            } else if (i === "additional") {
                p = [];
                for (d = l = 0, u = e.length; l < u; d = ++l) {
                    s = e[d];
                    r = s.fields.additionalVideoTitle;
                    p.push(t.append("<a class='additional-episode' href='#additional-episode' data-order=" + d + "><li>" + r + "</li>"));
                }
                return p;
            }
        };
        e = function(e) {
            var t, i, n, r, a, d, s, l, c, u;
            u = [];
            for (n = l = 0, c = e.length; l < c; n = ++l) {
                t = e[n];
                d = t.fields;
                a = d.composerName;
                r = d.image.fields.file.url;
                s = o.makeHtml(d.bio);
                i = "<div class='slide' data-order='" + n + "'><div class='img-wrap'><img src='" + r + "'/></div><h2>" + d.composerName + "</h2><p>" + s + "</p></div>";
                $(".composers-wrap").append(i);
                u.push($(".slide").first().addClass("active"));
            }
            return u;
        };
        t = function(e) {
            var t, i, n, r, a, d, s, o, l, u;
            u = [];
            for (o = 0, l = e.length; o < l; o++) {
                r = e[o];
                d = r.fields;
                s = d.artistName;
                i = d.rbmaRadioEmbedCode;
                t = d.descriptions;
                n = d.artistImage.fields.file.url;
                a = "<div class='show'><img src='" + n + "'/>" + i + "<p>" + t + "</p></div>";
                $(".radio").append(a);
                u.push(T(c()));
            }
            return u;
        };
        b = function(e) {
            var t, i, n, r, a, d, s, o;
            a = $(e);
            o = $(window).width();
            s = o / 1.3;
            r = a.attr("width");
            n = a.attr("height");
            d = r / n;
            a.attr("width", s);
            a.attr("height", s / d);
            t = o - s;
            i = t / 2;
            a.css({
                marginLeft: i,
                display: "block"
            });
            return T(c());
        };
        C = function() {
            $(".spinner").remove();
            return T(c());
        };
        l = function() {
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
                return g(1);
            });
            r.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                I = e;
                g(1);
                i(I, $(".video-nav ul"), "main");
                return $("a.episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return d($(this), t, I);
                });
            });
            r.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                g(1);
                return t(e);
            });
            return r.entries({
                content_type: "6fwxAcXrxK4yqyaMUiWwWY",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                g(1);
                n = e;
                i(n, $(".story-nav ul"), "additional");
                return $("a.additional-episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return a(t, n);
                });
            });
        };
        $("a.arrow-right").click(function(e) {
            var t, i, n, r, a;
            e.preventDefault();
            t = $(".composers-wrap");
            a = t.find(".slide").length;
            n = t.find(".active");
            i = n.data("order");
            if (i <= a - 2) {
                r = t.find("[data-order=" + (i + 1) + "]");
                n.removeClass("active");
                r.addClass("active");
                return T(c());
            } else {
                r = t.find("[data-order=0]");
                n.removeClass("active");
                r.addClass("active");
                return T(c());
            }
        });
        $("a.arrow-left").click(function(e) {
            var t, i, n, r, a;
            e.preventDefault();
            t = $(".composers-wrap");
            a = t.find(".slide").length;
            n = t.find(".active");
            i = n.data("order");
            if (i >= 1) {
                r = t.find("[data-order=" + (i - 1) + "]");
                n.removeClass("active");
                r.addClass("active");
                return T(c());
            } else {
                r = t.find("[data-order=" + (a - 1) + "]");
                n.removeClass("active");
                r.addClass("active");
                return T(c());
            }
        });
        $("a.pulldown").click(function(e) {
            e.preventDefault();
            return $(this).parent().find("ul").slideToggle(200, function() {
                return T(c());
            });
        });
        l();
        return window.addEventListener("load", T(c()));
    });
}).call(this);