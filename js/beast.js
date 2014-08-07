(function() {
    $(function() {
        var e, t, n, r, o, a, i, c, s, u, d, l, f, p, m, h, v, y, b;
        i = {};
        b = {};
        f = {};
        t = {};
        a = [ "#d6f7fe", "#312cc0", "#f9a205", "#d89e46", "#4c9d5b", "#fbdd1b", "#ff6dd1" ];
        u = new Howl({
            urls: [ "sound/CLICK.mp3", "sound/CLICK.ogg" ],
            volume: .5
        });
        r = new Howl({
            urls: [ "sound/EXIT.mp3", "sound/EXIT.ogg" ],
            volume: .7
        });
        d = function() {
            v();
            h();
            $("h1.colors").fitText(.7);
            setInterval(o, 250);
            return p();
        };
        v = function() {
            var e, t;
            t = document.createElement("script");
            t.src = "https://www.youtube.com/iframe_api";
            e = document.getElementsByTagName("script")[0];
            return e.parentNode.insertBefore(t, e);
        };
        window.onYouTubeIframeAPIReady = function() {
            return f = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "yqXayqIrAYE",
                events: {
                    onReady: l
                },
                playerVars: {
                    modestbranding: true,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
        };
        l = function(e) {
            return m();
        };
        h = function() {
            $("nav").bind("mouseenter", function() {
                return $(this).transition({
                    left: 0
                }, 200);
            });
            $("a").bind("click", function() {
                return r.play();
            });
            $("a").bind("mouseenter", function() {
                return u.play();
            });
            $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            });
            $("a.composer").bind("click", function(e) {
                e.preventDefault();
                return s($(this));
            });
            $("a.exit").bind("click", function(e) {
                e.preventDefault();
                return $(".composer-data").fadeOut(100, function() {
                    var e;
                    e = $("#composers").position().top;
                    return $("body,html").animate({
                        scrollTop: e
                    }, 50);
                });
            });
            return $("a.scroll").bind("click", function(e) {
                var t;
                t = $(this);
                return y(e, t);
            });
        };
        o = function() {
            var e;
            e = Math.floor(Math.random() * a.length);
            return $("h1.colors").css({
                color: a[e]
            });
        };
        s = function(e) {
            var t, n, r, o;
            t = Math.floor(Math.random() * a.length);
            $(".composer-data").css({
                backgroundColor: a[t]
            });
            n = e.attr("href");
            o = $(".composer-data").offset().top;
            r = $(".artist " + n).position().top;
            return $(".composer-data").fadeIn(50, function() {
                return $(".data-container").delay(100).animate({
                    scrollTop: r
                }, 200);
            });
        };
        n = function(e, t) {
            var n;
            console.log(t);
            n = t[e - 1].fields;
            f.cueVideoById(n.ytVideoId);
            $(".videos h1").empty().text(n.episodeTitle);
            $(".videos p.body").empty().text(n.videoDescription);
            return $(".videos p.body").slideDown();
        };
        e = function(e) {
            var t;
            console.log(i);
            t = $(".composer-nav ul li");
            return t.each(function(e) {
                var t, n, r, o, a, c;
                c = $(this);
                a = i[e].fields;
                o = a.composerName;
                c.text(o);
                c.parent().attr("href", "#" + a.firstNameInLowercase);
                r = a.image.sys.id;
                n = a.image.fields.file.url;
                t = "<a id='" + a.firstNameInLowercase + "'><img src='" + n + "'/><h1>" + a.composerName + "</h1><p>" + a.bio + "</p>";
                return $(".composer-data .artist:nth-child(" + (e + 1) + ")").append(t);
            });
        };
        m = function() {
            var e, t, n, r, o, a, i;
            i = $(window).width();
            a = i / 1.5;
            r = $("#player").attr("width");
            n = $("#player").attr("height");
            o = r / n;
            $("#player").attr("width", a);
            $("#player").attr("height", a / o);
            e = i - a;
            t = e / 2;
            return $("#player").css({
                marginLeft: t
            });
        };
        y = function(e, t, n) {
            var r, o;
            e.preventDefault();
            o = t.attr("href");
            r = $("" + o).position().top;
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
        p = function() {
            return $(".spinner").fadeOut();
        };
        c = function() {
            var t;
            t = contentful.createClient({
                accessToken: "38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0",
                space: "s9bc5ah7p1d5"
            });
            t.entries({
                content_type: "42CpXYSUms44OskS6wUU6I",
                include: 1
            }).done(function(t) {
                i = t;
                return e(i);
            });
            t.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1
            }).done(function(e) {
                b = e;
                return $("a.episode").bind("click", function() {
                    var e;
                    e = $(this).data("order");
                    return n(e, b);
                });
            });
            return d();
        };
        return c();
    });
}).call(this);