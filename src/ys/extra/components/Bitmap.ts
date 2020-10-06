module ys {
	let bitmapPool: ys.Bitmap[] = [];
	export class Bitmap extends egret.Bitmap {
		//-----------------------------
		public static release(bm: ys.Bitmap): void {
			// if (!bm) {
			// 	return;
			// }
			// bitmapPool.push(bm);
		}

		public static create(res: string = ''): ys.Bitmap {
			// let bm = bitmapPool.pop();
			// if (!bm) {
			// 	bm = new ys.Bitmap(res);
			// }
			// return bm;
			return new ys.Bitmap(res);
		}
		//------------------------------
		public constructor(res: string = '') {
			super();
			this.create(res);
		}

		private _src: string = '';
		public get src() {
			return this._src;
		}

		public create(res: string) {
			if (res != '') {
				this.texture = RES.getRes(res);
			}
		}

		public set src(url) {
			this._src = url;
			RES.getResByUrl(url, (tex: egret.Texture) => {
				this.texture = tex;
				this.dispatchEventWith('onload', false);
			}, this, RES.ResourceItem.TYPE_IMAGE);
		}

		public load(url, callback: Function, ref: any) {
			this._src = url;
			RES.getResByUrl(url, (tex: egret.Texture) => {
				this.texture = tex;
				callback.call(ref);
			}, this, RES.ResourceItem.TYPE_IMAGE);
		}

		public async srcAsync(url) {
			return new Promise((resolve, reject) => {
				this._src = url;
				RES.getResByUrl(url, (tex: egret.Texture) => {
					this.texture = tex;
					resolve();
				}, this, RES.ResourceItem.TYPE_IMAGE);
			});
		}

	}
}