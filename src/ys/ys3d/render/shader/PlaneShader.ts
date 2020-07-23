module ys3d {
	/**用着色器进行渲染 */
	export class PlaneShader {
		public constructor() {
			/**
			 * p1 - p2
			 *  |   |
			 * p3 - p4
			 */
			var vs =
				`
		attribute vec2 aVertexPosition;
		attribute vec2 aTextureCoord;
		attribute vec4 aColor;
		varying vec2 vTextureCoord;
		varying vec4 vColor;
		uniform vec4 p1;
		uniform vec4 p2;
		uniform vec4 p3;
		uniform vec4 p4;
		void main(void) {
			vec2 pos = aVertexPosition;
			vTextureCoord = aTextureCoord;
			vColor = aColor;
			vec4 position;
			if(vTextureCoord.x < 0.5)
			vTextureCoord.y < 0.5 ? (position = p1):(position = p3);
			else
			vTextureCoord.y < 0.5 ?(position = p2):(position = p4);
			gl_Position = position;
		}
		`
			var fs =
				`
		precision lowp float;
		varying vec2 vTextureCoord;
		uniform sampler2D uSampler;
		uniform vec3 color; 
		varying vec4 vColor;

		void main(void) {
			vec4 fg = texture2D(uSampler, vTextureCoord);
			gl_FragColor =fg;
		}
		`

			let shader = new egret.CustomFilter(vs, fs, {
				p1: { x: -0.5, y: 0.5, z: 0, w: 1 },
				p2: { x: 0.5, y: 0.5, z: 0, w: 1 },
				p3: { x: -0.5, y: -0.5, z: 0, w: 1 },
				p4: { x: 0.5, y: -0.5, z: 0, w: 1 }
			})
			this._shader = shader;
		}

		private _shader: egret.CustomFilter;
		public get shader() {
			return this._shader;
		}

		public updateArr(arr: Vector4[]) {
			let p1 = arr[0];
			let p2 = arr[1];
			let p3 = arr[2];
			let p4 = arr[3];
			this.shader.uniforms.p1 = { x: p1.x, y: p1.y, z: p1.z, w: p1.w };
			this.shader.uniforms.p2 = { x: p2.x, y: p2.y, z: p2.z, w: p2.w };
			this.shader.uniforms.p3 = { x: p3.x, y: p3.y, z: p3.z, w: p3.w };
			this.shader.uniforms.p4 = { x: p4.x, y: p4.y, z: p4.z, w: p4.w };
		}

	}
}

