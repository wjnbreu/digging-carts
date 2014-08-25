(function() {
    $(function() {
        var e, a, t, i, r, n, d, o, s, l, c, u, p, f, m, v, h, y, w, g, C, b, D, I, x, T, E, k, M;
        l = {};
        M = {};
        h = {};
        n = {};
        v = {};
        w = {};
        g = {};
        d = {};
        m = 0;
        c = new Showdown.converter();
        y = {};
        e = {};
        k = 1.777777777777778;
        C = {
            playerID: "1507808033001",
            playerKey: "AQ~~,AAABXxBZKsE~,AdU2xXeQoKCatdLR1Pb_eo4UzCFcjSKc",
            width: $(window).width() / 1.5,
            height: $(window).width() / 1.5 / k,
            videoID: "2114345471001"
        };
        b = '<div style="display:none"></div><object id="myExperience" class="BrightcoveExperience"><param name="bgcolor" value="#FFFFFF" /><param name="width" value="{{width}}" /><param name="height" value="{{height}}" /><param name="playerID" value="{{playerID}}" /><param name="playerKey" value="{{playerKey}}" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="@videoPlayer" value="{{videoID}}"; /><param name="includeAPI" value="true" /><param name="templateLoadHandler" value="onTemplateLoad" /><param name="templateReadyHandler" value="onTemplateReady" /></object>';
        f = function() {
            E();
            i();
            $(".video-nav ul a.episode li").first().addClass("active");
            $(".story-nav ul a.additional-episode li").first().addClass("active");
            setTimeout(T(p()), 500);
            return I();
        };
        D = function(e) {
            m = m + e;
            if (m === 4) {
                f();
                return m = 0;
            }
        };
        T = function(e) {
            var a, t;
            a = {
                height: e
            };
            t = JSON.stringify(a);
            return window.parent.postMessage(t, "*");
        };
        p = function() {
            return $(document.body).height() + 100;
        };
        window.onTemplateLoad = function(a) {
            y = brightcove.api.getExperience(a);
            e = brightcove.api.modules.APIModules;
            return console.log("im so loaded man");
        };
        window.onTemplateReady = function(a) {
            var t;
            t = y.getModule(e.VIDEO_PLAYER);
            return t.play();
        };
        i = function() {
            var e, a;
            a = Handlebars.compile(b);
            e = a(C);
            document.getElementById("player").innerHTML = e;
            return brightcove.createExperiences();
        };
        E = function() {
            window.addEventListener("resize", function() {
                x("#player");
                x("#storyplayer");
                return T(p());
            });
            $("a.arrow-right").click(function(e) {
                var a, t, i, r, n;
                e.preventDefault();
                a = $(".composers-wrap");
                n = a.find(".slide").length;
                i = a.find(".active");
                t = i.data("order");
                if (t <= n - 2) {
                    r = a.find("[data-order=" + (t + 1) + "]");
                    i.removeClass("active");
                    r.addClass("active");
                    return T(p());
                } else {
                    r = a.find("[data-order=0]");
                    i.removeClass("active");
                    r.addClass("active");
                    return T(p());
                }
            });
            $("a.arrow-left").click(function(e) {
                var a, t, i, r, n;
                e.preventDefault();
                a = $(".composers-wrap");
                n = a.find(".slide").length;
                i = a.find(".active");
                t = i.data("order");
                if (t >= 1) {
                    r = a.find("[data-order=" + (t - 1) + "]");
                    i.removeClass("active");
                    r.addClass("active");
                    return T(p());
                } else {
                    r = a.find("[data-order=" + (n - 1) + "]");
                    i.removeClass("active");
                    r.addClass("active");
                    return T(p());
                }
            });
            return $("a.pulldown").click(function(e) {
                e.preventDefault();
                return $(this).parent().find("ul").slideToggle(200, function() {
                    return T(p());
                });
            });
        };
        s = function(e, a, t) {
            var i;
            i = t[a].fields;
            if (e.find("li").hasClass("unreleased")) {
                w.cueVideoById("T8k44ryj5DQ");
                w.playVideo();
                return $(".videos h1").empty().text(i.episodeTitle);
            } else {
                w.cueVideoById(i.ytVideoId);
                $(".videos h1").empty().text(i.episodeTitle);
                return T(p());
            }
        };
        o = function(e, a) {
            var t;
            t = a[e].fields;
            $(".stories h1").empty().text(t.additionalVideoTitle);
            $(".stories p.body").empty().text(t.description);
            $(".stories p.body").slideDown();
            return T(p());
        };
        r = function(e, a, t) {
            var i, r, n, d, o, s, l, c, u, p, f;
            if (t === "main") {
                p = [];
                for (d = s = 0, c = e.length; s < c; d = ++s) {
                    o = e[d];
                    r = o.fields.episodeNumber;
                    i = new Date();
                    n = new Date(o.fields.datetimeOfLaunch);
                    if (moment() < n) {
                        a.append("<a class='episode' href='#episode' data-order=" + d + "><li class='unreleased' data-release='" + n + "'>" + r + "</li>");
                    } else {
                        a.append("<a class='episode' href='#episode' data-order=" + d + "><li class='released'>" + r + "</li>");
                    }
                    p.push(a.find("li").each(function() {
                        var e, a, t, i;
                        i = $(this);
                        if (i.hasClass("unreleased")) {
                            a = i.text();
                            t = i.data("release");
                            e = new Date(t);
                            i.bind("mouseenter", function() {
                                return i.empty().text(moment(t).format("ddd, MMM Do"));
                            });
                            return i.bind("mouseleave", function() {});
                        }
                    }));
                }
                return p;
            } else if (t === "additional") {
                f = [];
                for (d = l = 0, u = e.length; l < u; d = ++l) {
                    o = e[d];
                    r = o.fields.additionalVideoTitle;
                    f.push(a.append("<a class='additional-episode' href='#additional-episode' data-order=" + d + "><li>" + r + "</li>"));
                }
                return f;
            }
        };
        a = function(e) {
            var a, t, i, r, n, d, o, s, l, u;
            u = [];
            for (i = s = 0, l = e.length; s < l; i = ++s) {
                a = e[i];
                d = a.fields;
                n = d.composerName;
                r = d.image.fields.file.url;
                o = c.makeHtml(d.bio);
                t = "<div class='slide' data-order='" + i + "'><div class='img-wrap'><a class='arrow-left' href></a><a class='arrow-right' href></a><img src='" + r + "'/></div><h2>" + d.composerName + "</h2><p>" + o + "</p></div>";
                $(".composers-wrap").append(t);
                u.push($(".slide").first().addClass("active"));
            }
            return u;
        };
        t = function(e) {
            var a, t, i, r, n, d, o, s, l, c;
            c = [];
            for (s = 0, l = e.length; s < l; s++) {
                r = e[s];
                d = r.fields;
                o = d.artistName;
                t = d.rbmaRadioEmbedCode;
                a = d.descriptions;
                i = d.artistImage.fields.file.url;
                n = "<div class='show'><img src='" + i + "'/>" + t + "<p>" + a + "</p></div>";
                $(".radio").append(n);
                c.push(T(p()));
            }
            return c;
        };
        x = function(e) {
            var a, t, i, r, n, d, o;
            y = $(e);
            o = $(window).width();
            d = o / 1.3;
            r = y.attr("width");
            i = y.attr("height");
            n = r / i;
            y.attr("width", d);
            y.attr("height", d / n);
            a = o - d;
            t = a / 2;
            y.css({
                marginLeft: t,
                display: "block"
            });
            return T(p());
        };
        I = function() {
            $(".spinner").remove();
            return T(p());
        };
        u = function() {
            var e;
            e = contentful.createClient({
                accessToken: "38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0",
                space: "s9bc5ah7p1d5"
            });
            e.entries({
                content_type: "42CpXYSUms44OskS6wUU6I",
                include: 1
            }).done(function(e) {
                a(e);
                return D(1);
            });
            e.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                M = e;
                D(1);
                r(M, $(".video-nav ul"), "main");
                return $("a.episode").bind("click", function(e) {
                    var a;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    a = $(this).data("order");
                    return s($(this), a, M);
                });
            });
            e.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                D(1);
                return t(e);
            });
            return e.entries({
                content_type: "6fwxAcXrxK4yqyaMUiWwWY",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                D(1);
                n = e;
                r(n, $(".story-nav ul"), "additional");
                return $("a.additional-episode").bind("click", function(e) {
                    var a;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    a = $(this).data("order");
                    return o(a, n);
                });
            });
        };
        return u();
    });
}).call(this);