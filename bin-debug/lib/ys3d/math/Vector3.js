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
    var Vector3 = (function (_super) {
        __extends(Vector3, _super);
        function Vector3() {
            var _this = _super.call(this) || this;
            Object["setPrototypeOf"](_this, Vector3.prototype);
            _this[0] = 0;
            _this[1] = 0;
            _this[2] = 0;
            return _this;
        }
        Vector3.prototype.set = function (x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this[0] = x;
            this[1] = y;
            this[2] = z;
        };
        Object.defineProperty(Vector3.prototype, "x", {
            get: function () {
                return this[0];
            },
            set: function (v) {
                this[0] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "y", {
            get: function () {
                return this[1];
            },
            set: function (v) {
                this[1] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "z", {
            get: function () {
                return this[2];
            },
            set: function (v) {
                this[2] = v;
            },
            enumerable: true,
            configurable: true
        });
        Vector3.prototype.add = function (b) {
            Vector3.add(this, this, b);
        };
        Vector3.prototype.subtract = function (b) {
            Vector3.subtract(this, this, b);
        };
        Vector3.prototype.scale = function (v) {
            Vector3.scale(this, this, v);
        };
        Vector3.prototype.getLength = function () {
            return Vector3.getLength(this);
        };
        Vector3.prototype.dot = function (b) {
            return Vector3.dot(this, b);
        };
        Vector3.prototype.cross = function (b) {
            Vector3.cross(this, this, b);
        };
        Vector3.create = function (x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            var v = new Vector3();
            v[0] = x;
            v[1] = y;
            v[2] = z;
            return v;
        };
        /**向量相加 */
        Vector3.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
        };
        /**向量相减 */
        Vector3.subtract = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
        };
        /**缩放向量 */
        Vector3.scale = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
        };
        /**两个向量的距离 */
        Vector3.distance = function (a, b) {
            var x = b[0] - a[0];
            var y = b[1] - a[1];
            var z = b[2] - a[2];
            return Math.sqrt(x * x + y * y + z * z);
        };
        /**向量的长度 */
        Vector3.getLength = function (a) {
            var x = a[0];
            var y = a[1];
            var z = a[2];
            return Math.sqrt(x * x + y * y + z * z);
        };
        /**向量反向 */
        Vector3.negate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            return out;
        };
        /**归一化,标准化。将向量的长度变成1 */
        Vector3.normalize = function (out, a) {
            var x = a[0];
            var y = a[1];
            var z = a[2];
            var len = x * x + y * y + z * z;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
            }
            out[0] = a[0] * len;
            out[1] = a[1] * len;
            out[2] = a[2] * len;
            return out;
        };
        /**向量点乘.可以用来求两个向量的夹角
         * a·b>0    方向基本相同，夹角在0°到90°之间
         * a·b=0    正交，相互垂直
         * a·b<0    方向基本相反，夹角在90°到180°之间
        */
        Vector3.dot = function (a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        };
        /**向量叉乘。可以用来求a,b向量构成的面的法线 */
        Vector3.cross = function (out, a, b) {
            var ax = a[0], ay = a[1], az = a[2];
            var bx = b[0], by = b[1], bz = b[2];
            out[0] = ay * bz - az * by;
            out[1] = az * bx - ax * bz;
            out[2] = ax * by - ay * bx;
        };
        /**对向量进行线性插值 */
        Vector3.lerp = function (out, a, b, t) {
            var ax = a[0];
            var ay = a[1];
            var az = a[2];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
        };
        return Vector3;
    }(Array));
    ys3d.Vector3 = Vector3;
    __reflect(Vector3.prototype, "ys3d.Vector3");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=Vector3.js.map