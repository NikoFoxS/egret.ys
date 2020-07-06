var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 负责数据的获取，及整理封装。只处理一个VO,VO只能get不能set
 */
var ys;
(function (ys) {
    var Proxy = (function () {
        function Proxy() {
            this.onCreate();
        }
        Object.defineProperty(Proxy.prototype, "data", {
            /**
             * data的数据类型，自行转换
             */
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Proxy.prototype.onCreate = function () {
        };
        Proxy.prototype.sendNotice = function (name, data) {
            ys.MVC.GET.sendNotice(name, data);
        };
        return Proxy;
    }());
    ys.Proxy = Proxy;
    __reflect(Proxy.prototype, "ys.Proxy");
})(ys || (ys = {}));
//# sourceMappingURL=Proxy.js.map