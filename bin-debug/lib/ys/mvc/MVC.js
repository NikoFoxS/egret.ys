var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 参照pureMVC编写的简易mvc框架
 * 实战目录：
 * -cotroller
 * |-CMD 储存命令的名字
 * |-CommandDoSomething 对应的具体命令
 * -model
 * |-someVO 数据
 * |-someProxy 数据代理
 * -view
 * |-SomeView 界面
 * |-SomeViewMediator 界面中间人
 */
var ys;
(function (ys) {
    var MVC = (function () {
        function MVC() {
            var _this = this;
            this.evt = new egret.EventDispatcher();
            this.proxy = {};
            this.commands = {};
            //处理命令
            this.evt.addEventListener(MVC.MVC_NOTICE, function (e) {
                var name = e.data.name;
                var data = e.data.data;
                var cmdclass = _this.commands[name];
                if (cmdclass) {
                    console.log('[MVC]:执行通知指令->', name);
                    var cmd = new cmdclass();
                    var no = new ys.Notice();
                    no.name = name;
                    no.data = data;
                    cmd.execute(no);
                }
            }, this);
        }
        Object.defineProperty(MVC, "GET", {
            get: function () {
                if (!MVC.instance) {
                    MVC.instance = new MVC();
                }
                return MVC.instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 发送通知
         */
        MVC.prototype.sendNotice = function (name, data) {
            this.evt.dispatchEventWith(MVC.MVC_NOTICE, false, { name: name, data: data });
        };
        /**
         * 注册代理。注册即实例化
         */
        MVC.prototype.registerProxy = function (ProxyClass) {
            var name = egret.getQualifiedClassName(ProxyClass);
            if (!this.proxy[name]) {
                this.proxy[name] = new ProxyClass();
            }
        };
        /**
         * 移除代理
         */
        MVC.prototype.removeProxy = function (ProxyClass) {
            var name = egret.getQualifiedClassName(ProxyClass);
            this.proxy[name] = null;
            delete this.proxy[name];
        };
        /**
         * 获取代理
         */
        MVC.prototype.getProxy = function (ProxyClass) {
            var name = egret.getQualifiedClassName(ProxyClass);
            return this.proxy[name];
        };
        /**
         * 注册命令,只保存commandClass，执行命令的时候，才动态实例化。
         */
        MVC.prototype.registerCommand = function (commandClass) {
            var name = egret.getQualifiedClassName(commandClass);
            if (!this.commands[name]) {
                this.commands[name] = commandClass;
            }
        };
        /**
         * 移除命令
         */
        MVC.prototype.removeCommand = function (name) {
            this.commands[name] = null;
            delete this.commands[name];
        };
        MVC.MVC_NOTICE = 'on_mvc_notice';
        return MVC;
    }());
    ys.MVC = MVC;
    __reflect(MVC.prototype, "ys.MVC");
})(ys || (ys = {}));
//# sourceMappingURL=MVC.js.map