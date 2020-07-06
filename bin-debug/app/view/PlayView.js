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
//界面布局和样式
var app;
(function (app) {
    //自动生成$PlayView，会被覆盖。2020-5-28 21:45:6
    var $PlayView = (function (_super) {
        __extends($PlayView, _super);
        function $PlayView(className) {
            return _super.call(this, className) || this;
        }
        $PlayView.prototype.uiCreate = function () {
            this.con_game = GG.newContainer();
            this.addChild(this.con_game);
            this.con_ui = GG.newContainer();
            this.addChild(this.con_ui);
            this.cha = GG.newBitmap('cha_png');
            this.addChild(this.cha);
        };
        $PlayView.prototype.uiLayout = function () {
            var cha = this.cha;
            GG.layoutMiddleX(cha);
            GG.layoutMiddleY(cha);
        };
        return $PlayView;
    }(ys.View));
    __reflect($PlayView.prototype, "$PlayView");
    //以下内容不会被覆盖
    var PlayView = (function (_super) {
        __extends(PlayView, _super);
        function PlayView() {
            var _this = _super.call(this, app.PlayViewMediator) || this;
            _this.name = 'PlayView';
            console.log('创建页面', _this.name);
            return _this;
        }
        PlayView.prototype.uiCreate = function () {
            _super.prototype.uiCreate.call(this);
        };
        PlayView.prototype.uiLayout = function () {
            _super.prototype.uiLayout.call(this);
        };
        return PlayView;
    }($PlayView));
    app.PlayView = PlayView;
    __reflect(PlayView.prototype, "app.PlayView");
})(app || (app = {}));
//# sourceMappingURL=PlayView.js.map