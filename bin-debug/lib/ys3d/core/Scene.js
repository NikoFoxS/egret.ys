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
var ys3d;
(function (ys3d) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(w, h) {
            var _this = _super.call(this) || this;
            _this.type = 'Scene';
            _this.$display = new egret.DisplayObjectContainer();
            var display = _this.$display;
            display.x = w * 0.5;
            display.y = h * 0.5;
            _this.visible = true;
            _this.name = 'scene';
            return _this;
        }
        Object.defineProperty(Scene.prototype, "display", {
            get: function () {
                return this.$display;
            },
            enumerable: true,
            configurable: true
        });
        return Scene;
    }(ys3d.Object3D));
    ys3d.Scene = Scene;
    __reflect(Scene.prototype, "ys3d.Scene");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=Scene.js.map