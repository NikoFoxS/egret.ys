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
    var RenderNode = (function (_super) {
        __extends(RenderNode, _super);
        function RenderNode() {
            var _this = _super.call(this) || this;
            _this.visible = true;
            _this.worldPosition = new ys3d.Vector4();
            return _this;
        }
        Object.defineProperty(RenderNode.prototype, "display", {
            get: function () {
                return this.$display;
            },
            enumerable: true,
            configurable: true
        });
        RenderNode.prototype.draw = function (scene, cam) {
        };
        /**模型视图投影矩阵变换 */
        RenderNode.prototype.mvp = function (cam, v4) {
            //对顶点进行模型矩阵变换 M
            v4 = this.worldMatrix.transformV4(v4);
            // console.log('m', v4)
            //对顶点进行视图变换V
            v4 = cam.viewMatrix.transformV4(v4);
            // console.log('v', v4)
            //对顶点投影变换 P
            v4 = cam.projectionMatrix.transformV4(v4);
            // console.log('p', v4)
        };
        return RenderNode;
    }(ys3d.Object3D));
    ys3d.RenderNode = RenderNode;
    __reflect(RenderNode.prototype, "ys3d.RenderNode");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=RenderNode.js.map