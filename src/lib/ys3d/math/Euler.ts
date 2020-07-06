module ys3d {
	let tempMat4: Matrix4 = Matrix4.create();
	export class Euler extends Array {
		public constructor() {
			super();
			Object["setPrototypeOf"](this, Euler.prototype);
			this[0] = 0;
			this[1] = 0;
			this[2] = 0;
		}

		public onChange = () => { };

		public set x(v) {
			this[0] = v;
			this.onChange();
		}
		public set y(v) {
			this[1] = v;
			this.onChange();
		}
		public set z(v) {
			this[2] = v;
			this.onChange();
		}

		public set(x, y, z) {
			this[0] = x;
			this[1] = x;
			this[2] = x;
			this.onChange();
		}

		public get x() {
			return this[0];
		}
		public get y() {
			return this[1];
		}
		public get z() {
			return this[2];
		}


		public fromQuaternion(q: Quaternion) {
			Matrix4.fromQuaternion(tempMat4, q);
			Euler.fromRotationMatrix(this, tempMat4);
			this.onChange();
		}

		public static create(): ys3d.Euler {
			const e = new Euler();
			return e;
		}

		/**旋转矩阵提取欧拉角 */
		public static fromRotationMatrix(out: Euler, m: Matrix4, order = 'YXZ') {
			if (order === 'XYZ') {
				out[1] = Math.asin(Math.min(Math.max(m[8], -1), 1));
				if (Math.abs(m[8]) < 0.99999) {
					out[0] = Math.atan2(-m[9], m[10]);
					out[2] = Math.atan2(-m[4], m[0]);
				} else {
					out[0] = Math.atan2(m[6], m[5]);
					out[2] = 0;
				}
			} else if (order === 'YXZ') {
				out[0] = Math.asin(-Math.min(Math.max(m[9], -1), 1));
				if (Math.abs(m[9]) < 0.99999) {
					out[1] = Math.atan2(m[8], m[10]);
					out[2] = Math.atan2(m[1], m[5]);
				} else {
					out[1] = Math.atan2(-m[2], m[0]);
					out[2] = 0;
				}
			} else if (order === 'ZXY') {
				out[0] = Math.asin(Math.min(Math.max(m[6], -1), 1));
				if (Math.abs(m[6]) < 0.99999) {
					out[1] = Math.atan2(-m[2], m[10]);
					out[2] = Math.atan2(-m[4], m[5]);
				} else {
					out[1] = 0;
					out[2] = Math.atan2(m[1], m[0]);
				}
			} else if (order === 'ZYX') {
				out[1] = Math.asin(-Math.min(Math.max(m[2], -1), 1));
				if (Math.abs(m[2]) < 0.99999) {
					out[0] = Math.atan2(m[6], m[10]);
					out[2] = Math.atan2(m[1], m[0]);
				} else {
					out[0] = 0;
					out[2] = Math.atan2(-m[4], m[5]);
				}
			} else if (order === 'YZX') {
				out[2] = Math.asin(Math.min(Math.max(m[1], -1), 1));
				if (Math.abs(m[1]) < 0.99999) {
					out[0] = Math.atan2(-m[9], m[5]);
					out[1] = Math.atan2(-m[2], m[0]);
				} else {
					out[0] = 0;
					out[1] = Math.atan2(m[8], m[10]);
				}
			} else if (order === 'XZY') {
				out[2] = Math.asin(-Math.min(Math.max(m[4], -1), 1));
				if (Math.abs(m[4]) < 0.99999) {
					out[0] = Math.atan2(m[6], m[5]);
					out[1] = Math.atan2(m[8], m[0]);
				} else {
					out[0] = Math.atan2(-m[9], m[10]);
					out[1] = 0;
				}
			}

			return out;
		}
	}
}