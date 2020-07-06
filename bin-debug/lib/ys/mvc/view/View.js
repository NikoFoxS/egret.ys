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
/**
 * 只负责界面元素的布局和样式。界面逻辑交给绑定的Mediator使用
 */
var ys;
(function (ys) {
    var View = (function (_super) {
        __extends(View, _super);
        /**
         * @param mediatorClass
         * @param resGroup 资源组
         * @param reporter 报告加载进度
         */
        function View(mediatorClass, resGroup, reporter) {
            if (resGroup === void 0) { resGroup = ''; }
            var _this = _super.call(this) || this;
            if (resGroup != '') {
                if (RES.isGroupLoaded(resGroup)) {
                    _this.resReady(mediatorClass);
                }
                else {
                    (function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, RES.loadGroup(resGroup, 1, reporter)];
                                case 1:
                                    _a.sent();
                                    this.resReady(mediatorClass);
                                    return [2 /*return*/];
                            }
                        });
                    }); })();
                }
            }
            else {
                _this.resReady(mediatorClass);
            }
            return _this;
        }
        View.newBitmap = function (res) {
            var bm = new egret.Bitmap();
            bm.texture = RES.getRes(res);
            return bm;
        };
        View.newContainer = function () {
            var con = new egret.DisplayObjectContainer();
            return con;
        };
        View.newShape = function () {
            var s = new egret.Shape();
            return s;
        };
        View.newTextInput = function (w, h) {
            var input = new ys.TextInput(w, h);
            return input;
        };
        View.newLabel = function () {
            var label = new ys.Label();
            return label;
        };
        View.newImage = function () {
            var img = new ys.Image();
            return img;
        };
        View.newButton = function (res) {
            var btn = new ys.Button(res);
            return btn;
        };
        View.newButtonMusic = function (res1, res2) {
            var music = new ys.ButtonMusic(res1, res2);
            return music;
        };
        View.newRect = function (w, h, color) {
            var rec = new egret.Shape();
            var g = rec.graphics;
            g.beginFill(color);
            g.drawRect(0, 0, w, h);
            g.endFill();
            return rec;
        };
        View.newCircle = function (r, color) {
            var s = new egret.Shape();
            s.graphics.beginFill(color);
            s.graphics.drawCircle(0, 0, r);
            s.graphics.endFill();
            return s;
        };
        View.newRectRound = function (w, h, color, cornerW, cornerH) {
            var rec = new egret.Shape();
            var g = rec.graphics;
            g.beginFill(color);
            g.drawRoundRect(0, 0, w, h, cornerW, cornerH);
            g.endFill();
            return rec;
        };
        View.prototype.resReady = function (mediatorClass) {
            this.uiCreate();
            if (mediatorClass) {
                var m = new mediatorClass(this);
                m.$addLogic();
            }
            this.once(egret.Event.ADDED_TO_STAGE, this.resize, this);
        };
        View.prototype.resize = function () {
            stageW = stage.stageWidth;
            stageH = stage.stageHeight;
            stageHalfW = stageW >> 1;
            stageHalfH = stageH >> 1;
            this.uiLayout();
        };
        /**创建ui */
        View.prototype.uiCreate = function () {
        };
        /**布局ui */
        View.prototype.uiLayout = function () {
        };
        return View;
    }(egret.DisplayObjectContainer));
    ys.View = View;
    __reflect(View.prototype, "ys.View");
})(ys || (ys = {}));
//# sourceMappingURL=View.js.map