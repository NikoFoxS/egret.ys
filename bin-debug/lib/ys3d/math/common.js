var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ys3d;
(function (ys3d) {
    ys3d.EPSILON = 0.000001;
    var math = (function () {
        function math() {
        }
        math.hypot = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            var y = 0, i = arguments.length;
            while (i--)
                y += arguments[i] * arguments[i];
            return Math.sqrt(y);
        };
        return math;
    }());
    ys3d.math = math;
    __reflect(math.prototype, "ys3d.math");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=common.js.map