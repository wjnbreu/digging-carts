(function() {
    $(function() {
        var e, t, a, n, i, r, d, o, s, l, c, u, p, f, v, m, h, w, y, g, b, E, C, I, D, M, T, L, x, A, k, V, P, R, S, N, B;
        l = {};
        N = {};
        w = {};
        r = {};
        h = {};
        I = {};
        d = {};
        m = 0;
        c = new Showdown.converter();
        C = {};
        e = {};
        y = {};
        S = 16 / 9;
        D = {
            playerID: "1684512102001",
            playerKey: "AQ~~%2CAAABTw4lHzE~%2Csr1E9bdX6d4wCdvdlD8QKdNij3uKs2K9",
            width: $(window).width() / 1.5,
            height: $(window).width() / 1.5 / S,
            videoID: "3747213877001"
        };
        B = new Array(1754276221001, 1756137891001, 1754276206001, 1754276205001, 1754234236001);
        M = '<div style="display:none"></div><object id="myExperience" class="BrightcoveExperience"><param name="bgcolor" value="#FFFFFF" /><param name="width" value="{{width}}" /><param name="height" value="{{height}}" /><param name="playerID" value="{{playerID}}" /><param name="playerKey" value="{{playerKey}}" /><param name="isSlim" value="true" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="@videoPlayer" value="{{videoID}}"; /><param name="includeAPI" value="true" /><param name="templateLoadHandler" value="onTemplateLoad" /><param name="templateReadyHandler" value="onTemplateReady" /></object>';
        v = function() {
            V();
            $(".video-nav ul a.episode li").first().addClass("active");
            $(".story-nav ul a.additional-episode li").first().addClass("active");
            return console.log("init called");
        };
        T = function(e) {
            m = m + e;
            console.log(m);
            if (m === 6) {
                L();
                v();
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
        f = function() {
            return $(document).height();
        };
        window.onTemplateLoad = function(t) {
            C = brightcove.api.getExperience(t);
            e = brightcove.api.modules.APIModules;
            return y = C.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
        };
        window.onTemplateReady = function(e) {
            T(1);
            x();
            y.addEventListener(brightcove.api.events.MediaEvent.BEGIN, g);
            y.addEventListener(brightcove.api.events.MediaEvent.CHANGE, g);
            y.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, g);
            y.addEventListener(brightcove.api.events.MediaEvent.ERROR, g);
            y.addEventListener(brightcove.api.events.MediaEvent.PLAY, g);
            y.addEventListener(brightcove.api.events.MediaEvent.STOP, g);
            return k(f());
        };
        b = function(e) {
            return console.log(e);
        };
        R = function() {
            return y.getCurrentVideo(u);
        };
        u = function(e) {
            console.log("callback called");
            console.log(e);
            return y.loadVideoByID(3747000906001);
        };
        g = function(e) {
            return console.log(e.type);
        };
        x = function(e) {
            var t, a, n, i, r, d, o, s;
            d = $("#myExperience");
            i = d.attr("width");
            n = d.attr("height");
            s = $(window).width();
            o = s / 1.3;
            r = i / n;
            d.attr("width", o);
            d.attr("height", o / r);
            t = s - o;
            a = t / 2;
            return d.css({
                marginLeft: a
            });
        };
        n = function() {
            var e, t;
            t = Handlebars.compile(M);
            e = t(D);
            document.getElementById("player").innerHTML = e;
            return brightcove.createExperiences();
        };
        P = function() {
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
            T(1);
            return A("#storyplayer");
        };
        V = function() {
            window.addEventListener("resize", function() {});
            $("a.arrow-right").click(function(e) {
                var t, a, n, i, r;
                e.preventDefault();
                t = $(".composers-wrap");
                r = t.find(".slide").length;
                n = t.find(".active");
                a = n.data("order");
                if (a <= r - 2) {
                    i = t.find("[data-order=" + (a + 1) + "]");
                    n.removeClass("active");
                    return i.addClass("active");
                } else {
                    i = t.find("[data-order=0]");
                    n.removeClass("active");
                    return i.addClass("active");
                }
            });
            $("a.arrow-left").click(function(e) {
                var t, a, n, i, r;
                e.preventDefault();
                t = $(".composers-wrap");
                r = t.find(".slide").length;
                n = t.find(".active");
                a = n.data("order");
                if (a >= 1) {
                    i = t.find("[data-order=" + (a - 1) + "]");
                    n.removeClass("active");
                    return i.addClass("active");
                } else {
                    i = t.find("[data-order=" + (r - 1) + "]");
                    n.removeClass("active");
                    return i.addClass("active");
                }
            });
            $("a.pulldown").click(function(e) {
                e.preventDefault();
                return $(this).parent().find("ul").slideToggle(200, function() {
                    return k(f());
                });
            });
            return $("a.episode").click(function(e) {
                return R();
            });
        };
        s = function(e, t, a) {
            var n;
            n = a[t].fields;
            if (e.find("li").hasClass("unreleased")) {
                player1.cueVideoById("T8k44ryj5DQ");
                player1.playVideo();
                return $(".videos h1").empty().text(n.episodeTitle);
            } else {
                player1.cueVideoById(n.ytVideoId);
                return $(".videos h1").empty().text(n.episodeTitle);
            }
        };
        o = function(e, t) {
            var a;
            a = t[e].fields;
            $(".stories h1").empty().text(a.additionalVideoTitle);
            $(".stories p.body").empty().text(a.description);
            return $(".stories p.body").slideDown();
        };
        i = function(e, t, a) {
            var n, i, r, d, o, s, l, c, u, p, f;
            if (a === "main") {
                p = [];
                for (d = s = 0, c = e.length; s < c; d = ++s) {
                    o = e[d];
                    i = o.fields.episodeNumber;
                    n = new Date();
                    r = new Date(o.fields.datetimeOfLaunch);
                    if (moment() < r) {
                        t.append("<a class='episode' href='#episode' data-order=" + d + "><li class='unreleased' data-release='" + r + "'>" + i + "</li>");
                    } else {
                        t.append("<a class='episode' href='#episode' data-order=" + d + "><li class='released'>" + i + "</li>");
                    }
                    p.push(t.find("li").each(function() {
                        var e, t, a, n;
                        n = $(this);
                        if (n.hasClass("unreleased")) {
                            t = n.text();
                            a = n.data("release");
                            e = new Date(a);
                            n.bind("mouseenter", function() {
                                return n.empty().text(moment(a).format("ddd, MMM Do"));
                            });
                            return n.bind("mouseleave", function() {});
                        }
                    }));
                }
                return p;
            } else if (a === "additional") {
                f = [];
                for (d = l = 0, u = e.length; l < u; d = ++l) {
                    o = e[d];
                    i = o.fields.additionalVideoTitle;
                    f.push(t.append("<a class='additional-episode' href='#additional-episode' data-order=" + d + "><li>" + i + "</li>"));
                }
                return f;
            }
        };
        t = function(e) {
            var t, a, n, i, r, d, o, s, l, u;
            u = [];
            for (n = s = 0, l = e.length; s < l; n = ++s) {
                t = e[n];
                d = t.fields;
                r = d.composerName;
                i = d.image.fields.file.url;
                o = c.makeHtml(d.bio);
                a = "<div class='slide' data-order='" + n + "'><div class='img-wrap'><a class='arrow-left' href></a><a class='arrow-right' href></a><img src='" + i + "'/></div><h2>" + d.composerName + "</h2><p>" + o + "</p></div>";
                $(".composers-wrap").append(a);
                u.push($(".slide").first().addClass("active"));
            }
            return u;
        };
        a = function(e) {
            var t, a, n, i, r, d, o, s, l, c;
            c = [];
            for (s = 0, l = e.length; s < l; s++) {
                i = e[s];
                d = i.fields;
                o = d.artistName;
                a = d.rbmaRadioEmbedCode;
                t = d.descriptions;
                n = d.artistImage.fields.file.url;
                r = "<div class='show'><img src='" + n + "'/>" + a + "<p>" + t + "</p></div>";
                c.push($(".radio").append(r));
            }
            return c;
        };
        A = function(e) {
            var t, a, n, i, r, d, o;
            C = $(e);
            o = $(window).width();
            d = o / 1.3;
            i = C.attr("width");
            n = C.attr("height");
            r = i / n;
            C.attr("width", d);
            C.attr("height", d / r);
            t = o - d;
            a = t / 2;
            return C.css({
                marginLeft: a,
                display: "block"
            });
        };
        L = function() {
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
                return T(1);
            });
            e.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                N = e;
                T(1);
                i(N, $(".video-nav ul"), "main");
                n();
                return P();
            });
            e.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                T(1);
                return a(e);
            });
            return e.entries({
                content_type: "6fwxAcXrxK4yqyaMUiWwWY",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                T(1);
                r = e;
                i(r, $(".story-nav ul"), "additional");
                return $("a.additional-episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    return o(t, r);
                });
            });
        };
        return p();
    });
}).call(this);