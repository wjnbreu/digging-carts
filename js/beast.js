(function() {
    $(function() {
        var e, t, i, r, n, a, d, s, o, l, c, u, f, p, v, h, m, y, w, g, C, b, T, k, D;
        s = {};
        D = {};
        p = {};
        r = {};
        f = {};
        m = {};
        y = {};
        n = {};
        u = 0;
        c = function() {
            T();
            k();
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
        k = function() {
            var e, t;
            t = document.createElement("script");
            t.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(t, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            m = new YT.Player("player", {
                height: "39",
                width: "64",
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
                height: "39",
                width: "64",
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
        d = function(e, t, i) {
            var r;
            r = i[t].fields;
            if (e.find("li").hasClass("unreleased")) {
                m.cueVideoById("T8k44ryj5DQ");
                m.playVideo();
                return $(".videos h1").empty().text(r.episodeTitle);
            } else {
                m.cueVideoById(r.ytVideoId);
                $(".videos h1").empty().text(r.episodeTitle);
                return b(l());
            }
        };
        a = function(e, t) {
            var i;
            i = t[e].fields;
            y.cueVideoById(i.additionalYouTube);
            $(".stories h1").empty().text(i.additionalVideoTitle);
            return b(l());
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
            var t, i, r, n, a, d, s, o, l;
            l = [];
            for (r = s = 0, o = e.length; s < o; r = ++s) {
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
            var t, i, r, n, a, d, s, o, c, u;
            u = [];
            for (o = 0, c = e.length; o < c; o++) {
                n = e[o];
                d = n.fields;
                s = d.artistName;
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
            var t, i, r, n, a, d, s, o;
            a = $(e);
            o = $(window).width();
            s = o / 1.2;
            n = a.attr("width");
            r = a.attr("height");
            d = n / r;
            a.attr("width", s);
            a.attr("height", s / d);
            t = o - s;
            i = t / 2;
            a.css({
                marginLeft: i,
                display: "block"
            });
            return b(l());
        };
        g = function() {
            $(".spinner").remove();
            return b(l());
        };
        o = function() {
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
                D = e;
                w(1);
                i(D, $(".video-nav ul"), "main");
                return $("a.episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return d($(this), t, D);
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
        $("a.pulldown").click(function(e) {
            e.preventDefault();
            return $(this).parent().find("ul").slideToggle(200, function() {
                return b(l());
            });
        });
        o();
        return window.addEventListener("load", b(l()));
    });
}).call(this);