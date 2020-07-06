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
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar(bg, bar) {
            var _this = _super.call(this) || this;
            _this.bg = GG.newBitmap(bg, _this);
            _this.bar = GG.newBitmap(bar, _this);
            _this.rec = new egret.Rectangle(0, 0, _this.bar.width, _this.bar.height);
            return _this;
        }
        Object.defineProperty(ProgressBar.prototype, "progress", {
            get: function () {
                return this._progress;
            },
            set: function (per) {
                this._progress = per;
                if (this.bar) {
                    this.rec.width = per * this.bar.width;
                    this.bar.scrollRect = this.rec;
                }
            },
            enumerable: true,
            configurable: true
        });
        return ProgressBar;
    }(egret.DisplayObjectContainer));
    ys.ProgressBar = ProgressBar;
    __reflect(ProgressBar.prototype, "ys.ProgressBar");
})(ys || (ys = {}));
//# sourceMappingURL=ProgressBar.js.map