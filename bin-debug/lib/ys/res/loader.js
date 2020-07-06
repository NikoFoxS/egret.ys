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
var ys;
(function (ys) {
    var Loader = (function (_super) {
        __extends(Loader, _super);
        function Loader() {
            var _this = _super.call(this) || this;
            _this.respath = "";
            return _this;
        }
        Loader.prototype.setRespath = function (path) {
            this.respath = path;
        };
        /**
         * @url default.res.json的路径 每次加载最新的，如果资源有修改，在default.res.json给资源加上版本号即可。
         */
        Loader.prototype.setup = function (callback, ref, url) {
            if (url === void 0) { url = 'default.res.json'; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('loader setup', url);
                            return [4 /*yield*/, RES.loadConfig(url, this.respath)];
                        case 1:
                            _a.sent(); //微信小游戏，不能带随机数。
                            callback.call(ref);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 加载界面
         */
        Loader.prototype.loadGroup = function (name, preporter) {
            return __awaiter(this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            if (!RES.isGroupLoaded(name)) return [3 /*break*/, 1];
                            preporter.onLoaded(name);
                            return [3 /*break*/, 3];
                        case 1:
                            preporter.onStart(name);
                            return [4 /*yield*/, RES.loadGroup(name, 9999, preporter)];
                        case 2:
                            _a.sent();
                            preporter.onLoaded(name);
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            e_1 = _a.sent();
                            console.warn(e_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 分步加载
         */
        Loader.prototype.loadGroupByStep = function (name, onLoaded, ref) {
            return __awaiter(this, void 0, void 0, function () {
                var b, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            b = RES.isGroupLoaded(name);
                            if (!b) return [3 /*break*/, 1];
                            onLoaded.call(ref);
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, RES.loadGroup(name)];
                        case 2:
                            _a.sent();
                            onLoaded.call(ref);
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            e_2 = _a.sent();
                            onLoaded.call(ref);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        return Loader;
    }(egret.EventDispatcher));
    ys.Loader = Loader;
    __reflect(Loader.prototype, "ys.Loader");
})(ys || (ys = {}));
//# sourceMappingURL=loader.js.map