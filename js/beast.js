(function() {
    $(function() {
        var e, t, i, a, n, r, d, o, s, l, c, u, p, f, v, m, h, g, w, y, b, E, C, I, M, D, T, L, x, A, P, O, k, R, S, V, B, N, Y;
        l = {};
        Y = {};
        y = {};
        r = {};
        w = {};
        D = {};
        h = 0;
        c = new Showdown.converter();
        M = {};
        e = {};
        b = {};
        N = 640 / 360;
        B = {};
        d = [];
        g = false;
        T = {
            playerID: "1684512102001",
            playerKey: "AQ~~%2CAAABTw4lHzE~%2Csr1E9bdX6d4wCdvdlD8QKdNij3uKs2K9",
            width: $(window).width() / 1.5,
            height: $(window).width() / 1.5 / N,
            videoID: "3747000906001"
        };
        L = '<div style="display:none"></div><object id="myExperience" class="BrightcoveExperience"><param name="bgcolor" value="#FFFFFF" /><param name="width" value="{{width}}" /><param name="height" value="{{height}}" /><param name="playerID" value="{{playerID}}" /><param name="playerKey" value="{{playerKey}}" /><param name="isSlim" value="true" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="@videoPlayer" value="{{videoID}}"; /><param name="includeAPI" value="true" /><param name="templateLoadHandler" value="onTemplateLoad" /><param name="templateReadyHandler" value="onTemplateReady" /></object>';
        m = function() {
            R();
            $(".video-nav ul a.episode li").first().addClass("active");
            $(".story-nav ul a.additional-episode li").first().addClass("active");
            return console.log("init called");
        };
        x = function(e) {
            h = h + e;
            console.log(h);
            if (h === 4) {
                A();
                m();
                return h = 0;
            }
        };
        k = function(e) {
            var t, i;
            t = {
                height: e
            };
            i = JSON.stringify(t);
            console.log(i);
            return window.parent.postMessage(i, "*");
        };
        v = function() {
            return $(document).height();
        };
        window.onTemplateLoad = function(t) {
            M = brightcove.api.getExperience(t);
            e = brightcove.api.modules.APIModules;
            return b = M.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
        };
        window.onTemplateReady = function(e) {
            P($("#myExperience"));
            b.addEventListener(brightcove.api.events.MediaEvent.BEGIN, E);
            b.addEventListener(brightcove.api.events.MediaEvent.CHANGE, E);
            b.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, E);
            b.addEventListener(brightcove.api.events.MediaEvent.ERROR, E);
            b.addEventListener(brightcove.api.events.MediaEvent.PLAY, E);
            b.addEventListener(brightcove.api.events.MediaEvent.STOP, E);
            return k(v());
        };
        C = function(e) {
            return 0;
        };
        V = function(e) {
            return b.getCurrentVideo(u);
        };
        u = function(e, t) {
            console.log(e);
            b.loadVideoByID(B.fields.brightcoveVideoId);
            return B = {};
        };
        E = function(e) {
            return console.log(e.type);
        };
        P = function(e) {
            var t, i, a, n, r, d, o, s, l;
            o = e;
            n = o.attr("width");
            a = o.attr("height");
            l = $(window).width();
            s = l / 1.3;
            r = n / a;
            if (g) {
                if (o.attr("src")) {
                    d = o.attr("src");
                    if (d.indexOf("width=") > -1) {
                        d.replace("512", s);
                    }
                    if (d.indexOf("height=") > -1) {
                        d.replace("288", s / r);
                    }
                }
            }
            o.attr("width", s);
            o.attr("height", s / r);
            t = l - s;
            i = t / 2;
            return o.css({
                marginLeft: i,
                marginRight: i
            });
        };
        a = function() {
            var e, t;
            t = Handlebars.compile(L);
            e = t(T);
            document.getElementById("player").innerHTML = e;
            return brightcove.createExperiences();
        };
        S = function() {
            var e, t;
            t = document.createElement("script");
            t.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(t, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            return D = new YT.Player("storyplayer", {
                height: "39",
                width: "64",
                videoId: "VsbG4pXrhr8",
                events: {
                    onReady: I
                },
                playerVars: {
                    modestbranding: true,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
        };
        I = function(e) {
            return O("#storyplayer");
        };
        R = function() {
            window.addEventListener("resize", function() {
                O($("#myExperience"));
                return O($("#storyplayer"));
            });
            $("a.arrow-right").click(function(e) {
                var t, i, a, n, r;
                e.preventDefault();
                t = $(".composers-wrap");
                r = t.find(".slide").length;
                a = t.find(".active");
                i = a.data("order");
                if (i <= r - 2) {
                    n = t.find("[data-order=" + (i + 1) + "]");
                    a.removeClass("active");
                    return n.addClass("active");
                } else {
                    n = t.find("[data-order=0]");
                    a.removeClass("active");
                    return n.addClass("active");
                }
            });
            $("a.arrow-left").click(function(e) {
                var t, i, a, n, r;
                e.preventDefault();
                t = $(".composers-wrap");
                r = t.find(".slide").length;
                a = t.find(".active");
                i = a.data("order");
                if (i >= 1) {
                    n = t.find("[data-order=" + (i - 1) + "]");
                    a.removeClass("active");
                    return n.addClass("active");
                } else {
                    n = t.find("[data-order=" + (r - 1) + "]");
                    a.removeClass("active");
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
                return V();
            });
        };
        s = function(e, t, i) {
            var a;
            a = i[t].fields;
            if (e.find("li").hasClass("unreleased")) {
                $(".videos h1").empty().text(a.episodeTitle);
            } else {
                player1.cueVideoById(a.ytVideoId);
                return $(".videos h1").empty().text(a.episodeTitle);
            }
        };
        o = function(e, t) {
            var i;
            i = t[e].fields;
            D.cueVideoById(i.additionalYouTube);
            $(".stories h1").empty().text(i.additionalVideoTitle);
            $(".stories p.body").empty().text(i.description);
            return $(".stories p.body").slideDown();
        };
        n = function(e, t, i) {
            var a, n, r, d, o, s, l, c, u, p, f;
            if (i === "main") {
                p = [];
                for (d = s = 0, c = e.length; s < c; d = ++s) {
                    o = e[d];
                    n = o.fields.episodeNumber;
                    a = new Date();
                    r = new Date(o.fields.datetimeOfLaunch);
                    if (moment() < r) {
                        t.append("<a class='episode' href data-order=" + d + "><li class='unreleased' data-release='" + r + "'>" + n + "</li>");
                    } else {
                        t.append("<a class='episode' href data-order=" + d + "><li class='released'>" + n + "</li>");
                    }
                    p.push(t.find("li").each(function() {
                        var e, t, i, a;
                        a = $(this);
                        if (a.hasClass("unreleased")) {
                            t = a.text();
                            i = a.data("release");
                            e = new Date(i);
                            a.bind("mouseenter", function() {
                                return a.empty().text(moment(i).format("ddd, MMM Do"));
                            });
                            return a.bind("mouseleave", function() {});
                        }
                    }));
                }
                return p;
            } else if (i === "additional") {
                f = [];
                for (d = l = 0, u = e.length; l < u; d = ++l) {
                    o = e[d];
                    n = o.fields.additionalVideoTitle;
                    f.push(t.append("<a class='additional-episode' href data-order=" + d + "><li>" + n + "</li>"));
                }
                return f;
            }
        };
        t = function(e) {
            var t, i, a, n, r, d, o, s, l, u;
            u = [];
            for (a = s = 0, l = e.length; s < l; a = ++s) {
                t = e[a];
                d = t.fields;
                r = d.composerName;
                n = d.image.fields.file.url;
                o = c.makeHtml(d.bio);
                i = "<div class='slide' data-order='" + a + "'><div class='img-wrap'><a class='arrow-left' href></a><a class='arrow-right' href></a><img src='" + n + "'/></div><h2>" + d.composerName + "</h2><p>" + o + "</p></div>";
                $(".composers-wrap").append(i);
                u.push($(".slide").first().addClass("active"));
            }
            return u;
        };
        i = function(e) {
            var t, i, a, n, r, d, o, s, l, c;
            c = [];
            for (s = 0, l = e.length; s < l; s++) {
                n = e[s];
                d = n.fields;
                o = d.artistName;
                i = d.rbmaRadioEmbedCode;
                t = d.descriptions;
                a = d.artistImage.fields.file.url;
                r = "<div class='show'><img src='" + a + "'/>" + i + "<p>" + t + "</p></div>";
                c.push($(".radio").append(r));
            }
            return c;
        };
        O = function(e) {
            var t, i, a, n, r, d, o;
            M = $(e);
            o = $(window).width();
            d = o / 1.3;
            n = M.attr("width");
            a = M.attr("height");
            r = n / a;
            M.attr("width", d);
            M.attr("height", d / r);
            t = o - d;
            i = t / 2;
            return M.css({
                marginLeft: i,
                display: "block"
            });
        };
        A = function() {
            return $(".spinner").fadeOut(function() {
                return $(".spinner").remove();
            });
        };
        p = function() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return g = true;
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
                return x(1);
            });
            e.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                Y = e;
                x(1);
                n(Y, $(".video-nav ul"), "main");
                a();
                return $("a.episode").bind("click", function(e) {
                    var t;
                    e.preventDefault();
                    $(this).parent().find("li").removeClass("active");
                    $(this).find("li").addClass("active");
                    t = $(this).data("order");
                    B = Y[t];
                    return V();
                });
            });
            e.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(e) {
                x(1);
                return i(e);
            });
            return e.entries({
                content_type: "6fwxAcXrxK4yqyaMUiWwWY",
                include: 1,
                order: "fields.order"
            }).done(function(e) {
                x(1);
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
                return S();
            });
        };
        f();
        return p();
    });
}).call(this);