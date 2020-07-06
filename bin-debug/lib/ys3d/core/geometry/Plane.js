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
    var Plane = (function (_super) {
        __extends(Plane, _super);
        function Plane(width, height, widthSegments, heightSegments) {
            if (width === void 0) { width = 100; }
            if (height === void 0) { height = 100; }
            if (widthSegments === void 0) { widthSegments = 1; }
            if (heightSegments === void 0) { heightSegments = 1; }
            var _this = _super.call(this) || this;
            width = width || 1;
            height = height || 1;
            var width_half = width / 2;
            var height_half = height / 2;
            var gridX = Math.floor(widthSegments) || 1;
            var gridY = Math.floor(heightSegments) || 1;
            var gridX1 = gridX + 1;
            var gridY1 = gridY + 1;
            var segment_width = width / gridX;
            var segment_height = height / gridY;
            var ix, iy;
            // buffers
            var indices = [];
            var vertices = [];
            var uvs = [];
            // generate vertices, normals and uvs
            for (iy = 0; iy < gridY1; iy++) {
                var y = iy * segment_height - height_half;
                for (ix = 0; ix < gridX1; ix++) {
                    var x = ix * segment_width - width_half;
                    vertices.push(x, -y, 0);
                    uvs.push(ix / gridX);
                    uvs.push(1 - (iy / gridY));
                }
            }
            // indices
            for (iy = 0; iy < gridY; iy++) {
                for (ix = 0; ix < gridX; ix++) {
                    var a = ix + gridX1 * iy;
                    var b = ix + gridX1 * (iy + 1);
                    var c = (ix + 1) + gridX1 * (iy + 1);
                    var d = (ix + 1) + gridX1 * iy;
                    // faces
                    //a,b
                    //d,c
                    indices.push(a, b, d);
                    indices.push(b, c, d);
                }
            }
            _this._vertices = vertices;
            _this._indices = indices;
            _this._uvs = uvs;
            return _this;
        }
        return Plane;
    }(ys3d.Geometry));
    ys3d.Plane = Plane;
    __reflect(Plane.prototype, "ys3d.Plane");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=Plane.js.map