(function(e) {
    var t, n = "2.8.1", i = typeof global !== "undefined" ? global : this, s, a = Math.round, r, o = 0, u = 1, f = 2, l = 3, c = 4, d = 5, h = 6, _ = {}, m = [], y = typeof module !== "undefined" && module.exports, p = /^\/?Date\((\-?\d+)/i, D = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, g = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, M = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, w = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, Y = /\d\d?/, v = /\d{1,3}/, k = /\d{1,4}/, b = /[+\-]?\d{1,6}/, S = /\d+/, T = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, O = /Z|[\+\-]\d\d:?\d\d/gi, W = /T/i, G = /[\+\-]?\d+(\.\d{1,3})?/, F = /\d{1,2}/, U = /\d/, C = /\d\d/, z = /\d{3}/, P = /\d{4}/, L = /[+-]?\d{6}/, I = /[+-]?\d+/, H = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, A = "YYYY-MM-DDTHH:mm:ssZ", x = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], Z = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], N = /([\+\-]|\d\d)/gi, E = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), j = {
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
    }, V = {
        ms: "millisecond",
        s: "second",
        m: "minute",
        h: "hour",
        d: "day",
        D: "date",
        w: "week",
        W: "isoWeek",
        M: "month",
        Q: "quarter",
        y: "year",
        DDD: "dayOfYear",
        e: "weekday",
        E: "isoWeekday",
        gg: "weekYear",
        GG: "isoWeekYear"
    }, q = {
        dayofyear: "dayOfYear",
        isoweekday: "isoWeekday",
        isoweek: "isoWeek",
        weekyear: "weekYear",
        isoweekyear: "isoWeekYear"
    }, J = {}, Q = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, X = "DDD w W M D d".split(" "), B = "M D H h m s w W".split(" "), R = {
        M: function() {
            return this.month() + 1;
        },
        MMM: function(e) {
            return this.localeData().monthsShort(this, e);
        },
        MMMM: function(e) {
            return this.localeData().months(this, e);
        },
        D: function() {
            return this.date();
        },
        DDD: function() {
            return this.dayOfYear();
        },
        d: function() {
            return this.day();
        },
        dd: function(e) {
            return this.localeData().weekdaysMin(this, e);
        },
        ddd: function(e) {
            return this.localeData().weekdaysShort(this, e);
        },
        dddd: function(e) {
            return this.localeData().weekdays(this, e);
        },
        w: function() {
            return this.week();
        },
        W: function() {
            return this.isoWeek();
        },
        YY: function() {
            return _t(this.year() % 100, 2);
        },
        YYYY: function() {
            return _t(this.year(), 4);
        },
        YYYYY: function() {
            return _t(this.year(), 5);
        },
        YYYYYY: function() {
            var e = this.year(), t = e >= 0 ? "+" : "-";
            return t + _t(Math.abs(e), 6);
        },
        gg: function() {
            return _t(this.weekYear() % 100, 2);
        },
        gggg: function() {
            return _t(this.weekYear(), 4);
        },
        ggggg: function() {
            return _t(this.weekYear(), 5);
        },
        GG: function() {
            return _t(this.isoWeekYear() % 100, 2);
        },
        GGGG: function() {
            return _t(this.isoWeekYear(), 4);
        },
        GGGGG: function() {
            return _t(this.isoWeekYear(), 5);
        },
        e: function() {
            return this.weekday();
        },
        E: function() {
            return this.isoWeekday();
        },
        a: function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), true);
        },
        A: function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), false);
        },
        H: function() {
            return this.hours();
        },
        h: function() {
            return this.hours() % 12 || 12;
        },
        m: function() {
            return this.minutes();
        },
        s: function() {
            return this.seconds();
        },
        S: function() {
            return bt(this.milliseconds() / 100);
        },
        SS: function() {
            return _t(bt(this.milliseconds() / 10), 2);
        },
        SSS: function() {
            return _t(this.milliseconds(), 3);
        },
        SSSS: function() {
            return _t(this.milliseconds(), 3);
        },
        Z: function() {
            var e = -this.zone(), t = "+";
            if (e < 0) {
                e = -e;
                t = "-";
            }
            return t + _t(bt(e / 60), 2) + ":" + _t(bt(e) % 60, 2);
        },
        ZZ: function() {
            var e = -this.zone(), t = "+";
            if (e < 0) {
                e = -e;
                t = "-";
            }
            return t + _t(bt(e / 60), 2) + _t(bt(e) % 60, 2);
        },
        z: function() {
            return this.zoneAbbr();
        },
        zz: function() {
            return this.zoneName();
        },
        X: function() {
            return this.unix();
        },
        Q: function() {
            return this.quarter();
        }
    }, K = {}, et = [ "months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin" ];
    function tt(e, t, n) {
        switch (arguments.length) {
          case 2:
            return e != null ? e : t;

          case 3:
            return e != null ? e : t != null ? t : n;

          default:
            throw new Error("Implement me");
        }
    }
    function nt() {
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false
        };
    }
    function it(e) {
        if (t.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
            console.warn("Deprecation warning: " + e);
        }
    }
    function st(e, t) {
        var n = true;
        return ct(function() {
            if (n) {
                it(e);
                n = false;
            }
            return t.apply(this, arguments);
        }, t);
    }
    function at(e, t) {
        if (!K[e]) {
            it(t);
            K[e] = true;
        }
    }
    function rt(e, t) {
        return function(n) {
            return _t(e.call(this, n), t);
        };
    }
    function ot(e, t) {
        return function(n) {
            return this.localeData().ordinal(e.call(this, n), t);
        };
    }
    while (X.length) {
        r = X.pop();
        R[r + "o"] = ot(R[r], r);
    }
    while (B.length) {
        r = B.pop();
        R[r + r] = rt(R[r], 2);
    }
    R.DDDD = rt(R.DDD, 3);
    function ut() {}
    function ft(e, t) {
        if (t !== false) {
            Gt(e);
        }
        dt(this, e);
        this._d = new Date(+e._d);
    }
    function lt(e) {
        var n = vt(e), i = n.year || 0, s = n.quarter || 0, a = n.month || 0, r = n.week || 0, o = n.day || 0, u = n.hour || 0, f = n.minute || 0, l = n.second || 0, c = n.millisecond || 0;
        this._milliseconds = +c + l * 1e3 + f * 6e4 + u * 36e5;
        this._days = +o + r * 7;
        this._months = +a + s * 3 + i * 12;
        this._data = {};
        this._locale = t.localeData();
        this._bubble();
    }
    function ct(e, t) {
        for (var n in t) {
            if (t.hasOwnProperty(n)) {
                e[n] = t[n];
            }
        }
        if (t.hasOwnProperty("toString")) {
            e.toString = t.toString;
        }
        if (t.hasOwnProperty("valueOf")) {
            e.valueOf = t.valueOf;
        }
        return e;
    }
    function dt(e, t) {
        var n, i, s;
        if (typeof t._isAMomentObject !== "undefined") {
            e._isAMomentObject = t._isAMomentObject;
        }
        if (typeof t._i !== "undefined") {
            e._i = t._i;
        }
        if (typeof t._f !== "undefined") {
            e._f = t._f;
        }
        if (typeof t._l !== "undefined") {
            e._l = t._l;
        }
        if (typeof t._strict !== "undefined") {
            e._strict = t._strict;
        }
        if (typeof t._tzm !== "undefined") {
            e._tzm = t._tzm;
        }
        if (typeof t._isUTC !== "undefined") {
            e._isUTC = t._isUTC;
        }
        if (typeof t._offset !== "undefined") {
            e._offset = t._offset;
        }
        if (typeof t._pf !== "undefined") {
            e._pf = t._pf;
        }
        if (typeof t._locale !== "undefined") {
            e._locale = t._locale;
        }
        if (m.length > 0) {
            for (n in m) {
                i = m[n];
                s = t[i];
                if (typeof s !== "undefined") {
                    e[i] = s;
                }
            }
        }
        return e;
    }
    function ht(e) {
        if (e < 0) {
            return Math.ceil(e);
        } else {
            return Math.floor(e);
        }
    }
    function _t(e, t, n) {
        var i = "" + Math.abs(e), s = e >= 0;
        while (i.length < t) {
            i = "0" + i;
        }
        return (s ? n ? "+" : "" : "-") + i;
    }
    function mt(e, t) {
        var n = {
            milliseconds: 0,
            months: 0
        };
        n.months = t.month() - e.month() + (t.year() - e.year()) * 12;
        if (e.clone().add(n.months, "M").isAfter(t)) {
            --n.months;
        }
        n.milliseconds = +t - +e.clone().add(n.months, "M");
        return n;
    }
    function yt(e, t) {
        var n;
        t = Pt(t, e);
        if (e.isBefore(t)) {
            n = mt(e, t);
        } else {
            n = mt(t, e);
            n.milliseconds = -n.milliseconds;
            n.months = -n.months;
        }
        return n;
    }
    function pt(e, n) {
        return function(i, s) {
            var a, r;
            if (s !== null && !isNaN(+s)) {
                at(n, "moment()." + n + "(period, number) is deprecated. Please use moment()." + n + "(number, period).");
                r = i;
                i = s;
                s = r;
            }
            i = typeof i === "string" ? +i : i;
            a = t.duration(i, s);
            Dt(this, a, e);
            return this;
        };
    }
    function Dt(e, n, i, s) {
        var a = n._milliseconds, r = n._days, o = n._months;
        s = s == null ? true : s;
        if (a) {
            e._d.setTime(+e._d + a * i);
        }
        if (r) {
            dn(e, "Date", cn(e, "Date") + r * i);
        }
        if (o) {
            ln(e, cn(e, "Month") + o * i);
        }
        if (s) {
            t.updateOffset(e, r || o);
        }
    }
    function gt(e) {
        return Object.prototype.toString.call(e) === "[object Array]";
    }
    function Mt(e) {
        return Object.prototype.toString.call(e) === "[object Date]" || e instanceof Date;
    }
    function wt(e, t, n) {
        var i = Math.min(e.length, t.length), s = Math.abs(e.length - t.length), a = 0, r;
        for (r = 0; r < i; r++) {
            if (n && e[r] !== t[r] || !n && bt(e[r]) !== bt(t[r])) {
                a++;
            }
        }
        return a + s;
    }
    function Yt(e) {
        if (e) {
            var t = e.toLowerCase().replace(/(.)s$/, "$1");
            e = V[e] || q[t] || t;
        }
        return e;
    }
    function vt(e) {
        var t = {}, n, i;
        for (i in e) {
            if (e.hasOwnProperty(i)) {
                n = Yt(i);
                if (n) {
                    t[n] = e[i];
                }
            }
        }
        return t;
    }
    function kt(n) {
        var i, s;
        if (n.indexOf("week") === 0) {
            i = 7;
            s = "day";
        } else if (n.indexOf("month") === 0) {
            i = 12;
            s = "month";
        } else {
            return;
        }
        t[n] = function(a, r) {
            var o, u, f = t._locale[n], l = [];
            if (typeof a === "number") {
                r = a;
                a = e;
            }
            u = function(e) {
                var n = t().utc().set(s, e);
                return f.call(t._locale, n, a || "");
            };
            if (r != null) {
                return u(r);
            } else {
                for (o = 0; o < i; o++) {
                    l.push(u(o));
                }
                return l;
            }
        };
    }
    function bt(e) {
        var t = +e, n = 0;
        if (t !== 0 && isFinite(t)) {
            if (t >= 0) {
                n = Math.floor(t);
            } else {
                n = Math.ceil(t);
            }
        }
        return n;
    }
    function St(e, t) {
        return new Date(Date.UTC(e, t + 1, 0)).getUTCDate();
    }
    function Tt(e, n, i) {
        return rn(t([ e, 11, 31 + n - i ]), n, i).week;
    }
    function Ot(e) {
        return Wt(e) ? 366 : 365;
    }
    function Wt(e) {
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
    }
    function Gt(e) {
        var t;
        if (e._a && e._pf.overflow === -2) {
            t = e._a[u] < 0 || e._a[u] > 11 ? u : e._a[f] < 1 || e._a[f] > St(e._a[o], e._a[u]) ? f : e._a[l] < 0 || e._a[l] > 23 ? l : e._a[c] < 0 || e._a[c] > 59 ? c : e._a[d] < 0 || e._a[d] > 59 ? d : e._a[h] < 0 || e._a[h] > 999 ? h : -1;
            if (e._pf._overflowDayOfYear && (t < o || t > f)) {
                t = f;
            }
            e._pf.overflow = t;
        }
    }
    function Ft(e) {
        if (e._isValid == null) {
            e._isValid = !isNaN(e._d.getTime()) && e._pf.overflow < 0 && !e._pf.empty && !e._pf.invalidMonth && !e._pf.nullInput && !e._pf.invalidFormat && !e._pf.userInvalidated;
            if (e._strict) {
                e._isValid = e._isValid && e._pf.charsLeftOver === 0 && e._pf.unusedTokens.length === 0;
            }
        }
        return e._isValid;
    }
    function Ut(e) {
        return e ? e.toLowerCase().replace("_", "-") : e;
    }
    function Ct(e) {
        var t = 0, n, i, s, a;
        while (t < e.length) {
            a = Ut(e[t]).split("-");
            n = a.length;
            i = Ut(e[t + 1]);
            i = i ? i.split("-") : null;
            while (n > 0) {
                s = zt(a.slice(0, n).join("-"));
                if (s) {
                    return s;
                }
                if (i && i.length >= n && wt(a, i, true) >= n - 1) {
                    break;
                }
                n--;
            }
            t++;
        }
        return null;
    }
    function zt(e) {
        var n = null;
        if (!_[e] && y) {
            try {
                n = t.locale();
                require("./locale/" + e);
                t.locale(n);
            } catch (i) {}
        }
        return _[e];
    }
    function Pt(e, n) {
        return n._isUTC ? t(e).zone(n._offset || 0) : t(e).local();
    }
    ct(ut.prototype, {
        set: function(e) {
            var t, n;
            for (n in e) {
                t = e[n];
                if (typeof t === "function") {
                    this[n] = t;
                } else {
                    this["_" + n] = t;
                }
            }
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function(e) {
            return this._months[e.month()];
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function(e) {
            return this._monthsShort[e.month()];
        },
        monthsParse: function(e) {
            var n, i, s;
            if (!this._monthsParse) {
                this._monthsParse = [];
            }
            for (n = 0; n < 12; n++) {
                if (!this._monthsParse[n]) {
                    i = t.utc([ 2e3, n ]);
                    s = "^" + this.months(i, "") + "|^" + this.monthsShort(i, "");
                    this._monthsParse[n] = new RegExp(s.replace(".", ""), "i");
                }
                if (this._monthsParse[n].test(e)) {
                    return n;
                }
            }
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function(e) {
            return this._weekdays[e.day()];
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function(e) {
            return this._weekdaysShort[e.day()];
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function(e) {
            return this._weekdaysMin[e.day()];
        },
        weekdaysParse: function(e) {
            var n, i, s;
            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }
            for (n = 0; n < 7; n++) {
                if (!this._weekdaysParse[n]) {
                    i = t([ 2e3, 1 ]).day(n);
                    s = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, "");
                    this._weekdaysParse[n] = new RegExp(s.replace(".", ""), "i");
                }
                if (this._weekdaysParse[n].test(e)) {
                    return n;
                }
            }
        },
        _longDateFormat: {
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY LT",
            LLLL: "dddd, MMMM D, YYYY LT"
        },
        longDateFormat: function(e) {
            var t = this._longDateFormat[e];
            if (!t && this._longDateFormat[e.toUpperCase()]) {
                t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(e) {
                    return e.slice(1);
                });
                this._longDateFormat[e] = t;
            }
            return t;
        },
        isPM: function(e) {
            return (e + "").toLowerCase().charAt(0) === "p";
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function(e, t, n) {
            if (e > 11) {
                return n ? "pm" : "PM";
            } else {
                return n ? "am" : "AM";
            }
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function(e, t) {
            var n = this._calendar[e];
            return typeof n === "function" ? n.apply(t) : n;
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function(e, t, n, i) {
            var s = this._relativeTime[n];
            return typeof s === "function" ? s(e, t, n, i) : s.replace(/%d/i, e);
        },
        pastFuture: function(e, t) {
            var n = this._relativeTime[e > 0 ? "future" : "past"];
            return typeof n === "function" ? n(t) : n.replace(/%s/i, t);
        },
        ordinal: function(e) {
            return this._ordinal.replace("%d", e);
        },
        _ordinal: "%d",
        preparse: function(e) {
            return e;
        },
        postformat: function(e) {
            return e;
        },
        week: function(e) {
            return rn(e, this._week.dow, this._week.doy).week;
        },
        _week: {
            dow: 0,
            doy: 6
        },
        _invalidDate: "Invalid date",
        invalidDate: function() {
            return this._invalidDate;
        }
    });
    function Lt(e) {
        if (e.match(/\[[\s\S]/)) {
            return e.replace(/^\[|\]$/g, "");
        }
        return e.replace(/\\/g, "");
    }
    function It(e) {
        var t = e.match(M), n, i;
        for (n = 0, i = t.length; n < i; n++) {
            if (R[t[n]]) {
                t[n] = R[t[n]];
            } else {
                t[n] = Lt(t[n]);
            }
        }
        return function(s) {
            var a = "";
            for (n = 0; n < i; n++) {
                a += t[n] instanceof Function ? t[n].call(s, e) : t[n];
            }
            return a;
        };
    }
    function Ht(e, t) {
        if (!e.isValid()) {
            return e.localeData().invalidDate();
        }
        t = At(t, e.localeData());
        if (!J[t]) {
            J[t] = It(t);
        }
        return J[t](e);
    }
    function At(e, t) {
        var n = 5;
        function i(e) {
            return t.longDateFormat(e) || e;
        }
        w.lastIndex = 0;
        while (n >= 0 && w.test(e)) {
            e = e.replace(w, i);
            w.lastIndex = 0;
            n -= 1;
        }
        return e;
    }
    function xt(e, t) {
        var n, i = t._strict;
        switch (e) {
          case "Q":
            return U;

          case "DDDD":
            return z;

          case "YYYY":
          case "GGGG":
          case "gggg":
            return i ? P : k;

          case "Y":
          case "G":
          case "g":
            return I;

          case "YYYYYY":
          case "YYYYY":
          case "GGGGG":
          case "ggggg":
            return i ? L : b;

          case "S":
            if (i) {
                return U;
            }

          case "SS":
            if (i) {
                return C;
            }

          case "SSS":
            if (i) {
                return z;
            }

          case "DDD":
            return v;

          case "MMM":
          case "MMMM":
          case "dd":
          case "ddd":
          case "dddd":
            return T;

          case "a":
          case "A":
            return t._locale._meridiemParse;

          case "X":
            return G;

          case "Z":
          case "ZZ":
            return O;

          case "T":
            return W;

          case "SSSS":
            return S;

          case "MM":
          case "DD":
          case "YY":
          case "GG":
          case "gg":
          case "HH":
          case "hh":
          case "mm":
          case "ss":
          case "ww":
          case "WW":
            return i ? C : Y;

          case "M":
          case "D":
          case "d":
          case "H":
          case "h":
          case "m":
          case "s":
          case "w":
          case "W":
          case "e":
          case "E":
            return Y;

          case "Do":
            return F;

          default:
            n = new RegExp(Qt(Jt(e.replace("\\", "")), "i"));
            return n;
        }
    }
    function Zt(e) {
        e = e || "";
        var t = e.match(O) || [], n = t[t.length - 1] || [], i = (n + "").match(N) || [ "-", 0, 0 ], s = +(i[1] * 60) + bt(i[2]);
        return i[0] === "+" ? -s : s;
    }
    function Nt(e, n, i) {
        var s, a = i._a;
        switch (e) {
          case "Q":
            if (n != null) {
                a[u] = (bt(n) - 1) * 3;
            }
            break;

          case "M":
          case "MM":
            if (n != null) {
                a[u] = bt(n) - 1;
            }
            break;

          case "MMM":
          case "MMMM":
            s = i._locale.monthsParse(n);
            if (s != null) {
                a[u] = s;
            } else {
                i._pf.invalidMonth = n;
            }
            break;

          case "D":
          case "DD":
            if (n != null) {
                a[f] = bt(n);
            }
            break;

          case "Do":
            if (n != null) {
                a[f] = bt(parseInt(n, 10));
            }
            break;

          case "DDD":
          case "DDDD":
            if (n != null) {
                i._dayOfYear = bt(n);
            }
            break;

          case "YY":
            a[o] = t.parseTwoDigitYear(n);
            break;

          case "YYYY":
          case "YYYYY":
          case "YYYYYY":
            a[o] = bt(n);
            break;

          case "a":
          case "A":
            i._isPm = i._locale.isPM(n);
            break;

          case "H":
          case "HH":
          case "h":
          case "hh":
            a[l] = bt(n);
            break;

          case "m":
          case "mm":
            a[c] = bt(n);
            break;

          case "s":
          case "ss":
            a[d] = bt(n);
            break;

          case "S":
          case "SS":
          case "SSS":
          case "SSSS":
            a[h] = bt(("0." + n) * 1e3);
            break;

          case "X":
            i._d = new Date(parseFloat(n) * 1e3);
            break;

          case "Z":
          case "ZZ":
            i._useUTC = true;
            i._tzm = Zt(n);
            break;

          case "dd":
          case "ddd":
          case "dddd":
            s = i._locale.weekdaysParse(n);
            if (s != null) {
                i._w = i._w || {};
                i._w["d"] = s;
            } else {
                i._pf.invalidWeekday = n;
            }
            break;

          case "w":
          case "ww":
          case "W":
          case "WW":
          case "d":
          case "e":
          case "E":
            e = e.substr(0, 1);

          case "gggg":
          case "GGGG":
          case "GGGGG":
            e = e.substr(0, 2);
            if (n) {
                i._w = i._w || {};
                i._w[e] = bt(n);
            }
            break;

          case "gg":
          case "GG":
            i._w = i._w || {};
            i._w[e] = t.parseTwoDigitYear(n);
        }
    }
    function Et(e) {
        var n, i, s, a, r, u, f;
        n = e._w;
        if (n.GG != null || n.W != null || n.E != null) {
            r = 1;
            u = 4;
            i = tt(n.GG, e._a[o], rn(t(), 1, 4).year);
            s = tt(n.W, 1);
            a = tt(n.E, 1);
        } else {
            r = e._locale._week.dow;
            u = e._locale._week.doy;
            i = tt(n.gg, e._a[o], rn(t(), r, u).year);
            s = tt(n.w, 1);
            if (n.d != null) {
                a = n.d;
                if (a < r) {
                    ++s;
                }
            } else if (n.e != null) {
                a = n.e + r;
            } else {
                a = r;
            }
        }
        f = on(i, s, a, u, r);
        e._a[o] = f.year;
        e._dayOfYear = f.dayOfYear;
    }
    function jt(e) {
        var t, n, i = [], s, a;
        if (e._d) {
            return;
        }
        s = qt(e);
        if (e._w && e._a[f] == null && e._a[u] == null) {
            Et(e);
        }
        if (e._dayOfYear) {
            a = tt(e._a[o], s[o]);
            if (e._dayOfYear > Ot(a)) {
                e._pf._overflowDayOfYear = true;
            }
            n = tn(a, 0, e._dayOfYear);
            e._a[u] = n.getUTCMonth();
            e._a[f] = n.getUTCDate();
        }
        for (t = 0; t < 3 && e._a[t] == null; ++t) {
            e._a[t] = i[t] = s[t];
        }
        for (;t < 7; t++) {
            e._a[t] = i[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
        }
        e._d = (e._useUTC ? tn : en).apply(null, i);
        if (e._tzm != null) {
            e._d.setUTCMinutes(e._d.getUTCMinutes() + e._tzm);
        }
    }
    function Vt(e) {
        var t;
        if (e._d) {
            return;
        }
        t = vt(e._i);
        e._a = [ t.year, t.month, t.day, t.hour, t.minute, t.second, t.millisecond ];
        jt(e);
    }
    function qt(e) {
        var t = new Date();
        if (e._useUTC) {
            return [ t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() ];
        } else {
            return [ t.getFullYear(), t.getMonth(), t.getDate() ];
        }
    }
    function $t(e) {
        if (e._f === t.ISO_8601) {
            Bt(e);
            return;
        }
        e._a = [];
        e._pf.empty = true;
        var n = "" + e._i, i, s, a, r, o, u = n.length, f = 0;
        a = At(e._f, e._locale).match(M) || [];
        for (i = 0; i < a.length; i++) {
            r = a[i];
            s = (n.match(xt(r, e)) || [])[0];
            if (s) {
                o = n.substr(0, n.indexOf(s));
                if (o.length > 0) {
                    e._pf.unusedInput.push(o);
                }
                n = n.slice(n.indexOf(s) + s.length);
                f += s.length;
            }
            if (R[r]) {
                if (s) {
                    e._pf.empty = false;
                } else {
                    e._pf.unusedTokens.push(r);
                }
                Nt(r, s, e);
            } else if (e._strict && !s) {
                e._pf.unusedTokens.push(r);
            }
        }
        e._pf.charsLeftOver = u - f;
        if (n.length > 0) {
            e._pf.unusedInput.push(n);
        }
        if (e._isPm && e._a[l] < 12) {
            e._a[l] += 12;
        }
        if (e._isPm === false && e._a[l] === 12) {
            e._a[l] = 0;
        }
        jt(e);
        Gt(e);
    }
    function Jt(e) {
        return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, i, s) {
            return t || n || i || s;
        });
    }
    function Qt(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function Xt(e) {
        var t, n, i, s, a;
        if (e._f.length === 0) {
            e._pf.invalidFormat = true;
            e._d = new Date(NaN);
            return;
        }
        for (s = 0; s < e._f.length; s++) {
            a = 0;
            t = dt({}, e);
            t._pf = nt();
            t._f = e._f[s];
            $t(t);
            if (!Ft(t)) {
                continue;
            }
            a += t._pf.charsLeftOver;
            a += t._pf.unusedTokens.length * 10;
            t._pf.score = a;
            if (i == null || a < i) {
                i = a;
                n = t;
            }
        }
        ct(e, n || t);
    }
    function Bt(e) {
        var t, n, i = e._i, s = H.exec(i);
        if (s) {
            e._pf.iso = true;
            for (t = 0, n = x.length; t < n; t++) {
                if (x[t][1].exec(i)) {
                    e._f = x[t][0] + (s[6] || " ");
                    break;
                }
            }
            for (t = 0, n = Z.length; t < n; t++) {
                if (Z[t][1].exec(i)) {
                    e._f += Z[t][0];
                    break;
                }
            }
            if (i.match(O)) {
                e._f += "Z";
            }
            $t(e);
        } else {
            e._isValid = false;
        }
    }
    function Rt(e) {
        Bt(e);
        if (e._isValid === false) {
            delete e._isValid;
            t.createFromInputFallback(e);
        }
    }
    function Kt(n) {
        var i = n._i, s;
        if (i === e) {
            n._d = new Date();
        } else if (Mt(i)) {
            n._d = new Date(+i);
        } else if ((s = p.exec(i)) !== null) {
            n._d = new Date(+s[1]);
        } else if (typeof i === "string") {
            Rt(n);
        } else if (gt(i)) {
            n._a = i.slice(0);
            jt(n);
        } else if (typeof i === "object") {
            Vt(n);
        } else if (typeof i === "number") {
            n._d = new Date(i);
        } else {
            t.createFromInputFallback(n);
        }
    }
    function en(e, t, n, i, s, a, r) {
        var o = new Date(e, t, n, i, s, a, r);
        if (e < 1970) {
            o.setFullYear(e);
        }
        return o;
    }
    function tn(e) {
        var t = new Date(Date.UTC.apply(null, arguments));
        if (e < 1970) {
            t.setUTCFullYear(e);
        }
        return t;
    }
    function nn(e, t) {
        if (typeof e === "string") {
            if (!isNaN(e)) {
                e = parseInt(e, 10);
            } else {
                e = t.weekdaysParse(e);
                if (typeof e !== "number") {
                    return null;
                }
            }
        }
        return e;
    }
    function sn(e, t, n, i, s) {
        return s.relativeTime(t || 1, !!n, e, i);
    }
    function an(e, n, i) {
        var s = t.duration(e).abs(), r = a(s.as("s")), o = a(s.as("m")), u = a(s.as("h")), f = a(s.as("d")), l = a(s.as("M")), c = a(s.as("y")), d = r < Q.s && [ "s", r ] || o === 1 && [ "m" ] || o < Q.m && [ "mm", o ] || u === 1 && [ "h" ] || u < Q.h && [ "hh", u ] || f === 1 && [ "d" ] || f < Q.d && [ "dd", f ] || l === 1 && [ "M" ] || l < Q.M && [ "MM", l ] || c === 1 && [ "y" ] || [ "yy", c ];
        d[2] = n;
        d[3] = +e > 0;
        d[4] = i;
        return sn.apply({}, d);
    }
    function rn(e, n, i) {
        var s = i - n, a = i - e.day(), r;
        if (a > s) {
            a -= 7;
        }
        if (a < s - 7) {
            a += 7;
        }
        r = t(e).add(a, "d");
        return {
            week: Math.ceil(r.dayOfYear() / 7),
            year: r.year()
        };
    }
    function on(e, t, n, i, s) {
        var a = tn(e, 0, 1).getUTCDay(), r, o;
        a = a === 0 ? 7 : a;
        n = n != null ? n : s;
        r = s - a + (a > i ? 7 : 0) - (a < s ? 7 : 0);
        o = 7 * (t - 1) + (n - s) + r + 1;
        return {
            year: o > 0 ? e : e - 1,
            dayOfYear: o > 0 ? o : Ot(e - 1) + o
        };
    }
    function un(n) {
        var i = n._i, s = n._f;
        n._locale = n._locale || t.localeData(n._l);
        if (i === null || s === e && i === "") {
            return t.invalid({
                nullInput: true
            });
        }
        if (typeof i === "string") {
            n._i = i = n._locale.preparse(i);
        }
        if (t.isMoment(i)) {
            return new ft(i, true);
        } else if (s) {
            if (gt(s)) {
                Xt(n);
            } else {
                $t(n);
            }
        } else {
            Kt(n);
        }
        return new ft(n);
    }
    t = function(t, n, i, s) {
        var a;
        if (typeof i === "boolean") {
            s = i;
            i = e;
        }
        a = {};
        a._isAMomentObject = true;
        a._i = t;
        a._f = n;
        a._l = i;
        a._strict = s;
        a._isUTC = false;
        a._pf = nt();
        return un(a);
    };
    t.suppressDeprecationWarnings = false;
    t.createFromInputFallback = st("moment construction falls back to js Date. This is " + "discouraged and will be removed in upcoming major " + "release. Please refer to " + "https://github.com/moment/moment/issues/1407 for more info.", function(e) {
        e._d = new Date(e._i);
    });
    function fn(e, n) {
        var i, s;
        if (n.length === 1 && gt(n[0])) {
            n = n[0];
        }
        if (!n.length) {
            return t();
        }
        i = n[0];
        for (s = 1; s < n.length; ++s) {
            if (n[s][e](i)) {
                i = n[s];
            }
        }
        return i;
    }
    t.min = function() {
        var e = [].slice.call(arguments, 0);
        return fn("isBefore", e);
    };
    t.max = function() {
        var e = [].slice.call(arguments, 0);
        return fn("isAfter", e);
    };
    t.utc = function(t, n, i, s) {
        var a;
        if (typeof i === "boolean") {
            s = i;
            i = e;
        }
        a = {};
        a._isAMomentObject = true;
        a._useUTC = true;
        a._isUTC = true;
        a._l = i;
        a._i = t;
        a._f = n;
        a._strict = s;
        a._pf = nt();
        return un(a).utc();
    };
    t.unix = function(e) {
        return t(e * 1e3);
    };
    t.duration = function(e, n) {
        var i = e, s = null, a, r, o, u;
        if (t.isDuration(e)) {
            i = {
                ms: e._milliseconds,
                d: e._days,
                M: e._months
            };
        } else if (typeof e === "number") {
            i = {};
            if (n) {
                i[n] = e;
            } else {
                i.milliseconds = e;
            }
        } else if (!!(s = D.exec(e))) {
            a = s[1] === "-" ? -1 : 1;
            i = {
                y: 0,
                d: bt(s[f]) * a,
                h: bt(s[l]) * a,
                m: bt(s[c]) * a,
                s: bt(s[d]) * a,
                ms: bt(s[h]) * a
            };
        } else if (!!(s = g.exec(e))) {
            a = s[1] === "-" ? -1 : 1;
            o = function(e) {
                var t = e && parseFloat(e.replace(",", "."));
                return (isNaN(t) ? 0 : t) * a;
            };
            i = {
                y: o(s[2]),
                M: o(s[3]),
                d: o(s[4]),
                h: o(s[5]),
                m: o(s[6]),
                s: o(s[7]),
                w: o(s[8])
            };
        } else if (typeof i === "object" && ("from" in i || "to" in i)) {
            u = yt(t(i.from), t(i.to));
            i = {};
            i.ms = u.milliseconds;
            i.M = u.months;
        }
        r = new lt(i);
        if (t.isDuration(e) && e.hasOwnProperty("_locale")) {
            r._locale = e._locale;
        }
        return r;
    };
    t.version = n;
    t.defaultFormat = A;
    t.ISO_8601 = function() {};
    t.momentProperties = m;
    t.updateOffset = function() {};
    t.relativeTimeThreshold = function(t, n) {
        if (Q[t] === e) {
            return false;
        }
        if (n === e) {
            return Q[t];
        }
        Q[t] = n;
        return true;
    };
    t.lang = st("moment.lang is deprecated. Use moment.locale instead.", function(e, n) {
        return t.locale(e, n);
    });
    t.locale = function(e, n) {
        var i;
        if (e) {
            if (typeof n !== "undefined") {
                i = t.defineLocale(e, n);
            } else {
                i = t.localeData(e);
            }
            if (i) {
                t.duration._locale = t._locale = i;
            }
        }
        return t._locale._abbr;
    };
    t.defineLocale = function(e, n) {
        if (n !== null) {
            n.abbr = e;
            if (!_[e]) {
                _[e] = new ut();
            }
            _[e].set(n);
            t.locale(e);
            return _[e];
        } else {
            delete _[e];
            return null;
        }
    };
    t.langData = st("moment.langData is deprecated. Use moment.localeData instead.", function(e) {
        return t.localeData(e);
    });
    t.localeData = function(e) {
        var n;
        if (e && e._locale && e._locale._abbr) {
            e = e._locale._abbr;
        }
        if (!e) {
            return t._locale;
        }
        if (!gt(e)) {
            n = zt(e);
            if (n) {
                return n;
            }
            e = [ e ];
        }
        return Ct(e);
    };
    t.isMoment = function(e) {
        return e instanceof ft || e != null && e.hasOwnProperty("_isAMomentObject");
    };
    t.isDuration = function(e) {
        return e instanceof lt;
    };
    for (r = et.length - 1; r >= 0; --r) {
        kt(et[r]);
    }
    t.normalizeUnits = function(e) {
        return Yt(e);
    };
    t.invalid = function(e) {
        var n = t.utc(NaN);
        if (e != null) {
            ct(n._pf, e);
        } else {
            n._pf.userInvalidated = true;
        }
        return n;
    };
    t.parseZone = function() {
        return t.apply(null, arguments).parseZone();
    };
    t.parseTwoDigitYear = function(e) {
        return bt(e) + (bt(e) > 68 ? 1900 : 2e3);
    };
    ct(t.fn = ft.prototype, {
        clone: function() {
            return t(this);
        },
        valueOf: function() {
            return +this._d + (this._offset || 0) * 6e4;
        },
        unix: function() {
            return Math.floor(+this / 1e3);
        },
        toString: function() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },
        toDate: function() {
            return this._offset ? new Date(+this) : this._d;
        },
        toISOString: function() {
            var e = t(this).utc();
            if (0 < e.year() && e.year() <= 9999) {
                return Ht(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
            } else {
                return Ht(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
            }
        },
        toArray: function() {
            var e = this;
            return [ e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds() ];
        },
        isValid: function() {
            return Ft(this);
        },
        isDSTShifted: function() {
            if (this._a) {
                return this.isValid() && wt(this._a, (this._isUTC ? t.utc(this._a) : t(this._a)).toArray()) > 0;
            }
            return false;
        },
        parsingFlags: function() {
            return ct({}, this._pf);
        },
        invalidAt: function() {
            return this._pf.overflow;
        },
        utc: function(e) {
            return this.zone(0, e);
        },
        local: function(e) {
            if (this._isUTC) {
                this.zone(0, e);
                this._isUTC = false;
                if (e) {
                    this.add(this._d.getTimezoneOffset(), "m");
                }
            }
            return this;
        },
        format: function(e) {
            var n = Ht(this, e || t.defaultFormat);
            return this.localeData().postformat(n);
        },
        add: pt(1, "add"),
        subtract: pt(-1, "subtract"),
        diff: function(e, n, i) {
            var s = Pt(e, this), a = (this.zone() - s.zone()) * 6e4, r, o;
            n = Yt(n);
            if (n === "year" || n === "month") {
                r = (this.daysInMonth() + s.daysInMonth()) * 432e5;
                o = (this.year() - s.year()) * 12 + (this.month() - s.month());
                o += (this - t(this).startOf("month") - (s - t(s).startOf("month"))) / r;
                o -= (this.zone() - t(this).startOf("month").zone() - (s.zone() - t(s).startOf("month").zone())) * 6e4 / r;
                if (n === "year") {
                    o = o / 12;
                }
            } else {
                r = this - s;
                o = n === "second" ? r / 1e3 : n === "minute" ? r / 6e4 : n === "hour" ? r / 36e5 : n === "day" ? (r - a) / 864e5 : n === "week" ? (r - a) / 6048e5 : r;
            }
            return i ? o : ht(o);
        },
        from: function(e, n) {
            return t.duration({
                to: this,
                from: e
            }).locale(this.locale()).humanize(!n);
        },
        fromNow: function(e) {
            return this.from(t(), e);
        },
        calendar: function(e) {
            var n = e || t(), i = Pt(n, this).startOf("day"), s = this.diff(i, "days", true), a = s < -6 ? "sameElse" : s < -1 ? "lastWeek" : s < 0 ? "lastDay" : s < 1 ? "sameDay" : s < 2 ? "nextDay" : s < 7 ? "nextWeek" : "sameElse";
            return this.format(this.localeData().calendar(a, this));
        },
        isLeapYear: function() {
            return Wt(this.year());
        },
        isDST: function() {
            return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone();
        },
        day: function(e) {
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (e != null) {
                e = nn(e, this.localeData());
                return this.add(e - t, "d");
            } else {
                return t;
            }
        },
        month: hn("Month", true),
        startOf: function(e) {
            e = Yt(e);
            switch (e) {
              case "year":
                this.month(0);

              case "quarter":
              case "month":
                this.date(1);

              case "week":
              case "isoWeek":
              case "day":
                this.hours(0);

              case "hour":
                this.minutes(0);

              case "minute":
                this.seconds(0);

              case "second":
                this.milliseconds(0);
            }
            if (e === "week") {
                this.weekday(0);
            } else if (e === "isoWeek") {
                this.isoWeekday(1);
            }
            if (e === "quarter") {
                this.month(Math.floor(this.month() / 3) * 3);
            }
            return this;
        },
        endOf: function(e) {
            e = Yt(e);
            return this.startOf(e).add(1, e === "isoWeek" ? "week" : e).subtract(1, "ms");
        },
        isAfter: function(e, n) {
            n = typeof n !== "undefined" ? n : "millisecond";
            return +this.clone().startOf(n) > +t(e).startOf(n);
        },
        isBefore: function(e, n) {
            n = typeof n !== "undefined" ? n : "millisecond";
            return +this.clone().startOf(n) < +t(e).startOf(n);
        },
        isSame: function(e, t) {
            t = t || "ms";
            return +this.clone().startOf(t) === +Pt(e, this).startOf(t);
        },
        min: st("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(e) {
            e = t.apply(null, arguments);
            return e < this ? this : e;
        }),
        max: st("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(e) {
            e = t.apply(null, arguments);
            return e > this ? this : e;
        }),
        zone: function(e, n) {
            var i = this._offset || 0, s;
            if (e != null) {
                if (typeof e === "string") {
                    e = Zt(e);
                }
                if (Math.abs(e) < 16) {
                    e = e * 60;
                }
                if (!this._isUTC && n) {
                    s = this._d.getTimezoneOffset();
                }
                this._offset = e;
                this._isUTC = true;
                if (s != null) {
                    this.subtract(s, "m");
                }
                if (i !== e) {
                    if (!n || this._changeInProgress) {
                        Dt(this, t.duration(i - e, "m"), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        t.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
            } else {
                return this._isUTC ? i : this._d.getTimezoneOffset();
            }
            return this;
        },
        zoneAbbr: function() {
            return this._isUTC ? "UTC" : "";
        },
        zoneName: function() {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },
        parseZone: function() {
            if (this._tzm) {
                this.zone(this._tzm);
            } else if (typeof this._i === "string") {
                this.zone(this._i);
            }
            return this;
        },
        hasAlignedHourOffset: function(e) {
            if (!e) {
                e = 0;
            } else {
                e = t(e).zone();
            }
            return (this.zone() - e) % 60 === 0;
        },
        daysInMonth: function() {
            return St(this.year(), this.month());
        },
        dayOfYear: function(e) {
            var n = a((t(this).startOf("day") - t(this).startOf("year")) / 864e5) + 1;
            return e == null ? n : this.add(e - n, "d");
        },
        quarter: function(e) {
            return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + this.month() % 3);
        },
        weekYear: function(e) {
            var t = rn(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return e == null ? t : this.add(e - t, "y");
        },
        isoWeekYear: function(e) {
            var t = rn(this, 1, 4).year;
            return e == null ? t : this.add(e - t, "y");
        },
        week: function(e) {
            var t = this.localeData().week(this);
            return e == null ? t : this.add((e - t) * 7, "d");
        },
        isoWeek: function(e) {
            var t = rn(this, 1, 4).week;
            return e == null ? t : this.add((e - t) * 7, "d");
        },
        weekday: function(e) {
            var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return e == null ? t : this.add(e - t, "d");
        },
        isoWeekday: function(e) {
            return e == null ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7);
        },
        isoWeeksInYear: function() {
            return Tt(this.year(), 1, 4);
        },
        weeksInYear: function() {
            var e = this.localeData()._week;
            return Tt(this.year(), e.dow, e.doy);
        },
        get: function(e) {
            e = Yt(e);
            return this[e]();
        },
        set: function(e, t) {
            e = Yt(e);
            if (typeof this[e] === "function") {
                this[e](t);
            }
            return this;
        },
        locale: function(n) {
            if (n === e) {
                return this._locale._abbr;
            } else {
                this._locale = t.localeData(n);
                return this;
            }
        },
        lang: st("moment().lang() is deprecated. Use moment().localeData() instead.", function(n) {
            if (n === e) {
                return this.localeData();
            } else {
                this._locale = t.localeData(n);
                return this;
            }
        }),
        localeData: function() {
            return this._locale;
        }
    });
    function ln(e, t) {
        var n;
        if (typeof t === "string") {
            t = e.localeData().monthsParse(t);
            if (typeof t !== "number") {
                return e;
            }
        }
        n = Math.min(e.date(), St(e.year(), t));
        e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n);
        return e;
    }
    function cn(e, t) {
        return e._d["get" + (e._isUTC ? "UTC" : "") + t]();
    }
    function dn(e, t, n) {
        if (t === "Month") {
            return ln(e, n);
        } else {
            return e._d["set" + (e._isUTC ? "UTC" : "") + t](n);
        }
    }
    function hn(e, n) {
        return function(i) {
            if (i != null) {
                dn(this, e, i);
                t.updateOffset(this, n);
                return this;
            } else {
                return cn(this, e);
            }
        };
    }
    t.fn.millisecond = t.fn.milliseconds = hn("Milliseconds", false);
    t.fn.second = t.fn.seconds = hn("Seconds", false);
    t.fn.minute = t.fn.minutes = hn("Minutes", false);
    t.fn.hour = t.fn.hours = hn("Hours", true);
    t.fn.date = hn("Date", true);
    t.fn.dates = st("dates accessor is deprecated. Use date instead.", hn("Date", true));
    t.fn.year = hn("FullYear", true);
    t.fn.years = st("years accessor is deprecated. Use year instead.", hn("FullYear", true));
    t.fn.days = t.fn.day;
    t.fn.months = t.fn.month;
    t.fn.weeks = t.fn.week;
    t.fn.isoWeeks = t.fn.isoWeek;
    t.fn.quarters = t.fn.quarter;
    t.fn.toJSON = t.fn.toISOString;
    function _n(e) {
        return e * 400 / 146097;
    }
    function mn(e) {
        return e * 146097 / 400;
    }
    ct(t.duration.fn = lt.prototype, {
        _bubble: function() {
            var e = this._milliseconds, t = this._days, n = this._months, i = this._data, s, a, r, o = 0;
            i.milliseconds = e % 1e3;
            s = ht(e / 1e3);
            i.seconds = s % 60;
            a = ht(s / 60);
            i.minutes = a % 60;
            r = ht(a / 60);
            i.hours = r % 24;
            t += ht(r / 24);
            o = ht(_n(t));
            t -= ht(mn(o));
            n += ht(t / 30);
            t %= 30;
            o += ht(n / 12);
            n %= 12;
            i.days = t;
            i.months = n;
            i.years = o;
        },
        abs: function() {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);
            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);
            return this;
        },
        weeks: function() {
            return ht(this.days() / 7);
        },
        valueOf: function() {
            return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + bt(this._months / 12) * 31536e6;
        },
        humanize: function(e) {
            var t = an(this, !e, this.localeData());
            if (e) {
                t = this.localeData().pastFuture(+this, t);
            }
            return this.localeData().postformat(t);
        },
        add: function(e, n) {
            var i = t.duration(e, n);
            this._milliseconds += i._milliseconds;
            this._days += i._days;
            this._months += i._months;
            this._bubble();
            return this;
        },
        subtract: function(e, n) {
            var i = t.duration(e, n);
            this._milliseconds -= i._milliseconds;
            this._days -= i._days;
            this._months -= i._months;
            this._bubble();
            return this;
        },
        get: function(e) {
            e = Yt(e);
            return this[e.toLowerCase() + "s"]();
        },
        as: function(e) {
            var t, n;
            e = Yt(e);
            t = this._days + this._milliseconds / 864e5;
            if (e === "month" || e === "year") {
                n = this._months + _n(t) * 12;
                return e === "month" ? n : n / 12;
            } else {
                t += mn(this._months / 12);
                switch (e) {
                  case "week":
                    return t / 7;

                  case "day":
                    return t;

                  case "hour":
                    return t * 24;

                  case "minute":
                    return t * 24 * 60;

                  case "second":
                    return t * 24 * 60 * 60;

                  case "millisecond":
                    return t * 24 * 60 * 60 * 1e3;

                  default:
                    throw new Error("Unknown unit " + e);
                }
            }
        },
        lang: t.fn.lang,
        locale: t.fn.locale,
        toIsoString: st("toIsoString() is deprecated. Please use toISOString() instead " + "(notice the capitals)", function() {
            return this.toISOString();
        }),
        toISOString: function() {
            var e = Math.abs(this.years()), t = Math.abs(this.months()), n = Math.abs(this.days()), i = Math.abs(this.hours()), s = Math.abs(this.minutes()), a = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            if (!this.asSeconds()) {
                return "P0D";
            }
            return (this.asSeconds() < 0 ? "-" : "") + "P" + (e ? e + "Y" : "") + (t ? t + "M" : "") + (n ? n + "D" : "") + (i || s || a ? "T" : "") + (i ? i + "H" : "") + (s ? s + "M" : "") + (a ? a + "S" : "");
        },
        localeData: function() {
            return this._locale;
        }
    });
    function yn(e) {
        t.duration.fn[e] = function() {
            return this._data[e];
        };
    }
    for (r in j) {
        if (j.hasOwnProperty(r)) {
            yn(r.toLowerCase());
        }
    }
    t.duration.fn.asMilliseconds = function() {
        return this.as("ms");
    };
    t.duration.fn.asSeconds = function() {
        return this.as("s");
    };
    t.duration.fn.asMinutes = function() {
        return this.as("m");
    };
    t.duration.fn.asHours = function() {
        return this.as("h");
    };
    t.duration.fn.asDays = function() {
        return this.as("d");
    };
    t.duration.fn.asWeeks = function() {
        return this.as("weeks");
    };
    t.duration.fn.asMonths = function() {
        return this.as("M");
    };
    t.duration.fn.asYears = function() {
        return this.as("y");
    };
    t.locale("en", {
        ordinal: function(e) {
            var t = e % 10, n = bt(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
            return e + n;
        }
    });
    function pn(e) {
        if (typeof ender !== "undefined") {
            return;
        }
        s = i.moment;
        if (e) {
            i.moment = st("Accessing Moment through the global scope is " + "deprecated, and will be removed in an upcoming " + "release.", t);
        } else {
            i.moment = t;
        }
    }
    if (y) {
        module.exports = t;
    } else if (typeof define === "function" && define.amd) {
        define("moment", function(e, n, a) {
            if (a.config && a.config() && a.config().noGlobal === true) {
                i.moment = s;
            }
            return t;
        });
        pn(true);
    } else {
        pn();
    }
}).call(this);