function drawBackground() {
    var t = $(window).width(), e = $(window).height();
    ctx.clearRect(0, 0, t, e);
}

function draw() {
    drawBackground();
    for (var t = $(window).width(), e = $(window).height(), n = 0; noOfDrops > n; n++) ctx.drawImage(fallingDrops[n].image, fallingDrops[n].x, fallingDrops[n].y), 
    fallingDrops[n].y += fallingDrops[n].speed, fallingDrops[n].y > e && (fallingDrops[n].y = -25, 
    fallingDrops[n].x = Math.random() * t);
}

function resizeCanvas() {
    var t = $(window).width(), e = $(window).height(), n = document.getElementById("canvas");
    (n.width != t || n.height != e) && (n.width = t, n.height = e);
}

function ranIcon() {
    var t = fallingIcons.length, e = Math.floor(Math.random() * t);
    return e;
}

function setup() {
    var t = $(window).width(), e = $(window).height(), n = document.getElementById("canvas");
    if (n.width = t, n.height = e, n.getContext) {
        ctx = n.getContext("2d"), setInterval(draw, 25);
        for (var r = 0; noOfDrops > r; r++) {
            var i = {};
            i.image = new Image(), i.image.height = 25, i.image.src = "../img/icons/" + fallingIcons[ranIcon()], 
            i.x = Math.random() * n.width, i.y = 5 * Math.random(), i.speed = 3 + 5 * Math.random(), 
            fallingDrops.push(i);
        }
    }
}

!function(t) {
    if ("object" == typeof exports) module.exports = t(); else if ("function" == typeof define && define.amd) define(t); else {
        var e;
        "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), 
        e.contentful = t();
    }
}(function() {
    var t;
    return function e(t, n, r) {
        function i(s, u) {
            if (!n[s]) {
                if (!t[s]) {
                    var a = "function" == typeof require && require;
                    if (!u && a) return a(s, !0);
                    if (o) return o(s, !0);
                    throw new Error("Cannot find module '" + s + "'");
                }
                var c = n[s] = {
                    exports: {}
                };
                t[s][0].call(c.exports, function(e) {
                    var n = t[s][1][e];
                    return i(n ? n : e);
                }, c, c.exports, e, t, n, r);
            }
            return n[s].exports;
        }
        for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) i(r[s]);
        return i;
    }({
        1: [ function(t, e, n) {
            "use strict";
            function r(t) {
                return p.reduce(t, function(t, e, n) {
                    return p.truthy(e) && (t[n] = e), t;
                }, {});
            }
            function i(t, e) {
                if (!p.exists(t[e])) throw new TypeError("Expected property " + e);
            }
            function o(t) {
                return p.getPath(t, [ "sys", "type" ]) in E;
            }
            function s(t) {
                var e = E[t.sys.type];
                return e.parse(t);
            }
            function u(t) {
                return JSON.parse(t.body);
            }
            function a(t) {
                return p.reduce(t, function(t, e, n) {
                    return t[n] = p.isArray(e) ? e.join(",") : e, t;
                }, {});
            }
            function c(t) {
                return d(t, l, function(e) {
                    return f(t, e) || e;
                }), t.items;
            }
            function l(t) {
                return "Link" === p.getPath(t, [ "sys", "type" ]);
            }
            function f(t, e) {
                var n = e.sys.linkType, r = e.sys.id, i = function(t) {
                    return t.sys.type === n && t.sys.id === r;
                };
                return p.find(t.items, i) || t.includes && p.find(t.includes[n], i);
            }
            function d(t, e, n) {
                return e(t) ? n(t) : p.isArray(t) || p.isObject(t) ? (p.each(t, function(r, i) {
                    t[i] = d(r, e, n);
                }), t) : t;
            }
            var p = t("underscore-contrib"), h = t("questor"), v = t("redefine"), _ = t("querystring"), y = v.Class({
                constructor: function(t) {
                    i(t, "accessToken"), i(t, "space"), this.options = p.defaults({}, t, {
                        host: "cdn.contentful.com",
                        secure: !0
                    });
                },
                request: function(t, e) {
                    e || (e = {}), e.headers || (e.headers = {}), e.query || (e.query = {}), e.headers["Content-Type"] = "application/vnd.contentful.delivery.v1+json", 
                    e.query.access_token = this.options.accessToken;
                    var n = [ this.options.secure ? "https" : "http", "://", p.first(this.options.host.split(":")), ":", this.options.secure ? "443" : "80", "/spaces/", this.options.space, t, "?", _.stringify(e.query) ].join("");
                    return h(n, e).then(u).catch(Error, function(t) {
                        throw t;
                    }).catch(function(t) {
                        throw u(t);
                    });
                },
                asset: function(t, e) {
                    return this.request("/assets/" + t).then(m.parse).nodeify(e);
                },
                assets: function(t, e) {
                    var n = x.parse(t);
                    return this.request("/assets", {
                        query: n
                    }).then(p.partial(j.parse, m)).nodeify(e);
                },
                contentType: function(t, e) {
                    return this.request("/content_types/" + t).then(b.parse).nodeify(e);
                },
                contentTypes: function(t, e) {
                    var n = x.parse(t);
                    return this.request("/content_types", {
                        query: n
                    }).then(p.partial(j.parse, b)).nodeify(e);
                },
                entry: function(t, e) {
                    return this.request("/entries/" + t).then(g.parse).nodeify(e);
                },
                entries: function(t, e) {
                    var n = x.parse(t);
                    return this.request("/entries", {
                        query: n
                    }).then(p.partial(j.parse, g)).nodeify(e);
                },
                space: function(t) {
                    return this.request("").nodeify(t);
                }
            }), m = v.Class({
                constructor: function() {},
                statics: {
                    parse: function(t) {
                        return p.extend(new m(), {
                            sys: k.parse(t.sys),
                            fields: t.fields
                        });
                    }
                }
            }), g = v.Class({
                constructor: function() {},
                statics: {
                    parse: function(t) {
                        return p.extend(new g(), {
                            sys: k.parse(t.sys),
                            fields: t.fields
                        });
                    }
                }
            }), b = v.Class({
                constructor: function() {},
                statics: {
                    parse: function(t) {
                        return p.extend(new b(), {
                            sys: k.parse(t.sys),
                            fields: t.fields.map(w.parse)
                        }, p.pick(t, "name", "displayField"));
                    }
                }
            }), w = v.Class({
                constructor: function() {},
                statics: {
                    parse: function(t) {
                        return p.extend(new w(), t);
                    }
                }
            }), j = v.Class({
                constructor: function() {},
                statics: {
                    parse: function(t, e) {
                        d(e, o, s);
                        var n = c(e);
                        return v(n, {
                            limit: e.limit,
                            skip: e.skip,
                            total: e.total
                        }, {
                            enumerable: !1
                        });
                    }
                }
            }), x = v.Class({
                constructor: function() {},
                toQueryString: function() {
                    return _.stringify(this);
                },
                statics: {
                    parse: function(t) {
                        return p.extend(new x(), a(t));
                    }
                }
            }), T = v.Class({
                constructor: function() {},
                statics: {
                    parse: function(t) {
                        return p.extend(new T(), t);
                    }
                }
            }), k = v.Class({
                constructor: function() {},
                statics: {
                    parse: function(t) {
                        return p.extend(new k(), p.pick(t, "id", "revision", "type", "locale"), r({
                            contentType: t.contentType && A.parse(t.contentType),
                            createdAt: t.createdAt && new Date(t.createdAt),
                            linkType: t.linkType,
                            updatedAt: t.updatedAt && new Date(t.updatedAt),
                            space: t.space && A.parse(t.space)
                        }));
                    }
                }
            }), A = v.Class({
                constructor: function() {},
                statics: {
                    parse: function(t) {
                        return p.extend(new A(), {
                            sys: k.parse(t.sys)
                        });
                    }
                }
            });
            n.createClient = p.fnull(function(t) {
                return new y(t);
            }, {});
            var E = {
                Asset: m,
                ContentType: b,
                Entry: g,
                Space: T
            };
        }, {
            querystring: 22,
            questor: 19,
            redefine: 2,
            "underscore-contrib": 3
        } ],
        2: [ function(t, e) {
            var n = this._ = function(t, n, r) {
                function i(t, e) {
                    for (var n, r = {}, i = Q(t), o = 0, s = i.length; s > o; o++) n = i[o], r[n] = X(t, n);
                    return $(void 0 === e ? Y(t) : e, r);
                }
                function o(t, e, n, r) {
                    A(n || y.defaults || {}, re), A(r, re), (J.call(r, C) || J.call(r, M)) && (delete re[D], 
                    delete re[L]), G(t, e, re), te(re);
                }
                function s(t, e, n, r) {
                    o(t, e, r, n instanceof l ? n : n instanceof v ? c(t, e, n) : (oe[L] = n, oe)), 
                    delete oe[L];
                }
                function u(t, e, n) {
                    for (var r in e) J.call(e, r) && s(t, r, e[r], n);
                }
                function a(t, e) {
                    for (var n, r = 0; r < e.length; r++) n = e[r], h(n) && (n = "mixin" === (n.type || n.name) ? n.call(n) || n : n[I]), 
                    K(t, n);
                }
                function c(t, e, n) {
                    var r, i = n._, o = J.call(n, F) ? !!n[F] : !0, s = J.call(n, R) && n[R], u = J.call(n, D) && n[D];
                    return n[C] = function() {
                        return se && (n = X(t, e), delete t[e]), re[L] = i.call(r = this), re[F] = o, re[R] = s, 
                        re[D] = u, G(r, e, re), te(re), se && (A(n, re), G(t, e, re), te(re)), r[e];
                    }, se && (n[F] = !0), n;
                }
                function l(t) {
                    A(t, this);
                }
                function f(t) {
                    return new l(t);
                }
                function d(t) {
                    return $(h(t) ? t[I] : t);
                }
                function p(t, e, n) {
                    var r = d(t);
                    return e ? y(r, e, n) : r;
                }
                function h(t) {
                    return "function" == typeof t;
                }
                function v(t) {
                    this._ = h(t) ? t : A(t, this) || t[L];
                }
                function _(t) {
                    return new v(t);
                }
                function y(t, e, n, r) {
                    return ("string" == typeof e ? s(t, e, n, r) : u(t, e, n)) || t;
                }
                function m(t) {
                    return function(e, n, r) {
                        return ("string" == typeof n ? s(e, n, r, t) : u(e, n, t)) || e;
                    };
                }
                function g(t, e) {
                    for (var n, r, i, o; e = Y(e); ) for (i = Q(e), n = i.length; n--; ) if (e[r = i[n]] === t) {
                        do o = Y(e), e = o; while (o[r] === t);
                        return o[r];
                    }
                }
                function b() {
                    return g(b.caller, this).apply(this, arguments);
                }
                function w(t, e) {
                    return "string" == typeof t ? w(this, t) : t[B + e] || j(t, e);
                }
                function j(t, e) {
                    return ee[L] = z.call(t[e], t), G(t, B + e, ee), ee[L] = w, t[B + e];
                }
                function x(t, e) {
                    var n, r = J.call(t, O) ? t[O] : function() {}, i = J.call(t, q) && t[q], s = J.call(t, S) && t[S];
                    if (e || (e = {}, e[D] = !0), delete t[O], s && (delete t[S], y(r[I] = d(s), "constructor", r), 
                    h(s))) for (n in s) J.call(s, n) && "name" !== n && "length" !== n && o(r, n, re, X(s, n));
                    return i && (delete t[q], u(r, i, ie)), J.call(t, N) && (a(r[I], [].concat(t[N])), 
                    delete t[N]), u(r[I], t, e), T(r[I]), P in r[I] || G(r[I], P, ee), r;
                }
                function T(t) {
                    return J.call(t, V) ? object : G(t, V, ne);
                }
                var k, A, E, P = "bound", F = "configurable", O = "constructor", R = "enumerable", S = "extend", C = "get", N = "mixin", B = "__@", H = "__proto__", I = "prototype", M = "set", q = "statics", V = "super", L = "value", D = "writable", U = n, z = n.bind || function(t) {
                    var e = this;
                    return function() {
                        return e.apply(t, arguments);
                    };
                }, W = function(e, n) {
                    return t[e] || r[e] || n;
                }, G = W("defineProperty"), J = W("hasOwnProperty"), X = W("getOwnPropertyDescriptor"), Q = W("getOwnPropertyNames", r.keys), Y = W("getPrototypeOf", function(t) {
                    return t[H];
                }), K = r.mixin || function(t, e) {
                    for (var n = Q(e), r = n.length; r--; o(t, n[r], re, X(e, n[r]))) ;
                    return t;
                }, $ = t.create || t.inherit || r.create, Z = [ F, R, C, M, L, D ], te = U("o", "delete o." + Z.join(";delete o.")), ee = $(null), ne = $(null), re = $(null), ie = {}, oe = {}, se = !1;
                for (ie[D] = !0, ie[R] = !0, k = 0; k < Z.length; k++) Z[k] = [ 'if(h.call(a,"', '"))b.', "=a.", ";" ].join(Z[k]);
                A = U("h", "return function(a,b){" + Z.join("") + "}")(J), ne[L] = function ae(t) {
                    return z.apply(g(ae.caller, t), arguments);
                }, ne[F] = ne[R] = ne[D] = !1, G(b, "bind", ne), ne[L] = b, ee[R] = !1, ee[F] = ee[D] = !0, 
                ee[L] = w, y.from = p, y.Class = x, y[V] = T, y.mixin = K, y.bound = w, y.clone = i, 
                y.as = f, y.later = _, y.using = m, y.defaults = {}, "undefined" != typeof e && e.exports && ((e.exports = y).redefine = y), 
                t.mixin ? t.mixin({
                    redefine: y
                }) : t.redefine = y;
                try {
                    E = $(y({}, {
                        _: _(r)
                    }))._;
                } catch (ue) {
                    te(re), se = !0;
                }
                return t;
            }(n || this, Function, Object);
        }, {} ],
        3: [ function(t, e) {
            t("./underscore.array.builders"), t("./underscore.array.selectors"), t("./underscore.collections.walk"), 
            t("./underscore.function.arity"), t("./underscore.function.combinators"), t("./underscore.function.dispatch"), 
            t("./underscore.function.iterators"), t("./underscore.function.predicates"), t("./underscore.object.builders"), 
            t("./underscore.object.selectors"), t("./underscore.util.existential"), t("./underscore.util.operators"), 
            t("./underscore.util.strings"), t("./underscore.util.trampolines"), e.exports = t("underscore");
        }, {
            "./underscore.array.builders": 5,
            "./underscore.array.selectors": 6,
            "./underscore.collections.walk": 7,
            "./underscore.function.arity": 8,
            "./underscore.function.combinators": 9,
            "./underscore.function.dispatch": 10,
            "./underscore.function.iterators": 11,
            "./underscore.function.predicates": 12,
            "./underscore.object.builders": 13,
            "./underscore.object.selectors": 14,
            "./underscore.util.existential": 15,
            "./underscore.util.operators": 16,
            "./underscore.util.strings": 17,
            "./underscore.util.trampolines": 18,
            underscore: 4
        } ],
        4: [ function(t, e, n) {
            (function() {
                var t = this, r = t._, i = {}, o = Array.prototype, s = Object.prototype, u = Function.prototype, a = o.push, c = o.slice, l = o.concat, f = s.toString, d = s.hasOwnProperty, p = o.forEach, h = o.map, v = o.reduce, _ = o.reduceRight, y = o.filter, m = o.every, g = o.some, b = o.indexOf, w = o.lastIndexOf, j = Array.isArray, x = Object.keys, T = u.bind, k = function(t) {
                    return t instanceof k ? t : this instanceof k ? void (this._wrapped = t) : new k(t);
                };
                "undefined" != typeof n ? ("undefined" != typeof e && e.exports && (n = e.exports = k), 
                n._ = k) : t._ = k, k.VERSION = "1.5.2";
                var A = k.each = k.forEach = function(t, e, n) {
                    if (null != t) if (p && t.forEach === p) t.forEach(e, n); else if (t.length === +t.length) {
                        for (var r = 0, o = t.length; o > r; r++) if (e.call(n, t[r], r, t) === i) return;
                    } else for (var s = k.keys(t), r = 0, o = s.length; o > r; r++) if (e.call(n, t[s[r]], s[r], t) === i) return;
                };
                k.map = k.collect = function(t, e, n) {
                    var r = [];
                    return null == t ? r : h && t.map === h ? t.map(e, n) : (A(t, function(t, i, o) {
                        r.push(e.call(n, t, i, o));
                    }), r);
                };
                var E = "Reduce of empty array with no initial value";
                k.reduce = k.foldl = k.inject = function(t, e, n, r) {
                    var i = arguments.length > 2;
                    if (null == t && (t = []), v && t.reduce === v) return r && (e = k.bind(e, r)), 
                    i ? t.reduce(e, n) : t.reduce(e);
                    if (A(t, function(t, o, s) {
                        i ? n = e.call(r, n, t, o, s) : (n = t, i = !0);
                    }), !i) throw new TypeError(E);
                    return n;
                }, k.reduceRight = k.foldr = function(t, e, n, r) {
                    var i = arguments.length > 2;
                    if (null == t && (t = []), _ && t.reduceRight === _) return r && (e = k.bind(e, r)), 
                    i ? t.reduceRight(e, n) : t.reduceRight(e);
                    var o = t.length;
                    if (o !== +o) {
                        var s = k.keys(t);
                        o = s.length;
                    }
                    if (A(t, function(u, a, c) {
                        a = s ? s[--o] : --o, i ? n = e.call(r, n, t[a], a, c) : (n = t[a], i = !0);
                    }), !i) throw new TypeError(E);
                    return n;
                }, k.find = k.detect = function(t, e, n) {
                    var r;
                    return P(t, function(t, i, o) {
                        return e.call(n, t, i, o) ? (r = t, !0) : void 0;
                    }), r;
                }, k.filter = k.select = function(t, e, n) {
                    var r = [];
                    return null == t ? r : y && t.filter === y ? t.filter(e, n) : (A(t, function(t, i, o) {
                        e.call(n, t, i, o) && r.push(t);
                    }), r);
                }, k.reject = function(t, e, n) {
                    return k.filter(t, function(t, r, i) {
                        return !e.call(n, t, r, i);
                    }, n);
                }, k.every = k.all = function(t, e, n) {
                    e || (e = k.identity);
                    var r = !0;
                    return null == t ? r : m && t.every === m ? t.every(e, n) : (A(t, function(t, o, s) {
                        return (r = r && e.call(n, t, o, s)) ? void 0 : i;
                    }), !!r);
                };
                var P = k.some = k.any = function(t, e, n) {
                    e || (e = k.identity);
                    var r = !1;
                    return null == t ? r : g && t.some === g ? t.some(e, n) : (A(t, function(t, o, s) {
                        return r || (r = e.call(n, t, o, s)) ? i : void 0;
                    }), !!r);
                };
                k.contains = k.include = function(t, e) {
                    return null == t ? !1 : b && t.indexOf === b ? -1 != t.indexOf(e) : P(t, function(t) {
                        return t === e;
                    });
                }, k.invoke = function(t, e) {
                    var n = c.call(arguments, 2), r = k.isFunction(e);
                    return k.map(t, function(t) {
                        return (r ? e : t[e]).apply(t, n);
                    });
                }, k.pluck = function(t, e) {
                    return k.map(t, function(t) {
                        return t[e];
                    });
                }, k.where = function(t, e, n) {
                    return k.isEmpty(e) ? n ? void 0 : [] : k[n ? "find" : "filter"](t, function(t) {
                        for (var n in e) if (e[n] !== t[n]) return !1;
                        return !0;
                    });
                }, k.findWhere = function(t, e) {
                    return k.where(t, e, !0);
                }, k.max = function(t, e, n) {
                    if (!e && k.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.max.apply(Math, t);
                    if (!e && k.isEmpty(t)) return -1 / 0;
                    var r = {
                        computed: -1 / 0,
                        value: -1 / 0
                    };
                    return A(t, function(t, i, o) {
                        var s = e ? e.call(n, t, i, o) : t;
                        s > r.computed && (r = {
                            value: t,
                            computed: s
                        });
                    }), r.value;
                }, k.min = function(t, e, n) {
                    if (!e && k.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.min.apply(Math, t);
                    if (!e && k.isEmpty(t)) return 1 / 0;
                    var r = {
                        computed: 1 / 0,
                        value: 1 / 0
                    };
                    return A(t, function(t, i, o) {
                        var s = e ? e.call(n, t, i, o) : t;
                        s < r.computed && (r = {
                            value: t,
                            computed: s
                        });
                    }), r.value;
                }, k.shuffle = function(t) {
                    var e, n = 0, r = [];
                    return A(t, function(t) {
                        e = k.random(n++), r[n - 1] = r[e], r[e] = t;
                    }), r;
                }, k.sample = function(t, e, n) {
                    return arguments.length < 2 || n ? t[k.random(t.length - 1)] : k.shuffle(t).slice(0, Math.max(0, e));
                };
                var F = function(t) {
                    return k.isFunction(t) ? t : function(e) {
                        return e[t];
                    };
                };
                k.sortBy = function(t, e, n) {
                    var r = F(e);
                    return k.pluck(k.map(t, function(t, e, i) {
                        return {
                            value: t,
                            index: e,
                            criteria: r.call(n, t, e, i)
                        };
                    }).sort(function(t, e) {
                        var n = t.criteria, r = e.criteria;
                        if (n !== r) {
                            if (n > r || void 0 === n) return 1;
                            if (r > n || void 0 === r) return -1;
                        }
                        return t.index - e.index;
                    }), "value");
                };
                var O = function(t) {
                    return function(e, n, r) {
                        var i = {}, o = null == n ? k.identity : F(n);
                        return A(e, function(n, s) {
                            var u = o.call(r, n, s, e);
                            t(i, u, n);
                        }), i;
                    };
                };
                k.groupBy = O(function(t, e, n) {
                    (k.has(t, e) ? t[e] : t[e] = []).push(n);
                }), k.indexBy = O(function(t, e, n) {
                    t[e] = n;
                }), k.countBy = O(function(t, e) {
                    k.has(t, e) ? t[e]++ : t[e] = 1;
                }), k.sortedIndex = function(t, e, n, r) {
                    n = null == n ? k.identity : F(n);
                    for (var i = n.call(r, e), o = 0, s = t.length; s > o; ) {
                        var u = o + s >>> 1;
                        n.call(r, t[u]) < i ? o = u + 1 : s = u;
                    }
                    return o;
                }, k.toArray = function(t) {
                    return t ? k.isArray(t) ? c.call(t) : t.length === +t.length ? k.map(t, k.identity) : k.values(t) : [];
                }, k.size = function(t) {
                    return null == t ? 0 : t.length === +t.length ? t.length : k.keys(t).length;
                }, k.first = k.head = k.take = function(t, e, n) {
                    return null == t ? void 0 : null == e || n ? t[0] : c.call(t, 0, e);
                }, k.initial = function(t, e, n) {
                    return c.call(t, 0, t.length - (null == e || n ? 1 : e));
                }, k.last = function(t, e, n) {
                    return null == t ? void 0 : null == e || n ? t[t.length - 1] : c.call(t, Math.max(t.length - e, 0));
                }, k.rest = k.tail = k.drop = function(t, e, n) {
                    return c.call(t, null == e || n ? 1 : e);
                }, k.compact = function(t) {
                    return k.filter(t, k.identity);
                };
                var R = function(t, e, n) {
                    return e && k.every(t, k.isArray) ? l.apply(n, t) : (A(t, function(t) {
                        k.isArray(t) || k.isArguments(t) ? e ? a.apply(n, t) : R(t, e, n) : n.push(t);
                    }), n);
                };
                k.flatten = function(t, e) {
                    return R(t, e, []);
                }, k.without = function(t) {
                    return k.difference(t, c.call(arguments, 1));
                }, k.uniq = k.unique = function(t, e, n, r) {
                    k.isFunction(e) && (r = n, n = e, e = !1);
                    var i = n ? k.map(t, n, r) : t, o = [], s = [];
                    return A(i, function(n, r) {
                        (e ? r && s[s.length - 1] === n : k.contains(s, n)) || (s.push(n), o.push(t[r]));
                    }), o;
                }, k.union = function() {
                    return k.uniq(k.flatten(arguments, !0));
                }, k.intersection = function(t) {
                    var e = c.call(arguments, 1);
                    return k.filter(k.uniq(t), function(t) {
                        return k.every(e, function(e) {
                            return k.indexOf(e, t) >= 0;
                        });
                    });
                }, k.difference = function(t) {
                    var e = l.apply(o, c.call(arguments, 1));
                    return k.filter(t, function(t) {
                        return !k.contains(e, t);
                    });
                }, k.zip = function() {
                    for (var t = k.max(k.pluck(arguments, "length").concat(0)), e = new Array(t), n = 0; t > n; n++) e[n] = k.pluck(arguments, "" + n);
                    return e;
                }, k.object = function(t, e) {
                    if (null == t) return {};
                    for (var n = {}, r = 0, i = t.length; i > r; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
                    return n;
                }, k.indexOf = function(t, e, n) {
                    if (null == t) return -1;
                    var r = 0, i = t.length;
                    if (n) {
                        if ("number" != typeof n) return r = k.sortedIndex(t, e), t[r] === e ? r : -1;
                        r = 0 > n ? Math.max(0, i + n) : n;
                    }
                    if (b && t.indexOf === b) return t.indexOf(e, n);
                    for (;i > r; r++) if (t[r] === e) return r;
                    return -1;
                }, k.lastIndexOf = function(t, e, n) {
                    if (null == t) return -1;
                    var r = null != n;
                    if (w && t.lastIndexOf === w) return r ? t.lastIndexOf(e, n) : t.lastIndexOf(e);
                    for (var i = r ? n : t.length; i--; ) if (t[i] === e) return i;
                    return -1;
                }, k.range = function(t, e, n) {
                    arguments.length <= 1 && (e = t || 0, t = 0), n = arguments[2] || 1;
                    for (var r = Math.max(Math.ceil((e - t) / n), 0), i = 0, o = new Array(r); r > i; ) o[i++] = t, 
                    t += n;
                    return o;
                };
                var S = function() {};
                k.bind = function(t, e) {
                    var n, r;
                    if (T && t.bind === T) return T.apply(t, c.call(arguments, 1));
                    if (!k.isFunction(t)) throw new TypeError();
                    return n = c.call(arguments, 2), r = function() {
                        if (!(this instanceof r)) return t.apply(e, n.concat(c.call(arguments)));
                        S.prototype = t.prototype;
                        var i = new S();
                        S.prototype = null;
                        var o = t.apply(i, n.concat(c.call(arguments)));
                        return Object(o) === o ? o : i;
                    };
                }, k.partial = function(t) {
                    var e = c.call(arguments, 1);
                    return function() {
                        return t.apply(this, e.concat(c.call(arguments)));
                    };
                }, k.bindAll = function(t) {
                    var e = c.call(arguments, 1);
                    if (0 === e.length) throw new Error("bindAll must be passed function names");
                    return A(e, function(e) {
                        t[e] = k.bind(t[e], t);
                    }), t;
                }, k.memoize = function(t, e) {
                    var n = {};
                    return e || (e = k.identity), function() {
                        var r = e.apply(this, arguments);
                        return k.has(n, r) ? n[r] : n[r] = t.apply(this, arguments);
                    };
                }, k.delay = function(t, e) {
                    var n = c.call(arguments, 2);
                    return setTimeout(function() {
                        return t.apply(null, n);
                    }, e);
                }, k.defer = function(t) {
                    return k.delay.apply(k, [ t, 1 ].concat(c.call(arguments, 1)));
                }, k.throttle = function(t, e, n) {
                    var r, i, o, s = null, u = 0;
                    n || (n = {});
                    var a = function() {
                        u = n.leading === !1 ? 0 : new Date(), s = null, o = t.apply(r, i);
                    };
                    return function() {
                        var c = new Date();
                        u || n.leading !== !1 || (u = c);
                        var l = e - (c - u);
                        return r = this, i = arguments, 0 >= l ? (clearTimeout(s), s = null, u = c, o = t.apply(r, i)) : s || n.trailing === !1 || (s = setTimeout(a, l)), 
                        o;
                    };
                }, k.debounce = function(t, e, n) {
                    var r, i, o, s, u;
                    return function() {
                        o = this, i = arguments, s = new Date();
                        var a = function() {
                            var c = new Date() - s;
                            e > c ? r = setTimeout(a, e - c) : (r = null, n || (u = t.apply(o, i)));
                        }, c = n && !r;
                        return r || (r = setTimeout(a, e)), c && (u = t.apply(o, i)), u;
                    };
                }, k.once = function(t) {
                    var e, n = !1;
                    return function() {
                        return n ? e : (n = !0, e = t.apply(this, arguments), t = null, e);
                    };
                }, k.wrap = function(t, e) {
                    return function() {
                        var n = [ t ];
                        return a.apply(n, arguments), e.apply(this, n);
                    };
                }, k.compose = function() {
                    var t = arguments;
                    return function() {
                        for (var e = arguments, n = t.length - 1; n >= 0; n--) e = [ t[n].apply(this, e) ];
                        return e[0];
                    };
                }, k.after = function(t, e) {
                    return function() {
                        return --t < 1 ? e.apply(this, arguments) : void 0;
                    };
                }, k.keys = x || function(t) {
                    if (t !== Object(t)) throw new TypeError("Invalid object");
                    var e = [];
                    for (var n in t) k.has(t, n) && e.push(n);
                    return e;
                }, k.values = function(t) {
                    for (var e = k.keys(t), n = e.length, r = new Array(n), i = 0; n > i; i++) r[i] = t[e[i]];
                    return r;
                }, k.pairs = function(t) {
                    for (var e = k.keys(t), n = e.length, r = new Array(n), i = 0; n > i; i++) r[i] = [ e[i], t[e[i]] ];
                    return r;
                }, k.invert = function(t) {
                    for (var e = {}, n = k.keys(t), r = 0, i = n.length; i > r; r++) e[t[n[r]]] = n[r];
                    return e;
                }, k.functions = k.methods = function(t) {
                    var e = [];
                    for (var n in t) k.isFunction(t[n]) && e.push(n);
                    return e.sort();
                }, k.extend = function(t) {
                    return A(c.call(arguments, 1), function(e) {
                        if (e) for (var n in e) t[n] = e[n];
                    }), t;
                }, k.pick = function(t) {
                    var e = {}, n = l.apply(o, c.call(arguments, 1));
                    return A(n, function(n) {
                        n in t && (e[n] = t[n]);
                    }), e;
                }, k.omit = function(t) {
                    var e = {}, n = l.apply(o, c.call(arguments, 1));
                    for (var r in t) k.contains(n, r) || (e[r] = t[r]);
                    return e;
                }, k.defaults = function(t) {
                    return A(c.call(arguments, 1), function(e) {
                        if (e) for (var n in e) void 0 === t[n] && (t[n] = e[n]);
                    }), t;
                }, k.clone = function(t) {
                    return k.isObject(t) ? k.isArray(t) ? t.slice() : k.extend({}, t) : t;
                }, k.tap = function(t, e) {
                    return e(t), t;
                };
                var C = function(t, e, n, r) {
                    if (t === e) return 0 !== t || 1 / t == 1 / e;
                    if (null == t || null == e) return t === e;
                    t instanceof k && (t = t._wrapped), e instanceof k && (e = e._wrapped);
                    var i = f.call(t);
                    if (i != f.call(e)) return !1;
                    switch (i) {
                      case "[object String]":
                        return t == String(e);

                      case "[object Number]":
                        return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;

                      case "[object Date]":
                      case "[object Boolean]":
                        return +t == +e;

                      case "[object RegExp]":
                        return t.source == e.source && t.global == e.global && t.multiline == e.multiline && t.ignoreCase == e.ignoreCase;
                    }
                    if ("object" != typeof t || "object" != typeof e) return !1;
                    for (var o = n.length; o--; ) if (n[o] == t) return r[o] == e;
                    var s = t.constructor, u = e.constructor;
                    if (s !== u && !(k.isFunction(s) && s instanceof s && k.isFunction(u) && u instanceof u)) return !1;
                    n.push(t), r.push(e);
                    var a = 0, c = !0;
                    if ("[object Array]" == i) {
                        if (a = t.length, c = a == e.length) for (;a-- && (c = C(t[a], e[a], n, r)); ) ;
                    } else {
                        for (var l in t) if (k.has(t, l) && (a++, !(c = k.has(e, l) && C(t[l], e[l], n, r)))) break;
                        if (c) {
                            for (l in e) if (k.has(e, l) && !a--) break;
                            c = !a;
                        }
                    }
                    return n.pop(), r.pop(), c;
                };
                k.isEqual = function(t, e) {
                    return C(t, e, [], []);
                }, k.isEmpty = function(t) {
                    if (null == t) return !0;
                    if (k.isArray(t) || k.isString(t)) return 0 === t.length;
                    for (var e in t) if (k.has(t, e)) return !1;
                    return !0;
                }, k.isElement = function(t) {
                    return !(!t || 1 !== t.nodeType);
                }, k.isArray = j || function(t) {
                    return "[object Array]" == f.call(t);
                }, k.isObject = function(t) {
                    return t === Object(t);
                }, A([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(t) {
                    k["is" + t] = function(e) {
                        return f.call(e) == "[object " + t + "]";
                    };
                }), k.isArguments(arguments) || (k.isArguments = function(t) {
                    return !(!t || !k.has(t, "callee"));
                }), "function" != typeof /./ && (k.isFunction = function(t) {
                    return "function" == typeof t;
                }), k.isFinite = function(t) {
                    return isFinite(t) && !isNaN(parseFloat(t));
                }, k.isNaN = function(t) {
                    return k.isNumber(t) && t != +t;
                }, k.isBoolean = function(t) {
                    return t === !0 || t === !1 || "[object Boolean]" == f.call(t);
                }, k.isNull = function(t) {
                    return null === t;
                }, k.isUndefined = function(t) {
                    return void 0 === t;
                }, k.has = function(t, e) {
                    return d.call(t, e);
                }, k.noConflict = function() {
                    return t._ = r, this;
                }, k.identity = function(t) {
                    return t;
                }, k.times = function(t, e, n) {
                    for (var r = Array(Math.max(0, t)), i = 0; t > i; i++) r[i] = e.call(n, i);
                    return r;
                }, k.random = function(t, e) {
                    return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1));
                };
                var N = {
                    escape: {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#x27;"
                    }
                };
                N.unescape = k.invert(N.escape);
                var B = {
                    escape: new RegExp("[" + k.keys(N.escape).join("") + "]", "g"),
                    unescape: new RegExp("(" + k.keys(N.unescape).join("|") + ")", "g")
                };
                k.each([ "escape", "unescape" ], function(t) {
                    k[t] = function(e) {
                        return null == e ? "" : ("" + e).replace(B[t], function(e) {
                            return N[t][e];
                        });
                    };
                }), k.result = function(t, e) {
                    if (null == t) return void 0;
                    var n = t[e];
                    return k.isFunction(n) ? n.call(t) : n;
                }, k.mixin = function(t) {
                    A(k.functions(t), function(e) {
                        var n = k[e] = t[e];
                        k.prototype[e] = function() {
                            var t = [ this._wrapped ];
                            return a.apply(t, arguments), V.call(this, n.apply(k, t));
                        };
                    });
                };
                var H = 0;
                k.uniqueId = function(t) {
                    var e = ++H + "";
                    return t ? t + e : e;
                }, k.templateSettings = {
                    evaluate: /<%([\s\S]+?)%>/g,
                    interpolate: /<%=([\s\S]+?)%>/g,
                    escape: /<%-([\s\S]+?)%>/g
                };
                var I = /(.)^/, M = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "	": "t",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                }, q = /\\|'|\r|\n|\t|\u2028|\u2029/g;
                k.template = function(t, e, n) {
                    var r;
                    n = k.defaults({}, n, k.templateSettings);
                    var i = new RegExp([ (n.escape || I).source, (n.interpolate || I).source, (n.evaluate || I).source ].join("|") + "|$", "g"), o = 0, s = "__p+='";
                    t.replace(i, function(e, n, r, i, u) {
                        return s += t.slice(o, u).replace(q, function(t) {
                            return "\\" + M[t];
                        }), n && (s += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), r && (s += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), 
                        i && (s += "';\n" + i + "\n__p+='"), o = u + e.length, e;
                    }), s += "';\n", n.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
                    try {
                        r = new Function(n.variable || "obj", "_", s);
                    } catch (u) {
                        throw u.source = s, u;
                    }
                    if (e) return r(e, k);
                    var a = function(t) {
                        return r.call(this, t, k);
                    };
                    return a.source = "function(" + (n.variable || "obj") + "){\n" + s + "}", a;
                }, k.chain = function(t) {
                    return k(t).chain();
                };
                var V = function(t) {
                    return this._chain ? k(t).chain() : t;
                };
                k.mixin(k), A([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(t) {
                    var e = o[t];
                    k.prototype[t] = function() {
                        var n = this._wrapped;
                        return e.apply(n, arguments), "shift" != t && "splice" != t || 0 !== n.length || delete n[0], 
                        V.call(this, n);
                    };
                }), A([ "concat", "join", "slice" ], function(t) {
                    var e = o[t];
                    k.prototype[t] = function() {
                        return V.call(this, e.apply(this._wrapped, arguments));
                    };
                }), k.extend(k.prototype, {
                    chain: function() {
                        return this._chain = !0, this;
                    },
                    value: function() {
                        return this._wrapped;
                    }
                });
            }).call(this);
        }, {} ],
        5: [ function(t) {
            !function(e) {
                var n = e._ || t("underscore"), r = Array.prototype.slice, i = Array.prototype.concat, o = function(t) {
                    return null != t;
                };
                n.mixin({
                    cat: function() {
                        return n.reduce(arguments, function(t, e) {
                            return n.isArguments(e) ? i.call(t, r.call(e)) : i.call(t, e);
                        }, []);
                    },
                    cons: function(t, e) {
                        return n.cat([ t ], e);
                    },
                    partition: function(t, e, r) {
                        var i = function(t) {
                            if (null == t) return [];
                            var o = n.take(t, e);
                            return e === n.size(o) ? n.cons(o, i(n.drop(t, e))) : r ? [ n.take(n.cat(o, r), e) ] : [];
                        };
                        return i(t);
                    },
                    partitionAll: function(t, e, r) {
                        r = null != r ? r : e;
                        var i = function(t, e, r) {
                            return n.isEmpty(t) ? [] : n.cons(n.take(t, e), i(n.drop(t, r), e, r));
                        };
                        return i(t, e, r);
                    },
                    mapcat: function(t, e) {
                        return n.cat.apply(null, n.map(t, e));
                    },
                    interpose: function(t, e) {
                        if (!n.isArray(t)) throw new TypeError();
                        var i = n.size(t);
                        return 0 === i ? t : 1 === i ? t : r.call(n.mapcat(t, function(t) {
                            return n.cons(t, [ e ]);
                        }), 0, -1);
                    },
                    weave: function() {
                        return n.some(arguments) ? 1 == arguments.length ? arguments[0] : n.filter(n.flatten(n.zip.apply(null, arguments), !0), function(t) {
                            return null != t;
                        }) : [];
                    },
                    interleave: n.weave,
                    repeat: function(t, e) {
                        return n.times(t, function() {
                            return e;
                        });
                    },
                    cycle: function(t, e) {
                        return n.flatten(n.times(t, function() {
                            return e;
                        }), !0);
                    },
                    splitAt: function(t, e) {
                        return [ n.take(t, e), n.drop(t, e) ];
                    },
                    iterateUntil: function(t, e, n) {
                        for (var r = [], i = t(n); e(i); ) r.push(i), i = t(i);
                        return r;
                    },
                    takeSkipping: function(t, e) {
                        var r = [], i = n.size(t);
                        if (0 >= e) return [];
                        if (1 === e) return t;
                        for (var o = 0; i > o; o += e) r.push(t[o]);
                        return r;
                    },
                    reductions: function(t, e, r) {
                        var i = [], o = r;
                        return n.each(t, function(n, r) {
                            o = e(o, t[r]), i.push(o);
                        }), i;
                    },
                    keepIndexed: function(t, e) {
                        return n.filter(n.map(n.range(n.size(t)), function(n) {
                            return e(n, t[n]);
                        }), o);
                    },
                    reverseOrder: function(t) {
                        if ("string" == typeof t) throw new TypeError("Strings cannot be reversed by _.reverseOrder");
                        return r.call(t).reverse();
                    }
                });
            }(this);
        }, {
            underscore: 4
        } ],
        6: [ function(t) {
            !function(e) {
                var n = e._ || t("underscore"), r = Array.prototype.slice, i = Array.prototype.concat, o = function(t) {
                    return null != t;
                }, s = function(t) {
                    return t !== !1 && o(t);
                }, u = function(t) {
                    return n.isArray(t) || n.isArguments(t);
                };
                n.mixin({
                    second: function(t, e, n) {
                        return null == t ? void 0 : null == e || n ? t[1] : r.call(t, 1, e);
                    },
                    third: function(t, e, n) {
                        return null == t ? void 0 : null == e || n ? t[2] : r.call(t, 2, e);
                    },
                    nth: function(t, e, n) {
                        return null == e || n ? void 0 : t[e];
                    },
                    takeWhile: function(t, e) {
                        if (!u(t)) throw new TypeError();
                        for (var r = n.size(t), i = 0; r > i && s(e(t[i])); i++) ;
                        return n.take(t, i);
                    },
                    dropWhile: function(t, e) {
                        if (!u(t)) throw new TypeError();
                        for (var r = n.size(t), i = 0; r > i && s(e(t[i])); i++) ;
                        return n.drop(t, i);
                    },
                    splitWith: function(t, e) {
                        return [ n.takeWhile(t, e), n.dropWhile(t, e) ];
                    },
                    partitionBy: function(t, e) {
                        if (n.isEmpty(t) || !o(t)) return [];
                        var r = n.first(t), s = e(r), u = i.call([ r ], n.takeWhile(n.rest(t), function(t) {
                            return n.isEqual(s, e(t));
                        }));
                        return i.call([ u ], n.partitionBy(n.drop(t, n.size(u)), e));
                    },
                    best: function(t, e) {
                        return n.reduce(t, function(t, n) {
                            return e(t, n) ? t : n;
                        });
                    },
                    keep: function(t, e) {
                        if (!u(t)) throw new TypeError("expected an array as the first argument");
                        return n.filter(n.map(t, function(t) {
                            return e(t);
                        }), o);
                    }
                });
            }(this);
        }, {
            underscore: 4
        } ],
        7: [ function(t) {
            !function(e) {
                function n(t) {
                    return o.isElement(t) ? t.children : t;
                }
                function r(t, e, n, r, i, c) {
                    var l = [];
                    return function f(t, d, p) {
                        if (o.isObject(t)) {
                            if (l.indexOf(t) >= 0) throw new TypeError(a);
                            l.push(t);
                        }
                        if (n) {
                            var h = n.call(i, t, d, p);
                            if (h === u) return u;
                            if (h === s) return;
                        }
                        var v, _ = e(t);
                        if (o.isObject(_) && !o.isEmpty(_)) {
                            c && (v = o.isArray(t) ? [] : {});
                            var y = o.any(_, function(e, n) {
                                var r = f(e, n, t);
                                return r === u ? !0 : void (v && (v[n] = r));
                            });
                            if (y) return u;
                        }
                        return r ? r.call(i, t, d, p, v) : void 0;
                    }(t);
                }
                function i(t, e, n) {
                    var r = [];
                    return this.preorder(t, function(t, i) {
                        return n || i != e ? void (o.has(t, e) && (r[r.length] = t[e])) : s;
                    }), r;
                }
                var o = e._ || t("underscore"), s = {}, u = {}, a = "Not a tree: same object found in two different branches", c = {
                    find: function(t, e, n) {
                        var r;
                        return this.preorder(t, function(t, i, o) {
                            return e.call(n, t, i, o) ? (r = t, u) : void 0;
                        }, n), r;
                    },
                    filter: function(t, e, n, r) {
                        var i = [];
                        return null == t ? i : (e(t, function(t, e, o) {
                            n.call(r, t, e, o) && i.push(t);
                        }, null, this._traversalStrategy), i);
                    },
                    reject: function(t, e, n, r) {
                        return this.filter(t, e, function(t, e, i) {
                            return !n.call(r, t, e, i);
                        });
                    },
                    map: function(t, e, n, r) {
                        var i = [];
                        return e(t, function(t, e, o) {
                            i[i.length] = n.call(r, t, e, o);
                        }, null, this._traversalStrategy), i;
                    },
                    pluck: function(t, e) {
                        return i.call(this, t, e, !1);
                    },
                    pluckRec: function(t, e) {
                        return i.call(this, t, e, !0);
                    },
                    postorder: function(t, e, n, i) {
                        i = i || this._traversalStrategy, r(t, i, null, e, n);
                    },
                    preorder: function(t, e, n, i) {
                        i = i || this._traversalStrategy, r(t, i, e, null, n);
                    },
                    reduce: function(t, e, n, i) {
                        var o = function(t, r, i, o) {
                            return e(o || n, t, r, i);
                        };
                        return r(t, this._traversalStrategy, null, o, i, !0);
                    }
                };
                c.collect = c.map, c.detect = c.find, c.select = c.filter, o.walk = function(t) {
                    var e = o.clone(c);
                    return o.bindAll.apply(null, [ e ].concat(o.keys(e))), e._traversalStrategy = t || n, 
                    e;
                }, o.extend(o.walk, o.walk());
            }(this);
        }, {
            underscore: 4
        } ],
        8: [ function(t) {
            !function(e) {
                function n(t) {
                    return function() {
                        if (1 === arguments.length) return t.apply(this, arguments);
                        throw new RangeError("Only a single argument may be accepted.");
                    };
                }
                var r = e._ || t("underscore"), i = function() {
                    function t(e, r, i, o, s, u) {
                        return u === !0 ? o.unshift(s) : o.push(s), o.length == i ? e.apply(r, o) : n(function() {
                            return t(e, r, i, o.slice(0), arguments[0], u);
                        });
                    }
                    return function(e, r) {
                        var i = this;
                        return n(function() {
                            return t(e, i, e.length, [], arguments[0], r);
                        });
                    };
                }(), o = function() {
                    var t = [];
                    return function(e) {
                        if ("function" != typeof e) throw new Error("Argument 1 must be a function.");
                        var n = e.length;
                        return void 0 === t[n] && (t[n] = function(t) {
                            return function() {
                                if (arguments.length !== n) throw new RangeError(n + " arguments must be applied.");
                                return t.apply(this, arguments);
                            };
                        }), t[n](e);
                    };
                }();
                r.mixin({
                    fix: function(t) {
                        var e = r.rest(arguments), n = function() {
                            for (var n = e.slice(), i = 0, o = 0; o < n.length || i < arguments.length; o++) n[o] === r && (n[o] = arguments[i++]);
                            return t.apply(null, n);
                        };
                        return n._original = t, n;
                    },
                    unary: function(t) {
                        return function(e) {
                            return t.call(this, e);
                        };
                    },
                    binary: function(t) {
                        return function(e, n) {
                            return t.call(this, e, n);
                        };
                    },
                    ternary: function(t) {
                        return function(e, n, r) {
                            return t.call(this, e, n, r);
                        };
                    },
                    quaternary: function(t) {
                        return function(e, n, r, i) {
                            return t.call(this, e, n, r, i);
                        };
                    },
                    curry: i,
                    rCurry: function(t) {
                        return i.call(this, t, !0);
                    },
                    curry2: function(t) {
                        return n(function(e) {
                            return n(function(n) {
                                return t.call(this, e, n);
                            });
                        });
                    },
                    curry3: function(t) {
                        return n(function(e) {
                            return n(function(r) {
                                return n(function(n) {
                                    return t.call(this, e, r, n);
                                });
                            });
                        });
                    },
                    rcurry2: function(t) {
                        return n(function(e) {
                            return n(function(n) {
                                return t.call(this, n, e);
                            });
                        });
                    },
                    rcurry3: function(t) {
                        return n(function(e) {
                            return n(function(r) {
                                return n(function(n) {
                                    return t.call(this, n, r, e);
                                });
                            });
                        });
                    },
                    enforce: o
                }), r.arity = function() {
                    var t = {};
                    return function e(n, r) {
                        if (null == t[n]) {
                            for (var i = new Array(n), o = 0; n > o; ++o) i[o] = "__" + o;
                            var s = i.join(), u = "return function (" + s + ") { return fun.apply(this, arguments); };";
                            t[n] = new Function([ "fun" ], u);
                        }
                        return null == r ? function(t) {
                            return e(n, t);
                        } : t[n](r);
                    };
                }();
            }(this);
        }, {
            underscore: 4
        } ],
        9: [ function(t) {
            !function(e) {
                function n(t, e) {
                    return r.arity(t.length, function() {
                        return t.apply(this, a.call(arguments, e));
                    });
                }
                var r = e._ || t("underscore"), i = function(t) {
                    return null != t;
                }, o = function(t) {
                    return t !== !1 && i(t);
                }, s = [].reverse, u = [].slice, a = [].map, c = function(t) {
                    return function(e, n) {
                        return 1 === arguments.length ? function(n) {
                            return t(e, n);
                        } : t(e, n);
                    };
                };
                r.mixin({
                    always: function(t) {
                        return function() {
                            return t;
                        };
                    },
                    pipeline: function() {
                        var t = r.isArray(arguments[0]) ? arguments[0] : arguments;
                        return function(e) {
                            return r.reduce(t, function(t, e) {
                                return e(t);
                            }, e);
                        };
                    },
                    conjoin: function() {
                        var t = arguments;
                        return function(e) {
                            return r.every(e, function(e) {
                                return r.every(t, function(t) {
                                    return t(e);
                                });
                            });
                        };
                    },
                    disjoin: function() {
                        var t = arguments;
                        return function(e) {
                            return r.some(e, function(e) {
                                return r.some(t, function(t) {
                                    return t(e);
                                });
                            });
                        };
                    },
                    comparator: function(t) {
                        return function(e, n) {
                            return o(t(e, n)) ? -1 : o(t(n, e)) ? 1 : 0;
                        };
                    },
                    complement: function(t) {
                        return function() {
                            return !t.apply(null, arguments);
                        };
                    },
                    splat: function(t) {
                        return function(e) {
                            return t.apply(null, e);
                        };
                    },
                    unsplat: function(t) {
                        var e = t.length;
                        return 1 > e ? t : 1 === e ? function() {
                            return t.call(this, u.call(arguments, 0));
                        } : function() {
                            var n = arguments.length, r = u.call(arguments, 0, e - 1), i = Math.max(e - n - 1, 0), o = new Array(i), s = u.call(arguments, t.length - 1);
                            return t.apply(this, r.concat(o).concat([ s ]));
                        };
                    },
                    unsplatl: function(t) {
                        var e = t.length;
                        return 1 > e ? t : 1 === e ? function() {
                            return t.call(this, u.call(arguments, 0));
                        } : function() {
                            var n = arguments.length, r = u.call(arguments, Math.max(n - e + 1, 0)), i = u.call(arguments, 0, Math.max(n - e + 1, 0));
                            return t.apply(this, [ i ].concat(r));
                        };
                    },
                    mapArgs: c(n),
                    juxt: function() {
                        var t = arguments;
                        return function() {
                            var e = arguments;
                            return r.map(t, function(t) {
                                return t.apply(null, e);
                            });
                        };
                    },
                    fnull: function(t) {
                        var e = r.rest(arguments);
                        return function() {
                            for (var n = r.toArray(arguments), o = r.size(e), s = 0; o > s; s++) i(n[s]) || (n[s] = e[s]);
                            return t.apply(null, n);
                        };
                    },
                    flip2: function(t) {
                        return function() {
                            var e = u.call(arguments);
                            return e[0] = arguments[1], e[1] = arguments[0], t.apply(null, e);
                        };
                    },
                    flip: function(t) {
                        return function() {
                            var e = s.call(arguments);
                            return t.apply(null, e);
                        };
                    },
                    functionalize: function(t) {
                        return function(e) {
                            return t.apply(e, r.rest(arguments));
                        };
                    },
                    methodize: function(t) {
                        return function() {
                            return t.apply(null, r.cons(this, arguments));
                        };
                    },
                    k: r.always,
                    t: r.pipeline
                }), r.unsplatr = r.unsplat, r.mapArgsWith = c(r.flip(n)), r.bound = function(t, e) {
                    var n = t[e];
                    if (!r.isFunction(n)) throw new TypeError("Expected property to be a function");
                    return r.bind(n, t);
                };
            }(this);
        }, {
            underscore: 4
        } ],
        10: [ function(t) {
            !function(e) {
                var n = e._ || t("underscore"), r = Array.prototype.slice;
                n.mixin({
                    attempt: function(t, e) {
                        if (null == t) return void 0;
                        var i = t[e], o = r.call(arguments, 2);
                        return n.isFunction(i) ? i.apply(t, o) : void 0;
                    }
                });
            }(this);
        }, {
            underscore: 4
        } ],
        11: [ function(t) {
            !function(e) {
                function n(t) {
                    return function(e) {
                        return t.call(this, e);
                    };
                }
                function r(t, e, n) {
                    var r, i;
                    for (r = void 0 !== n ? n : t(), i = t(); null != i; ) r = e.call(i, r, i), i = t();
                    return r;
                }
                function i(t, e) {
                    var n = x;
                    return function() {
                        return n === x ? n = t : null != n && (n = e.call(n, n)), n;
                    };
                }
                function o(t, e) {
                    var n, r, i = t;
                    return function() {
                        return null != i ? (n = e.call(i, i), r = n[1], i = null != r ? n[0] : void 0, r) : void 0;
                    };
                }
                function s(t, e, n) {
                    var r = n;
                    return function() {
                        var n = t();
                        return null == n ? n : r = void 0 === r ? n : e.call(n, r, n);
                    };
                }
                function u(t, e, n) {
                    var r, i, o = n;
                    return function() {
                        return i = t(), null == i ? i : void 0 === o ? o = i : (r = e.call(i, o, i), o = r[0], 
                        r[1]);
                    };
                }
                function a(t, e) {
                    return function() {
                        var n;
                        return n = t(), null != n ? e.call(n, n) : void 0;
                    };
                }
                function c(t, e) {
                    var n = null;
                    return function() {
                        var r, i;
                        if (null == n) {
                            if (i = t(), null == i) return void (n = null);
                            n = e.call(i, i);
                        }
                        for (;null == r; ) if (r = n(), null == r) {
                            if (i = t(), null == i) return void (n = null);
                            n = e.call(i, i);
                        }
                        return r;
                    };
                }
                function l(t, e) {
                    return function() {
                        var n;
                        for (n = t(); null != n; ) {
                            if (e.call(n, n)) return n;
                            n = t();
                        }
                        return void 0;
                    };
                }
                function f(t, e) {
                    return l(t, function(t) {
                        return !e(t);
                    });
                }
                function d(t, e) {
                    return l(t, e)();
                }
                function p(t, e, n) {
                    for (var r = 0; e-- > 0; ) t();
                    return null != n ? function() {
                        return ++r <= n ? t() : void 0;
                    } : t;
                }
                function h(t, e) {
                    return p(t, null == e ? 1 : e);
                }
                function v(t, e) {
                    return p(t, 0, null == e ? 1 : e);
                }
                function _(t) {
                    var e = 0;
                    return function() {
                        return t[e++];
                    };
                }
                function y(t) {
                    var e, n, r;
                    return e = 0, r = [], n = function() {
                        var i, o;
                        return i = t[e++], i instanceof Array ? (r.push({
                            array: t,
                            index: e
                        }), t = i, e = 0, n()) : void 0 === i ? r.length > 0 ? (o = r.pop(), t = o.array, 
                        e = o.index, n()) : void 0 : i;
                    };
                }
                function m(t) {
                    return function() {
                        return t;
                    };
                }
                function g(t, e, n) {
                    return function() {
                        var r;
                        return t > e ? void 0 : (r = t, t += n, r);
                    };
                }
                function b(t, e, n) {
                    return function() {
                        var r;
                        return e > t ? void 0 : (r = t, t -= n, r);
                    };
                }
                function w(t, e, n) {
                    return null == t ? g(1, 1 / 0, 1) : null == e ? g(t, 1 / 0, 1) : null == n ? e >= t ? g(t, e, 1) : b(t, e, 1) : n > 0 ? g(t, e, n) : 0 > n ? b(t, e, Math.abs(n)) : k(t);
                }
                var j = e._ || t("underscore"), x = {}, T = n(w);
                j.iterators = {
                    accumulate: s,
                    accumulateWithReturn: u,
                    foldl: r,
                    reduce: r,
                    unfold: i,
                    unfoldWithReturn: o,
                    map: a,
                    mapcat: c,
                    select: l,
                    reject: f,
                    filter: l,
                    find: d,
                    slice: p,
                    drop: h,
                    take: v,
                    List: _,
                    Tree: y,
                    constant: m,
                    K: m,
                    numbers: T,
                    range: w
                };
            }(this, void 0);
        }, {
            underscore: 4
        } ],
        12: [ function(t) {
            !function(e) {
                var n = e._ || t("underscore");
                n.mixin({
                    isInstanceOf: function(t, e) {
                        return t instanceof e;
                    },
                    isAssociative: function(t) {
                        return n.isArray(t) || n.isObject(t) || n.isArguments(t);
                    },
                    isIndexed: function(t) {
                        return n.isArray(t) || n.isString(t) || n.isArguments(t);
                    },
                    isSequential: function(t) {
                        return n.isArray(t) || n.isArguments(t);
                    },
                    isPlainObject: function(t) {
                        return n.isObject(t) && t.constructor === e.Object;
                    },
                    isZero: function(t) {
                        return 0 === t;
                    },
                    isEven: function(t) {
                        return n.isFinite(t) && 0 === (1 & t);
                    },
                    isOdd: function(t) {
                        return n.isFinite(t) && !n.isEven(t);
                    },
                    isPositive: function(t) {
                        return t > 0;
                    },
                    isNegative: function(t) {
                        return 0 > t;
                    },
                    isValidDate: function(t) {
                        return n.isDate(t) && !n.isNaN(t.getTime());
                    },
                    isNumeric: function(t) {
                        return !isNaN(parseFloat(t)) && isFinite(t);
                    },
                    isInteger: function(t) {
                        return n.isNumeric(t) && t % 1 === 0;
                    },
                    isFloat: function(t) {
                        return n.isNumeric(t) && !n.isInteger(t);
                    },
                    isJSON: function(t) {
                        try {
                            JSON.parse(t);
                        } catch (e) {
                            return !1;
                        }
                        return !0;
                    },
                    isIncreasing: function() {
                        var t = n.size(arguments);
                        if (1 === t) return !0;
                        if (2 === t) return arguments[0] < arguments[1];
                        for (var e = 1; t > e; e++) if (arguments[e - 1] >= arguments[e]) return !1;
                        return !0;
                    },
                    isDecreasing: function() {
                        var t = n.size(arguments);
                        if (1 === t) return !0;
                        if (2 === t) return arguments[0] > arguments[1];
                        for (var e = 1; t > e; e++) if (arguments[e - 1] <= arguments[e]) return !1;
                        return !0;
                    }
                });
            }(this);
        }, {
            underscore: 4
        } ],
        13: [ function(t) {
            !function(e) {
                var n = e._ || t("underscore"), r = (Array.prototype.slice, Array.prototype.concat), i = function(t) {
                    return null != t;
                }, o = function(t) {
                    return t !== !1 && i(t);
                }, s = function(t) {
                    return n.isArray(t) || n.isObject(t);
                }, u = function(t) {
                    return function(e) {
                        return function(n) {
                            return t(n, e);
                        };
                    };
                };
                n.mixin({
                    merge: function() {
                        var t = n.some(arguments) ? {} : null;
                        return o(t) && n.extend.apply(null, r.call([ t ], n.toArray(arguments))), t;
                    },
                    renameKeys: function(t, e) {
                        return n.reduce(e, function(e, n, r) {
                            return i(t[r]) ? (e[n] = t[r], e) : e;
                        }, n.omit.apply(null, r.call([ t ], n.keys(e))));
                    },
                    snapshot: function(t) {
                        if (null == t || "object" != typeof t) return t;
                        var e = new t.constructor();
                        for (var r in t) t.hasOwnProperty(r) && (e[r] = n.snapshot(t[r]));
                        return e;
                    },
                    updatePath: function(t, e, r, o) {
                        if (!s(t)) throw new TypeError("Attempted to update a non-associative object.");
                        if (!i(r)) return e(t);
                        var u = n.isArray(r), a = u ? r : [ r ], c = u ? n.snapshot(t) : n.clone(t), l = n.last(a), f = c;
                        return n.each(n.initial(a), function(t) {
                            o && !n.has(f, t) && (f[t] = n.clone(o)), f = f[t];
                        }), f[l] = e(f[l]), c;
                    },
                    setPath: function(t, e, r, o) {
                        if (!i(r)) throw new TypeError("Attempted to set a property at a null path.");
                        return n.updatePath(t, function() {
                            return e;
                        }, r, o);
                    },
                    frequencies: u(n.countBy)(n.identity)
                });
            }(this);
        }, {
            underscore: 4
        } ],
        14: [ function(t) {
            !function(e) {
                var n = e._ || t("underscore"), r = Array.prototype.concat, i = Array.prototype;
                i.slice, n.mixin({
                    accessor: function(t) {
                        return function(e) {
                            return e && e[t];
                        };
                    },
                    dictionary: function(t) {
                        return function(e) {
                            return t && e && t[e];
                        };
                    },
                    selectKeys: function(t, e) {
                        return n.pick.apply(null, r.call([ t ], e));
                    },
                    kv: function(t, e) {
                        return n.has(t, e) ? [ e, t[e] ] : void 0;
                    },
                    getPath: function o(t, e) {
                        return "string" == typeof e && (e = e.split(".")), void 0 === t ? void 0 : 0 === e.length ? t : null === t ? void 0 : o(t[n.first(e)], n.rest(e));
                    },
                    hasPath: function s(t, e) {
                        "string" == typeof e && (e = e.split("."));
                        var r = e.length;
                        return null == t && r > 0 ? !1 : e[0] in t ? 1 === r ? !0 : s(t[n.first(e)], n.rest(e)) : !1;
                    },
                    pickWhen: function(t, e) {
                        var r = {};
                        return n.each(t, function(n, i) {
                            e(t[i]) && (r[i] = t[i]);
                        }), r;
                    },
                    omitWhen: function(t, e) {
                        return n.pickWhen(t, function(t) {
                            return !e(t);
                        });
                    }
                });
            }(this);
        }, {
            underscore: 4
        } ],
        15: [ function(t) {
            !function(e) {
                var n = e._ || t("underscore");
                n.mixin({
                    exists: function(t) {
                        return null != t;
                    },
                    truthy: function(t) {
                        return t !== !1 && n.exists(t);
                    },
                    falsey: function(t) {
                        return !n.truthy(t);
                    },
                    not: function(t) {
                        return !t;
                    },
                    firstExisting: function() {
                        for (var t = 0; t < arguments.length; t++) if (null != arguments[t]) return arguments[t];
                    }
                });
            }(this);
        }, {
            underscore: 4
        } ],
        16: [ function(t) {
            !function(e) {
                function n(t) {
                    return function() {
                        return E.reduce(arguments, t);
                    };
                }
                function r(t) {
                    return function() {
                        for (var e, n = 0; n < arguments.length - 1; n++) if (e = t(arguments[n], arguments[n + 1]), 
                        e === !1) return e;
                        return e;
                    };
                }
                function i(t) {
                    return function() {
                        return !t.apply(this, arguments);
                    };
                }
                function o(t, e) {
                    return t + e;
                }
                function s(t, e) {
                    return t - e;
                }
                function u(t, e) {
                    return t * e;
                }
                function a(t, e) {
                    return t / e;
                }
                function c(t, e) {
                    return t % e;
                }
                function l(t) {
                    return ++t;
                }
                function f(t) {
                    return --t;
                }
                function d(t) {
                    return -t;
                }
                function p(t, e) {
                    return t & e;
                }
                function h(t, e) {
                    return t | e;
                }
                function v(t, e) {
                    return t ^ e;
                }
                function _(t, e) {
                    return t << e;
                }
                function y(t, e) {
                    return t >> e;
                }
                function m(t, e) {
                    return t >>> e;
                }
                function g(t) {
                    return ~t;
                }
                function b(t, e) {
                    return t == e;
                }
                function w(t, e) {
                    return t === e;
                }
                function j(t) {
                    return !t;
                }
                function x(t, e) {
                    return t > e;
                }
                function T(t, e) {
                    return e > t;
                }
                function k(t, e) {
                    return t >= e;
                }
                function A(t, e) {
                    return e >= t;
                }
                var E = e._ || t("underscore");
                E.mixin({
                    add: n(o),
                    sub: n(s),
                    mul: n(u),
                    div: n(a),
                    mod: c,
                    inc: l,
                    dec: f,
                    neg: d,
                    eq: r(b),
                    seq: r(w),
                    neq: i(r(b)),
                    sneq: i(r(w)),
                    not: j,
                    gt: r(x),
                    lt: r(T),
                    gte: r(k),
                    lte: r(A),
                    bitwiseAnd: n(p),
                    bitwiseOr: n(h),
                    bitwiseXor: n(v),
                    bitwiseNot: g,
                    bitwiseLeft: n(_),
                    bitwiseRight: n(y),
                    bitwiseZ: n(m)
                });
            }(this);
        }, {
            underscore: 4
        } ],
        17: [ function(t) {
            !function(e) {
                var n = e._ || t("underscore");
                n.mixin({
                    explode: function(t) {
                        return t.split("");
                    },
                    implode: function(t) {
                        return t.join("");
                    },
                    camelCase: function(t) {
                        return t.replace(/-([a-z])/g, function(t) {
                            return t[1].toUpperCase();
                        });
                    },
                    toDash: function(t) {
                        return t = t.replace(/([A-Z])/g, function(t) {
                            return "-" + t.toLowerCase();
                        }), "-" == t.charAt(0) ? t.substr(1) : t;
                    },
                    strContains: function(t, e) {
                        if ("string" != typeof t) throw new TypeError();
                        return -1 != t.indexOf(e);
                    }
                });
            }(this);
        }, {
            underscore: 4
        } ],
        18: [ function(t) {
            !function(e) {
                var n = e._ || t("underscore");
                n.mixin({
                    done: function(t) {
                        var e = n(t);
                        return e.stopTrampoline = !0, e;
                    },
                    trampoline: function(t) {
                        for (var e = t.apply(t, n.rest(arguments)); n.isFunction(e) && (e = e(), !(e instanceof n && e.stopTrampoline)); ) ;
                        return e.value();
                    }
                });
            }(this);
        }, {
            underscore: 4
        } ],
        19: [ function(e, n, r) {
            var i = "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};
            !function(e) {
                if ("object" == typeof r) n.exports = e(); else if ("function" == typeof t && t.amd) t(e); else {
                    var o;
                    "undefined" != typeof window ? o = window : "undefined" != typeof i ? o = i : "undefined" != typeof self && (o = self), 
                    o.questor = e();
                }
            }(function() {
                return function t(n, r, i) {
                    function o(u, a) {
                        if (!r[u]) {
                            if (!n[u]) {
                                var c = "function" == typeof e && e;
                                if (!a && c) return c(u, !0);
                                if (s) return s(u, !0);
                                throw new Error("Cannot find module '" + u + "'");
                            }
                            var l = r[u] = {
                                exports: {}
                            };
                            n[u][0].call(l.exports, function(t) {
                                var e = n[u][1][t];
                                return o(e ? e : t);
                            }, l, l.exports, t, n, r, i);
                        }
                        return r[u].exports;
                    }
                    for (var s = "function" == typeof e && e, u = 0; u < i.length; u++) o(i[u]);
                    return o;
                }({
                    1: [ function(t, e) {
                        "use strict";
                        function n(t, e) {
                            return e || (e = {}), o({
                                headers: e.headers,
                                method: e.method,
                                uri: t
                            }).spread(function(t) {
                                var e = {
                                    body: t.body,
                                    headers: r(t.getAllResponseHeaders()),
                                    status: t.statusCode
                                };
                                if (e.status >= 300) {
                                    var n = new Error(e.body);
                                    throw n.body = e.body, n.headers = e.headers, n.status = e.status, n;
                                }
                                return e;
                            });
                        }
                        function r(t) {
                            var e = {};
                            if (!t) return e;
                            for (var n = t.split("\r\n"), r = 0; r < n.length; r++) {
                                var i = n[r], o = i.indexOf(": ") || i.indexOf(":");
                                if (o > 0) {
                                    var s = i.substring(0, o), u = i.substring(o + 2);
                                    e[s] = u;
                                }
                            }
                            return e;
                        }
                        var i = t("bluebird"), o = i.promisify(t("xhr"));
                        e.exports = n;
                    }, {
                        bluebird: 5,
                        xhr: 41
                    } ],
                    2: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n, r) {
                            function i(t, e, r) {
                                var i = n(t, o, r, e === !0 && t._isBound() ? t._boundTo : void 0), s = i.promise();
                                return s.isRejected() ? s : (i.setHowMany(1), i.setUnwrap(), i.init(), s);
                            }
                            var o = t("./some_promise_array.js")(r);
                            t("./assert.js"), e.any = function(t) {
                                return i(t, !1, e.any);
                            }, e.prototype.any = function() {
                                return i(this, !0, this.any);
                            };
                        };
                    }, {
                        "./assert.js": 3,
                        "./some_promise_array.js": 36
                    } ],
                    3: [ function(t, e) {
                        "use strict";
                        e.exports = function() {
                            var t = function() {
                                function t(t) {
                                    this.constructor$(t), this.message = t, this.name = "AssertionError";
                                }
                                return t.prototype = new Error(), t.prototype.constructor = t, t.prototype.constructor$ = Error, 
                                t;
                            }();
                            return function e(n, r) {
                                if (n !== !0) {
                                    var i = new t(r);
                                    throw Error.captureStackTrace && Error.captureStackTrace(i, e), console && console.error && console.error(i.stack + ""), 
                                    i;
                                }
                            };
                        }();
                    }, {} ],
                    4: [ function(t, e) {
                        "use strict";
                        function n() {
                            this._isTickUsed = !1, this._length = 0, this._lateBuffer = new i(), this._functionBuffer = new i(75e3);
                            var t = this;
                            this.consumeFunctionBuffer = function() {
                                t._consumeFunctionBuffer();
                            };
                        }
                        var r = (t("./assert.js"), t("./schedule.js")), i = t("./queue.js"), o = t("./util.js").errorObj, s = t("./util.js").tryCatch1;
                        n.prototype.haveItemsQueued = function() {
                            return this._length > 0;
                        }, n.prototype.invokeLater = function(t, e, n) {
                            this._lateBuffer.push(t, e, n), this._queueTick();
                        }, n.prototype.invoke = function(t, e, n) {
                            var r = this._functionBuffer;
                            r.push(t, e, n), this._length = r.length(), this._queueTick();
                        }, n.prototype._consumeFunctionBuffer = function() {
                            for (var t = this._functionBuffer; t.length() > 0; ) {
                                var e = t.shift(), n = t.shift(), r = t.shift();
                                e.call(n, r);
                            }
                            this._reset(), this._consumeLateBuffer();
                        }, n.prototype._consumeLateBuffer = function() {
                            for (var t = this._lateBuffer; t.length() > 0; ) {
                                var e = t.shift(), n = t.shift(), r = t.shift(), i = s(e, n, r);
                                if (i === o) throw this._queueTick(), i.e;
                            }
                        }, n.prototype._queueTick = function() {
                            this._isTickUsed || (r(this.consumeFunctionBuffer), this._isTickUsed = !0);
                        }, n.prototype._reset = function() {
                            this._isTickUsed = !1, this._length = 0;
                        }, e.exports = new n();
                    }, {
                        "./assert.js": 3,
                        "./queue.js": 29,
                        "./schedule.js": 32,
                        "./util.js": 40
                    } ],
                    5: [ function(t, e) {
                        "use strict";
                        var n = t("./promise.js")();
                        e.exports = n;
                    }, {
                        "./promise.js": 21
                    } ],
                    6: [ function(t, e) {
                        "use strict";
                        e.exports = function(t) {
                            function e(t) {
                                var e = "string" == typeof this ? this : "" + this;
                                return t[e];
                            }
                            t.prototype.call = function(t) {
                                for (var e = arguments.length, n = new Array(e - 1), r = 1; e > r; ++r) n[r - 1] = arguments[r];
                                return this._then(function(e) {
                                    return e[t].apply(e, n);
                                }, void 0, void 0, void 0, void 0, this.call);
                            }, t.prototype.get = function(t) {
                                return this._then(e, void 0, void 0, t, void 0, this.get);
                            };
                        };
                    }, {} ],
                    7: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n) {
                            var r = t("./errors.js"), i = t("./async.js"), o = (t("./assert.js"), r.CancellationError), s = {};
                            e.prototype._cancel = function() {
                                if (!this.isCancellable()) return this;
                                var t;
                                if (void 0 !== (t = this._cancellationParent)) return void t.cancel(s);
                                var e = new o();
                                this._attachExtraTrace(e), this._rejectUnchecked(e);
                            }, e.prototype.cancel = function(t) {
                                return this.isCancellable() ? t === s ? (this._cancel(), this) : (i.invokeLater(this._cancel, this, void 0), 
                                this) : this;
                            }, e.prototype.cancellable = function() {
                                return this._cancellable() ? this : (this._setCancellable(), this._cancellationParent = void 0, 
                                this);
                            }, e.prototype.uncancellable = function() {
                                var t = new e(n);
                                return t._setTrace(this.uncancellable, this), t._follow(this), t._unsetCancellable(), 
                                this._isBound() && t._setBoundTo(this._boundTo), t;
                            }, e.prototype.fork = function(t, e, n) {
                                var r = this._then(t, e, n, void 0, void 0, this.fork);
                                return r._setCancellable(), r._cancellationParent = void 0, r;
                            };
                        };
                    }, {
                        "./assert.js": 3,
                        "./async.js": 4,
                        "./errors.js": 11
                    } ],
                    8: [ function(t, e) {
                        "use strict";
                        e.exports = function() {
                            function e(t) {
                                var e;
                                if ("function" == typeof t) e = "[function " + (t.name || "anonymous") + "]"; else {
                                    e = t.toString();
                                    var r = /\[object [a-zA-Z0-9$_]+\]/;
                                    if (r.test(e)) try {
                                        var i = JSON.stringify(t);
                                        e = i;
                                    } catch (o) {}
                                    0 === e.length && (e = "(empty array)");
                                }
                                return "(<" + n(e) + ">, no stack trace)";
                            }
                            function n(t) {
                                var e = 41;
                                return t.length < e ? t : t.substr(0, e - 3) + "...";
                            }
                            function r(t, e) {
                                this.captureStackTrace(t, e);
                            }
                            var i = (t("./assert.js"), t("./util.js").inherits), o = t("./es5.js").defineProperty, s = new RegExp("\\b(?:[\\w.]*Promise(?:Array|Spawn)?\\$_\\w+|tryCatch(?:1|2|Apply)|new \\w*PromiseArray|\\w*PromiseArray\\.\\w*PromiseArray|setTimeout|CatchFilter\\$_\\w+|makeNodePromisified|processImmediate|process._tickCallback|nextTick|Async\\$\\w+)\\b"), u = null, a = null, c = !1;
                            i(r, Error), r.prototype.captureStackTrace = function(t, e) {
                                l(this, t, e);
                            }, r.possiblyUnhandledRejection = function(t) {
                                if ("object" == typeof console) {
                                    var e;
                                    if ("object" == typeof t || "function" == typeof t) {
                                        var n = t.stack;
                                        e = "Possibly unhandled " + a(n, t);
                                    } else e = "Possibly unhandled " + String(t);
                                    "function" == typeof console.error || "object" == typeof console.error ? console.error(e) : ("function" == typeof console.log || "object" == typeof console.error) && console.log(e);
                                }
                            }, c = "CapturedTrace$captureStackTrace" !== r.prototype.captureStackTrace.name, 
                            r.combine = function(t, e) {
                                for (var n = t.length - 1, r = e.length - 1; r >= 0; --r) {
                                    var i = e[r];
                                    if (t[n] !== i) break;
                                    t.pop(), n--;
                                }
                                t.push("From previous event:");
                                for (var o = t.concat(e), a = [], r = 0, c = o.length; c > r; ++r) s.test(o[r]) || r > 0 && !u.test(o[r]) && "From previous event:" !== o[r] || a.push(o[r]);
                                return a;
                            }, r.isSupported = function() {
                                return "function" == typeof l;
                            };
                            var l = function f() {
                                if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                                    u = /^\s*at\s*/, a = function(t, n) {
                                        return "string" == typeof t ? t : void 0 !== n.name && void 0 !== n.message ? n.name + ". " + n.message : e(n);
                                    };
                                    var t = Error.captureStackTrace;
                                    return function(e, n) {
                                        t(e, n);
                                    };
                                }
                                var n = new Error();
                                if (!c && "string" == typeof n.stack && "function" == typeof "".startsWith && n.stack.startsWith("stackDetection@") && "stackDetection" === f.name) {
                                    o(Error, "stackTraceLimit", {
                                        writable: !0,
                                        enumerable: !1,
                                        configurable: !1,
                                        value: 25
                                    }), u = /@/;
                                    var r = /[@\n]/;
                                    return a = function(t, n) {
                                        return "string" == typeof t ? n.name + ". " + n.message + "\n" + t : void 0 !== n.name && void 0 !== n.message ? n.name + ". " + n.message : e(n);
                                    }, function(t, e) {
                                        var n, i = e.name, o = new Error().stack, s = o.split(r), u = s.length;
                                        for (n = 0; u > n && s[n] !== i; n += 2) ;
                                        s = s.slice(n + 2), u = s.length - 2;
                                        var a = "";
                                        for (n = 0; u > n; n += 2) a += s[n], a += "@", a += s[n + 1], a += "\n";
                                        t.stack = a;
                                    };
                                }
                                return a = function(t, n) {
                                    return "string" == typeof t ? t : "object" != typeof n && "function" != typeof n || void 0 === n.name || void 0 === n.message ? e(n) : n.name + ". " + n.message;
                                }, null;
                            }();
                            return r;
                        };
                    }, {
                        "./assert.js": 3,
                        "./es5.js": 13,
                        "./util.js": 40
                    } ],
                    9: [ function(t, e) {
                        "use strict";
                        e.exports = function(e) {
                            function n(t, e, n) {
                                this._instances = t, this._callback = e, this._promise = n;
                            }
                            function r(t, e) {
                                var n = {}, r = o(t, n, e);
                                if (r === s) return r;
                                var i = u(n);
                                return i.length ? (s.e = new TypeError("Catch filter must inherit from Error or be a simple predicate function"), 
                                s) : r;
                            }
                            var i = t("./util.js"), o = i.tryCatch1, s = i.errorObj, u = t("./es5.js").keys;
                            return n.prototype.doFilter = function(t) {
                                for (var n = this._callback, i = this._promise, u = i._isBound() ? i._boundTo : void 0, a = 0, c = this._instances.length; c > a; ++a) {
                                    var l = this._instances[a], f = l === Error || null != l && l.prototype instanceof Error;
                                    if (f && t instanceof l) {
                                        var d = o(n, u, t);
                                        return d === s ? (e.e = d.e, e) : d;
                                    }
                                    if ("function" == typeof l && !f) {
                                        var p = r(l, t);
                                        if (p === s) {
                                            this._promise._attachExtraTrace(s.e), t = s.e;
                                            break;
                                        }
                                        if (p) {
                                            var d = o(n, u, t);
                                            return d === s ? (e.e = d.e, e) : d;
                                        }
                                    }
                                }
                                return e.e = t, e;
                            }, n;
                        };
                    }, {
                        "./es5.js": 13,
                        "./util.js": 40
                    } ],
                    10: [ function(t, e) {
                        "use strict";
                        var n = t("./util.js"), r = (t("./assert.js"), n.isPrimitive), i = n.wrapsPrimitiveReceiver;
                        e.exports = function(t) {
                            var e = function() {
                                return this;
                            }, n = function() {
                                throw this;
                            }, o = function(t, e) {
                                return 1 === e ? function() {
                                    throw t;
                                } : 2 === e ? function() {
                                    return t;
                                } : void 0;
                            };
                            t.prototype["return"] = t.prototype.thenReturn = function(t) {
                                return i && r(t) ? this._then(o(t, 2), void 0, void 0, void 0, void 0, this.thenReturn) : this._then(e, void 0, void 0, t, void 0, this.thenReturn);
                            }, t.prototype["throw"] = t.prototype.thenThrow = function(t) {
                                return i && r(t) ? this._then(o(t, 1), void 0, void 0, void 0, void 0, this.thenThrow) : this._then(n, void 0, void 0, t, void 0, this.thenThrow);
                            };
                        };
                    }, {
                        "./assert.js": 3,
                        "./util.js": 40
                    } ],
                    11: [ function(t, e) {
                        "use strict";
                        function n(t) {
                            return (1 & t) > 0;
                        }
                        function r(t) {
                            return (2 & t) > 0;
                        }
                        function i(t) {
                            return 1 | t;
                        }
                        function o(t) {
                            return 2 | t;
                        }
                        function s(t) {
                            return -3 & t;
                        }
                        function u(t) {
                            var e;
                            return g(t) && void 0 !== (e = t.__promiseHandled__) && (t.__promiseHandled__ = s(e)), 
                            t;
                        }
                        function a(t) {
                            try {
                                b(t, "__rejectionError__", h);
                            } catch (e) {}
                        }
                        function c(t) {
                            return null == t ? !1 : t instanceof h || t.__rejectionError__ === h;
                        }
                        function l(t) {
                            try {
                                return b(t, "__promiseHandled__", 0), !0;
                            } catch (e) {
                                return !1;
                            }
                        }
                        function f(t) {
                            return t instanceof w;
                        }
                        function d(t) {
                            if (f(t)) {
                                var e = t.__promiseHandled__;
                                return void 0 === e ? l(t) : !n(e);
                            }
                            return !1;
                        }
                        function p(t, e) {
                            function n(n) {
                                this.message = "string" == typeof n ? n : e, this.name = t, w.captureStackTrace && w.captureStackTrace(this, this.constructor);
                            }
                            return m(n, w), n;
                        }
                        function h(t) {
                            this.name = "RejectionError", this.message = t, this.cause = t, t instanceof w ? (this.message = t.message, 
                            this.stack = t.stack) : w.captureStackTrace && w.captureStackTrace(this, this.constructor);
                        }
                        var v = t("./global.js"), _ = t("./es5.js").freeze, y = t("./util.js"), m = y.inherits, g = y.isObject, b = y.notEnumerableProp, w = v.Error, j = v.TypeError;
                        "function" != typeof j && (j = p("TypeError", "type error"));
                        var x = v.RangeError;
                        "function" != typeof x && (x = p("RangeError", "range error"));
                        var T = p("CancellationError", "cancellation error"), k = p("TimeoutError", "timeout error");
                        m(h, w);
                        var A = "__BluebirdErrorTypes__", E = v[A];
                        E || (E = _({
                            CancellationError: T,
                            TimeoutError: k,
                            RejectionError: h
                        }), b(v, A, E)), e.exports = {
                            Error: w,
                            TypeError: j,
                            RangeError: x,
                            CancellationError: E.CancellationError,
                            RejectionError: E.RejectionError,
                            TimeoutError: E.TimeoutError,
                            originatesFromRejection: c,
                            markAsOriginatingFromRejection: a,
                            attachDefaultState: l,
                            ensureNotHandled: u,
                            withHandledUnmarked: s,
                            withHandledMarked: o,
                            withStackAttached: i,
                            isStackAttached: n,
                            isHandled: r,
                            canAttach: d
                        };
                    }, {
                        "./es5.js": 13,
                        "./global.js": 17,
                        "./util.js": 40
                    } ],
                    12: [ function(t, e) {
                        "use strict";
                        e.exports = function(e) {
                            function n(t) {
                                var n = new r(t), i = e.rejected(n), o = i._peekContext();
                                return null != o && o._attachExtraTrace(n), i;
                            }
                            var r = t("./errors.js").TypeError;
                            return n;
                        };
                    }, {
                        "./errors.js": 11
                    } ],
                    13: [ function(t, e) {
                        function n(t) {
                            var e = [];
                            for (var n in t) a.call(t, n) && e.push(n);
                            return e;
                        }
                        function r(t, e, n) {
                            return t[e] = n.value, t;
                        }
                        function i(t) {
                            return t;
                        }
                        function o(t) {
                            try {
                                return Object(t).constructor.prototype;
                            } catch (e) {
                                return l;
                            }
                        }
                        function s(t) {
                            try {
                                return "[object Array]" === c.call(t);
                            } catch (e) {
                                return !1;
                            }
                        }
                        var u = function() {
                            "use strict";
                            return void 0 === this;
                        }();
                        if (u) e.exports = {
                            freeze: Object.freeze,
                            defineProperty: Object.defineProperty,
                            keys: Object.keys,
                            getPrototypeOf: Object.getPrototypeOf,
                            isArray: Array.isArray,
                            isES5: u
                        }; else {
                            var a = {}.hasOwnProperty, c = {}.toString, l = {}.constructor.prototype;
                            e.exports = {
                                isArray: s,
                                keys: n,
                                defineProperty: r,
                                freeze: i,
                                getPrototypeOf: o,
                                isES5: u
                            };
                        }
                    }, {} ],
                    14: [ function(t, e) {
                        "use strict";
                        e.exports = function(e) {
                            function n(t) {
                                for (var e = this._settledValue, n = e.length, r = new Array(n), i = 0, o = 0; n > o; ++o) {
                                    var s = t[o];
                                    (void 0 !== s || o in t) && s && (r[i++] = e[o]);
                                }
                                return r.length = i, r;
                            }
                            var r = (t("./assert.js"), t("./util.js").isArray, {
                                ref: null
                            });
                            e.filter = function(t, i) {
                                return e.map(t, i, r)._then(n, void 0, void 0, r.ref, void 0, e.filter);
                            }, e.prototype.filter = function(t) {
                                return this.map(t, r)._then(n, void 0, void 0, r.ref, void 0, this.filter);
                            };
                        };
                    }, {
                        "./assert.js": 3,
                        "./util.js": 40
                    } ],
                    15: [ function(t, e) {
                        e.exports = function(e, n) {
                            function r() {
                                return this;
                            }
                            function i() {
                                throw l(this), this;
                            }
                            function o(t) {
                                return function() {
                                    return t;
                                };
                            }
                            function s(t) {
                                return function() {
                                    throw l(t), t;
                                };
                            }
                            function u(t, e, n) {
                                var a = f && d(e);
                                return n ? t._then(a ? r : o(e), p, void 0, e, void 0, u) : t._then(a ? i : s(e), p, void 0, e, void 0, u);
                            }
                            function a(t) {
                                var r = this.promise, i = this.handler, o = r._isBound() ? i.call(r._boundTo) : i();
                                if (void 0 !== o) {
                                    var s = e._cast(o, a, void 0);
                                    if (e.is(s)) return u(s, t, r.isFulfilled());
                                }
                                return r.isRejected() ? (l(t), n.e = t, n) : t;
                            }
                            var c = t("./util.js"), l = t("./errors.js").ensureNotHandled, f = c.wrapsPrimitiveReceiver, d = c.isPrimitive, p = c.thrower;
                            e.prototype.lastly = e.prototype["finally"] = function(t) {
                                if ("function" != typeof t) return this.then();
                                var e = {
                                    promise: this,
                                    handler: t
                                };
                                return this._then(a, a, void 0, e, void 0, this.lastly);
                            };
                        };
                    }, {
                        "./errors.js": 11,
                        "./util.js": 40
                    } ],
                    16: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n, r) {
                            var i = t("./promise_spawn.js")(e, r), o = t("./errors.js"), s = o.TypeError;
                            e.coroutine = function(t) {
                                if ("function" != typeof t) throw new s("generatorFunction must be a function");
                                var e = i;
                                return function n() {
                                    var r = t.apply(this, arguments), i = new e(void 0, void 0, n);
                                    return i._generator = r, i._next(void 0), i.promise();
                                };
                            }, e.spawn = function(t) {
                                if ("function" != typeof t) return n("generatorFunction must be a function");
                                var r = new i(t, this, e.spawn), o = r.promise();
                                return r._run(e.spawn), o;
                            };
                        };
                    }, {
                        "./errors.js": 11,
                        "./promise_spawn.js": 25
                    } ],
                    17: [ function(t, e) {
                        var n = t("__browserify_process"), r = "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};
                        e.exports = function() {
                            return "undefined" != typeof this ? this : "undefined" != typeof n && "undefined" != typeof r && "string" == typeof n.execPath ? r : "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator && null !== navigator && "string" == typeof navigator.appName ? void 0 !== window.wrappedJSObject ? window.wrappedJSObject : window : void 0;
                        }();
                    }, {
                        __browserify_process: 76
                    } ],
                    18: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n, r, i) {
                            function o(t) {
                                var i = this, s = void 0;
                                "function" != typeof i && (s = i.receiver, i = i.fn);
                                var u = !1, a = new Array(t.length);
                                if (void 0 === s) {
                                    for (var c = 0, l = t.length; l > c; ++c) if (void 0 !== t[c] || c in t) {
                                        var f = i(t[c], c, l);
                                        if (!u) {
                                            var d = e._cast(f, o, void 0);
                                            if (d instanceof e) {
                                                if (d.isFulfilled()) {
                                                    a[c] = d._settledValue;
                                                    continue;
                                                }
                                                u = !0, f = d;
                                            }
                                        }
                                        a[c] = f;
                                    }
                                } else for (var c = 0, l = t.length; l > c; ++c) if (void 0 !== t[c] || c in t) {
                                    var f = i.call(s, t[c], c, l);
                                    if (!u) {
                                        var d = e._cast(f, o, void 0);
                                        if (d instanceof e) {
                                            if (d.isFulfilled()) {
                                                a[c] = d._settledValue;
                                                continue;
                                            }
                                            u = !0, f = d;
                                        }
                                    }
                                    a[c] = f;
                                }
                                return u ? n(a, r, o, void 0).promise() : a;
                            }
                            function s(t, e, s, u, a) {
                                if ("function" != typeof e) return i("fn must be a function");
                                s === !0 && t._isBound() && (e = {
                                    fn: e,
                                    receiver: t._boundTo
                                });
                                var c = n(t, r, u, s === !0 && t._isBound() ? t._boundTo : void 0).promise();
                                return void 0 !== a && (a.ref = c), c._then(o, void 0, void 0, e, void 0, u);
                            }
                            t("./assert.js"), e.prototype.map = function(t, e) {
                                return s(this, t, !0, this.map, e);
                            }, e.map = function(t, n, r) {
                                return s(t, n, !1, e.map, r);
                            };
                        };
                    }, {
                        "./assert.js": 3
                    } ],
                    19: [ function(t, e) {
                        "use strict";
                        e.exports = function(e) {
                            function n(t) {
                                throw t;
                            }
                            function r(t, e) {
                                var r = this, i = u(r, e, null, t);
                                i === c && s.invokeLater(n, void 0, i.e);
                            }
                            function i(t, e) {
                                var r = this, i = a(r, e, t);
                                i === c && s.invokeLater(n, void 0, i.e);
                            }
                            var o = t("./util.js"), s = t("./async.js"), u = (t("./assert.js"), o.tryCatch2), a = o.tryCatch1, c = o.errorObj;
                            e.prototype.nodeify = function(t) {
                                return "function" == typeof t && this._then(r, i, void 0, t, this._isBound() ? this._boundTo : null, this.nodeify), 
                                this;
                            };
                        };
                    }, {
                        "./assert.js": 3,
                        "./async.js": 4,
                        "./util.js": 40
                    } ],
                    20: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n) {
                            var r = (t("./assert.js"), t("./util.js")), i = t("./async.js"), o = r.tryCatch1, s = r.errorObj;
                            e.prototype.progressed = function(t) {
                                return this._then(void 0, void 0, t, void 0, void 0, this.progressed);
                            }, e.prototype._progress = function(t) {
                                this._isFollowingOrFulfilledOrRejected() || this._progressUnchecked(t);
                            }, e.prototype._progressHandlerAt = function(t) {
                                return 0 === t ? this._progressHandler0 : this[t + 2 - 5];
                            }, e.prototype._doProgressWith = function(t) {
                                var n = t.value, r = t.handler, i = t.promise, u = t.receiver;
                                this._pushContext();
                                var a = o(r, u, n);
                                this._popContext(), a === s ? null != a.e && "StopProgressPropagation" === a.e.name ? a.e.__promiseHandled__ = 2 : (i._attachExtraTrace(a.e), 
                                i._progress(a.e)) : e.is(a) ? a._then(i._progress, null, null, i, void 0, this._progress) : i._progress(a);
                            }, e.prototype._progressUnchecked = function(t) {
                                if (this.isPending()) for (var r = this._length(), o = 0; r > o; o += 5) {
                                    var s = this._progressHandlerAt(o), u = this._promiseAt(o);
                                    if (e.is(u)) "function" == typeof s ? i.invoke(this._doProgressWith, this, {
                                        handler: s,
                                        promise: u,
                                        receiver: this._receiverAt(o),
                                        value: t
                                    }) : i.invoke(u._progress, u, t); else {
                                        var a = this._receiverAt(o);
                                        "function" == typeof s ? s.call(a, t, u) : e.is(a) && a._isProxied() ? a._progressUnchecked(t) : n(a, u) && a._promiseProgressed(t, u);
                                    }
                                }
                            };
                        };
                    }, {
                        "./assert.js": 3,
                        "./async.js": 4,
                        "./util.js": 40
                    } ],
                    21: [ function(t, e) {
                        var n = t("__browserify_process");
                        e.exports = function() {
                            function e(t) {
                                return void 0 === t ? !1 : t instanceof i;
                            }
                            function r(t, e) {
                                return t instanceof h ? e >= 0 : !1;
                            }
                            function i(t) {
                                if ("function" != typeof t) throw new E("the promise constructor requires a resolver function");
                                if (this.constructor !== i) throw new E("the promise constructor cannot be invoked directly");
                                this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, 
                                this._promise0 = void 0, this._receiver0 = void 0, this._settledValue = void 0, 
                                this._boundTo = void 0, t !== f && this._resolveFromResolver(t);
                            }
                            function o(t, e, n) {
                                return s(t, h, n, e === !0 && t._isBound() ? t._boundTo : void 0).promise();
                            }
                            function s(t, n, r, o) {
                                var u = null;
                                return m(t) ? u = t : (u = i._cast(t, r, void 0), u !== t ? u._setBoundTo(o) : e(u) || (u = null)), 
                                null !== u ? new n(u, "function" == typeof r ? r : s, o) : {
                                    promise: function() {
                                        return V("expecting an array, a promise or a thenable");
                                    }
                                };
                            }
                            var u = t("./global.js"), a = (t("./assert.js"), t("./util.js")), c = t("./async.js"), l = t("./errors.js"), f = function() {}, d = {}, p = {
                                e: null
                            }, h = t("./promise_array.js")(i, f), v = t("./captured_trace.js")(), _ = t("./catch_filter.js")(p), y = t("./promise_resolver.js"), m = a.isArray, g = a.notEnumerableProp, b = a.isObject, w = a.ensurePropertyExpansion, j = a.errorObj, x = a.tryCatch1, T = a.tryCatch2, k = a.tryCatchApply, A = l.RangeError, E = l.TypeError, P = l.CancellationError, F = l.TimeoutError, O = l.RejectionError, R = l.originatesFromRejection, S = l.markAsOriginatingFromRejection, C = l.ensureNotHandled, N = l.withHandledMarked, B = l.withStackAttached, H = l.isStackAttached, I = l.isHandled, M = l.canAttach, q = a.thrower, V = t("./errors_api_rejection")(i), L = function() {
                                return new E("circular promise resolution chain");
                            };
                            i.prototype.bind = function(t) {
                                var e = new i(f);
                                return D && e._setTrace(this.bind, this), e._follow(this), e._setBoundTo(t), this._cancellable() && (e._setCancellable(), 
                                e._cancellationParent = this), e;
                            }, i.prototype.toString = function() {
                                return "[object Promise]";
                            }, i.prototype.caught = i.prototype["catch"] = function(t) {
                                var e = arguments.length;
                                if (e > 1) {
                                    var n, r = new Array(e - 1), i = 0;
                                    for (n = 0; e - 1 > n; ++n) {
                                        var o = arguments[n];
                                        if ("function" != typeof o) {
                                            var s = new E("A catch filter must be an error constructor or a filter function");
                                            return this._attachExtraTrace(s), void c.invoke(this._reject, this, s);
                                        }
                                        r[i++] = o;
                                    }
                                    r.length = i, t = arguments[n], this._resetTrace(this.caught);
                                    var u = new _(r, t, this);
                                    return this._then(void 0, u.doFilter, void 0, u, void 0, this.caught);
                                }
                                return this._then(void 0, t, void 0, void 0, void 0, this.caught);
                            }, i.prototype.then = function(t, e, n) {
                                return this._then(t, e, n, void 0, void 0, this.then);
                            }, i.prototype.done = function(t, e, n) {
                                var r = this._then(t, e, n, void 0, void 0, this.done);
                                r._setIsFinal();
                            }, i.prototype.spread = function(t, e) {
                                return this._then(t, e, void 0, d, void 0, this.spread);
                            }, i.prototype.isFulfilled = function() {
                                return (268435456 & this._bitField) > 0;
                            }, i.prototype.isRejected = function() {
                                return (134217728 & this._bitField) > 0;
                            }, i.prototype.isPending = function() {
                                return !this.isResolved();
                            }, i.prototype.isResolved = function() {
                                return (402653184 & this._bitField) > 0;
                            }, i.prototype.isCancellable = function() {
                                return !this.isResolved() && this._cancellable();
                            }, i.prototype.toJSON = function() {
                                var t = {
                                    isFulfilled: !1,
                                    isRejected: !1,
                                    fulfillmentValue: void 0,
                                    rejectionReason: void 0
                                };
                                return this.isFulfilled() ? (t.fulfillmentValue = this._settledValue, t.isFulfilled = !0) : this.isRejected() && (t.rejectionReason = this._settledValue, 
                                t.isRejected = !0), t;
                            }, i.prototype.all = function() {
                                return o(this, !0, this.all);
                            }, i.is = e, i.all = function(t) {
                                return o(t, !1, i.all);
                            }, i.join = function() {
                                for (var t = arguments.length, e = new Array(t), n = 0; t > n; ++n) e[n] = arguments[n];
                                return s(e, h, i.join, void 0).promise();
                            }, i.resolve = i.fulfilled = function(t, e) {
                                var n = new i(f);
                                return D && n._setTrace("function" == typeof e ? e : i.resolve, void 0), n._tryFollow(t) ? n : (n._cleanValues(), 
                                n._setFulfilled(), n._settledValue = t, n);
                            }, i.reject = i.rejected = function(t) {
                                var e = new i(f);
                                return D && e._setTrace(i.reject, void 0), S(t), e._cleanValues(), e._setRejected(), 
                                e._settledValue = t, e;
                            }, i.prototype.error = function(t) {
                                return this.caught(R, t);
                            }, i.prototype._resolveFromSyncValue = function(t, e) {
                                if (t === j) this._cleanValues(), this._setRejected(), this._settledValue = t.e; else {
                                    var n = i._cast(t, e, void 0);
                                    n instanceof i ? this._follow(n) : (this._cleanValues(), this._setFulfilled(), this._settledValue = t);
                                }
                            }, i.method = function(t) {
                                if ("function" != typeof t) throw new E("fn must be a function");
                                return function e() {
                                    var n;
                                    switch (arguments.length) {
                                      case 0:
                                        n = x(t, this, void 0);
                                        break;

                                      case 1:
                                        n = x(t, this, arguments[0]);
                                        break;

                                      case 2:
                                        n = T(t, this, arguments[0], arguments[1]);
                                        break;

                                      default:
                                        for (var r = arguments.length, o = new Array(r), s = 0; r > s; ++s) o[s] = arguments[s];
                                        n = k(t, o, this);
                                    }
                                    var u = new i(f);
                                    return D && u._setTrace(e, void 0), u._resolveFromSyncValue(n, e), u;
                                };
                            }, i["try"] = i.attempt = function(t, e, n) {
                                if ("function" != typeof t) return V("fn must be a function");
                                var r = m(e) ? k(t, e, n) : x(t, n, e), o = new i(f);
                                return D && o._setTrace(i.attempt, void 0), o._resolveFromSyncValue(r, i.attempt), 
                                o;
                            }, i.defer = i.pending = function(t) {
                                var e = new i(f);
                                return D && e._setTrace("function" == typeof t ? t : i.defer, void 0), new y(e);
                            }, i.bind = function(t) {
                                var e = new i(f);
                                return D && e._setTrace(i.bind, void 0), e._setFulfilled(), e._setBoundTo(t), e;
                            }, i.cast = function(t, e) {
                                "function" != typeof e && (e = i.cast);
                                var n = i._cast(t, e, void 0);
                                return n instanceof i ? n : i.resolve(n, e);
                            }, i.onPossiblyUnhandledRejection = function(t) {
                                v.possiblyUnhandledRejection = "function" == typeof t ? t : void 0;
                            };
                            var D = !1 || !("undefined" == typeof n || "string" != typeof n.execPath || "object" != typeof n.env || !n.env.BLUEBIRD_DEBUG && "development" !== n.env.NODE_ENV);
                            i.longStackTraces = function() {
                                if (c.haveItemsQueued() && D === !1) throw new Error("cannot enable long stack traces after promises have been created");
                                D = v.isSupported();
                            }, i.hasLongStackTraces = function() {
                                return D && v.isSupported();
                            }, i.prototype._setProxyHandlers = function(t, e) {
                                var n = this._length();
                                if (n >= 4194298 && (n = 0, this._setLength(0)), 0 === n) this._promise0 = e, this._receiver0 = t; else {
                                    var r = n - 5;
                                    this[r + 3] = e, this[r + 4] = t, this[r + 0] = this[r + 1] = this[r + 2] = void 0;
                                }
                                this._setLength(n + 5);
                            }, i.prototype._proxyPromiseArray = function(t, e) {
                                this._setProxyHandlers(t, e);
                            }, i.prototype._proxyPromise = function(t) {
                                t._setProxied(), this._setProxyHandlers(t, -1);
                            }, i.prototype._then = function(t, e, n, r, o, s) {
                                var u = void 0 !== o, a = u ? o : new i(f);
                                if (D && !u) {
                                    var l = this._peekContext() === this._traceParent;
                                    a._traceParent = l ? this._traceParent : this, a._setTrace("function" == typeof s ? s : this._then, this);
                                }
                                !u && this._isBound() && a._setBoundTo(this._boundTo);
                                var d = this._addCallbacks(t, e, n, a, r);
                                return !u && this._cancellable() && (a._setCancellable(), a._cancellationParent = this), 
                                this.isResolved() && c.invoke(this._queueSettleAt, this, d), a;
                            }, i.prototype._length = function() {
                                return 4194303 & this._bitField;
                            }, i.prototype._isFollowingOrFulfilledOrRejected = function() {
                                return (939524096 & this._bitField) > 0;
                            }, i.prototype._isFollowing = function() {
                                return 536870912 === (536870912 & this._bitField);
                            }, i.prototype._setLength = function(t) {
                                this._bitField = -4194304 & this._bitField | 4194303 & t;
                            }, i.prototype._cancellable = function() {
                                return (67108864 & this._bitField) > 0;
                            }, i.prototype._setFulfilled = function() {
                                this._bitField = 268435456 | this._bitField;
                            }, i.prototype._setRejected = function() {
                                this._bitField = 134217728 | this._bitField;
                            }, i.prototype._setFollowing = function() {
                                this._bitField = 536870912 | this._bitField;
                            }, i.prototype._setIsFinal = function() {
                                this._bitField = 33554432 | this._bitField;
                            }, i.prototype._isFinal = function() {
                                return (33554432 & this._bitField) > 0;
                            }, i.prototype._setCancellable = function() {
                                this._bitField = 67108864 | this._bitField;
                            }, i.prototype._unsetCancellable = function() {
                                this._bitField = -67108865 & this._bitField;
                            }, i.prototype._receiverAt = function(t) {
                                var e;
                                return e = 0 === t ? this._receiver0 : this[t + 4 - 5], this._isBound() && void 0 === e ? this._boundTo : e;
                            }, i.prototype._promiseAt = function(t) {
                                return 0 === t ? this._promise0 : this[t + 3 - 5];
                            }, i.prototype._fulfillmentHandlerAt = function(t) {
                                return 0 === t ? this._fulfillmentHandler0 : this[t + 0 - 5];
                            }, i.prototype._rejectionHandlerAt = function(t) {
                                return 0 === t ? this._rejectionHandler0 : this[t + 1 - 5];
                            }, i.prototype._unsetAt = function(t) {
                                0 === t ? this._fulfillmentHandler0 = this._rejectionHandler0 = this._progressHandler0 = this._promise0 = this._receiver0 = void 0 : this[t - 5 + 0] = this[t - 5 + 1] = this[t - 5 + 2] = this[t - 5 + 3] = this[t - 5 + 4] = void 0;
                            }, i.prototype._resolveFromResolver = function(t) {
                                function e(t) {
                                    r._tryFollow(t) || r._fulfill(t);
                                }
                                function n(t) {
                                    r._attachExtraTrace(t), S(t), r._reject(t);
                                }
                                var r = this, i = D;
                                i && (this._setTrace(this._resolveFromResolver, void 0), this._pushContext());
                                var o = T(t, void 0, e, n);
                                i && this._popContext(), void 0 !== o && o === j && r._reject(o.e);
                            }, i.prototype._addCallbacks = function(t, e, n, r, i) {
                                var o = this._length();
                                if (o >= 4194298 && (o = 0, this._setLength(0)), 0 === o) this._promise0 = r, void 0 !== i && (this._receiver0 = i), 
                                "function" == typeof t && (this._fulfillmentHandler0 = t), "function" == typeof e && (this._rejectionHandler0 = e), 
                                "function" == typeof n && (this._progressHandler0 = n); else {
                                    var s = o - 5;
                                    this[s + 3] = r, this[s + 4] = i, this[s + 0] = "function" == typeof t ? t : void 0, 
                                    this[s + 1] = "function" == typeof e ? e : void 0, this[s + 2] = "function" == typeof n ? n : void 0;
                                }
                                return this._setLength(o + 5), o;
                            }, i.prototype._setBoundTo = function(t) {
                                void 0 !== t ? (this._bitField = 8388608 | this._bitField, this._boundTo = t) : this._bitField = -8388609 & this._bitField;
                            }, i.prototype._isBound = function() {
                                return 8388608 === (8388608 & this._bitField);
                            }, i.prototype._spreadSlowCase = function(t, e, n, r) {
                                var i = s(n, h, this._spreadSlowCase, r).promise()._then(function() {
                                    return t.apply(r, arguments);
                                }, void 0, void 0, d, void 0, this._spreadSlowCase);
                                e._follow(i);
                            }, i.prototype._markHandled = function(t) {
                                if ("object" == typeof t && null !== t) {
                                    var e = t.__promiseHandled__;
                                    void 0 === e ? g(t, "__promiseHandled__", 2) : t.__promiseHandled__ = N(e);
                                }
                            }, i.prototype._callSpread = function(t, n, r, o) {
                                var s = this._isBound() ? this._boundTo : void 0;
                                if (m(r)) for (var u = this._settlePromiseFromHandler, a = 0, c = r.length; c > a; ++a) if (e(i._cast(r[a], u, void 0))) return void this._spreadSlowCase(t, n, r, s);
                                return o && n._pushContext(), k(t, r, s);
                            }, i.prototype._callHandler = function(t, e, n, r, i) {
                                var o;
                                return e !== d || this.isRejected() ? (i && n._pushContext(), o = x(t, e, r)) : o = this._callSpread(t, n, r, i), 
                                i && n._popContext(), o;
                            }, i.prototype._settlePromiseFromHandler = function(t, n, r, o) {
                                if (!e(o)) return void t.call(n, r, o);
                                this.isRejected() && this._markHandled(r);
                                var s = D, u = this._callHandler(t, n, o, r, s);
                                if (!o._isFollowing()) if (u === j || u === o || u === p) {
                                    var a = u === o ? L() : C(u.e);
                                    u !== p && o._attachExtraTrace(a), o._rejectUnchecked(a);
                                } else {
                                    var c = i._cast(u, s ? this._settlePromiseFromHandler : void 0, o);
                                    e(c) ? (o._follow(c), c._cancellable() && (o._cancellationParent = c, o._setCancellable())) : o._fulfillUnchecked(u);
                                }
                            }, i.prototype._follow = function(t) {
                                this._setFollowing(), t.isPending() ? (t._cancellable() && (this._cancellationParent = t, 
                                this._setCancellable()), t._proxyPromise(this)) : t.isFulfilled() ? this._fulfillUnchecked(t._settledValue) : this._rejectUnchecked(t._settledValue), 
                                D && null == t._traceParent && (t._traceParent = this);
                            }, i.prototype._tryFollow = function(t) {
                                if (this._isFollowingOrFulfilledOrRejected() || t === this) return !1;
                                var n = i._cast(t, this._tryFollow, void 0);
                                return e(n) ? (this._follow(n), !0) : !1;
                            }, i.prototype._resetTrace = function(t) {
                                if (D) {
                                    var e = this._peekContext(), n = void 0 === e;
                                    this._trace = new v("function" == typeof t ? t : this._resetTrace, n);
                                }
                            }, i.prototype._setTrace = function(t, e) {
                                if (D) {
                                    var n = this._peekContext();
                                    this._traceParent = n;
                                    var r = void 0 === n;
                                    this._trace = void 0 !== e && e._traceParent === n ? e._trace : new v("function" == typeof t ? t : this._setTrace, r);
                                }
                                return this;
                            }, i.prototype._attachExtraTrace = function(t) {
                                if (D && M(t)) {
                                    var e = this, n = t.stack;
                                    n = "string" == typeof n ? n.split("\n") : [];
                                    for (var r = 1; null != e && null != e._trace; ) n = v.combine(n, e._trace.stack.split("\n")), 
                                    e = e._traceParent;
                                    var i = Error.stackTraceLimit + r, o = n.length;
                                    o > i && (n.length = i), t.stack = n.length <= r ? "(No stack trace)" : n.join("\n"), 
                                    t.__promiseHandled__ = B(t.__promiseHandled__);
                                }
                            }, i.prototype._notifyUnhandledRejection = function(t) {
                                I(t.__promiseHandled__) || (t.__promiseHandled__ = N(t.__promiseHandled__), v.possiblyUnhandledRejection(t, this));
                            }, i.prototype._unhandledRejection = function(t) {
                                I(t.__promiseHandled__) || c.invokeLater(this._notifyUnhandledRejection, this, t);
                            }, i.prototype._cleanValues = function() {
                                this._cancellable() && (this._cancellationParent = void 0);
                            }, i.prototype._fulfill = function(t) {
                                this._isFollowingOrFulfilledOrRejected() || this._fulfillUnchecked(t);
                            }, i.prototype._reject = function(t) {
                                this._isFollowingOrFulfilledOrRejected() || this._rejectUnchecked(t);
                            }, i.prototype._settlePromiseAt = function(t) {
                                var e = this.isFulfilled() ? this._fulfillmentHandlerAt(t) : this._rejectionHandlerAt(t), n = this._settledValue, o = this._receiverAt(t), s = this._promiseAt(t);
                                if ("function" == typeof e) this._settlePromiseFromHandler(e, o, n, s); else {
                                    var u = !1, a = this.isFulfilled();
                                    void 0 !== o && (o instanceof i && o._isProxied() ? (o._unsetProxied(), a ? o._fulfillUnchecked(n) : o._rejectUnchecked(n), 
                                    u = !0) : r(o, s) && (a ? o._promiseFulfilled(n, s) : o._promiseRejected(n, s), 
                                    u = !0)), u || (a ? s._fulfill(n) : s._reject(n));
                                }
                                t >= 256 && this._queueGC();
                            }, i.prototype._isProxied = function() {
                                return 4194304 === (4194304 & this._bitField);
                            }, i.prototype._setProxied = function() {
                                this._bitField = 4194304 | this._bitField;
                            }, i.prototype._unsetProxied = function() {
                                this._bitField = -4194305 & this._bitField;
                            }, i.prototype._isGcQueued = function() {
                                return -1073741824 === (-1073741824 & this._bitField);
                            }, i.prototype._setGcQueued = function() {
                                this._bitField = -1073741824 | this._bitField;
                            }, i.prototype._unsetGcQueued = function() {
                                this._bitField = 1073741823 & this._bitField;
                            }, i.prototype._queueGC = function() {
                                this._isGcQueued() || (this._setGcQueued(), c.invokeLater(this._gc, this, void 0));
                            }, i.prototype._gc = function() {
                                var t = this._length();
                                this._unsetAt(0);
                                for (var e = 0; t > e; e++) delete this[e];
                                this._setLength(0), this._unsetGcQueued();
                            }, i.prototype._queueSettleAt = function(t) {
                                c.invoke(this._settlePromiseAt, this, t);
                            }, i.prototype._fulfillUnchecked = function(t) {
                                if (this.isPending()) {
                                    if (t === this) {
                                        var e = L();
                                        return this._attachExtraTrace(e), this._rejectUnchecked(e);
                                    }
                                    this._cleanValues(), this._setFulfilled(), this._settledValue = t;
                                    var n = this._length();
                                    n > 0 && c.invoke(this._fulfillPromises, this, n);
                                }
                            }, i.prototype._fulfillPromises = function(t) {
                                t = this._length();
                                for (var e = 0; t > e; e += 5) this._settlePromiseAt(e);
                            }, i.prototype._rejectUnchecked = function(t) {
                                if (this.isPending()) {
                                    if (t === this) {
                                        var e = L();
                                        return this._attachExtraTrace(e), this._rejectUnchecked(e);
                                    }
                                    if (this._cleanValues(), this._setRejected(), this._settledValue = t, this._isFinal()) return void c.invokeLater(q, void 0, t);
                                    var n = this._length();
                                    n > 0 ? c.invoke(this._rejectPromises, this, n) : this._ensurePossibleRejectionHandled(t);
                                }
                            }, i.prototype._rejectPromises = function(t) {
                                t = this._length();
                                for (var n = !1, i = 0; t > i; i += 5) {
                                    var o = this._rejectionHandlerAt(i);
                                    if (!n) if ("function" == typeof o) n = !0; else {
                                        var s = this._promiseAt(i);
                                        if (e(s) && s._length() > 0) n = !0; else {
                                            var u = this._receiverAt(i);
                                            (e(u) && u._length() > 0 || r(u, s)) && (n = !0);
                                        }
                                    }
                                    this._settlePromiseAt(i);
                                }
                                n || this._ensurePossibleRejectionHandled(this._settledValue);
                            }, i.prototype._ensurePossibleRejectionHandled = function(t) {
                                if (void 0 !== v.possiblyUnhandledRejection && b(t)) {
                                    var e = t.__promiseHandled__, n = t;
                                    if (void 0 === e) n = w(t, "__promiseHandled__", 0), e = 0; else if (I(e)) return;
                                    H(e) || this._attachExtraTrace(n), c.invoke(this._unhandledRejection, this, n);
                                }
                            };
                            var U = [];
                            i.prototype._peekContext = function() {
                                var t = U.length - 1;
                                return t >= 0 ? U[t] : void 0;
                            }, i.prototype._pushContext = function() {
                                D && U.push(this);
                            }, i.prototype._popContext = function() {
                                D && U.pop();
                            };
                            var z = u.Promise;
                            return i.noConflict = function() {
                                return u.Promise === i && (u.Promise = z), i;
                            }, v.isSupported() || (i.longStackTraces = function() {}, D = !1), i._makeSelfResolutionError = L, 
                            t("./finally.js")(i, p), t("./direct_resolve.js")(i), t("./thenables.js")(i), i.RangeError = A, 
                            i.CancellationError = P, i.TimeoutError = F, i.TypeError = E, i.RejectionError = O, 
                            t("./timers.js")(i, f), t("./synchronous_inspection.js")(i), t("./any.js")(i, s, h), 
                            t("./race.js")(i, f), t("./call_get.js")(i), t("./filter.js")(i, s, h, V), t("./generators.js")(i, V, f), 
                            t("./map.js")(i, s, h, V), t("./nodeify.js")(i), t("./promisify.js")(i, f), t("./props.js")(i, h), 
                            t("./reduce.js")(i, s, h, V), t("./settle.js")(i, s, h), t("./some.js")(i, s, h, V), 
                            t("./progress.js")(i, r), t("./cancel.js")(i, f), i.prototype = i.prototype, i;
                        };
                    }, {
                        "./any.js": 2,
                        "./assert.js": 3,
                        "./async.js": 4,
                        "./call_get.js": 6,
                        "./cancel.js": 7,
                        "./captured_trace.js": 8,
                        "./catch_filter.js": 9,
                        "./direct_resolve.js": 10,
                        "./errors.js": 11,
                        "./errors_api_rejection": 12,
                        "./filter.js": 14,
                        "./finally.js": 15,
                        "./generators.js": 16,
                        "./global.js": 17,
                        "./map.js": 18,
                        "./nodeify.js": 19,
                        "./progress.js": 20,
                        "./promise_array.js": 22,
                        "./promise_resolver.js": 24,
                        "./promisify.js": 26,
                        "./props.js": 28,
                        "./race.js": 30,
                        "./reduce.js": 31,
                        "./settle.js": 33,
                        "./some.js": 35,
                        "./synchronous_inspection.js": 37,
                        "./thenables.js": 38,
                        "./timers.js": 39,
                        "./util.js": 40,
                        __browserify_process: 76
                    } ],
                    22: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n) {
                            function r(t) {
                                switch (t) {
                                  case -1:
                                    return void 0;

                                  case -2:
                                    return [];

                                  case -3:
                                    return {};
                                }
                            }
                            function i(t, r, i) {
                                var o = this._promise = new e(n), s = void 0;
                                e.is(t) && (s = t, t._cancellable() && (o._setCancellable(), o._cancellationParent = t), 
                                t._isBound() && o._setBoundTo(i)), o._setTrace(r, s), this._values = t, this._length = 0, 
                                this._totalResolved = 0, this._init(void 0, -2);
                            }
                            var o = (t("./assert.js"), t("./errors.js").ensureNotHandled), s = t("./util.js"), u = t("./async.js"), a = {}.hasOwnProperty, c = s.isArray;
                            return i.PropertiesPromiseArray = function() {}, i.prototype.length = function() {
                                return this._length;
                            }, i.prototype.promise = function() {
                                return this._promise;
                            }, i.prototype._init = function(t, n) {
                                var o = this._values;
                                if (e.is(o)) {
                                    if (!o.isFulfilled()) return o.isPending() ? void o._then(this._init, this._reject, void 0, this, n, this.constructor) : void this._reject(o._settledValue);
                                    if (o = o._settledValue, !c(o)) {
                                        var s = new e.TypeError("expecting an array, a promise or a thenable");
                                        return void this.__hardReject__(s);
                                    }
                                    this._values = o;
                                }
                                if (0 === o.length) return void this._resolve(r(n));
                                var l, f = o.length, d = f;
                                l = this instanceof i.PropertiesPromiseArray ? this._values : new Array(f);
                                for (var p = !1, h = 0; f > h; ++h) {
                                    var v = o[h];
                                    if (void 0 !== v || a.call(o, h)) {
                                        var _ = e._cast(v, void 0, void 0);
                                        _ instanceof e && _.isPending() ? _._proxyPromiseArray(this, h) : p = !0, l[h] = _;
                                    } else d--;
                                }
                                if (0 === d) return void this._resolve(-2 === n ? l : r(n));
                                if (this._values = l, this._length = d, p) {
                                    var y = d === f ? this._scanDirectValues : this._scanDirectValuesHoled;
                                    u.invoke(y, this, f);
                                }
                            }, i.prototype._settlePromiseAt = function(t) {
                                var n = this._values[t];
                                e.is(n) ? n.isFulfilled() ? this._promiseFulfilled(n._settledValue, t) : n.isRejected() && this._promiseRejected(n._settledValue, t) : this._promiseFulfilled(n, t);
                            }, i.prototype._scanDirectValuesHoled = function(t) {
                                for (var e = 0; t > e && !this._isResolved(); ++e) a.call(this._values, e) && this._settlePromiseAt(e);
                            }, i.prototype._scanDirectValues = function(t) {
                                for (var e = 0; t > e && !this._isResolved(); ++e) this._settlePromiseAt(e);
                            }, i.prototype._isResolved = function() {
                                return null === this._values;
                            }, i.prototype._resolve = function(t) {
                                this._values = null, this._promise._fulfill(t);
                            }, i.prototype.__hardReject__ = i.prototype._reject = function(t) {
                                o(t), this._values = null, this._promise._attachExtraTrace(t), this._promise._reject(t);
                            }, i.prototype._promiseProgressed = function(t, e) {
                                this._isResolved() || this._promise._progress({
                                    index: e,
                                    value: t
                                });
                            }, i.prototype._promiseFulfilled = function(t, e) {
                                if (!this._isResolved()) {
                                    this._values[e] = t;
                                    var n = ++this._totalResolved;
                                    n >= this._length && this._resolve(this._values);
                                }
                            }, i.prototype._promiseRejected = function(t) {
                                this._isResolved() || (this._totalResolved++, this._reject(t));
                            }, i;
                        };
                    }, {
                        "./assert.js": 3,
                        "./async.js": 4,
                        "./errors.js": 11,
                        "./util.js": 40
                    } ],
                    23: [ function(t, e) {
                        "use strict";
                        function n(t) {
                            void 0 !== t ? (this._bitField = t._bitField, this._settledValue = t.isResolved() ? t._settledValue : void 0) : (this._bitField = 0, 
                            this._settledValue = void 0);
                        }
                        var r = t("./errors.js").TypeError;
                        n.prototype.isFulfilled = function() {
                            return (268435456 & this._bitField) > 0;
                        }, n.prototype.isRejected = function() {
                            return (134217728 & this._bitField) > 0;
                        }, n.prototype.isPending = function() {
                            return 0 === (402653184 & this._bitField);
                        }, n.prototype.value = function() {
                            if (!this.isFulfilled()) throw new r("cannot get fulfillment value of a non-fulfilled promise");
                            return this._settledValue;
                        }, n.prototype.error = function() {
                            if (!this.isRejected()) throw new r("cannot get rejection reason of a non-rejected promise");
                            return this._settledValue;
                        }, e.exports = n;
                    }, {
                        "./errors.js": 11
                    } ],
                    24: [ function(t, e) {
                        "use strict";
                        function n(t) {
                            return t instanceof Error && p.getPrototypeOf(t) === Error.prototype;
                        }
                        function r(t) {
                            var e;
                            return e = n(t) ? new l(t) : t, a.markAsOriginatingFromRejection(e), e;
                        }
                        function i(t) {
                            function e(e, n) {
                                if (e) {
                                    var i = r(u(e));
                                    t._attachExtraTrace(i), t._reject(i);
                                } else if (arguments.length > 2) {
                                    for (var o = arguments.length, s = new Array(o - 1), a = 1; o > a; ++a) s[a - 1] = arguments[a];
                                    t._fulfill(s);
                                } else t._fulfill(n);
                            }
                            return e;
                        }
                        var o, s = t("./util.js"), u = s.maybeWrapAsError, a = t("./errors.js"), c = a.TimeoutError, l = a.RejectionError, f = t("./async.js"), d = s.haveGetters, p = t("./es5.js");
                        if (o = d ? function(t) {
                            this.promise = t;
                        } : function(t) {
                            this.promise = t, this.asCallback = i(t), this.callback = this.asCallback;
                        }, d) {
                            var h = {
                                get: function() {
                                    return i(this.promise);
                                }
                            };
                            p.defineProperty(o.prototype, "asCallback", h), p.defineProperty(o.prototype, "callback", h);
                        }
                        o._nodebackForPromise = i, o.prototype.toString = function() {
                            return "[object PromiseResolver]";
                        }, o.prototype.resolve = o.prototype.fulfill = function(t) {
                            var e = this.promise;
                            e._tryFollow(t) || f.invoke(e._fulfill, e, t);
                        }, o.prototype.reject = function(t) {
                            var e = this.promise;
                            a.markAsOriginatingFromRejection(t), e._attachExtraTrace(t), f.invoke(e._reject, e, t);
                        }, o.prototype.progress = function(t) {
                            f.invoke(this.promise._progress, this.promise, t);
                        }, o.prototype.cancel = function() {
                            f.invoke(this.promise.cancel, this.promise, void 0);
                        }, o.prototype.timeout = function() {
                            this.reject(new c("timeout"));
                        }, o.prototype.isResolved = function() {
                            return this.promise.isResolved();
                        }, o.prototype.toJSON = function() {
                            return this.promise.toJSON();
                        }, e.exports = o;
                    }, {
                        "./async.js": 4,
                        "./errors.js": 11,
                        "./es5.js": 13,
                        "./util.js": 40
                    } ],
                    25: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n) {
                            function r(t, r, i) {
                                var o = this._promise = new e(n);
                                o._setTrace(i, void 0), this._generatorFunction = t, this._receiver = r, this._generator = void 0;
                            }
                            var i = t("./errors.js"), o = i.TypeError, s = i.ensureNotHandled, u = t("./util.js"), a = u.isArray, c = u.errorObj, l = u.tryCatch1;
                            return r.prototype.promise = function() {
                                return this._promise;
                            }, r.prototype._run = function() {
                                this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, 
                                this._next(void 0);
                            }, r.prototype._continue = function f(t) {
                                if (t === c) return this._generator = void 0, this._promise._attachExtraTrace(t.e), 
                                void this._promise._reject(t.e);
                                var n = t.value;
                                if (t.done === !0) this._generator = void 0, this._promise._fulfill(n); else {
                                    var r = e._cast(n, f, void 0);
                                    if (!(r instanceof e)) {
                                        if (!a(r)) return void this._throw(new o("A value was yielded that could not be treated as a promise"));
                                        r = e.all(r);
                                    }
                                    r._then(this._next, this._throw, void 0, this, null, void 0);
                                }
                            }, r.prototype._throw = function(t) {
                                s(t), this._promise._attachExtraTrace(t), this._continue(l(this._generator["throw"], this._generator, t));
                            }, r.prototype._next = function(t) {
                                this._continue(l(this._generator.next, this._generator, t));
                            }, r;
                        };
                    }, {
                        "./errors.js": 11,
                        "./util.js": 40
                    } ],
                    26: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n) {
                            function r(t) {
                                return t.__isPromisified__ === !0;
                            }
                            function i(t, r, i) {
                                function o(e) {
                                    for (var n = new Array(e), i = 0, o = n.length; o > i; ++i) n[i] = "a" + (i + 1);
                                    var s = e > 0 ? "," : "";
                                    return "string" == typeof t && r === a ? "this['" + t + "'](" + n.join(",") + s + " fn);break;" : (void 0 === r ? "callback(" + n.join(",") + s + " fn);" : "callback.call(" + (r === a ? "this" : "receiver") + ", " + n.join(",") + s + " fn);") + "break;";
                                }
                                function s() {
                                    return "var args = new Array(len + 1);var i = 0;for (var i = 0; i < len; ++i) {    args[i] = arguments[i];}args[i] = fn;";
                                }
                                var u = "string" == typeof i ? i + "Async" : "promisified";
                                return new Function("Promise", "callback", "receiver", "withAppended", "maybeWrapAsError", "nodebackForPromise", "INTERNAL", "var ret = function " + u + '(a1, a2, a3, a4, a5) {"use strict";var len = arguments.length;var promise = new Promise(INTERNAL);promise._setTrace(' + u + ", void 0);var fn = nodebackForPromise(promise);try{switch(len) {case 1:" + o(1) + "case 2:" + o(2) + "case 3:" + o(3) + "case 0:" + o(0) + "case 4:" + o(4) + "case 5:" + o(5) + "default: " + s() + ("string" == typeof t ? "this['" + t + "'].apply(" : "callback.apply(") + (r === a ? "this" : "receiver") + ", args); break;}}catch(e){ var wrapped = maybeWrapAsError(e);promise._attachExtraTrace(wrapped);promise._reject(wrapped);}return promise;}; ret.__isPromisified__ = true; return ret;")(e, t, r, d, p, f, n);
                            }
                            function o(t, r) {
                                function i() {
                                    var o = r;
                                    r === a && (o = this), "string" == typeof t && (t = o[t]);
                                    var s = new e(n);
                                    s._setTrace(i, void 0);
                                    var u = f(s);
                                    try {
                                        t.apply(o, d(arguments, u));
                                    } catch (c) {
                                        var l = p(c);
                                        s._attachExtraTrace(l), s._reject(l);
                                    }
                                    return s;
                                }
                                return i.__isPromisified__ = !0, i;
                            }
                            function s() {}
                            function u(t, e, n) {
                                if (n) {
                                    for (var r = g(t), i = 0, o = r.length; o > i; i += 2) {
                                        var u = r[i], c = r[i + 1], l = u + "__beforePromisified__", f = u + "Async";
                                        v(t, l, c), t[f] = b(l, a, u);
                                    }
                                    return r.length > 16 && (s.prototype = t), t;
                                }
                                return b(t, e, void 0);
                            }
                            var a = {}, c = t("./util.js"), l = t("./es5.js"), f = t("./promise_resolver.js")._nodebackForPromise, d = c.withAppended, p = c.maybeWrapAsError, h = c.canEvaluate, v = c.notEnumerableProp, _ = c.deprecated, y = (t("./assert.js"), 
                            new RegExp("__beforePromisified__$")), m = {}.hasOwnProperty, g = function() {
                                if (l.isES5) {
                                    var t = Object.create, e = Object.getOwnPropertyDescriptor;
                                    return function(n) {
                                        for (var i = n, o = [], s = t(null); null !== n; ) {
                                            for (var u = l.keys(n), a = 0, c = u.length; c > a; ++a) {
                                                var f = u[a];
                                                if (!(s[f] || y.test(f) || m.call(i, f + "__beforePromisified__"))) {
                                                    s[f] = !0;
                                                    var d = e(n, f);
                                                    null == d || "function" != typeof d.value || r(d.value) || o.push(f, d.value);
                                                }
                                            }
                                            n = l.getPrototypeOf(n);
                                        }
                                        return o;
                                    };
                                }
                                return function(t) {
                                    var e = [];
                                    for (var n in t) if (!y.test(n) && !m.call(t, n + "__beforePromisified__")) {
                                        var i = t[n];
                                        "function" != typeof i || r(i) || e.push(n, i);
                                    }
                                    return e;
                                };
                            }(), b = h ? i : o;
                            e.promisify = function(t, e) {
                                if ("object" == typeof t && null !== t) return _("Promise.promisify for promisifying entire objects is deprecated. Use Promise.promisifyAll instead."), 
                                u(t, e, !0);
                                if ("function" != typeof t) throw new TypeError("fn must be a function");
                                return r(t) ? t : u(t, arguments.length < 2 ? a : e, !1);
                            }, e.promisifyAll = function(t) {
                                if ("function" != typeof t && "object" != typeof t) throw new TypeError("the target of promisifyAll must be an object or a function");
                                return u(t, void 0, !0);
                            };
                        };
                    }, {
                        "./assert.js": 3,
                        "./es5.js": 13,
                        "./promise_resolver.js": 24,
                        "./util.js": 40
                    } ],
                    27: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n) {
                            function r(t, e, n) {
                                for (var r = s.keys(t), i = new Array(r.length), o = 0, u = i.length; u > o; ++o) i[o] = t[r[o]];
                                if (this.constructor$(i, e, n), !this._isResolved()) for (var o = 0, u = r.length; u > o; ++o) i.push(r[o]);
                            }
                            var i = (t("./assert.js"), t("./util.js")), o = i.inherits, s = t("./es5.js");
                            return o(r, n), r.prototype._init = function() {
                                this._init$(void 0, -3);
                            }, r.prototype._promiseFulfilled = function(t, e) {
                                if (!this._isResolved()) {
                                    this._values[e] = t;
                                    var n = ++this._totalResolved;
                                    if (n >= this._length) {
                                        for (var r = {}, i = this.length(), o = 0, s = this.length(); s > o; ++o) r[this._values[o + i]] = this._values[o];
                                        this._resolve(r);
                                    }
                                }
                            }, r.prototype._promiseProgressed = function(t, e) {
                                this._isResolved() || this._promise._progress({
                                    key: this._values[e + this.length()],
                                    value: t
                                });
                            }, n.PropertiesPromiseArray = r, r;
                        };
                    }, {
                        "./assert.js": 3,
                        "./es5.js": 13,
                        "./util.js": 40
                    } ],
                    28: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n) {
                            function r(t, n, r) {
                                var o, a = e._cast(t, r, void 0);
                                return u(a) ? (e.is(a) ? o = a._then(e.props, void 0, void 0, void 0, void 0, r) : (o = new i(a, r, n === !0 && a._isBound() ? a._boundTo : void 0).promise(), 
                                n = !1), n === !0 && a._isBound() && o._setBoundTo(a._boundTo), o) : s("cannot await properties of a non-object");
                            }
                            var i = t("./properties_promise_array.js")(e, n), o = t("./util.js"), s = t("./errors_api_rejection")(e), u = o.isObject;
                            e.prototype.props = function() {
                                return r(this, !0, this.props);
                            }, e.props = function(t) {
                                return r(t, !1, e.props);
                            };
                        };
                    }, {
                        "./errors_api_rejection": 12,
                        "./properties_promise_array.js": 27,
                        "./util.js": 40
                    } ],
                    29: [ function(t, e) {
                        "use strict";
                        function n(t, e, n, r, i) {
                            for (var o = 0; i > o; ++o) n[o + r] = t[o + e];
                        }
                        function r(t) {
                            return t >>>= 0, t -= 1, t |= t >> 1, t |= t >> 2, t |= t >> 4, t |= t >> 8, t |= t >> 16, 
                            t + 1;
                        }
                        function i(t) {
                            return "number" != typeof t ? 16 : r(Math.min(Math.max(16, t), 1073741824));
                        }
                        function o(t) {
                            this._capacity = i(t), this._length = 0, this._front = 0, this._makeCapacity();
                        }
                        t("./assert.js"), o.prototype._willBeOverCapacity = function(t) {
                            return this._capacity < t;
                        }, o.prototype._pushOne = function(t) {
                            var e = this.length();
                            this._checkCapacity(e + 1);
                            var n = this._front + e & this._capacity - 1;
                            this[n] = t, this._length = e + 1;
                        }, o.prototype.push = function(t, e, n) {
                            var r = this.length() + 3;
                            if (this._willBeOverCapacity(r)) return this._pushOne(t), this._pushOne(e), void this._pushOne(n);
                            var i = this._front + r - 3;
                            this._checkCapacity(r);
                            var o = this._capacity - 1;
                            this[i + 0 & o] = t, this[i + 1 & o] = e, this[i + 2 & o] = n, this._length = r;
                        }, o.prototype.shift = function() {
                            var t = this._front, e = this[t];
                            return this[t] = void 0, this._front = t + 1 & this._capacity - 1, this._length--, 
                            e;
                        }, o.prototype.length = function() {
                            return this._length;
                        }, o.prototype._makeCapacity = function() {
                            for (var t = this._capacity, e = 0; t > e; ++e) this[e] = void 0;
                        }, o.prototype._checkCapacity = function(t) {
                            this._capacity < t && this._resizeTo(this._capacity << 3);
                        }, o.prototype._resizeTo = function(t) {
                            var e = this._front, r = this._capacity, i = new Array(r), o = this.length();
                            if (n(this, 0, i, 0, r), this._capacity = t, this._makeCapacity(), this._front = 0, 
                            r >= e + o) n(i, e, this, 0, o); else {
                                var s = o - (e + o & r - 1);
                                n(i, e, this, 0, s), n(i, 0, this, s, o - s);
                            }
                        }, e.exports = o;
                    }, {
                        "./assert.js": 3
                    } ],
                    30: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n) {
                            function r(t, r, a) {
                                var c = e._cast(t, r, void 0);
                                if (e.is(c)) return s(c);
                                if (!o(t)) return i("expecting an array, a promise or a thenable");
                                var l = new e(n);
                                l._setTrace(r, a), void 0 !== a && (a._isBound() && l._setBoundTo(a._boundTo), a._cancellable() && (l._setCancellable(), 
                                l._cancellationParent = a));
                                for (var f = l._fulfill, d = l._reject, p = 0, h = t.length; h > p; ++p) {
                                    var v = t[p];
                                    (void 0 !== v || u.call(t, p)) && e.cast(v)._then(f, d, void 0, l, null, r);
                                }
                                return l;
                            }
                            var i = t("./errors_api_rejection.js")(e), o = t("./util.js").isArray, s = function(t) {
                                return t.then(function e(n) {
                                    return r(n, e, t);
                                });
                            }, u = {}.hasOwnProperty;
                            e.race = function(t) {
                                return r(t, e.race, void 0);
                            }, e.prototype.race = function() {
                                return r(this, this.race, void 0);
                            };
                        };
                    }, {
                        "./errors_api_rejection.js": 12,
                        "./util.js": 40
                    } ],
                    31: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n, r, i) {
                            function o(t, e) {
                                var n = this, r = void 0;
                                "function" != typeof n && (r = n.receiver, n = n.fn);
                                var i = t.length, o = void 0, s = 0;
                                if (void 0 !== e) o = e, s = 0; else if (s = 1, i > 0) for (var u = 0; i > u; ++u) if (void 0 !== t[u] || u in t) {
                                    o = t[u], s = u + 1;
                                    break;
                                }
                                if (void 0 === r) for (var u = s; i > u; ++u) (void 0 !== t[u] || u in t) && (o = n(o, t[u], u, i)); else for (var u = s; i > u; ++u) (void 0 !== t[u] || u in t) && (o = n.call(r, o, t[u], u, i));
                                return o;
                            }
                            function s(t) {
                                var e = this.fn, n = this.initialValue;
                                return o.call(e, t, n);
                            }
                            function u(t, e, n, r, i) {
                                return n._then(function o(n) {
                                    return a(t, e, n, r, o);
                                }, void 0, void 0, void 0, void 0, i);
                            }
                            function a(t, a, c, l, f) {
                                if ("function" != typeof a) return i("fn must be a function");
                                if (l === !0 && t._isBound() && (a = {
                                    fn: a,
                                    receiver: t._boundTo
                                }), void 0 !== c) {
                                    if (e.is(c)) {
                                        if (!c.isFulfilled()) return u(t, a, c, l, f);
                                        c = c._settledValue;
                                    }
                                    return n(t, r, f, l === !0 && t._isBound() ? t._boundTo : void 0).promise()._then(s, void 0, void 0, {
                                        fn: a,
                                        initialValue: c
                                    }, void 0, e.reduce);
                                }
                                return n(t, r, f, l === !0 && t._isBound() ? t._boundTo : void 0).promise()._then(o, void 0, void 0, a, void 0, f);
                            }
                            t("./assert.js"), e.reduce = function(t, n, r) {
                                return a(t, n, r, !1, e.reduce);
                            }, e.prototype.reduce = function(t, e) {
                                return a(this, t, e, !0, this.reduce);
                            };
                        };
                    }, {
                        "./assert.js": 3
                    } ],
                    32: [ function(t, e) {
                        var n, r = t("__browserify_process"), i = t("./global.js");
                        if (t("./assert.js"), "undefined" != typeof r && null !== r && "function" == typeof r.cwd && "function" == typeof r.nextTick) n = r.nextTick; else if ("function" != typeof MutationObserver && "function" != typeof WebkitMutationObserver && "function" != typeof WebKitMutationObserver || "undefined" == typeof document || "function" != typeof document.createElement) if ("function" == typeof i.postMessage && "function" != typeof i.importScripts && "function" == typeof i.addEventListener && "function" == typeof i.removeEventListener) {
                            var o = "bluebird_message_key_" + Math.random();
                            n = function() {
                                function t(t) {
                                    if (t.source === i && t.data === o) {
                                        var n = e;
                                        e = void 0, n();
                                    }
                                }
                                var e = void 0;
                                return i.addEventListener("message", t, !1), function(t) {
                                    e = t, i.postMessage(o, "*");
                                };
                            }();
                        } else n = "function" == typeof MessageChannel ? function() {
                            var t = void 0, e = new MessageChannel();
                            return e.port1.onmessage = function() {
                                var e = t;
                                t = void 0, e();
                            }, function(n) {
                                t = n, e.port2.postMessage(null);
                            };
                        }() : i.setTimeout ? function(t) {
                            setTimeout(t, 4);
                        } : function(t) {
                            t();
                        }; else n = function() {
                            var t = i.MutationObserver || i.WebkitMutationObserver || i.WebKitMutationObserver, e = document.createElement("div"), n = void 0, r = new t(function() {
                                var t = n;
                                n = void 0, t();
                            });
                            return r.observe(e, {
                                attributes: !0
                            }), function(t) {
                                n = t, e.setAttribute("class", "foo");
                            };
                        }();
                        e.exports = n;
                    }, {
                        "./assert.js": 3,
                        "./global.js": 17,
                        __browserify_process: 76
                    } ],
                    33: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n, r) {
                            function i(t, e, r) {
                                return n(t, o, r, e === !0 && t._isBound() ? t._boundTo : void 0).promise();
                            }
                            var o = t("./settled_promise_array.js")(e, r);
                            e.settle = function(t) {
                                return i(t, !1, e.settle);
                            }, e.prototype.settle = function() {
                                return i(this, !0, this.settle);
                            };
                        };
                    }, {
                        "./settled_promise_array.js": 34
                    } ],
                    34: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n) {
                            function r(t, e, n) {
                                this.constructor$(t, e, n);
                            }
                            var i = (t("./assert.js"), t("./promise_inspection.js")), o = t("./util.js"), s = o.inherits;
                            return s(r, n), r.prototype._promiseResolved = function(t, e) {
                                this._values[t] = e;
                                var n = ++this._totalResolved;
                                n >= this._length && this._resolve(this._values);
                            }, r.prototype._promiseFulfilled = function(t, e) {
                                if (!this._isResolved()) {
                                    var n = new i();
                                    n._bitField = 268435456, n._settledValue = t, this._promiseResolved(e, n);
                                }
                            }, r.prototype._promiseRejected = function(t, e) {
                                if (!this._isResolved()) {
                                    var n = new i();
                                    n._bitField = 134217728, n._settledValue = t, this._promiseResolved(e, n);
                                }
                            }, r;
                        };
                    }, {
                        "./assert.js": 3,
                        "./promise_inspection.js": 23,
                        "./util.js": 40
                    } ],
                    35: [ function(t, e) {
                        "use strict";
                        e.exports = function(e, n, r, i) {
                            function o(t, e, r, o) {
                                if ((0 | e) !== e || 0 > e) return i("expecting a positive integer");
                                var u = n(t, s, o, r === !0 && t._isBound() ? t._boundTo : void 0), a = u.promise();
                                return a.isRejected() ? a : (u.setHowMany(e), u.init(), a);
                            }
                            var s = t("./some_promise_array.js")(r);
                            t("./assert.js"), e.some = function(t, n) {
                                return o(t, n, !1, e.some);
                            }, e.prototype.some = function(t) {
                                return o(this, t, !0, this.some);
                            };
                        };
                    }, {
                        "./assert.js": 3,
                        "./some_promise_array.js": 36
                    } ],
                    36: [ function(t, e) {
                        "use strict";
                        e.exports = function(e) {
                            function n(t, e, n) {
                                this.constructor$(t, e, n), this._howMany = 0, this._unwrap = !1, this._initialized = !1;
                            }
                            var r = t("./util.js"), i = t("./errors.js").RangeError, o = r.inherits, s = r.isArray;
                            return o(n, e), n.prototype._init = function() {
                                if (this._initialized) {
                                    if (0 === this._howMany) return void this._resolve([]);
                                    this._init$(void 0, -2);
                                    var t = s(this._values);
                                    if (this._holes = t ? this._values.length - this.length() : 0, !this._isResolved() && t && this._howMany > this._canPossiblyFulfill()) {
                                        var e = "(Promise.some) input array contains less than " + this._howMany + " promises";
                                        this._reject(new i(e));
                                    }
                                }
                            }, n.prototype.init = function() {
                                this._initialized = !0, this._init();
                            }, n.prototype.setUnwrap = function() {
                                this._unwrap = !0;
                            }, n.prototype.howMany = function() {
                                return this._howMany;
                            }, n.prototype.setHowMany = function(t) {
                                this._isResolved() || (this._howMany = t);
                            }, n.prototype._promiseFulfilled = function(t) {
                                this._isResolved() || (this._addFulfilled(t), this._fulfilled() === this.howMany() && (this._values.length = this.howMany(), 
                                this._resolve(1 === this.howMany() && this._unwrap ? this._values[0] : this._values)));
                            }, n.prototype._promiseRejected = function(t) {
                                this._isResolved() || (this._addRejected(t), this.howMany() > this._canPossiblyFulfill() && this._reject(this._values.length === this.length() ? [] : this._values.slice(this.length() + this._holes)));
                            }, n.prototype._fulfilled = function() {
                                return this._totalResolved;
                            }, n.prototype._rejected = function() {
                                return this._values.length - this.length() - this._holes;
                            }, n.prototype._addRejected = function(t) {
                                this._values.push(t);
                            }, n.prototype._addFulfilled = function(t) {
                                this._values[this._totalResolved++] = t;
                            }, n.prototype._canPossiblyFulfill = function() {
                                return this.length() - this._rejected();
                            }, n;
                        };
                    }, {
                        "./errors.js": 11,
                        "./util.js": 40
                    } ],
                    37: [ function(t, e) {
                        "use strict";
                        e.exports = function(e) {
                            var n = t("./promise_inspection.js");
                            e.prototype.inspect = function() {
                                return new n(this);
                            };
                        };
                    }, {
                        "./promise_inspection.js": 23
                    } ],
                    38: [ function(t, e) {
                        "use strict";
                        e.exports = function(e) {
                            function n(t) {
                                try {
                                    return t.then;
                                } catch (e) {
                                    return u.e = e, u;
                                }
                            }
                            function r(t, o, s) {
                                if (a(t)) {
                                    if (t instanceof e) return t;
                                    var c = n(t);
                                    if (c === u) return o = "function" == typeof o ? o : r, void 0 !== s && s._attachExtraTrace(c.e), 
                                    e.reject(c.e, o);
                                    if ("function" == typeof c) return o = "function" == typeof o ? o : r, i(t, c, o, s);
                                }
                                return t;
                            }
                            function i(t, n, r, i) {
                                function s(n) {
                                    if (!f) {
                                        if (f = !0, t === n) {
                                            var r = e._makeSelfResolutionError();
                                            return void 0 !== i && i._attachExtraTrace(r), void l.reject(r);
                                        }
                                        l.resolve(n);
                                    }
                                }
                                function a(t) {
                                    f || (f = !0, o.markAsOriginatingFromRejection(t), void 0 !== i && i._attachExtraTrace(t), 
                                    l.reject(t));
                                }
                                var l = e.defer(r), f = !1, d = c(n, t, s, a);
                                return d !== u || f || (f = !0, void 0 !== i && i._attachExtraTrace(d.e), l.promise._reject(d.e)), 
                                l.promise;
                            }
                            var o = (t("./assert.js"), t("./errors.js")), s = t("./util.js"), u = s.errorObj, a = s.isObject, c = s.tryCatch2;
                            e._cast = r;
                        };
                    }, {
                        "./assert.js": 3,
                        "./errors.js": 11,
                        "./util.js": 40
                    } ],
                    39: [ function(t, e) {
                        "use strict";
                        var n = t("./global.js"), r = function(t, e) {
                            for (var r = arguments.length, i = new Array(r - 2), o = 2; r > o; ++o) i[o - 2] = arguments[o];
                            n.setTimeout(function() {
                                t.apply(void 0, i);
                            }, e);
                        }, i = {};
                        n.setTimeout(function(t) {
                            t === i && (r = n.setTimeout);
                        }, 1, i), e.exports = function(e, n) {
                            var i = (t("./util.js"), t("./assert.js"), t("./errors.js")), o = t("./errors_api_rejection")(e), s = e.TimeoutError, u = function(t, e, n) {
                                if (t.isPending()) {
                                    "string" != typeof e && (e = "operation timed out after " + n + " ms");
                                    var r = new s(e);
                                    i.markAsOriginatingFromRejection(r), t._attachExtraTrace(r), t._rejectUnchecked(r);
                                }
                            }, a = function(t, e) {
                                e._fulfill(t);
                            };
                            e.delay = function(t, i, s) {
                                if (void 0 === i && (i = t, t = void 0), (0 | i) !== i || 0 > i) return o("expecting a positive integer");
                                "function" != typeof s && (s = e.delay);
                                var u = e._cast(t, s, void 0), c = new e(n);
                                return e.is(u) ? (u._isBound() && c._setBoundTo(u._boundTo), u._cancellable() && (c._setCancellable(), 
                                c._cancellationParent = u), c._setTrace(s, u), c._follow(u), c.then(function(t) {
                                    return e.delay(t, i);
                                })) : (c._setTrace(s, void 0), r(a, i, t, c), c);
                            }, e.prototype.delay = function(t) {
                                return e.delay(this, t, this.delay);
                            }, e.prototype.timeout = function(t, i) {
                                if ((0 | t) !== t || 0 > t) return o("expecting a positive integer");
                                var s = new e(n);
                                return s._setTrace(this.timeout, this), this._isBound() && s._setBoundTo(this._boundTo), 
                                this._cancellable() && (s._setCancellable(), s._cancellationParent = this), s._follow(this), 
                                r(u, t, s, i, t), s;
                            };
                        };
                    }, {
                        "./assert.js": 3,
                        "./errors.js": 11,
                        "./errors_api_rejection": 12,
                        "./global.js": 17,
                        "./util.js": 40
                    } ],
                    40: [ function(t, e) {
                        "use strict";
                        function n(t) {
                            "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("Bluebird: " + t);
                        }
                        function r(t, e, n) {
                            try {
                                return t.call(e, n);
                            } catch (r) {
                                return m.e = r, m;
                            }
                        }
                        function i(t, e, n, r) {
                            try {
                                return t.call(e, n, r);
                            } catch (i) {
                                return m.e = i, m;
                            }
                        }
                        function o(t, e, n) {
                            try {
                                return t.apply(n, e);
                            } catch (r) {
                                return m.e = r, m;
                            }
                        }
                        function s(t) {
                            return "string" == typeof t ? t : "" + t;
                        }
                        function u(t) {
                            return null == t || t === !0 || t === !1 || "string" == typeof t || "number" == typeof t;
                        }
                        function a(t) {
                            return !u(t);
                        }
                        function c(t) {
                            return u(t) ? new Error(s(t)) : t;
                        }
                        function l(t, e) {
                            var n, r = t.length, i = new Array(r + 1);
                            for (n = 0; r > n; ++n) i[n] = t[n];
                            return i[n] = e, i;
                        }
                        function f(t, e, n) {
                            var r = {
                                value: n,
                                configurable: !0,
                                enumerable: !1,
                                writable: !0
                            };
                            return h.defineProperty(t, e, r), t;
                        }
                        function d(t) {
                            throw t;
                        }
                        var p = t("./global.js"), h = (t("./assert.js"), t("./es5.js")), v = function() {
                            try {
                                var t = {};
                                return h.defineProperty(t, "f", {
                                    get: function() {
                                        return 3;
                                    }
                                }), 3 === t.f;
                            } catch (e) {
                                return !1;
                            }
                        }(), _ = function(t, e, n) {
                            try {
                                return f(t, e, n), t;
                            } catch (r) {
                                for (var i = {}, o = h.keys(t), s = 0, u = o.length; u > s; ++s) try {
                                    var a = o[s];
                                    i[a] = t[a];
                                } catch (c) {
                                    i[a] = c;
                                }
                                return f(i, e, n), i;
                            }
                        }, y = function() {
                            return "undefined" != typeof window && null !== window && "undefined" != typeof window.document && "undefined" != typeof navigator && null !== navigator && "string" == typeof navigator.appName && window === p ? !1 : !0;
                        }(), m = {
                            e: {}
                        }, g = function(t, e) {
                            function n() {
                                this.constructor = t, this.constructor$ = e;
                                for (var n in e.prototype) r.call(e.prototype, n) && "$" !== n.charAt(n.length - 1) && (this[n + "$"] = e.prototype[n]);
                            }
                            var r = {}.hasOwnProperty;
                            return n.prototype = e.prototype, t.prototype = new n(), t.prototype;
                        }, b = function() {
                            return "string" !== this;
                        }.call("string"), w = {
                            thrower: d,
                            isArray: h.isArray,
                            haveGetters: v,
                            notEnumerableProp: f,
                            isPrimitive: u,
                            isObject: a,
                            ensurePropertyExpansion: _,
                            canEvaluate: y,
                            deprecated: n,
                            errorObj: m,
                            tryCatch1: r,
                            tryCatch2: i,
                            tryCatchApply: o,
                            inherits: g,
                            withAppended: l,
                            asString: s,
                            maybeWrapAsError: c,
                            wrapsPrimitiveReceiver: b
                        };
                        e.exports = w;
                    }, {
                        "./assert.js": 3,
                        "./es5.js": 13,
                        "./global.js": 17
                    } ],
                    41: [ function(t, e) {
                        function n(t, e) {
                            function n() {
                                4 === d.readyState && i();
                            }
                            function i() {
                                var t = null, n = d.statusCode = d.status, r = d.body = d.response || d.responseText || d.responseXML;
                                if (0 === n) {
                                    var i = d.responseText || a[String(d.status).charAt(0)];
                                    t = new Error(i), t.statusCode = d.status;
                                }
                                e(t, d, r);
                            }
                            function f(t) {
                                e(t, d);
                            }
                            "string" == typeof t && (t = {
                                uri: t
                            }), t = t || {}, e = o(e);
                            var d;
                            d = t.cors ? new l() : new c();
                            var p = d.url = t.uri, h = d.method = t.method || "GET", v = t.body || t.data, _ = d.headers = t.headers || {}, y = !!t.sync;
                            return d.onreadystatechange = n, d.onload = i, d.onerror = f, d.onprogress = function() {}, 
                            d.ontimeout = r, d.open(h, p, !y), t.cors && (d.withCredentials = !0), y || (d.timeout = "timeout" in t ? t.timeout : 5e3), 
                            d.setRequestHeader && u(s(_), function(t) {
                                d.setRequestHeader(t, _[t]);
                            }), d.send(v), d;
                        }
                        function r() {}
                        var i = t("global/window"), o = t("once"), s = t("lodash.keys"), u = t("lodash.foreach"), a = {
                            0: "Internal XMLHttpRequest Error"
                        }, c = i.XMLHttpRequest || r, l = "withCredentials" in new c() ? i.XMLHttpRequest : i.XDomainRequest;
                        e.exports = n;
                    }, {
                        "global/window": 42,
                        "lodash.foreach": 43,
                        "lodash.keys": 69,
                        once: 75
                    } ],
                    42: [ function(t, e) {
                        var n = "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};
                        e.exports = "undefined" != typeof window ? window : "undefined" != typeof n ? n : {};
                    }, {} ],
                    43: [ function(t, e) {
                        function n(t, e, n) {
                            var o = -1, s = t ? t.length : 0;
                            if (e = e && "undefined" == typeof n ? e : r(e, n, 3), "number" == typeof s) for (;++o < s && e(t[o], o, t) !== !1; ) ; else i(t, e);
                            return t;
                        }
                        var r = t("lodash._basecreatecallback"), i = t("lodash.forown");
                        e.exports = n;
                    }, {
                        "lodash._basecreatecallback": 44,
                        "lodash.forown": 67
                    } ],
                    44: [ function(t, e) {
                        function n(t, e, n) {
                            if ("function" != typeof t) return i;
                            if ("undefined" == typeof e || !("prototype" in t)) return t;
                            var l = t.__bindData__;
                            if ("undefined" == typeof l && (s.funcNames && (l = !t.name), l = l || !s.funcDecomp, 
                            !l)) {
                                var f = c.call(t);
                                s.funcNames || (l = !u.test(f)), l || (l = a.test(f), o(t, l));
                            }
                            if (l === !1 || l !== !0 && 1 & l[1]) return t;
                            switch (n) {
                              case 1:
                                return function(n) {
                                    return t.call(e, n);
                                };

                              case 2:
                                return function(n, r) {
                                    return t.call(e, n, r);
                                };

                              case 3:
                                return function(n, r, i) {
                                    return t.call(e, n, r, i);
                                };

                              case 4:
                                return function(n, r, i, o) {
                                    return t.call(e, n, r, i, o);
                                };
                            }
                            return r(t, e);
                        }
                        var r = t("lodash.bind"), i = t("lodash.identity"), o = t("lodash._setbinddata"), s = t("lodash.support"), u = /^\s*function[ \n\r\t]+\w/, a = /\bthis\b/, c = Function.prototype.toString;
                        e.exports = n;
                    }, {
                        "lodash._setbinddata": 45,
                        "lodash.bind": 48,
                        "lodash.identity": 64,
                        "lodash.support": 65
                    } ],
                    45: [ function(t, e) {
                        var n = t("lodash._isnative"), r = t("lodash.noop"), i = {
                            configurable: !1,
                            enumerable: !1,
                            value: null,
                            writable: !1
                        }, o = function() {
                            try {
                                var t = {}, e = n(e = Object.defineProperty) && e, r = e(t, t, t) && e;
                            } catch (i) {}
                            return r;
                        }(), s = o ? function(t, e) {
                            i.value = e, o(t, "__bindData__", i);
                        } : r;
                        e.exports = s;
                    }, {
                        "lodash._isnative": 46,
                        "lodash.noop": 47
                    } ],
                    46: [ function(t, e) {
                        function n(t) {
                            return "function" == typeof t && o.test(t);
                        }
                        var r = Object.prototype, i = r.toString, o = RegExp("^" + String(i).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$");
                        e.exports = n;
                    }, {} ],
                    47: [ function(t, e) {
                        function n() {}
                        e.exports = n;
                    }, {} ],
                    48: [ function(t, e) {
                        function n(t, e) {
                            return arguments.length > 2 ? r(t, 17, i(arguments, 2), null, e) : r(t, 1, null, null, e);
                        }
                        var r = t("lodash._createwrapper"), i = t("lodash._slice");
                        e.exports = n;
                    }, {
                        "lodash._createwrapper": 49,
                        "lodash._slice": 63
                    } ],
                    49: [ function(t, e) {
                        function n(t, e, u, l, f, d) {
                            var p = 1 & e, h = 2 & e, v = 4 & e, _ = 16 & e, y = 32 & e;
                            if (!h && !o(t)) throw new TypeError();
                            _ && !u.length && (e &= -17, _ = u = !1), y && !l.length && (e &= -33, y = l = !1);
                            var m = t && t.__bindData__;
                            if (m && m !== !0) return m = s(m), m[2] && (m[2] = s(m[2])), m[3] && (m[3] = s(m[3])), 
                            !p || 1 & m[1] || (m[4] = f), !p && 1 & m[1] && (e |= 8), !v || 4 & m[1] || (m[5] = d), 
                            _ && a.apply(m[2] || (m[2] = []), u), y && c.apply(m[3] || (m[3] = []), l), m[1] |= e, 
                            n.apply(null, m);
                            var g = 1 == e || 17 === e ? r : i;
                            return g([ t, e, u, l, f, d ]);
                        }
                        var r = t("lodash._basebind"), i = t("lodash._basecreatewrapper"), o = t("lodash.isfunction"), s = t("lodash._slice"), u = [], a = u.push, c = u.unshift;
                        e.exports = n;
                    }, {
                        "lodash._basebind": 50,
                        "lodash._basecreatewrapper": 56,
                        "lodash._slice": 63,
                        "lodash.isfunction": 62
                    } ],
                    50: [ function(t, e) {
                        function n(t) {
                            function e() {
                                if (u) {
                                    var t = s(u);
                                    a.apply(t, arguments);
                                }
                                if (this instanceof e) {
                                    var o = r(n.prototype), l = n.apply(o, t || arguments);
                                    return i(l) ? l : o;
                                }
                                return n.apply(c, t || arguments);
                            }
                            var n = t[0], u = t[2], c = t[4];
                            return o(e, t), e;
                        }
                        var r = t("lodash._basecreate"), i = t("lodash.isobject"), o = t("lodash._setbinddata"), s = t("lodash._slice"), u = [], a = u.push;
                        e.exports = n;
                    }, {
                        "lodash._basecreate": 51,
                        "lodash._setbinddata": 45,
                        "lodash._slice": 63,
                        "lodash.isobject": 54
                    } ],
                    51: [ function(t, e) {
                        function n(t) {
                            return o(t) ? s(t) : {};
                        }
                        var r = "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, i = t("lodash._isnative"), o = t("lodash.isobject"), s = (t("lodash.noop"), 
                        i(s = Object.create) && s);
                        s || (n = function() {
                            function t() {}
                            return function(e) {
                                if (o(e)) {
                                    t.prototype = e;
                                    var n = new t();
                                    t.prototype = null;
                                }
                                return n || r.Object();
                            };
                        }()), e.exports = n;
                    }, {
                        "lodash._isnative": 52,
                        "lodash.isobject": 54,
                        "lodash.noop": 53
                    } ],
                    52: [ function(t, e) {
                        e.exports = t(46);
                    }, {} ],
                    53: [ function(t, e) {
                        e.exports = t(47);
                    }, {} ],
                    54: [ function(t, e) {
                        function n(t) {
                            return !(!t || !r[typeof t]);
                        }
                        var r = t("lodash._objecttypes");
                        e.exports = n;
                    }, {
                        "lodash._objecttypes": 55
                    } ],
                    55: [ function(t, e) {
                        var n = {
                            "boolean": !1,
                            "function": !0,
                            object: !0,
                            number: !1,
                            string: !1,
                            undefined: !1
                        };
                        e.exports = n;
                    }, {} ],
                    56: [ function(t, e) {
                        function n(t) {
                            function e() {
                                var t = h ? d : this;
                                if (l) {
                                    var o = s(l);
                                    a.apply(o, arguments);
                                }
                                if ((f || _) && (o || (o = s(arguments)), f && a.apply(o, f), _ && o.length < p)) return c |= 16, 
                                n([ u, y ? c : -4 & c, o, null, d, p ]);
                                if (o || (o = arguments), v && (u = t[m]), this instanceof e) {
                                    t = r(u.prototype);
                                    var g = u.apply(t, o);
                                    return i(g) ? g : t;
                                }
                                return u.apply(t, o);
                            }
                            var u = t[0], c = t[1], l = t[2], f = t[3], d = t[4], p = t[5], h = 1 & c, v = 2 & c, _ = 4 & c, y = 8 & c, m = u;
                            return o(e, t), e;
                        }
                        var r = t("lodash._basecreate"), i = t("lodash.isobject"), o = t("lodash._setbinddata"), s = t("lodash._slice"), u = [], a = u.push;
                        e.exports = n;
                    }, {
                        "lodash._basecreate": 57,
                        "lodash._setbinddata": 45,
                        "lodash._slice": 63,
                        "lodash.isobject": 60
                    } ],
                    57: [ function(t, e, n) {
                        arguments[4][51][0].apply(n, arguments);
                    }, {
                        "lodash._isnative": 58,
                        "lodash.isobject": 60,
                        "lodash.noop": 59
                    } ],
                    58: [ function(t, e) {
                        e.exports = t(46);
                    }, {} ],
                    59: [ function(t, e) {
                        e.exports = t(47);
                    }, {} ],
                    60: [ function(t, e) {
                        e.exports = t(54);
                    }, {
                        "lodash._objecttypes": 61
                    } ],
                    61: [ function(t, e) {
                        e.exports = t(55);
                    }, {} ],
                    62: [ function(t, e) {
                        function n(t) {
                            return "function" == typeof t;
                        }
                        e.exports = n;
                    }, {} ],
                    63: [ function(t, e) {
                        function n(t, e, n) {
                            e || (e = 0), "undefined" == typeof n && (n = t ? t.length : 0);
                            for (var r = -1, i = n - e || 0, o = Array(0 > i ? 0 : i); ++r < i; ) o[r] = t[e + r];
                            return o;
                        }
                        e.exports = n;
                    }, {} ],
                    64: [ function(t, e) {
                        function n(t) {
                            return t;
                        }
                        e.exports = n;
                    }, {} ],
                    65: [ function(t, e) {
                        var n = "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, r = t("lodash._isnative"), i = /\bthis\b/, o = {};
                        o.funcDecomp = !r(n.WinRTError) && i.test(function() {
                            return this;
                        }), o.funcNames = "string" == typeof Function.name, e.exports = o;
                    }, {
                        "lodash._isnative": 66
                    } ],
                    66: [ function(t, e) {
                        e.exports = t(46);
                    }, {} ],
                    67: [ function(t, e) {
                        var n = t("lodash._basecreatecallback"), r = t("lodash.keys"), i = t("lodash._objecttypes"), o = function(t, e, o) {
                            var s, u = t, a = u;
                            if (!u) return a;
                            if (!i[typeof u]) return a;
                            e = e && "undefined" == typeof o ? e : n(e, o, 3);
                            for (var c = -1, l = i[typeof u] && r(u), f = l ? l.length : 0; ++c < f; ) if (s = l[c], 
                            e(u[s], s, t) === !1) return a;
                            return a;
                        };
                        e.exports = o;
                    }, {
                        "lodash._basecreatecallback": 44,
                        "lodash._objecttypes": 68,
                        "lodash.keys": 69
                    } ],
                    68: [ function(t, e) {
                        e.exports = t(55);
                    }, {} ],
                    69: [ function(t, e) {
                        var n = t("lodash._isnative"), r = t("lodash.isobject"), i = t("lodash._shimkeys"), o = n(o = Object.keys) && o, s = o ? function(t) {
                            return r(t) ? o(t) : [];
                        } : i;
                        e.exports = s;
                    }, {
                        "lodash._isnative": 70,
                        "lodash._shimkeys": 71,
                        "lodash.isobject": 73
                    } ],
                    70: [ function(t, e) {
                        e.exports = t(46);
                    }, {} ],
                    71: [ function(t, e) {
                        var n = t("lodash._objecttypes"), r = Object.prototype, i = r.hasOwnProperty, o = function(t) {
                            var e, r = t, o = [];
                            if (!r) return o;
                            if (!n[typeof t]) return o;
                            for (e in r) i.call(r, e) && o.push(e);
                            return o;
                        };
                        e.exports = o;
                    }, {
                        "lodash._objecttypes": 72
                    } ],
                    72: [ function(t, e) {
                        e.exports = t(55);
                    }, {} ],
                    73: [ function(t, e) {
                        e.exports = t(54);
                    }, {
                        "lodash._objecttypes": 74
                    } ],
                    74: [ function(t, e) {
                        e.exports = t(55);
                    }, {} ],
                    75: [ function(t, e) {
                        function n(t) {
                            var e = !1;
                            return function() {
                                return e ? void 0 : (e = !0, t.apply(this, arguments));
                            };
                        }
                        e.exports = n, n.proto = n(function() {
                            Object.defineProperty(Function.prototype, "once", {
                                value: function() {
                                    return n(this);
                                },
                                configurable: !0
                            });
                        });
                    }, {} ],
                    76: [ function(t, e) {
                        var n = e.exports = {};
                        n.nextTick = function() {
                            var t = "undefined" != typeof window && window.setImmediate, e = "undefined" != typeof window && window.postMessage && window.addEventListener;
                            if (t) return function(t) {
                                return window.setImmediate(t);
                            };
                            if (e) {
                                var n = [];
                                return window.addEventListener("message", function(t) {
                                    var e = t.source;
                                    if ((e === window || null === e) && "process-tick" === t.data && (t.stopPropagation(), 
                                    n.length > 0)) {
                                        var r = n.shift();
                                        r();
                                    }
                                }, !0), function(t) {
                                    n.push(t), window.postMessage("process-tick", "*");
                                };
                            }
                            return function(t) {
                                setTimeout(t, 0);
                            };
                        }(), n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.binding = function() {
                            throw new Error("process.binding is not supported");
                        }, n.cwd = function() {
                            return "/";
                        }, n.chdir = function() {
                            throw new Error("process.chdir is not supported");
                        };
                    }, {} ]
                }, {}, [ 1 ])(1);
            });
        }, {} ],
        20: [ function(t, e) {
            "use strict";
            function n(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }
            e.exports = function(t, e, i, o) {
                e = e || "&", i = i || "=";
                var s = {};
                if ("string" != typeof t || 0 === t.length) return s;
                var u = /\+/g;
                t = t.split(e);
                var a = 1e3;
                o && "number" == typeof o.maxKeys && (a = o.maxKeys);
                var c = t.length;
                a > 0 && c > a && (c = a);
                for (var l = 0; c > l; ++l) {
                    var f, d, p, h, v = t[l].replace(u, "%20"), _ = v.indexOf(i);
                    _ >= 0 ? (f = v.substr(0, _), d = v.substr(_ + 1)) : (f = v, d = ""), p = decodeURIComponent(f), 
                    h = decodeURIComponent(d), n(s, p) ? r(s[p]) ? s[p].push(h) : s[p] = [ s[p], h ] : s[p] = h;
                }
                return s;
            };
            var r = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t);
            };
        }, {} ],
        21: [ function(t, e) {
            "use strict";
            function n(t, e) {
                if (t.map) return t.map(e);
                for (var n = [], r = 0; r < t.length; r++) n.push(e(t[r], r));
                return n;
            }
            var r = function(t) {
                switch (typeof t) {
                  case "string":
                    return t;

                  case "boolean":
                    return t ? "true" : "false";

                  case "number":
                    return isFinite(t) ? t : "";

                  default:
                    return "";
                }
            };
            e.exports = function(t, e, s, u) {
                return e = e || "&", s = s || "=", null === t && (t = void 0), "object" == typeof t ? n(o(t), function(n) {
                    var o = encodeURIComponent(r(n)) + s;
                    return i(t[n]) ? t[n].map(function(t) {
                        return o + encodeURIComponent(r(t));
                    }).join(e) : o + encodeURIComponent(r(t[n]));
                }).join(e) : u ? encodeURIComponent(r(u)) + s + encodeURIComponent(r(t)) : "";
            };
            var i = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t);
            }, o = Object.keys || function(t) {
                var e = [];
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.push(n);
                return e;
            };
        }, {} ],
        22: [ function(t, e, n) {
            "use strict";
            n.decode = n.parse = t("./decode"), n.encode = n.stringify = t("./encode");
        }, {
            "./decode": 20,
            "./encode": 21
        } ]
    }, {}, [ 1 ])(1);
}), function(t) {
    t.fn.fitText = function(e, n) {
        var r = e || 1, i = t.extend({
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY
        }, n);
        return this.each(function() {
            var e = t(this), n = function() {
                e.css("font-size", Math.max(Math.min(e.width() / (10 * r), parseFloat(i.maxFontSize)), parseFloat(i.minFontSize)));
            };
            n(), t(window).on("resize.fittext orientationchange.fittext", n);
        });
    };
}(jQuery), !function() {
    var t = {}, e = null, n = !0, r = !1;
    try {
        "undefined" != typeof AudioContext ? e = new AudioContext() : "undefined" != typeof webkitAudioContext ? e = new webkitAudioContext() : n = !1;
    } catch (i) {
        n = !1;
    }
    if (!n) if ("undefined" != typeof Audio) try {
        new Audio();
    } catch (i) {
        r = !0;
    } else r = !0;
    if (n) {
        var o = void 0 === e.createGain ? e.createGainNode() : e.createGain();
        o.gain.value = 1, o.connect(e.destination);
    }
    var s = function(t) {
        this._volume = 1, this._muted = !1, this.usingWebAudio = n, this.ctx = e, this.noAudio = r, 
        this._howls = [], this._codecs = t, this.iOSAutoEnable = !0;
    };
    s.prototype = {
        volume: function(t) {
            var e = this;
            if (t = parseFloat(t), t >= 0 && 1 >= t) {
                e._volume = t, n && (o.gain.value = t);
                for (var r in e._howls) if (e._howls.hasOwnProperty(r) && e._howls[r]._webAudio === !1) for (var i = 0; i < e._howls[r]._audioNode.length; i++) e._howls[r]._audioNode[i].volume = e._howls[r]._volume * e._volume;
                return e;
            }
            return n ? o.gain.value : e._volume;
        },
        mute: function() {
            return this._setMuted(!0), this;
        },
        unmute: function() {
            return this._setMuted(!1), this;
        },
        _setMuted: function(t) {
            var e = this;
            e._muted = t, n && (o.gain.value = t ? 0 : e._volume);
            for (var r in e._howls) if (e._howls.hasOwnProperty(r) && e._howls[r]._webAudio === !1) for (var i = 0; i < e._howls[r]._audioNode.length; i++) e._howls[r]._audioNode[i].muted = t;
        },
        codecs: function(t) {
            return this._codecs[t];
        },
        _enableiOSAudio: function() {
            var t = this;
            if (!e || !t._iOSEnabled && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                t._iOSEnabled = !1;
                var n = function() {
                    var r = e.createBuffer(1, 1, 22050), i = e.createBufferSource();
                    i.buffer = r, i.connect(e.destination), void 0 === i.start ? i.noteOn(0) : i.start(0), 
                    setTimeout(function() {
                        (i.playbackState === i.PLAYING_STATE || i.playbackState === i.FINISHED_STATE) && (t._iOSEnabled = !0, 
                        t.iOSAutoEnable = !1, window.removeEventListener("touchstart", n, !1));
                    }, 0);
                };
                return window.addEventListener("touchstart", n, !1), t;
            }
        }
    };
    var u = null, a = {};
    r || (u = new Audio(), a = {
        mp3: !!u.canPlayType("audio/mpeg;").replace(/^no$/, ""),
        opus: !!u.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
        ogg: !!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
        wav: !!u.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
        aac: !!u.canPlayType("audio/aac;").replace(/^no$/, ""),
        m4a: !!(u.canPlayType("audio/x-m4a;") || u.canPlayType("audio/m4a;") || u.canPlayType("audio/aac;")).replace(/^no$/, ""),
        mp4: !!(u.canPlayType("audio/x-mp4;") || u.canPlayType("audio/mp4;") || u.canPlayType("audio/aac;")).replace(/^no$/, ""),
        weba: !!u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
    });
    var c = new s(a), l = function(t) {
        var r = this;
        r._autoplay = t.autoplay || !1, r._buffer = t.buffer || !1, r._duration = t.duration || 0, 
        r._format = t.format || null, r._loop = t.loop || !1, r._loaded = !1, r._sprite = t.sprite || {}, 
        r._src = t.src || "", r._pos3d = t.pos3d || [ 0, 0, -.5 ], r._volume = void 0 !== t.volume ? t.volume : 1, 
        r._urls = t.urls || [], r._rate = t.rate || 1, r._model = t.model || null, r._onload = [ t.onload || function() {} ], 
        r._onloaderror = [ t.onloaderror || function() {} ], r._onend = [ t.onend || function() {} ], 
        r._onpause = [ t.onpause || function() {} ], r._onplay = [ t.onplay || function() {} ], 
        r._onendTimer = [], r._webAudio = n && !r._buffer, r._audioNode = [], r._webAudio && r._setupAudioNode(), 
        void 0 !== e && e && c.iOSAutoEnable && c._enableiOSAudio(), c._howls.push(r), r.load();
    };
    if (l.prototype = {
        load: function() {
            var t = this, e = null;
            if (r) return void t.on("loaderror");
            for (var n = 0; n < t._urls.length; n++) {
                var i, o;
                if (t._format) i = t._format; else {
                    if (o = t._urls[n], i = /^data:audio\/([^;,]+);/i.exec(o), i || (i = /\.([^.]+)$/.exec(o.split("?", 1)[0])), 
                    !i) return void t.on("loaderror");
                    i = i[1].toLowerCase();
                }
                if (a[i]) {
                    e = t._urls[n];
                    break;
                }
            }
            if (!e) return void t.on("loaderror");
            if (t._src = e, t._webAudio) f(t, e); else {
                var u = new Audio();
                u.addEventListener("error", function() {
                    u.error && 4 === u.error.code && (s.noAudio = !0), t.on("loaderror", {
                        type: u.error ? u.error.code : 0
                    });
                }, !1), t._audioNode.push(u), u.src = e, u._pos = 0, u.preload = "auto", u.volume = c._muted ? 0 : t._volume * c.volume();
                var l = function() {
                    t._duration = Math.ceil(10 * u.duration) / 10, 0 === Object.getOwnPropertyNames(t._sprite).length && (t._sprite = {
                        _default: [ 0, 1e3 * t._duration ]
                    }), t._loaded || (t._loaded = !0, t.on("load")), t._autoplay && t.play(), u.removeEventListener("canplaythrough", l, !1);
                };
                u.addEventListener("canplaythrough", l, !1), u.load();
            }
            return t;
        },
        urls: function(t) {
            var e = this;
            return t ? (e.stop(), e._urls = "string" == typeof t ? [ t ] : t, e._loaded = !1, 
            e.load(), e) : e._urls;
        },
        play: function(t, n) {
            var r = this;
            return "function" == typeof t && (n = t), t && "function" != typeof t || (t = "_default"), 
            r._loaded ? r._sprite[t] ? (r._inactiveNode(function(i) {
                i._sprite = t;
                var o = i._pos > 0 ? i._pos : r._sprite[t][0] / 1e3, s = 0;
                r._webAudio ? (s = r._sprite[t][1] / 1e3 - i._pos, i._pos > 0 && (o = r._sprite[t][0] / 1e3 + o)) : s = r._sprite[t][1] / 1e3 - (o - r._sprite[t][0] / 1e3);
                var u, a = !(!r._loop && !r._sprite[t][2]), l = "string" == typeof n ? n : Math.round(Date.now() * Math.random()) + "";
                if (function() {
                    var e = {
                        id: l,
                        sprite: t,
                        loop: a
                    };
                    u = setTimeout(function() {
                        !r._webAudio && a && r.stop(e.id).play(t, e.id), r._webAudio && !a && (r._nodeById(e.id).paused = !0, 
                        r._nodeById(e.id)._pos = 0, r._clearEndTimer(e.id)), r._webAudio || a || r.stop(e.id), 
                        r.on("end", l);
                    }, 1e3 * s), r._onendTimer.push({
                        timer: u,
                        id: e.id
                    });
                }(), r._webAudio) {
                    var f = r._sprite[t][0] / 1e3, d = r._sprite[t][1] / 1e3;
                    i.id = l, i.paused = !1, h(r, [ a, f, d ], l), r._playStart = e.currentTime, i.gain.value = r._volume, 
                    void 0 === i.bufferSource.start ? i.bufferSource.noteGrainOn(0, o, s) : i.bufferSource.start(0, o, s);
                } else {
                    if (4 !== i.readyState && (i.readyState || !navigator.isCocoonJS)) return r._clearEndTimer(l), 
                    function() {
                        var e = r, o = t, s = n, u = i, a = function() {
                            e.play(o, s), u.removeEventListener("canplaythrough", a, !1);
                        };
                        u.addEventListener("canplaythrough", a, !1);
                    }(), r;
                    i.readyState = 4, i.id = l, i.currentTime = o, i.muted = c._muted || i.muted, i.volume = r._volume * c.volume(), 
                    setTimeout(function() {
                        i.play();
                    }, 0);
                }
                return r.on("play"), "function" == typeof n && n(l), r;
            }), r) : ("function" == typeof n && n(), r) : (r.on("load", function() {
                r.play(t, n);
            }), r);
        },
        pause: function(t) {
            var e = this;
            if (!e._loaded) return e.on("play", function() {
                e.pause(t);
            }), e;
            e._clearEndTimer(t);
            var n = t ? e._nodeById(t) : e._activeNode();
            if (n) if (n._pos = e.pos(null, t), e._webAudio) {
                if (!n.bufferSource || n.paused) return e;
                n.paused = !0, void 0 === n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0);
            } else n.pause();
            return e.on("pause"), e;
        },
        stop: function(t) {
            var e = this;
            if (!e._loaded) return e.on("play", function() {
                e.stop(t);
            }), e;
            e._clearEndTimer(t);
            var n = t ? e._nodeById(t) : e._activeNode();
            if (n) if (n._pos = 0, e._webAudio) {
                if (!n.bufferSource || n.paused) return e;
                n.paused = !0, void 0 === n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0);
            } else isNaN(n.duration) || (n.pause(), n.currentTime = 0);
            return e;
        },
        mute: function(t) {
            var e = this;
            if (!e._loaded) return e.on("play", function() {
                e.mute(t);
            }), e;
            var n = t ? e._nodeById(t) : e._activeNode();
            return n && (e._webAudio ? n.gain.value = 0 : n.muted = !0), e;
        },
        unmute: function(t) {
            var e = this;
            if (!e._loaded) return e.on("play", function() {
                e.unmute(t);
            }), e;
            var n = t ? e._nodeById(t) : e._activeNode();
            return n && (e._webAudio ? n.gain.value = e._volume : n.muted = !1), e;
        },
        volume: function(t, e) {
            var n = this;
            if (t = parseFloat(t), t >= 0 && 1 >= t) {
                if (n._volume = t, !n._loaded) return n.on("play", function() {
                    n.volume(t, e);
                }), n;
                var r = e ? n._nodeById(e) : n._activeNode();
                return r && (n._webAudio ? r.gain.value = t : r.volume = t * c.volume()), n;
            }
            return n._volume;
        },
        loop: function(t) {
            var e = this;
            return "boolean" == typeof t ? (e._loop = t, e) : e._loop;
        },
        sprite: function(t) {
            var e = this;
            return "object" == typeof t ? (e._sprite = t, e) : e._sprite;
        },
        pos: function(t, n) {
            var r = this;
            if (!r._loaded) return r.on("load", function() {
                r.pos(t);
            }), "number" == typeof t ? r : r._pos || 0;
            t = parseFloat(t);
            var i = n ? r._nodeById(n) : r._activeNode();
            if (i) return t >= 0 ? (r.pause(n), i._pos = t, r.play(i._sprite, n), r) : r._webAudio ? i._pos + (e.currentTime - r._playStart) : i.currentTime;
            if (t >= 0) return r;
            for (var o = 0; o < r._audioNode.length; o++) if (r._audioNode[o].paused && 4 === r._audioNode[o].readyState) return r._webAudio ? r._audioNode[o]._pos : r._audioNode[o].currentTime;
        },
        pos3d: function(t, e, n, r) {
            var i = this;
            if (e = void 0 !== e && e ? e : 0, n = void 0 !== n && n ? n : -.5, !i._loaded) return i.on("play", function() {
                i.pos3d(t, e, n, r);
            }), i;
            if (!(t >= 0 || 0 > t)) return i._pos3d;
            if (i._webAudio) {
                var o = r ? i._nodeById(r) : i._activeNode();
                o && (i._pos3d = [ t, e, n ], o.panner.setPosition(t, e, n), o.panner.panningModel = i._model || "HRTF");
            }
            return i;
        },
        fade: function(t, e, n, r, i) {
            var o = this, s = Math.abs(t - e), u = t > e ? "down" : "up", a = s / .01, c = n / a;
            if (!o._loaded) return o.on("load", function() {
                o.fade(t, e, n, r, i);
            }), o;
            o.volume(t, i);
            for (var l = 1; a >= l; l++) !function() {
                var t = o._volume + ("up" === u ? .01 : -.01) * l, n = Math.round(1e3 * t) / 1e3, s = e;
                setTimeout(function() {
                    o.volume(n, i), n === s && r && r();
                }, c * l);
            }();
        },
        fadeIn: function(t, e, n) {
            return this.volume(0).play().fade(0, t, e, n);
        },
        fadeOut: function(t, e, n, r) {
            var i = this;
            return i.fade(i._volume, t, e, function() {
                n && n(), i.pause(r), i.on("end");
            }, r);
        },
        _nodeById: function(t) {
            for (var e = this, n = e._audioNode[0], r = 0; r < e._audioNode.length; r++) if (e._audioNode[r].id === t) {
                n = e._audioNode[r];
                break;
            }
            return n;
        },
        _activeNode: function() {
            for (var t = this, e = null, n = 0; n < t._audioNode.length; n++) if (!t._audioNode[n].paused) {
                e = t._audioNode[n];
                break;
            }
            return t._drainPool(), e;
        },
        _inactiveNode: function(t) {
            for (var e = this, n = null, r = 0; r < e._audioNode.length; r++) if (e._audioNode[r].paused && 4 === e._audioNode[r].readyState) {
                t(e._audioNode[r]), n = !0;
                break;
            }
            if (e._drainPool(), !n) {
                var i;
                if (e._webAudio) i = e._setupAudioNode(), t(i); else {
                    e.load(), i = e._audioNode[e._audioNode.length - 1];
                    var o = navigator.isCocoonJS ? "canplaythrough" : "loadedmetadata", s = function() {
                        i.removeEventListener(o, s, !1), t(i);
                    };
                    i.addEventListener(o, s, !1);
                }
            }
        },
        _drainPool: function() {
            var t, e = this, n = 0;
            for (t = 0; t < e._audioNode.length; t++) e._audioNode[t].paused && n++;
            for (t = e._audioNode.length - 1; t >= 0 && !(5 >= n); t--) e._audioNode[t].paused && (e._webAudio && e._audioNode[t].disconnect(0), 
            n--, e._audioNode.splice(t, 1));
        },
        _clearEndTimer: function(t) {
            for (var e = this, n = 0, r = 0; r < e._onendTimer.length; r++) if (e._onendTimer[r].id === t) {
                n = r;
                break;
            }
            var i = e._onendTimer[n];
            i && (clearTimeout(i.timer), e._onendTimer.splice(n, 1));
        },
        _setupAudioNode: function() {
            var t = this, n = t._audioNode, r = t._audioNode.length;
            return n[r] = void 0 === e.createGain ? e.createGainNode() : e.createGain(), n[r].gain.value = t._volume, 
            n[r].paused = !0, n[r]._pos = 0, n[r].readyState = 4, n[r].connect(o), n[r].panner = e.createPanner(), 
            n[r].panner.panningModel = t._model || "equalpower", n[r].panner.setPosition(t._pos3d[0], t._pos3d[1], t._pos3d[2]), 
            n[r].panner.connect(n[r]), n[r];
        },
        on: function(t, e) {
            var n = this, r = n["_on" + t];
            if ("function" == typeof e) r.push(e); else for (var i = 0; i < r.length; i++) e ? r[i].call(n, e) : r[i].call(n);
            return n;
        },
        off: function(t, e) {
            var n = this, r = n["_on" + t], i = e ? "" + e : null;
            if (i) {
                for (var o = 0; o < r.length; o++) if (i === "" + r[o]) {
                    r.splice(o, 1);
                    break;
                }
            } else n["_on" + t] = [];
            return n;
        },
        unload: function() {
            for (var e = this, n = e._audioNode, r = 0; r < e._audioNode.length; r++) n[r].paused || (e.stop(n[r].id), 
            e.on("end", n[r].id)), e._webAudio ? n[r].disconnect(0) : n[r].src = "";
            for (r = 0; r < e._onendTimer.length; r++) clearTimeout(e._onendTimer[r].timer);
            var i = c._howls.indexOf(e);
            null !== i && i >= 0 && c._howls.splice(i, 1), delete t[e._src], e = null;
        }
    }, n) var f = function(e, n) {
        if (n in t) return e._duration = t[n].duration, void p(e);
        if (/^data:[^;]+;base64,/.test(n)) {
            for (var r = atob(n.split(",")[1]), i = new Uint8Array(r.length), o = 0; o < r.length; ++o) i[o] = r.charCodeAt(o);
            d(i.buffer, e, n);
        } else {
            var s = new XMLHttpRequest();
            s.open("GET", n, !0), s.responseType = "arraybuffer", s.onload = function() {
                d(s.response, e, n);
            }, s.onerror = function() {
                e._webAudio && (e._buffer = !0, e._webAudio = !1, e._audioNode = [], delete e._gainNode, 
                delete t[n], e.load());
            };
            try {
                s.send();
            } catch (u) {
                s.onerror();
            }
        }
    }, d = function(n, r, i) {
        e.decodeAudioData(n, function(e) {
            e && (t[i] = e, p(r, e));
        }, function() {
            r.on("loaderror");
        });
    }, p = function(t, e) {
        t._duration = e ? e.duration : t._duration, 0 === Object.getOwnPropertyNames(t._sprite).length && (t._sprite = {
            _default: [ 0, 1e3 * t._duration ]
        }), t._loaded || (t._loaded = !0, t.on("load")), t._autoplay && t.play();
    }, h = function(n, r, i) {
        var o = n._nodeById(i);
        o.bufferSource = e.createBufferSource(), o.bufferSource.buffer = t[n._src], o.bufferSource.connect(o.panner), 
        o.bufferSource.loop = r[0], r[0] && (o.bufferSource.loopStart = r[1], o.bufferSource.loopEnd = r[1] + r[2]), 
        o.bufferSource.playbackRate.value = n._rate;
    };
    "function" == typeof define && define.amd && define(function() {
        return {
            Howler: c,
            Howl: l
        };
    }), "undefined" != typeof exports && (exports.Howler = c, exports.Howl = l), "undefined" != typeof window && (window.Howler = c, 
    window.Howl = l);
}(), function() {
    $(function() {
        var t, e, n, r, i, o, s, u, a, c, l, f, d, p, h, v, _, y, m, g, b, w, j, x, T, k, A, E, P, F, O;
        return l = {}, O = {}, m = {}, r = {}, y = {}, w = {}, j = {}, i = {}, c = [ "#d6f7fe", "#312cc0", "#f9a205", "#d89e46", "#4c9d5b", "#fbdd1b", "#ff6dd1" ], 
        h = new Howl({
            urls: [ "sound/CLICK.mp3", "sound/CLICK.ogg" ],
            volume: .5
        }), u = new Howl({
            urls: [ "sound/EXIT.mp3", "sound/EXIT.ogg" ],
            volume: .7
        }), _ = 0, v = function() {
            return E(), $("h1.colors").fitText(.7), setInterval(a, 250), $(".video-nav ul a.episode li").first().addClass("active"), 
            $(".story-nav ul a.additional-episode li").first().addClass("active"), setTimeout(A(d()), 500), 
            T();
        }, x = function(t) {
            return _ += t, 4 === _ ? v() : void 0;
        }, A = function(t) {
            var e, n;
            return e = {
                height: t
            }, n = JSON.stringify(e), window.parent.postMessage(n, "*");
        }, d = function() {
            return $(document.body).height() + 300;
        }, P = function() {
            var t, e;
            return e = document.createElement("script"), e.src = "https://www.youtube.com/iframe_api", 
            t = document.getElementsByTagName("script")[0], t.parentNode.insertBefore(e, t);
        }, window.onYouTubeIframeAPIReady = function() {
            return w = new YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "WYSupJ5r2zo",
                events: {
                    onReady: g
                },
                playerVars: {
                    modestbranding: !0,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            }), j = new YT.Player("storyplayer", {
                height: "390",
                width: "640",
                videoId: "VsbG4pXrhr8",
                events: {
                    onReady: b
                },
                playerVars: {
                    modestbranding: !0,
                    controls: 1,
                    showinfo: 0,
                    hd: 1
                }
            });
        }, g = function() {
            return k("#player"), A(d());
        }, b = function() {
            return k("#storyplayer"), A(d());
        }, E = function() {
            return $("nav").bind("mouseenter", function() {
                return $(this).transition({
                    left: 0
                }, 200);
            }), $("a").bind("click", function() {
                return u.play();
            }), $("a").bind("mouseenter", function() {
                return h.play();
            }), $("nav").bind("mouseleave", function() {
                return $(this).transition({
                    left: "-100px"
                }, 200);
            }), $("a.scroll").bind("click", function(t) {
                var e;
                return e = $(this), F(t, e);
            }), window.addEventListener("resize", function() {
                return k("#player"), k("#storyplayer"), A(d());
            });
        }, a = function() {
            var t;
            return t = Math.floor(Math.random() * c.length), $("h1.colors").css({
                color: c[t]
            });
        }, p = function() {
            return $(".composer-data").fadeIn(), $("body,html").animate({
                scrollTop: 0
            }, 50), A(d());
        }, s = function(t, e) {
            var n;
            return n = e[t].fields, w.cueVideoById(n.ytVideoId), $(".videos h1").empty().text(n.episodeTitle), 
            $(".videos p.body").empty().text(n.videoDescription), $(".videos p.body").slideDown(), 
            A(d());
        }, o = function(t, e) {
            var n;
            return n = e[t].fields, j.cueVideoById(n.additionalYouTube), $(".stories h1").empty().text(n.additionalVideoTitle), 
            $(".stories p.body").empty().text(n.description), $(".stories p.body").slideDown(), 
            A(d());
        }, n = function(t, e, n) {
            var r, i, o, s, u, a, c, l, f;
            if ("main" === n) {
                for (l = [], i = s = 0, a = t.length; a > s; i = ++s) o = t[i], r = o.fields.episodeNumber, 
                l.push(e.append("<a class='episode' href='#episode' data-order=" + i + "><li>" + r + "</li>"));
                return l;
            }
            if ("additional" === n) {
                for (f = [], i = u = 0, c = t.length; c > u; i = ++u) o = t[i], r = o.fields.additionalVideoTitle, 
                f.push(e.append("<a class='additional-episode' href='#additional-episode' data-order=" + i + "><li>" + r + "</li>"));
                return f;
            }
        }, t = function(t) {
            var e, n, r, i, o, s, u, a;
            for (a = [], s = 0, u = t.length; u > s; s++) e = t[s], o = e.fields, i = o.composerName, 
            r = o.image.fields.file.url, n = "<div class='artist'><img src='" + r + "'/><h1>" + o.composerName + "</h1><p>" + o.bio + "</p></div>", 
            a.push($(".data-container").append(n));
            return a;
        }, e = function(t) {
            var e, n, r, i, o, s, u, a, c, l;
            for (l = [], a = 0, c = t.length; c > a; a++) i = t[a], s = i.fields, u = s.artistName, 
            n = s.rbmaRadioEmbedCode, e = s.descriptions, r = s.artistImage.fields.file.url, 
            o = "<div class='show'><img src='" + r + "'/>" + n + "<p>" + e + "</p></div>", $(".radio").append(o), 
            l.push(A(d()));
            return l;
        }, k = function(t) {
            var e, n, r, i, o, s, u, a;
            return o = $(t), a = $(window).width(), u = a / 1.5, i = o.attr("width"), r = o.attr("height"), 
            s = i / r, o.attr("width", u), o.attr("height", u / s), e = a - u, n = e / 2, o.css({
                marginLeft: n
            }), A(d());
        }, F = function(t, e) {
            var n, r;
            return t.preventDefault(), r = e.attr("href"), n = $("" + r).position().top, e.hasClass("active") ? void 0 : ($("nav ul a").each(function() {
                return $(this).removeClass("active");
            }), e.addClass("active"), $("body,html").animate({
                scrollTop: n
            }, 300));
        }, T = function() {
            return $(".spinner").remove(), A(d());
        }, f = function() {
            var i;
            return i = contentful.createClient({
                accessToken: "38b8dbaf503a350d5722578c6547caca484511f7c78717736ac8f576832be4b0",
                space: "s9bc5ah7p1d5"
            }), i.entries({
                content_type: "42CpXYSUms44OskS6wUU6I",
                include: 1
            }).done(function(e) {
                return t(e), x(1);
            }), i.entries({
                content_type: "36SuQSSPR6QmWOk8CseMC6",
                include: 1,
                order: "fields.order"
            }).done(function(t) {
                return O = t, x(1), n(O, $(".video-nav ul"), "main"), $("a.episode").bind("click", function(t) {
                    var e;
                    return t.preventDefault(), $(this).parent().find("li").removeClass("active"), $(this).find("li").addClass("active"), 
                    e = $(this).data("order"), s(e, O);
                });
            }), i.entries({
                content_type: "2YpXtnGW80EEGgCUsSMmCc",
                include: 1
            }).done(function(t) {
                return x(1), e(t);
            }), i.entries({
                content_type: "6fwxAcXrxK4yqyaMUiWwWY",
                include: 1,
                order: "fields.order"
            }).done(function(t) {
                return x(1), r = t, n(r, $(".story-nav ul"), "additional"), $("a.additional-episode").bind("click", function(t) {
                    var e;
                    return t.preventDefault(), $(this).parent().find("li").removeClass("active"), $(this).find("li").addClass("active"), 
                    e = $(this).data("order"), o(e, r);
                });
            });
        }, P(), f(), window.addEventListener("load", A(d()));
    });
}.call(this);

var ctx, imgBg, imgDrops, x = 0, y = 0, noOfDrops = 10, fallingDrops = [], fallingIcons = [ "Blue-Falcon.gif", "Gameboy-Advance-ico.gif", "KirbyHead.png", "LinkHead.png", "Gameboy-Advance-ico.gif", "sword.gif", "triforce.png", "WarioHead.png", "YoshiHead.png" ];

window.addEventListener("resize", resizeCanvas), setup();