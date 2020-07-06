var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ys;
(function (ys) {
    var NoticeCMD = (function () {
        function NoticeCMD() {
        }
        NoticeCMD.prototype.getProxy = function (ProxyClass) {
            return ys.MVC.GET.getProxy(ProxyClass);
        };
        NoticeCMD.prototype.sendNotice = function (name, data) {
            ys.MVC.GET.sendNotice(name, data);
        };
        NoticeCMD.prototype.execute = function (no) {
        };
        return NoticeCMD;
    }());
    ys.NoticeCMD = NoticeCMD;
    __reflect(NoticeCMD.prototype, "ys.NoticeCMD");
})(ys || (ys = {}));
//# sourceMappingURL=NoticeCMD.js.map