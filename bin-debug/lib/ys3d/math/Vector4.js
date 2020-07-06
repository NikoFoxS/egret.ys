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
    var Vector4 = (function (_super) {
        __extends(Vector4, _super);
        function Vector4() {
            var _this = _super.call(this) || this;
            Object["setPrototypeOf"](_this, Vector4.prototype);
            _this.set(0, 0, 0, 1);
            return _this;
        }
        Object.defineProperty(Vector4.prototype, "x", {
            get: function () {
                return this[0];
            },
            set: function (v) {
                this[0] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector4.prototype, "y", {
            get: function () {
                return this[1];
            },
            set: function (v) {
                this[1] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector4.prototype, "z", {
            get: function () {
                return this[2];
            },
            set: function (v) {
                this[2] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector4.prototype, "w", {
            get: function () {
                return this[3];
            },
            set: function (v) {
                this[3] = v;
            },
            enumerable: true,
            configurable: true
        });
        Vector4.prototype.getLength = function () {
            var v = this;
            var x = v[0], y = v[1], z = v[2], w = v[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        };
        /**拷贝 */
        Vector4.prototype.copy = function (a) {
            this[0] = a[0];
            this[1] = a[1];
            this[2] = a[2];
            this[3] = a[3];
        };
        /** */
        Vector4.prototype.set = function (x, y, z, w) {
            this[0] = x;
            this[1] = y;
            this[2] = z;
            this[3] = w;
        };
        Vector4.create = function (x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 1; }
            var v = new Vector4();
            v[0] = x;
            v[1] = y;
            v[2] = z;
            v[3] = w;
            return v;
        };
        return Vector4;
    }(Array));
    ys3d.Vector4 = Vector4;
    __reflect(Vector4.prototype, "ys3d.Vector4");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=Vector4.js.map