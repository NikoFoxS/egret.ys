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
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image() {
            var _this = _super.call(this) || this;
            _this._src = '';
            return _this;
        }
        Object.defineProperty(Image.prototype, "src", {
            get: function () {
                return this._src;
            },
            set: function (url) {
                var _this = this;
                this._src = url;
                RES.getResByUrl(url, function (tex) {
                    _this.texture = tex;
                }, this, RES.ResourceItem.TYPE_IMAGE);
            },
            enumerable: true,
            configurable: true
        });
        return Image;
    }(egret.Bitmap));
    ys.Image = Image;
    __reflect(Image.prototype, "ys.Image");
})(ys || (ys = {}));
//# sourceMappingURL=Image.js.map