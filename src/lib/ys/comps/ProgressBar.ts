module ys {
	export class ProgressBar extends egret.DisplayObjectContainer {
		public constructor(bg, bar) {
			super();
			this.bg = GG.newBitmap(bg, this);
			this.bar = GG.newBitmap(bar, this);
			this.rec = new egret.Rectangle(0, 0, this.bar.width, this.bar.height);
		}

		private bg: egret.Bitmap;
		private bar: egret.Bitmap;
		private rec: egret.Rectangle;
		private _progress: number;

		public set progress(per: number) {
			this._progress = per;
			if (this.bar) {
				this.rec.width = per * this.bar.width;
				this.bar.scrollRect = this.rec;
			}
		}

		public get progress() {
			return this._progress;
		}
	}
}