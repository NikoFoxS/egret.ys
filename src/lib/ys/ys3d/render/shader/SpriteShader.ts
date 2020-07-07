module ys3d {
	export class SpriteShader {
		public constructor() {
			var vs =
				`
		attribute vec2 aVertexPosition;
		attribute vec2 aTextureCoord;
		attribute vec4 aColor;
		varying vec2 vTextureCoord;
		varying vec4 vColor;
		uniform vec2 projectionVector;
		const vec2 center = vec2(-1.0, 1.0);
		uniform vec4 v4;
	
		void main(void) {
			vec2 pos = aVertexPosition;
			vTextureCoord = aTextureCoord;
			vColor = aColor;
			vec4 position = vec4( (aVertexPosition / projectionVector) + center , 0.0, v4.w);
			position.x += v4.x;
			position.y += v4.y;
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
				w: 1.0
			})
			this._shader = shader;
		}

		private _shader: egret.CustomFilter;
		public get shader() {
			return this._shader;
		}

		public update(v4) {
			this.shader.uniforms.v4 = { x: v4.x, y: v4.y, z: v4.z, w: v4.w };
		}
	}
}