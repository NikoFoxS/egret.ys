module ys {
	export class List extends ys.VScrollBar {
		public constructor(w, h) {
			super();
			let con = new egret.DisplayObjectContainer();
			this.setContent(con, w, h);
			this.index = 0;
			this.lastY = 0;
			this.itemsCon = con;
			this.pt = new egret.Point();
			con.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapItem, this);
			this.once(egret.Event.REMOVED_FROM_STAGE, () => {
				con.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapItem, this);
			}, this);
		}

		public static ITEM_SELECTED: string = 'item_selected';
		private tapItem(e: egret.TouchEvent) {
			let item = e.target;
			this.dispatchEventWith(List.ITEM_SELECTED, false, item);
		}

		private itemsCon: egret.DisplayObjectContainer;

		private index: number;
		private lastY: number;
		public addItem(item: ListItem) {
			item.y = this.lastY;
			item.render();
			this.itemsCon.addChild(item);
			item.visible = false;
			item.touchEnabled = true;
			this.lastY += item.itemH;
			item.index = this.index;
			this.index++;
		}

		public getItem(index) {
			let con = this.itemsCon;
			let i = con.numChildren;
			let item;
			while (i--) {
				item = <ListItem>con.getChildAt(i);
				if (item.index == index) {
					break;
				}
				item = null;
			}

			return item;
		}

		private pt: egret.Point;
		protected onScroll() {
			let con = this.itemsCon;
			let i = con.numChildren;
			while (i--) {
				let item = <ListItem>con.getChildAt(i);
				let p = item.localToGlobal(0, 0, this.pt);
				p = this.globalToLocal(p.x, p.y, this.pt);
				if (p.y < -item.itemH || p.y > this.scrollH) {
					item.visible = false;
				} else {
					item.visible = true;
				}
			}
		}

	}

	export class ListItem extends egret.DisplayObjectContainer {
		constructor(data) {
			super();
			this.data = data;
			this.onCreate();
		}
		public index: number;

		protected data: any;
		protected onCreate() {

		}

		public get itemH() {
			return 0;
		}

		public render() {

		}
	}
}