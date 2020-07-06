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
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        function TextInput(w, h, size) {
            if (size === void 0) { size = 0; }
            var _this = _super.call(this) || this;
            _this.holder = '';
            _this.type = egret.TextFieldType.INPUT;
            _this.verticalAlign = egret.VerticalAlign.MIDDLE;
            _this.width = w;
            _this.height = h;
            if (size) {
                _this.size = size;
            }
            else {
                _this.size = Math.floor(h * 0.6);
            }
            _this.background = true;
            _this.textColor = 0x000000;
            return _this;
        }
        Object.defineProperty(TextInput.prototype, "placeholder", {
            /**输入提示 */
            set: function (s) {
                this.holder = s;
                this.onFocusOut();
                this.addEventListener(egret.Event.FOCUS_IN, this.onFocus, this);
                this.addEventListener(egret.Event.FOCUS_OUT, this.onFocusOut, this);
            },
            enumerable: true,
            configurable: true
        });
        TextInput.prototype.onFocusOut = function () {
            if (this.text == '') {
                this.text = this.holder;
                this.textColor = 0xcccccc;
            }
        };
        TextInput.prototype.onFocus = function () {
            this.textColor = 0x000000;
            if (this.text == this.holder) {
                this.text = '';
            }
        };
        return TextInput;
    }(egret.TextField));
    ys.TextInput = TextInput;
    __reflect(TextInput.prototype, "ys.TextInput");
})(ys || (ys = {}));
//# sourceMappingURL=TextInput.js.map