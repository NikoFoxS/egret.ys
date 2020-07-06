var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 负责界面元素的管理
 */
var ys;
(function (ys) {
    var Mediator = (function () {
        function Mediator(view) {
            this.name = 'Mediator';
            this._view = view;
            ys.MVC.GET.evt.addEventListener(ys.MVC.MVC_NOTICE, this._onNotice, this);
        }
        Mediator.prototype.getView = function () {
            return this._view;
        };
        Mediator.prototype._onNotice = function (e) {
            var name = e.data.name;
            if (name) {
                if (name == 'resize') {
                    var v = this.getView();
                    v.resize();
                    return;
                }
                var list = this.listenNotice();
                if (list.indexOf(name) != -1) {
                    var data = e.data.data;
                    var no = new ys.Notice();
                    no.name = name;
                    no.data = data;
                    console.log('[' + this.name + ']:处理通知->', name, data);
                    this.onNotice(no);
                }
            }
        };
        Mediator.prototype.sendNotice = function (name, data) {
            console.log('[' + this.name + ']:发送通知->', name, data);
            ys.MVC.GET.sendNotice(name, data);
        };
        Mediator.prototype.getProxy = function (ProxyClass) {
            return ys.MVC.GET.getProxy(ProxyClass);
        };
        Mediator.prototype.registerProxy = function (ProxyClass) {
            ys.MVC.GET.registerProxy(ProxyClass);
        };
        Mediator.prototype.registerCommand = function (commandClass) {
            ys.MVC.GET.registerCommand(commandClass);
        };
        Mediator.prototype.$addLogic = function () {
            this.addLogic();
        };
        /**当ui创建完毕，会触发该方法 */
        Mediator.prototype.addLogic = function () {
            //添加界面逻辑
            //通过sendNotice发送通知
            //通过getProxy获取数据
            //通过listenNotice侦听感兴趣的通知
            //通过onNotice处理感兴趣的通知
        };
        Mediator.prototype.listenNotice = function () {
            return [];
        };
        Mediator.prototype.onNotice = function (no) {
        };
        return Mediator;
    }());
    ys.Mediator = Mediator;
    __reflect(Mediator.prototype, "ys.Mediator");
})(ys || (ys = {}));
//# sourceMappingURL=Mediator.js.map