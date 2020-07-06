module ys3d {

	const temp = [0, 0, 0];

	export class Matrix4 extends Array {
		public constructor() {
			super();
			Object["setPrototypeOf"](this, Matrix4.prototype);
		}
		/**平移矩阵 */
		public translate(v: Vector3) {
			Matrix4.translate(this, this, v);
		}
		/**以弧度旋转矩阵 */
		public rotate(rad: number, axis: Vector3) {
			Matrix4.rotate(this, this, rad, axis);
		}
		/**缩放矩阵 */
		public scale(v: Vector3) {
			Matrix4.scale(this, this, v);
		}
		/**设置为单位矩阵 */
		public identity() {
			Matrix4.identity(this);
		}
		/**逆矩阵 */
		public inverse() {
			Matrix4.invert(this, this);
		}
		/**组合旋转，平移，缩放 */
		public compose(q: Quaternion, pos: Vector3, scale: Vector3) {
			Matrix4.composeRotationTranslationScale(this, q, pos, scale);
		}
		/**拷贝 */
		public copy(m) {
			Matrix4.copy(this, m);
		}
		/**透视投影矩阵 */
		public fromPerspective(fov, aspect, near, far) {
			fov = fov * (Math.PI / 180);
			Matrix4.perspective(this, fov, aspect, near, far);
		}
		/**正交投影矩阵 */
		public fromOrthogonal(left, right, bottom, top, near, far) {
			Matrix4.ortho(this, left, right, bottom, top, near, far);
		}
		/**四元素旋转矩阵 */
		public fromQuaternion(q: Quaternion) {
			Matrix4.fromQuaternion(this, q);
		}
		/** */
		public multiply(ma: Matrix4, mb?: Matrix4) {
			if (mb) {
				Matrix4.multiply(this, ma, mb);
			} else {
				Matrix4.multiply(this, this, ma);
			}
		}

		public lookAt(eye: Vector3, target: Vector3, up: Vector3) {
			Matrix4.lookAt(this, eye, target, up);
		}

		/**对向量进行矩阵变换 */
		public transformV4(v: Vector4) {
			Matrix4.transformVector4(v, v, this);
			return v;
		}
		/**对向量进行矩阵变换 */
		public transformV3(v: Vector3) {
			Matrix4.transformVector3(v, v, this);
			return v;
		}

		public getRotation(q: Quaternion) {
			Matrix4.getRotation(q, this);
		}

		//----------------------------
		// 静态方法
		//----------------------------

		/**创建矩阵 */
		public static create() {
			let mat = new Matrix4();
			Matrix4.identity(mat);
			return mat;
		}

		/**拷贝矩阵 */
		public static copy(out: Matrix4, a: Matrix4) {
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
		}

		/**设置矩阵数据 */
		public static set(out: Matrix4, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
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
		}
		/**设置为单位矩阵 */
		public static identity(out: Matrix4) {
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
		}

		/**转置矩阵 */
		public static transpose(out: Matrix4, a: Matrix4) {
			if (out === a) {
				let a01 = a[1],
					a02 = a[2],
					a03 = a[3];
				let a12 = a[6],
					a13 = a[7];
				let a23 = a[11];

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
			} else {
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
		}

		/**逆矩阵,可用于摄像机的模型变换 */
		public static invert(out: Matrix4, a: Matrix4) {
			let a00 = a[0],
				a01 = a[1],
				a02 = a[2],
				a03 = a[3];
			let a10 = a[4],
				a11 = a[5],
				a12 = a[6],
				a13 = a[7];
			let a20 = a[8],
				a21 = a[9],
				a22 = a[10],
				a23 = a[11];
			let a30 = a[12],
				a31 = a[13],
				a32 = a[14],
				a33 = a[15];

			let b00 = a00 * a11 - a01 * a10;
			let b01 = a00 * a12 - a02 * a10;
			let b02 = a00 * a13 - a03 * a10;
			let b03 = a01 * a12 - a02 * a11;
			let b04 = a01 * a13 - a03 * a11;
			let b05 = a02 * a13 - a03 * a12;
			let b06 = a20 * a31 - a21 * a30;
			let b07 = a20 * a32 - a22 * a30;
			let b08 = a20 * a33 - a23 * a30;
			let b09 = a21 * a32 - a22 * a31;
			let b10 = a21 * a33 - a23 * a31;
			let b11 = a22 * a33 - a23 * a32;

			let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

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
		}

		/**矩阵相乘，可以用于组合mvp */
		public static multiply(out: Matrix4, a: Matrix4, b: Matrix4) {
			let a00 = a[0],
				a01 = a[1],
				a02 = a[2],
				a03 = a[3];
			let a10 = a[4],
				a11 = a[5],
				a12 = a[6],
				a13 = a[7];
			let a20 = a[8],
				a21 = a[9],
				a22 = a[10],
				a23 = a[11];
			let a30 = a[12],
				a31 = a[13],
				a32 = a[14],
				a33 = a[15];

			let b0 = b[0],
				b1 = b[1],
				b2 = b[2],
				b3 = b[3];
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
		}

		/**平移矩阵 */
		public static translate(out: Matrix4, a: Matrix4, v: Vector3) {
			let x = v[0],
				y = v[1],
				z = v[2];
			let a00, a01, a02, a03;
			let a10, a11, a12, a13;
			let a20, a21, a22, a23;

			if (a === out) {
				out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
				out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
				out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
				out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
			} else {
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

		}
		/**缩放矩阵 */
		public static scale(out: Matrix4, a: Matrix4, v: Vector3) {
			let x = v[0],
				y = v[1],
				z = v[2];

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
		}
		/**以弧度rad按照axis轴向旋转矩阵 */
		public static rotate(out: Matrix4, a: Matrix4, rad: number, axis: Vector3) {
			let x = axis[0],
				y = axis[1],
				z = axis[2];
			let len = math.hypot(x, y, z);
			let s, c, t;
			let a00, a01, a02, a03;
			let a10, a11, a12, a13;
			let a20, a21, a22, a23;
			let b00, b01, b02;
			let b10, b11, b12;
			let b20, b21, b22;

			if (Math.abs(len) < EPSILON) {
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
		}
		/**组合旋转，平移，缩放矩阵。可以用来组合模型变换 */
		public static composeRotationTranslationScale(out: Matrix4, q: Quaternion, v: Vector3, s: Vector3) {
			// Quaternion math
			let x = q[0],
				y = q[1],
				z = q[2],
				w = q[3];
			let x2 = x + x;
			let y2 = y + y;
			let z2 = z + z;

			let xx = x * x2;
			let xy = x * y2;
			let xz = x * z2;
			let yy = y * y2;
			let yz = y * z2;
			let zz = z * z2;
			let wx = w * x2;
			let wy = w * y2;
			let wz = w * z2;
			let sx = s[0];
			let sy = s[1];
			let sz = s[2];

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
		}

		/**从矩阵中提取平移 */
		public static getTranslation(out: Vector3, mat: Matrix4) {
			out[0] = mat[12];
			out[1] = mat[13];
			out[2] = mat[14];
		}

		/** 从矩阵中提取缩放 */
		public static getScaling(out: Vector3, mat: Matrix4) {
			let m11 = mat[0];
			let m12 = mat[1];
			let m13 = mat[2];
			let m21 = mat[4];
			let m22 = mat[5];
			let m23 = mat[6];
			let m31 = mat[8];
			let m32 = mat[9];
			let m33 = mat[10];

			out[0] = math.hypot(m11, m12, m13);
			out[1] = math.hypot(m21, m22, m23);
			out[2] = math.hypot(m31, m32, m33);
		}
		/**从矩阵中提取旋转四元素 */
		public static getRotation(out: Quaternion, mat: Matrix4) {
			let scaling = Vector3.create();
			Matrix4.getScaling(scaling, mat);

			let is1 = 1 / scaling[0];
			let is2 = 1 / scaling[1];
			let is3 = 1 / scaling[2];

			let sm11 = mat[0] * is1;
			let sm12 = mat[1] * is2;
			let sm13 = mat[2] * is3;
			let sm21 = mat[4] * is1;
			let sm22 = mat[5] * is2;
			let sm23 = mat[6] * is3;
			let sm31 = mat[8] * is1;
			let sm32 = mat[9] * is2;
			let sm33 = mat[10] * is3;

			let trace = sm11 + sm22 + sm33;
			let S = 0;

			if (trace > 0) {
				S = Math.sqrt(trace + 1.0) * 2;
				out[3] = 0.25 * S;
				out[0] = (sm23 - sm32) / S;
				out[1] = (sm31 - sm13) / S;
				out[2] = (sm12 - sm21) / S;
			} else if (sm11 > sm22 && sm11 > sm33) {
				S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
				out[3] = (sm23 - sm32) / S;
				out[0] = 0.25 * S;
				out[1] = (sm12 + sm21) / S;
				out[2] = (sm31 + sm13) / S;
			} else if (sm22 > sm33) {
				S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
				out[3] = (sm31 - sm13) / S;
				out[0] = (sm12 + sm21) / S;
				out[1] = 0.25 * S;
				out[2] = (sm23 + sm32) / S;
			} else {
				S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
				out[3] = (sm12 - sm21) / S;
				out[0] = (sm31 + sm13) / S;
				out[1] = (sm23 + sm32) / S;
				out[2] = 0.25 * S;
			}
		};
		/**用四元素构造旋转矩阵 */
		public static fromQuaternion(out: Matrix4, q: Quaternion) {
			let x = q[0],
				y = q[1],
				z = q[2],
				w = q[3];
			let x2 = x + x;
			let y2 = y + y;
			let z2 = z + z;

			let xx = x * x2;
			let yx = y * x2;
			let yy = y * y2;
			let zx = z * x2;
			let zy = z * y2;
			let zz = z * z2;
			let wx = w * x2;
			let wy = w * y2;
			let wz = w * z2;

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
		}
		/**创建透视投影矩阵 */
		public static perspective(out: Matrix4, fovy: number, aspect: number, near: number = 0.1, far: number = 2000) {

			if (near === far || aspect === 0) {
				throw "null frustum";
			}
			if (near <= 0) {
				throw "near <= 0";
			}
			if (far <= 0) {
				throw "far <= 0";
			}

			let f = 1.0 / Math.tan(fovy / 2);
			let nf = 1 / (near - far);
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
		}

		/**创建正交投影矩阵 */
		public static ortho(out: Matrix4, left: number, right: number, bottom: number, top: number, near: number = 0.1, far: number = 2000) {
			let lr = 1 / (left - right);
			let bt = 1 / (bottom - top);
			let nf = 1 / (near - far);
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
		}

		/**设置观察矩阵 */
		public static lookAt(out: Matrix4, eye: Vector3, target: Vector3, up: Vector3) {
			let eyex = eye[0],
				eyey = eye[1],
				eyez = eye[2],
				upx = up[0],
				upy = up[1],
				upz = up[2];

			let z0 = eyex - target[0],
				z1 = eyey - target[1],
				z2 = eyez - target[2];

			let len = z0 * z0 + z1 * z1 + z2 * z2;
			if (len === 0) {
				// eye and target are in the same position
				z2 = 1;
			} else {
				len = 1 / Math.sqrt(len);
				z0 *= len;
				z1 *= len;
				z2 *= len;
			}

			let x0 = upy * z2 - upz * z1,
				x1 = upz * z0 - upx * z2,
				x2 = upx * z1 - upy * z0;

			len = x0 * x0 + x1 * x1 + x2 * x2;
			if (len === 0) {
				// up and z are parallel
				if (upz) {
					upx += 1e-6;
				} else if (upy) {
					upz += 1e-6;
				} else {
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
		}

		/**对Vector4进行矩阵变换 */
		public static transformVector4(out: Vector4, a: Vector4, mat: Matrix4) {
			let x = a[0],
				y = a[1],
				z = a[2];
			out[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
			out[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
			out[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
			let w = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
			// w = w || 1.0;
			out[3] = w;
		}

		/**对Vector3进行矩阵变换 */
		public static transformVector3(out: Vector3, a: Vector3, mat: Matrix4) {
			let x = a[0],
				y = a[1],
				z = a[2];
			let w = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
			w = w || 1.0;
			out[0] = (mat[0] * x + mat[4] * y + mat[8] * z + mat[12]) / w;
			out[1] = (mat[1] * x + mat[5] * y + mat[9] * z + mat[13]) / w;
			out[2] = (mat[2] * x + mat[6] * y + mat[10] * z + mat[14]) / w;
		}


	}
}