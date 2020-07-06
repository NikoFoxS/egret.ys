module ys3d {
	export class Vector4 extends Array {
		public constructor() {
			super();
			Object["setPrototypeOf"](this, Vector4.prototype);
			this.set(0, 0, 0, 1);
		}

		public set x(v) {
			this[0] = v;
		}
		public set y(v) {
			this[1] = v;
		}
		public set z(v) {
			this[2] = v;
		}
		public set w(v) {
			this[3] = v;
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
		public get w() {
			return this[3];
		}

		public getLength() {
			let v = this;
			let x = v[0], y = v[1], z = v[2], w = v[3];
			return Math.sqrt(x * x + y * y + z * z + w * w);
		}


		/**拷贝 */
		public copy(a: Vector4) {
			this[0] = a[0];
			this[1] = a[1];
			this[2] = a[2];
			this[3] = a[3];
		}

		/** */
		public set(x, y, z, w) {
			this[0] = x;
			this[1] = y;
			this[2] = z;
			this[3] = w;
		}

		public static create(x = 0, y = 0, z = 0, w = 1): ys3d.Vector4 {
			const v = new Vector4();
			v[0] = x;
			v[1] = y;
			v[2] = z;
			v[3] = w;
			return v;
		}

	}
}