module ys3d {
	export class RenderNode extends Object3D {
		public constructor() {
			super();
			this.visible = true;
			this.worldPosition = new Vector4();
		}

		public worldPosition: Vector4;

		protected $display: egret.DisplayObject;
		protected $geometry: Geometry;
		public get display() {
			return this.$display;
		}

		public draw(scene: Scene, cam: Camera) {

		}
		/**模型视图投影矩阵变换 */
		protected mvp(cam:Camera,v4: Vector4) {
			//对顶点进行模型矩阵变换 M
			v4 = this.worldMatrix.transformV4(v4);
			// console.log('m', v4)
			//对顶点进行视图变换V
			v4 = cam.viewMatrix.transformV4(v4);
			// console.log('v', v4)
			//对顶点投影变换 P
			v4 = cam.projectionMatrix.transformV4(v4);
			// console.log('p', v4)
		}

	}

}