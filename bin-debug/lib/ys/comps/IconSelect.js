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
    var IconSelect = (function (_super) {
        __extends(IconSelect, _super);
        /**
         * @param icons 资源数组
         * @param space icon与icon的距离。注意：是两个x坐标之间的距离。
         */
        function IconSelect(icons, space, loop) {
            if (loop === void 0) { loop = false; }
            var _this = _super.call(this) || this;
            _this.iconsCon = new egret.DisplayObjectContainer();
            _this.addChild(_this.iconsCon);
            var i = 0;
            var len = icons.length;
            while (i < len) {
                var icon = new Icon(icons[i]);
                if (i > 0) {
                    icon.x = space * i;
                }
                icon.index = i;
                // icon.txt.text = 'icon' + i;
                // icon.id = i;
                icon.touchEnabled = true;
                _this.iconsCon.addChild(icon);
                i++;
            }
            _this.space = space;
            _this.loop = loop;
            _this.updateScale();
            _this.index = 0;
            _this.checkSelect();
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.checkTap, _this);
            }, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.checkTap, _this);
            }, _this);
            return _this;
        }
        IconSelect.prototype.checkTap = function (e) {
            var icon = e.target;
            var index = this.getMoveIndex(icon);
            this._moveIndex = index;
            this.dispatchEventWith(ys.IconSelect.CLICK_ONE, false, { moveIndex: index });
        };
        Object.defineProperty(IconSelect.prototype, "selectIndex", {
            /**
             * 选择的icon的index
             */
            get: function () {
                var i = this.iconsCon.numChildren;
                var index = 0;
                while (i--) {
                    var icon = this.iconsCon.getChildAt(i);
                    var p = icon.localToGlobal();
                    p = this.globalToLocal(p.x, p.y);
                    if (p.x == 0) {
                        index = icon.index;
                        break;
                    }
                }
                return index;
            },
            enumerable: true,
            configurable: true
        });
        IconSelect.prototype.checkSelect = function () {
            var i = this.iconsCon.numChildren;
            var index = 0;
            while (i--) {
                var icon = this.iconsCon.getChildAt(i);
                var p = icon.localToGlobal();
                p = this.globalToLocal(p.x, p.y);
                if (p.x == 0) {
                    index = icon.index;
                    break;
                }
            }
            this.dispatchEventWith(ys.IconSelect.SELECT_ONE, false, { index: index });
        };
        IconSelect.prototype.checkLoop = function (idx) {
            var i = this.iconsCon.numChildren;
            var dis = this.space * this.iconsCon.numChildren;
            while (i--) {
                var icon = this.iconsCon.getChildAt(i);
                var p = icon.localToGlobal();
                p = this.globalToLocal(p.x, p.y);
                if (idx < 0) {
                    if (p.x < -this.space) {
                        icon.x += dis;
                    }
                }
                else if (idx > 0) {
                    if (p.x >= dis - this.space) {
                        icon.x -= dis;
                    }
                }
            }
        };
        IconSelect.prototype.getMoveIndex = function (icon) {
            var i = this.iconsCon.numChildren;
            var index = 0;
            var p = icon.localToGlobal();
            p = this.globalToLocal(p.x, p.y);
            return Math.floor(p.x / this.space);
        };
        Object.defineProperty(IconSelect.prototype, "moveIndex", {
            get: function () {
                return this._moveIndex;
            },
            enumerable: true,
            configurable: true
        });
        /**
         *@param index 向左或者向右移动index个元素。如：1右移1个。-1就是左移1个。
         @param time 移动需要的时间
         */
        IconSelect.prototype.move = function (index, time) {
            var _this = this;
            if (time === void 0) { time = 0; }
            var idx = this.index;
            idx += index;
            if (!this.loop && (idx < -this.iconsCon.numChildren + 1 || idx > 0)) {
                return;
            }
            if (this.isTween) {
                return;
            }
            this.dispatchEventWith(ys.IconSelect.MOVE_START);
            this.index = idx;
            this.isTween = true;
            egret.Tween.get(this.iconsCon, {
                onChange: function () {
                    _this.updateScale();
                }
            })
                .to({ x: this.iconsCon.x + index * (this.space) }, time).call(function () {
                _this.isTween = false;
                _this.checkSelect();
                if (_this.loop) {
                    _this.checkLoop(index);
                }
            });
        };
        IconSelect.prototype.updateScale = function () {
            var i = this.iconsCon.numChildren;
            while (i--) {
                var icon = this.iconsCon.getChildAt(i);
                var pt = icon.localToGlobal();
                pt = this.globalToLocal(pt.x, pt.y);
                var scale = (1 - Math.abs(pt.x) / (this.space)) * (IconSelect.scale - 1) + 1.0;
                if (scale < 1.0) {
                    scale = 1.0;
                }
                icon.scaleX = icon.scaleY = scale;
            }
        };
        //选中的icon的放大比例
        IconSelect.scale = 1.2;
        //当缓动结束，选择某一个icon
        IconSelect.SELECT_ONE = 'select_one_icon';
        //当点击某一个icon
        IconSelect.CLICK_ONE = 'click_one_icon';
        //icon开始移动
        IconSelect.MOVE_START = 'icon_move_start';
        return IconSelect;
    }(egret.DisplayObjectContainer));
    ys.IconSelect = IconSelect;
    __reflect(IconSelect.prototype, "ys.IconSelect");
    var Icon = (function (_super) {
        __extends(Icon, _super);
        function Icon(res) {
            var _this = _super.call(this) || this;
            var bm = new egret.Bitmap(RES.getRes(res));
            bm.anchorOffsetX = bm.width * 0.5;
            bm.anchorOffsetY = bm.height * 0.5;
            _this.addChild(bm);
            _this.width = bm.width;
            _this.height = bm.height;
            return _this;
        }
        return Icon;
    }(egret.DisplayObjectContainer));
    __reflect(Icon.prototype, "Icon");
})(ys || (ys = {}));
//# sourceMappingURL=IconSelect.js.map