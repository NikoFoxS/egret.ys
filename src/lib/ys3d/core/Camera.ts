module ys3d {
	let tmp: Vector3 = Vector3.create();
	export class Camera extends Object3D {
		public constructor(fov, aspect, near = 0.1, far = 2000) {
			super();
			this.type = 'Camera';
			this._fov = fov;
			this._aspect = aspect;
			this._near = near;
			this._far = far;
			//fov不一样，投影出来的大小不一样。

			this.name = 'camera'

			//投影矩阵
			this._projectionMatrix = Matrix4.create();
			this._updateProjectMatrix();

			//视图矩阵
			this._viewMatrix = Matrix4.create();
			//上方向
			this.up = Vector3.create(0, 1, 0);
			//默认观察方向
			this.lookAt(0, 0, -1);
		}

		public up: Vector3;
		private _fov: number;
		private _aspect: number;
		private _near: number;
		private _far: number;
		public set fov(v) {
			this._fov = v;
			this._updateProjectMatrix();
		}

		public get fov()
		{
			return this._fov;
		}

		public get far() {
			return this._far;
		}

		public updateMatrixWorld() {
			super.updateMatrixWorld();
			//相机的视图矩阵变换，相对于观察的空间是逆矩阵。
			this._viewMatrix.copy(this.worldMatrix);
			this._viewMatrix.inverse();
		}

		public _updateProjectMatrix() {
			this._projectionMatrix.fromPerspective(this._fov, this._aspect, this._near, this._far)
		}

		protected _projectionMatrix: Matrix4;
		protected _viewMatrix: Matrix4;

		public get projectionMatrix() {
			return this._projectionMatrix;
		}

		public get viewMatrix() {
			return this._viewMatrix;
		}

		public lookAt(x, y, z) {
			const pos = this.position;
			const up = this.up;
			this.viewMatrix.lookAt(pos, Vector3.create(x, y, z), up);
			this.viewMatrix.getRotation(this.quat);
			this.rotation.fromQuaternion(this.quat);
		}

		/**进行视图变换和投影变换 */
		public project(v3: Vector3) {
			tmp = this._viewMatrix.transformV3(v3);
			tmp = this._projectionMatrix.transformV3(tmp);
			return tmp;
		}

		public unproject(x, y) {
			let tempMat4 = Matrix4.create();
			tempMat4.copy(this._projectionMatrix);
			tempMat4.inverse();
			tmp.set(x, y, 0);
			tmp = tempMat4.transformV3(tmp);
			tmp = this.worldMatrix.transformV3(tmp);

			return tmp;
		}

	}
}