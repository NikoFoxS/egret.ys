var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ys;
(function (ys) {
    /**封装ajax */
    var Ajax = (function () {
        function Ajax() {
        }
        Ajax.prototype.xhr = function () {
            if (typeof XMLHttpRequest !== 'undefined') {
                return new XMLHttpRequest();
            }
            var versions = [
                "MSXML2.XmlHttp.6.0",
                "MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"
            ];
            var xhr;
            for (var i = 0; i < versions.length; i++) {
                try {
                    xhr = new window['ActiveXObject'](versions[i]);
                    break;
                }
                catch (e) {
                }
            }
            return xhr;
        };
        Ajax.prototype.send = function (url, callback, method, data, async) {
            if (async === undefined) {
                async = true;
            }
            var x = this.xhr();
            x.open(method, url, async);
            x.onreadystatechange = function () {
                if (x.readyState == 4) {
                    callback(x.status, x.responseText);
                }
            };
            if (method == 'POST') {
                x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }
            x.send(data);
        };
        Ajax.prototype.post = function (url, data, callback, async) {
            if (async === void 0) { async = true; }
            if (Ajax.mock) {
                callback(null);
                return;
            }
            var query = [];
            for (var key in data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            this.send(url, callback, 'POST', query.join('&'), async);
        };
        Ajax.prototype.get = function (url, data, callback, async) {
            if (async === void 0) { async = true; }
            if (Ajax.mock) {
                callback(null);
                return;
            }
            var query = [];
            for (var key in data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            this.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async);
        };
        return Ajax;
    }());
    ys.Ajax = Ajax;
    __reflect(Ajax.prototype, "ys.Ajax");
})(ys || (ys = {}));
//# sourceMappingURL=Ajax.js.map