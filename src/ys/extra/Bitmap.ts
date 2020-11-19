module ys {
	export class Bitmap extends egret.Bitmap {
		public constructor() {
			super();
		}

		public create(resOrUrl: string) {
			const arr = ['.jpg', '.jpeg', '.png'];
			let i = arr.length;
			let isURL = false;
			while (i--) {
				if (resOrUrl.indexOf(arr[i]) != -1) {
					isURL = true;
					break;
				}
			}

			return new Promise((resolve, reject) => {
				if (isURL) {
					RES.getResByUrl(resOrUrl, (tex: egret.Texture) => {
						this.texture = tex;
						resolve();
					}, this, RES.ResourceItem.TYPE_IMAGE);
				} else {
					this.texture = RES.getRes(resOrUrl);
					resolve();
				}

			});

		}


	}
}