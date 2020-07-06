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
    var temV4 = ys3d.Vector4.create();
    var PlaneNode = (function (_super) {
        __extends(PlaneNode, _super);
        function PlaneNode(display) {
            var _this = _super.call(this) || this;
            _this.$display = display;
            var d = _this.$display;
            _this._shader = new ys3d.PlaneShader();
            if (d.filters) {
                d.filters.push(_this._shader.shader);
            }
            else {
                d.filters = [_this._shader.shader];
            }
            _this.$geometry = new ys3d.Plane(display.width, display.height);
            return _this;
        }
        PlaneNode.prototype.draw = function (scene, cam) {
            scene.display.addChild(this.$display);
            var viewMatrix = cam.viewMatrix;
            var projectMatix = cam.projectionMatrix;
            var vertices = this.$geometry.vertices;
            var ratio = devicePixelRatio * innerWidth / stageW;
            var i = 0;
            var len = vertices.length;
            var v4arr = [];
            var x, y, z;
            var v4;
            while (i < len) {
                x = vertices[i];
                y = vertices[i + 1];
                z = vertices[i + 2];
                // //对顶点进行模型矩阵变换 M
                v4 = ys3d.Vector4.create(x, y, z, 1);
                this.mvp(cam, v4);
                //知识点：
                // WebGL要使用 4x4 的矩阵和包含 X, Y, Z, 和 W 四个值的向量。 
                // X 和 Y 除以 W 得到裁剪空间坐标，
                // Z 除以 W 也得到裁剪空间的 Z 坐标， 
                // W 同时还为纹理映射的透视纠正提供了帮助
                v4arr.push(v4);
                i += 3;
            }
            //将变换后的顶点坐标，更新到着色器。
            this._shader.updateArr(v4arr);
        };
        return PlaneNode;
    }(ys3d.RenderNode));
    ys3d.PlaneNode = PlaneNode;
    __reflect(PlaneNode.prototype, "ys3d.PlaneNode");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=PlaneNode.js.map