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
    var VScrollBar = (function (_super) {
        __extends(VScrollBar, _super);
        function VScrollBar() {
            return _super.call(this) || this;
        }
        VScrollBar.prototype.setContent = function (content, w, h) {
            var sv = new egret.ScrollView(content);
            sv.width = w;
            sv.height = h;
            sv.horizontalScrollPolicy = 'off';
            this.sv = sv;
            this.addChild(sv);
            sv.addEventListener(egret.TouchEvent.CHANGE, this.moveBar, this);
            this.sv = sv;
            this.scrollW = w;
            this.scrollH = h;
            this.content = content;
            this.rec = new egret.Rectangle();
            content.height && this.updateBar();
        };
        VScrollBar.prototype.enableBar = function (barColor, barSize) {
            this._enableBar = true;
            this.size = barSize;
            this.barColor = barColor;
            if (!this.bar) {
                this.bar = new egret.Shape();
                this.addChild(this.bar);
                this.content.height && this.updateBar();
            }
        };
        VScrollBar.prototype.moveBar = function () {
            if (this._enableBar) {
                var h = this.scrollH;
                var top_1 = h * this.sv.scrollTop / this.contentH;
                var size = this.size;
                var sizeHalf = size * 0.5;
                var rec = this.rec;
                rec.x = -sizeHalf;
                rec.y = -top_1 - sizeHalf;
                rec.width = size * 2;
                rec.height = h;
                this.bar.scrollRect = rec;
            }
            this.onScroll();
        };
        VScrollBar.prototype.onScroll = function () {
        };
        VScrollBar.prototype.updateBar = function () {
            this.contentH = this.content.height;
            if (this.contentH <= 0) {
                return;
            }
            if (this._enableBar) {
                var size = this.size;
                var h = this.scrollH;
                var w = this.scrollW;
                var barH = h * h / this.contentH - size;
                var bar = this.bar;
                bar.visible = this.contentH > this.scrollH;
                bar.graphics.lineStyle(size, this.barColor);
                bar.graphics.moveTo(0, 0);
                bar.graphics.lineTo(0, barH);
                this.addChild(bar);
                bar.x = w - size;
                var rec = this.rec;
                rec.x = -size * 0.5;
                rec.y = -size * 0.5;
                rec.width = size * 2;
                rec.height = h - size;
                bar.scrollRect = rec;
                bar.cacheAsBitmap = true;
            }
            this.onScroll();
        };
        return VScrollBar;
    }(egret.DisplayObjectContainer));
    ys.VScrollBar = VScrollBar;
    __reflect(VScrollBar.prototype, "ys.VScrollBar");
})(ys || (ys = {}));
//# sourceMappingURL=VScrollBar.js.map