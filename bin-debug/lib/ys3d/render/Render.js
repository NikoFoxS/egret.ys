var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ys3d;
(function (ys3d) {
    /**
     * 3D透视渲染器
     */
    var Render = (function () {
        function Render() {
        }
        Render.prototype.render = function (scene, cam) {
            scene.display.removeChildren();
            scene.updateMatrixWorld();
            cam.updateMatrixWorld();
            var renderList = [];
            //寻找渲染对象
            scene.traverse(function (child) {
                //to do 剔除显示范围外的对象
                //如果不显示，停止下一层。
                if (!child.visible)
                    return true;
                //如果无draw方法,跳过
                if (!child.draw)
                    return;
                renderList.push(child);
            });
            //深度排序
            renderList.forEach(function (child) {
                var tempV4 = child.worldPosition;
                tempV4.x = 0;
                tempV4.y = 0;
                tempV4.z = 0;
                tempV4.w = 1;
                //将原点变换到世界坐标
                tempV4 = child.worldMatrix.transformV4(tempV4);
                //将原点变换到视图坐标
                tempV4 = cam.viewMatrix.transformV4(tempV4);
                child.worldPosition = tempV4;
            });
            //深度排序
            renderList.sort(function (a, b) {
                var az = a.worldPosition.z;
                var bz = b.worldPosition.z;
                var alen = a.worldPosition.getLength();
                var blen = b.worldPosition.getLength();
                var dis = alen - blen;
                if (Math.abs(dis) < 0.0001) {
                    if (az == bz) {
                        return a.id - b.id;
                    }
                    else {
                        bz - az;
                    }
                }
                else {
                    return -dis;
                }
            });
            renderList.forEach(function (node, index) {
                var pos = node.worldPosition;
                node.draw(scene, cam);
            });
        };
        return Render;
    }());
    ys3d.Render = Render;
    __reflect(Render.prototype, "ys3d.Render");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=Render.js.map