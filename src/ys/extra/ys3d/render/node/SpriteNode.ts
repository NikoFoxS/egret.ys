module ys3d {
	export class SpriteNode extends RenderNode {
		public constructor(texture,ax=0.5,ay=0.5) {
			super();

			this.type = 'Sprite';
			this.$display = new egret.Bitmap(texture);
			const d = this.$display;
			d.anchorOffsetX = d.width * ax;
			d.anchorOffsetY = d.height * ay;
		}

		private projectTo2D(x, y, z, focalLength: number): Vector3 {

			var scaleFactor = focalLength / (focalLength + z);
			var dis = (focalLength + z);
			if (dis == 0) {
				x = 100000;
				y = 0;
				scaleFactor = 1;
			} else {
				x = x * scaleFactor;
				y = y * scaleFactor;
			}
			return Vector3.create(x, -y, scaleFactor);
		}

		public draw(scene: Scene, cam: Camera) {
			const d = this.$display;
			scene.display.addChild(d);
			let p1 = Vector4.create(0, 0, 0, 1);
			this.mvp(cam, p1);
			// console.log('---')
			// console.log(p1);

			//w_out = z_in * fudgeFactor + 1;
			const fudgeFactor = (p1.w - 1)/p1.z;
			// console.log(fudgeFactor);

			let size = p1.w;
			p1.x /= size;
			p1.y /= size;
			//因为裁剪空间是 -1~1，长度为2.所以映射到白鹭的空间要乘以半宽和半高。
			p1.x = p1.x * ys.Context.stageHalfW;
			p1.y = -p1.y * ys.Context.stageHalfH;//y轴反向

			d.x = p1.x;
			d.y = p1.y;

			// console.log('---');

			const scale = ys.Context.stageH/p1.w; //这个地方还要调整。
			// console.log('scale',scale);
			d.scaleX = scale * this.scale.x;
			d.scaleY = scale * this.scale.y;
		}
	}
}