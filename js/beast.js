(function() {
    $(function() {
        var e, t, a, i, n, r, d, o, s, l, c, u, p, v, f, m, h, g, w, y, b, E, C, I, D, M, L, T, x, A, k, P, R, S, V, N, O;
        l = {};
        O = {};
        g = {};
        r = {};
        h = {};
        I = {};
        m = 0;
        c = new Showdown.converter();
        C = {};
        e = {};
        w = {};
        N = 16 / 9;
        V = {};
        d = [];
        D = {
            playerID: "1684512102001",
            playerKey: "AQ~~%2CAAABTw4lHzE~%2Csr1E9bdX6d4wCdvdlD8QKdNij3uKs2K9",
            width: $(window).width() / 1.5,
            height: $(window).width() / 1.5 / N,
            videoID: "3747000906001"
        };
        M = '<div style="display:none"></div><object id="myExperience" class="BrightcoveExperience"><param name="bgcolor" value="#FFFFFF" /><param name="width" value="{{width}}" /><param name="height" value="{{height}}" /><param name="playerID" value="{{playerID}}" /><param name="playerKey" value="{{playerKey}}" /><param name="isSlim" value="true" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="@videoPlayer" value="{{videoID}}"; /><param name="includeAPI" value="true" /><param name="templateLoadHandler" value="onTemplateLoad" /><param name="templateReadyHandler" value="onTemplateReady" /></object>';
        f = function() {
            P();
            $(".video-nav ul a.episode li").first().addClass("active");
            $(".story-nav ul a.additional-episode li").first().addClass("active");
            return console.log("init called");
        };
        L = function(e) {
            m = m + e;
            console.log(m);
            if (m === 6) {
                T();
                f();
                return m = 0;
            }
        };
        k = function(e) {
            var t, a;
            t = {
                height: e
            };
            a = JSON.stringify(t);
            console.log(a);
            return window.parent.postMessage(a, "*");
        };
        v = function() {
            return $(document).height();
        };
        window.onTemplateLoad = function(t) {
            C = brightcove.api.getExperience(t);
            e = brightcove.api.modules.APIModules;
            return w = C.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
        };
        window.onTemplateReady = function(e) {
            L(1);
            x();
            w.addEventListener(brightcove.api.events.MediaEvent.BEGIN, y);
            w.addEventListener(brightcove.api.events.MediaEvent.CHANGE, y);
            w.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, y);
            w.addEventListener(brightcove.api.events.MediaEvent.ERROR, y);
            w.addEventListener(brightcove.api.events.MediaEvent.PLAY, y);
            w.addEventListener(brightcove.api.events.MediaEvent.STOP, y);
            return k(v());
        };
        b = function(e) {
            return console.log(e);
        };
        S = function(e) {
            return w.getCurrentVideo(u);
        };
        u = function(e, t) {
            console.log(e);
            w.loadVideoByID(V.fields.brightcoveVideoId);
            return V = {};
        };
        y = function(e) {
            return console.log(e.type);
        };
        x = function(e) {
            var t, a, i, n, r, d, o, s;
            d = $("#myExperience");
            n = d.attr("width");
            i = d.attr("height");
            s = $(window).width();
            o = s / 1.3;
            r = n / i;
            d.attr("width", o);
            d.attr("height", o / r);
            t = s - o;
            a = t / 2;
            return d.css({
                marginLeft: a
            });
        };
        i = function() {
            var e, t;
            t = Handlebars.compile(M);
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
            return I = new YT.Player("storyplayer", {
                height: "39",
                width: "64",
                videoId: "VsbG4pXrhr8",
                events: {
                    onReady: E
                },
                playerVars: {
                    modestbranding: true,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
        };
        E = function(e) {
            L(1);
            return A("#storyplayer");
        };
        P = function() {
            window.addEventListener("resize", function() {});
            $("a.arrow-right").click(function(e) {
                var t, a, i, n, r;
                e.preventDefault();
                t = $(".composers-wrap");
                r = t.find(".slide").length;
                i = t.find(".active");
                a = i.data("order");
                if (a <= r - 2) {
                    n = t.find("[data-order=" + (a + 1) + "]");
                    i.removeClass("active");
                    return n.addClass("active");
                } else {
                    n = t.find("[data-order=0]");
                    i.removeClass("active");
                    return n.addClass("active");
                }
            });
            $("a.arrow-left").click(function(e) {
                var t, a, i, n, r;
                e.preventDefault();
                t = $(".composers-wrap");
                r = t.find(".slide").length;
                i = t.find(".active");
                a = i.data("order");
                if (a >= 1) {
                    n = t.find("[data-order=" + (a - 1) + "]");
                    i.removeClass("active");
                    return n.addClass("active");
                } else {
                    n = t.find("[data-order=" + (r - 1) + "]");
                    i.removeClass("active");
                    return n.addClass("active");
                }
            });
            $("a.pulldown").click(function(e) {
                e.preventDefault();
                return $(this).parent().find("ul").slideToggle(200, function() {
                    return k(v());
                });
            });
            return $("a.episode").click(function(e) {
                return S();
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
            $(".stories h1").empty().text(a.additionalVideoTitle);
            $(".stories p.body").empty().text(a.description);
            return $(".stories p.body").slideDown();
        };
        n = function(e, t, a) {
            var i, n, r, d, o, s, l, c, u, p, v;
            if (a === "main") {
                p = [];
                for (d = s = 0, c = e.length; s < c; d = ++s) {
                    o = e[d];
                    n = o.fields.episodeNumber;
                    i = new Date();
                    r = new Date(o.fields.datetimeOfLaunch);
                    if (moment() < r) {
                        t.append("<a class='episode' href='#episode' data-order=" + d + "><li class='unreleased' data-release='" + r + "'>" + n + "</li>");
                    } else {
                        t.append("<a class='episode' href='#episode' data-order=" + d + "><li class='released'>" + n + "</li>");
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
                v = [];
                for (d = l = 0, u = e.length; l < u; d = ++l) {
                    o = e[d];
                    n = o.fields.additionalVideoTitle;
                    v.push(t.append("<a class='additional-episode' href='#additional-episode' data-order=" + d + "><li>" + n + "</li>"));
                }
                return v;
            }
        };
        t = function(e) {
            var t, a, i, n, r, d, o, s, l, u;
            u = [];
            for (i = s = 0, l = e.length; s < l; i = ++s) {
                t = e[i];
                d = t.fields;
                r = d.composerName;
                n = d.image.fields.file.url;
                o = c.makeHtml(d.bio);
                a = "<div class='slide' data-order='" + i + "'><div class='img-wrap'><a class='arrow-left' href></a><a class='arrow-right' href></a><img src='" + n + "'/></div><h2>" + d.composerName + "</h2><p>" + o + "</p></div>";
                $(".composers-wrap").append(a);
                u.push($(".slide").first().addClass("active"));
            }
            return u;
        };
        a = function(e) {
            var t, a, i, n, r, d, o, s, l, c;
            c = [];
            for (s = 0, l = e.length; s < l; s++) {
                n = e[s];
                d = n.fields;
                o = d.artistName;
                a = d.rbmaRadioEmbedCode;
                t = d.descriptions;
                i = d.artistImage.fields.file.url;
                r = "<div class='show'><img src='" + i + "'/>" + a + "<p>" + t + "</p></div>";
                c.push($(".radio").append(r));
            }
            return c;
        };
        A = function(e) {
            var t, a, i, n, r, d, o;
            C = $(e);
            o = $(window).width();
            d = o / 1.3;
            n = C.attr("width");
            i = C.attr("height");
            r = n / i;
            C.attr("width", d);
            C.attr("height", d / r);
            t = o - d;
            a = t / 2;
            return C.css({
                marginLeft: a,
                display: "block"
            });
        };
        T = function() {
            return $(".spinner").fadeOut(function() {
                return $(".spinner").remove();
            });
        };
        p = function() {
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
                O = e;
                L(1);
                n(O, $(".video-nav ul"), "main");
                i();
                return $("a.episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    V = O[t];
                    return S();
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
                r = e;
                n(r, $(".story-nav ul"), "additional");
                $("a.additional-episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return o(t, r);
                });
                return R();
            });
        };
        return p();
    });
}).call(this);