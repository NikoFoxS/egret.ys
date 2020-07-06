var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ys;
(function (ys) {
    var VersionController = (function () {
        function VersionController(fun) {
            this.fun = fun;
        }
        // 在游戏开始加载资源的时候就会调用这个函数
        VersionController.prototype.init = function () {
            return Promise.resolve();
        };
        //在游戏运行时，每个资源加载url都要经过这个函数
        VersionController.prototype.getVirtualUrl = function (url) {
            var u = url + "";
            if (this.fun) {
                u = this.fun(u);
            }
            return u;
        };
        return VersionController;
    }());
    ys.VersionController = VersionController;
    __reflect(VersionController.prototype, "ys.VersionController", ["RES.IVersionController"]);
})(ys || (ys = {}));
//# sourceMappingURL=VersionController.js.map