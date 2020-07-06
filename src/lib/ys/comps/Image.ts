module ys {
	export class Image extends egret.Bitmap {
		public constructor() {
			super();
		}

		private _src: string = '';
		public get src() {
			return this._src;
		}

		public set src(url) {
			this._src = url;
			RES.getResByUrl(url, (tex: egret.Texture) => {
				this.texture = tex;
			}, this, RES.ResourceItem.TYPE_IMAGE);
		}

	}
}