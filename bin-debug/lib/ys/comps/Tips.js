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
    var Tips = (function () {
        function Tips() {
        }
        /**弱提示 */
        Tips.showToast = function (msg, x, y, icon, duration) {
            if (icon === void 0) { icon = ''; }
            if (duration === void 0) { duration = 1500; }
            msg = msg.trim().replace(/\n/ig, '');
            if (msg == '')
                return;
            var toast = new Toast({ msg: msg, icon: icon });
            toast.x = x;
            toast.y = y;
            toast.show(duration);
            return toast;
        };
        /**模态对话框 */
        Tips.showModal = function (msg, confirmTxt, cancelTxt, size) {
            if (confirmTxt === void 0) { confirmTxt = '确定'; }
            if (cancelTxt === void 0) { cancelTxt = '取消'; }
            if (size === void 0) { size = 40; }
            var m = new ys.Modal({ msg: msg, confirm: confirmTxt, cancel: cancelTxt, fontSize: size });
            return m;
        };
        Tips.showLoading = function (txt, step) {
            if (txt === void 0) { txt = '加载中'; }
            if (step === void 0) { step = true; }
            if (!Tips.loading) {
                Tips.loading = new Loading();
            }
            var loading = Tips.loading;
            loading.show(txt, step);
            stage.addChild(loading);
            return loading;
        };
        /**删除加载提示 */
        Tips.hideLoading = function () {
            if (Tips.loading) {
                Tips.loading.hide();
            }
        };
        return Tips;
    }());
    ys.Tips = Tips;
    __reflect(Tips.prototype, "ys.Tips");
    var Loading = (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            var _this = _super.call(this) || this;
            var block = GG.newRectBlock(0x000000, _this);
            block.alpha = 0.5;
            block.cacheAsBitmap = true;
            _this.block = block;
            var ctn = GG.newContainer();
            _this.addChild(ctn);
            var width = 200;
            var height = 200;
            var bg = GG.newRectRound(width, height, 0x000000, 40, ctn);
            bg.alpha = 0.7;
            var s = GG.newShape();
            s.graphics.clear();
            ctn.addChild(s);
            var i = 10;
            var r = 22;
            var R = 35;
            var x, y, ang;
            while (i--) {
                ang = i * Math.PI * 2 / 10 + Math.PI;
                s.graphics.lineStyle(7, 0xffffff, 0.1 + (10 - i) / 10);
                x = Math.sin(ang) * r;
                y = Math.cos(ang) * r;
                s.graphics.moveTo(x, y);
                x = Math.sin(ang) * R;
                y = Math.cos(ang) * R;
                s.graphics.lineTo(x, y);
            }
            s.x = width * 0.5;
            s.y = height * 0.5 - 20;
            s.cacheAsBitmap = true;
            _this.flower = s;
            var la = GG.newLabel(0xffffff, 25, ctn);
            la.width = width;
            la.textAlign = 'center';
            la.y = height - 55;
            _this.label = la;
            _this.ctn = ctn;
            _this.show('加载中');
            return _this;
        }
        Loading.prototype.show = function (txt, step) {
            if (step === void 0) { step = true; }
            var ctn = this.ctn;
            GG.layoutCenter(ctn);
            var block = this.block;
            block.alpha = 0.5;
            this.resize();
            this.label.text = txt;
            var flower = this.flower;
            flower.rotation = 0;
            flower['r'] = 0;
            var time = 1000;
            if (!step) {
                time = 2000;
            }
            egret.Tween.removeTweens(flower);
            egret.Tween.get(flower, {
                loop: true, onChange: function () {
                    var r = flower['r'];
                    if (step) {
                        flower.rotation = 36 * Math.floor(r / 36);
                    }
                    else {
                        flower.rotation = r;
                    }
                }
            }).to({ r: 360 }, time);
            stage.addEventListener(egret.Event.RESIZE, this.resize, this);
        };
        Loading.prototype.resize = function () {
            var block = this.block;
            block.scaleX = stageW / block.width;
            block.scaleY = stageH / block.height;
        };
        Loading.prototype.hide = function () {
            stage.removeEventListener(egret.Event.RESIZE, this.resize, this);
            egret.Tween.removeTweens(this.flower);
            GG.removeDisplayObject(this);
        };
        return Loading;
    }(egret.DisplayObjectContainer));
    ys.Loading = Loading;
    __reflect(Loading.prototype, "ys.Loading");
    var Modal = (function (_super) {
        __extends(Modal, _super);
        function Modal(_a) {
            var msg = _a.msg, _b = _a.confirm, confirm = _b === void 0 ? '' : _b, _c = _a.cancel, cancel = _c === void 0 ? '' : _c, _d = _a.fontSize, fontSize = _d === void 0 ? 50 : _d, _e = _a.txtWidth, txtWidth = _e === void 0 ? 500 : _e;
            var _this = _super.call(this) || this;
            var ctn = _this; // ys.View.newContainer();
            // this.addChild(ctn);
            var label = ys.View.newLabel();
            label.size = fontSize;
            label.text = msg;
            label.lineSpacing = fontSize * 0.5;
            label.textColor = 0x000000;
            label.width = txtWidth;
            var padding = 66;
            var bgw = padding * 2 + txtWidth;
            var btnH = 120;
            var bgh = label.textHeight + padding * 2 + btnH;
            label.x = label.y = padding;
            _this.content = label;
            var bg = ys.View.newRectRound(bgw, bgh, 0xffffff, 40, 40);
            ctn.addChild(bg);
            bg.graphics.lineStyle(1, 0x000000, 0.6);
            bg.graphics.moveTo(0, bgh - btnH);
            bg.graphics.lineTo(bgw, bgh - btnH);
            if (confirm != '' && cancel != '') {
                bg.graphics.moveTo(bgw * 0.5, bgh - btnH);
                bg.graphics.lineTo(bgw * 0.5, bgh);
            }
            bg.cacheAsBitmap = true;
            if (cancel != '') {
                var can = _this.newBtnLabel(cancel, bgw * 0.5, btnH, fontSize);
                can.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
                can.y = bgh - btnH;
                ctn.addChild(can);
                _this.cancel = can;
                if (confirm == '') {
                    can.width = bgw;
                }
            }
            if (confirm != '') {
                var cfm = _this.newBtnLabel(confirm, bgw * 0.5, btnH, fontSize);
                cfm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
                cfm.y = bgh - btnH;
                cfm.x = bgw * 0.5;
                ctn.addChild(cfm);
                _this.confirm = cfm;
                if (cancel == '') {
                    cfm.x = 0;
                    cfm.width = bgw;
                }
            }
            ctn.addChild(label);
            return _this;
            // GG.layoutXcenter(ctn);
            // GG.layoutYcenter(ctn);
        }
        Object.defineProperty(Modal.prototype, "selectLabel", {
            get: function () {
                return this._select;
            },
            enumerable: true,
            configurable: true
        });
        Modal.prototype.onClick = function (e) {
            this._select = e.target.text;
            console.log(this._select);
            this.dispatchEventWith('select', false);
            GG.removeDisplayObject(this);
        };
        Modal.prototype.newBtnLabel = function (txt, w, h, size) {
            var btn = ys.View.newLabel();
            btn.text = txt;
            btn.width = w;
            btn.height = h;
            btn.size = size;
            btn.textAlign = 'center';
            btn.textColor = 0x000000;
            btn.verticalAlign = "middle";
            btn.touchEnabled = true;
            btn.cacheAsBitmap = true;
            return btn;
        };
        return Modal;
    }(egret.DisplayObjectContainer));
    ys.Modal = Modal;
    __reflect(Modal.prototype, "ys.Modal");
    var Toast = (function (_super) {
        __extends(Toast, _super);
        function Toast(_a) {
            var msg = _a.msg, _b = _a.color, color = _b === void 0 ? 0xffffff : _b, _c = _a.bgColor, bgColor = _c === void 0 ? 0x000000 : _c, _d = _a.icon, icon = _d === void 0 ? '' : _d, _e = _a.bgAlpha, bgAlpha = _e === void 0 ? 0.8 : _e, _f = _a.padding, padding = _f === void 0 ? 30 : _f;
            var _this = _super.call(this) || this;
            var padding2 = padding * 2;
            var t = new egret.TextField();
            _this.addChild(t);
            t.text = msg;
            t.size = 35;
            t.textColor = color;
            if (t.textWidth > stageW - padding) {
                t.width = stageW - padding;
            }
            else {
                t.width = t.textWidth;
            }
            if (t.width < 1) {
                t.width = padding2;
            }
            t.height = t.textHeight;
            t.textAlign = 'center';
            t.verticalAlign = egret.VerticalAlign.MIDDLE;
            var icoH = 0;
            if (icon != '') {
                var ico = GG.newBitmap(icon, _this);
                GG.setAnchor(ico, 0.5, 0);
                if (ico.width > t.width) {
                    t.width = ico.width;
                }
                ico.x = t.width * 0.5 + padding;
                ico.y = padding;
                icoH = ico.height + padding;
            }
            //圆角矩形
            var bg = GG.newRectRound(t.width + padding2, t.height + padding2 + icoH, bgColor, padding); // new egret.Shape();
            bg.alpha = bgAlpha;
            _this.addChildAt(bg, 0);
            _this.anchorOffsetX = _this.width * 0.5;
            t.x = padding;
            t.y = padding + icoH;
            _this.cacheAsBitmap = true;
            return _this;
        }
        Toast.prototype.show = function (duration) {
            var _this = this;
            if (duration === void 0) { duration = 1500; }
            this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1 }, 300).wait(duration).to({ alpha: 0 }, 300).call(function () {
                GG.removeDisplayObject(_this);
            });
        };
        return Toast;
    }(egret.DisplayObjectContainer));
    ys.Toast = Toast;
    __reflect(Toast.prototype, "ys.Toast");
})(ys || (ys = {}));
//# sourceMappingURL=Tips.js.map