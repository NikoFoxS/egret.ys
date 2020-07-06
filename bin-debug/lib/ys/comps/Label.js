var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ys;
(function (ys) {
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label() {
            var _this = _super.call(this) || this;
            _this.verticalAlign = egret.VerticalAlign.MIDDLE;
            return _this;
        }
        Object.defineProperty(Label.prototype, "text", {
            set: function (t) {
                t = Label.getLocale(t);
                _super.prototype.$setText.call(this, t);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "html", {
            set: function (s) {
                s = Label.getLocale(s);
                this.textFlow = (new egret.HtmlTextParser).parser(s);
            },
            enumerable: true,
            configurable: true
        });
        Label.getLocale = function (t) {
            console.log('key:', t, 'value:', t);
            return t;
        };
        return Label;
    }(egret.TextField));
    ys.Label = Label;
    __reflect(Label.prototype, "ys.Label");
})(ys || (ys = {}));
//# sourceMappingURL=Label.js.map