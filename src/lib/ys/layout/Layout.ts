module ys {
	/**布局,可忽略锚点 */
	export class Layout {
		public constructor() {
		}

		/** 
		 * 处于编辑状态的显示对象，透明位置会自动填充红色，已方便查看边界 
		 * 只能移动操作。通过type限制移动方向
		 */
		public edit(d: egret.DisplayObject, type = '') {
			d.touchEnabled = true;
			let tx, ty;
			stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
				tx = e.stageX;
				ty = e.stageY;
			}, this);
			stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => {
				let dx = e.stageX - tx;
				let dy = e.stageY - ty;

				type == 'x' && (dy = 0);
				type == 'y' && (dx = 0);
				d.x += dx;
				d.y += dy;

				tx = e.stageX;
				ty = e.stageY;
			}, this);
			stage.addEventListener(egret.TouchEvent.TOUCH_END, () => {
				this.showLayout(d);
			}, this);

			const vs=
			`
			attribute vec2 aVertexPosition;
			attribute vec2 aTextureCoord;
			attribute vec2 aColor;
			uniform vec2 projectionVector;
			varying vec2 vTextureCoord;
			const vec2 center = vec2(-1.0, 1.0);
			void main(void) {
				gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);
				vTextureCoord = aTextureCoord;
			}
			`
			const fs=
			`
			precision lowp float;
			varying vec2 vTextureCoord;
			varying vec4 vColor;
			uniform sampler2D uSampler;
			void main(void) {
				vec2 uvs = vTextureCoord.xy;
				vec4 fg = texture2D(uSampler, vTextureCoord);
				fg += vec4(1.0,0.0,0.0,0.5);
				gl_FragColor = fg;
			}
			`

			const shader = new egret.CustomFilter(vs,fs,{});
			d.filters = [shader];
		}

		public showLayout(d) {
			if (d) {
				console.log('--- layout值 ---')
				//left
				let val;
				val = d.x - d.anchorOffsetX;
				console.log('left', val)
				//right
				val = stageW - d.width + d.anchorOffsetX - d.x;
				console.log('right', val)
				//top
				val = d.y - d.anchorOffsetY;
				console.log('top', val)
				console.log('top vh', val / stageH);
				//bottom
				val = stageH - d.height + d.anchorOffsetY - d.y;
				console.log('bottom', val);
				//middleX
				val = stageHalfW - d.width * 0.5 + d.anchorOffsetX - d.x;
				val = -val;
				console.log('middleX', val);
				//middleY
				val = stageHalfH - d.height * 0.5 + d.anchorOffsetY - d.y;
				val = -val;
				console.log('middleY', val);
			}
		}


		public left(d: egret.DisplayObject, left) {
			d.x = left + d.anchorOffsetX;
		}

		public right(d: egret.DisplayObject, right) {
			d.x = stageW - d.width + d.anchorOffsetX - right;
		}

		public middleX(d: egret.DisplayObject, offset = 0) {
			d.x = stageHalfW - d.width * 0.5 + d.anchorOffsetX + offset;
		}

		public middleY(d: egret.DisplayObject, offset = 0) {
			d.y = stageHalfH - d.height * 0.5 + d.anchorOffsetY + offset;
		}

		public top(d: egret.DisplayObject, top) {
			d.y = top + d.anchorOffsetY;
		}

		public bottom(d: egret.DisplayObject, bottom) {
			d.y = stageH - d.height + d.anchorOffsetY - bottom;
		}

		public vh(d: egret.DisplayObject, vh) {
			d.y = stageH * vh;
		}

	}
}