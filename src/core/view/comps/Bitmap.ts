module ys {
	export class Bitmap extends egret.Bitmap {
		public constructor() {
			super();
		}

		public set src(v: string) {
			if (v.indexOf('.') == -1) {
				this.texture = RES.getRes(v);
			} else {
				RES.getResByUrl(v, (tex: egret.Texture) => {
					this.texture = tex;
				}, this, RES.ResourceItem.TYPE_IMAGE);
			}

		}

	}
}