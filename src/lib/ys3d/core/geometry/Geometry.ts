module ys3d {
	export class Geometry {
		public constructor() {
		}

		//顶点
		protected _vertices: number[];
		//顶点索引
		protected _indices: number[];
		//uv
		protected _uvs: number[];

		public get vertices() {
			return this._vertices.slice();
		}

		public get indices() {
			return this._indices;
		}

		public get uvs() {
			return this._uvs;
		}
	}
}
