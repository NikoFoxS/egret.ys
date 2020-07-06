var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ys;
(function (ys) {
    var ViewChangeHandler = (function () {
        function ViewChangeHandler() {
        }
        ViewChangeHandler.prototype.onChange = function (newView, oldView, next) {
            //1 页面切换逻辑
            //2 调用next();结束切换
        };
        return ViewChangeHandler;
    }());
    ys.ViewChangeHandler = ViewChangeHandler;
    __reflect(ViewChangeHandler.prototype, "ys.ViewChangeHandler");
})(ys || (ys = {}));
//# sourceMappingURL=ViewChangeHandler.js.map