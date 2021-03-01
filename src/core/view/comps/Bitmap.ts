module ys {
	export class Bitmap extends egret.Bitmap {
		public constructor() {
			super();

			// this.scale9Grid = 
		}

		public set slice9(v:string)
		{
			let arr = v.split(',');
			if(arr.length == 4)
			{
				let x = +arr[0];
				let y = +arr[1];
				let w = +arr[2];
				let h = +arr[3];
				let rec = new egret.Rectangle(x,y,w,h);
				this.scale9Grid = rec;
			}
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