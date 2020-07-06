var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ys3d;
(function (ys3d) {
    var ID = 0;
    var Object3D = (function () {
        function Object3D() {
            var _this = this;
            this.parent = null;
            this.children = [];
            this.position = ys3d.Vector3.create();
            this.rotation = ys3d.Euler.create();
            this.quat = ys3d.Quaternion.create();
            this.scale = ys3d.Vector3.create(1, 1, 1);
            this.type = 'Object3D';
            this.id = ID++;
            this.visible = false;
            this.matrix = ys3d.Matrix4.create();
            this.worldMatrix = ys3d.Matrix4.create();
            this.rotation.onChange = function () {
                //欧拉角改变后，更新四元素。更新后的四元素提供给模型变换矩阵用。
                _this.quat.fromEuler(_this.rotation);
            };
            this.quat.onChange = function () {
                //四元素改变后，更新欧拉角。
                _this.rotation.fromQuaternion(_this.quat);
            };
            this.rotation.set(0, 0, 0);
        }
        Object3D.prototype.updateMatrix = function () {
            var matrix = this.matrix;
            var q = this.quat;
            var pos = this.position;
            var scale = this.scale;
            //通过旋转四元素，平移，缩放，构建模型变换矩阵
            matrix.compose(q, pos, scale);
            // matrix.translate(pos);
            // matrix.scale(scale);
            // matrix.rotate(this.rotation.x,Vector3.create(1,0,0));
            // matrix.rotate(this.rotation.y,Vector3.create(0,1,0));
            // matrix.rotate(this.rotation.z,Vector3.create(0,0,1));
        };
        Object3D.prototype.updateMatrixWorld = function () {
            //更新自身矩阵
            this.updateMatrix();
            //更新世界矩阵
            if (this.parent) {
                //关联父级的模型变换矩阵
                this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
            }
            else {
                //无父级
                this.worldMatrix.copy(this.matrix);
            }
            //更新下一层级
            this.children.forEach(function (child) {
                child.updateMatrixWorld();
            });
        };
        Object3D.prototype.getChildIndex = function (obj) {
            return this.children.indexOf(obj);
        };
        Object3D.prototype.addChild = function (obj) {
            //从parent里删除
            obj.parent && obj.parent.removeChild(obj);
            var index = this.getChildIndex(obj);
            if (index == -1) {
                //设置新的parent
                obj.parent = this;
                //添加到children；
                this.children.push(obj);
            }
        };
        Object3D.prototype.removeChild = function (obj) {
            var index = this.getChildIndex(obj);
            if (index != -1) {
                obj.parent = null;
                this.children.splice(index, 1);
            }
        };
        /**逐层遍历 */
        Object3D.prototype.traverse = function (callback) {
            //如果返回true，就停止下一层的遍历。
            if (callback(this))
                return;
            //遍历下一层
            this.children.forEach(function (child) {
                child.traverse(callback);
            });
        };
        return Object3D;
    }());
    ys3d.Object3D = Object3D;
    __reflect(Object3D.prototype, "ys3d.Object3D");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=Object3D.js.map