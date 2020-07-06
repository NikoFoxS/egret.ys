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
    var Quaternion = (function (_super) {
        __extends(Quaternion, _super);
        function Quaternion() {
            var _this = _super.call(this) || this;
            _this.onChange = function () { };
            Object["setPrototypeOf"](_this, Quaternion.prototype);
            _this[0] = 0;
            _this[1] = 0;
            _this[2] = 0;
            _this[3] = 1;
            return _this;
        }
        Object.defineProperty(Quaternion.prototype, "x", {
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
        Object.defineProperty(Quaternion.prototype, "y", {
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
        Object.defineProperty(Quaternion.prototype, "z", {
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
        Object.defineProperty(Quaternion.prototype, "w", {
            get: function () {
                return this[3];
            },
            set: function (v) {
                this[3] = v;
                this.onChange();
            },
            enumerable: true,
            configurable: true
        });
        Quaternion.prototype.fromEuler = function (eu) {
            Quaternion.fromEuler(this, eu);
        };
        Quaternion.create = function () {
            var q = new Quaternion();
            return q;
        };
        Quaternion.identity = function (out) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
        };
        /**根据弧度和旋转轴向，生成四元素 */
        Quaternion.setAxisAngle = function (out, axis, rad) {
            rad = rad * 0.5;
            var s = Math.sin(rad);
            out[0] = s * axis[0];
            out[1] = s * axis[1];
            out[2] = s * axis[2];
            out[3] = Math.cos(rad);
        };
        /**两个四元素的球面查值 */
        Quaternion.slerp = function (out, a, b, t) {
            // benchmarks:
            //    http://jsperf.com/quaternion-slerp-implementations
            var ax = a[0], ay = a[1], az = a[2], aw = a[3];
            var bx = b[0], by = b[1], bz = b[2], bw = b[3];
            var omega, cosom, sinom, scale0, scale1;
            // calc cosine
            cosom = ax * bx + ay * by + az * bz + aw * bw;
            // adjust signs (if necessary)
            if (cosom < 0.0) {
                cosom = -cosom;
                bx = -bx;
                by = -by;
                bz = -bz;
                bw = -bw;
            }
            // calculate coefficients
            if (1.0 - cosom > 0.000001) {
                // standard case (slerp)
                omega = Math.acos(cosom);
                sinom = Math.sin(omega);
                scale0 = Math.sin((1.0 - t) * omega) / sinom;
                scale1 = Math.sin(t * omega) / sinom;
            }
            else {
                // "from" and "to" quaternions are very close
                //  ... so we can do a linear interpolation
                scale0 = 1.0 - t;
                scale1 = t;
            }
            // calculate final values
            out[0] = scale0 * ax + scale1 * bx;
            out[1] = scale0 * ay + scale1 * by;
            out[2] = scale0 * az + scale1 * bz;
            out[3] = scale0 * aw + scale1 * bw;
        };
        /**矩阵中提取四元素 */
        Quaternion.fromMat4 = function (out, m) {
            // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
            // article "Quaternion Calculus and Fast Animation".
            var fTrace = m[0] + m[4] + m[8];
            var fRoot;
            if (fTrace > 0.0) {
                // |w| > 1/2, may as well choose w > 1/2
                fRoot = Math.sqrt(fTrace + 1.0); // 2w
                out[3] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot; // 1/(4w)
                out[0] = (m[5] - m[7]) * fRoot;
                out[1] = (m[6] - m[2]) * fRoot;
                out[2] = (m[1] - m[3]) * fRoot;
            }
            else {
                // |w| <= 1/2
                var i = 0;
                if (m[4] > m[0])
                    i = 1;
                if (m[8] > m[i * 3 + i])
                    i = 2;
                var j = (i + 1) % 3;
                var k = (i + 2) % 3;
                fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
                out[i] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot;
                out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
                out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
                out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
            }
        };
        /**欧拉角提取四元素 */
        Quaternion.fromEuler = function (out, euler, order) {
            if (order === void 0) { order = 'YXZ'; }
            //这里改成弧度
            var rad = Math.PI / 180;
            var sx = Math.sin(euler[0] * rad * 0.5);
            var cx = Math.cos(euler[0] * rad * 0.5);
            var sy = Math.sin(euler[1] * rad * 0.5);
            var cy = Math.cos(euler[1] * rad * 0.5);
            var sz = Math.sin(euler[2] * rad * 0.5);
            var cz = Math.cos(euler[2] * rad * 0.5);
            if (order === 'XYZ') {
                out[0] = sx * cy * cz + cx * sy * sz;
                out[1] = cx * sy * cz - sx * cy * sz;
                out[2] = cx * cy * sz + sx * sy * cz;
                out[3] = cx * cy * cz - sx * sy * sz;
            }
            else if (order === 'YXZ') {
                out[0] = sx * cy * cz + cx * sy * sz;
                out[1] = cx * sy * cz - sx * cy * sz;
                out[2] = cx * cy * sz - sx * sy * cz;
                out[3] = cx * cy * cz + sx * sy * sz;
            }
            else if (order === 'ZXY') {
                out[0] = sx * cy * cz - cx * sy * sz;
                out[1] = cx * sy * cz + sx * cy * sz;
                out[2] = cx * cy * sz + sx * sy * cz;
                out[3] = cx * cy * cz - sx * sy * sz;
            }
            else if (order === 'ZYX') {
                out[0] = sx * cy * cz - cx * sy * sz;
                out[1] = cx * sy * cz + sx * cy * sz;
                out[2] = cx * cy * sz - sx * sy * cz;
                out[3] = cx * cy * cz + sx * sy * sz;
            }
            else if (order === 'YZX') {
                out[0] = sx * cy * cz + cx * sy * sz;
                out[1] = cx * sy * cz + sx * cy * sz;
                out[2] = cx * cy * sz - sx * sy * cz;
                out[3] = cx * cy * cz - sx * sy * sz;
            }
            else if (order === 'XZY') {
                out[0] = sx * cy * cz - cx * sy * sz;
                out[1] = cx * sy * cz - sx * cy * sz;
                out[2] = cx * cy * sz + sx * sy * cz;
                out[3] = cx * cy * cz + sx * sy * sz;
            }
        };
        return Quaternion;
    }(Array));
    ys3d.Quaternion = Quaternion;
    __reflect(Quaternion.prototype, "ys3d.Quaternion");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=Quaternion.js.map