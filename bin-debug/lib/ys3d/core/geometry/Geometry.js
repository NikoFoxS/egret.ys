var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ys3d;
(function (ys3d) {
    var Geometry = (function () {
        function Geometry() {
        }
        Object.defineProperty(Geometry.prototype, "vertices", {
            get: function () {
                return this._vertices.slice();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geometry.prototype, "indices", {
            get: function () {
                return this._indices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geometry.prototype, "uvs", {
            get: function () {
                return this._uvs;
            },
            enumerable: true,
            configurable: true
        });
        return Geometry;
    }());
    ys3d.Geometry = Geometry;
    __reflect(Geometry.prototype, "ys3d.Geometry");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=Geometry.js.map