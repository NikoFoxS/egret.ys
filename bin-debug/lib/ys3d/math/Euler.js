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
    var tempMat4 = ys3d.Matrix4.create();
    var Euler = (function (_super) {
        __extends(Euler, _super);
        function Euler() {
            var _this = _super.call(this) || this;
            _this.onChange = function () { };
            Object["setPrototypeOf"](_this, Euler.prototype);
            _this[0] = 0;
            _this[1] = 0;
            _this[2] = 0;
            return _this;
        }
        Object.defineProperty(Euler.prototype, "x", {
            get: function () {
                return this[0];
            },
            set: function (v) {
                this[0] = v;
                this.onChange();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Euler.prototype, "y", {
            get: function () {
                return this[1];
            },
            set: function (v) {
                this[1] = v;
                this.onChange();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Euler.prototype, "z", {
            get: function () {
                return this[2];
            },
            set: function (v) {
                this[2] = v;
                this.onChange();
            },
            enumerable: true,
            configurable: true
        });
        Euler.prototype.set = function (x, y, z) {
            this[0] = x;
            this[1] = x;
            this[2] = x;
            this.onChange();
        };
        Euler.prototype.fromQuaternion = function (q) {
            ys3d.Matrix4.fromQuaternion(tempMat4, q);
            Euler.fromRotationMatrix(this, tempMat4);
            this.onChange();
        };
        Euler.create = function () {
            var e = new Euler();
            return e;
        };
        /**旋转矩阵提取欧拉角 */
        Euler.fromRotationMatrix = function (out, m, order) {
            if (order === void 0) { order = 'YXZ'; }
            if (order === 'XYZ') {
                out[1] = Math.asin(Math.min(Math.max(m[8], -1), 1));
                if (Math.abs(m[8]) < 0.99999) {
                    out[0] = Math.atan2(-m[9], m[10]);
                    out[2] = Math.atan2(-m[4], m[0]);
                }
                else {
                    out[0] = Math.atan2(m[6], m[5]);
                    out[2] = 0;
                }
            }
            else if (order === 'YXZ') {
                out[0] = Math.asin(-Math.min(Math.max(m[9], -1), 1));
                if (Math.abs(m[9]) < 0.99999) {
                    out[1] = Math.atan2(m[8], m[10]);
                    out[2] = Math.atan2(m[1], m[5]);
                }
                else {
                    out[1] = Math.atan2(-m[2], m[0]);
                    out[2] = 0;
                }
            }
            else if (order === 'ZXY') {
                out[0] = Math.asin(Math.min(Math.max(m[6], -1), 1));
                if (Math.abs(m[6]) < 0.99999) {
                    out[1] = Math.atan2(-m[2], m[10]);
                    out[2] = Math.atan2(-m[4], m[5]);
                }
                else {
                    out[1] = 0;
                    out[2] = Math.atan2(m[1], m[0]);
                }
            }
            else if (order === 'ZYX') {
                out[1] = Math.asin(-Math.min(Math.max(m[2], -1), 1));
                if (Math.abs(m[2]) < 0.99999) {
                    out[0] = Math.atan2(m[6], m[10]);
                    out[2] = Math.atan2(m[1], m[0]);
                }
                else {
                    out[0] = 0;
                    out[2] = Math.atan2(-m[4], m[5]);
                }
            }
            else if (order === 'YZX') {
                out[2] = Math.asin(Math.min(Math.max(m[1], -1), 1));
                if (Math.abs(m[1]) < 0.99999) {
                    out[0] = Math.atan2(-m[9], m[5]);
                    out[1] = Math.atan2(-m[2], m[0]);
                }
                else {
                    out[0] = 0;
                    out[1] = Math.atan2(m[8], m[10]);
                }
            }
            else if (order === 'XZY') {
                out[2] = Math.asin(-Math.min(Math.max(m[4], -1), 1));
                if (Math.abs(m[4]) < 0.99999) {
                    out[0] = Math.atan2(m[6], m[5]);
                    out[1] = Math.atan2(m[8], m[0]);
                }
                else {
                    out[0] = Math.atan2(-m[9], m[10]);
                    out[1] = 0;
                }
            }
            return out;
        };
        return Euler;
    }(Array));
    ys3d.Euler = Euler;
    __reflect(Euler.prototype, "ys3d.Euler");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=Euler.js.map