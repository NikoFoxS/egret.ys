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
    var ButtonBase = (function (_super) {
        __extends(ButtonBase, _super);
        function ButtonBase() {
            return _super.call(this) || this;
        }
        /**
         * @param t 字符
         * @param size 字体大小
         * @param color 字体颜色
         * @param offsetWidth 宽度缩小多少。主要处理不规范的按钮地图
         * @param offsetX x方向偏移多少。主要处理不规范的按钮地图
         * @param offsetY y方向偏移多少。主要处理不规范的按钮地图
         */
        ButtonBase.prototype.setLabel = function (t, size, color, offsetWidth, offsetX, offsetY) {
            if (offsetWidth === void 0) { offsetWidth = 0; }
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            if (this.bg) {
                if (!this._label) {
                    this._label = new ys.Label();
                    this.addChild(this._label);
                }
                var label = this._label;
                label.text = t;
                label.textColor = color;
                label.size = size;
                label.width = label.textWidth;
                label.height = label.textHeight;
                label.textAlign = 'center';
                label.anchorOffsetX = label.width * 0.5;
                label.anchorOffsetY = label.height * 0.5;
                var scale = 1;
                var w = this.bg.width - offsetWidth;
                //固定宽度
                if (label.textWidth > w) {
                    scale = w / label.textWidth;
                }
                label.scaleX = label.scaleY = scale;
                label.x = this.bg.width * 0.5 + offsetX;
                label.y = this.bg.height * 0.5 + offsetY;
                label.verticalAlign = egret.VerticalAlign.MIDDLE;
            }
            this.cacheAsBitmap = true;
        };
        return ButtonBase;
    }(egret.DisplayObjectContainer));
    __reflect(ButtonBase.prototype, "ButtonBase");
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(res) {
            var _this = _super.call(this) || this;
            var bg = GG.newBitmap(res, _this);
            _this.bg = bg;
            return _this;
        }
        Button.prototype.setSize = function (w, scale9) {
            var bg = this.bg;
            if (w != 0) {
                bg.width = w;
                if (scale9) {
                    bg.scale9Grid = scale9;
                }
            }
        };
        Object.defineProperty(Button.prototype, "effect", {
            set: function (ef) {
                ef ? (this.enableEffect()) : (this.removeEffect());
                this._touchEffect = ef;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.enableEffect = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.checkEffect, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.checkEffect, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.checkEffect, this);
        };
        Button.prototype.removeEffect = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.checkEffect, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.checkEffect, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.checkEffect, this);
        };
        Button.prototype.checkEffect = function (e) {
            var ef = this._touchEffect;
            if (ef) {
                var type = e.type;
                switch (type) {
                    case egret.TouchEvent.TOUCH_BEGIN:
                        ef.onTouchBeginEffect(this);
                        break;
                    default:
                        ef.onTouchEndEffect(this);
                        break;
                }
            }
        };
        return Button;
    }(ButtonBase));
    ys.Button = Button;
    __reflect(Button.prototype, "ys.Button");
})(ys || (ys = {}));
//# sourceMappingURL=Button.js.map