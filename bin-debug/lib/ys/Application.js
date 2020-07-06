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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(cfg, loading) {
        var _this = this;
        //使用VConsole
        if (window['VConsole']) {
            new window['VConsole']();
        }
        //版本信息
        console.log('与时互动 ' + Application.VERSION + " by niko@bytesuns.com" + "");
        _this = _super.call(this, ApplicationMediator) || this;
        _this.cfg = cfg;
        _this.loading = loading;
        return _this;
    }
    Application.prototype.uiCreate = function () {
    };
    Application.prototype.uiLayout = function () {
    };
    Application.VERSION = '2020-05-28';
    return Application;
}(ys.View));
__reflect(Application.prototype, "Application");
var ApplicationMediator = (function (_super) {
    __extends(ApplicationMediator, _super);
    function ApplicationMediator(view) {
        return _super.call(this, view) || this;
    }
    ApplicationMediator.prototype.addLogic = function () {
        var _this = this;
        var v = this.getView();
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            // egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            // egret.ticker.resume();
        };
        v.once(egret.Event.ADDED_TO_STAGE, function () {
            var cfg = v.cfg;
            //设置接口为mock数据
            ys.Ajax.mock = cfg.mock;
            //注册数据代理
            cfg.proxy && cfg.proxy.forEach(function (className) {
                _this.registerProxy(className);
            });
            //注册指令
            cfg.command && cfg.command.forEach(function (cmd) {
                _this.registerCommand(cmd);
            });
            if (!GG.setup(v, cfg))
                return;
            RES.registerVersionController(new ys.VersionController(cfg.versionFun));
            var reporter = v.loading;
            reporter.onReady();
            GG.Loader.setRespath(cfg.resourceRoot);
            GG.Loader.setup(function () { return __awaiter(_this, void 0, void 0, function () {
                var i, len;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            len = v.cfg.groups.length;
                            if (!len) return [3 /*break*/, 4];
                            _a.label = 1;
                        case 1:
                            if (!(i < len)) return [3 /*break*/, 3];
                            return [4 /*yield*/, GG.Loader.loadGroup(cfg.groups[i], reporter)];
                        case 2:
                            _a.sent();
                            i++;
                            return [3 /*break*/, 1];
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            reporter.onLoaded('');
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); }, _this, cfg.resourceJSON);
            //内置通知
            stage.addEventListener(egret.Event.RESIZE, function () {
                _this.sendNotice('resize');
            }, _this);
        }, this);
    };
    ApplicationMediator.prototype.listenNotice = function () {
        return [];
    };
    ApplicationMediator.prototype.onNotice = function (no) {
        var name = no.name;
        console.log(name);
        var v = this.getView();
    };
    return ApplicationMediator;
}(ys.Mediator));
__reflect(ApplicationMediator.prototype, "ApplicationMediator");
//# sourceMappingURL=Application.js.map