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
    var SpriteNode = (function (_super) {
        __extends(SpriteNode, _super);
        function SpriteNode(texture, ax, ay) {
            if (ax === void 0) { ax = 0.5; }
            if (ay === void 0) { ay = 0.5; }
            var _this = _super.call(this) || this;
            _this.type = 'Sprite';
            _this.$display = new egret.Bitmap(texture);
            var d = _this.$display;
            d.anchorOffsetX = d.width * ax;
            d.anchorOffsetY = d.height * ay;
            return _this;
        }
        SpriteNode.prototype.projectTo2D = function (x, y, z, focalLength) {
            var scaleFactor = focalLength / (focalLength + z);
            var dis = (focalLength + z);
            if (dis == 0) {
                x = 100000;
                y = 0;
                scaleFactor = 1;
            }
            else {
                x = x * scaleFactor;
                y = y * scaleFactor;
            }
            return ys3d.Vector3.create(x, -y, scaleFactor);
        };
        SpriteNode.prototype.draw = function (scene, cam) {
            var d = this.$display;
            scene.display.addChild(d);
            var p1 = ys3d.Vector4.create(0, 0, 0, 1);
            this.mvp(cam, p1);
            // console.log('---')
            // console.log(p1);
            //w_out = z_in * fudgeFactor + 1;
            var fudgeFactor = (p1.w - 1) / p1.z;
            // console.log(fudgeFactor);
            var size = p1.w;
            p1.x /= size;
            p1.y /= size;
            //因为裁剪空间是 -1~1，长度为2.所以映射到白鹭的空间要乘以半宽和半高。
            p1.x = p1.x * stageHalfW;
            p1.y = -p1.y * stageHalfH; //y轴反向
            d.x = p1.x;
            d.y = p1.y;
            // console.log('---');
            var scale = stageH / p1.w; //这个地方还要调整。
            // console.log('scale',scale);
            d.scaleX = scale * this.scale.x;
            d.scaleY = scale * this.scale.y;
        };
        return SpriteNode;
    }(ys3d.RenderNode));
    ys3d.SpriteNode = SpriteNode;
    __reflect(SpriteNode.prototype, "ys3d.SpriteNode");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=SpriteNode.js.map