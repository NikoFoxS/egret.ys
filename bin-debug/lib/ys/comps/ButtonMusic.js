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
    var ButtonSwitch = (function (_super) {
        __extends(ButtonSwitch, _super);
        function ButtonSwitch(res1, res2) {
            var _this = _super.call(this) || this;
            _this.res = [res1, res2];
            _this.on = true;
            return _this;
        }
        ButtonSwitch.prototype.enable = function () {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkSwitch, this);
        };
        ButtonSwitch.prototype.disable = function () {
            this.touchEnabled = false;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkSwitch, this);
        };
        ButtonSwitch.prototype.checkSwitch = function () {
            this.on = !this.on;
        };
        Object.defineProperty(ButtonSwitch.prototype, "on", {
            get: function () {
                return this._on;
            },
            set: function (b) {
                this._on = b;
                if (b) {
                    this.texture = RES.getRes(this.res[0]);
                    this.onSwitch(0);
                }
                else {
                    this.texture = RES.getRes(this.res[1]);
                    this.onSwitch(1);
                }
            },
            enumerable: true,
            configurable: true
        });
        ButtonSwitch.prototype.onSwitch = function (frame) {
        };
        return ButtonSwitch;
    }(egret.Bitmap));
    __reflect(ButtonSwitch.prototype, "ButtonSwitch");
    //音乐按钮
    var ButtonMusic = (function (_super) {
        __extends(ButtonMusic, _super);
        function ButtonMusic(res1, res2) {
            var _this = _super.call(this, res1, res2) || this;
            _this.mp3 = '';
            _this.on = false;
            return _this;
        }
        Object.defineProperty(ButtonMusic.prototype, "mute", {
            get: function () {
                return this._mute;
            },
            set: function (v) {
                this._mute = v;
                if (v) {
                    this.stopMusic();
                }
                else {
                    if (this.mp3 != '') {
                        this.playMusic(this.mp3);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        ButtonMusic.prototype.onSwitch = function (frame) {
            this.mute = frame;
        };
        ButtonMusic.prototype.stopMusic = function () {
            if (this.sc) {
                this.sc.stop();
                this.sc = null;
            }
        };
        ButtonMusic.prototype.playMusic = function (mp3) {
            this.stopMusic();
            this.mp3 = mp3;
            if (!this._mute) {
                var sound = RES.getRes(mp3);
                if (sound) {
                    this.sc = sound.play();
                }
            }
        };
        ButtonMusic.prototype.autoPlayMusic = function (mp3) {
            var _this = this;
            if (window["WeixinJSBridge"]) {
                //微信
                window["WeixinJSBridge"].invoke('getNetworkType', {}, function () {
                    _this.playMusic(mp3);
                });
            }
            else if (window["WeiboJSBridge"]) {
                //微博
                window["WeiboJSBridge"].invoke('getNetworkType', {}, function () {
                    _this.playMusic(mp3);
                });
            }
            else if (window["AlipayJSBridge"]) {
                //支付宝
                window["AlipayJSBridge"].call('getNetworkType', function (result) {
                    this.playMusic(mp3);
                });
            }
            else {
                //QQ系
                if (window["mqq"]) {
                    document.addEventListener("DOMContentLoaded", function () {
                        this.playMusic(mp3);
                    }, false);
                }
                else {
                    this.playMusic(mp3);
                }
            }
        };
        ButtonMusic.prototype.playSFX = function (mp3) {
            if (!this._mute) {
                var sound = RES.getRes(mp3);
                sound && sound.play(0, 1);
            }
        };
        return ButtonMusic;
    }(ButtonSwitch));
    ys.ButtonMusic = ButtonMusic;
    __reflect(ButtonMusic.prototype, "ys.ButtonMusic");
})(ys || (ys = {}));
//# sourceMappingURL=ButtonMusic.js.map