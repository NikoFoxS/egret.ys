module ys3d {
	export class Vector3 extends Array {
		public constructor() {
			super();
			Object["setPrototypeOf"](this, Vector3.prototype);
			this[0] = 0;
			this[1] = 0;
			this[2] = 0;
		}

		public set(x = 0, y=0, z=0) {
			this[0] = x;
			this[1] = y;
			this[2] = z;
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

		public get x() {
			return this[0];
		}
		public get y() {
			return this[1];
		}
		public get z() {
			return this[2];
		}

		public add(b: Vector3) {
			Vector3.add(this, this, b);
		}

		public subtract(b: Vector3) {
			Vector3.subtract(this, this, b);
		}

		public scale(v: number) {
			Vector3.scale(this, this, v);
		}

		public getLength() {
			return Vector3.getLength(this);
		}

		public dot(b: Vector3) {
			return Vector3.dot(this, b);
		}

		public cross(b: Vector3) {
			Vector3.cross(this, this, b);
		}

		public static create(x = 0, y = 0, z = 0): ys3d.Vector3 {
			const v = new Vector3();
			v[0] = x;
			v[1] = y;
			v[2] = z;
			return v;
		}

		/**向量相加 */
		public static add(out: Vector3, a: Vector3, b: Vector3) {
			out[0] = a[0] + b[0];
			out[1] = a[1] + b[1];
			out[2] = a[2] + b[2];
		}
		/**向量相减 */
		public static subtract(out: Vector3, a: Vector3, b: Vector3) {
			out[0] = a[0] - b[0];
			out[1] = a[1] - b[1];
			out[2] = a[2] - b[2];
		}
		/**缩放向量 */
		public static scale(out: Vector3, a: Vector3, b: number) {
			out[0] = a[0] * b;
			out[1] = a[1] * b;
			out[2] = a[2] * b;
		}
		/**两个向量的距离 */
		public static distance(a: Vector3, b: Vector3) {
			let x = b[0] - a[0];
			let y = b[1] - a[1];
			let z = b[2] - a[2];
			return Math.sqrt(x * x + y * y + z * z);
		}
		/**向量的长度 */
		public static getLength(a: Vector3) {
			let x = a[0];
			let y = a[1];
			let z = a[2];
			return Math.sqrt(x * x + y * y + z * z);
		}
		/**向量反向 */
		public static negate(out: Vector3, a: Vector3) {
			out[0] = -a[0];
			out[1] = -a[1];
			out[2] = -a[2];
			return out;
		}
		/**归一化,标准化。将向量的长度变成1 */
		public static normalize(out: Vector3, a: Vector3) {
			let x = a[0];
			let y = a[1];
			let z = a[2];
			let len = x * x + y * y + z * z;
			if (len > 0) {
				len = 1 / Math.sqrt(len);
			}
			out[0] = a[0] * len;
			out[1] = a[1] * len;
			out[2] = a[2] * len;
			return out;
		}

		/**向量点乘.可以用来求两个向量的夹角 
		 * a·b>0    方向基本相同，夹角在0°到90°之间
     	 * a·b=0    正交，相互垂直  
         * a·b<0    方向基本相反，夹角在90°到180°之间 
		*/
		public static dot(a: Vector3, b: Vector3) {
			return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
		}

		/**向量叉乘。可以用来求a,b向量构成的面的法线 */
		public static cross(out: Vector3, a: Vector3, b: Vector3) {
			let ax = a[0],
				ay = a[1],
				az = a[2];
			let bx = b[0],
				by = b[1],
				bz = b[2];

			out[0] = ay * bz - az * by;
			out[1] = az * bx - ax * bz;
			out[2] = ax * by - ay * bx;
		}
		/**对向量进行线性插值 */
		public static lerp(out: Vector3, a: Vector3, b: Vector3, t: number) {
			let ax = a[0];
			let ay = a[1];
			let az = a[2];
			out[0] = ax + t * (b[0] - ax);
			out[1] = ay + t * (b[1] - ay);
			out[2] = az + t * (b[2] - az);
		}

	}
}