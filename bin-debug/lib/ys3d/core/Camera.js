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
    var tmp = ys3d.Vector3.create();
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera(fov, aspect, near, far) {
            if (near === void 0) { near = 0.1; }
            if (far === void 0) { far = 2000; }
            var _this = _super.call(this) || this;
            _this.type = 'Camera';
            _this._fov = fov;
            _this._aspect = aspect;
            _this._near = near;
            _this._far = far;
            //fov不一样，投影出来的大小不一样。
            _this.name = 'camera';
            //投影矩阵
            _this._projectionMatrix = ys3d.Matrix4.create();
            _this._updateProjectMatrix();
            //视图矩阵
            _this._viewMatrix = ys3d.Matrix4.create();
            //上方向
            _this.up = ys3d.Vector3.create(0, 1, 0);
            //默认观察方向
            _this.lookAt(0, 0, -1);
            return _this;
        }
        Object.defineProperty(Camera.prototype, "fov", {
            get: function () {
                return this._fov;
            },
            set: function (v) {
                this._fov = v;
                this._updateProjectMatrix();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "far", {
            get: function () {
                return this._far;
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype.updateMatrixWorld = function () {
            _super.prototype.updateMatrixWorld.call(this);
            //相机的视图矩阵变换，相对于观察的空间是逆矩阵。
            this._viewMatrix.copy(this.worldMatrix);
            this._viewMatrix.inverse();
        };
        Camera.prototype._updateProjectMatrix = function () {
            this._projectionMatrix.fromPerspective(this._fov, this._aspect, this._near, this._far);
        };
        Object.defineProperty(Camera.prototype, "projectionMatrix", {
            get: function () {
                return this._projectionMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "viewMatrix", {
            get: function () {
                return this._viewMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype.lookAt = function (x, y, z) {
            var pos = this.position;
            var up = this.up;
            this.viewMatrix.lookAt(pos, ys3d.Vector3.create(x, y, z), up);
            this.viewMatrix.getRotation(this.quat);
            this.rotation.fromQuaternion(this.quat);
        };
        /**进行视图变换和投影变换 */
        Camera.prototype.project = function (v3) {
            tmp = this._viewMatrix.transformV3(v3);
            tmp = this._projectionMatrix.transformV3(tmp);
            return tmp;
        };
        Camera.prototype.unproject = function (x, y) {
            var tempMat4 = ys3d.Matrix4.create();
            tempMat4.copy(this._projectionMatrix);
            tempMat4.inverse();
            tmp.set(x, y, 0);
            tmp = tempMat4.transformV3(tmp);
            tmp = this.worldMatrix.transformV3(tmp);
            return tmp;
        };
        return Camera;
    }(ys3d.Object3D));
    ys3d.Camera = Camera;
    __reflect(Camera.prototype, "ys3d.Camera");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=Camera.js.map