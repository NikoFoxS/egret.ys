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
//界面逻辑.
var app;
(function (app) {
    var PlayViewMediator = (function (_super) {
        __extends(PlayViewMediator, _super);
        function PlayViewMediator(view) {
            var _this = _super.call(this, view) || this;
            _this.name = 'PlayViewMediator';
            return _this;
        }
        //ui创建完就执行，在添加舞台上之前
        PlayViewMediator.prototype.addLogic = function () {
            var v = this.getView();
            v.cha.touchEnabled = true;
            v.cha.once(egret.TouchEvent.TOUCH_TAP, function () {
                GG.showPage(app.TestView);
            }, this);
        };
        PlayViewMediator.prototype.listenNotice = function () {
            return [];
        };
        PlayViewMediator.prototype.onNotice = function (no) {
            var v = this.getView();
        };
        return PlayViewMediator;
    }(ys.Mediator));
    app.PlayViewMediator = PlayViewMediator;
    __reflect(PlayViewMediator.prototype, "app.PlayViewMediator");
})(app || (app = {}));
//# sourceMappingURL=PlayViewMediator.js.map