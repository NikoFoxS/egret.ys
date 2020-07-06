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
    var temp = [0, 0, 0];
    var Matrix4 = (function (_super) {
        __extends(Matrix4, _super);
        function Matrix4() {
            var _this = _super.call(this) || this;
            Object["setPrototypeOf"](_this, Matrix4.prototype);
            return _this;
        }
        /**平移矩阵 */
        Matrix4.prototype.translate = function (v) {
            Matrix4.translate(this, this, v);
        };
        /**以弧度旋转矩阵 */
        Matrix4.prototype.rotate = function (rad, axis) {
            Matrix4.rotate(this, this, rad, axis);
        };
        /**缩放矩阵 */
        Matrix4.prototype.scale = function (v) {
            Matrix4.scale(this, this, v);
        };
        /**设置为单位矩阵 */
        Matrix4.prototype.identity = function () {
            Matrix4.identity(this);
        };
        /**逆矩阵 */
        Matrix4.prototype.inverse = function () {
            Matrix4.invert(this, this);
        };
        /**组合旋转，平移，缩放 */
        Matrix4.prototype.compose = function (q, pos, scale) {
            Matrix4.composeRotationTranslationScale(this, q, pos, scale);
        };
        /**拷贝 */
        Matrix4.prototype.copy = function (m) {
            Matrix4.copy(this, m);
        };
        /**透视投影矩阵 */
        Matrix4.prototype.fromPerspective = function (fov, aspect, near, far) {
            fov = fov * (Math.PI / 180);
            Matrix4.perspective(this, fov, aspect, near, far);
        };
        /**正交投影矩阵 */
        Matrix4.prototype.fromOrthogonal = function (left, right, bottom, top, near, far) {
            Matrix4.ortho(this, left, right, bottom, top, near, far);
        };
        /**四元素旋转矩阵 */
        Matrix4.prototype.fromQuaternion = function (q) {
            Matrix4.fromQuaternion(this, q);
        };
        /** */
        Matrix4.prototype.multiply = function (ma, mb) {
            if (mb) {
                Matrix4.multiply(this, ma, mb);
            }
            else {
                Matrix4.multiply(this, this, ma);
            }
        };
        Matrix4.prototype.lookAt = function (eye, target, up) {
            Matrix4.lookAt(this, eye, target, up);
        };
        /**对向量进行矩阵变换 */
        Matrix4.prototype.transformV4 = function (v) {
            Matrix4.transformVector4(v, v, this);
            return v;
        };
        /**对向量进行矩阵变换 */
        Matrix4.prototype.transformV3 = function (v) {
            Matrix4.transformVector3(v, v, this);
            return v;
        };
        Matrix4.prototype.getRotation = function (q) {
            Matrix4.getRotation(q, this);
        };
        //----------------------------
        // 静态方法
        //----------------------------
        /**创建矩阵 */
        Matrix4.create = function () {
            var mat = new Matrix4();
            Matrix4.identity(mat);
            return mat;
        };
        /**拷贝矩阵 */
        Matrix4.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
        };
        /**设置矩阵数据 */
        Matrix4.set = function (out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
            out[0] = m00;
            out[1] = m01;
            out[2] = m02;
            out[3] = m03;
            out[4] = m10;
            out[5] = m11;
            out[6] = m12;
            out[7] = m13;
            out[8] = m20;
            out[9] = m21;
            out[10] = m22;
            out[11] = m23;
            out[12] = m30;
            out[13] = m31;
            out[14] = m32;
            out[15] = m33;
        };
        /**设置为单位矩阵 */
        Matrix4.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
        };
        /**转置矩阵 */
        Matrix4.transpose = function (out, a) {
            if (out === a) {
                var a01 = a[1], a02 = a[2], a03 = a[3];
                var a12 = a[6], a13 = a[7];
                var a23 = a[11];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a01;
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a02;
                out[9] = a12;
                out[11] = a[14];
                out[12] = a03;
                out[13] = a13;
                out[14] = a23;
            }
            else {
                out[0] = a[0];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a[1];
                out[5] = a[5];
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a[2];
                out[9] = a[6];
                out[10] = a[10];
                out[11] = a[14];
                out[12] = a[3];
                out[13] = a[7];
                out[14] = a[11];
                out[15] = a[15];
            }
        };
        /**逆矩阵,可用于摄像机的模型变换 */
        Matrix4.invert = function (out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            var b00 = a00 * a11 - a01 * a10;
            var b01 = a00 * a12 - a02 * a10;
            var b02 = a00 * a13 - a03 * a10;
            var b03 = a01 * a12 - a02 * a11;
            var b04 = a01 * a13 - a03 * a11;
            var b05 = a02 * a13 - a03 * a12;
            var b06 = a20 * a31 - a21 * a30;
            var b07 = a20 * a32 - a22 * a30;
            var b08 = a20 * a33 - a23 * a30;
            var b09 = a21 * a32 - a22 * a31;
            var b10 = a21 * a33 - a23 * a31;
            var b11 = a22 * a33 - a23 * a32;
            var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return;
            }
            det = 1.0 / det;
            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        };
        /**矩阵相乘，可以用于组合mvp */
        Matrix4.multiply = function (out, a, b) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[4];
            b1 = b[5];
            b2 = b[6];
            b3 = b[7];
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[8];
            b1 = b[9];
            b2 = b[10];
            b3 = b[11];
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[12];
            b1 = b[13];
            b2 = b[14];
            b3 = b[15];
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        };
        /**平移矩阵 */
        Matrix4.translate = function (out, a, v) {
            var x = v[0], y = v[1], z = v[2];
            var a00, a01, a02, a03;
            var a10, a11, a12, a13;
            var a20, a21, a22, a23;
            if (a === out) {
                out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
                out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
                out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
                out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
            }
            else {
                a00 = a[0];
                a01 = a[1];
                a02 = a[2];
                a03 = a[3];
                a10 = a[4];
                a11 = a[5];
                a12 = a[6];
                a13 = a[7];
                a20 = a[8];
                a21 = a[9];
                a22 = a[10];
                a23 = a[11];
                out[0] = a00;
                out[1] = a01;
                out[2] = a02;
                out[3] = a03;
                out[4] = a10;
                out[5] = a11;
                out[6] = a12;
                out[7] = a13;
                out[8] = a20;
                out[9] = a21;
                out[10] = a22;
                out[11] = a23;
                out[12] = a00 * x + a10 * y + a20 * z + a[12];
                out[13] = a01 * x + a11 * y + a21 * z + a[13];
                out[14] = a02 * x + a12 * y + a22 * z + a[14];
                out[15] = a03 * x + a13 * y + a23 * z + a[15];
            }
        };
        /**缩放矩阵 */
        Matrix4.scale = function (out, a, v) {
            var x = v[0], y = v[1], z = v[2];
            out[0] = a[0] * x;
            out[1] = a[1] * x;
            out[2] = a[2] * x;
            out[3] = a[3] * x;
            out[4] = a[4] * y;
            out[5] = a[5] * y;
            out[6] = a[6] * y;
            out[7] = a[7] * y;
            out[8] = a[8] * z;
            out[9] = a[9] * z;
            out[10] = a[10] * z;
            out[11] = a[11] * z;
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
        };
        /**以弧度rad按照axis轴向旋转矩阵 */
        Matrix4.rotate = function (out, a, rad, axis) {
            var x = axis[0], y = axis[1], z = axis[2];
            var len = ys3d.math.hypot(x, y, z);
            var s, c, t;
            var a00, a01, a02, a03;
            var a10, a11, a12, a13;
            var a20, a21, a22, a23;
            var b00, b01, b02;
            var b10, b11, b12;
            var b20, b21, b22;
            if (Math.abs(len) < ys3d.EPSILON) {
                return;
            }
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;
            a00 = a[0];
            a01 = a[1];
            a02 = a[2];
            a03 = a[3];
            a10 = a[4];
            a11 = a[5];
            a12 = a[6];
            a13 = a[7];
            a20 = a[8];
            a21 = a[9];
            a22 = a[10];
            a23 = a[11];
            // Construct the elements of the rotation matrix
            b00 = x * x * t + c;
            b01 = y * x * t + z * s;
            b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;
            b11 = y * y * t + c;
            b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;
            b21 = y * z * t - x * s;
            b22 = z * z * t + c;
            // Perform rotation-specific matrix multiplication
            out[0] = a00 * b00 + a10 * b01 + a20 * b02;
            out[1] = a01 * b00 + a11 * b01 + a21 * b02;
            out[2] = a02 * b00 + a12 * b01 + a22 * b02;
            out[3] = a03 * b00 + a13 * b01 + a23 * b02;
            out[4] = a00 * b10 + a10 * b11 + a20 * b12;
            out[5] = a01 * b10 + a11 * b11 + a21 * b12;
            out[6] = a02 * b10 + a12 * b11 + a22 * b12;
            out[7] = a03 * b10 + a13 * b11 + a23 * b12;
            out[8] = a00 * b20 + a10 * b21 + a20 * b22;
            out[9] = a01 * b20 + a11 * b21 + a21 * b22;
            out[10] = a02 * b20 + a12 * b21 + a22 * b22;
            out[11] = a03 * b20 + a13 * b21 + a23 * b22;
            if (a !== out) {
                // If the source and destination differ, copy the unchanged last row
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
        };
        /**组合旋转，平移，缩放矩阵。可以用来组合模型变换 */
        Matrix4.composeRotationTranslationScale = function (out, q, v, s) {
            // Quaternion math
            var x = q[0], y = q[1], z = q[2], w = q[3];
            var x2 = x + x;
            var y2 = y + y;
            var z2 = z + z;
            var xx = x * x2;
            var xy = x * y2;
            var xz = x * z2;
            var yy = y * y2;
            var yz = y * z2;
            var zz = z * z2;
            var wx = w * x2;
            var wy = w * y2;
            var wz = w * z2;
            var sx = s[0];
            var sy = s[1];
            var sz = s[2];
            out[0] = (1 - (yy + zz)) * sx;
            out[1] = (xy + wz) * sx;
            out[2] = (xz - wy) * sx;
            out[3] = 0;
            out[4] = (xy - wz) * sy;
            out[5] = (1 - (xx + zz)) * sy;
            out[6] = (yz + wx) * sy;
            out[7] = 0;
            out[8] = (xz + wy) * sz;
            out[9] = (yz - wx) * sz;
            out[10] = (1 - (xx + yy)) * sz;
            out[11] = 0;
            out[12] = v[0];
            out[13] = v[1];
            out[14] = v[2];
            out[15] = 1;
        };
        /**从矩阵中提取平移 */
        Matrix4.getTranslation = function (out, mat) {
            out[0] = mat[12];
            out[1] = mat[13];
            out[2] = mat[14];
        };
        /** 从矩阵中提取缩放 */
        Matrix4.getScaling = function (out, mat) {
            var m11 = mat[0];
            var m12 = mat[1];
            var m13 = mat[2];
            var m21 = mat[4];
            var m22 = mat[5];
            var m23 = mat[6];
            var m31 = mat[8];
            var m32 = mat[9];
            var m33 = mat[10];
            out[0] = ys3d.math.hypot(m11, m12, m13);
            out[1] = ys3d.math.hypot(m21, m22, m23);
            out[2] = ys3d.math.hypot(m31, m32, m33);
        };
        /**从矩阵中提取旋转四元素 */
        Matrix4.getRotation = function (out, mat) {
            var scaling = ys3d.Vector3.create();
            Matrix4.getScaling(scaling, mat);
            var is1 = 1 / scaling[0];
            var is2 = 1 / scaling[1];
            var is3 = 1 / scaling[2];
            var sm11 = mat[0] * is1;
            var sm12 = mat[1] * is2;
            var sm13 = mat[2] * is3;
            var sm21 = mat[4] * is1;
            var sm22 = mat[5] * is2;
            var sm23 = mat[6] * is3;
            var sm31 = mat[8] * is1;
            var sm32 = mat[9] * is2;
            var sm33 = mat[10] * is3;
            var trace = sm11 + sm22 + sm33;
            var S = 0;
            if (trace > 0) {
                S = Math.sqrt(trace + 1.0) * 2;
                out[3] = 0.25 * S;
                out[0] = (sm23 - sm32) / S;
                out[1] = (sm31 - sm13) / S;
                out[2] = (sm12 - sm21) / S;
            }
            else if (sm11 > sm22 && sm11 > sm33) {
                S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
                out[3] = (sm23 - sm32) / S;
                out[0] = 0.25 * S;
                out[1] = (sm12 + sm21) / S;
                out[2] = (sm31 + sm13) / S;
            }
            else if (sm22 > sm33) {
                S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
                out[3] = (sm31 - sm13) / S;
                out[0] = (sm12 + sm21) / S;
                out[1] = 0.25 * S;
                out[2] = (sm23 + sm32) / S;
            }
            else {
                S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
                out[3] = (sm12 - sm21) / S;
                out[0] = (sm31 + sm13) / S;
                out[1] = (sm23 + sm32) / S;
                out[2] = 0.25 * S;
            }
        };
        ;
        /**用四元素构造旋转矩阵 */
        Matrix4.fromQuaternion = function (out, q) {
            var x = q[0], y = q[1], z = q[2], w = q[3];
            var x2 = x + x;
            var y2 = y + y;
            var z2 = z + z;
            var xx = x * x2;
            var yx = y * x2;
            var yy = y * y2;
            var zx = z * x2;
            var zy = z * y2;
            var zz = z * z2;
            var wx = w * x2;
            var wy = w * y2;
            var wz = w * z2;
            out[0] = 1 - yy - zz;
            out[1] = yx + wz;
            out[2] = zx - wy;
            out[3] = 0;
            out[4] = yx - wz;
            out[5] = 1 - xx - zz;
            out[6] = zy + wx;
            out[7] = 0;
            out[8] = zx + wy;
            out[9] = zy - wx;
            out[10] = 1 - xx - yy;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
        };
        /**创建透视投影矩阵 */
        Matrix4.perspective = function (out, fovy, aspect, near, far) {
            if (near === void 0) { near = 0.1; }
            if (far === void 0) { far = 2000; }
            if (near === far || aspect === 0) {
                throw "null frustum";
            }
            if (near <= 0) {
                throw "near <= 0";
            }
            if (far <= 0) {
                throw "far <= 0";
            }
            var f = 1.0 / Math.tan(fovy / 2);
            var nf = 1 / (near - far);
            out[0] = f / aspect;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = f;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = 2 * far * near * nf;
            out[15] = 0;
        };
        /**创建正交投影矩阵 */
        Matrix4.ortho = function (out, left, right, bottom, top, near, far) {
            if (near === void 0) { near = 0.1; }
            if (far === void 0) { far = 2000; }
            var lr = 1 / (left - right);
            var bt = 1 / (bottom - top);
            var nf = 1 / (near - far);
            out[0] = -2 * lr;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = -2 * bt;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 2 * nf;
            out[11] = 0;
            out[12] = (left + right) * lr;
            out[13] = (top + bottom) * bt;
            out[14] = (far + near) * nf;
            out[15] = 1;
        };
        /**设置观察矩阵 */
        Matrix4.lookAt = function (out, eye, target, up) {
            var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
            var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
            var len = z0 * z0 + z1 * z1 + z2 * z2;
            if (len === 0) {
                // eye and target are in the same position
                z2 = 1;
            }
            else {
                len = 1 / Math.sqrt(len);
                z0 *= len;
                z1 *= len;
                z2 *= len;
            }
            var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
            len = x0 * x0 + x1 * x1 + x2 * x2;
            if (len === 0) {
                // up and z are parallel
                if (upz) {
                    upx += 1e-6;
                }
                else if (upy) {
                    upz += 1e-6;
                }
                else {
                    upy += 1e-6;
                }
                (x0 = upy * z2 - upz * z1), (x1 = upz * z0 - upx * z2), (x2 = upx * z1 - upy * z0);
                len = x0 * x0 + x1 * x1 + x2 * x2;
            }
            len = 1 / Math.sqrt(len);
            x0 *= len;
            x1 *= len;
            x2 *= len;
            out[0] = x0;
            out[1] = x1;
            out[2] = x2;
            out[3] = 0;
            out[4] = z1 * x2 - z2 * x1;
            out[5] = z2 * x0 - z0 * x2;
            out[6] = z0 * x1 - z1 * x0;
            out[7] = 0;
            out[8] = z0;
            out[9] = z1;
            out[10] = z2;
            out[11] = 0;
            out[12] = eyex;
            out[13] = eyey;
            out[14] = eyez;
            out[15] = 1;
        };
        /**对Vector4进行矩阵变换 */
        Matrix4.transformVector4 = function (out, a, mat) {
            var x = a[0], y = a[1], z = a[2];
            out[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
            out[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
            out[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
            var w = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
            // w = w || 1.0;
            out[3] = w;
        };
        /**对Vector3进行矩阵变换 */
        Matrix4.transformVector3 = function (out, a, mat) {
            var x = a[0], y = a[1], z = a[2];
            var w = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
            w = w || 1.0;
            out[0] = (mat[0] * x + mat[4] * y + mat[8] * z + mat[12]) / w;
            out[1] = (mat[1] * x + mat[5] * y + mat[9] * z + mat[13]) / w;
            out[2] = (mat[2] * x + mat[6] * y + mat[10] * z + mat[14]) / w;
        };
        return Matrix4;
    }(Array));
    ys3d.Matrix4 = Matrix4;
    __reflect(Matrix4.prototype, "ys3d.Matrix4");
})(ys3d || (ys3d = {}));
//# sourceMappingURL=Matrix4.js.map