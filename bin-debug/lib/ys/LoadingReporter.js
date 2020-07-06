var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ys;
(function (ys) {
    var LoadingReporter = (function () {
        function LoadingReporter() {
        }
        LoadingReporter.prototype.onReady = function () {
        };
        LoadingReporter.prototype.onStart = function (groupName) {
        };
        LoadingReporter.prototype.onProgress = function (current, total, resItem) {
        };
        LoadingReporter.prototype.onLoaded = function (groupName) {
        };
        return LoadingReporter;
    }());
    ys.LoadingReporter = LoadingReporter;
    __reflect(LoadingReporter.prototype, "ys.LoadingReporter", ["RES.PromiseTaskReporter"]);
})(ys || (ys = {}));
//# sourceMappingURL=LoadingReporter.js.map