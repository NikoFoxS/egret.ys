module ys3d {
	let temV4 = Vector4.create();
	export class PlaneNode extends RenderNode {
		public constructor(display: egret.DisplayObject) {
			super();
			this.$display = display;
			const d = this.$display;
			this._shader = new PlaneShader();
			if (d.filters) {
				d.filters.push(this._shader.shader);
			} else {
				d.filters = [this._shader.shader];
			}
			this.$geometry = new Plane(display.width, display.height);
		}
		private _shader: PlaneShader;

		public draw(scene: Scene, cam: Camera) {

			scene.display.addChild(this.$display);

			const viewMatrix = cam.viewMatrix;
			const projectMatix = cam.projectionMatrix;

			let vertices = this.$geometry.vertices;
			let ratio = devicePixelRatio * innerWidth / ys.Context.STAGE_W;

			let i = 0;
			let len = vertices.length;
			let v4arr: Vector4[] = [];

			let x, y, z;
			let v4;
			while (i < len) {
				x = vertices[i];
				y = vertices[i + 1];
				z = vertices[i + 2];

				// //对顶点进行模型矩阵变换 M
				v4 = Vector4.create(x, y, z, 1);
				this.mvp(cam, v4);
				//知识点：
				// WebGL要使用 4x4 的矩阵和包含 X, Y, Z, 和 W 四个值的向量。 
				// X 和 Y 除以 W 得到裁剪空间坐标，
				// Z 除以 W 也得到裁剪空间的 Z 坐标， 
				// W 同时还为纹理映射的透视纠正提供了帮助
				v4arr.push(v4);

				i += 3;
			}
			//将变换后的顶点坐标，更新到着色器。
			this._shader.updateArr(v4arr);
		}
	}
}