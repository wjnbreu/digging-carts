(function() {
    $(function() {
        var e, t, a, i, r, n, d, o, s, l, c, u, p, f, v, m, h, w, y, g, b, E, C, I, M, D, T, L, x, A, P, S, k, R, V, B, O, N;
        l = {};
        N = {};
        g = {};
        n = {};
        y = {};
        M = {};
        h = 0;
        c = new Showdown.converter();
        I = {};
        e = {};
        b = {};
        O = 640 / 360;
        B = {};
        d = [];
        w = false;
        D = {
            playerID: "1684512102001",
            playerKey: "AQ~~%2CAAABTw4lHzE~%2Csr1E9bdX6d4wCdvdlD8QKdNij3uKs2K9",
            width: $(window).width() / 1.5,
            height: $(window).width() / 1.5 / O,
            videoID: "3747000906001"
        };
        T = '<div style="display:none"></div><object id="myExperience" class="BrightcoveExperience"><param name="bgcolor" value="#FFFFFF" /><param name="width" value="{{width}}" /><param name="height" value="{{height}}" /><param name="playerID" value="{{playerID}}" /><param name="playerKey" value="{{playerKey}}" /><param name="isSlim" value="true" /><param name="autoStart" value="false" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="@videoPlayer" value="{{videoID}}"; /><param name="includeAPI" value="true" /><param name="templateLoadHandler" value="onTemplateLoad" /><param name="templateReadyHandler" value="onTemplateReady" /></object>';
        m = function() {
            k();
            $(".video-nav ul a.episode li").first().addClass("active");
            $(".story-nav ul a.additional-episode li").first().addClass("active");
            return S(v());
        };
        L = function(e) {
            h = h + e;
            if (h === 4) {
                x();
                m();
                return h = 0;
            }
        };
        S = function(e) {
            var t, a;
            t = {
                height: e
            };
            a = JSON.stringify(t);
            return window.parent.postMessage(a, "*");
        };
        v = function() {
            return $(document).height();
        };
        window.onTemplateLoad = function(t) {
            I = brightcove.api.getExperience(t);
            e = brightcove.api.modules.APIModules;
            return b = I.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
        };
        window.onTemplateReady = function(e) {
            A($("#myExperience"));
            b.addEventListener(brightcove.api.events.MediaEvent.BEGIN, E);
            b.addEventListener(brightcove.api.events.MediaEvent.CHANGE, E);
            b.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, E);
            b.addEventListener(brightcove.api.events.MediaEvent.ERROR, E);
            b.addEventListener(brightcove.api.events.MediaEvent.PLAY, E);
            b.addEventListener(brightcove.api.events.MediaEvent.STOP, E);
            return S(v());
        };
        V = function(e) {
            return b.getCurrentVideo(u);
        };
        u = function(e, t) {
            b.loadVideoByID(B.fields.brightcoveVideoId);
            return B = {};
        };
        E = function(e) {
            return console.log(e);
        };
        A = function(e) {
            var t, a, i, r, n, d, o, s, l;
            o = e;
            r = o.attr("width");
            i = o.attr("height");
            l = $(window).width();
            s = l / 1.6;
            n = r / i;
            if (w) {
                s = l / 1.2;
                if (o.attr("src")) {
                    d = o.attr("src");
                }
            }
            o.attr("width", s);
            o.attr("height", s / n);
            t = l - s;
            a = t / 2;
            return o.css({
                marginLeft: a,
                marginRight: a,
                opacity: 1
            });
        };
        i = function() {
            var e, t;
            t = Handlebars.compile(T);
            e = t(D);
            document.getElementById("player").innerHTML = e;
            return brightcove.createExperiences();
        };
        R = function() {
            var e, t;
            t = document.createElement("script");
            t.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(t, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            return M = new YT.Player("storyplayer", {
                height: "39",
                width: "64",
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
        C = function(e) {
            return P("#storyplayer");
        };
        k = function() {
            window.addEventListener("resize", function() {
                P($("#myExperience"));
                return P($("#storyplayer"));
            });
            $("a.arrow-right").click(function(e) {
                var t, a, i, r, n;
                e.preventDefault();
                t = $(".composers-wrap");
                n = t.find(".slide").length;
                i = t.find(".active");
                a = i.data("order");
                if (a <= n - 2) {
                    r = t.find("[data-order=" + (a + 1) + "]");
                    i.removeClass("active");
                    return r.addClass("active");
                } else {
                    r = t.find("[data-order=0]");
                    i.removeClass("active");
                    return r.addClass("active");
                }
            });
            $("a.arrow-left").click(function(e) {
                var t, a, i, r, n;
                e.preventDefault();
                t = $(".composers-wrap");
                n = t.find(".slide").length;
                i = t.find(".active");
                a = i.data("order");
                if (a >= 1) {
                    r = t.find("[data-order=" + (a - 1) + "]");
                    i.removeClass("active");
                    return r.addClass("active");
                } else {
                    r = t.find("[data-order=" + (n - 1) + "]");
                    i.removeClass("active");
                    return r.addClass("active");
                }
            });
            $("a.pulldown").click(function(e) {
                e.preventDefault();
                return $(this).parent().find("ul").slideToggle(200, function() {
                    return S(v());
                });
            });
            return $("a.episode").click(function(e) {
                return V();
            });
        };
        s = function(e, t, a) {
            var i;
            i = a[t].fields;
            if (e.find("li").hasClass("unreleased")) {
                $(".videos h1").empty().text(i.episodeTitle);
            } else {
                player1.cueVideoById(i.ytVideoId);
                return $(".videos h1").empty().text(i.episodeTitle);
            }
        };
        o = function(e, t) {
            var a;
            a = t[e].fields;
            M.cueVideoById(a.additionalYouTube);
            $(".stories h1").empty().text(a.additionalVideoTitle);
            $(".stories p.body").empty().text(a.description);
            return $(".stories p.body").slideDown();
        };
        r = function(e, t, a) {
            var i, r, n, d, o, s, l, c, u, p, f;
            if (a === "main") {
                p = [];
                for (d = s = 0, c = e.length; s < c; d = ++s) {
                    o = e[d];
                    r = o.fields.episodeNumber;
                    i = new Date();
                    n = new Date(o.fields.datetimeOfLaunch);
                    if (moment() < n) {
                        t.append("<a class='episode' href data-order=" + d + "><li class='unreleased' data-release='" + n + "'>" + r + "</li>");
                    } else {
                        t.append("<a class='episode' href data-order=" + d + "><li class='released'>" + r + "</li>");
                    }
                    p.push(t.find("li").each(function() {
                        var e, t, a, i;
                        i = $(this);
                        if (i.hasClass("unreleased")) {
                            t = i.text();
                            a = i.data("release");
                            e = new Date(a);
                            i.bind("mouseenter", function() {
                                return i.empty().text(moment(a).format("ddd, MMM Do"));
                            });
                            return i.bind("mouseleave", function() {});
                        }
                    }));
                }
                return p;
            } else if (a === "additional") {
                f = [];
                for (d = l = 0, u = e.length; l < u; d = ++l) {
                    o = e[d];
                    r = o.fields.additionalVideoTitle;
                    f.push(t.append("<a class='additional-episode' href data-order=" + d + "><li>" + r + "</li>"));
                }
                return f;
            }
        };
        t = function(e) {
            var t, a, i, r, n, d, o, s, l, u;
            u = [];
            for (i = s = 0, l = e.length; s < l; i = ++s) {
                t = e[i];
                d = t.fields;
                n = d.composerName;
                r = d.image.fields.file.url;
                o = c.makeHtml(d.bio);
                a = "<div class='slide' data-order='" + i + "'><div class='img-wrap'><a class='arrow-left' href></a><a class='arrow-right' href></a><img src='" + r + "'/></div><h2>" + d.composerName + "</h2><p>" + o + "</p></div>";
                $(".composers-wrap").append(a);
                u.push($(".slide").first().addClass("active"));
            }
            return u;
        };
        a = function(e) {
            var t, a, i, r, n, d, o, s, l, c;
            c = [];
            for (s = 0, l = e.length; s < l; s++) {
                r = e[s];
                d = r.fields;
                o = d.artistName;
                a = d.rbmaRadioEmbedCode;
                t = d.descriptions;
                i = d.artistImage.fields.file.url;
                n = "<div class='show'><img src='" + i + "'/>" + a + "<p>" + t + "</p></div>";
                c.push($(".radio").append(n));
            }
            return c;
        };
        P = function(e) {
            var t, a, i, r, n, d, o;
            I = $(e);
            o = $(window).width();
            d = o / 1.6;
            r = I.attr("width");
            i = I.attr("height");
            n = r / i;
            if (w) {
                d = o / 1.2;
            }
            I.attr("width", d);
            I.attr("height", d / n);
            t = o - d;
            a = t / 2;
            return I.css({
                marginLeft: a,
                display: "block"
            });
        };
        x = function() {
            return $(".spinner").fadeOut(function() {
                return $(".spinner").remove();
            });
        };
        p = function() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return w = true;
            }
        };
        f = function() {
            var e;
            e = contentful.createClient({
                accessToken: "38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0",
                space: "s9bc5ah7p1d5"
            });
            e.entries({
                content_type: "42CpXYSUms44OskS6wUU6I",
                include: 1
            }).done(function(e) {
                t(e);
                return L(1);
            });
            e.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                N = e;
                L(1);
                r(N, $(".video-nav ul"), "main");
                i();
                return $("a.episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    B = N[t];
                    return V();
                });
            });
            e.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                L(1);
                return a(e);
            });
            return e.entries({
                content_type: "6fwxAcXrxK4yqyaMUiWwWY",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                L(1);
                n = e;
                r(n, $(".story-nav ul"), "additional");
                $("a.additional-episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return o(t, n);
                });
                return R();
            });
        };
        f();
        return p();
    });
}).call(this);