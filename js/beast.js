(function() {
    $(function() {
        var e, t, i, r, n, a, d, s, o, l, c, u, f, p, v, h, m, y, w, g, C, b, T, k, D, I;
        s = {};
        I = {};
        v = {};
        r = {};
        p = {};
        y = {};
        w = {};
        n = {};
        f = 0;
        o = new Showdown.converter();
        u = function() {
            k();
            D();
            $(".video-nav ul a.episode li").first().addClass("active");
            $(".story-nav ul a.additional-episode li").first().addClass("active");
            C();
            return T(c());
        };
        g = function(e) {
            f = f + e;
            if (f === 4) {
                u();
                return f = 0;
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
            return $(document.body).height() + 100;
        };
        D = function() {
            var e, t;
            t = document.createElement("script");
            t.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(t, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            y = new YT.Player("player", {
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
            return w = new YT.Player("storyplayer", {
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
            return b("#player");
        };
        m = function(e) {
            return b("#storyplayer");
        };
        k = function() {
            window.addEventListener("resize", function() {
                b("#player");
                return b("#storyplayer");
            });
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
                    return n.addClass("active");
                } else {
                    n = t.find("[data-order=0]");
                    r.removeClass("active");
                    return n.addClass("active");
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
                    return n.addClass("active");
                } else {
                    n = t.find("[data-order=" + (a - 1) + "]");
                    r.removeClass("active");
                    return n.addClass("active");
                }
            });
            return $("a.pulldown").click(function(e) {
                e.preventDefault();
                return $(this).parent().find("ul").slideToggle(200, function() {
                    return T(c());
                });
            });
        };
        d = function(e, t, i) {
            var r;
            r = i[t].fields;
            if (e.find("li").hasClass("unreleased")) {
                y.cueVideoById("T8k44ryj5DQ");
                y.playVideo();
                return $(".videos h1").empty().text(r.episodeTitle);
            } else {
                y.cueVideoById(r.ytVideoId);
                return $(".videos h1").empty().text(r.episodeTitle);
            }
        };
        a = function(e, t) {
            var i;
            i = t[e].fields;
            w.cueVideoById(i.additionalYouTube);
            $(".stories h1").empty().text(i.additionalVideoTitle);
            $(".stories p.body").empty().text(i.description);
            return $(".stories p.body").slideDown();
        };
        i = function(e, t, i) {
            var r, n, a, d, s, o, l, c, u, f, p;
            if (i === "main") {
                f = [];
                for (d = o = 0, c = e.length; o < c; d = ++o) {
                    s = e[d];
                    n = s.fields.episodeNumber;
                    r = new Date();
                    a = new Date(s.fields.datetimeOfLaunch);
                    if (moment() < a) {
                        t.append("<a class='episode' href='#episode' data-order=" + d + "><li class='unreleased' data-release='" + a + "'>" + n + "</li>");
                    } else {
                        t.append("<a class='episode' href='#episode' data-order=" + d + "><li class='released'>" + n + "</li>");
                    }
                    f.push(t.find("li").each(function() {
                        var e, t, i, r;
                        r = $(this);
                        if (r.hasClass("unreleased")) {
                            t = r.text();
                            i = r.data("release");
                            e = new Date(i);
                            r.bind("mouseenter", function() {
                                return r.empty().text(moment(i).format("ddd, MMM Do"));
                            });
                            return r.bind("mouseleave", function() {});
                        }
                    }));
                }
                return f;
            } else if (i === "additional") {
                p = [];
                for (d = l = 0, u = e.length; l < u; d = ++l) {
                    s = e[d];
                    n = s.fields.additionalVideoTitle;
                    p.push(t.append("<a class='additional-episode' href='#additional-episode' data-order=" + d + "><li>" + n + "</li>"));
                }
                return p;
            }
        };
        e = function(e) {
            var t, i, r, n, a, d, s, l, c, u;
            u = [];
            for (r = l = 0, c = e.length; l < c; r = ++l) {
                t = e[r];
                d = t.fields;
                a = d.composerName;
                n = d.image.fields.file.url;
                s = o.makeHtml(d.bio);
                i = "<div class='slide' data-order='" + r + "'><div class='img-wrap'><a class='arrow-left' href></a><a class='arrow-right' href></a><img src='" + n + "'/></div><h2>" + d.composerName + "</h2><p>" + s + "</p></div>";
                $(".composers-wrap").append(i);
                u.push($(".slide").first().addClass("active"));
            }
            return u;
        };
        t = function(e) {
            var t, i, r, n, a, d, s, o, l, c;
            c = [];
            for (o = 0, l = e.length; o < l; o++) {
                n = e[o];
                d = n.fields;
                s = d.artistName;
                i = d.rbmaRadioEmbedCode;
                t = d.descriptions;
                r = d.artistImage.fields.file.url;
                a = "<div class='show'><img src='" + r + "'/>" + i + "<p>" + t + "</p></div>";
                c.push($(".radio").append(a));
            }
            return c;
        };
        b = function(e) {
            var t, i, r, n, a, d, s, o;
            a = $(e);
            o = $(window).width();
            s = o / 1.3;
            n = a.attr("width");
            r = a.attr("height");
            d = n / r;
            a.attr("width", s);
            a.attr("height", s / d);
            t = o - s;
            i = t / 2;
            return a.css({
                marginLeft: i,
                display: "block"
            });
        };
        C = function() {
            return $(".spinner").remove();
        };
        l = function() {
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
            n.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                g(1);
                return t(e);
            });
            return n.entries({
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
        };
        return l();
    });
}).call(this);