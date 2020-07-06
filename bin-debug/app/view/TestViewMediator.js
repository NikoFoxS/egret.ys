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
    var TestViewMediator = (function (_super) {
        __extends(TestViewMediator, _super);
        function TestViewMediator(view) {
            var _this = _super.call(this, view) || this;
            _this.name = 'TestViewMediator';
            return _this;
        }
        //ui创建完就执行，在添加舞台上之前
        TestViewMediator.prototype.addLogic = function () {
            var v = this.getView();
        };
        TestViewMediator.prototype.listenNotice = function () {
            return [];
        };
        TestViewMediator.prototype.onNotice = function (no) {
            var v = this.getView();
        };
        return TestViewMediator;
    }(ys.Mediator));
    app.TestViewMediator = TestViewMediator;
    __reflect(TestViewMediator.prototype, "app.TestViewMediator");
})(app || (app = {}));
//# sourceMappingURL=TestViewMediator.js.map