module ys {

	export class VScrollBar extends egret.DisplayObjectContainer {

		public constructor() {
			super();
		}

		$create(): void {
			// debugger
			if (this.barSize != 0) {
				this.size = this.barSize;
				if (!this.bar) {
					this.bar = new egret.Shape();
					this.addChild(this.bar);
					this.content.height && this.updateBar();
				}
			}
			this.content.height && this.updateBar();
		}

		public setContent(content, w, h) {
			var sv = new egret.ScrollView(content);
			sv.width = w;
			sv.height = h;
			sv.horizontalScrollPolicy = 'off';
			this.sv = sv;
			this.addChild(sv);

			sv.addEventListener(egret.TouchEvent.CHANGE, this.moveBar, this);
			this.sv = sv;
			this.scrollW = w;
			this.scrollH = h;
			this.content = content;
			this.rec = new egret.Rectangle();
		}

		public barSize: number = 0;
		public barColor: number = 0x000000;

		// public set enableBar(b:boolean):void
		// {
		// 	this._enableBar = b;
		// 	this.size = barSize;
		// 	this.barColor = barColor;
		// 	if (!this.bar) {
		// 		this.bar = new egret.Shape();
		// 		this.addChild(this.bar);
		// 		this.content.height && this.updateBar();
		// 	}
		// }

		private size: number;
		private scrollW: number;
		protected scrollH: number;
		protected content: egret.DisplayObject;
		protected contentH: number;
		public bar: egret.Shape;
		private sv: egret.ScrollView;
		private rec: egret.Rectangle;

		private moveBar() {
			if (this.barSize > 0) {
				let h = this.scrollH;
				let top = h * this.sv.scrollTop / this.contentH;
				let size = this.size;
				let sizeHalf = size * 0.5;
				let rec = this.rec;
				rec.x = -sizeHalf;
				rec.y = - top - sizeHalf;
				rec.width = size * 2;
				rec.height = h;
				this.bar.scrollRect = rec;
			}
			this.onScroll();
		}

		protected onScroll() {

		}

		public updateBar() {
			// debugger
			this.contentH = this.content.height;
			if (this.contentH <= 0) {
				return;
			}

			if (this.barSize > 0) {
				let size = this.size;
				let h = this.scrollH;
				let w = this.scrollW;
				var barH = h * h / this.contentH - size;
				var bar = this.bar;
				bar.visible = this.contentH > this.scrollH;
				bar.graphics.lineStyle(size, this.barColor);
				bar.graphics.moveTo(0, 0);
				bar.graphics.lineTo(0, barH);
				this.addChild(bar);
				bar.x = w - size;
				let rec = this.rec;
				rec.x = -size * 0.5;
				rec.y = -size * 0.5;
				rec.width = size * 2;
				rec.height = h - size;
				bar.scrollRect = rec;
				bar.cacheAsBitmap = true;
			}

			this.onScroll();
		}

	}
}